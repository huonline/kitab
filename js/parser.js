
// Aturan format teks impor (@kitab, ##, >, ~) dan pemeriksaan baris
function stat(r){const n=words(r.a).length,f=r.m.filter(x=>x).length;return{none:!f,mis:f>0&&f!==n,notr:!r.t,chk:!!r.f}}
function parse(txt){const K={},B=[],w=[];let cb=null,last=null;
txt.split(/\r?\n/).forEach(ln=>{const s=ln.trim();if(!s)return;
if(s[0]==='@'){const m=s.match(/^@(\S+)\s*(.*)$/);if(m)K[m[1].toLowerCase()]=m[2].trim();return}
if(s.startsWith('##')){cb={title:s.replace(/^#+\s*/,''),rows:[]};B.push(cb);last=null;return}
if(s[0]==='>'&&last){last.m=s.slice(1).split('|').map(x=>x.trim());return}
if(s[0]==='~'&&last){last.t=s.slice(1).trim();return}
if(!cb){cb={title:'Bab 1',rows:[]};B.push(cb)}
last={a:s,m:[],t:'',f:0};cb.rows.push(last)});
B.forEach(b=>b.rows.forEach((r,i)=>{const n=words(r.a).length;if(r.m.length&&r.m.length!==n)w.push(b.title+' · baris '+(i+1)+': '+n+' kata tetapi '+r.m.length+' makna')}));
return{K,B,w}}
