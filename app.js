/* ==========================================================================
   LOGIKA APLIKASI — membaca data dari data.js (variabel global `chapters`)
   ========================================================================== */

let state = {
  activeId: null,
  harakat: true,   // tampilkan/sembunyikan harokat
  lugot: true,     // tampilkan/sembunyikan lugot per kata
  mode: 'latin'    // 'latin' atau 'pegon' — menentukan aksara lugot & arti
};

const chapterListEl = document.getElementById('chapterList');
const contentEl = document.getElementById('contentScroll');
const breadcrumbEl = document.getElementById('breadcrumb');
const searchInput = document.getElementById('searchInput');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function renderChapterList(filter = "") {
  const f = filter.trim().toLowerCase();
  const filtered = chapters.filter(c =>
    c.title.toLowerCase().includes(f) || c.ar.includes(filter)
  );
  chapterListEl.innerHTML = "";
  if (filtered.length === 0) {
    chapterListEl.innerHTML = '<li class="no-result">Bab tidak ditemukan.</li>';
    return;
  }
  filtered.forEach(c => {
    const li = document.createElement('li');
    li.className = 'chapter-item' + (c.id === state.activeId ? ' active' : '');
    li.innerHTML = `<span class="chapter-num">${String(c.id).padStart(2, '0')}</span><span class="chapter-name">${c.title}</span>`;
    li.addEventListener('click', () => {
      state.activeId = c.id;
      renderChapterList(searchInput.value);
      renderContent();
      closeSidebarMobile();
    });
    chapterListEl.appendChild(li);
  });
}

function rosetteSVG() {
  return `<svg class="rosette" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="18" stroke="#a9822e" stroke-width="1.4"/>
    <circle cx="30" cy="30" r="11" stroke="#7a2e2e" stroke-width="1.2"/>
    ${Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 30 + 18 * Math.cos(a), y1 = 30 + 18 * Math.sin(a);
      const x2 = 30 + 27 * Math.cos(a), y2 = 30 + 27 * Math.sin(a);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#a9822e" stroke-width="1.2"/>`;
    }).join('')}
    <circle cx="30" cy="30" r="3.2" fill="#7a2e2e"/>
  </svg>`;
}

function renderContent() {
  const c = chapters.find(x => x.id === state.activeId);

  if (!c) {
    breadcrumbEl.textContent = "Daftar Bab";
    contentEl.innerHTML = `
      <div class="page-frame">
        <div class="frame-br"></div>
        <div class="empty-state">
          ${rosetteSVG()}
          <h3>Pilih bab untuk mulai membaca</h3>
          <p>Gunakan pencarian atau daftar bab di samping.</p>
        </div>
      </div>`;
    return;
  }

  breadcrumbEl.textContent = `Bab ${String(c.id).padStart(2, '0')} — ${c.title}`;

  if (!c.lines) {
    contentEl.innerHTML = `
      <div class="page-frame">
        <div class="frame-br"></div>
        ${rosetteSVG()}
        <h1 class="bab-title">${c.title}</h1>
        <p class="bab-title-ar">${c.ar}</p>
        <hr class="divider">
        <div class="empty-state">
          <h3>Isi bab ini segera hadir</h3>
          <p>Tambahkan isinya di file <code>data.js</code>.</p>
        </div>
      </div>`;
    return;
  }

  const linesHtml = c.lines.map((line, idx) => {
    const wordsHtml = line.words.map(word => {
      const arText = state.harakat ? word.full : word.bare;
      const glossText = state.mode === 'pegon' ? word.pegon : word.latin;
      const glossClass = state.mode === 'pegon' ? 'pegon' : 'latin';
      const glossHtml = `<span class="gloss ${glossClass} ${state.lugot ? '' : 'hidden'}">${glossText}</span>`;
      return `<span class="word">${arText}${glossHtml}</span>`;
    }).join('');

    return `
      <div class="line-block">
        <div class="line-number">Baris ${idx + 1}</div>
        <div class="arabic-line">${wordsHtml}</div>
        <div class="translation">
          <div class="translation-label">Arti / Lugot</div>
          <div class="full pegon ${state.mode === 'pegon' ? '' : 'hidden'}">${line.translation.pegon}</div>
          <div class="full latin ${state.mode === 'latin' ? '' : 'hidden'}">${line.translation.latin}</div>
        </div>
      </div>`;
  }).join('');

  contentEl.innerHTML = `
    <div class="page-frame">
      <div class="frame-br"></div>
      ${rosetteSVG()}
      <h1 class="bab-title">${c.title}</h1>
      <p class="bab-title-ar">${c.ar}</p>
      <hr class="divider">

      <div class="controls">
        <div class="toggle-pill">
          <span class="label">Harokat</span>
          <div class="switch ${state.harakat ? 'on' : ''}" id="toggleHarakat"><div class="knob"></div></div>
        </div>
        <div class="toggle-pill">
          <span class="label">Lugot</span>
          <div class="switch ${state.lugot ? 'on' : ''}" id="toggleLugot"><div class="knob"></div></div>
        </div>
        <div class="seg" id="segMode">
          <button data-mode="pegon" class="${state.mode === 'pegon' ? 'active' : ''}">Pegon</button>
          <button data-mode="latin" class="${state.mode === 'latin' ? 'active' : ''}">Latin</button>
        </div>
      </div>

      ${linesHtml}
    </div>`;

  document.getElementById('toggleHarakat').addEventListener('click', () => {
    state.harakat = !state.harakat; renderContent();
  });
  document.getElementById('toggleLugot').addEventListener('click', () => {
    state.lugot = !state.lugot; renderContent();
  });
  document.querySelectorAll('#segMode button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.mode = btn.dataset.mode; renderContent();
    });
  });
}

searchInput.addEventListener('input', (e) => renderChapterList(e.target.value));

const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
});
overlay.addEventListener('click', closeSidebarMobile);
function closeSidebarMobile() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

// init
renderChapterList();
renderContent();
