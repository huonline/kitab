import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { db, auth } from './reader-firebase.js';
import { store } from './reader-util.js';

export let user = null;

const ref = (uid, kid, bid) => doc(db, 'users', uid, 'k', kid, 'b', bid);
const key = (uid, kid, bid) => `${uid}/${kid}/${bid}`;
const lkey = (uid, kid, bid) => `pkk:u:${uid}:${kid}:${bid}`;
const opkey = (uid, kid, bid) => `pkk:u:sync:${uid}:${encodeURIComponent(kid)}:${encodeURIComponent(bid)}`;
const cache = new Map();
const syncing = new Map();

const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const byteLength = value => typeof TextEncoder !== 'undefined'
  ? new TextEncoder().encode(value).length
  : value.length * 2;

function validateMine(d) {
  if (!isObject(d)) throw new Error('Data Pegon harus berbentuk objek.');
  const p = d.p ?? {}, c = d.c ?? {}, n = d.n ?? '';
  if (!isObject(p) || !isObject(c)) throw new Error('Struktur makna dan catatan tidak valid.');
  const pk = Object.keys(p), ck = Object.keys(c);
  if (pk.length > 500 || ck.length > 500) throw new Error('Maksimal 500 entri makna dan 500 catatan per bab.');
  for (const [id, words] of Object.entries(p)) {
    if (!id || id.length > 128 || !Array.isArray(words) || words.length > 500
      || words.some(w => typeof w !== 'string' || w.length > 500)) {
      throw new Error('Format makna Pegon tidak valid atau terlalu panjang.');
    }
  }
  for (const [id, note] of Object.entries(c)) {
    if (!id || id.length > 128 || typeof note !== 'string' || note.length > 2000) {
      throw new Error('Format catatan baris tidak valid atau terlalu panjang.');
    }
  }
  if (typeof n !== 'string' || n.length > 5000) {
    throw new Error('Catatan bab maksimal 5.000 karakter.');
  }
  const payload = { p, c, n };
  if (byteLength(JSON.stringify(payload)) > 800 * 1024) {
    throw new Error('Data Pegon terlalu besar untuk disimpan dalam satu bab.');
  }
  return payload;
}

function cleanMine(d) {
  if (!isObject(d)) return { p: {}, c: {}, n: '' };
  const p = isObject(d.p) ? d.p : {};
  const c = isObject(d.c) ? d.c : {};
  return {
    p: Object.fromEntries(Object.entries(p).filter(([, v]) =>
      Array.isArray(v) && v.every(x => typeof x === 'string'))),
    c: Object.fromEntries(Object.entries(c).filter(([, v]) => typeof v === 'string')),
    n: typeof d.n === 'string' ? d.n : ''
  };
}

function readLocal(uid, kid, bid) {
  return cleanMine(store.get(lkey(uid, kid, bid), {}));
}

function writeLocal(uid, kid, bid, payload) {
  localStorage.setItem(lkey(uid, kid, bid), JSON.stringify(payload));
}

function markPending(uid, kid, bid, operation) {
  localStorage.setItem(opkey(uid, kid, bid), operation);
}

async function syncOne(uid, kid, bid) {
  const k = key(uid, kid, bid);
  if (syncing.has(k)) return syncing.get(k);

  const task = (async () => {
    while (user?.uid === uid) {
      const operation = localStorage.getItem(opkey(uid, kid, bid));
      if (!operation) return true;

      if (operation === 'delete') {
        await deleteDoc(ref(uid, kid, bid));
        if (localStorage.getItem(opkey(uid, kid, bid)) === 'delete') {
          localStorage.removeItem(opkey(uid, kid, bid));
          cache.set(k, { p: {}, c: {}, n: '' });
          return true;
        }
        continue;
      }

      if (operation !== 'set') throw new Error('Operasi sinkronisasi Pegon tidak dikenal.');
      const payload = readLocal(uid, kid, bid);
      validateMine(payload);
      const snapshot = JSON.stringify(payload);
      await setDoc(ref(uid, kid, bid), { ...payload, t: Date.now() });

      // Jika ada edit baru ketika penulisan berlangsung, lanjutkan dengan data terbaru.
      if (localStorage.getItem(opkey(uid, kid, bid)) === 'set'
        && JSON.stringify(readLocal(uid, kid, bid)) === snapshot) {
        localStorage.removeItem(opkey(uid, kid, bid));
        cache.set(k, payload);
        return true;
      }
    }
    return false;
  })();

  syncing.set(k, task);
  try {
    return await task;
  } finally {
    syncing.delete(k);
  }
}

export async function retryPending() {
  const uid = user?.uid;
  if (!uid || !navigator.onLine) return;
  const prefix = `pkk:u:sync:${uid}:`;
  const jobs = [];
  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.key(i);
    if (!item?.startsWith(prefix)) continue;
    const parts = item.slice(prefix.length).split(':');
    if (parts.length !== 2) continue;
    try {
      jobs.push(syncOne(uid, decodeURIComponent(parts[0]), decodeURIComponent(parts[1])));
    } catch { /* Biarkan operasi tertunda untuk percobaan berikutnya. */ }
  }
  await Promise.allSettled(jobs);
}

export const onUser = cb => onAuthStateChanged(auth, u => {
  user = u;
  if (u) retryPending();
  cb(u);
});

export const login = async () => {
  user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
  retryPending();
};
export const logout = () => signOut(auth);

export async function getMine(kid, bid) {
  if (!user) return {};
  const uid = user.uid, k = key(uid, kid, bid);
  const operation = localStorage.getItem(opkey(uid, kid, bid));

  // Perubahan lokal yang belum terkirim selalu lebih baru daripada salinan server.
  if (operation === 'delete') {
    if (navigator.onLine) syncOne(uid, kid, bid).catch(() => {});
    return { p: {}, c: {}, n: '' };
  }
  if (operation === 'set') {
    if (navigator.onLine) syncOne(uid, kid, bid).catch(() => {});
    return readLocal(uid, kid, bid);
  }
  if (cache.has(k)) return cache.get(k);

  const local = readLocal(uid, kid, bid);
  try {
    const snap = await getDoc(ref(uid, kid, bid));
    if (snap.exists()) {
      const remote = cleanMine(snap.data());
      cache.set(k, remote);
      store.set(lkey(uid, kid, bid), remote);
      return remote;
    }
    // Migrasi aman untuk cache versi lama yang belum memiliki penanda sinkronisasi.
    const hasLocal = Object.keys(local.p).length || Object.keys(local.c).length || local.n;
    if (hasLocal) {
      markPending(uid, kid, bid, 'set');
      cache.set(k, local);
      syncOne(uid, kid, bid).catch(() => {});
      return local;
    }
    cache.set(k, { p: {}, c: {}, n: '' });
    return cache.get(k);
  } catch {
    cache.set(k, local);
    return local;
  }
}

export async function saveMine(kid, bid, d) {
  if (!user) throw new Error('Silakan masuk terlebih dahulu.');
  const uid = user.uid, k = key(uid, kid, bid);
  const payload = validateMine({
    p: d?.p || {},
    c: d?.c || {},
    n: typeof d?.n === 'string' ? d.n.trim() : ''
  });
  const empty = !Object.keys(payload.p).length && !Object.keys(payload.c).length && !payload.n;

  try {
    if (empty) {
      localStorage.removeItem(lkey(uid, kid, bid));
      markPending(uid, kid, bid, 'delete');
      cache.set(k, payload);
    } else {
      writeLocal(uid, kid, bid, payload);
      markPending(uid, kid, bid, 'set');
      cache.set(k, payload);
    }
  } catch (e) {
    throw new Error('Tidak bisa menyimpan salinan lokal. Periksa ruang penyimpanan browser.');
  }

  try {
    await syncOne(uid, kid, bid);
  } catch (e) {
    e.localSaved = true;
    throw e;
  }
}

function clearLocalKitab(kid) {
  if (!user) return;
  const uid = user.uid;
  for (const k of [...cache.keys()) if (k.startsWith(`${uid}/${kid}/`)) cache.delete(k);
  const prefixes = [`pkk:u:${uid}:${kid}:`, `pkk:u:sync:${uid}:${encodeURIComponent(kid)}:`];
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const lk = localStorage.key(i);
    if (lk && prefixes.some(prefix => lk.startsWith(prefix))) localStorage.removeItem(lk);
  }
}

export async function resetKitab(kid) {
  if (!user) throw new Error('Silakan masuk terlebih dahulu.');
  const uid = user.uid;
  const s = await getDocs(collection(db, 'users', uid, 'k', kid, 'b'));
  for (const x of s.docs) await saveMine(kid, x.id, { ...x.data(), p: {} });
  clearLocalKitab(kid);
}

export async function wipeKitab(kid) {
  if (!user) throw new Error('Silakan masuk terlebih dahulu.');
  const uid = user.uid;
  const s = await getDocs(collection(db, 'users', uid, 'k', kid, 'b'));
  for (const x of s.docs) await saveMine(kid, x.id, { p: {}, c: {}, n: '' });
  clearLocalKitab(kid);
}

export async function wipeAll(kids) {
  for (const id of kids) await wipeKitab(id);
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => retryPending());
}
