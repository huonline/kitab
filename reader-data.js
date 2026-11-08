import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { db } from './reader-firebase.js';
import { store } from './reader-util.js';

export async function getIndex() {
  try {
    const s = await getDoc(doc(db, 'meta', 'index'));
    const list = s.exists() ? (s.data().list || []) : [];
    store.set('pkk:index', list);
    return list;
  } catch (e) {
    const c = store.get('pkk:index');
    if (c) return c;
    throw e;
  }
}

// Daftar bab [{id, t}] dari pub/{id}.babs. Jika belum ada (kitab diterbitkan sebelum
// patch admin), tebak b0001..b{nbab}. Hasil di-cache per revisi.
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
