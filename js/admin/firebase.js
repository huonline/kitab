// Sambungan Firebase: variabel global F (firestore), A (auth), db, auth, user
const V='https://www.gstatic.com/firebasejs/10.14.1/';let F,A,db,auth,user;
const D=p=>F.doc(db,p),C=p=>F.collection(db,p);
const cfg=()=>{if(window.FIREBASE_CONFIG)return window.FIREBASE_CONFIG;try{return JSON.parse(localStorage.getItem('pustaka_fb'))}catch(e){return null}};
