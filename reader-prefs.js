import { store } from './reader-util.js';
const K = 'pkk:prefs';
export const prefs = { mode: 'pegon', nav: '', size: 28, theme: 'auto', ...store.get(K, {}) };
export function apply() {
  const r = document.documentElement;
  r.style.setProperty('--fs', prefs.size + 'px');
  r.dataset.theme = prefs.theme;
}
export function save(p) { Object.assign(prefs, p); store.set(K, prefs); apply() }
// Default: tablet = geser, HP = gulir
export const navMode = () => prefs.nav || (matchMedia('(min-width:768px)').matches ? 'geser' : 'gulir');
