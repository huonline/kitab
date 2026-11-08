import { $, $$, esc, store, colorFor } from './reader-util.js';
import { prefs, set, apply, navMode } from './reader-prefs.js';
import { getIndex, getToc, getBab } from './reader-data.js';
import { renderBab } from './reader-render.js';
import { fit } from './reader-fit.js';
import * as nav from './reader-nav.js';

let idx = [], cat = 'Semua', q = '', book = null, toc = [], N = 1, num = 1, data = null;

/* ---- progres baca (lokal di perangkat) ---- */
const rs_ = () => store.get('pkk:read', {});
const mark = (id, v) => { const r = rs_(); r[id] = { ...r[id], ...v }; store.set('pkk:read', r) };
const prog = k => { const r = rs_()[k.id]; return !r ? 0 : r.done ? 100 : Math.round(100 * ((r.n || 1) - 1) / (k.nbab || 1)) };
const stat = k => { const r = rs_()[k.id]; return !r ? 'Belum dibaca' : r.done ? 'Selesai' : 'Sedang dibaca' };

/* ---- beranda ---- */
function renderHome() {
  const cats = ['Semua', ...new Set(idx.map(b => b.cat).filter(Boolean))], ql = q.toLowerCase();
  const list = idx.filter(b => (cat === 'Semua' || b.cat === cat) && (!ql || [b.title, b.ar, b.author, b.fan].join(' ').toLowerCase().includes(ql)));
  const st = idx.map(stat);
  $('#sub').textContent = idx.length + ' kitab';
  $('#chips').innerHTML = cats.map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  $('#stats').innerHTML = [['Semua', idx.length], ['Sedang dibaca', st.filter(x => x === 'Sedang dibaca').length], ['Selesai', st.filter(x => x === 'Selesai').length]]
    .map(([a, n]) => `<div class="stat"><b>${n}</b><span>${a}</span></div>`).join('');
  $('#grid').innerHTML = list.length ? list.map(b => { const c = colorFor(b.id);
    return `<button class="card" data-id="${esc(b.id)}"><div class="cover" style="background:linear-gradient(145deg,${c},${c}bb 60%,#000a)"><span class="badge">${esc(b.cat)}</span>${b.ar ? `<div class="ar" style="margin-top:22px">${esc(b.ar)}</div>` : '<div></div>'}<div><div class="t">${esc(b.title)}</div><div class="a">${esc(b.author)}</div></div></div><div class="bar"><i style="width:${prog(b)}%"></i></div><div><div class="name">${esc(b.title)}</div><div class="meta">${stat(b)} · ${prog(b)}%</div></div></button>` }).join('')
    : '<div class="empty" style="grid-column:1/-1">Kitab tidak ditemukan.</div>';
}

function detail(id) {
  const b = idx.find(x => x.id === id); if (!b) return;
  const c = colorFor(b.id), p = prog(b), r = rs_()[b.id];
  $('#det').innerHTML = `<div style="display:flex;gap:16px;align-items:flex-start"><div class="cover" style="width:110px;flex:none;background:linear-gradient(145deg,${c},#000a);padding:10px 8px 8px 12px">${b.ar ? `<div class="ar" style="font-size:16px">${esc(b.ar)}</div>` : '<div></div>'}<div class="t" style="font-size:12px">${esc(b.title)}</div></div><div style="flex:1;min-width:0"><h2 style="margin:0 0 4px">${esc(b.title)}</h2>${b.ar ? `<div dir="rtl" style="font:22px Amiri,serif">${esc(b.ar)}</div>` : ''}<div class="meta">${esc(b.author) || 'Pengarang belum diisi'}</div><div class="meta">${esc(b.cat)}${b.fan ? ' · ' + esc(b.fan) : ''}</div></div></div>
<div style="margin:16px 0 6px;display:flex;justify-content:space-between"><b>${p}% selesai</b><span class="meta">${b.nbab || 1} bab</span></div><div class="bar" style="height:8px"><i style="width:${p}%"></i></div>
<div class="row"><button class="btn" id="dread">📖 ${r ? 'Lanjutkan' : 'Baca'}</button></div><div class="row" style="margin-top:6px"><button class="btn ghost" data-close>Tutup</button></div>`;
  $('#dread').onclick = () => openReader(b);
  $('#ovd').classList.add('on');
}

/* ---- pembaca ---- */
async function openReader(k) {
  $('#ovd').classList.remove('on');
  $('#rtl').textContent = k.title; $('#rd').classList.add('on');
  history.pushState({ rd: 1 }, ''); apply();
  $('#rt').innerHTML = '<p class="err">Memuat…</p>';
  toc = await getToc(k); book = k; N = toc.length; $('#rr').max = N;
  show(rs_()[k.id]?.n || 1);
}

async function show(n, end = false) {
  num = Math.min(Math.max(1, n), N);
  $('#rr').value = num; mark(book.id, { n: num });
  $('#rt').innerHTML = '<p class="err">Memuat bab…</p>';
  try { data = await getBab(book, toc[num - 1].id) }
  catch (e) { $('#rt').innerHTML = `<p class="err">${esc(e.message || 'Gagal memuat bab.')}</p>`; return }
  draw(end);
}

function draw(end = false) {
  if (!data) return;
  const rt = $('#rt');
  rt.innerHTML = renderBab(data, prefs.mode, prefs.dir);
  const edge = d => { if (num + d < 1 || num + d > N) { if (d > 0) mark(book.id, { done: true }); return } show(num + d, d < 0) };
  const lay = () => { fit(rt, prefs); nav.setup($('#rb'), rt, navMode(), { info: s => $('#pg').textContent = `${num}/${N} · ${s}`, edge }); if (end) nav.toEnd() };
  lay(); $('#rb').scrollTop = 0;
  document.fonts?.ready.then(() => { fit(rt, prefs); nav.layout() });
}
const refit = () => { fit($('#rt'), prefs); nav.layout() };

function closeReader() { $('#rd').classList.remove('on'); nav.destroy(); renderHome() }

/* ---- kontrol ---- */
$('#q').oninput = e => { q = e.target.value; renderHome() };
$('#chips').onclick = e => { const c = e.target.closest('[data-c]'); if (c) { cat = c.dataset.c; renderHome() } };
$('#grid').onclick = e => { const c = e.target.closest('[data-id]'); if (c) detail(c.dataset.id) };
document.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.classList.contains('ov')) $('#ovd').classList.remove('on') });
addEventListener('popstate', () => { if ($('#rd').classList.contains('on')) closeReader() });
$('#rx').onclick = () => history.back();
$('#rg').onclick = () => $('#rs').classList.toggle('on');
$('#rm').onclick = () => { set({ fs: Math.max(14, prefs.fs - 2), fa: Math.max(20, prefs.fa - 2) }); refit() };
$('#rp').onclick = () => { set({ fs: Math.min(60, prefs.fs + 2), fa: Math.min(64, prefs.fa + 2) }); refit() };
$$('[data-th]').forEach(b => b.onclick = () => set({ th: b.dataset.th }));
$$('[data-dir]').forEach(b => b.onclick = () => { set({ dir: b.dataset.dir }); draw() });
$$('[data-md]').forEach(b => b.onclick = () => { set({ mode: b.dataset.md }); draw() });
$$('[data-nv]').forEach(b => b.onclick = () => { set({ nav: b.dataset.nv }); draw() });
$('#rf').onchange = e => { set({ ff: e.target.value }); refit() };
$('#rlh').oninput = e => { set({ lh: +e.target.value }); refit() };
[['gfa', 'fa'], ['gpm', 'pm'], ['ggr', 'gr'], ['ggj', 'gj'], ['ggh', 'gh']].forEach(([i, k]) => $('#' + i).oninput = e => { set({ [k]: +e.target.value }); refit() });
$('#pv').onclick = () => nav.prev();
$('#nx').onclick = () => nav.next();
$('#rr').oninput = e => show(+e.target.value);
addEventListener('resize', () => { if ($('#rd').classList.contains('on')) refit() });
addEventListener('keydown', e => {
  if (!$('#rd').classList.contains('on')) return;
  if (e.key === 'ArrowLeft') nav.next(); if (e.key === 'ArrowRight') nav.prev(); if (e.key === 'Escape') history.back();
});

/* ---- mulai ---- */
apply();
getIndex().then(l => { idx = l; renderHome() })
  .catch(() => $('#grid').innerHTML = '<div class="empty" style="grid-column:1/-1">Tidak bisa memuat data. Periksa koneksi lalu muat ulang.</div>');
