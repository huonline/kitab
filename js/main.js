// Aksi tombol (ACT), event input, dan proses mulai (login & muat data)
const arm=(key,t)=>{if(S.arm===key){S.arm=null;return true}S.arm=key;t.textContent='Yakin?';return false};
const dirty=()=>{S.d=1;const e=$('#dy');if(e)e.textContent='● belum disimpan'};
const curB=()=>S.babs[S.k.id][S.bi];
const ACT={
scfg(){const t=$('#cc').value,c={};['apiKey','authDomain','projectId','storageBucket','messagingSenderId','appId'].forEach(k=>{const m=t.match(new RegExp('["\']?'+k+'["\']?\\s*:\\s*["\']([^"\']+)["\']'));if(m)c[k]=m[1]});
if(!c.apiKey||!c.projectId)return toast('Konfigurasi tidak valid');if(!c.authDomain)c.authDomain=c.projectId+'.firebaseapp.com';localStorage.setItem('pustaka_fb',JSON.stringify(c));location.reload()},
rcfg(){localStorage.removeItem('pustaka_fb');location.reload()},
async login(){const p=new A.GoogleAuthProvider();try{await A.signInWithPopup(auth,p)}catch(e){if(/popup-blocked/.test(e.code||''))A.signInWithRedirect(auth,p);else toast('Gagal masuk: '+(e.code||e.message))}},
out(){A.signOut(auth)},
async nav(t){if(S.d&&S.v==='edit'&&!confirm('Perubahan belum disimpan. Tinggalkan?'))return;S.d=0;S.v=t.dataset.v;if(['babs','find','edit'].includes(S.v)&&S.k)await getBabs(S.k);draw()},
async open(t){S.k=S.list.find(x=>x.id===t.dataset.id);await getBabs(S.k);S.v='babs';draw()},
async pub(t){const k=S.list.find(x=>x.id===t.dataset.id);if(arm('p'+k.id,t))publish(k)},
async delk(t){const k=S.list.find(x=>x.id===t.dataset.id);if(arm('k'+k.id,t))delKitab(k)},
chk(){S.it=$('#it').value;S.imp=parse(S.it);draw()},go:doImport,
eb(t){S.bi=+t.dataset.i;S.d=0;S.v='edit';draw()},
async db(t){if(!arm('b'+t.dataset.i,t))return;const k=S.k,bs=S.babs[k.id],b=bs[+t.dataset.i];try{await F.deleteDoc(D('drafts/'+k.id+'/bab/'+b.id));bs.splice(+t.dataset.i,1);await touch(k);draw()}catch(e){toast('Gagal: '+(e.code||e.message))}},
async nb(){const k=S.k,bs=S.babs[k.id],i=nextI(bs),b={id:'b'+String(i).padStart(4,'0'),i,title:'Bab '+i,rows:[{a:'',m:[],t:'',f:0}]};bs.push(b);try{await wb(k,b);await touch(k)}catch(e){toast('Gagal: '+(e.code||e.message))}S.bi=bs.length-1;S.v='edit';draw()},
async save(){const k=S.k,b=curB();b.title=$('#bt').value.trim()||b.title;try{await wb(k,b);await touch(k);S.d=0;$('#dy').textContent='✓ tersimpan'}catch(e){toast('Gagal: '+(e.code||e.message))}},
add(t){curB().rows.splice(+t.dataset.i+1,0,{a:'',m:[],t:'',f:0});dirty();draw()},
del(t){if(arm('r'+t.dataset.i,t)){curB().rows.splice(+t.dataset.i,1);dirty();draw()}},
flt(t){S.flt=t.dataset.f;draw()},
go2(t){S.bi=+t.dataset.bi;S.v='edit';S.d=0;draw();const e=document.querySelector('.r[data-i="'+t.dataset.ri+'"]');if(e){e.scrollIntoView();e.style.outline='2px solid var(--ac)'}}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&ACT[t.dataset.a])ACT[t.dataset.a](t)});
document.addEventListener('input',e=>{const t=e.target;if(t.id==='fq'){S.q=t.value;$('#fr').innerHTML=fres();return}const r0=t.closest('.r');if(!r0)return;const r=curB().rows[+r0.dataset.i];if(t.classList.contains('m'))r.m[+t.dataset.j]=t.value;else if(t.classList.contains('t'))r.t=t.value;else return;dirty()});
document.addEventListener('change',e=>{const t=e.target,r0=t.closest('.r');if(!r0)return;const i=+r0.dataset.i,r=curB().rows[i];if(t.classList.contains('f')){r.f=t.checked?1:0;dirty()}else if(t.classList.contains('a')){r.a=t.value.trim();r.m=words(r.a).map((_,j)=>r.m[j]||'');r0.outerHTML=rowH(r,i);dirty()}});
window.addEventListener('beforeunload',e=>{if(S.d){e.preventDefault();e.returnValue=''}});
(async()=>{const c=cfg();if(!c){draw();return}try{const[a,au,fs]=await Promise.all([import(V+'firebase-app.js'),import(V+'firebase-auth.js'),import(V+'firebase-firestore.js')]);F=fs;A=au;const app=a.initializeApp(c);auth=au.getAuth(app);db=fs.getFirestore(app);
au.onAuthStateChanged(auth,async u=>{user=u;if(u)try{await loadList()}catch(e){toast('Gagal memuat: '+(e.code||e.message))}draw()})}catch(e){$('#app').textContent='Gagal memuat Firebase: '+e.message}})();
