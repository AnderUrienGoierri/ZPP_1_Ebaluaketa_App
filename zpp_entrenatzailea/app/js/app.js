/**
 * ZPP Azterketa Entrenatzailea - Aplikazioaren Logika Nagusia (Bertsio Aurreratua)
 * - 80 Galderako test ausazkoa eta aukera nahasiak (B arriskua ezabatuta)
 * - 4 Ariketa Mota Praktikoak (Azalpenak, Hutsuneak, Akatsak, Idazteak)
 * - Kode Nabarmendzaile Osoa (aldagaiak, metodoak, tipoak, eragileak kolorez)
 * - Estatistika eta Puntu Ahulen Sistema (localStorage bidez gorderik)
 * - Gida Bizkorra Koloretsua SVG Diagrama Bektorialekin
 */

// Aplikazioaren egoera orokorra
const EGOERA = {
  unekoTab: 'teoria',
  unekoGalderaIndizea: 0,
  testMartxan: false,
  galderak: [],           // Uneko testeko 20 galderak
  erabiltzaileAukerak: {}, // { galderaId: aukeraIndex }
  okerrak: [],            // Huts egindako galderak
  tenporizadorea: null,
  geratzenDenbora: 20 * 60, // 20 minutu segundotan
  testTamaina: 20,
  praktikaAzalpenId: 'prozesuak',
  bugIndex: 0,
  fillIndex: 0,
  writeIndex: 0,
  pendingTabTarget: null
};

// =========================================================================
// HASIERAKETA
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupNavigation();
  setupModal();
  setupZoomControl();
  if (typeof kargatuTeoriaOsoa === 'function') {
    kargatuTeoriaOsoa();
  }
  hasiTeoriaTesta();
  setupPraktika();
  kargatuLaburpena();
  eguneratuEstatistikaPanela();
});

// =========================================================================
// GAI ARGIA / ILUNA (LIGHT & DARK THEME)
// =========================================================================
function setupTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const gordeModua = localStorage.getItem('zpp_theme');

  if (gordeModua === 'light') {
    aplikatuTheme('light');
  } else {
    aplikatuTheme('dark');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('theme-light');
      aplikatuTheme(isLight ? 'dark' : 'light');
    });
  }
}

function aplikatuTheme(modua) {
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-text');

  if (modua === 'light') {
    document.body.classList.add('theme-light');
    localStorage.setItem('zpp_theme', 'light');
    if (icon) icon.textContent = '☀️';
    if (label) label.textContent = 'Argia';
  } else {
    document.body.classList.remove('theme-light');
    localStorage.setItem('zpp_theme', 'dark');
    if (icon) icon.textContent = '🌙';
    if (label) label.textContent = 'Iluna';
  }
}

// =========================================================================
// NABIGAZIOA ETA MODALA (EZ USTEKABEAN TESTA ITXI)
// =========================================================================
function setupNavigation() {
  const navBtns = document.querySelectorAll('header .nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      eskaeraAldatuTab(target);
    });
  });
}

function eskaeraAldatuTab(targetTab) {
  if (EGOERA.testMartxan && EGOERA.unekoTab === 'testa' && targetTab !== 'testa') {
    const erantzunakKop = Object.keys(EGOERA.erabiltzaileAukerak).length;
    if (erantzunakKop > 0) {
      irekiModala(
        "Testa martxan dago!",
        `Testa egiten ari zara (${erantzunakKop} / ${EGOERA.galderak.length} galdera erantzunda). Atal honetatik irteten bazara uneko aurrerapena galduko da. Ziur zaude irten nahi duzula?`,
        () => {
          geldituTesta();
          aldatuTab(targetTab);
        }
      );
      return;
    }
  }
  aldatuTab(targetTab);
}

function aldatuTab(targetTab) {
  EGOERA.unekoTab = targetTab;
  
  document.querySelectorAll('header .nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetTab);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${targetTab}`);
  });

  if (targetTab === 'estatistikak') {
    eguneratuEstatistikaPanela();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupModal() {
  const overlay = document.getElementById('confirm-modal-overlay');
  const btnCancel = document.getElementById('modal-btn-cancel');
  const btnConfirm = document.getElementById('modal-btn-confirm');

  if (btnCancel) {
    btnCancel.onclick = () => overlay.classList.remove('active');
  }

  if (btnConfirm) {
    btnConfirm.onclick = () => {
      overlay.classList.remove('active');
      if (typeof EGOERA.modalCallback === 'function') {
        EGOERA.modalCallback();
      }
    };
  }
}

function irekiModala(titulua, mezua, onConfirm) {
  const overlay = document.getElementById('confirm-modal-overlay');
  document.getElementById('modal-title-text').textContent = titulua;
  document.getElementById('modal-message-text').textContent = mezua;
  EGOERA.modalCallback = onConfirm;
  overlay.classList.add('active');
}

function eskatuTestaBerrezarri() {
  const erantzunakKop = Object.keys(EGOERA.erabiltzaileAukerak).length;
  if (EGOERA.testMartxan && erantzunakKop > 0) {
    irekiModala(
      "Test berria nahastu?",
      `Uneko testeko ${erantzunakKop} erantzun galdu egingo dira eta 20 galdera berri kargatuko dira. Jarraitu nahi duzu?`,
      () => hasiTeoriaTesta()
    );
  } else {
    hasiTeoriaTesta();
  }
}

// =========================================================================
// TEORIA TEST ENGINE (20 GALDERA, SHUFFLE OSOA, LETRA OREKATUAK)
// =========================================================================
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function hasiTeoriaTesta(aukeratutakoPool = null) {
  geldituTesta();

  const pool = aukeratutakoPool || GALDERA_BANKUA;
  const nahastutakoak = shuffleArray(pool);
  
  const hautatutakoGalderak = nahastutakoak.slice(0, Math.min(EGOERA.testTamaina, nahastutakoak.length));

  EGOERA.galderak = hautatutakoGalderak.map(g => {
    const aukeraObjektuak = g.aukerak.map((aukeraTestua, index) => ({
      testua: aukeraTestua,
      zuzenaDa: (index === g.zuzena)
    }));

    const nahastutakoAukerak = shuffleArray(aukeraObjektuak);
    const zuzenIndizeBerria = nahastutakoAukerak.findIndex(a => a.zuzenaDa);

    return {
      id: g.id,
      gaia: g.gaia || "Orokorra",
      enuntziatua: g.enuntziatua,
      aukerak: nahastutakoAukerak.map(a => a.testua),
      zuzena: zuzenIndizeBerria,
      azalpena: g.azalpena
    };
  });

  EGOERA.erabiltzaileAukerak = {};
  EGOERA.okerrak = [];
  EGOERA.testMartxan = true;
  EGOERA.unekoGalderaIndizea = 0;
  EGOERA.geratzenDenbora = 20 * 60;

  const resultsCard = document.getElementById('test-results-card');
  if (resultsCard) resultsCard.style.display = 'none';

  const singleCard = document.getElementById('test-single-card-container');
  if (singleCard) singleCard.style.display = 'block';

  const allReview = document.getElementById('test-all-review-container');
  if (allReview) allReview.style.display = 'none';

  const btnReviewFailed = document.getElementById('btn-review-failed');
  if (btnReviewFailed) btnReviewFailed.style.display = 'none';

  hasieratuTenporizadorea();
  eguneratuAurrerapena();
  renderizatuTesta(false);
}

function hasieratuTenporizadorea() {
  const display = document.getElementById('timer-display');
  
  function marraztuDenbora() {
    const minutuak = Math.floor(EGOERA.geratzenDenbora / 60);
    const segunduak = EGOERA.geratzenDenbora % 60;
    display.textContent = `${String(minutuak).padStart(2, '0')}:${String(segunduak).padStart(2, '0')}`;

    if (EGOERA.geratzenDenbora <= 180) {
      display.style.color = 'var(--accent-red)';
    } else {
      display.style.color = 'var(--accent-cyan)';
    }
  }

  marraztuDenbora();

  EGOERA.tenporizadorea = setInterval(() => {
    if (EGOERA.geratzenDenbora > 0) {
      EGOERA.geratzenDenbora--;
      marraztuDenbora();
    } else {
      amaituTesta();
    }
  }, 1000);
}

function geldituTesta() {
  if (EGOERA.tenporizadorea) {
    clearInterval(EGOERA.tenporizadorea);
    EGOERA.tenporizadorea = null;
  }
}

function eguneratuAurrerapena() {
  const erantzunakKop = Object.keys(EGOERA.erabiltzaileAukerak).length;
  const ehunekoa = (erantzunakKop / EGOERA.galderak.length) * 100;
  const fill = document.getElementById('progress-bar-fill');
  if (fill) fill.style.width = `${ehunekoa}%`;
  const textFraction = document.getElementById('progress-text-fraction');
  if (textFraction) textFraction.textContent = `${erantzunakKop}/${EGOERA.galderak.length}`;
}

function aukeratuErantzuna(galderaId, aukeraIndizea) {
  if (!EGOERA.testMartxan) return;

  EGOERA.erabiltzaileAukerak[galderaId] = aukeraIndizea;
  eguneratuAurrerapena();

  // Eguneratu botoiak uneko txartelean
  const aukeraBotoiak = document.querySelectorAll(`[data-qid="${galderaId}"] .option-btn`);
  aukeraBotoiak.forEach((btn, idx) => {
    btn.classList.toggle('selected', idx === aukeraIndizea);
  });

  // Eguneratu pilota nabigatzailea
  renderizatuGalderaPilotak(!EGOERA.testMartxan);
  
  // Eguneratu beheko kontroleko erantzun-kopurua
  const counterText = document.getElementById('test-answered-counter');
  if (counterText) {
    const erantzunakKop = Object.keys(EGOERA.erabiltzaileAukerak).length;
    counterText.textContent = `${erantzunakKop} / ${EGOERA.galderak.length} erantzunda`;
  }
}

function renderizatuTesta(emaitzakIkusi = false) {
  renderizatuGalderaPilotak(emaitzakIkusi);
  renderizatuGalderaBakarka(EGOERA.unekoGalderaIndizea, emaitzakIkusi);
}

function renderizatuGalderaPilotak(emaitzakIkusi = false) {
  const pillsContainer = document.getElementById('test-question-pills');
  if (!pillsContainer) return;

  const pillsHtml = EGOERA.galderak.map((g, idx) => {
    const hautatutakoAukera = EGOERA.erabiltzaileAukerak[g.id];
    const erantzunda = (hautatutakoAukera !== undefined);
    const unekoaDa = (idx === EGOERA.unekoGalderaIndizea);

    let klaseak = 'q-pill';
    if (unekoaDa) klaseak += ' active';
    if (erantzunda) klaseak += ' answered';

    if (emaitzakIkusi) {
      if (hautatutakoAukera === g.zuzena) {
        klaseak += ' correct';
      } else {
        klaseak += ' wrong';
      }
    }

    return `
      <button class="${klaseak}" onclick="joanGalderara(${idx})" title="Joan ${idx + 1}. galderara">
        ${idx + 1}
      </button>
    `;
  }).join('');

  pillsContainer.innerHTML = pillsHtml;
}

function renderizatuGalderaBakarka(qIdx, emaitzakIkusi = false) {
  const container = document.getElementById('test-single-card-container');
  if (!container || !EGOERA.galderak[qIdx]) return;

  const g = EGOERA.galderak[qIdx];
  const letrak = ['A', 'B', 'C', 'D'];
  const hautatutakoAukera = EGOERA.erabiltzaileAukerak[g.id];
  const erantzunda = (hautatutakoAukera !== undefined);
  const zuzenaDa = erantzunda && (hautatutakoAukera === g.zuzena);

  const aukerakHtml = g.aukerak.map((aukeraTestua, aIdx) => {
    let klaseak = 'option-btn';
    if (hautatutakoAukera === aIdx) klaseak += ' selected';

    if (emaitzakIkusi) {
      if (aIdx === g.zuzena) {
        klaseak += ' correct';
      } else if (hautatutakoAukera === aIdx && !zuzenaDa) {
        klaseak += ' wrong';
      }
    }

    return `
      <button class="${klaseak}" onclick="aukeratuErantzuna(${g.id}, ${aIdx})" ${emaitzakIkusi ? 'disabled' : ''}>
        <span class="option-letter">${letrak[aIdx]}</span>
        <span>${aukeraTestua}</span>
      </button>
    `;
  }).join('');

  let azalpenKutxa = '';
  if (emaitzakIkusi) {
    azalpenKutxa = `
      <div class="explanation-box ${zuzenaDa ? 'correct' : 'wrong'}" style="margin-top:16px;">
        <div style="font-weight:700; margin-bottom:4px;">
          ${zuzenaDa ? '✅ ERANTZUN ZUZENA!' : `❌ ERANTZUN OKERRA! (Erantzun zuzena: ${letrak[g.zuzena]})`}
        </div>
        <div>${g.azalpena}</div>
      </div>
    `;
  }

  const erantzunakKop = Object.keys(EGOERA.erabiltzaileAukerak).length;
  const isFirst = (qIdx === 0);
  const isLast = (qIdx === EGOERA.galderak.length - 1);

  container.innerHTML = `
    <div class="question-card" data-qid="${g.id}">
      <div class="q-header">
        <span class="q-badge">${g.gaia}</span>
        <span style="font-size:0.85rem; color:var(--accent-cyan); font-family:var(--font-mono); font-weight:700;">
          ${qIdx + 1} / ${EGOERA.galderak.length}
        </span>
      </div>

      <div class="question-title">${qIdx + 1}. ${g.enuntziatua}</div>
      <div class="options-grid">${aukerakHtml}</div>
      ${azalpenKutxa}

      <!-- NABIGAZIO KONTROLAK (AURREKOA, HURRENGOA, BUKATU) -->
      <div class="test-nav-controls">
        <button class="btn-secondary" onclick="joanAurrekoGalderara()" ${isFirst ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
          ⬅️ Aurrekoa
        </button>

        <span id="test-answered-counter" class="test-counter-text">
          ${erantzunakKop} / ${EGOERA.galderak.length} erantzunda
        </span>

        <div style="display:flex; gap:8px;">
          ${!isLast ? `
            <button class="btn-primary" onclick="joanHurrengoGalderara()">
              Hurrengoa ➡️
            </button>
          ` : ''}

          ${(!emaitzakIkusi) ? `
            <button class="btn-success" onclick="eskatuAmaituTesta()" style="${isLast ? '' : 'font-size:0.85rem; padding:8px 16px;'}">
              🏁 Testa Bukatu (${erantzunakKop}/${EGOERA.galderak.length})
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  renderizatuGalderaPilotak(emaitzakIkusi);
}

function joanGalderara(indizea) {
  if (indizea < 0 || indizea >= EGOERA.galderak.length) return;
  EGOERA.unekoGalderaIndizea = indizea;
  const resultsCard = document.getElementById('test-results-card');
  const emaitzakIkusi = !EGOERA.testMartxan && resultsCard && resultsCard.style.display !== 'none';
  renderizatuGalderaBakarka(indizea, emaitzakIkusi);
}

function joanHurrengoGalderara() {
  if (EGOERA.unekoGalderaIndizea < EGOERA.galderak.length - 1) {
    joanGalderara(EGOERA.unekoGalderaIndizea + 1);
  }
}

function joanAurrekoGalderara() {
  if (EGOERA.unekoGalderaIndizea > 0) {
    joanGalderara(EGOERA.unekoGalderaIndizea - 1);
  }
}

function eskatuAmaituTesta() {
  const erantzunakKop = Object.keys(EGOERA.erabiltzaileAukerak).length;
  const geratzenDira = EGOERA.galderak.length - erantzunakKop;
  if (geratzenDira > 0) {
    irekiModala(
      "Testa bukatu nahi duzu?",
      `Oraindik ${geratzenDira} galdera erantzuteke dituzu (${erantzunakKop} / ${EGOERA.galderak.length} erantzunda). Ziur zaude oraintxe bertan zuzendu nahi duzula?`,
      () => amaituTesta()
    );
  } else {
    amaituTesta();
  }
}

function toggleTestAllReviewView() {
  const allContainer = document.getElementById('test-all-review-container');
  const singleContainer = document.getElementById('test-single-card-container');
  const btn = document.getElementById('btn-toggle-all-review');

  if (allContainer.style.display === 'none') {
    singleContainer.style.display = 'none';
    allContainer.style.display = 'block';
    if (btn) btn.textContent = '🔍 Ikuspegi Banakakoa (Galderaz Galdera)';
    renderizatuGalderaGuztiakReview();
  } else {
    allContainer.style.display = 'none';
    singleContainer.style.display = 'block';
    if (btn) btn.textContent = '📋 Ikusi Zerrenda Osoa (Guztiak Batera)';
  }
}

function renderizatuGalderaGuztiakReview() {
  const allContainer = document.getElementById('test-all-review-container');
  if (!allContainer) return;
  const letrak = ['A', 'B', 'C', 'D'];

  const html = EGOERA.galderak.map((g, qIdx) => {
    const hautatutakoAukera = EGOERA.erabiltzaileAukerak[g.id];
    const erantzunda = (hautatutakoAukera !== undefined);
    const zuzenaDa = erantzunda && (hautatutakoAukera === g.zuzena);

    const aukerakHtml = g.aukerak.map((aukeraTestua, aIdx) => {
      let klaseak = 'option-btn';
      if (hautatutakoAukera === aIdx) klaseak += ' selected';
      if (aIdx === g.zuzena) klaseak += ' correct';
      else if (hautatutakoAukera === aIdx && !zuzenaDa) klaseak += ' wrong';

      return `
        <button class="${klaseak}" disabled>
          <span class="option-letter">${letrak[aIdx]}</span>
          <span>${aukeraTestua}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="question-card" style="margin-bottom:20px;">
        <div class="q-header">
          <span class="q-badge">${g.gaia}</span>
          <span style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono);">${qIdx + 1} / ${EGOERA.galderak.length}</span>
        </div>
        <div class="question-title">${qIdx + 1}. ${g.enuntziatua}</div>
        <div class="options-grid">${aukerakHtml}</div>
        <div class="explanation-box ${zuzenaDa ? 'correct' : 'wrong'}" style="margin-top:14px;">
          <div style="font-weight:700; margin-bottom:4px;">
            ${zuzenaDa ? '✅ ERANTZUN ZUZENA!' : `❌ ERANTZUN OKERRA! (Erantzun zuzena: ${letrak[g.zuzena]})`}
          </div>
          <div>${g.azalpena}</div>
        </div>
      </div>
    `;
  }).join('');

  allContainer.innerHTML = html;
}

function amaituTesta() {
  geldituTesta();
  EGOERA.testMartxan = false;

  let zuzenak = 0;
  EGOERA.okerrak = [];

  const gaiStat = {};

  EGOERA.galderak.forEach(g => {
    const erabAukera = EGOERA.erabiltzaileAukerak[g.id];
    const kat = lortuKategoriaNagusia(g.gaia);
    if (!gaiStat[kat]) gaiStat[kat] = { zuzen: 0, huts: 0 };

    if (erabAukera === g.zuzena) {
      zuzenak++;
      gaiStat[kat].zuzen++;
    } else {
      gaiStat[kat].huts++;
      const jatorrizkoa = GALDERA_BANKUA.find(item => item.id === g.id);
      if (jatorrizkoa) {
        EGOERA.okerrak.push(jatorrizkoa);
      }
    }
  });

  const okerrakKop = EGOERA.galderak.length - zuzenak;
  const nota10 = parseFloat(((zuzenak / EGOERA.galderak.length) * 10).toFixed(1));
  const gainditua = nota10 >= 5.0;

  document.getElementById('stat-correct-count').textContent = zuzenak;
  document.getElementById('stat-wrong-count').textContent = okerrakKop;
  document.getElementById('stat-total-count').textContent = EGOERA.galderak.length;
  
  const scoreNumEl = document.getElementById('score-num');
  scoreNumEl.textContent = `${nota10}`;

  const verdictEl = document.getElementById('verdict-text');
  if (gainditua) {
    verdictEl.className = 'results-verdict pass';
    verdictEl.textContent = `🎉 GAINDITUA! (Nota: ${nota10} / 10)`;
  } else {
    verdictEl.className = 'results-verdict fail';
    verdictEl.textContent = `❌ EZ GAINDITUA (Nota: ${nota10} / 10). Birpasatu akatsak!`;
  }

  const btnReviewFailed = document.getElementById('btn-review-failed');
  const failedCountSpan = document.getElementById('failed-count-btn');
  if (btnReviewFailed && failedCountSpan) {
    if (EGOERA.okerrak.length > 0) {
      btnReviewFailed.style.display = 'inline-flex';
      failedCountSpan.textContent = EGOERA.okerrak.length;
    } else {
      btnReviewFailed.style.display = 'none';
    }
  }

  document.getElementById('test-results-card').style.display = 'block';

  // Estatistikak lokalean gorde
  gordeTestEmaitza(nota10, zuzenak, okerrakKop, gaiStat);

  renderizatuTesta(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function birpasatuOkerrak() {
  if (EGOERA.okerrak.length === 0) {
    alert("Ez duzu akatsik birpasatzeko! Test bikaina!");
    return;
  }
  hasiTeoriaTesta(EGOERA.okerrak);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================================
// ZATI PRAKTIKOA: 4 MODUAK ETA TOKENIZER BIDEZKO NABARMENDZEA
// =========================================================================
function setupPraktika() {
  setupPraktikaSubNav();
  erakutsiAzalpena('prozesuak');
  erakutsiBetetzea(0);
  erakutsiZuzenketa(0);
  erakutsiIdaztea(0);
}

function setupPraktikaSubNav() {
  document.querySelectorAll('.sub-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      document.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.getElementById('praktika-azalpenak-panel').style.display = (mode === 'azalpenak') ? 'block' : 'none';
      document.getElementById('praktika-betetzeak-panel').style.display = (mode === 'betetzeak') ? 'block' : 'none';
      document.getElementById('praktika-zuzenketak-panel').style.display = (mode === 'zuzenketak') ? 'block' : 'none';
      document.getElementById('praktika-idazteak-panel').style.display = (mode === 'idazteak') ? 'block' : 'none';
    });
  });
}

// 1. KODEAREN AZALPENA
function erakutsiAzalpena(ariketaId) {
  EGOERA.praktikaAzalpenId = ariketaId;
  const ariketa = PRAKTIKA_DATA.azalpenak.find(a => a.id === ariketaId);
  if (!ariketa) return;

  const selectorHtml = PRAKTIKA_DATA.azalpenak.map(a => `
    <button class="nav-btn ${a.id === ariketaId ? 'active' : ''}" 
      onclick="erakutsiAzalpena('${a.id}')" style="font-size:0.85rem;">
      ${a.izenburua.split(':')[0]}
    </button>
  `).join('');
  document.getElementById('azalpen-ariketak-list').innerHTML = selectorHtml;

  document.getElementById('ide-filename-display').textContent = ariketa.fitxategia;
  document.getElementById('azalpen-titulua').textContent = ariketa.izenburua;
  document.getElementById('azalpen-deskribapena').textContent = ariketa.deskribapena;

  // Kodea koloreztatu Tokenizer bidez
  const highlighted = highlightJava(ariketa.kodea);
  document.getElementById('ide-code-content').innerHTML = `<code>${highlighted}</code>`;

  // Kontzeptuak
  const kontzeptuakHtml = ariketa.kontzeptuak.map(k => `
    <div class="concept-card">
      <div class="concept-title"><code>${highlightJava(k.lerroa)}</code></div>
      <div class="concept-body">${k.azalpena}</div>
    </div>
  `).join('');
  document.getElementById('azalpen-kontzeptuak-list').innerHTML = kontzeptuakHtml;

  // Galderak
  const galderakHtml = ariketa.galdetegia.map(q => `
    <div style="background:rgba(15, 23, 42, 0.6); border-radius:8px; padding:14px; margin-bottom:10px; border-left:3px solid var(--accent-cyan);">
      <div style="font-weight:700; color:#fff; margin-bottom:6px;">❓ ${q.galdera}</div>
      <div style="color:var(--text-muted); font-size:0.9rem;">💡 ${q.erantzuna}</div>
    </div>
  `).join('');
  document.getElementById('azalpen-galderak-list').innerHTML = galderakHtml;

  // Markatu praktika ikusita
  markatuPraktikaEginda('azalpenak', ariketaId);
}

// 2. KODEAN HUTSUNEAK BETE (TOKENIZER NABARMENDUA INPUT PESETA BIDEZ)
function erakutsiBetetzea(index) {
  EGOERA.fillIndex = index;
  const item = PRAKTIKA_DATA.betetzeak[index];
  if (!item) return;

  const selectorHtml = PRAKTIKA_DATA.betetzeak.map((e, i) => `
    <button class="nav-btn ${i === index ? 'active' : ''}" onclick="erakutsiBetetzea(${i})" style="font-size:0.85rem;">
      ${i + 1}. Hutsunea
    </button>
  `).join('');
  document.getElementById('fill-selector-list').innerHTML = selectorHtml;

  document.getElementById('fill-titulua').textContent = item.titulua;
  document.getElementById('fill-argibidea').textContent = item.argibidea;

  // 1. Ordezkatu hutsuneak slot markatzaileekin
  let kodeTxantiloia = item.hasierakoKodea;
  item.soluzioa.forEach((sol, i) => {
    kodeTxantiloia = kodeTxantiloia.replace(/_{4,}/, `__INPUT_SLOT_${i}__`);
  });

  // 2. Koloreztatu kode osoa Tokenizer bidez!
  let nabarmendua = highlightJava(kodeTxantiloia);

  // 3. Txertatu input kutxak slot markatzaileen ordez
  item.soluzioa.forEach((sol, i) => {
    nabarmendua = nabarmendua.replace(
      `__INPUT_SLOT_${i}__`, 
      `<input type="text" class="fill-input" id="fill-input-${i}" placeholder="Idatzi hemen..." autocomplete="off" spellcheck="false">`
    );
  });

  document.getElementById('fill-code-container').innerHTML = `<code>${nabarmendua}</code>`;
  document.getElementById('fill-feedback').style.display = 'none';

  document.getElementById('fill-check-btn').onclick = () => egiaztatuBeteKodea(index);
}

function egiaztatuBeteKodea(index) {
  const item = PRAKTIKA_DATA.betetzeak[index];
  let guztiakZuzen = true;

  item.soluzioa.forEach((sol, i) => {
    const input = document.getElementById(`fill-input-${i}`);
    if (!input) return;
    const balioa = input.value.trim().replace(/\s+/g, '');
    const solGarbia = sol.trim().replace(/\s+/g, '');

    if (balioa.toLowerCase() === solGarbia.toLowerCase()) {
      input.style.borderColor = 'var(--accent-green)';
      input.style.background = 'rgba(34, 197, 94, 0.2)';
    } else {
      input.style.borderColor = 'var(--accent-red)';
      input.style.background = 'rgba(239, 68, 68, 0.2)';
      guztiakZuzen = false;
    }
  });

  const feedback = document.getElementById('fill-feedback');
  feedback.style.display = 'block';

  if (guztiakZuzen) {
    feedback.innerHTML = `
      <div style="background:rgba(34, 197, 94, 0.2); border:1px solid var(--accent-green); padding:14px; border-radius:8px; color:var(--accent-green); font-weight:700;">
        🎉 Zorionak! Kodea guztiz zuzen bete duzu!
        <div style="font-weight:400; color:#e2e8f0; margin-top:6px;">${item.azalpena}</div>
      </div>
    `;
    markatuPraktikaEginda('betetzeak', index);
  } else {
    feedback.innerHTML = `
      <div style="background:rgba(239, 68, 68, 0.2); border:1px solid var(--accent-red); padding:14px; border-radius:8px; color:#fca5a5;">
        ❌ Saiatu berriro! Egiaztatu maiuskulak eta sintaxia (adib: synchronized, volatile, join, isAlive...).
      </div>
    `;
  }
}

// 3. AKATSAK BILATU ETA ZUZENDU (BUG HUNTER)
function erakutsiZuzenketa(index) {
  EGOERA.bugIndex = index;
  const erronka = PRAKTIKA_DATA.zuzenketak[index];
  if (!erronka) return;

  const selectorHtml = PRAKTIKA_DATA.zuzenketak.map((e, i) => `
    <button class="nav-btn ${i === index ? 'active' : ''}" onclick="erakutsiZuzenketa(${i})" style="font-size:0.85rem;">
      ${i + 1}. Akatsa
    </button>
  `).join('');
  document.getElementById('bug-selector-list').innerHTML = selectorHtml;

  document.getElementById('bug-titulua').textContent = erronka.titulua;
  document.getElementById('bug-enuntziatua').textContent = erronka.enuntziatua;

  document.getElementById('bug-code-display').innerHTML = `<code>${highlightJava(erronka.okerrekoKodea)}</code>`;

  const aukerakHtml = erronka.aukerak.map((aukera, i) => `
    <button class="option-btn" id="bug-opt-${i}" onclick="zuzenduBug(${index}, ${i})">
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span>${aukera}</span>
    </button>
  `).join('');
  document.getElementById('bug-options-container').innerHTML = aukerakHtml;

  document.getElementById('bug-solution-panel').style.display = 'none';
}

function zuzenduBug(bugIdx, aukeraIdx) {
  const erronka = PRAKTIKA_DATA.zuzenketak[bugIdx];
  const zuzenaDa = (aukeraIdx === erronka.zuzenaIndex);

  const panel = document.getElementById('bug-solution-panel');
  panel.style.display = 'block';

  const botoiak = document.querySelectorAll('#bug-options-container .option-btn');
  botoiak.forEach((btn, idx) => {
    btn.classList.toggle('correct', idx === erronka.zuzenaIndex);
    if (idx === aukeraIdx && !zuzenaDa) {
      btn.classList.add('wrong');
    }
  });

  if (zuzenaDa) {
    markatuPraktikaEginda('zuzenketak', bugIdx);
  }

  panel.innerHTML = `
    <div style="background:${zuzenaDa ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; 
         border:1px solid ${zuzenaDa ? 'var(--accent-green)' : 'var(--accent-red)'}; 
         border-radius:10px; padding:18px; margin-top:16px;">
      <h4 style="color:${zuzenaDa ? 'var(--accent-green)' : 'var(--accent-red)'}; margin-bottom:8px;">
        ${zuzenaDa ? '🎉 Bikain! Akatsa ondo identifikatu duzu.' : '❌ Okerra. Begiratu konponbide zuzena:'}
      </h4>
      <p style="margin-bottom:12px; color:#e2e8f0;">${erronka.azalpena}</p>
      <div style="font-weight:700; color:var(--accent-cyan); margin-bottom:6px;">✨ Kode zuzendua:</div>
      <div class="code-container" style="background:#090d16; border-radius:6px; border:1px solid #334155;">
        <code>${highlightJava(erronka.zuzenekoKodea)}</code>
      </div>
    </div>
  `;
}

// 4. KODE ZATIA IDATZI
function erakutsiIdaztea(index) {
  EGOERA.writeIndex = index;
  const item = PRAKTIKA_DATA.idazteak[index];
  if (!item) return;

  const selectorHtml = PRAKTIKA_DATA.idazteak.map((e, i) => `
    <button class="nav-btn ${i === index ? 'active' : ''}" onclick="erakutsiIdaztea(${i})" style="font-size:0.85rem;">
      ${i + 1}. Ariketa
    </button>
  `).join('');
  document.getElementById('write-selector-list').innerHTML = selectorHtml;

  document.getElementById('write-titulua').textContent = item.titulua;
  document.getElementById('write-argibidea').textContent = item.argibidea;
  document.getElementById('write-user-input').value = '';
  document.getElementById('write-feedback').style.display = 'none';

  document.getElementById('write-check-btn').onclick = () => egiaztatuIdaztea(index);
  document.getElementById('write-solution-btn').onclick = () => erakutsiIdazteSoluzioa(index);
}

function egiaztatuIdaztea(index) {
  const item = PRAKTIKA_DATA.idazteak[index];
  const userText = document.getElementById('write-user-input').value.trim();

  if (!userText) {
    alert("Mesedez, idatzi zure kodea lehenik!");
    return;
  }

  const missing = item.hitzGakoak.filter(kw => !userText.toLowerCase().includes(kw.toLowerCase()));
  const feedback = document.getElementById('write-feedback');
  feedback.style.display = 'block';

  if (missing.length === 0) {
    feedback.innerHTML = `
      <div style="background:rgba(34, 197, 94, 0.2); border:1px solid var(--accent-green); padding:16px; border-radius:8px; color:var(--accent-green);">
        <h4 style="margin-bottom:6px;">🎉 Kodea baliozkoa dirudi! Funtsezko kontzeptu guztiak erabili dituzu.</h4>
        <p style="color:#e2e8f0; font-size:0.9rem;">${item.azalpena}</p>
      </div>
    `;
    markatuPraktikaEginda('idazteak', index);
  } else {
    feedback.innerHTML = `
      <div style="background:rgba(239, 68, 68, 0.2); border:1px solid var(--accent-red); padding:16px; border-radius:8px; color:#fca5a5;">
        <h4 style="margin-bottom:6px;">⚠️ Zure kodean elementu garrantzitsu batzuk falta dira:</h4>
        <p style="color:#fff; font-size:0.9rem;">Falta diren gakoak: <b>${missing.join(', ')}</b></p>
        <p style="margin-top:6px; font-size:0.85rem;">Eman 'Erakutsi Ereduzko Kodea' botoiari erantzun aproposa ikusteko.</p>
      </div>
    `;
  }
}

function erakutsiIdazteSoluzioa(index) {
  const item = PRAKTIKA_DATA.idazteak[index];
  const feedback = document.getElementById('write-feedback');
  feedback.style.display = 'block';

  feedback.innerHTML = `
    <div style="background:#090d16; border:1px solid var(--accent-blue); padding:18px; border-radius:8px; margin-top:12px;">
      <h4 style="color:var(--accent-cyan); margin-bottom:8px;">💡 Ereduzko Soluzioa:</h4>
      <div class="code-container" style="background:#000; border-radius:6px; border:1px solid #334155;">
        <code>${highlightJava(item.adibidea)}</code>
      </div>
      <p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">${item.azalpena}</p>
    </div>
  `;
}

// =========================================================================
// ESTATISTIKA ETA PUNTU AHULEN MOTORRA (LOCALSTORAGE PERSISTENTZIA)
// =========================================================================
const STATS_STORAGE_KEY = 'ZPP_ENTRENAMENDU_ESTATISTIKAK_V2';

function lortuKategoriaNagusia(gaia) {
  if (!gaia) return "Beste Batzuk";
  if (gaia.includes("Prozesadoreak") || gaia.includes("Lengoaiak") || gaia.includes("Kontzeptu") || gaia.includes("IPC") || gaia.includes("PCB")) {
    return "SE eta Prozesuen Oinarriak";
  }
  if (gaia.includes("Egoerak") || gaia.includes("Planifikazio Mailak")) {
    return "Prozesuen 7 Egoerak";
  }
  if (gaia.includes("Algoritmoak") || gaia.includes("Planifikazio")) {
    return "SE Planifikazio Algoritmoak";
  }
  if (gaia.includes("Java Prozesu") || gaia.includes("ProcessBuilder")) {
    return "Java Multiprozesua (ProcessBuilder)";
  }
  if (gaia.includes("Hariak") || gaia.includes("Harien") || gaia.includes("Swing")) {
    return "Hariak eta Multithreading";
  }
  if (gaia.includes("Sinkronizazioa") || gaia.includes("5 Arazoak") || gaia.includes("Deadlock") || gaia.includes("Inanizioa") || gaia.includes("Race")) {
    return "Sinkronizazioa eta 5 Arazoak";
  }
  if (gaia.includes("Bildumak") || gaia.includes("Timer") || gaia.includes("Queue")) {
    return "Bilduma Konkurrenteak eta Timer";
  }
  return "Beste Batzuk";
}

function kargatuEstatistikak() {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  return {
    testKopurua: 0,
    notak: [],
    azkenNota: 0,
    notaAltuena: 0,
    gaiHutsak: {
      "SE eta Prozesuen Oinarriak": { zuzen: 0, huts: 0 },
      "Prozesuen 7 Egoerak": { zuzen: 0, huts: 0 },
      "SE Planifikazio Algoritmoak": { zuzen: 0, huts: 0 },
      "Java Multiprozesua (ProcessBuilder)": { zuzen: 0, huts: 0 },
      "Hariak eta Multithreading": { zuzen: 0, huts: 0 },
      "Sinkronizazioa eta 5 Arazoak": { zuzen: 0, huts: 0 },
      "Bilduma Konkurrenteak eta Timer": { zuzen: 0, huts: 0 }
    },
    praktikaEginda: {
      azalpenak: {},
      betetzeak: {},
      zuzenketak: {},
      idazteak: {}
    }
  };
}

function gordeTestEmaitza(nota, zuzenak, okerrak, gaiStat) {
  const stats = kargatuEstatistikak();
  stats.testKopurua++;
  stats.notak.push(nota);
  stats.azkenNota = nota;
  if (nota > stats.notaAltuena) stats.notaAltuena = nota;

  for (const [kat, values] of Object.entries(gaiStat)) {
    if (!stats.gaiHutsak[kat]) {
      stats.gaiHutsak[kat] = { zuzen: 0, huts: 0 };
    }
    stats.gaiHutsak[kat].zuzen += values.zuzen;
    stats.gaiHutsak[kat].huts += values.huts;
  }

  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {}
}

function markatuPraktikaEginda(mota, id) {
  const stats = kargatuEstatistikak();
  if (!stats.praktikaEginda) {
    stats.praktikaEginda = { azalpenak: {}, betetzeak: {}, zuzenketak: {}, idazteak: {} };
  }
  if (!stats.praktikaEginda[mota]) {
    stats.praktikaEginda[mota] = {};
  }
  stats.praktikaEginda[mota][id] = true;

  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {}
}

function garbituEstatistikak() {
  if (confirm("Ziur zaude entrenamenduko estatistika eta puntuazio guztiak berrezarri nahi dituzula?")) {
    localStorage.removeItem(STATS_STORAGE_KEY);
    eguneratuEstatistikaPanela();
  }
}

function kalkulatuMailaEtaXP(stats) {
  let xp = stats.notak.reduce((acc, n) => acc + Math.round(n * 15), 0);
  
  const egindakoAzalpenak = Object.keys(stats.praktikaEginda?.azalpenak || {}).length;
  const egindakoBetetzeak = Object.keys(stats.praktikaEginda?.betetzeak || {}).length;
  const egindakoZuzenketak = Object.keys(stats.praktikaEginda?.zuzenketak || {}).length;
  const egindakoIdazteak = Object.keys(stats.praktikaEginda?.idazteak || {}).length;
  
  xp += (egindakoAzalpenak * 15) + (egindakoBetetzeak * 30) + (egindakoZuzenketak * 35) + (egindakoIdazteak * 40);

  let levelTitle = "Hasiberria (Junior Harilaria)";
  let levelDesc = "Egin testak eta ariketak zure ezagutzak finkatzeko!";

  if (xp > 1200) {
    levelTitle = "👑 ZPP Sinkronizazio Maisua (Azterketarako Prest!)";
    levelDesc = "Maila bikaina! Gai eta ariketa guztiak menperatzen dituzu.";
  } else if (xp > 700) {
    levelTitle = "⚡ Konkurrentzia Aditua (Multithread Senior)";
    levelDesc = "Ezagutza aurreratua. Puntu ahulak birpasatu 10/10 lortzeko!";
  } else if (xp > 300) {
    levelTitle = "🛠️ Prozesu eta Hari Kudeatzailea";
    levelDesc = "Oinarri sendoak. Jarraitu ariketa praktikoak ebazten!";
  }

  return { xp, levelTitle, levelDesc };
}

function eguneratuEstatistikaPanela() {
  const stats = kargatuEstatistikak();
  const { xp, levelTitle, levelDesc } = kalkulatuMailaEtaXP(stats);

  const elLevel = document.getElementById('stat-user-level');
  if (elLevel) elLevel.textContent = levelTitle;
  const elDesc = document.getElementById('stat-level-desc');
  if (elDesc) elDesc.textContent = levelDesc;
  const elXp = document.getElementById('stat-total-xp');
  if (elXp) elXp.textContent = `${xp} XP`;

  const elTests = document.getElementById('stat-total-tests');
  if (elTests) elTests.textContent = stats.testKopurua;

  const avg = stats.notak.length > 0
    ? (stats.notak.reduce((a, b) => a + b, 0) / stats.notak.length).toFixed(1)
    : '-';
  const elAvg = document.getElementById('stat-avg-score');
  if (elAvg) elAvg.textContent = avg !== '-' ? `${avg} / 10` : '-';

  const elMax = document.getElementById('stat-max-score');
  if (elMax) elMax.textContent = stats.notak.length > 0 ? `${stats.notaAltuena} / 10` : '-';

  const totalPraktikak = (PRAKTIKA_DATA.azalpenak.length + PRAKTIKA_DATA.betetzeak.length + PRAKTIKA_DATA.zuzenketak.length + PRAKTIKA_DATA.idazteak.length);
  const osatutakoPraktikak = (Object.keys(stats.praktikaEginda?.azalpenak || {}).length +
                              Object.keys(stats.praktikaEginda?.betetzeak || {}).length +
                              Object.keys(stats.praktikaEginda?.zuzenketak || {}).length +
                              Object.keys(stats.praktikaEginda?.idazteak || {}).length);
  const elPrac = document.getElementById('stat-practice-completed');
  if (elPrac) elPrac.textContent = `${osatutakoPraktikak} / ${totalPraktikak}`;

  // Gai bakoitzeko arrakasta tasa eta PUNTU AHULAK
  const weakContainer = document.getElementById('weak-point-container');
  const topicsContainer = document.getElementById('stat-topics-breakdown');
  let ahulenak = [];

  let topicsHtml = '';
  for (const [kategoria, data] of Object.entries(stats.gaiHutsak)) {
    const guztira = data.zuzen + data.huts;
    const ehun = guztira > 0 ? Math.round((data.zuzen / guztira) * 100) : null;

    let barColor = 'var(--accent-green)';
    if (ehun !== null && ehun < 50) {
      barColor = 'var(--accent-red)';
      ahulenak.push({ kategoria, ehun, huts: data.huts });
    } else if (ehun !== null && ehun < 70) {
      barColor = 'var(--accent-yellow)';
      if (data.huts >= 2) ahulenak.push({ kategoria, ehun, huts: data.huts });
    }

    topicsHtml += `
      <div class="topic-row">
        <div style="flex:1;">
          <div style="font-weight:600; color:#fff; font-size:0.92rem;">${kategoria}</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">
            ${guztira > 0 ? `${data.zuzen} zuzen · ${data.huts} oker (${guztira} galderatik)` : 'Oraindik ez dago daturik'}
          </div>
        </div>
        <div style="display:flex; align-items:center;">
          <span style="font-family:var(--font-mono); font-weight:700; color:${barColor}; font-size:0.95rem;">
            ${ehun !== null ? `${ehun}%` : '-'}
          </span>
          <div class="topic-bar-bg">
            <div class="topic-bar-fill" style="width:${ehun !== null ? ehun : 0}%; background:${barColor};"></div>
          </div>
        </div>
      </div>
    `;
  }
  if (topicsContainer) topicsContainer.innerHTML = topicsHtml;

  // Puntu ahulen alerta
  if (weakContainer) {
    if (ahulenak.length > 0) {
      ahulenak.sort((a, b) => a.ehun - b.ehun);
      const ahulena = ahulenak[0];
      weakContainer.innerHTML = `
        <div class="weak-alert-box">
          <div>
            <div style="font-weight:700; color:var(--accent-red); font-size:1.05rem; display:flex; align-items:center; gap:8px;">
              <span>⚠️</span>
              <span>Puntu Ahula Hautemanda: ${ahulena.kategoria} (%${ahulena.ehun} arrakasta)</span>
            </div>
            <p style="color:#e2e8f0; font-size:0.88rem; margin-top:4px;">
              Gai honetan izan dituzu akats gehien. Entrenatu berariaz gai honetako galderak azterketa ziurtatzeko!
            </p>
          </div>
          <button class="btn-primary" onclick="entrenatuPuntuAhula('${ahulena.kategoria}')" style="background:var(--accent-red); border-color:var(--accent-red);">
            🎯 Entrenatu Puntu Ahula
          </button>
        </div>
      `;
    } else {
      weakContainer.innerHTML = `
        <div style="background:rgba(34, 197, 94, 0.1); border:1px solid rgba(34, 197, 94, 0.3); border-radius:var(--radius-md); padding:16px; margin-bottom:24px; color:var(--accent-green); display:flex; align-items:center; gap:12px;">
          <span style="font-size:1.4rem;">🎯</span>
          <div>
            <b>Ez da puntu ahul larririk hauteman!</b> Egin test gehiago zure estatistika orokorrak aberasteko.
          </div>
        </div>
      `;
    }
  }

  // Zati praktikoaren 4 moduen aurrerapena
  const practicalContainer = document.getElementById('stat-practical-breakdown');
  if (practicalContainer) {
    const azalpenakKop = Object.keys(stats.praktikaEginda?.azalpenak || {}).length;
    const betetzeakKop = Object.keys(stats.praktikaEginda?.betetzeak || {}).length;
    const zuzenketakKop = Object.keys(stats.praktikaEginda?.zuzenketak || {}).length;
    const idazteakKop = Object.keys(stats.praktikaEginda?.idazteak || {}).length;

    practicalContainer.innerHTML = `
      <div style="background:rgba(15,23,42,0.6); padding:14px; border-radius:8px; border:1px solid #334155;">
        <div style="font-weight:600; color:var(--accent-cyan); margin-bottom:4px;">📖 Kodearen Azalpena</div>
        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#fff;">${azalpenakKop} / ${PRAKTIKA_DATA.azalpenak.length}</div>
        <div style="font-size:0.78rem; color:var(--text-muted);">Klaseko atazak aztertuta</div>
      </div>
      <div style="background:rgba(15,23,42,0.6); padding:14px; border-radius:8px; border:1px solid #334155;">
        <div style="font-weight:600; color:var(--accent-green); margin-bottom:4px;">🧩 Hutsuneak Bete</div>
        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#fff;">${betetzeakKop} / ${PRAKTIKA_DATA.betetzeak.length}</div>
        <div style="font-size:0.78rem; color:var(--text-muted);">Kode hutsuneak asmatuta</div>
      </div>
      <div style="background:rgba(15,23,42,0.6); padding:14px; border-radius:8px; border:1px solid #334155;">
        <div style="font-weight:600; color:var(--accent-yellow); margin-bottom:4px;">🐛 Akatsak Zuzendu</div>
        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#fff;">${zuzenketakKop} / ${PRAKTIKA_DATA.zuzenketak.length}</div>
        <div style="font-size:0.78rem; color:var(--text-muted);">Bug Hunter erronkak</div>
      </div>
      <div style="background:rgba(15,23,42,0.6); padding:14px; border-radius:8px; border:1px solid #334155;">
        <div style="font-weight:600; color:#c084fc; margin-bottom:4px;">✍️ Kode Zatia Idatzi</div>
        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#fff;">${idazteakKop} / ${PRAKTIKA_DATA.idazteak.length}</div>
        <div style="font-size:0.78rem; color:var(--text-muted);">Azterketa kodeak osatuta</div>
      </div>
    `;
  }
}

function entrenatuPuntuAhula(kategoria) {
  const batDatozenak = GALDERA_BANKUA.filter(g => lortuKategoriaNagusia(g.gaia) === kategoria);
  if (batDatozenak.length === 0) {
    alert("Ez da galderarik aurkitu gai honetarako.");
    return;
  }
  aldatuTab('teoria');
  hasiTeoriaTesta(batDatozenak);
}

// =========================================================================
// LABURPEN TEORIKOA ETA BEKTORIALEKO SVG DIAGRAMAK
// =========================================================================
function kargatuLaburpena() {
  const laburpenContainer = document.getElementById('laburpen-container');
  if (!laburpenContainer) return;

  laburpenContainer.innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 290px), 1fr)); gap:20px;">
      
      <!-- TXARTELA 1: 7 EGOERAK + SVG DIAGRAMA -->
      <div class="question-card">
        <span class="q-badge">1. GAIA: PROZESUEN 7 EGOERAK</span>
        <h3 style="margin:10px 0; color:var(--accent-cyan);">Egoeren Zikloa eta Trantsizioak</h3>
        
        <!-- SVG DIAGRAMA 1: 7 EGOERAK -->
        <div class="diagram-box">
          <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8"/>
              </marker>
            </defs>
            <!-- New -->
            <rect x="10" y="20" width="75" height="36" rx="6" fill="#334155" stroke="#64748b"/>
            <text x="47" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">BERRIA</text>
            <!-- Ready -->
            <rect x="130" y="20" width="85" height="36" rx="6" fill="#0369a1" stroke="#38bdf8"/>
            <text x="172" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">PREST (RAM)</text>
            <!-- Running -->
            <rect x="270" y="20" width="105" height="36" rx="6" fill="#15803d" stroke="#4ade80"/>
            <text x="322" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">EXEKUZIOAN (CPU)</text>
            <!-- Terminated -->
            <rect x="430" y="20" width="85" height="36" rx="6" fill="#b91c1c" stroke="#f87171"/>
            <text x="472" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">AMAITUA</text>
            <!-- Blocked -->
            <rect x="200" y="105" width="100" height="36" rx="6" fill="#d97706" stroke="#fbbf24"/>
            <text x="250" y="128" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">BLOKEATUA</text>
            <!-- Suspended Ready -->
            <rect x="120" y="195" width="115" height="36" rx="6" fill="#1e293b" stroke="#0284c7" stroke-dasharray="3,3"/>
            <text x="177" y="218" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">ESEKIA-PREST</text>
            <!-- Suspended Blocked -->
            <rect x="280" y="195" width="125" height="36" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-dasharray="3,3"/>
            <text x="342" y="218" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">ESEKIA-BLOKEATUA</text>

            <!-- Arrows -->
            <path d="M 85 38 L 126 38" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
            <path d="M 215 32 L 266 32" stroke="#4ade80" stroke-width="2" marker-end="url(#arrow)"/>
            <path d="M 270 44 L 219 44" stroke="#f87171" stroke-width="1.5" marker-end="url(#arrow)"/>
            <path d="M 375 38 L 426 38" stroke="#f87171" stroke-width="2" marker-end="url(#arrow)"/>
            <path d="M 310 56 L 275 102" stroke="#fbbf24" stroke-width="2" marker-end="url(#arrow)"/>
            <path d="M 235 105 L 185 59" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
            <path d="M 172 56 L 172 191" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2,2" marker-end="url(#arrow)"/>
            <path d="M 270 141 L 320 191" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2,2" marker-end="url(#arrow)"/>
            <path d="M 280 213 L 239 213" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)"/>
          </svg>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">SE Prozesuen 7 Egoeren Zikloa (RAM eta Swap diskoa)</div>
        </div>

        <ul style="padding-left:18px; font-size:0.9rem; line-height:1.75;">
          <li><b>BERRIA:</b> Prozesua sortu da; SEak PCB eta memoria esleitu behar dizkio.</li>
          <li><b>PREST:</b> RAM nagusian dago, CPU librea geratu zain.</li>
          <li><b>EXEKUZIOAN:</b> CPUren agindupean dago une horretan.</li>
          <li><b>BLOKEATUA:</b> S/I gertaera baten zain dago; ezin du CPU erabili.</li>
          <li><b>ESEKIA:</b> Memoria faltagatik disko nagusira (SWAP) eraman da.</li>
        </ul>
      </div>

      <!-- TXARTELA 2: HARIAREN BIZI-ZIKLOA + SVG DIAGRAMA -->
      <div class="question-card">
        <span class="q-badge">2. GAIA: HARIAREN BIZI-ZIKLOA JAVA-N</span>
        <h3 style="margin:10px 0; color:var(--accent-cyan);">Thread Egoerak eta Metodoak</h3>
        
        <!-- SVG DIAGRAMA 2: THREAD BIZI-ZIKLOA -->
        <div class="diagram-box">
          <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
            <!-- New -->
            <rect x="15" y="80" width="80" height="40" rx="8" fill="#334155" stroke="#94a3b8"/>
            <text x="55" y="105" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">NEW</text>
            <!-- Runnable -->
            <rect x="165" y="80" width="110" height="40" rx="8" fill="#0369a1" stroke="#38bdf8"/>
            <text x="220" y="105" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">RUNNABLE</text>
            <!-- Blocked / Waiting -->
            <rect x="165" y="160" width="110" height="40" rx="8" fill="#d97706" stroke="#f59e0b"/>
            <text x="220" y="185" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">WAITING / SLEEP</text>
            <!-- Terminated -->
            <rect x="365" y="80" width="110" height="40" rx="8" fill="#b91c1c" stroke="#f87171"/>
            <text x="420" y="105" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">TERMINATED</text>

            <!-- Arrows & Text -->
            <path d="M 95 100 L 161 100" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="128" y="92" fill="#38bdf8" font-size="9" text-anchor="middle">start()</text>

            <path d="M 275 100 L 361 100" stroke="#4ade80" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="318" y="92" fill="#4ade80" font-size="9" text-anchor="middle">run() amaitu</text>

            <path d="M 205 120 L 205 156" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow)"/>
            <text x="160" y="142" fill="#f59e0b" font-size="8">sleep / wait / join</text>

            <path d="M 235 160 L 235 124" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)"/>
            <text x="270" y="142" fill="#38bdf8" font-size="8">denbora / notify</text>
          </svg>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Hariaren Bizi-Zikloa eta Trantsizioak</div>
        </div>

        <ul style="padding-left:18px; font-size:0.9rem; line-height:1.75;">
          <li><b>start() vs run():</b> <code class="inline-code">start()</code>-ek OS haria sortzen du; <code class="inline-code">run()</code> deituz gero sekuentzialki dabil!</li>
          <li><b>join():</b> Haria amaitu arte deitzailea itxaronarazten du.</li>
          <li><b>isAlive():</b> Haria abiatu bada eta amaitu ez bada <code class="inline-code">true</code> da.</li>
        </ul>
      </div>

      <!-- TXARTELA 3: SWING EDT VS WORKER + SVG DIAGRAMA -->
      <div class="question-card">
        <span class="q-badge">3. GAIA: SWING EDT & MULTITHREADING</span>
        <h3 style="margin:10px 0; color:var(--accent-cyan);">Zergatik Izozten da Pantaila?</h3>
        
        <!-- SVG DIAGRAMA 3: SWING EDT -->
        <div class="diagram-box">
          <svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg">
            <!-- EDT Box -->
            <rect x="20" y="30" width="220" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="130" y="55" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Event Dispatch Thread (EDT)</text>
            <text x="130" y="80" fill="#94a3b8" font-size="10" text-anchor="middle">UI Marrazketa & Gertaerak</text>
            <rect x="40" y="95" width="180" height="35" rx="5" fill="#dc2626" opacity="0.8"/>
            <text x="130" y="117" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Thread.sleep() &rarr; IZOZTUTA!</text>

            <!-- Background Thread Box -->
            <rect x="280" y="30" width="220" height="120" rx="10" fill="#1e293b" stroke="#4ade80" stroke-width="1.5"/>
            <text x="390" y="55" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">Atzeko Haria (Thread / Worker)</text>
            <text x="390" y="80" fill="#94a3b8" font-size="10" text-anchor="middle">Kalkulu Luzeak & Lo-aldiak</text>
            <rect x="300" y="95" width="180" height="35" rx="5" fill="#166534"/>
            <text x="390" y="117" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">SwingUtilities.invokeLater()</text>
          </svg>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">EDT haria inoiz ez blokeatu lo-aldiekin!</div>
        </div>

        <p style="font-size:0.9rem; color:#cbd5e1;">
          Swing interfazea <b>hari-bakarrekoa</b> da. Kalkulu luzeak edo <code class="inline-code">Thread.sleep()</code> atzeko hari bati eman behar zaizkio beti, eta UI aldaketak <code class="inline-code">SwingUtilities.invokeLater(...)</code> bidez bidali EDT-ra.
        </p>
      </div>

      <!-- TXARTELA 4: DEADLOCK ETA COFFMAN BALDINTZAK + SVG -->
      <div class="question-card">
        <span class="q-badge">4. GAIA: DEADLOCK (HIL-BLOKEOA)</span>
        <h3 style="margin:10px 0; color:var(--accent-cyan);">Itxaronaldi Zirkularraren Egitura</h3>
        
        <!-- SVG DIAGRAMA 4: DEADLOCK -->
        <div class="diagram-box">
          <svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg">
            <!-- Hari 1 -->
            <circle cx="90" cy="90" r="35" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
            <text x="90" y="94" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">HARI 1</text>
            <!-- Lock A -->
            <rect x="180" y="20" width="80" height="36" rx="6" fill="#d97706" stroke="#fbbf24"/>
            <text x="220" y="42" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">LOCK A</text>
            <!-- Lock B -->
            <rect x="180" y="125" width="80" height="36" rx="6" fill="#d97706" stroke="#fbbf24"/>
            <text x="220" y="147" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">LOCK B</text>
            <!-- Hari 2 -->
            <circle cx="370" cy="90" r="35" fill="#7c3aed" stroke="#c084fc" stroke-width="2"/>
            <text x="370" y="94" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">HARI 2</text>

            <!-- Geziak -->
            <path d="M 115 65 L 175 42" stroke="#4ade80" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="140" y="47" fill="#4ade80" font-size="8">Eduki</text>

            <path d="M 120 110 L 175 135" stroke="#f87171" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
            <text x="135" y="138" fill="#f87171" font-size="8">Zain</text>

            <path d="M 345 65 L 265 42" stroke="#f87171" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
            <text x="315" y="47" fill="#f87171" font-size="8">Zain</text>

            <path d="M 340 110 L 265 135" stroke="#4ade80" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="310" y="138" fill="#4ade80" font-size="8">Eduki</text>
          </svg>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Deadlock Zirkularra: elkarren giltzen zain betiko</div>
        </div>

        <ul style="padding-left:18px; font-size:0.9rem; line-height:1.75;">
          <li><b>Coffman-en 4 baldintzak:</b> Elkarrekiko Bazterketa, Eutsi eta Itxaron, Kaleratzerik Ez, eta Itxaronaldi Zirkularra.</li>
          <li><b>Ebazpena (Resource Ordering):</b> Hari guztiek blokeoak beti ordena berean hartzea (<code class="inline-code">synchronized(A) { synchronized(B) }</code>).</li>
        </ul>
      </div>

      <!-- TXARTELA 5: RACE CONDITION + TIMELINE DIAGRAMA -->
      <div class="question-card">
        <span class="q-badge">5. GAIA: RACE CONDITION (LASTERKETA-BALDINTZA)</span>
        <h3 style="margin:10px 0; color:var(--accent-cyan);">Zergatik kontagailua++ ez da atomikoa?</h3>
        
        <!-- SVG DIAGRAMA 5: RACE CONDITION -->
        <div class="diagram-box">
          <svg viewBox="0 0 500 170" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="30" x2="460" y2="30" stroke="#334155" stroke-width="2"/>
            <text x="40" y="20" fill="#38bdf8" font-size="10" font-weight="bold">Hari 1: irakurri (5)</text>
            <text x="200" y="20" fill="#38bdf8" font-size="10" font-weight="bold">aldatu (6)</text>
            <text x="360" y="20" fill="#f87171" font-size="10" font-weight="bold">idatzi 6 RAMera</text>

            <line x1="40" y1="90" x2="460" y2="90" stroke="#334155" stroke-width="2"/>
            <text x="120" y="115" fill="#f59e0b" font-size="10" font-weight="bold">Hari 2: irakurri (5! oraindik)</text>
            <text x="280" y="115" fill="#f59e0b" font-size="10" font-weight="bold">aldatu (6)</text>
            <text x="400" y="115" fill="#f87171" font-size="10" font-weight="bold">idatzi 6 (1 galdu da!)</text>
          </svg>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Read-Modify-Write desfasajea: 2 gehikuntza egin arren emaitza 6 da 7ren ordez!</div>
        </div>

        <ul style="padding-left:18px; font-size:0.9rem; line-height:1.75;">
          <li><b>Eragiketa atomikoa:</b> Zati ezina den agindua. <code class="inline-code">i++</code> hiru urrats dira: Read, Modify, Write.</li>
          <li><b>Konponbideak:</b> <code class="inline-code">synchronized (lock)</code> blokea edo <code class="inline-code">AtomicInteger</code> erabili.</li>
        </ul>
      </div>

      <!-- TXARTELA 6: BILDUMAK ETA TIMER -->
      <div class="question-card">
        <span class="q-badge">6. GAIA: BILDUMAK ETA TIMER</span>
        <h3 style="margin:10px 0; color:var(--accent-cyan);">Datu Egitura Hari-Seguruak</h3>
        <ul style="padding-left:18px; font-size:0.9rem; line-height:1.75;">
          <li><b>Ez-Seguruak:</b> <code class="inline-code">ArrayList</code>, <code class="inline-code">HashMap</code> (ConcurrentModificationException sortzen dute).</li>
          <li><b>ConcurrentHashMap:</b> Lock Striping bidez blokeorik gabeko irakurketak ahalbidetzen ditu.</li>
          <li><b>CopyOnWriteArrayList:</b> Irakurketa asko eta idazketa gutxi dauden kasuetarako.</li>
          <li><b>BlockingQueue:</b> Ekoizle-kontsumitzailea kudeatzeko (<code class="inline-code">put()</code> eta <code class="inline-code">take()</code> blokeo automatikoekin).</li>
          <li><b>Timer & TimerTask:</b> <code class="inline-code">scheduleAtFixedRate(ataza, delay, period)</code>.</li>
        </ul>
      </div>

    </div>
  `;
}

// =========================================================================
// ZOOM KONTROLA (PANTALIA GUZTIETARAKO ZOOM ERABILGARRIA)
// =========================================================================
let unekoZooma = 1.0;

function setupZoomControl() {
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomResetBtn = document.getElementById('zoom-reset-btn');

  // Berreskuratu aurreko zooma gordeta badago
  try {
    const savedZoom = localStorage.getItem('zpp_zoom');
    if (savedZoom) {
      unekoZooma = parseFloat(savedZoom) || 1.0;
      aldatuZooma(0);
    }
  } catch (e) {}

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => aldatuZooma(0.1));
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => aldatuZooma(-0.1));
  }
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => aldatuZooma(0, true));
  }
}

function aldatuZooma(delta, leheneratu = false) {
  if (leheneratu) {
    unekoZooma = 1.0;
  } else {
    unekoZooma = Math.min(1.5, Math.max(0.6, Math.round((unekoZooma + delta) * 10) / 10));
  }

  try {
    localStorage.setItem('zpp_zoom', unekoZooma);
  } catch (e) {}

  // Nabigatzaile modernoetan eta Android WebView-n zoom aplikatu eta zabalera %100 mantendu hutsunerik gabe
  if ('zoom' in document.body.style) {
    document.body.style.zoom = unekoZooma;
    document.body.style.width = (100 / unekoZooma) + '%';
    document.body.style.maxWidth = 'none';
  } else {
    // Firefox fallback
    document.documentElement.style.fontSize = (unekoZooma * 16) + 'px';
  }

  const resetBtn = document.getElementById('zoom-reset-btn');
  if (resetBtn) {
    resetBtn.textContent = Math.round(unekoZooma * 100) + '%';
  }
}
