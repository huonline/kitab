import { $, $$, store } from './reader-util.js';
const K = 'pkk:pref2';
export const prefs = { th: 'light', fs: 24, lh: 20, ff: "Amiri,'Noto Naskh Arabic',serif", dir: 'auto', mode: 'pegon', nav: '', fa: 34, pm: 15, gr: 28, gj: 90, gh: 56, ...store.get(K, {}) };
// Default: tablet = geser, HP = gulir
export const navMode = () => prefs.nav || (matchMedia('(min-width:768px)').matches ? 'geser' : 'gulir');
export function apply() {
  const r = $('#rd'), t = $('#rt');
  r.dataset.rt = prefs.th;
  t.style.fontSize = prefs.fs + 'px'; t.style.lineHeight = prefs.lh / 10; t.style.fontFamily = prefs.ff;
  t.style.setProperty('--fa', prefs.fa + 'px'); t.style.setProperty('--pm', prefs.pm + 'px');
  $('#rf').value = prefs.ff; $('#rlh').value = prefs.lh;
  [['gfa', 'fa'], ['gpm', 'pm'], ['ggr', 'gr'], ['ggj', 'gj'], ['ggh', 'gh']].forEach(([i, k]) => $('#' + i).value = prefs[k]);
  [['th', 'th'], ['dir', 'dir'], ['md', 'mode'], ['nv', 'nav']].forEach(([a, k]) =>
    $$(`[data-${a}]`).forEach(b => b.classList.toggle('on', b.dataset[a] === prefs[k])));
  store.set(K, prefs);
}
export const set = p => { Object.assign(prefs, p); apply() };
