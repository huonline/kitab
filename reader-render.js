import { esc, words, chunk } from './reader-util.js';

// Satu kata: matan + makna pegon miring menggantung (lugot)
function word(a, m) {
  const ch = chunk(m), L = ch.length ? Math.max(...ch.map(x => x.length)) : 0;
  const pad = ch.length ? (L * 0.2 + ch.length * 0.35).toFixed(2) : 0;
  const mk = ch.length ? `<span class="m">${ch.map(c => `<i>${esc(c)}</i>`).join('')}</span>` : '';
  return `<span class="kw" style="--pad:${pad}"><span class="a">${esc(a)}</span>${mk}</span>`;
}

function row(r, mode) {
  const c = "row";
  if (mode === 'pegon') {
    const m = r.m || [];
    return `<div class="${c}">${words(r.a).map((x, i) => word(x, m[i])).join(' ')}</div>`;
  }
  if (mode === 'indo')
    return `<div class="${c} two"><p class="a">${esc(r.a)}</p><p class="t">${esc(r.t || '')}</p></div>`;
  return `<div class="${c}"><p class="a">${esc(r.a)}</p></div>`;
}

export const renderBab = (d, mode) =>
  (d.title ? `<h2 class="bt">${esc(d.title)}</h2>` : '') + (d.rows || []).map(r => row(r, mode)).join('');
