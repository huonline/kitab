import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { db, auth } from './reader-firebase.js';
import { store } from './reader-util.js';

export let user = null;
export const onUser = cb => onAuthStateChanged(auth, u => { user = u; cb(u) });
export const login = async () => { user = (await signInWithPopup(auth, new GoogleAuthProvider())).user };
export const logout = () => signOut(auth);

const ref = (kid, bid) => doc(db, 'users', user.uid, 'k', kid, 'b', bid);
const key = (kid, bid) => `${user.uid}/${kid}/${bid}`;
const lkey = (kid, bid) => `pkk:u:${user.uid}:${kid}:${bid}`;
const cache = new Map();

export async function getMine(kid, bid) {
  if (!user) return {};
  const k = key(kid, bid);
  if (cache.has(k)) return cache.get(k);
  const local = store.get(lkey(kid, bid));
  if (local) { cache.set(k, local); return local }
  let d = {};
  try { const s = await getDoc(ref(kid, bid)); d = s.exists() ? s.data() : {} } catch { }
  cache.set(k, d);
  store.set(lkey(kid, bid), d);
  return d;
}

export async function saveMine(kid, bid, d) {
  const p = d.p || {}, c = d.c || {}, n = (d.n || '').trim();
  const payload = { p, c, n };
  cache.set(key(kid, bid), payload);
  if (!Object.keys(p).length && !Object.keys(c).length && !n) {
    localStorage.removeItem(lkey(kid, bid));
    await deleteDoc(ref(kid, bid));
  } else {
    store.set(lkey(kid, bid), payload);
    await setDoc(ref(kid, bid), { ...payload, t: Date.now() });
  }
}

function clearLocalKitab(kid) {
  for (const k of [...cache.keys()]) if (k.startsWith(`${user.uid}/${kid}/`)) cache.delete(k);
  const pref = `pkk:u:${user.uid}:${kid}:`;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const lk = localStorage.key(i);
    if (lk && lk.startsWith(pref)) localStorage.removeItem(lk);
  }
}

export async function resetKitab(kid) {
  const s = await getDocs(collection(db, 'users', user.uid, 'k', kid, 'b'));
  for (const x of s.docs) await saveMine(kid, x.id, { ...x.data(), p: {} });
  clearLocalKitab(kid);
}

export async function wipeKitab(kid) {
  const s = await getDocs(collection(db, 'users', user.uid, 'k', kid, 'b'));
  for (const x of s.docs) await deleteDoc(x.ref);
  clearLocalKitab(kid);
}

export async function wipeAll(kids) { for (const id of kids) await wipeKitab(id) }
