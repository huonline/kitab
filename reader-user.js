import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { db, auth } from './reader-firebase.js';

export let user = null;
export const onUser = cb => onAuthStateChanged(auth, u => { user = u; cb(u) });
export const login = async () => { user = (await signInWithPopup(auth, new GoogleAuthProvider())).user };
export const logout = () => signOut(auth);

const ref = (kid, bid) => doc(db, 'users', user.uid, 'k', kid, 'b', bid);
const key = (kid, bid) => `${user.uid}/${kid}/${bid}`;
const cache = new Map();

export async function getMine(kid, bid) {
  if (!user) return {};
  const k = key(kid, bid);
  if (cache.has(k)) return cache.get(k);
  let d = {};
  try { const s = await getDoc(ref(kid, bid)); d = s.exists() ? s.data() : {} } catch { }
  cache.set(k, d);
  return d;
}

// Satu tulis per simpan. Dokumen kosong dihapus supaya tidak menumpuk.
export async function saveMine(kid, bid, d) {
  const p = d.p || {}, c = d.c || {}, n = (d.n || '').trim();
  cache.set(key(kid, bid), { p, c, n });
  if (!Object.keys(p).length && !Object.keys(c).length && !n) await deleteDoc(ref(kid, bid));
  else await setDoc(ref(kid, bid), { p, c, n, t: Date.now() });
}

// Reset makna kitab: makna kembali ke versi umum, catatan pengguna tetap
export async function resetKitab(kid) {
  const s = await getDocs(collection(db, 'users', user.uid, 'k', kid, 'b'));
  for (const x of s.docs) await saveMine(kid, x.id, { ...x.data(), p: {} });
  for (const k of [...cache.keys()]) if (k.startsWith(`${user.uid}/${kid}/`)) cache.delete(k);
}
