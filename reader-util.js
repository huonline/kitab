export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const words = s => String(s || '').trim().split(/\s+/).filter(Boolean);
export const store = {
  get(k, d = null) { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } }
};
// Warna sampul tetap per kitab (tidak ada di Firestore)
const COLORS = ['#1f6f5c', '#7a3b2e', '#2f4b7c', '#6b4a8f', '#a0622a', '#2b2f36', '#8a2f4a'];
export const colorFor = id => COLORS[[...String(id)].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
