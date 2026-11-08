import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
// window.FIREBASE_CONFIG diisi oleh js/config.js (berkas yang sama dengan admin)
export const db = getFirestore(initializeApp(window.FIREBASE_CONFIG));
