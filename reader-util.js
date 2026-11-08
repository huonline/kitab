export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const words = s => String(s || '').trim().split(/\s+/).filter(Boolean);
export const store = {
  get(k, d = null) { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } }
};
// Pecah teks pegon panjang jadi beberapa baris pendek (untuk lajur miring ///)
export function chunk(t, max = 9) {
  const out = []; let cur = '';
  for (const w of words(t)) {
    if (cur && (cur + ' ' + w).length > max) { out.push(cur); cur = w }
    else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) out.push(cur);
  return out;
}
