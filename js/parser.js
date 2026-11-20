// Aturan format teks impor (@kitab, ##, ~) dengan ID unik permanen tiap baris
const uidRow = () => 'r_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const normAr = s => String(s || '').replace(/[\u064B-\u065F\u0670\s]+/g, '').trim();

function stat(r) {
  return { notr: !String(r.t || '').trim(), chk: !!r.f };
}

function parse(txt) {
  const K = {}, B = [];
  let cb = null, last = null;
  txt.split(/\r?\n/).forEach(ln => {
    const s = ln.trim();
    if (!s) return;
    if (s[0] === '@') {
      const m = s.match(/^@(\S+)\s*(.*)$/);
      if (m) K[m[1].toLowerCase()] = m[2].trim();
      return;
    }
    if (s.startsWith('##')) {
      cb = { title: s.replace(/^#+\s*/, ''), rows: [] };
      B.push(cb);
      last = null;
      return;
    }
    // Abaikan baris > (pegon lama) jika ada, karena admin fokus matan + terjemah
    if (s[0] === '>') return;
    if (s[0] === '~' && last) {
      last.t = s.slice(1).trim();
      return;
    }
    if (!cb) {
      cb = { title: 'Bab 1', rows: [] };
      B.push(cb);
    }
    last = { id: uidRow(), a: s, t: '', f: 0 };
    cb.rows.push(last);
  });
  return { K, B };
}
