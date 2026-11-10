/**
 * ZPP 1. Ebaluaketa - Teoria Osoa eta Bideo-Animazio Interaktiboak
 * 5 Gai nagusiak: Azalpen sakonak, Diagramak, Taulak eta 5 Simulagailu Interaktibo Biziak.
 */

// =========================================================================
// TEORIA EDUKIA ETA SIMULAGAILUAK KARGATU
// =========================================================================
function kargatuTeoriaOsoa() {
  const container = document.getElementById('teoria-edukia-container');
  if (!container) return;

  container.innerHTML = `
    <!-- SUBNAV GAIAK AUKERATZEKO -->
    <div class="teoria-subnav">
      <button class="teoria-nav-btn active" onclick="aldatuTeoriaGaia(1)">1. Multiprozesua & SE</button>
      <button class="teoria-nav-btn" onclick="aldatuTeoriaGaia(2)">2. Hariak (Multithreading)</button>
      <button class="teoria-nav-btn" onclick="aldatuTeoriaGaia(3)">3. Sinkronizazioa</button>
      <button class="teoria-nav-btn" onclick="aldatuTeoriaGaia(4)">4. GUI & Swing EDT</button>
      <button class="teoria-nav-btn" onclick="aldatuTeoriaGaia(5)">5. java.util.concurrent</button>
    </div>

    <!-- =====================================================================
         1. GAIA: MULTIPROZESUA ETA SISTEMA ERAGILEAK
         ===================================================================== -->
    <div id="teoria-gaia-1" class="teoria-gaia-blokea active">
      <div class="teoria-header-card">
        <span class="q-badge">1. GAIA · MULTIPROZESUA</span>
        <h2>Multiprozesua eta Sistema Eragileak (SE)</h2>
        <p>Prozesuen kudeaketa, 7 egoeren zikloa, CPU planifikazio algoritmoak eta Java ProcessBuilder APIa.</p>
      </div>

      <!-- 1.1 Prozesuaren kontzeptua eta egitura -->
      <div class="question-card">
        <h3 class="teoria-title">1.1 Zer da Prozesu bat eta nola egituratzen da?</h3>
        <p class="teoria-p">
          <strong>Prozesua</strong> exekuzioan dagoen programa bat da. Ez da diskoan dagoen fitxategi pasibo bat (kode konpilatua), baizik eta Sistema Eragileak memorian (RAM) kargatuta duen entitate dinamiko eta aktibo bat.
        </p>
        <div class="teoria-grid-2">
          <div class="teoria-box">
            <h4 style="color:var(--accent-blue); margin-bottom:8px;">📁 Helbide-Espazioa (Address Space)</h4>
            <ul class="teoria-ul">
              <li><strong>Kodearen zatia (Text):</strong> Prozesuak exekutatzen dituen makina-aginduak. Irakurtzeko soilik da.</li>
              <li><strong>Datuen zatia (Data):</strong> Aldagai globalak eta estatikoak (hasieratuak eta hasieratu gabeak).</li>
              <li><strong>Kiloa (Heap):</strong> Memoria dinamikoa (Javan <code>new</code> bidez sortzen diren objektuak).</li>
              <li><strong>Pila (Stack):</strong> Funtzioen dei-erregistroak, tokiko aldagaiak eta itzulera-helbideak.</li>
            </ul>
          </div>
          <div class="teoria-box">
            <h4 style="color:var(--accent-cyan); margin-bottom:8px;">📋 PCB (Process Control Block)</h4>
            <p style="font-size:0.88rem; margin-bottom:6px;">Sistema Eragileak prozesu bakoitzeko mantentzen duen fitxa teknikoa da:</p>
            <ul class="teoria-ul">
              <li><strong>PID (Process Identifier):</strong> Zenbaki bakarra sisteman.</li>
              <li><strong>Prozesuaren Egoera:</strong> Prest, Exekuzioan, Blokeatua...</li>
              <li><strong>Program Counter (PC):</strong> Hurrengo aginduaren helbidea.</li>
              <li><strong>CPU Erregistroak:</strong> Testuinguru-aldaketan gordetzen diren balioak.</li>
              <li><strong>Memoria eta Fitxategien kudeaketa:</strong> Irekitako deskriptoreak.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 1.2 SIMULAGAILU INTERAKTIBOA: 7 EGOERAK -->
      <div class="question-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="q-badge" style="background:var(--accent-orange);">🎬 ANIMAZIO & SIMULAGAILU INTERAKTIBOA</span>
            <h3 class="teoria-title" style="margin-top:6px;">Prozesuen 7 Egoeren Zikloa Denbora Errealean</h3>
          </div>
          <div class="sim-controls">
            <button class="btn-primary" id="sim1-btn-toggle" onclick="sim1TogglePlay()">▶️ Hasi Animazioa</button>
            <button class="btn-secondary" onclick="sim1Step()">⏭️ Pauso Bat</button>
            <button class="btn-secondary" onclick="sim1Reset()">🔄 Berrezarri</button>
          </div>
        </div>

        <p class="teoria-p" style="margin-bottom:14px;">
          Sakatu <strong>▶️ Hasi Animazioa</strong> edo erabili beheko ekintza-botoiak prozesua (PID: 4082) egoera batetik bestera eskuz mugitzeko:
        </p>

        <!-- Simulagailuaren eremua -->
        <div class="sim-screen" id="sim1-stage">
          <div class="sim-states-grid">
            <div class="sim-node" id="sim1-node-BERRIA">
              <span class="sim-node-title">BERRIA</span>
              <span class="sim-node-sub">Sortu berria (PCB)</span>
            </div>
            <div class="sim-node" id="sim1-node-PREST">
              <span class="sim-node-title">PREST</span>
              <span class="sim-node-sub">RAMean, CPU zain</span>
            </div>
            <div class="sim-node" id="sim1-node-EXE">
              <span class="sim-node-title">EXEKUZIOAN</span>
              <span class="sim-node-sub">CPUa erabiltzen</span>
            </div>
            <div class="sim-node" id="sim1-node-BLOK">
              <span class="sim-node-title">BLOKEATUA</span>
              <span class="sim-node-sub">I/O edo gertaera zain</span>
            </div>
            <div class="sim-node" id="sim1-node-AMAITUA">
              <span class="sim-node-title">AMAITUA</span>
              <span class="sim-node-sub">Lana bukatuta</span>
            </div>
            <div class="sim-node" id="sim1-node-ESEKIPREST">
              <span class="sim-node-title">ESEKIA-PREST</span>
              <span class="sim-node-sub">Swap diskoan, prest</span>
            </div>
            <div class="sim-node" id="sim1-node-ESEKIAPRE">
              <span class="sim-node-title">ESEKIA-BLOKEATUA</span>
              <span class="sim-node-sub">Swap diskoan, I/O zain</span>
            </div>
          </div>

          <!-- Token animatua -->
          <div id="sim1-token" class="sim-token">PID: 4082</div>
        </div>

        <!-- Ekintza botoi interaktiboak -->
        <div class="sim-actions-bar">
          <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Eskuzko Trantsizioak:</span>
          <button class="btn-sim-action" onclick="sim1Mugitu('BERRIA')">1. Sortu</button>
          <button class="btn-sim-action" onclick="sim1Mugitu('PREST')">2. Onartu RAMera</button>
          <button class="btn-sim-action" onclick="sim1Mugitu('EXE')">3. CPUra (Dispatcher)</button>
          <button class="btn-sim-action" onclick="sim1Mugitu('BLOK')">4. I/O Blokeatu</button>
          <button class="btn-sim-action" onclick="sim1Mugitu('ESEKIPREST')">5. Swap-era Eseki</button>
          <button class="btn-sim-action" onclick="sim1Mugitu('AMAITUA')">6. Amaitu</button>
        </div>

        <div id="sim1-log" class="sim-log-box">
          ℹ️ Prozesua hasierako egoeran dago. Sakatu botoietan egoeraren trantsizioak ikusteko.
        </div>
      </div>

      <!-- 1.3 CPU Planifikazio Algoritmoen Taula Konparatiboa -->
      <div class="question-card">
        <h3 class="teoria-title">1.3 CPU Planifikazio Algoritmoen Konparaketa Sakona</h3>
        <p class="teoria-p">
          Planifikatzaileak (Scheduler) erabakitzen du PREST egoeran dauden prozesuen artean zeini emango dion CPUa:
        </p>
        <div class="table-responsive">
          <table class="teoria-table">
            <thead>
              <tr>
                <th>Algoritmoa</th>
                <th>Mota (Kengarria?)</th>
                <th>Nola Funtzionatzen du?</th>
                <th>Abantailak</th>
                <th>Desabantailak & Arriskuak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>FCFS</strong><br><small>(First-Come, First-Served)</small></td>
                <td><span class="badge-red">Ez-Kengarria</span> (Non-preemptive)</td>
                <td>Lehenengo iristen dena da lehenengo exekutatzen dena (FIFO ilara).</td>
                <td>Oso sinplea inplementatzeko; ez du bidegabekeriarik sortzen.</td>
                <td><strong>Konboi Efektua:</strong> Prozesu luze batek atzeko labur guztiak moteldu ditzake.</td>
              </tr>
              <tr>
                <td><strong>SJF</strong><br><small>(Shortest Job First)</small></td>
                <td><span class="badge-red">Ez-Kengarria</span> (Non-preemptive)</td>
                <td>CPU bolada (burst) laburrena duen prozesuari ematen dio lehentasuna.</td>
                <td>Batez besteko itxaron-denbora minimoa eskaintzen du (optimoa).</td>
                <td>Aurretik CPU denbora zehatza jakitea ezinezkoa da; <strong>Starvation</strong> prozesu luzeetan.</td>
              </tr>
              <tr>
                <td><strong>SRTF</strong><br><small>(Shortest Remaining Time First)</small></td>
                <td><span class="badge-green">Kengarria</span> (Preemptive)</td>
                <td>CPU denbora gutxien geratzen zaionari ematen zaio. Laburrago bat iristen bada, unekoa kanporatzen da.</td>
                <td>Erantzun denbora oso azkarra prozesu berri eta txikientzat.</td>
                <td>Testuinguru-aldaketa asko (gainkarga / overhead handia).</td>
              </tr>
              <tr>
                <td><strong>Round Robin (RR)</strong></td>
                <td><span class="badge-green">Kengarria</span> (Preemptive)</td>
                <td>Prozesu bakoitzari denbora-kuanta bat (Quantum q) esleitzen zaio txandaka.</td>
                <td>Interaktibitate bikaina; sistema partekatuetan estandarra.</td>
                <td>Quanta oso txikia bada: overhead erraldoia; quanta oso handia bada: FCFS bihurtzen da.</td>
              </tr>
              <tr>
                <td><strong>Lehentasunen araberakoa</strong></td>
                <td>Biak (Kengarria / Ez-kengarria)</td>
                <td>Prozesu bakoitzak zenbaki bat du; lehentasun handiena duenak hartzen du CPUa.</td>
                <td>Kritikoak diren atazak (adib. SEaren kernelak) lehenetsi daitezke.</td>
                <td><strong>Starvation (Gosea):</strong> Lehentasun baxukoak inoiz ez exekutatzea. Konponbidea: <em>Aging</em> (zahartzea).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 1.4 Java ProcessBuilder eta Process API -->
      <div class="question-card">
        <h3 class="teoria-title">1.4 Java ProcessBuilder eta Process Kudeaketa</h3>
        <p class="teoria-p">
          Javan kanpoko sistema eragileko prozesuak abiarazteko <code>ProcessBuilder</code> klasea erabiltzen da:
        </p>
        <div class="code-container">
          <code>${highlightJava(`// 1. ProcessBuilder instantziatu komandoarekin eta parametroekin
ProcessBuilder pb = new ProcessBuilder("ping", "-n", "4", "google.com");

// 2. Prozesua abiarazi SEaren kernelean
Process p = pb.start();

// 3. Java 9+ PID eskuratu
long pid = p.pid();
System.out.println("Prozesuaren PIDa: " + pid);

// 4. Prozesua amaitu arte itxaron eta exit code-a eskuratu
int exitCode = p.waitFor();
System.out.println("Irteera-kodea: " + exitCode); // 0 = ZUZENA, != 0 AKATSA

// 5. Behartutako itxiera beharrezkoa bada
if (p.isAlive()) {
    p.destroy(); // SIGTERM (itxiera arrunta)
    p.destroyForcibly(); // SIGKILL (berehalako hilketa)
}`)}</code>
        </div>
      </div>
    </div>

    <!-- =====================================================================
         2. GAIA: HARIAK (MULTITHREADING) ETA JAVA THREAD
         ===================================================================== -->
    <div id="teoria-gaia-2" class="teoria-gaia-blokea">
      <div class="teoria-header-card">
        <span class="q-badge">2. GAIA · MULTITHREADING</span>
        <h2>Hariak (Threads) eta Konkurrentziaren Oinarriak</h2>
        <p>Prozesua vs Haria, Thread vs Runnable, Bizi-zikloa eta Kontrol Metodoak.</p>
      </div>

      <!-- 2.1 Prozesua vs Haria -->
      <div class="question-card">
        <h3 class="teoria-title">2.1 Prozesua vs Haria (Thread): Desberdintasun Nagusiak</h3>
        <div class="table-responsive">
          <table class="teoria-table">
            <thead>
              <tr>
                <th>Ezaugarria</th>
                <th>Prozesua (Process)</th>
                <th>Haria (Thread / Hari Arina)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Memoria</strong></td>
                <td>Helbide-espazio guztiz isolatua (ezin dute elkarren RAMa irakurri zuzenean).</td>
                <td>Memoria partekatua (Heap bera, aldagai berak ikusten dituzte).</td>
              </tr>
              <tr>
                <td><strong>Sorreraren Kostua</strong></td>
                <td>Astuna: SEak memoria, orriak eta PCB berria sortu behar ditu.</td>
                <td>Arina: Stack eta PC propioa bakarrik behar du.</td>
              </tr>
              <tr>
                <td><strong>Komunikazioa</strong></td>
                <td>IPC konplexua behar da (Sockets, Pipes, Shared Memory).</td>
                <td>Oso erraza (aldagai komunak), baina <strong>sinkronizazioa beharrezkoa da</strong>.</td>
              </tr>
              <tr>
                <td><strong>Erorketa (Crash)</strong></td>
                <td>Prozesu bat erortzen bada, besteek lanean jarraitzen dute isolatuta.</td>
                <td>Hari batek salbuespen kudeatu gabea badu, prozesu osoa eror daiteke.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2.2 Thread vs Runnable -->
      <div class="question-card">
        <h3 class="teoria-title">2.2 Hariak Sortzeko Moduak: Thread klasea vs Runnable interfazea</h3>
        <div class="teoria-grid-2">
          <div class="teoria-box">
            <h4 style="color:var(--accent-cyan); margin-bottom:8px;">1. Modua: Thread Klasea Hedatu</h4>
            <div class="code-container" style="font-size:0.8rem; padding:10px;">
              <code>${highlightJava(`class NireHaria extends Thread {
    @Override
    public void run() {
        System.out.println("Haria martxan!");
    }
}
// Abiarazi:
new NireHaria().start();`)}</code>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:8px;">
              ⚠️ Desabantaila: Javan herentzia anitzik ez dagoenez, klase honek ezin du beste ezer hedatu.
            </p>
          </div>
          <div class="teoria-box">
            <h4 style="color:var(--accent-green); margin-bottom:8px;">2. Modua: Runnable Inplementatu (GOMENDATUA)</h4>
            <div class="code-container" style="font-size:0.8rem; padding:10px;">
              <code>${highlightJava(`class NireAtaza implements Runnable {
    @Override
    public void run() {
        System.out.println("Ataza martxan!");
    }
}
// Abiarazi:
Thread t = new Thread(new NireAtaza());
t.start();`)}</code>
            </div>
            <p style="font-size:0.85rem; color:var(--accent-green); margin-top:8px;">
              ✅ Abantaila: Lana (Runnable) eta Exekutorea (Thread) banatzen ditu. Beste klase bat hedatu daiteke.
            </p>
          </div>
        </div>
      </div>

      <!-- 2.3 SIMULAGAILU INTERAKTIBOA: HARIAREN BIZI-ZIKLOA -->
      <div class="question-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="q-badge" style="background:var(--accent-orange);">🎬 ANIMAZIO & SIMULAGAILU INTERAKTIBOA</span>
            <h3 class="teoria-title" style="margin-top:6px;">Hariaren Bizi-Zikloa eta 3 Hari Paralelo</h3>
          </div>
          <div class="sim-controls">
            <button class="btn-primary" onclick="sim2HasiParaleloa()">▶️ Abiarazi 3 Hariak</button>
            <button class="btn-secondary" onclick="sim2Berrezarri()">🔄 Berrezarri</button>
          </div>
        </div>

        <p class="teoria-p" style="margin-bottom:14px;">
          Ikusi nola sortzen diren (<code>NEW</code>), nola hasten diren aldi berean (<code>RUNNABLE</code>), lo egiten duten (<code>TIMED_WAITING</code>) eta nola amaitzen diren (<code>TERMINATED</code>):
        </p>

        <div class="sim-screen" style="padding:16px;">
          <div style="display:flex; flex-direction:column; gap:12px;">
            <!-- Thread 1 -->
            <div class="thread-track-row">
              <span class="thread-tag" style="background:#38bdf8;">Hari-1 (Kalkulua)</span>
              <div class="thread-track-bar">
                <div id="sim2-bar-1" class="thread-progress-fill" style="background:#38bdf8; width:0%;"></div>
              </div>
              <span id="sim2-status-1" class="thread-status-badge">NEW</span>
            </div>
            <!-- Thread 2 -->
            <div class="thread-track-row">
              <span class="thread-tag" style="background:#a855f7;">Hari-2 (I/O Lortu)</span>
              <div class="thread-track-bar">
                <div id="sim2-bar-2" class="thread-progress-fill" style="background:#a855f7; width:0%;"></div>
              </div>
              <span id="sim2-status-2" class="thread-status-badge">NEW</span>
            </div>
            <!-- Thread 3 -->
            <div class="thread-track-row">
              <span class="thread-tag" style="background:#22c55e;">Hari-3 (Erregistroa)</span>
              <div class="thread-track-bar">
                <div id="sim2-bar-3" class="thread-progress-fill" style="background:#22c55e; width:0%;"></div>
              </div>
              <span id="sim2-status-3" class="thread-status-badge">NEW</span>
            </div>
          </div>
        </div>
        <div id="sim2-log" class="sim-log-box" style="margin-top:12px;">
          ℹ️ Egin klik 'Abiarazi 3 Hariak' botoian hariek aldi berean nola aurrera egiten duten ikusteko.
        </div>
      </div>
    </div>

    <!-- =====================================================================
         3. GAIA: SINKRONIZAZIOA ETA ARAZO KLASIKOAK
         ===================================================================== -->
    <div id="teoria-gaia-3" class="teoria-gaia-blokea">
      <div class="teoria-header-card">
        <span class="q-badge">3. GAIA · SINKRONIZAZIOA</span>
        <h2>Sinkronizazioa eta Konkurrentziaren Arazo Klasikoak</h2>
        <p>Eskualde kritikoa, volatile, synchronized blokeak, Deadlock, Starvation eta Livelock.</p>
      </div>

      <!-- 3.1 Race Condition eta Synchronized Simulagailua -->
      <div class="question-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="q-badge" style="background:var(--accent-orange);">🎬 ANIMAZIO & SIMULAGAILU INTERAKTIBOA</span>
            <h3 class="teoria-title" style="margin-top:6px;">Race Condition vs Synchronized Babesa</h3>
          </div>
          <div class="sim-controls">
            <button class="btn-danger" onclick="sim3Exekutatu(false)">❌ Babesik Gabe (Race Condition)</button>
            <button class="btn-success" onclick="sim3Exekutatu(true)">🔒 Synchronized-ekin (Babestua)</button>
            <button class="btn-secondary" onclick="sim3Berrezarri()">🔄</button>
          </div>
        </div>

        <p class="teoria-p">
          Bi harik (A eta B) kontagailu bera 100era arte handituko dute (+50 bakoitzak). Sinkronizatu gabe, balioak galdu egiten dira biak batera idazteagatik!
        </p>

        <div class="sim-screen" style="text-align:center; padding:24px;">
          <div style="display:flex; justify-content:center; align-items:center; gap:30px; flex-wrap:wrap;">
            <div class="counter-box">
              <span style="font-size:0.85rem; color:var(--text-muted); display:block;">HELBURUA</span>
              <span style="font-size:2.2rem; font-weight:800; color:#38bdf8;">100</span>
            </div>
            <div class="counter-box" style="border-color:var(--accent-yellow);">
              <span style="font-size:0.85rem; color:var(--text-muted); display:block;">UNEKO BALIOA</span>
              <span id="sim3-counter-val" style="font-size:2.5rem; font-weight:800; color:var(--accent-yellow);">0</span>
            </div>
            <div class="counter-box">
              <span style="font-size:0.85rem; color:var(--text-muted); display:block;">GILTZAREN EGOERA</span>
              <span id="sim3-lock-status" style="font-size:1.8rem;">🔓 Irekita</span>
            </div>
          </div>
        </div>
        <div id="sim3-log" class="sim-log-box" style="margin-top:12px;">
          ℹ️ Aukeratu nola exekutatu diferentzia begi-bistaz ikusteko.
        </div>
      </div>

      <!-- 3.2 Deadlock Simulagailua -->
      <div class="question-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="q-badge" style="background:var(--accent-orange);">🎬 ANIMAZIO & SIMULAGAILU INTERAKTIBOA</span>
            <h3 class="teoria-title" style="margin-top:6px;">Deadlock (Blokeo Elkarrekikoa) eta Coffman-en Zirkulua</h3>
          </div>
          <div class="sim-controls">
            <button class="btn-danger" onclick="sim4ProbatuDeadlock(true)">⚠️ Simulatu Deadlock-a</button>
            <button class="btn-success" onclick="sim4ProbatuDeadlock(false)">🛡️ Konpondu (Ordena Hierarkikoa)</button>
            <button class="btn-secondary" onclick="sim4Berrezarri()">🔄</button>
          </div>
        </div>

        <p class="teoria-p">
          Hari-1ek Giltza-A hartu du eta Giltza-B behar du. Hari-2k Giltza-B hartu du eta Giltza-A behar du. Biak betiko blokeatzen dira!
        </p>

        <div class="sim-screen" style="padding:20px; display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:16px;">
          <div class="deadlock-box" id="dl-thread-1">
            <div style="font-weight:700; color:#38bdf8;">HARI 1</div>
            <div id="dl-t1-holds" style="font-size:0.85rem; margin-top:4px;">Dauka: -</div>
            <div id="dl-t1-waits" style="font-size:0.85rem; color:var(--accent-orange);">Zain: -</div>
          </div>

          <div style="font-size:2rem; font-weight:800;" id="dl-center-icon">🔄</div>

          <div class="deadlock-box" id="dl-thread-2">
            <div style="font-weight:700; color:#a855f7;">HARI 2</div>
            <div id="dl-t2-holds" style="font-size:0.85rem; margin-top:4px;">Dauka: -</div>
            <div id="dl-t2-waits" style="font-size:0.85rem; color:var(--accent-orange);">Zain: -</div>
          </div>
        </div>
        <div id="sim4-log" class="sim-log-box" style="margin-top:12px;">
          ℹ️ Sakatu 'Simulatu Deadlock-a' blokeo zirkularra ikusteko, edo 'Konpondu' ordena hierarkikoarekin nola saihesten den ikusteko.
        </div>
      </div>
    </div>

    <!-- =====================================================================
         4. GAIA: GUI ETA GRAFIKOAK HARI ANITZEKIN (SWING ETA EDT)
         ===================================================================== -->
    <div id="teoria-gaia-4" class="teoria-gaia-blokea">
      <div class="teoria-header-card">
        <span class="q-badge">4. GAIA · SWING & EDT</span>
        <h2>GUI Grafikoak eta Hari Bakarreko Araua (EDT)</h2>
        <p>Event Dispatch Thread, SwingUtilities.invokeLater eta SwingWorker arkitektura.</p>
      </div>

      <div class="question-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="q-badge" style="background:var(--accent-orange);">🎬 ANIMAZIO & SIMULAGAILU INTERAKTIBOA</span>
            <h3 class="teoria-title" style="margin-top:6px;">EDT Izoztua vs SwingWorker Fluidoa</h3>
          </div>
          <div class="sim-controls">
            <button class="btn-danger" onclick="sim5ProbatuEDT(false)">❄️ Kalkulatu EDT-n (Izoztu UI)</button>
            <button class="btn-success" onclick="sim5ProbatuEDT(true)">🚀 SwingWorker-ekin (Atzean)</button>
          </div>
        </div>

        <p class="teoria-p">
          Probatu beheko "Egin Klik Mezu Bat Ikusteko" botoia kalkulua egiten ari den bitartean. Ikusi nola EDT-n exekutatzean botoiak ez duen erantzuten!
        </p>

        <div class="sim-screen" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; margin-bottom:16px;">
            <div>
              <span style="font-weight:700; color:#fff;">UI Proba Botoia (Egin klik azkar!):</span>
              <button class="btn-secondary" id="sim5-test-btn" onclick="sim5ClickTest()" style="margin-left:10px;">
                🖱️ Klikatu niri! (<span id="sim5-click-count">0</span>)
              </button>
            </div>
            <div id="sim5-spinner" class="sim-spinner-box">
              <span class="sim-spinner">⏳</span>
              <span id="sim5-ui-status" style="font-weight:700; color:var(--accent-green);">UI Bizkorra (60 FPS)</span>
            </div>
          </div>

          <div style="margin-bottom:8px; font-size:0.85rem; color:var(--text-muted);">Kalkulu Luzearen Aurrerapena:</div>
          <div class="thread-track-bar" style="height:14px;">
            <div id="sim5-progress-bar" class="thread-progress-fill" style="background:linear-gradient(90deg, #38bdf8, #22c55e); width:0%;"></div>
          </div>
        </div>
        <div id="sim5-log" class="sim-log-box" style="margin-top:12px;">
          ℹ️ EDT-n lan luzeak egiteak interfazea erabat blokeatzen du. SwingWorker-ek atzeko harian kalkulatzen du UI aske utziz!
        </div>
      </div>
    </div>

    <!-- =====================================================================
         5. GAIA: JAVA.UTIL.CONCURRENT ETA TRESNA AURRERATUAK
         ===================================================================== -->
    <div id="teoria-gaia-5" class="teoria-gaia-blokea">
      <div class="teoria-header-card">
        <span class="q-badge">5. GAIA · JAVA.UTIL.CONCURRENT</span>
        <h2>Tresna Aurreratuak eta Sinkronizatzaileak</h2>
        <p>ReentrantLock, Semaphore, CountDownLatch, CyclicBarrier, ExecutorService eta Future.</p>
      </div>

      <!-- 5.1 Konparaketa Orokorraren Taula -->
      <div class="question-card">
        <h3 class="teoria-title">5.1 Tresna Aurreratuen Fitxa Teknikoa eta Konparaketa</h3>
        <div class="table-responsive">
          <table class="teoria-table">
            <thead>
              <tr>
                <th>Klasea / Interfazea</th>
                <th>Xede Nagusia</th>
                <th>Metodo Gakoak</th>
                <th>Berrerabilgarria?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ReentrantLock</strong></td>
                <td><code>synchronized</code> ordezkatu gaitasun aurreratuekin (timeout, fairness).</td>
                <td><code>lock()</code>, <code>tryLock()</code>, <code>unlock()</code></td>
                <td>Bai</td>
              </tr>
              <tr>
                <td><strong>AtomicInteger</strong></td>
                <td>Blokeorik gabeko aldaketa atomikoak (hardware CAS bidez).</td>
                <td><code>incrementAndGet()</code>, <code>compareAndSet()</code></td>
                <td>Bai</td>
              </tr>
              <tr>
                <td><strong>Semaphore</strong></td>
                <td>Baimen kopuru mugatu bat partekatzeko (adib. konexio igerilekuak).</td>
                <td><code>acquire()</code>, <code>release()</code></td>
                <td>Bai</td>
              </tr>
              <tr>
                <td><strong>CountDownLatch</strong></td>
                <td>Hari batek N gertaera amaitu arte itxaron dezan (atzera-zenbaketa).</td>
                <td><code>countDown()</code>, <code>await()</code></td>
                <td><span class="badge-red">EZ (Behin bakarrik)</span></td>
              </tr>
              <tr>
                <td><strong>CyclicBarrier</strong></td>
                <td>N harik puntu komun batera iritsi eta elkarri itxaron diezaioten.</td>
                <td><code>await()</code></td>
                <td><span class="badge-green">BAI (Ziklikoa da)</span></td>
              </tr>
              <tr>
                <td><strong>ExecutorService</strong></td>
                <td>Hari-igerilekuak kudeatu eta atazak asinkronoki bidali.</td>
                <td><code>submit()</code>, <code>shutdown()</code>, <code>invokeAll()</code></td>
                <td>Bai</td>
              </tr>
              <tr>
                <td><strong>Future&lt;T&gt;</strong></td>
                <td>Asinkronoki kalkulatzen ari den ataza baten etorkizuneko emaitza.</td>
                <td><code>get()</code>, <code>isDone()</code>, <code>cancel()</code></td>
                <td>Emaitza 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Simulagailuak hasieratu
  sim1Reset();
  sim3Berrezarri();
  sim4Berrezarri();
}

// Gaien fitxak aldatu
function aldatuTeoriaGaia(gaiZenb) {
  document.querySelectorAll('.teoria-nav-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === (gaiZenb - 1));
  });

  document.querySelectorAll('.teoria-gaia-blokea').forEach((bloke, idx) => {
    bloke.classList.toggle('active', idx === (gaiZenb - 1));
  });

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

// =========================================================================
// SIMULAGAILUA 1: 7 EGOERAK
// =========================================================================
let sim1Interval = null;
let sim1State = 'BERRIA';
const sim1Sequence = ['BERRIA', 'PREST', 'EXE', 'BLOK', 'ESEKIPREST', 'PREST', 'EXE', 'AMAITUA'];
let sim1SeqIndex = 0;

function sim1Mugitu(egoera) {
  sim1State = egoera;
  const token = document.getElementById('sim1-token');
  const targetNode = document.getElementById(`sim1-node-${egoera}`);
  const log = document.getElementById('sim1-log');

  document.querySelectorAll('.sim-node').forEach(n => n.classList.remove('active'));

  if (targetNode && token) {
    targetNode.classList.add('active');
    const stageRect = document.getElementById('sim1-stage').getBoundingClientRect();
    const nodeRect = targetNode.getBoundingClientRect();

    const leftPos = (nodeRect.left - stageRect.left) + (nodeRect.width / 2) - 40;
    const topPos = (nodeRect.top - stageRect.top) + (nodeRect.height / 2) - 16;

    token.style.left = `${Math.max(10, leftPos)}px`;
    token.style.top = `${Math.max(10, topPos)}px`;
  }

  const mezuak = {
    'BERRIA': '🌱 BERRIA: Prozesua sortu da; SEak PCB eta memoria esleitu behar dizkio.',
    'PREST': '⏳ PREST: RAM memorian dago kargatuta, CPU planifikatzailearen txandaren zain.',
    'EXE': '⚡ EXEKUZIOAN: CPUa erabiltzen ari da aginduak prozesatzeko.',
    'BLOK': '🛑 BLOKEATUA: I/O eragiketa baten zain (adib. diskoa edo sarea irakurtzen).',
    'AMAITUA': '🏁 AMAITUA: Exekuzioa bukatu da; SEak baliabideak askatuko ditu.',
    'ESEKIPREST': '💾 ESEKIA-PREST: RAM faltagatik Swap diskoan gorde da; prest dago berriro kargatzeko.',
    'ESEKIAPRE': '💤 ESEKIA-BLOKEATUA: Swap diskoan dago eta I/O gertaera baten zain dago aldi berean.'
  };

  if (log) log.innerHTML = mezuak[egoera] || egoera;
}

function sim1Step() {
  sim1SeqIndex = (sim1SeqIndex + 1) % sim1Sequence.length;
  sim1Mugitu(sim1Sequence[sim1SeqIndex]);
}

function sim1TogglePlay() {
  const btn = document.getElementById('sim1-btn-toggle');
  if (sim1Interval) {
    clearInterval(sim1Interval);
    sim1Interval = null;
    if (btn) btn.textContent = '▶️ Hasi Animazioa';
  } else {
    if (btn) btn.textContent = '⏸️ Pausatu';
    sim1Interval = setInterval(() => {
      sim1Step();
    }, 1500);
  }
}

function sim1Reset() {
  if (sim1Interval) {
    clearInterval(sim1Interval);
    sim1Interval = null;
  }
  const btn = document.getElementById('sim1-btn-toggle');
  if (btn) btn.textContent = '▶️ Hasi Animazioa';
  sim1SeqIndex = 0;
  setTimeout(() => sim1Mugitu('BERRIA'), 50);
}

// =========================================================================
// SIMULAGAILUA 2: 3 HARI PARALELO
// =========================================================================
let sim2Running = false;

function sim2HasiParaleloa() {
  if (sim2Running) return;
  sim2Running = true;

  const bar1 = document.getElementById('sim2-bar-1');
  const bar2 = document.getElementById('sim2-bar-2');
  const bar3 = document.getElementById('sim2-bar-3');
  const s1 = document.getElementById('sim2-status-1');
  const s2 = document.getElementById('sim2-status-2');
  const s3 = document.getElementById('sim2-status-3');
  const log = document.getElementById('sim2-log');

  [s1, s2, s3].forEach(s => { s.textContent = 'RUNNABLE'; s.style.color = '#38bdf8'; });
  if (log) log.innerHTML = '⚡ 3 hariak aldi berean hasi dira (RUNNABLE) paraleloki kalkulatzen!';

  let p1 = 0, p2 = 0, p3 = 0;
  const interval = setInterval(() => {
    p1 = Math.min(100, p1 + Math.random() * 8 + 4);
    p2 = Math.min(100, p2 + Math.random() * 6 + 2);
    p3 = Math.min(100, p3 + Math.random() * 10 + 5);

    if (bar1) bar1.style.width = p1 + '%';
    if (bar2) bar2.style.width = p2 + '%';
    if (bar3) bar3.style.width = p3 + '%';

    if (p2 > 40 && p2 < 70) {
      s2.textContent = 'SLEEP (100ms)';
      s2.style.color = '#eab308';
    } else if (p2 >= 70 && p2 < 100) {
      s2.textContent = 'RUNNABLE';
      s2.style.color = '#38bdf8';
    }

    if (p1 >= 100) { s1.textContent = 'TERMINATED'; s1.style.color = '#22c55e'; }
    if (p2 >= 100) { s2.textContent = 'TERMINATED'; s2.style.color = '#22c55e'; }
    if (p3 >= 100) { s3.textContent = 'TERMINATED'; s3.style.color = '#22c55e'; }

    if (p1 >= 100 && p2 >= 100 && p3 >= 100) {
      clearInterval(interval);
      sim2Running = false;
      if (log) log.innerHTML = '🏁 Hari guztiak arrakastaz amaitu dira (TERMINATED). join() deiak aurrera jarrai dezake!';
    }
  }, 100);
}

function sim2Berrezarri() {
  sim2Running = false;
  ['1', '2', '3'].forEach(id => {
    const bar = document.getElementById(`sim2-bar-${id}`);
    const s = document.getElementById(`sim2-status-${id}`);
    if (bar) bar.style.width = '0%';
    if (s) { s.textContent = 'NEW'; s.style.color = 'var(--text-muted)'; }
  });
  const log = document.getElementById('sim2-log');
  if (log) log.innerHTML = 'ℹ️ Egin klik "Abiarazi 3 Hariak" botoian.';
}

// =========================================================================
// SIMULAGAILUA 3: RACE CONDITION VS SYNCHRONIZED
// =========================================================================
let sim3Running = false;

function sim3Exekutatu(synchronizedEzagutu) {
  if (sim3Running) return;
  sim3Running = true;

  const valEl = document.getElementById('sim3-counter-val');
  const lockEl = document.getElementById('sim3-lock-status');
  const log = document.getElementById('sim3-log');

  let balioa = 0;
  if (valEl) valEl.textContent = '0';

  if (synchronizedEzagutu) {
    if (lockEl) lockEl.innerHTML = '🔒 Giltzatuta (Synchronized)';
    if (log) log.innerHTML = '🛡️ SYNCHRONIZED: Hari bakoitzak giltza eskuratu behar du idatzi aurretik. Ezin da talkarik egon.';
  } else {
    if (lockEl) lockEl.innerHTML = '🔓 Babesik Gabe (Talka!)';
    if (log) log.innerHTML = '⚠️ BABESIK GABE: Bi hariek balio zaharra gainidazten dute aldi berean (Race condition). Balioak galduko dira!';
  }

  let i = 0;
  const interval = setInterval(() => {
    i++;
    if (synchronizedEzagutu) {
      balioa += 2;
    } else {
      // Talka simulatu
      if (Math.random() > 0.4) {
        balioa += 1; // Galdu da bat
      } else {
        balioa += 2;
      }
    }

    if (valEl) valEl.textContent = balioa;

    if (i >= 50) {
      clearInterval(interval);
      sim3Running = false;
      if (synchronizedEzagutu) {
        if (lockEl) lockEl.innerHTML = '🔓 Askatuta (Zuzena)';
        if (log) log.innerHTML = `✅ EMAITZA BIKAIN: Kontagailua ${balioa}/100 da! Datuen osotasuna %100 bermatu da.`;
      } else {
        if (log) log.innerHTML = `❌ LASTERKETA-BALDINTZA: Kontagailua ${balioa}/100ean geratu da! ${100 - balioa} eguneraketa galdu dira!`;
      }
    }
  }, 40);
}

function sim3Berrezarri() {
  sim3Running = false;
  const valEl = document.getElementById('sim3-counter-val');
  const lockEl = document.getElementById('sim3-lock-status');
  const log = document.getElementById('sim3-log');
  if (valEl) valEl.textContent = '0';
  if (lockEl) lockEl.innerHTML = '🔓 Irekita';
  if (log) log.innerHTML = 'ℹ️ Aukeratu nola exekutatu diferentzia begi-bistaz ikusteko.';
}

// =========================================================================
// SIMULAGAILUA 4: DEADLOCK ETA COFFMAN BALDINTZAK
// =========================================================================
function sim4ProbatuDeadlock(gertatu) {
  const t1 = document.getElementById('dl-thread-1');
  const t2 = document.getElementById('dl-thread-2');
  const t1Holds = document.getElementById('dl-t1-holds');
  const t1Waits = document.getElementById('dl-t1-waits');
  const t2Holds = document.getElementById('dl-t2-holds');
  const t2Waits = document.getElementById('dl-t2-waits');
  const center = document.getElementById('dl-center-icon');
  const log = document.getElementById('sim4-log');

  sim4Berrezarri();

  if (gertatu) {
    // Deadlock kasua
    setTimeout(() => {
      t1Holds.textContent = 'Dauka: 🗝️ Giltza A';
      t1Holds.style.color = '#22c55e';
      t2Holds.textContent = 'Dauka: 🗝️ Giltza B';
      t2Holds.style.color = '#22c55e';
    }, 400);

    setTimeout(() => {
      t1Waits.textContent = 'Zain: 🔒 Giltza B (Hari 2-k dauka)';
      t2Waits.textContent = 'Zain: 🔒 Giltza A (Hari 1-ek dauka)';
      t1.classList.add('deadlocked');
      t2.classList.add('deadlocked');
      center.textContent = '💥 BLOKEOA!';
      center.style.color = 'var(--accent-red)';
      if (log) log.innerHTML = '💥 DEADLOCK (Coffman-en 4. baldintza: Itxaronaldi Zirkularra): Hari batek ere ezin du aurrera egin!';
    }, 1200);
  } else {
    // Konpondutako kasua (Hierarkia)
    if (log) log.innerHTML = '🛡️ HIERARKIA BIDEZKO ORDENEAN: Biek lehenik Giltza A eskatzen dute, eta gero Giltza B.';
    setTimeout(() => {
      t1Holds.textContent = 'Dauka: 🗝️ Giltza A';
      t2Waits.textContent = 'Zain: 🔒 Giltza A (Hari 1-en zain)';
    }, 400);
    setTimeout(() => {
      t1Holds.textContent = 'Dauka: 🗝️ Giltza A eta B (Amaituta)';
      t1.style.borderColor = '#22c55e';
    }, 1000);
    setTimeout(() => {
      t2Holds.textContent = 'Dauka: 🗝️ Giltza A eta B (Amaituta)';
      t2.style.borderColor = '#22c55e';
      center.textContent = '✅ LIBRATUTA';
      center.style.color = 'var(--accent-green)';
      if (log) log.innerHTML = '✅ ZIKLO GABE: Hari 1-ek amaitu du eta giltzak askatu ditu; ondoren Hari 2-k segidan arrakastaz amaitu du!';
    }, 1800);
  }
}

function sim4Berrezarri() {
  const t1 = document.getElementById('dl-thread-1');
  const t2 = document.getElementById('dl-thread-2');
  const t1Holds = document.getElementById('dl-t1-holds');
  const t1Waits = document.getElementById('dl-t1-waits');
  const t2Holds = document.getElementById('dl-t2-holds');
  const t2Waits = document.getElementById('dl-t2-waits');
  const center = document.getElementById('dl-center-icon');

  if (t1) { t1.classList.remove('deadlocked'); t1.style.borderColor = ''; }
  if (t2) { t2.classList.remove('deadlocked'); t2.style.borderColor = ''; }
  if (t1Holds) { t1Holds.textContent = 'Dauka: -'; t1Holds.style.color = ''; }
  if (t1Waits) t1Waits.textContent = 'Zain: -';
  if (t2Holds) { t2Holds.textContent = 'Dauka: -'; t2Holds.style.color = ''; }
  if (t2Waits) t2Waits.textContent = 'Zain: -';
  if (center) { center.textContent = '🔄'; center.style.color = ''; }
}

// =========================================================================
// SIMULAGAILUA 5: SWING EDT VS SWINGWORKER
// =========================================================================
let sim5ClickCount = 0;
function sim5ClickTest() {
  sim5ClickCount++;
  const el = document.getElementById('sim5-click-count');
  if (el) el.textContent = sim5ClickCount;
}

function sim5ProbatuEDT(erabiliWorker) {
  const bar = document.getElementById('sim5-progress-bar');
  const statusEl = document.getElementById('sim5-ui-status');
  const spinner = document.getElementById('sim5-spinner');
  const log = document.getElementById('sim5-log');

  if (bar) bar.style.width = '0%';

  if (!erabiliWorker) {
    // EDT blokeo simulazioa
    statusEl.textContent = '❄️ IZOZTUTA (Not Responding)';
    statusEl.style.color = 'var(--accent-red)';
    spinner.classList.add('frozen');
    if (log) log.innerHTML = '❄️ EDT IZOZTUTA: Saiatu orain "Klikatu niri!" sakatzen... Ezin da!';

    // UI blokeatu 2 segundoz benetan
    const start = Date.now();
    setTimeout(() => {
      while (Date.now() - start < 2000) {
        // CPU loop intentsiboa EDT blokeatzeko
      }
      if (bar) bar.style.width = '100%';
      statusEl.textContent = 'UI Berreskuratuta';
      statusEl.style.color = 'var(--accent-green)';
      spinner.classList.remove('frozen');
      if (log) log.innerHTML = '⚠️ Kalkulua amaitu da baina bitartean erabiltzaileak aplikazioa hautsita zegoela uste izan du!';
    }, 50);
  } else {
    // SwingWorker simulazio fluidoa
    statusEl.textContent = '🚀 Fluidoa (60 FPS)';
    statusEl.style.color = 'var(--accent-green)';
    spinner.classList.remove('frozen');
    if (log) log.innerHTML = '🚀 SWINGWORKER: doInBackground()-ek atzean kalkulatzen du. Egin klik lasai "Klikatu niri!" botoian, arin dabil!';

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (bar) bar.style.width = p + '%';
      if (p >= 100) {
        clearInterval(interval);
        if (log) log.innerHTML = '✅ SwingWorker: process() eta done() metodoek UI-a perfektu eguneratu dute izoztu gabe!';
      }
    }, 80);
  }
}
