// Navigasi: Geser (paging per layar, maju = kiri ke kanan) dan Gulir
let vp, pg, mode = 'gulir', i = 0, n = 1, w = 0, cb = {};

export function setup(v, p, m, callbacks) {
  vp = v; pg = p; mode = m; cb = callbacks; i = 0;
  vp.className = m;
  vp.ontouchstart = vp.ontouchend = null;
  vp.onscroll = null;
  if (m === 'geser') {
    let x = 0, y = 0;
    vp.ontouchstart = e => { x = e.changedTouches[0].clientX; y = e.changedTouches[0].clientY };
    vp.ontouchend = e => {
      const dx = e.changedTouches[0].clientX - x, dy = e.changedTouches[0].clientY - y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx > 0 ? next() : prev();
    };
  } else vp.onscroll = update;
  layout();
}

export function layout() {
  if (!vp) return;
  if (mode === 'gulir') { pg.style.cssText = ''; return update() }
  w = vp.clientWidth;
  pg.style.cssText = `height:${vp.clientHeight}px;width:${w}px;column-width:${w}px;column-gap:0;transform:none;transition:none`;
  const left = Math.min(...[...pg.children].map(c => c.getBoundingClientRect().left));
  n = Math.max(1, Math.ceil((vp.getBoundingClientRect().right - left - 2) / w));
  i = Math.min(i, n - 1);
  go(i, false);
}

function go(k, anim = true) {
  i = Math.max(0, Math.min(n - 1, k));
  pg.style.transition = anim ? '' : 'none';
  pg.style.transform = `translateX(${i * w}px)`;
  update();
}

export function update() {
  if (mode === 'geser') return cb.info?.(`${i + 1} / ${n}`);
  const max = vp.scrollHeight - vp.clientHeight;
  cb.info?.(max > 0 ? Math.round(vp.scrollTop / max * 100) + '%' : '100%');
}

const atBottom = () => vp.scrollTop + vp.clientHeight >= vp.scrollHeight - 4;
export function next() {
  if (mode === 'geser') return i < n - 1 ? go(i + 1) : cb.edge?.(1);
  atBottom() ? cb.edge?.(1) : vp.scrollBy({ top: vp.clientHeight * .9, behavior: 'smooth' });
}
export function prev() {
  if (mode === 'geser') return i > 0 ? go(i - 1) : cb.edge?.(-1);
  vp.scrollTop <= 0 ? cb.edge?.(-1) : vp.scrollBy({ top: -vp.clientHeight * .9, behavior: 'smooth' });
}
export function toEnd() { mode === 'geser' ? go(n - 1, false) : (vp.scrollTop = vp.scrollHeight) }
export const isGeser = () => mode === 'geser';
export function destroy() { vp = pg = null }
