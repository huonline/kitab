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
export const renderBab = (d, mode, dir) =>
  (d.title ? `<h2 class="bt">${esc(d.title)}</h2>` : '') + (d.rows || []).map(r => row(r, mode, dir)).join('');
