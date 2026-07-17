 const kitabData = [
            {
                id: "muqaddimah",
                title: "1. Mukaddimah Kitab",
                arabicTitle: "مقدمة الكتاب",
                description: "Pendahuluan Kitab Riyadhul Badi'ah",
                words: [
                   [
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
        latin: "jeung kasalametan",
        irob: "Ma'thuf",
        wordType: "Isim",
        explanation: "Ma'thuf kepada 'As-Shalatu', mengikuti i'rob rafa'."
    },
    {
        withHarokat: "عَلَى",
        withoutHarokat: "على",
        pegon: "تتف ك",
        latin: "tetep ka",
        irob: "Huruf Jar",
        wordType: "Harf",
        explanation: "Huruf jar."
    },
    {
        withHarokat: "سَيِّدِنَا",
        withoutHarokat: "سيدنا",
        pegon: "كوستى اوزاع سدايا",
        latin: "gudti urang sadaya",
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
        latin: "jeung sahabatanana",
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
    }
]
                
