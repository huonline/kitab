// Data & Firestore: state aplikasi, baca/tulis draf, impor, terbitkan, hapus
const S={list:[],babs:{},k:null,v:'list',bi:null,d:0,flt:'all',q:'',imp:null,it:'',arm:null};

async function loadList(){const s=await F.getDocs(C('drafts'));S.list=s.docs.map(d=>({...d.data(),id:d.id})).sort((a,b)=>(a.title||'').localeCompare(b.title||''))}
async function getBabs(k){if(!S.babs[k.id]){const s=await F.getDocs(F.query(C('drafts/'+k.id+'/bab'),F.orderBy('i')));S.babs[k.id]=s.docs.map(d=>({...d.data(),id:d.id}))}return S.babs[k.id]}
async function touch(k){const bs=S.babs[k.id]||[];k.nbab=bs.length;k.nrows=bs.reduce((n,b)=>n+b.rows.length,0);k.upd=Date.now();const{id,...m}=k;await F.setDoc(D('drafts/'+id),m)}
const wb=(k,b)=>F.setDoc(D('drafts/'+k.id+'/bab/'+b.id),{i:b.i,title:b.title,rows:b.rows});
const nextI=bs=>bs.reduce((m,x)=>Math.max(m,x.i),0)+1;
async function doImport(){const p=S.imp,K=p.K;let k=S.list.find(x=>x.title.toLowerCase()===(K.kitab||'').toLowerCase())||(!K.kitab&&S.k);
if(!k){if(!K.kitab)return toast('Tambahkan baris @kitab, atau buka kitabnya dulu');k={id:'k'+Date.now().toString(36),title:K.kitab};S.list.push(k);S.babs[k.id]=[]}
Object.assign(k,{ar:K.arab??k.ar??'',author:K.pengarang??k.author??'',cat:K.kategori??k.cat??'Kitab Kuning',fan:K.fan??k.fan??'',pegon:K.pegon??k.pegon??''});
try{const bs=await getBabs(k);for(const nb of p.B){let b=bs.find(x=>x.title===nb.title);if(b)b.rows=nb.rows;else{const i=nextI(bs);b={id:'b'+String(i).padStart(4,'0'),i,title:nb.title,rows:nb.rows};bs.push(b)}await wb(k,b)}
await touch(k);S.k=k;S.v='babs';S.imp=null;S.it='';toast('Tersimpan sebagai draf ✓');draw()}catch(e){toast('Gagal: '+(e.code||e.message))}}
async function publish(k){toast('Menerbitkan…');try{const bs=await getBabs(k);for(const b of bs)await F.setDoc(D('pub/'+k.id+'/bab/'+b.id),{i:b.i,title:b.title,rows:b.rows});
const ex=await F.getDocs(C('pub/'+k.id+'/bab'));for(const d of ex.docs)if(!bs.find(b=>b.id===d.id))await F.deleteDoc(d.ref);
const rev=Date.now(),m={id:k.id,title:k.title,ar:k.ar||'',author:k.author||'',cat:k.cat||'',fan:k.fan||'',pegon:k.pegon||'',nbab:bs.length,rev};await F.setDoc(D('pub/'+k.id),{...m,babs:bs.map(b=>({id:b.id,t:b.title}))});
const ix=await F.getDoc(D('meta/index')),l=(ix.exists()?ix.data().list:[]).filter(x=>x.id!==k.id);l.push(m);await F.setDoc(D('meta/index'),{list:l,rev});
k.pubAt=rev;await touch(k);toast('Terbit ✓');draw()}catch(e){toast('Gagal menerbitkan: '+(e.code||e.message))}}
async function delKitab(k){try{for(const base of['drafts','pub']){const s=await F.getDocs(C(base+'/'+k.id+'/bab'));for(const d of s.docs)await F.deleteDoc(d.ref);await F.deleteDoc(D(base+'/'+k.id))}
const ix=await F.getDoc(D('meta/index'));if(ix.exists())await F.setDoc(D('meta/index'),{list:ix.data().list.filter(x=>x.id!==k.id),rev:Date.now()});
S.list=S.list.filter(x=>x!==k);delete S.babs[k.id];S.k=null;S.v='list';draw()}catch(e){toast('Gagal hapus: '+(e.code||e.message))}}
