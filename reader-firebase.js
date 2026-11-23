import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
// window.FIREBASE_CONFIG diisi oleh js/config.js (berkas yang sama dengan admin)
const app = initializeApp(window.FIREBASE_CONFIG);
export const db = getFirestore(app);
export const auth = getAuth(app);
