/* ==========================================================================
   DATA KITAB — Riyadhul Badi'ah
   --------------------------------------------------------------------------
   File ini KHUSUS berisi data/isi kitab, dipisah dari tampilan (style.css)
   dan logika (app.js), supaya gampang ditambah/diedit.

   Struktur tiap bab:
   {
     id, title, ar, lines: [ ... ] atau null (belum diisi)
   }

   Struktur tiap baris (line):
   {
     words: [ { full, bare, latin, pegon }, ... ],  // kata per kata
     translation: { latin: "...", pegon: "..." }     // arti satu kalimat penuh
   }

   Keterangan field kata:
   - full   : teks Arab LENGKAP dengan harokat
   - bare   : teks Arab TANPA harokat (otomatis dibuat oleh fungsi bare())
   - latin  : lugot/arti kata dalam huruf Latin (basa Sunda pesantren)
   - pegon  : lugot/arti kata dalam aksara Arab Pegon

   Catatan: isi contoh di bawah ini disusun sendiri sebagai CONTOH tampilan
   (matan Arab adalah teks klasik yang sudah menjadi milik umum). Silakan
   ganti/lengkapi sesuai kitab & terjemahan yang Anda pakai.
   ========================================================================== */

function bare(s) {
  // menghapus tanda harokat / tajwid dari teks Arab
  return s.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
}

function w(full, latin, pegon) {
  return { full, bare: bare(full), latin, pegon };
}

const chapters = [
  {
    id: 1,
    title: "Muqaddimah",
    ar: "الْمُقَدِّمَةُ",
    lines: [
      {
        words: [
          w("بِسْمِ", "kalayan nyebat", "كلاين ڽبوت"),
          w("اللّٰهِ", "jenengan Alloh", "جنڠن الله"),
          w("الرَّحْمٰنِ", "Nu Maha Welas Asih", "نو مها ولس اسيه"),
          w("الرَّحِيْمِ", "deui Maha Miwelas", "دوي مها ميولس"),
        ],
        translation: {
          latin: "Kalayan nyebat jenengan Alloh, Nu Maha Welas Asih deui Maha Miwelas.",
          pegon: "كلاين ڽبوت جنڠن الله، نو مها ولس اسيه دوي مها ميولس."
        }
      },
      {
        words: [
          w("قَالَ", "nyarios", "ڽاريوس"),
          w("الشَّيْخُ", "Syekh", "شيخ"),
          w("الْإِمَامُ", "anu jadi imam", "انو جادي امام"),
          w("هٰذِهِ", "ieu", "اييو"),
          w("خُلَاصَةٌ", "ringkesan", "رڠکسن"),
          w("فِيْ", "ngeunaan", "ڠنأن"),
          w("أُصُوْلِ", "pokok-pokok", "ڤوکوق٢"),
          w("الدِّيْنِ", "agama", "اڬام"),
          w("وَبَعْضِ", "sareng sabagian", "سارڠ سبڬين"),
          w("فُرُوْعِهٖ", "cabang-cabangna", "چابڠ٢نا"),
          w("عَلٰى", "numutkeun", "نومتکون"),
          w("مَذْهَبِ", "madzhab", "مذهب"),
          w("الْإِمَامِ الشَّافِعِيِّ", "Imam Syafi'i", "امام شافعي"),
          w("رَضِيَ اللّٰهُ عَنْهُ", "mugia Alloh ridho ka anjeunna", "موڬيا الله رضا كا انجنّا"),
          w("وَسَمَّيْتُهَا", "sareng ku abdi dinami", "سارڠ كو ابدي ديناميء"),
          w("رِيَاضَ", "taman", "تامان"),
          w("الْبَدِيْعَةِ", "nu endah", "نو اينده"),
        ],
        translation: {
          latin: "Syekh nu jadi imam nyarios: ieu ringkesan ngeunaan pokok-pokok agama sareng sabagian cabang-cabangna numutkeun madzhab Imam Syafi'i—mugia Alloh ridho ka anjeunna—sareng ku abdi dinami Riyadhul Badi'ah (Taman nu Endah).",
          pegon: "شيخ نو جادي امام ڽاريوس: اييو رڠکسن ڠنأن ڤوکوق٢ اڬام سارڠ سبڬين چابڠ٢نا نومتکون مذهب امام شافعي — موڬيا الله رضا كا انجنّا — سارڠ كو ابدي ديناميء رياض البديعة."
        }
      }
    ]
  },
  { id: 2, title: "Thaharah (Bersuci)", ar: "الطَّهَارَةُ", lines: null },
  { id: 3, title: "Hal yang Membatalkan Wudhu", ar: "نَوَاقِضُ الْوُضُوْءِ", lines: null },
  { id: 4, title: "Shalat", ar: "الصَّلَاةُ", lines: null },
  { id: 5, title: "Jenazah", ar: "الْجَنَائِزُ", lines: null },
  { id: 6, title: "Zakat", ar: "الزَّكَاةُ", lines: null },
  { id: 7, title: "Puasa", ar: "الصِّيَامُ", lines: null },
  { id: 8, title: "Haji dan Umrah", ar: "الْحَجُّ وَالْعُمْرَةُ", lines: null },
  { id: 9, title: "Kurban dan Akikah", ar: "الْأُضْحِيَةُ وَالْعَقِيْقَةُ", lines: null },
  { id: 10, title: "Sumpah dan Nazar", ar: "الْأَيْمَانُ وَالنُّذُوْرُ", lines: null },
  { id: 11, title: "Tasawuf (Penutup)", ar: "خَاتِمَةٌ فِي التَّصَوُّفِ", lines: null },
];
