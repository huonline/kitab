// Tampilan Admin: khusus Matan & Terjemah Indonesia + Tab Pengaturan Muqodimah/Donasi/WA
function rowH(r, i) {
  return `<div class="c r" data-i="${i}">
    <div class="bar" style="margin-bottom:8px">
      <b>${i + 1}</b>
      <small>ID: <code>${esc(r.id || '-')}</code></small>
      <span class="sp"></span>
      <label><input type="checkbox" class="f" ${r.f ? 'checked' : ''}> periksa</label>
      <button data-a="add" data-i="${i}" title="Sisipkan baris di bawah">＋</button>
      <button class="d" data-a="del" data-i="${i}" title="Hapus baris">🗑</button>
    </div>
    <input class="in a" style="font:21px Amiri,serif;margin-bottom:8px" dir="rtl" placeholder="Matan Arab..." value="${esc(r.a)}">
    <input class="in t" placeholder="Terjemah Indonesia (opsional, biarkan kosong jika matan saja)" value="${esc(r.t || '')}">
  </div>`;
}

function fres() {
  const bs = S.babs[S.k.id] || [], f = S.flt, q = S.q.toLowerCase(), res = [];
  bs.forEach((b, bi) => b.rows.forEach((r, ri) => {
    if (f !== 'all' && !stat(r)[f]) return;
    if (q && !(r.a + ' ' + (r.t || '')).toLowerCase().includes(q)) return;
    res.push([bi, ri, b, r]);
  }));
  return `<p>${res.length} hasil${res.length > 100 ? ' (100 pertama)' : ''}</p>` +
    res.slice(0, 100).map(([bi, ri, b, r]) => `<div class="c" data-a="go2" data-bi="${bi}" data-ri="${ri}" style="cursor:pointer">
      <small>${esc(b.title)} · baris ${ri + 1}</small>
      <div dir="rtl" style="font:20px Amiri,serif">${esc(r.a)}</div>
      <small>${esc(r.t || '(belum ada terjemah)')}</small>
    </div>`).join('');
}

const NOK = '<div class="c">Pilih kitab dulu di tab Kitab.</div>';

const VIEW = {
  list() {
    return S.list.length ? S.list.map(k => {
      const st = k.pubAt ? (k.upd > k.pubAt + 2000 ? 'Ada perubahan belum terbit' : 'Terbit') : 'Draf';
      return `<div class="c bar"><div class="sp"><b>${esc(k.title)}</b> <span dir="rtl">${esc(k.ar)}</span><br><small>${esc(k.cat)} · ${k.nbab || 0} bab · ${k.nrows || 0} baris · ${st}</small></div><button data-a="open" data-id="${k.id}">Buka</button><button class="p" data-a="pub" data-id="${k.id}">Terbitkan</button><button class="d" data-a="delk" data-id="${k.id}">Hapus</button></div>`;
    }).join('') : '<div class="c">Belum ada kitab. Buka tab Impor.</div>';
  },
  imp() {
    const p = S.imp;
    return `<div class="c">
      <p><small>Bisa upload <b>Matan saja</b> atau <b>Matan + Terjemah Indonesia (~)</b>. Saat memperbarui bab yang sudah ada, ID kalimat yang matannya sama akan dipertahankan otomatis.</small></p>
      <textarea id="it" class="in" rows="12" dir="auto" placeholder="@kitab Safinatun Najah&#10;@arab سفينة النجاة&#10;@pengarang Syekh Salim bin Sumair&#10;@kategori Kitab Kuning&#10;@fan Fiqih&#10;&#10;## Bab 1&#10;بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ&#10;~Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang&#10;&#10;الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ&#10;(Baris tanpa ~ tetap tersimpan sebagai matan saja)">${esc(S.it)}</textarea>
      <p><button class="p" data-a="chk">Periksa</button></p>
      ${p ? `<h3>Pratinjau</h3><p>Kitab: <b>${esc(p.K.kitab || S.k?.title || '(belum ada @kitab)')}</b></p><ul>${p.B.map(b => `<li>${esc(b.title)} — ${b.rows.length} baris</li>`).join('')}</ul><small>Bab dengan judul sama akan diperbarui tanpa merusak makna Pegon user pada kalimat yang sama.</small><p><button class="p" data-a="go">Simpan ke draf</button></p>` : ''}
    </div>`;
  },
  babs() {
    if (!S.k) return NOK;
    const bs = S.babs[S.k.id];
    if (!bs) return '<div class="c">Memuat…</div>';
    return bs.map((b, i) => `<div class="c bar"><div class="sp"><b>${esc(b.title)}</b><br><small>${b.rows.length} baris · ${b.rows.filter(r => !stat(r).notr).length} diterjemah</small></div><button class="p" data-a="eb" data-i="${i}">Edit</button><button class="d" data-a="db" data-i="${i}">Hapus</button></div>`).join('') + '<button data-a="nb">＋ Bab baru</button>';
  },
  edit() {
    if (!S.k) return NOK;
    const b = S.babs[S.k.id][S.bi];
    return `<div class="c bar"><button data-a="nav" data-v="babs">← Bab</button><input class="in sp" id="bt" value="${esc(b.title)}"><button class="p" data-a="save">Simpan</button><span id="dy">${S.d ? '● belum disimpan' : ''}</span></div>` +
      b.rows.map(rowH).join('') +
      `<button data-a="add" data-i="${b.rows.length - 1}">＋ Baris</button>`;
  },
  find() {
    if (!S.k) return NOK;
    return `<div class="c"><input class="in" id="fq" placeholder="Cari matan Arab atau terjemah Indonesia..." value="${esc(S.q)}"><div class="bar" style="margin-top:8px">${[['all', 'Semua'], ['notr', 'Belum diterjemah'], ['chk', 'Perlu diperiksa']].map(([k, t]) => `<button class="${S.flt === k ? 'p' : ''}" data-a="flt" data-f="${k}">${t}</button>`).join('')}</div></div><div id="fr">${fres()}</div>`;
  },
  site() {
    const s = S.site;
    return `<div class="c">
      <h3>Identitas &amp; Kontak WhatsApp</h3>
      <p><small>Nama Aplikasi</small><input class="in" id="st_app" value="${esc(s.appName || '')}"></p>
      <p><small>Subjudul / Tagline</small><input class="in" id="st_tag" value="${esc(s.tagline || '')}"></p>
      <p><small>Nomor WhatsApp (awalan 62)</small><input class="in" id="st_wa" value="${esc(s.wa || '6285810751243')}"></p>
      <h3>Donasi &amp; Rekening</h3>
      <p><small>Label Bank / E-Wallet</small><input class="in" id="st_rbank" value="${esc(s.rekBank || '')}"></p>
      <p><small>Nomor Rekening</small><input class="in" id="st_rno" value="${esc(s.rekNo || '')}"></p>
      <p><small>Atas Nama</small><input class="in" id="st_rname" value="${esc(s.rekName || '')}"></p>
      <p><small>Link Gambar QRIS (kosongkan jika belum ada)</small><input class="in" id="st_qris" placeholder="https://..." value="${esc(s.qrisUrl || '')}"></p>
      <h3>Muqodimah &amp; Biografi Penerbit</h3>
      <p><small>Nama Penerbit / Penyusun</small><input class="in" id="st_pub" value="${esc(s.publisherName || '')}"></p>
      <p><small>Biografi Penerbit</small><textarea class="in" id="st_bio" rows="4">${esc(s.publisherBio || '')}</textarea></p>
      <p><small>Teks Muqodimah</small><textarea class="in" id="st_muq" rows="7">${esc(s.muqodimah || '')}</textarea></p>
      <button class="p" data-a="svsite">Simpan Pengaturan Situs</button>
    </div>`;
  }
};

function draw() {
  const a = $('#app'), c = cfg();
  if (!c) {
    a.innerHTML = '<div class="c"><h2>Konfigurasi Firebase</h2><textarea id="cc" class="in" rows="7" placeholder="Tempel firebaseConfig dari Project settings"></textarea><p><button class="p" data-a="scfg">Simpan</button></p></div>';
    return;
  }
  if (!user) {
    a.innerHTML = `<div class="c"><h2>Admin Pustaka</h2><button class="p" data-a="login">Masuk dengan Google</button> <button class="a" data-a="rcfg">Ganti konfigurasi</button></div>`;
    return;
  }
  const allow = window.ADMIN_UIDS || [];
  if (allow.length && !allow.includes(user.uid)) {
    a.innerHTML = `<div class="c"><h2>Akses Ditolak</h2><p>Akun <b>${esc(user.email)}</b> tidak terdaftar sebagai admin.</p><p>UID Anda: <code>${esc(user.uid)}</code></p><button data-a="out">Keluar</button></div>`;
    return;
  }
  a.innerHTML = `<div class="bar"><b>📚 Admin</b><span class="sp"></span><small>${esc(user.email)} · UID: <code>${user.uid}</code></small><button data-a="out">Keluar</button></div>
    <div class="bar" style="margin:10px 0">${[['list', 'Kitab'], ['imp', 'Impor'], ['babs', 'Bab'], ['find', 'Cari'], ['site', 'Pengaturan']].map(([v, t]) => `<button class="${S.v === v || (S.v === 'edit' && v === 'babs') ? 'p' : ''}" data-a="nav" data-v="${v}">${t}</button>`).join('')}<span class="sp"></span>${S.k && S.v !== 'site' ? `<b>${esc(S.k.title)}</b>` : ''}</div>` +
    VIEW[S.v]();
}
