import { $, $$, esc, words, store, colorFor } from './reader-util.js';
import { prefs, set, apply, navMode } from './reader-prefs.js';
import { getIndex, getToc, getBab } from './reader-data.js';
import { renderBab } from './reader-render.js';
import { fit } from './reader-fit.js';
import * as nav from './reader-nav.js';
import { user, onUser, login, logout, getMine, saveMine, resetKitab, wipeKitab, wipeAll } from './reader-user.js';

let idx = [], cat = 'Semua', q = '', book = null, toc = [], N = 1, num = 1, data = null, mine = {}, editing = false;

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
    return `<button class="card" data-id="${esc(b.id)}"><div class="cover" style="background:linear-gradient(145deg,${c},${c}bb 60%,#000a)"><span class="badge">${esc(b.cat)}</span>${b.ar ? `<div class="ar" style="margin-top:22px">${esc(b.ar)}</div>` : '<div></div>'}<div><div class="t">${esc(b.title)}</div><div class="a">${esc(b.author)}</div></div></div><div class="bar"><i style="width:${prog(b)}%"></i></div><div><div class="name">${esc(b.title)}</div><div class="meta">${stat(b)} · ${prog(b)}%${b.pegon ? ' · Pegon ' + esc(String(b.pegon).replace(/^pegon\s*/i, '')) : ''}</div></div></button>` }).join('')
    : '<div class="empty" style="grid-column:1/-1">Kitab tidak ditemukan.</div>';
}

function detail(id) {
  const b = idx.find(x => x.id === id); if (!b) return;
  const c = colorFor(b.id), p = prog(b), r = rs_()[b.id];
  $('#det').innerHTML = `<div style="display:flex;gap:16px;align-items:flex-start"><div class="cover" style="width:110px;flex:none;background:linear-gradient(145deg,${c},#000a);padding:10px 8px 8px 12px">${b.ar ? `<div class="ar" style="font-size:16px">${esc(b.ar)}</div>` : '<div></div>'}<div class="t" style="font-size:12px">${esc(b.title)}</div></div><div style="flex:1;min-width:0"><h2 style="margin:0 0 4px">${esc(b.title)}</h2>${b.ar ? `<div dir="rtl" style="font:22px Amiri,serif">${esc(b.ar)}</div>` : ''}<div class="meta">${esc(b.author) || 'Pengarang belum diisi'}</div><div class="meta">${esc(b.cat)}${b.fan ? ' · ' + esc(b.fan) : ''}</div>${b.pegon ? `<div class="meta">Makna: Pegon ${esc(String(b.pegon).replace(/^pegon\s*/i, ''))}</div>` : ''}</div></div>
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
  mine = await getMine(book.id, toc[num - 1].id); $('#bn').value = mine.n || '';
  draw(end);
}

function draw(end = false, keep = false) {
  if (!data) return;
  const rt = $('#rt'), at = keep ? nav.pos() : 0;
  rt.innerHTML = renderBab(data, prefs.mode, prefs.dir, mine);
  rt.dataset.mode = prefs.mode; rt.classList.toggle('editing', editing);
  const edge = d => { if (num + d < 1 || num + d > N) { if (d > 0) mark(book.id, { done: true }); return } show(num + d, d < 0) };
  fit(rt, prefs); nav.setup($('#rb'), rt, navMode(), { info: s => $('#pg').textContent = `${num}/${N} · ${s}`, edge });
  if (end) nav.toEnd(); else if (keep) nav.restore(at); else $('#rb').scrollTop = 0;
  document.fonts?.ready.then(() => { fit(rt, prefs); nav.layout() });
}
const refit = () => { fit($('#rt'), prefs); nav.layout() };

function closeReader() { setEdit(false); $('#rd').classList.remove('on'); nav.destroy(); renderHome() }

/* ---- kontrol ---- */
$('#q').oninput = e => { q = e.target.value; renderHome() };
$('#chips').onclick = e => { const c = e.target.closest('[data-c]'); if (c) { cat = c.dataset.c; renderHome() } };
$('#grid').onclick = e => { const c = e.target.closest('[data-id]'); if (c) detail(c.dataset.id) };
document.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.classList.contains('ov')) $$('.ov.on').forEach(o => o.classList.remove('on')) });
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
$('#gn').onclick = () => { set({ nt: prefs.nt === false }); refit() };
$('#pv').onclick = () => nav.prev();
$('#nx').onclick = () => nav.next();
$('#rr').oninput = e => show(+e.target.value);
addEventListener('resize', () => { if ($('#rd').classList.contains('on')) refit() });
addEventListener('keydown', e => {
  if (!$('#rd').classList.contains('on')) return;
  if (e.key === 'ArrowLeft') nav.next(); if (e.key === 'ArrowRight') nav.prev(); if (e.key === 'Escape') history.back();
});

/* ---- akun & edit pribadi ---- */
function toast(t) { const d = document.createElement('div'); d.className = 'ts'; d.textContent = t; document.body.append(d); setTimeout(() => d.remove(), 3500) }
const err = (p, e) => toast(p + (e.code || e.message));
const bid = () => toc[num - 1].id;
function setEdit(on) {
  editing = on; $('#re').classList.toggle('on', on); $('#ep').classList.toggle('on', on);
  $('#rt').classList.toggle('editing', on); nav.layout();
}
async function commit(fn, redraw = true) {
  mine.p = mine.p || {}; mine.c = mine.c || {}; fn();
  try { await saveMine(book.id, bid(), mine) } catch (e) { err('Gagal menyimpan: ', e); return false }
  if (redraw) draw(false, true);
  return true;
}
function openRow(i) {
  const r = data.rows[i], ws = words(r.a), m = mine.p?.[i] ?? r.m ?? [];
  $('#rowm').innerHTML = `<h2>Baris ${i + 1}</h2><div dir="rtl" style="font:24px Amiri,serif">${esc(r.a)}</div>${r.t ? `<div class="meta" dir="auto">${esc(r.t)}</div>` : ''}
<div style="display:flex;flex-wrap:wrap;direction:rtl;gap:8px;margin:12px 0">${ws.map((w, j) => `<div style="text-align:center;width:${Math.max(90, w.length * 17)}px"><div style="font:22px Amiri,serif">${esc(w)}</div><input class="in gi" dir="auto" data-w="${j}" value="${esc(m[j] || '')}" placeholder="makna" style="padding:7px;font-size:15px;text-align:center"></div>`).join('')}</div>
<textarea class="in" id="rn" rows="2" placeholder="Catatan baris (opsional)">${esc(mine.c?.[i] || '')}</textarea>
<div class="row"><button class="btn" id="rsv">Simpan</button><button class="btn ghost" id="rrs">Reset makna baris</button></div><div class="row" style="margin-top:6px"><button class="btn ghost" data-close>Tutup</button></div>`;
  $('#ovr').classList.add('on');
  const done = ok => ok && $('#ovr').classList.remove('on');
  $('#rsv').onclick = async () => done(await commit(() => {
    const arr = $$('.gi').map(x => x.value.trim()), base = ws.map((_, j) => r.m?.[j] || '');
    if (arr.join('|') === base.join('|')) delete mine.p[i];          // sama dengan umum: ikut pembaruan admin
    else if (arr.some(Boolean)) mine.p[i] = arr;
    else if (base.some(Boolean)) mine.p[i] = [];                      // sengaja dikosongkan
    else delete mine.p[i];
    const n = $('#rn').value.trim(); n ? mine.c[i] = n : delete mine.c[i];
  }));
  $('#rrs').onclick = async () => done(await commit(() => { delete mine.p[i] }));
}
$('#rt').addEventListener('click', e => {
  const rw = e.target.closest('.rw');
  if (rw && user && (editing || e.target.closest('.cn'))) openRow(+rw.dataset.r);
});
$('#re').onclick = async () => {
  if (!user) { try { await login() } catch (e) { return err('Gagal masuk: ', e) } mine = await getMine(book.id, bid()); $('#bn').value = mine.n || ''; draw(false, true) }
  setEdit(!editing);
};
$('#bn').onchange = () => commit(() => { mine.n = $('#bn').value.trim() }, false);
$('#rrb').onclick = () => confirm('Kembalikan semua makna di bab ini ke versi umum? Catatanmu tetap aman.') && commit(() => { delete mine.p });
$('#rrk').onclick = async () => {
  if (!confirm('Kembalikan semua makna di kitab ini ke versi umum? Catatanmu tetap aman.')) return;
  try { await resetKitab(book.id); mine = await getMine(book.id, bid()); draw(false, true); toast('Makna dikembalikan ke versi umum') } catch (e) { err('Gagal reset: ', e) }
};
const refresh = async () => { mine = await getMine(book.id, bid()); $('#bn').value = mine.n || ''; draw(false, true) };
$('#wb').onclick = async () => {
  if (!confirm('Hapus SEMUA makna dan catatan milikmu di bab ini? Tidak bisa dibatalkan.')) return;
  if (await commit(() => { mine.p = {}; mine.c = {}; mine.n = '' })) { $('#bn').value = ''; toast('Data bab ini dihapus') }
};
$('#wk').onclick = async () => {
  if (!confirm('Hapus SEMUA makna dan catatan milikmu di kitab ini? Tidak bisa dibatalkan.')) return;
  try { await wipeKitab(book.id); await refresh(); toast('Data kitab ini dihapus') } catch (e) { err('Gagal menghapus: ', e) }
};
$('#wa').onclick = async () => {
  if (!user || !confirm('Hapus SEMUA makna dan catatan milikmu di SEMUA kitab? Tidak bisa dibatalkan.') || !confirm('Yakin? Semua data pribadimu akan hilang dan kembali ke versi umum.')) return;
  try { await wipeAll(idx.map(k => k.id)); if (book && data) await refresh(); toast('Semua datamu dihapus') } catch (e) { err('Gagal menghapus: ', e) }
};
$('#acc').onclick = () => user ? logout() : login().catch(e => err('Gagal masuk: ', e));
onUser(async u => {
  $('#wa').hidden = !u;
  $('#acc').textContent = u ? `${(u.displayName || 'Akun').split(' ')[0]} · Keluar` : 'Masuk Google';
  if (!$('#rd').classList.contains('on') || !data) return;
  if (!u) { setEdit(false); mine = {} } else mine = await getMine(book.id, bid());
  $('#bn').value = mine.n || ''; draw(false, true);
});

/* ---- mulai ---- */
apply();
getIndex().then(l => { idx = l; renderHome() })
  .catch(() => $('#grid').innerHTML = '<div class="empty" style="grid-column:1/-1">Tidak bisa memuat data. Periksa koneksi lalu muat ulang.</div>');
