import { esc, words } from './reader-util.js';
// Struktur sama dengan Pustaka_Saya.html (.gl > .w > .a + .m); fit() menata kemiringannya
function row(r, mode, dir) {
  const m = r.m || [];
  if (mode === 'pegon' && m.some(x => x))
    return `<div class="gl">${words(r.a).map((w, j) => `<div class="w"><span class="a">${esc(w)}</span><span class="m">${esc(m[j] || '')}</span></div>`).join('')}</div>`;
  if (mode === 'indo')
    return `<div class="two"><p dir="rtl">${esc(r.a)}</p><p class="tr" dir="auto">${esc(r.t || '')}</p></div>`;
  return `<p dir="${dir}">${esc(r.a)}</p>`;
}
// mine = data pribadi pengguna: p[baris] menggantikan makna umum, c[baris] = catatan
function rw(r, i, mode, dir, mine) {
  const p = mine.p?.[i], note = mine.c?.[i];
  return `<div class="rw${p !== undefined ? ' ed' : ''}" data-r="${i}">${row({ ...r, m: p ?? r.m }, mode, dir)}${note ? `<div class="cn" dir="auto">${esc(note)}</div>` : ''}</div>`;
}
export const renderBab = (d, mode, dir, mine = {}) =>
  (d.title ? `<h2 class="bt">${esc(d.title)}</h2>` : '') + (d.rows || []).map((r, i) => rw(r, i, mode, dir, mine)).join('') + (mine.n ? `<div class="cn bn" dir="auto">${esc(mine.n)}</div>` : '');
