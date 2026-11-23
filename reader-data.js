import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { db } from './reader-firebase.js';
import { store } from './reader-util.js';

export async function getMeta() {
  const defSite = window.SITE_DEFAULTS || {};
  try {
    const s = await getDoc(doc(db, 'meta', 'index'));
    const d = s.exists() ? s.data() : {};
    const res = { list: d.list || [], site: { ...defSite, ...(d.site || {}) } };
    store.set('pkk:meta', res);
    return res;
  } catch (e) {
    const c = store.get('pkk:meta');
    if (c) return { list: c.list || [], site: { ...defSite, ...(c.site || {}) } };
    throw e;
  }
}

export async function getToc(k) {
  const key = `pkk:t:${k.id}:${k.rev}`, c = store.get(key);
  if (c) return c;
  let t = null;
  try { const s = await getDoc(doc(db, 'pub', k.id)); t = s.exists() ? s.data().babs : null } catch { }
  if (t?.length) { store.set(key, t); return t }
  return Array.from({ length: k.nbab || 1 }, (_, i) => ({ id: 'b' + String(i + 1).padStart(4, '0') }));
}

export async function getBab(k, bid) {
  const key = `pkk:b:${k.id}:${k.rev}:${bid}`, c = store.get(key);
  if (c) return c;
  const s = await getDoc(doc(db, 'pub', k.id, 'bab', bid));
  if (!s.exists()) throw new Error('Bab belum tersedia.');
  const d = s.data();
  purgeOld(k);
  store.set(key, d);
  return d;
}

function purgeOld(k) {
  const keep = `:${k.id}:${k.rev}:`;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (/^pkk:[bt]:/.test(key) && key.includes(`:${k.id}:`) && !key.includes(keep)) localStorage.removeItem(key);
  }
}
