 const kitabData = [
            {
                id: "muqaddimah",
                title: "1. Mukaddimah Kitab",
                arabicTitle: "مقدمة الكتاب",
                description: "Pendahuluan Kitab Riyadhul Badi'ah",
                words: [
                    {
                        withHarokat: "قَالَ",
                        withoutHarokat: "قال",
                        pegon: "يَارَوْسْ",
                        latin: "ngadawuh",
                        irob: "Fi'il Madhi",
                        wordType: "Kalimah Fi'il",
                        explanation: "Fi'il Madhi mabni fathah zahir di akhirnya karena shahih akhir dan tidak bersambung dengan dhamir rafa' mutaharrik."
                    },
                    {
                        withHarokat: "الشَّيْخُ",
                        withoutHarokat: "الشيخ",
                        pegon: "شَيْخْ",
                        latin: "Syaikh",
                        irob: "Fa'il (Pelaku)",
                        wordType: "Kalimah Isim",
                        explanation: "Kedudukan sebagai Fa'il dari fi'il 'Qala', hukumnya marfu' dengan tanda dhammah."
                    },
                    {
                        withHarokat: "الإِمَامُ",
                        withoutHarokat: "الإمام",
                        pegon: "اَنُو جَادِي اِمَامْ",
                        latin: "anu jadi imam",
                        irob: "Na'at (Sifat)",
                        wordType: "Kalimah Isim",
                        explanation: "Na'at (sifat) berkedudukan marfu' mengikuti man'ut-nya yaitu 'Al-Syaikh'."
                    },
                    {
                        withHarokat: "هَذِهِ",
                        withoutHarokat: "هذه",
                        pegon: "اِيُوْ",
                        latin: "ieu",
                        irob: "Mubtada' (Isim Isyarah)",
                        wordType: "Kalimah Isim Isyarah",
                        explanation: "Isim isyarah untuk muannats mufrod, berkedudukan mahallan rafa' sebagai Mubtada'."
                    },
                    {
                        withHarokat: "خُلَاصَةٌ",
                        withoutHarokat: "خلاصة",
                        pegon: "رِئْكْسَنْ",
                        latin: "ringkesan",
                        irob: "Khobar Mubtada'",
                        wordType: "Kalimah Isim",
                        explanation: "Khobar dari Mubtada' 'Hadzihi', marfu' dengan tanda dhammah."
                    },
                    {
                        withHarokat: "فِي",
                        withoutHarokat: "في",
                        pegon: "دِنَا",
                        latin: "dina / ingdalem",
                        irob: "Huruf Jar",
                        wordType: "Harf",
                        explanation: "Harf Jar mabni sukun, berfungsi memajrurkan isim setelahnya."
                    },
                    {
                        withHarokat: "أُصُولِ",
                        withoutHarokat: "أصول",
                        pegon: "فُوْكُوْكْ٢",
                        latin: "poko-poko",
                        irob: "Majrur / Mudhaf",
                        wordType: "Kalimah Isim",
                        explanation: "Majrur disebabkan huruf jar 'Fi', bertanda kasrah dan berkedudukan sebagai Mudhaf."
                    },
                    {
                        withHarokat: "الدِّينِ",
                        withoutHarokat: "الدين",
                        pegon: "اَغَامَا",
                        latin: "agama",
                        irob: "Mudhaf Ilaih",
                        wordType: "Kalimah Isim",
                        explanation: "Mudhaf ilaih majrur dengan kasrah, menjelaskan penyandaran pokok-pokok keyakinan agama."
                    },
                    {
                        withHarokat: "وَبَعْضِ",
                        withoutHarokat: "وبعض",
                        pegon: "سَارِعْ سَبَاكِيَانْ",
                        latin: "jeung sawatara",
                        irob: "Ma'thuf",
                        wordType: "Kalimah Isim",
                        explanation: "Dihubungkan dengan huruf Athof 'Wawu' kepada 'Ushuli', maka berkedudukan majrur."
                    },
                    {
                        withHarokat: "فُرُوعِهِ",
                        withoutHarokat: "فروعه",
                        pegon: "جَابَعْ٢نَا",
                        latin: "cabang-cabangna",
                        irob: "Mudhaf Ilaih & Dhamir",
                        wordType: "Kalimah Isim + Isim Dhamir",
                        explanation: "Penyandaran cabang fiqih (Mudhaf ilaih) dengan Ha Dhamir muttashil yang kembali kepada ad-Din."
                    },
                    {
                        withHarokat: "عَلَى",
                        withoutHarokat: "على",
                        pegon: "نُوْمْتْكُنْ",
                        latin: "numutkeun",
                        irob: "Huruf Jar",
                        wordType: "Harf",
                        explanation: "Huruf jar mabni ala sukun di atas alif layyinah."
                    },
                    {
                        withHarokat: "مَذْهَبِ",
                        withoutHarokat: "مذهب",
                        pegon: "مَذْهَبْ",
                        latin: "madzhab",
                        irob: "Majrur",
                        wordType: "Kalimah Isim",
                        explanation: "Majrur dengan kasrah karena didahului huruf jar 'Ala'."
                    },
                    {
                        withHarokat: "الإِمَامِ",
                        withoutHarokat: "الإمام",
                        pegon: "اِمَامْ",
                        latin: "Imam",
                        irob: "Mudhaf Ilaih",
                        wordType: "Kalimah Isim",
                        explanation: "Penyandaran madzhab kepada sang Imam pelopor madzhab."
                    },
                    {
                        withHarokat: "الشَّافِعِيِّ",
                        withoutHarokat: "الشافعي",
                        pegon: "شَافِعِي",
                        latin: "Syafi'i",
                        irob: "Na'at / Nisbah",
                        wordType: "Kalimah Isim",
                        explanation: "Sifat penyebut nisbah kepada Imam asy-Syafi'i Radhiyallahu 'Anhu."
                    },
                    {
                        withHarokat: "رَضِيَ",
                        withoutHarokat: "رضي",
                        pegon: "مُوْكَارِضَا",
                        latin: "muga ridho",
                        irob: "Fi'il Madhi (Do'a)",
                        wordType: "Kalimah Fi'il",
                        explanation: "Secara lafaz adalah kalimat berita (fi'il madhi), namun bermakna doa (Insya'i thalabi)."
                    },
                    {
                        withHarokat: "اللهُ",
                        withoutHarokat: "الله",
                        pegon: "اَلله",
                        latin: "Gusti Allah",
                        irob: "Fa'il (Lafdzul Jalalah)",
                        wordType: "Isim Alam",
                        explanation: "Lafazh yang mulia (Lafdzul Jalalah) sebagai Fa'il (pelaku utama) yang memberi keridhaan."
                    },
                    {
                        withHarokat: "عَنْهُ",
                        withoutHarokat: "عنه",
                        pegon: "تِي مَانِيْهْنَا",
                        latin: "ti mantenna",
                        irob: "Jar-Majrur",
                        wordType: "Harf + Dhamir",
                        explanation: "Huruf Jar bersambung dengan dhamir ghaib mudzakkar muttashil."
                    },
                    {
                        withHarokat: "وَسَمَّيْتُهَا",
                        withoutHarokat: "وسميتها",
                        pegon: "سَارِعْ نْغَارَانَانْ كَوْلَا كُو اِيْدِي دِيْنَامِي",
                        latin: "jeung ngaranan kaula ku ieu dinamian",
                        irob: "Fi'il + Fa'il + Maf'ul Bih",
                        wordType: "Susunan Fi'liyah",
                        explanation: "Dan dinamakanlah ringkasan ini oleh saya (penulis) menjadi Riyadhul Badi'ah."
                    },
                    {
                        withHarokat: "رِيَاضَ",
                        withoutHarokat: "رياض",
                        pegon: "تَامَانْ",
                        latin: "taman",
                        irob: "Maf'ul Tsani",
                        wordType: "Kalimah Isim",
                        explanation: "Sebagai objek kedua dari kata 'sammaytu' (menamakan)."
                    },
                    {
                        withHarokat: "الْبَدِيعَةِ",
                        withoutHarokat: "البديعة",
                        pegon: "اَنُو اِنْدَاهْ",
                        latin: "anu indah / endah",
                        irob: "Na'at (Sifat)",
                        wordType: "Kalimah Isim",
                        explanation: "Menerangkan sifat keindahan taman rukun agama dan ibadah."
                    }
                ]
            },
            {
                id: "arkanul_islam",
                title: "2. Fashl: Rukun Islam",
                arabicTitle: "فصل: أركان الإسلام",
                description: "Penjelasan Rukun Islam & Syahadat",
                words: [
                    {
                        withHarokat: "أَرْكَانُ",
                        withoutHarokat: "أركان",
                        pegon: "اَرِي فِيرَا-فِيرَا رُوكُونْ",
                        latin: "Ari pirang-pirang rukun",
                        irob: "Mubtada'",
                        wordType: "Isim Jama' Taksir",
                        explanation: "Mubtada' marfu' dengan tanda dhammah di akhir karena jamak taksir."
                    },
                    {
                        withHarokat: "الإِسْلَامِ",
                        withoutHarokat: "الإslam",
                        pegon: "اِسْلَامْ",
                        latin: "Islam",
                        irob: "Mudhaf Ilaih",
                        wordType: "Kalimah Isim",
                        explanation: "Mudhaf ilaih majrur dengan kasrah zahirah."
                    },
                    {
                        withHarokat: "خَمْسَةٌ",
                        withoutHarokat: "خمسة",
                        pegon: "اِيُوْ لِيمَا",
                        latin: "ieu aya lima",
                        irob: "Khobar Mubtada'",
                        wordType: "Isim 'Adad",
                        explanation: "Khobar marfu' dengan dhommah, melengkapi kalimat rukun Islam ada lima."
                    },
                    {
                        withHarokat: "شَهَادَةُ",
                        withoutHarokat: "شهادة",
                        pegon: "سَبَاكِيَانَّا نِيَاتَانَا كَسَكْسِيَانْ",
                        latin: "nyatana saksina",
                        irob: "Badal (Pengganti)",
                        wordType: "Kalimah Isim",
                        explanation: "Badal mufassal (rincian) dari kata 'Khamsah' yang merinci rukun Islam."
                    },
                    {
                        withHarokat: "أَنْ",
                        withoutHarokat: "أن",
                        pegon: "سَاتَمَنَّا كَلَاكُوْاَنْ",
                        latin: "saenya kalakuan",
                        irob: "An-Mukhaffafah",
                        wordType: "Harf",
                        explanation: "An mukhaffafah minal tsaqilah, isimnya berupa dhamir sya'an yang dibuang."
                    },
                    {
                        withHarokat: "لاَ",
                        withoutHarokat: "لا",
                        pegon: "هَنْتِيْ اَيَا",
                        latin: "henteu aya",
                        irob: "La Nafiyah lil Jinsi",
                        wordType: "Harf",
                        explanation: "La penafian jenis secara mutlak, beramal seperti 'Inna'."
                    },
                    {
                        withHarokat: "إِلَهَ",
                        withoutHarokat: "إله",
                        pegon: "فَافَانْجِيرَانْ",
                        latin: "pangeran anu haq",
                        irob: "Isim La",
                        wordType: "Kalimah Isim",
                        explanation: "Isim La Nafiyah lil Jinsi mabni di atas fathah."
                    },
                    {
                        withHarokat: "إِلاَّ",
                        withoutHarokat: "إلا",
                        pegon: "اَنْمَا",
                        latin: "kecuali / anging",
                        irob: "Adat Istitsna (Pengecualian)",
                        wordType: "Harf",
                        explanation: "Alat pembebasan/pengecualian dari ketuhanan umum."
                    },
                    {
                        withHarokat: "اللهُ",
                        withoutHarokat: "الله",
                        pegon: "اَلله",
                        latin: "Gusti Allah",
                        irob: "Badal dari Isim La",
                        wordType: "Isim Alam",
                        explanation: "Badal dari mahal isim la atau khobar la yang dibuang (Maujud)."
                    }
                ]
            },
            {
                id: "aqidah_tauhid",
                title: "3. Fashl: Sifat Dua Puluh (Aqidah)",
                arabicTitle: "فصل: عقيدة التوحيد",
                description: "Sifat wajib dan mustahil bagi Allah",
                words: [
                    {
                        withHarokat: "يَجِبُ",
                        withoutHarokat: "يجب",
                        pegon: "وَاجِبْ",
                        latin: "Wajib",
                        irob: "Fi'il Mudhari'",
                        wordType: "Kalimah Fi'il",
                        explanation: "Fi'il Mudhari' marfu' karena sepi dari amil nashab dan amil jazam."
                    },
                    {
                        withHarokat: "عَلَى",
                        withoutHarokat: "على",
                        pegon: "كَا سَكَبِيْهْنَا",
                        latin: "ka sekabehna",
                        irob: "Huruf Jar",
                        wordType: "Harf",
                        explanation: "Fungsi membebani hukum kewajiban (At-Taklif)."
                    },
                    {
                        withHarokat: "مُكَلَّفٍ",
                        withoutHarokat: "مكلف",
                        pegon: "جَلْمَا مُكَلَّفْ",
                        latin: "jalma mukallaf",
                        irob: "Majrur",
                        wordType: "Isim Maf'ul",
                        explanation: "Majrur dengan kasrah, yaitu orang yang telah dibebani hukum syariat (Baligh & Berakal)."
                    },
                    {
                        withHarokat: "أَنْ",
                        withoutHarokat: "أن",
                        pegon: "سَاتَمَنَّا نِيَاتَانَا",
                        latin: "yen saenya kalakuan",
                        irob: "An-Mashdariyah",
                        wordType: "Harf",
                        explanation: "Mengubah fi'il setelahnya menjadi makna masdar."
                    },
                    {
                        withHarokat: "يَعْرِفَ",
                        withoutHarokat: "يعرف",
                        pegon: "نِيَاهَوْكُنْ مَانِيْهْنَا",
                        latin: "nyahokeun / apal",
                        irob: "Fi'il Mudhari' Manshub",
                        wordType: "Kalimah Fi'il",
                        explanation: "Manshub dengan fathah disebabkan adanya amil 'An'."
                    },
                    {
                        withHarokat: "مَا",
                        withoutHarokat: "ما",
                        pegon: "كَا فِيرَا-فِيرَا صِفَاتْ",
                        latin: "kana perkara (sifat)",
                        irob: "Maf'ul Bih / Isim Maushul",
                        wordType: "Isim Maushul",
                        explanation: "Isim maushul berkedudukan nasab sebagai objek sasaran mengetahui."
                    },
                    {
                        withHarokat: "يَسْتَحِيلُ",
                        withoutHarokat: "يستحيل",
                        pegon: "اَنُو مُسْتَحِيلْ",
                        latin: "anu mustahil",
                        irob: "Fi'il Mudhari' (Shilah Maushul)",
                        wordType: "Kalimah Fi'il",
                        explanation: "Shilah maushul yang tidak memiliki kedudukan i'rob secara langsung."
                    },
                    {
                        withHarokat: "عَلَيْهِ",
                        withoutHarokat: "عليه",
                        pegon: "كَا مَانِيْهْنَا اَلله",
                        latin: "ka mantenna (Gusti Allah)",
                        irob: "Jar-Majrur",
                        wordType: "Harf + Dhamir",
                        explanation: "Menunjukkan kemustahilan yang dinisbatkan bagi Allah SWT."
                    }
                ]
            }
        ];
