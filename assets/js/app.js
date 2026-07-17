// assets/js/app.js

// --- App State ---
let currentChapterIndex = 0;
let isHarokatVisible = true;
let isLugotVisible = true;
let lugotStyle = "pegon"; // "pegon" or "latin"
let baseFontSize = 26; // base pixels for Arabic words

// --- DOM Elements ---
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const chapterSearchInput = document.getElementById("chapterSearch");
const chapterListEl = document.getElementById("chapterList");
const kitabContainer = document.getElementById("kitabContentContainer");
const currentChapterBadge = document.getElementById("currentChapterBadge");
const emptyPlaceholder = document.getElementById("emptySearchPlaceholder");

const toggleHarokatCheck = document.getElementById("toggleHarokat");
const toggleLugotCheck = document.getElementById("toggleLugot");
const btnPegon = document.getElementById("btnPegon");
const btnLatin = document.getElementById("btnLatin");

const themeMenuBtn = document.getElementById("themeMenuBtn");
const themeDropdown = document.getElementById("themeDropdown");
const guideBtn = document.getElementById("guideBtn");
const guideModal = document.getElementById("guideModal");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");

// Modal elements are fetched dynamically in the open function to prevent reference errors
const wordModal = document.getElementById("wordModal");

// --- Theme Management ---
window.setTheme = function(themeName) {
    document.body.className = "h-full flex flex-col overflow-hidden " + themeName;
    localStorage.setItem("kitab-theme", themeName);
    themeDropdown.classList.add("hidden");
}

// Initialize theme from storage
const savedTheme = localStorage.getItem("kitab-theme") || "theme-yellow";
setTheme(savedTheme);

// --- Event Listeners: Navigation & Menus ---
toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
});

document.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
        if (!sidebar.contains(e.target) && !toggleSidebarBtn.contains(e.target)) {
            sidebar.classList.add("-translate-x-full");
        }
    }
    if (!themeMenuBtn.contains(e.target) && !themeDropdown.contains(e.target)) {
        themeDropdown.classList.add("hidden");
    }
});

themeMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle("hidden");
});

settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("hidden");
    settingsBtn.classList.toggle("bg-black/10");
});

// --- Event Listeners: Settings ---
toggleHarokatCheck.addEventListener("change", (e) => {
    isHarokatVisible = e.target.checked;
    renderKitabContent();
});

toggleLugotCheck.addEventListener("change", (e) => {
    isLugotVisible = e.target.checked;
    renderKitabContent();
});

window.setLugotStyle = function(style) {
    lugotStyle = style;
    if (style === "pegon") {
        btnPegon.className = "flex-1 py-1 px-3 text-xs rounded-md bg-white dark:bg-gray-800 font-semibold shadow-sm text-red-700 dark:text-red-400 focus:outline-none transition";
        btnLatin.className = "flex-1 py-1 px-3 text-xs rounded-md font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none transition";
    } else {
        btnLatin.className = "flex-1 py-1 px-3 text-xs rounded-md bg-white dark:bg-gray-800 font-semibold shadow-sm text-red-700 dark:text-red-400 focus:outline-none transition";
        btnPegon.className = "flex-1 py-1 px-3 text-xs rounded-md font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none transition";
    }
    renderKitabContent();
}

window.adjustFontSize = function(amount) {
    baseFontSize = Math.max(18, Math.min(48, baseFontSize + amount));
    renderKitabContent();
}

window.resetFontSize = function() {
    baseFontSize = 26;
    renderKitabContent();
}

// --- Core Rendering Functions ---
function renderChapterList(searchTerm = "") {
    chapterListEl.innerHTML = "";
    
    // Memastikan kitabData tersedia sebelum diolah
    if (typeof kitabData === 'undefined') {
        console.error("Data kitabData tidak ditemukan! Pastikan script data diload sebelum app.js.");
        return;
    }

    const filtered = kitabData.filter(chap => 
        chap.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        chap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chap.arabicTitle.includes(searchTerm)
    );

    if (filtered.length === 0) {
        chapterListEl.innerHTML = `<div class="p-4 text-center text-xs opacity-55">Tidak ada bab yang cocok</div>`;
        return;
    }

    filtered.forEach((chap) => {
        const globalIndex = kitabData.findIndex(c => c.id === chap.id);
        const isActive = globalIndex === currentChapterIndex;
        const activeClasses = isActive 
            ? "bg-red-700 text-white hover:bg-red-800 shadow" 
            : "hover:bg-black/5 text-gray-800 dark:text-gray-200";

        const button = document.createElement("button");
        button.className = `w-full text-left p-3 rounded-xl mb-1 flex items-center justify-between transition-all duration-200 outline-none ${activeClasses}`;
        button.innerHTML = `
            <div class="flex-1 min-w-0 pr-2">
                <h4 class="font-bold text-sm truncate">${chap.title}</h4>
                <p class="text-[10px] opacity-75 truncate ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}">${chap.description}</p>
            </div>
            <span class="arabic-text text-lg font-bold text-right pl-2 ${isActive ? 'text-white' : 'text-red-700 dark:text-red-400'}">
                ${chap.arabicTitle}
            </span>
        `;

        button.addEventListener("click", () => {
            currentChapterIndex = globalIndex;
            renderChapterList(chapterSearchInput.value);
            selectChapter(globalIndex);
            if (window.innerWidth < 768) {
                sidebar.classList.add("-translate-x-full");
            }
        });

        chapterListEl.appendChild(button);
    });
}

function selectChapter(idx) {
    if (typeof kitabData === 'undefined' || !kitabData[idx]) return;
    const chap = kitabData[idx];
    currentChapterBadge.textContent = chap.title;
    renderKitabContent();
}

function renderKitabContent() {
    if (typeof kitabData === 'undefined') return;
    const chap = kitabData[currentChapterIndex];
    kitabContainer.innerHTML = "";

    if (!chap) {
        emptyPlaceholder.classList.remove("hidden");
        kitabContainer.classList.add("hidden");
        return;
    }

    emptyPlaceholder.classList.add("hidden");
    kitabContainer.classList.remove("hidden");

    chap.words.forEach((item) => {
        const container = document.createElement("div");
        container.className = "lugot-container";

        const wordSpan = document.createElement("span");
        wordSpan.className = "lugot-word";
        wordSpan.style.fontSize = `${baseFontSize}px`;
        wordSpan.textContent = isHarokatVisible ? item.withHarokat : item.withoutHarokat;

        // --- REVISI KLIK MODAL DI SINI ---
        wordSpan.addEventListener("click", (e) => {
            e.stopPropagation(); // Mencegah bentrok layer
            window.openWordModal(item);
        });

        container.appendChild(wordSpan);

        if (isLugotVisible) {
            const glossSpan = document.createElement("span");
            glossSpan.className = `lugot-gloss ${lugotStyle === 'pegon' ? 'is-pegon' : 'is-latin'}`;
            
            const lugotString = lugotStyle === "pegon" ? item.pegon : item.latin;
            const lugotWords = lugotString.split(" ");
            
            lugotWords.forEach(w => {
                if (w.trim() !== "") {
                    const wSpan = document.createElement("span");
                    wSpan.textContent = w;
                    glossSpan.appendChild(wSpan);
                }
            });
            
            const dynamicGlossFontSize = Math.max(10, baseFontSize * 0.36);
            glossSpan.style.fontSize = `${dynamicGlossFontSize}px`;
            
            const calculatedWidth = Math.max(75, baseFontSize * 3.6);
            glossSpan.style.width = `${calculatedWidth}px`;
            
            const calculatedCloseness = Math.max(3, baseFontSize * 0.28);
            glossSpan.style.marginTop = `-${calculatedCloseness}px`;
            
            container.appendChild(glossSpan);
        }
        kitabContainer.appendChild(container);
    });
}

chapterSearchInput.addEventListener("input", (e) => {
    renderChapterList(e.target.value);
});

// --- Modals Logic (REVISI) ---

// Modal Word Detail (I'rob) - VERSI ANTI-CRASH
window.openWordModal = function(item) {
    try {
        // Ambil semua elemen HTML berdasarkan ID-nya
        const elArabic = document.getElementById("modalArabicWord");
        const elPegon = document.getElementById("modalPegon");
        const elLatin = document.getElementById("modalLatin");
        const elIrob = document.getElementById("modalIrob");
        const elWordType = document.getElementById("modalWordType");
        const elExplanation = document.getElementById("modalExplanation");

        // Isi teks hanya JIKA elemennya ditemukan di index.html (mencegah error null)
        if (elArabic) elArabic.textContent = item.withHarokat || "";
        if (elPegon) elPegon.textContent = item.pegon || "";
        if (elLatin) elLatin.textContent = item.latin || "";
        if (elIrob) elIrob.textContent = item.irob || "";
        if (elWordType) elWordType.textContent = item.wordType || "";
        if (elExplanation) elExplanation.textContent = item.explanation || "";
        
        // Tampilkan modal
        const modalEl = document.getElementById("wordModal");
        if (modalEl) {
            modalEl.classList.remove("hidden");
            modalEl.classList.add("flex"); // Memastikan display flex aktif
            
            // Berikan efek animasi jika elemen pembungkusnya ada
            if (modalEl.firstElementChild) {
                modalEl.firstElementChild.classList.add("scale-100");
            }
        } else {
            console.error("Waduh, div id='wordModal' tidak ditemukan di index.html!");
        }
    } catch (error) {
        console.error("Gagal membuka modal I'rob:", error);
    }
}

window.closeWordModal = function() {
    const modalEl = document.getElementById("wordModal");
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
}

document.getElementById("wordModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("wordModal")) {
        closeWordModal();
    }
});

// Modal Guide
guideBtn.addEventListener("click", () => {
    guideModal.classList.remove("hidden");
    guideModal.classList.add("flex");
});

window.closeGuideModal = function() {
    guideModal.classList.add("hidden");
    guideModal.classList.remove("flex");
}

guideModal.addEventListener("click", (e) => {
    if (e.target === guideModal) {
        closeGuideModal();
    }
});

// --- Initialization ---
window.onload = function() {
    renderChapterList();
    selectChapter(currentChapterIndex);
};
