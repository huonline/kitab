// Data & Firestore: state aplikasi, baca/tulis draf, impor anti-geser ID, terbitkan, pengaturan situs
const S = { list: [], babs: {}, site: { ...(window.SITE_DEFAULTS || {}) }, k: null, v: 'list', bi: null, d: 0, flt: 'all', q: '', imp: null, it: '', arm: null };

async function loadList() {
  const [s, ix] = await Promise.all([F.getDocs(C('drafts')), F.getDoc(D('meta/index'))]);
  S.list = s.docs.map(d => ({ ...d.data(), id: d.id })).sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  if (ix.exists() && ix.data().site) S.site = { ...S.site, ...ix.data().site };
}

async function getBabs(k) {
  if (!S.babs[k.id]) {
    const s = await F.getDocs(F.query(C('drafts/' + k.id + '/bab'), F.orderBy('i')));
    S.babs[k.id] = s.docs.map(d => ({ ...d.data(), id: d.id }));
  }
  return S.babs[k.id];
}

async function touch(k) {
  const bs = S.babs[k.id] || [];
  k.nbab = bs.length;
  k.nrows = bs.reduce((n, b) => n + b.rows.length, 0);
  k.upd = Date.now();
  const { id, ...m } = k;
  await F.setDoc(D('drafts/' + id), m);
}

const cleanRows = rows => rows.map(r => ({
  id: r.id || uidRow(),
  a: r.a || '',
  t: r.t || '',
  f: r.f ? 1 : 0
}));

const wb = (k, b) => F.setDoc(D('drafts/' + k.id + '/bab/' + b.id), { i: b.i, title: b.title, rows: cleanRows(b.rows) });
const nextI = bs => bs.reduce((m, x) => Math.max(m, x.i), 0) + 1;

async function doImport() {
  const p = S.imp, K = p.K;
  let k = S.list.find(x => x.title.toLowerCase() === (K.kitab || '').toLowerCase()) || (!K.kitab && S.k);
  if (!k) {
    if (!K.kitab) return toast('Tambahkan baris @kitab, atau buka kitabnya dulu');
    k = { id: 'k' + Date.now().toString(36), title: K.kitab };
    S.list.push(k);
    S.babs[k.id] = [];
  }
  Object.assign(k, {
    ar: K.arab ?? k.ar ?? '',
    author: K.pengarang ?? k.author ?? '',
    cat: K.kategori ?? k.cat ?? 'Kitab Kuning',
    fan: K.fan ?? k.fan ?? ''
  });
  try {
    const bs = await getBabs(k);
    for (const nb of p.B) {
      let b = bs.find(x => x.title === nb.title);
      if (b) {
        // Cocokkan matan Arab lama agar ID baris tetap sama dan Pegon user tidak bergeser
        const oldMap = new Map();
        (b.rows || []).forEach(or => {
          const key = normAr(or.a);
          if (!key) return;
          if (!oldMap.has(key)) oldMap.set(key, []);
          oldMap.get(key).push(or.id || uidRow());
        });
        b.rows = nb.rows.map(nr => {
          const qIds = oldMap.get(normAr(nr.a));
          const keptId = qIds && qIds.length ? qIds.shift() : nr.id;
          return { ...nr, id: keptId };
        });
      } else {
        const i = nextI(bs);
        b = { id: 'b' + String(i).padStart(4, '0'), i, title: nb.title, rows: nb.rows };
        bs.push(b);
      }
      await wb(k, b);
    }
    await touch(k);
    S.k = k; S.v = 'babs'; S.imp = null; S.it = '';
    toast('Tersimpan sebagai draf ✓');
    draw();
  } catch (e) { toast('Gagal: ' + (e.code || e.message)) }
}

async function publish(k) {
  toast('Menerbitkan…');
  try {
    const bs = await getBabs(k);
    for (const b of bs) {
      const rows = cleanRows(b.rows);
      b.rows = rows;
      await wb(k, b); // Pastikan semua baris di draf sudah punya id permanen
      await F.setDoc(D('pub/' + k.id + '/bab/' + b.id), { i: b.i, title: b.title, rows });
    }
    const ex = await F.getDocs(C('pub/' + k.id + '/bab'));
    for (const d of ex.docs) if (!bs.find(b => b.id === d.id)) await F.deleteDoc(d.ref);
    const rev = Date.now();
    const m = { id: k.id, title: k.title, ar: k.ar || '', author: k.author || '', cat: k.cat || '', fan: k.fan || '', nbab: bs.length, rev };
    await F.setDoc(D('pub/' + k.id), { ...m, babs: bs.map(b => ({ id: b.id, t: b.title })) });
    const ix = await F.getDoc(D('meta/index'));
    const prev = ix.exists() ? ix.data() : {};
    const l = (prev.list || []).filter(x => x.id !== k.id);
    l.push(m);
    await F.setDoc(D('meta/index'), { list: l, site: prev.site || S.site, rev });
    k.pubAt = rev;
    await touch(k);
    toast('Terbit ✓');
    draw();
  } catch (e) { toast('Gagal menerbitkan: ' + (e.code || e.message)) }
}

async function saveSite() {
  try {
    const ix = await F.getDoc(D('meta/index'));
    const prev = ix.exists() ? ix.data() : {};
    await F.setDoc(D('meta/index'), { list: prev.list || [], site: S.site, rev: Date.now() });
    toast('Pengaturan situs tersimpan ✓');
  } catch (e) { toast('Gagal menyimpan pengaturan: ' + (e.code || e.message)) }
}

async function delKitab(k) {
  try {
    for (const base of ['drafts', 'pub']) {
      const s = await F.getDocs(C(base + '/' + k.id + '/bab'));
      for (const d of s.docs) await F.deleteDoc(d.ref);
      await F.deleteDoc(D(base + '/' + k.id));
    }
    const ix = await F.getDoc(D('meta/index'));
    if (ix.exists()) {
      const prev = ix.data();
      await F.setDoc(D('meta/index'), { list: (prev.list || []).filter(x => x.id !== k.id), site: prev.site || S.site, rev: Date.now() });
    }
    S.list = S.list.filter(x => x !== k);
    delete S.babs[k.id];
    S.k = null; S.v = 'list';
    draw();
  } catch (e) { toast('Gagal hapus: ' + (e.code || e.message)) }
}
