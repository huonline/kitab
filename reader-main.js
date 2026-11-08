import { $, $$, esc, store } from './reader-util.js';
import { prefs, save, apply, navMode } from './reader-prefs.js';
import { getIndex, getToc, getBab } from './reader-data.js';
import { renderBab } from './reader-render.js';
import * as nav from './reader-nav.js';

let idx = [], toc = [], book = null, N = 1, num = 1, data = null;
const app = $('#app'), foot = $('#foot');
apply();

function bar(title, inBook) {
  $('#ttl').textContent = title;
  $('#back').hidden = $('#babSel').hidden = foot.hidden = !inBook;
}
const lastBab = id => store.get('pkk:last:' + id, 1);

async function route() {
  const [, t, id, n] = location.hash.split('/');
  nav.destroy();
  if (!idx.length) {
    app.innerHTML = '<p class="err">Memuat daftar kitab…</p>';
    try { idx = await getIndex() } catch { app.innerHTML = '<p class="err">Tidak bisa memuat data. Periksa koneksi lalu muat ulang.</p>'; return }
  }
  t === 'k' && id ? openBook(decodeURIComponent(id), +n || 0) : home();
}

function home() {
  book = null; bar('Pustaka Kitab Kuning', false);
  app.className = 'home';
  app.innerHTML = '<input id="q" type="search" placeholder="Cari judul, pengarang, atau fan"><div id="lst"></div>';
  const draw = () => {
    const q = $('#q').value.trim().toLowerCase();
    const l = idx.filter(k => [k.title, k.ar, k.author, k.cat].join(' ').toLowerCase().includes(q));
    $('#lst').innerHTML = l.length ? l.map(k =>
      `<a class="card" href="#/k/${encodeURIComponent(k.id)}/${lastBab(k.id)}">
        <span class="ar">${esc(k.ar || '')}</span><h3>${esc(k.title)}</h3>
        <small>${esc(k.author || '')} · ${esc(k.cat || '')} · ${k.nbab || 1} bab</small></a>`).join('')
      : '<p class="mt">Kitab tidak ditemukan. Coba kata kunci lain.</p>';
  };
  $('#q').oninput = draw; draw();
}

async function openBook(id, n) {
  const k = idx.find(x => x.id === id);
  if (!k) { app.className = ''; app.innerHTML = '<p class="err">Kitab tidak ditemukan.</p>'; return }
  if (book?.id !== id) {
    bar(k.title, true); app.className = '';
    app.innerHTML = '<div id="vp"><div id="pg"><p class="err">Memuat…</p></div></div>';
    toc = await getToc(k); book = k; N = toc.length;
    $('#babSel').innerHTML = toc.map((b, i) => `<option value="${i + 1}">${esc(b.t || 'Bab ' + (i + 1))}</option>`).join('');
  }
  bar(k.title, true);
  show(n || lastBab(id));
}

async function show(n, end = false) {
  num = Math.min(Math.max(1, n), N);
  history.replaceState(null, '', `#/k/${encodeURIComponent(book.id)}/${num}`);
  $('#babSel').value = num;
  store.set('pkk:last:' + book.id, num);
  const pg = $('#pg');
  pg.innerHTML = '<p class="err">Memuat bab…</p>';
  try { data = await getBab(book, toc[num - 1].id) }
  catch (e) { pg.innerHTML = `<p class="err">${esc(e.message || 'Gagal memuat bab.')}</p>`; return }
  draw(end);
}

function draw(end = false) {
  const vp = $('#vp'), pg = $('#pg');
  pg.className = 'mode-' + prefs.mode;
  pg.innerHTML = renderBab(data, prefs.mode);
  nav.setup(vp, pg, navMode(), { info: s => $('#pos').textContent = s, edge: d => show(num + d, d < 0) });
  document.fonts?.ready.then(() => { nav.layout(); if (end) nav.toEnd() });
  vp.scrollTop = 0;
}

// Kontrol
$('#nx').onclick = () => nav.next();
$('#pv').onclick = () => nav.prev();
$('#babSel').onchange = e => show(+e.target.value);
addEventListener('hashchange', route);
addEventListener('resize', () => nav.layout());
addEventListener('keydown', e => {
  if (!book || $('#sheet').open) return;
  const geser = nav.isGeser();
  if (e.key === 'ArrowLeft' && geser || e.key === 'PageDown' && !geser) nav.next();
  if (e.key === 'ArrowRight' && geser || e.key === 'PageUp' && !geser) nav.prev();
});

// Pengaturan
const sheet = $('#sheet'), sync = () => {
  $$('#sheet [data-k]').forEach(b => b.setAttribute('aria-pressed', String(prefs[b.dataset.k] === b.dataset.v)));
  $('#size').value = prefs.size;
};
$('#cfg').onclick = () => { sync(); sheet.showModal() };
$('#close').onclick = () => sheet.close();
sheet.onclick = e => {
  const b = e.target.closest('[data-k]'); if (!b) return;
  save({ [b.dataset.k]: b.dataset.v }); sync(); if (book && data) draw();
};
$('#size').oninput = e => { save({ size: +e.target.value }); nav.layout() };

route();
