// data/kitabData.js
const kitabData = [
    {
        id: "muqaddimah",
        title: "1. Mukaddimah Kitab",
        arabicTitle: "مقدمة الكتاب",
        description: "Pendahuluan Kitab Riyadhul Badi'ah",
        words: [
            {
                withHarokat: "بِسْمِ",
                withoutHarokat: "بسم",
                pegon: "كلوان يبات",
                latin: "kalawan nyebat",
                irob: "Jar-Majrur",
                wordType: "Harf + Isim",
                explanation: "Bismillahi: Jar-majrur muta'alliq dengan fi'il yang dibuang (taqdir: abda'u/memulai)."
            },
            {
                withHarokat: "اللَّهِ",
                withoutHarokat: "الله",
                pegon: "جنعان الله",
                latin: "jenengan Allah",
                irob: "Mudhaf Ilaih",
                wordType: "Isim Alam",
                explanation: "Lafdzul jalalah sebagai mudhaf ilaih, majrur dengan kasrah."
            },
            {
                withHarokat: "الرَّحْمٰنِ",
                withoutHarokat: "الرحمن",
                pegon: "انو مها وىلاس",
                latin: "anu maha welas",
                irob: "Na'at",
                wordType: "Isim",
                explanation: "Na'at (sifat) pertama bagi lafdzul jalalah, mengikuti i'rob jar."
            },
            {
                withHarokat: "الرَّحِيمِ",
                withoutHarokat: "الرحيم",
                pegon: "انو مها اسيه",
                latin: "anu maha asih",
                irob: "Na'at",
                wordType: "Isim",
                explanation: "Na'at (sifat) kedua bagi lafdzul jalalah, mengikuti i'rob jar."
            },
            {
                withHarokat: "الْحَمْدُ",
                withoutHarokat: "الحمد",
                pegon: "اري سدايا فوجى",
                latin: "ari sadaya puji",
                irob: "Mubtada'",
                wordType: "Isim",
                explanation: "Mubtada' marfu' dengan dhammah."
            },
            {
                withHarokat: "لِلَّهِ",
                withoutHarokat: "لله",
                pegon: "تتف ككوعان الله",
                latin: "eta tetep kagungan allah",
                irob: "Jar-Majrur",
                wordType: "Harf + Isim",
                explanation: "Jar majrur (lam al-ikhtishash) muta'alliq dengan khobar yang dibuang."
            },
            {
                withHarokat: "رَبِّ",
                withoutHarokat: "رب",
                pegon: "انو معيرانن",
                latin: "anu mangeranan",
                irob: "Badal / Na'at",
                wordType: "Isim",
                explanation: "Badal dari lafdzul jalalah, mengikuti i'rob jar."
            },
            {
                withHarokat: "الْعَالَمِينَ",
                withoutHarokat: "العالمين",
                pegon: "سكبيه عالم",
                latin: "sa-sakabeh alam",
                irob: "Mudhaf Ilaih",
                wordType: "Isim Jama'",
                explanation: "Mudhaf ilaih majrur dengan ya karena jama' mudzakkar salim."
            },
            {
                withHarokat: "وَالصَّلَاةُ",
                withoutHarokat: "والصلاة",
                pegon: "حع اري رحمة",
                latin: "jeung ari rahmat",
                irob: "Mubtada",
                wordType: "Isim",
                explanation: "Mubtada' marfu' dengan dhammah."
            },
            {
                withHarokat: "وَالسَّلَامُ",
                withoutHarokat: "والسلام",
                pegon: "جع اري كسلامتان",
                latin: "jeung ari kasalametan",
                irob: "Ma'thuf",
                wordType: "Isim",
                explanation: "Ma'thuf kepada 'As-Shalatu', mengikuti i'rob rafa'."
            },
            {
                withHarokat: "عَلَى",
                withoutHarokat: "على",
                pegon: "تتف كا",
                latin: "tetep ka",
                irob: "Huruf Jar",
                wordType: "Harf",
                explanation: "Huruf jar."
            },
            {
                withHarokat: "سَيِّدِنَا",
                withoutHarokat: "سيدنا",
                pegon: "كوستى اوزاع سدايا",
                latin: "gusti urang sadaya",
                irob: "Majrur",
                wordType: "Isim + Dhamir",
                explanation: "Majrur karena didahului 'ala', mudhaf kepada 'na' dhamir."
            },
            {
                withHarokat: "مُحَمَّدٍ",
                withoutHarokat: "محمد",
                pegon: "نَابِي مُحَمَّدْ",
                latin: "Nabi Muhammad",
                irob: "Badal",
                wordType: "Isim",
                explanation: "Badal dari 'Sayyidina', mengikuti i'rob jar."
            },
            {
                withHarokat: "سَيِّدِ",
                withoutHarokat: "سيد",
                pegon: "انو جدي قاممفين",
                latin: "Pangeran",
                irob: "Na'at / Badal",
                wordType: "Isim",
                explanation: "Na'at atau badal dari Muhammad."
            },
            {
                withHarokat: "الْمُرْسَلِينَ",
                withoutHarokat: "المرسلين",
                pegon: "سدايا اوتوسان",
                latin: "sadaya utusan",
                irob: "Mudhaf Ilaih",
                wordType: "Isim",
                explanation: "Mudhaf ilaih majrur dengan ya."
            },
            {
                withHarokat: "وَ عَلَى",
                withoutHarokat: "وعلى",
                pegon: "سَارِعْ كَا",
                latin: "jeung ka",
                irob: "Harf Athof + Jar",
                wordType: "Harf",
                explanation: "Athof pada 'ala sayyidina'."
            },
            {
                withHarokat: "آلِهِ",
                withoutHarokat: "آله",
                pegon: "كَلُوْاَرْكَانَا",
                latin: "keluargana",
                irob: "Majrur",
                wordType: "Isim",
                explanation: "Majrur karena Athof."
            },
            {
                withHarokat: "وَصَحْبِهِ",
                withoutHarokat: "وصحبه",
                pegon: "جع كاصحبتنا",
                latin: "jeung ka sahabatanana",
                irob: "Ma'thuf",
                wordType: "Isim",
                explanation: "Athof kepada 'Alihi'."
            },
            {
                withHarokat: "أَجْمَعِينَ",
                withoutHarokat: "أجمعين",
                pegon: "سَكَبِيْهْنَا",
                latin: "sakabehna",
                irob: "Taukid",
                wordType: "Isim",
                explanation: "Taukid (penguat) dari 'Alihi' atau 'Sahbihi', majrur dengan ya."
            },
            {
                withHarokat: "وَالتَّابِعِينَ",
                withoutHarokat: "والتابعين",
                pegon: "جع كاجلما انوتوروت",
                latin: "jeung ka jalma anu turut",
                irob: "Ma'thuf",
                wordType: "Isim",
                explanation: "Athof pada 'Sahbihi'."
            },
            {
                withHarokat: "لَهُمْ",
                withoutHarokat: "لهم",
                pegon: "كَافراصحبة",
                latin: "ka para sohabat",
                irob: "Jar-Majrur",
                wordType: "Harf + Isim",
                explanation: "Lam jar dan dhamir hum."
            },
            {
                withHarokat: "بِإِحْسَانٍ",
                withoutHarokat: "بإحسان",
                pegon: "كلاوان كاالوسان",
                latin: "kalawan ka alusan",
                irob: "Jar-Majrur",
                wordType: "Harf + Isim",
                explanation: "Jar majrur."
            },
            {
                withHarokat: "إِلَى",
                withoutHarokat: "إلى",
                pegon: "نفيك",
                latin: "nepika",
                irob: "Huruf Jar",
                wordType: "Harf",
                explanation: "Huruf jar."
            },
            {
                withHarokat: "يَوْمِ",
                withoutHarokat: "يوم",
                pegon: "فؤي",
                latin: "poe",
                irob: "Majrur",
                wordType: "Isim",
                explanation: "Majrur karena ila."
            },
            {
                withHarokat: "الدِّينِ",
                withoutHarokat: "الدين",
                pegon: "فَمَبَالِسَنَانْ",
                latin: "pamalesan",
                irob: "Mudhaf Ilaih",
                wordType: "Isim",
                explanation: "Mudhaf ilaih majrur."
            },
            {
                withHarokat: "أَمَّا",
                withoutHarokat: "أما",
                pegon: "اَنَفُوْنْ",
                latin: "anapon",
                irob: "Syarat",
                wordType: "Harf",
                explanation: "Harf syarat dan tafshil."
            },
            {
                withHarokat: "بَعْدُ",
                withoutHarokat: "بعد",
                pegon: "سافرانتوسنااتوانوكبيه",
                latin: "saparantos na itu nu kabeh",
                irob: "Majrur Mahal",
                wordType: "Isim",
                explanation: "Mabni di atas dhammah (karena mudhaf ilaih dibuang niatnya)."
            },
            {
                withHarokat: "فَهٰذَا",
                withoutHarokat: "فهذا",
                pegon: "معك ازي اي كتاب",
                latin: "mangka ari ieu kitab",
                irob: "Fashilah + Mubtada'",
                wordType: "Harf + Isim",
                explanation: "Fa jawab syarat, hadza mubtada'."
            },
            {
                withHarokat: "مُخْتَصَرٌ",
                withoutHarokat: "مختصر",
                pegon: "ايت هجي زعكسان",
                latin: "eta hiji ringkesan",
                irob: "Khobar",
                wordType: "Isim",
                explanation: "Khobar marfu'."
            },
            {
                withHarokat: "فِي",
                withoutHarokat: "في",
                pegon: "دِنَا",
                latin: "dina",
                irob: "Jar",
                wordType: "Harf",
                explanation: "Huruf jar."
            },
            {
                withHarokat: "أُصُولِ",
                withoutHarokat: "أصول",
                pegon: "فُوْكُوْكْ٢",
                latin: "poko-poko",
                irob: "Majrur",
                wordType: "Isim",
                explanation: "Majrur."
            },
            {
                withHarokat: "الدِّينِ",
                withoutHarokat: "الدين",
                pegon: "اَكام",
                latin: "agama",
                irob: "Mudhaf Ilaih",
                wordType: "Isim",
                explanation: "Mudhaf ilaih majrur."
            },
            {
                withHarokat: "وَجُمْلَةٌ",
                withoutHarokat: "وجملة",
                pegon: "جع ساكومفولان",
                latin: "jeng sa kumpulan",
                irob: "Ma'thuf",
                wordType: "Isim",
                explanation: "Ma'thuf."
            },
            {
                withHarokat: "مِنْ",
                withoutHarokat: "من",
                pegon: "تين",
                latin: "tina",
                irob: "Jar",
                wordType: "Harf",
                explanation: "Huruf jar."
            },
            {
                withHarokat: "فُرُوعِهِ",
                withoutHarokat: "فروعه",
                pegon: "جَابَعْ٢نَااكام",
                latin: "cabang-cabangna agama",
                irob: "Majrur",
                wordType: "Isim + Dhamir",
                explanation: "Majrur."
            },
            {
                withHarokat: "عَلَى",
                withoutHarokat: "على",
                pegon: "نُوْمْتْكُنْ",
                latin: "numutkeun",
                irob: "Jar",
                wordType: "Harf",
                explanation: "Huruf jar."
            },
            {
                withHarokat: "مَذْهَبِ",
                withoutHarokat: "مذهب",
                pegon: "مَذْهَبْ",
                latin: "madzhab",
                irob: "Majrur",
                wordType: "Isim",
                explanation: "Majrur."
            },
            {
                withHarokat: "الْإِمَامِ",
                withoutHarokat: "الإمام",
                pegon: "اِمَامْ",
                latin: "Imam",
                irob: "Mudhaf Ilaih",
                wordType: "Isim",
                explanation: "Mudhaf ilaih majrur."
            },
            {
                withHarokat: "الشَّافِعِيِّ",
                withoutHarokat: "الشافعي",
                pegon: "شَافِعِي",
                latin: "Syafi'i",
                irob: "Na'at",
                wordType: "Isim",
                explanation: "Na'at majrur."
            },
            {
                withHarokat: "رَضِيَ",
                withoutHarokat: "رضي",
                pegon: "مُوْكَارِضَا",
                latin: "muga ridho",
                irob: "Fi'il",
                wordType: "Fi'il",
                explanation: "Fi'il madhi (makna doa)."
            },
            {
                withHarokat: "اللَّهُ",
                withoutHarokat: "الله",
                pegon: "اَلله",
                latin: "Gusti Allah",
                irob: "Fa'il",
                wordType: "Isim Alam",
                explanation: "Fa'il marfu'."
            },
            {
                withHarokat: "عَنْهُ",
                withoutHarokat: "عنه",
                pegon: "تِي مَانِيْهْنَا",
                latin: "ti mantenna",
                irob: "Jar-Majrur",
                wordType: "Harf + Dhamir",
                explanation: "Jar majrur."
            },
            {
        withHarokat: "سَمَّيْتُهُ",
        withoutHarokat: "سميته",
        pegon: "توس عارانان كولا كايي كتاب",
        latin: "tos ngaranan kaula ka ieu kitab",
        irob: "Fi'il + Fa'il + Maf'ul Bih",
        wordType: "Fi'liyah",
        explanation: "Fi'il madhi, dhamir mutakallim (fa'il), dan dhamir ghaib (maf'ul bih)."
    },
    {
        withHarokat: "الرِّيَاضَ",
        withoutHarokat: "الرياض",
        pegon: "كاريياض",
        latin: "ka riyadh",
        irob: "Maf'ul Tsani",
        wordType: "Isim",
        explanation: "Maf'ul bih kedua dari fi'il sammaytu, manshub dengan fathah."
    },
    {
        withHarokat: "الْبَدِيعَةَ",
        withoutHarokat: "البديعة",
        pegon: "انو عداه",
        latin: "anu endah",
        irob: "Na'at",
        wordType: "Isim",
        explanation: "Sifat (na'at) dari Ar-Riyadh, mengikuti i'rob nashab."
    },
    {
        withHarokat: "فِي",
        withoutHarokat: "في",
        pegon: "دينا",
        latin: "dina",
        irob: "Huruf Jar",
        wordType: "Harf",
        explanation: "Huruf jar."
    },
    {
        withHarokat: "أُصُولِ",
        withoutHarokat: "أصول",
        pegon: "فوقو٢",
        latin: "poko-poko",
        irob: "Majrur",
        wordType: "Isim",
        explanation: "Majrur karena huruf jar."
    },
    {
        withHarokat: "الدِّينِ",
        withoutHarokat: "الدين",
        pegon: "اكام",
        latin: "agama",
        irob: "Mudhaf Ilaih",
        wordType: "Isim",
        explanation: "Mudhaf ilaih majrur dengan kasrah."
    },
    {
        withHarokat: "وَبَعْضِ",
        withoutHarokat: "وبعض",
        pegon: "ساريع ساواريه",
        latin: "jeung sawareh",
        irob: "Ma'thuf",
        wordType: "Isim",
        explanation: "Ma'thuf (diikutkan) kepada lafazh Ushuli, sehingga ikut majrur."
    },
    {
        withHarokat: "فُرُوعِ",
        withoutHarokat: "فروع",
        pegon: "جاباع٢",
        latin: "cabang-cabang",
        irob: "Mudhaf Ilaih",
        wordType: "Isim",
        explanation: "Mudhaf ilaih dari ba'dhi."
    },
    {
        withHarokat: "الشَّرِيعَةِ",
        withoutHarokat: "الشريعة",
        pegon: "شريعة",
        latin: "syari'at",
        irob: "Mudhaf Ilaih",
        wordType: "Isim",
        explanation: "Mudhaf ilaih majrur."
    },
    {
        withHarokat: "رَاجِيًا",
        withoutHarokat: "راجيا",
        pegon: "حالنا عاريف٢",
        latin: "halna ngarep-ngarep",
        irob: "Hal",
        wordType: "Isim",
        explanation: "Hal (menjelaskan keadaan fa'il saat menamai kitab), manshub dengan fathah."
    },
    {
        withHarokat: "مِنَ",
        withoutHarokat: "من",
        pegon: "تي",
        latin: "ti",
        irob: "Huruf Jar",
        wordType: "Harf",
        explanation: "Huruf jar."
    },
    {
        withHarokat: "اللَّهِ",
        withoutHarokat: "الله",
        pegon: "الله",
        latin: "Gusti Allah",
        irob: "Majrur",
        wordType: "Isim Alam",
        explanation: "Lafdzul jalalah majrur karena huruf jar."
    },
    {
        withHarokat: "أَنْ",
        withoutHarokat: "أن",
        pegon: "كان موكي",
        latin: "kana mugi",
        irob: "Harf Mashdariyah",
        wordType: "Harf",
        explanation: "Huruf mashdariyah dan amil nawashib."
    },
    {
        withHarokat: "يَنْفَعَ",
        withoutHarokat: "ينفع",
        pegon: "عامنفعتكن",
        latin: "ngamanfaatkeun",
        irob: "Fi'il Mudhari' Manshub",
        wordType: "Fi'il",
        explanation: "Manshub dengan fathah karena didahului 'An'."
    },
    {
        withHarokat: "بِهِ",
        withoutHarokat: "به",
        pegon: "كالوان ايي كتاب",
        latin: "kalawan ieu kitab",
        irob: "Jar-Majrur",
        wordType: "Harf + Dhamir",
        explanation: "Jar dan majrur muta'alliq dengan lafazh yanfa'a."
    },
    {
        withHarokat: "طَلَبَةَ",
        withoutHarokat: "طلبة",
        pegon: "كامسنتري٢",
        latin: "ka santri-santri",
        irob: "Maf'ul Bih",
        wordType: "Isim",
        explanation: "Objek penderita (maf'ul bih) dari yanfa'a, manshub."
    },
    {
        withHarokat: "الْعِلْمِ",
        withoutHarokat: "العلم",
        pegon: "علم",
        latin: "elmu",
        irob: "Mudhaf Ilaih",
        wordType: "Isim",
        explanation: "Mudhaf ilaih majrur dengan kasrah."
    },
    {
        withHarokat: "لَا سِيَّمَا",
        withoutHarokat: "لا سيما",
        pegon: "سومووونا",
        latin: "sumawona",
        irob: "Tarkib Istitsna / Takhshish",
        wordType: "Harf + Isim",
        explanation: "Digunakan untuk mengkhususkan sesuatu (terlebih lagi / khususnya)."
    },
    {
        withHarokat: "الْمُبْتَدِئِينَ",
        withoutHarokat: "المبتدئين",
        pegon: "كا جلما٢ انو ميميتي",
        latin: "ka jalma-jalma anu mimiti",
        irob: "Majrur / Mudhaf Ilaih",
        wordType: "Isim Jama'",
        explanation: "Majrur dengan ya karena jamak mudzakkar salim."
    },
    {
        withHarokat: "وَأَنْ",
        withoutHarokat: "وأن",
        pegon: "ساريع موكي",
        latin: "sareng mugi",
        irob: "Ma'thuf + Mashdariyah",
        wordType: "Harf",
        explanation: "Wawu athof dan An mashdariyah."
    },
    {
        withHarokat: "يُوَجِّهَ",
        withoutHarokat: "يوجه",
        pegon: "عاهادفكن",
        latin: "ngahareupkeun",
        irob: "Fi'il Mudhari' Manshub",
        wordType: "Fi'il",
        explanation: "Fi'il mudhari' manshub karena 'An'."
    },
    {
        withHarokat: "إِلَيْهِ",
        withoutHarokat: "إليه",
        pegon: "كايي كتاب",
        latin: "ka ieu kitab",
        irob: "Jar-Majrur",
        wordType: "Harf + Dhamir",
        explanation: "Muta'alliq dengan yuwajjiha."
    },
    {
        withHarokat: "رَغْبَةَ",
        withoutHarokat: "رغبة",
        pegon: "كاهاياع",
        latin: "kahayang",
        irob: "Maf'ul Bih",
        wordType: "Isim",
        explanation: "Maf'ul bih dari yuwajjiha."
    },
    {
        withHarokat: "الرَّاغِبِينَ",
        withoutHarokat: "الراغبين",
        pegon: "كانو ميكاهويوع",
        latin: "ka nu mikahoyong",
        irob: "Mudhaf Ilaih",
        wordType: "Isim Jama'",
        explanation: "Mudhaf ilaih majrur dengan ya."
    }
]
            }
        ]
    }
];
