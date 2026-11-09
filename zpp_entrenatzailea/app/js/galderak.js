/**
 * ZPP (Zerbitzu eta Prozesuen Programazioa) - 1. Ebaluaketako Galdera-Banku Osoa (80 GALDERA)
 * 
 * Hobekuntzak:
 * 1. 80 galdera teoriko osoak klaseko gai guztiak xehetasunez lantzeko.
 * 2. Erantzunen luzera orekatua (luzerak ez du erantzun zuzena salatzen).
 * 3. Hitz gakoak, klaseak eta metodoak <code class="inline-code"> bidez koloreztatuta.
 */

const GALDERA_BANKUA = [
  // =========================================================================
  // 0. GAIA: SARRERA, PROZESADOREAK, LENGOAIAK ETA KONTZEPTUAK (1-12)
  // =========================================================================
  {
    id: 1,
    gaia: "Sarrera eta Prozesadoreak",
    enuntziatua: "Nukleo bakarreko (<code class='inline-code'>Single-Core</code>) PUZ batean hainbat ataza aldi berean exekutatzen direla dirudienean, zer gertatzen da benetan hardware mailan?",
    aukerak: [
      "Hardwareak ataza guztiak bateratu eta eragiketa bakar batean ebazten ditu.",
      "PUZak denbora-tarte txikiak txandakatzen ditu (<code class='inline-code'>time-slicing</code>), aldiberekotasun simulatua sortuz.",
      "CPUak benetako paralelismo fisikoa garatzen du bere barneko L1 katxe memorian.",
      "Sistema eragileak ataza bakoitza osorik amaitu arte itxaroten du hurrengoa hasi gabe."
    ],
    zuzena: 1,
    azalpena: "Nukleo bakarreko PUZ batean une bakoitzean agindu bakarra gauzatzen da. Sistema eragilearen planifikatzaileak denbora-tarte txikiak (zenbait milisegundo) esleitzen dizkie atazei txandaka, giza begiarentzat aldibereko ilusioa sortuz."
  },
  {
    id: 2,
    gaia: "Sarrera eta Prozesadoreak",
    enuntziatua: "Konparatu Intel 80486 (1989) eta gaur egungo Intel Core i7 prozesadore moderno bat. Zein baieztapen da ZUZENA?",
    aukerak: [
      "Intel 486ak 64 biteko arkitektura zuen eta 8 nukleo integratu zituen lehen aldiz merkatuan.",
      "Intel Core i7-ak GHz abiadura, nukleo anitzak eta <code class='inline-code'>Hyper-Threading</code> bidez hari logiko ugari eskaintzen ditu.",
      "Intel 486ak erloju-maiztasun handiagoa lortzen zuen (5 GHz), baina transistore gutxiago zituen.",
      "Bi prozesadoreek L3 motako katxe memoria partekatu bera erabiltzen dute barne-egituran."
    ],
    zuzena: 1,
    azalpena: "Intel 486ak 25-50 MHz, 32 bit eta nukleo bakarra zituen (~1.2 milioi transistore). Core i7 modernoek GHz-tako maiztasuna, 8-24 nukleo, Hyper-Threading eta 24-36 MB L3 katxe dituzte."
  },
  {
    id: 3,
    gaia: "Programazio Lengoaiak",
    enuntziatua: "Nola sailkatzen da Java programazio-lengoaia konpilazio eta exekuzio ereduari dagokionez?",
    aukerak: [
      "Lengoaia konpilatu hutsa da (C bezala), zuzenean plataformaren makina-kodera itzultzen delako.",
      "Lengoaia hibridoa da: iturburua Bytecode-ra (<code class='inline-code'>.class</code>) konpilatzen da eta JVMk exekutatzen du.",
      "Lengoaia interpretatu hutsa da (Python bezala), fitxategia unean bertan lerroz lerro irakurtzen delako.",
      "Lengoaia deklaratiboa da (SQL bezala), ez baitu inolako tarteko fitxategirik sortzen diskoan."
    ],
    zuzena: 1,
    azalpena: "Javak 'Write Once, Run Anywhere' printzipioa du: javac-ek Java kodea plataforma-independentea den Bytecode bihurtzen du, eta sistema bakoitzeko JVMk (JIT konpilatzaile bidez) hardwareari egokitzen dio."
  },
  {
    id: 4,
    gaia: "Kontzeptu Oinarrizkoak",
    enuntziatua: "Zein da desberdintasun zehatza 'Programa' baten eta 'Prozesu' baten artean?",
    aukerak: [
      "Programa RAM memorian kargatutako kodea da, eta prozesua diskoan gordetako fitxategia.",
      "Programa kode pasiboa da diskoan; prozesua, aldiz, exekuzioan dagoen programa aktiboa da RAMen.",
      "Ez dago inolako desberdintasunik, sistema eragilean bi terminoak guztiz sinonimoak baitira.",
      "Programa erabiltzaileak idazten duena da, eta prozesua hardwareak bakarrik kudeatzen duena."
    ],
    zuzena: 1,
    azalpena: "Programa entitate pasiboa da (kode iturburua edo exekutagarria diskoan). Prozesua entitate aktiboa da: RAMen dago, PIDa du, baliabideak esleituta ditu eta PUZ denbora jasotzen du."
  },
  {
    id: 5,
    gaia: "Kontzeptu Oinarrizkoak",
    enuntziatua: "Zer da 'Zerbitzu' bat (Windows-en Service, Linux-en Daemon)?",
    aukerak: [
      "Erabiltzailearen pantailan leiho nagusi bat bistaratzen duen aplikazio arrunt bat.",
      "Atzeko planoan (<code class='inline-code'>background</code>), GUI gabe martxan dagoen prozesu iraunkor bat.",
      "Fitxategiak diskotik ezabatzeko sistema eragileak erabiltzen duen script berezi bat.",
      "Prozesadorearen nukleo fisiko bat desaktibatzen duen behe-mailako kontrol-agindua."
    ],
    zuzena: 1,
    azalpena: "Zerbitzuak (daemons) erabiltzailearen zuzeneko interakziorik gabe atzeko planoan lanean ari diren prozesu iraunkorrak dira (adib. spoolsv.exe inprimatzeko, web zerbitzariak, sshd)."
  },
  {
    id: 6,
    gaia: "Sistema Banatuak",
    enuntziatua: "Zein da sistema banatuen (<code class='inline-code'>Distributed Systems</code>) ezaugarri nagusia?",
    aukerak: [
      "Nodo guztiek fisikoki memoria nagusi (RAM) bera partekatzen dute bus baten bidez.",
      "Lana sare bidez lotutako ordenagailu independenteetan banatzen da, mezu-truke bidez komunikatuz.",
      "Ezin dute ataza bakar baten gainean batera lan egin sareko latentzia handia dela eta.",
      "Sistema eragilearen kernel bakar batek zuzentzen ditu mikroprozesadore fisiko guztiak."
    ],
    zuzena: 1,
    azalpena: "Sistema banatuetan ordenagailu independenteek ez dute memoria fisikorik partekatzen; sare-protokoloen (TCP/IP, RPC, REST) bidez trukatzen dituzte mezuak elkarlanean aritzeko."
  },
  {
    id: 7,
    gaia: "Programazio Lengoaiak",
    enuntziatua: "Lengoaia konpilatuen (adib. C, C++) alde onena eta txarrena zeintzuk dira?",
    aukerak: [
      "Oso eramangarriak dira sistema guztietan, baina exekuzio-abiadura oso motela dute beti.",
      "Exekuzio-abiadura maximoa dute, baina ez dira eramangarriak (sistema bakoitzerako birkonpilatu behar da).",
      "Ez dute inolako konpilatzailerik behar exekutatzeko, baina memoria asko xahutzen dute.",
      "Web nabigatzaileetan bakarrik exekuta daitezke, baina segurtasun handia eskaintzen dute."
    ],
    zuzena: 1,
    azalpena: "Konpilatutako kodea zuzenean makina-kodera (.exe, ELF) bihurtzen denez, abiadura eta errendimendua gorenekoak dira, baina sistema eragile eta arkitektura zehatzari estuki lotuta daude."
  },
  {
    id: 8,
    gaia: "Programazio Lengoaiak",
    enuntziatua: "Zer da <code class='inline-code'>JIT</code> (Just-In-Time) konpilatzailea Java-ren JVM barruan?",
    aukerak: [
      "Klaseak disko gogorretik automatikoki ezabatzen dituen zabor-biltzailearen atal bat.",
      "Maiz exekutatzen den Bytecode-a exekuzio-unean bertan makina-kode natibo bihurtzen duen osagaia.",
      "Java kodearen sintaxi akatsak testu-editorean azpimarratzen dituen tresna gehigarri bat.",
      "Sareko konektagarritasuna egiaztatzen duen komunikazio-protokolo estandar bat."
    ],
    zuzena: 1,
    azalpena: "JIT konpilatzaileak JVMren errendimendua biderkatzen du: gehien erabiltzen diren Bytecode zatiak ('hot spots') unean bertan makina-kode erreal bihurtzen ditu, etengabeko interpretazioa saihestuz."
  },
  {
    id: 9,
    gaia: "Kontzeptu Oinarrizkoak",
    enuntziatua: "Zer gertatzen da fitxategi exekutagarri batekin erabiltzaileak klik bikoitza egiten dionean?",
    aukerak: [
      "Fitxategia RAMera kargatzen da, SEak PCB eta PID esleitzen dizkio eta prozesu bihurtzen da.",
      "Fitxategia birkonpilatu egiten da eta diskoan kopia berri bat sortzen da automatikoki.",
      "Sistema eragileak fitxategiaren edukia sareko zerbitzari zentral batera bidaltzen du.",
      "Prozesadorearen nukleo guztiak gelditu egiten dira fitxategia aztertu arte."
    ],
    zuzena: 0,
    azalpena: "Diskoan dagoen fitxategi pasiboa sistema eragilearen kargatzaileak (loader) RAMera ekartzen du, bere helbide-eremua sortzen du, PCB prestatu eta 'Prest' (Ready) egoeran jartzen du."
  },
  {
    id: 10,
    gaia: "Sarrera eta Prozesadoreak",
    enuntziatua: "Zer adierazten du prozesadore baten erloju-maiztasunak (adib. 4.2 GHz)?",
    aukerak: [
      "Ordenagailuak Internetetik datuak jaisteko duen gehienezko banda-zabalera teorikoa.",
      "Prozesadoreak segundoko exekutatu ditzakeen oinarrizko erloju-zikloen kopurua.",
      "Memoria nagusiak (RAM) biltegiratu dezakeen informazio-bolumen osoa gigabytetan.",
      "Txipak bere tenperatura seguru mantentzeko behar duen haizagailuaren bira-kopurua."
    ],
    zuzena: 1,
    azalpena: "Hertz-ak (Hz) segundoko zikloak dira. 4.2 GHz = segundoko 4.200 milioi ziklo. Ziklo bakoitzean PUZak instrukzio zati bat gauzatu dezake."
  },
  {
    id: 11,
    gaia: "Sarrera eta Prozesadoreak",
    enuntziatua: "Zer da <code class='inline-code'>Hyper-Threading</code> teknologia Intel prozesadore modernoetan?",
    aukerak: [
      "Nukleo bakoitzari tenperatura jaisteko aukera ematen dion hozte-sistema elektroniko bat.",
      "Nukleo fisiko bakoitza sistema eragilearen aurrean bi nukleo logiko gisa aurkezteko gaitasuna.",
      "Disko gogorreko fitxategiak automatikoki RAM memorian bikoizten dituen hardwarea.",
      "Sareko hariak zuntz optikoaren bidez azkarrago transmititzeko txip berezia."
    ],
    zuzena: 1,
    azalpena: "Hyper-Threading-ek (SMT) nukleo fisiko baten barneko erregistroak bikoizten ditu. Horrela, nukleo fisiko batek 2 hari logiko kudea ditzake aldi berean, arkitekturaren erabilera optimizatuz."
  },
  {
    id: 12,
    gaia: "Kontzeptu Oinarrizkoak",
    enuntziatua: "Zein ataletan banatzen da prozesu baten memoria-eremua RAM memorian?",
    aukerak: [
      "Testua (Kodea), Datuak (Globalak), Heap (Dinamikoa) eta Stack (Deien Pila eta Tokikoak).",
      "Sektorea, Pista, Zilindroa eta Partizio nagusia.",
      "Kernel gunea, Erregistro orokorrak, BIOS bufferra eta Swap fitxategia.",
      "HTML fitxategia, CSS estiloak, JavaScript logika eta Irudien karpeta."
    ],
    zuzena: 0,
    azalpena: "Prozesu baten helbide-eremuak 4 atal ditu: Testua (agindu bitarrak), Datuak (aldagai estatiko/globalak), Heap ('new' bidez sortutako objektuak) eta Stack (metodoen deiak eta tokiko aldagaiak)."
  },

  // =========================================================================
  // 1. GAIA: PROZESUAK, PCB, 7 EGOERAK ETA SE KOMANDOAK (13-26)
  // =========================================================================
  {
    id: 13,
    gaia: "Prozesuak eta PCB",
    enuntziatua: "Zer datu gordetzen ditu <code class='inline-code'>PCB</code> (Process Control Block) egiturak?",
    aukerak: [
      "Erabiltzailearen pasahitza eta ordenagailuaren lizentzia-zenbaki digitala.",
      "PIDa, prozesuaren egoera, Program Counter (PC), erregistroak, lehentasuna eta memoria-mugak.",
      "Aplikazioak sarean kontsultatu dituen webguneen eta cookie-en zerrenda osoa.",
      "Konpilatzaileak sortutako errore sintaktikoen eta oharren erregistro historikoa."
    ],
    zuzena: 1,
    azalpena: "PCB prozesuaren kontrol-fitxa da kernelarentzat: bertan daude PIDa, uneko egoera, PC (hurrengo aginduaren helbidea), CPU erregistroak, memoria-mapa eta irekitako fitxategien taula."
  },
  {
    id: 14,
    gaia: "Prozesuak eta PCB",
    enuntziatua: "Zer da <code class='inline-code'>Testuinguru-aldaketa</code> (Context Switch) eta zer eragin du sisteman?",
    aukerak: [
      "Sistema eragilearen hizkuntza aldatzean leihoak birkargatzeko prozesua.",
      "PUZak prozesu bat utzi eta bestea hartzeko egoerak gorde/kargatzea; gainkarga dakar.",
      "Aplikazio batek fitxategi bat diskotik irakurtzean egiten duen memoria-kopia.",
      "Erabiltzaile batek saioa amaitu eta beste batek saioa hasteko prozedura."
    ],
    zuzena: 1,
    azalpena: "Testuinguru-aldaketan PUZak uneko prozesuaren erregistroak bere PCBean gordetzen ditu eta hurrengoarenak kargatzen ditu. Une horretan PUZak ez du lan erabilgarririk egiten; beraz, gainkarga da (overhead)."
  },
  {
    id: 15,
    gaia: "Planifikazio Mailak",
    enuntziatua: "Zertaz arduratzen da <code class='inline-code'>Epe luzeko planifikatzailea</code> (Long-term scheduler)?",
    aukerak: [
      "CPU librea geratzean prest daudenen artean hurrengoa aukeratzeaz unean bertan.",
      "Sistema eragilean prozesu berriak noiz onartu erabakitzeaz eta multiprogramazio-maila finkatzeaz.",
      "Memoria nagusia betetzen denean prozesuak swap eremura bidaltzeaz.",
      "Sareko paketeen bideratze-bide motzena kalkulatzeaz bideratzailean."
    ],
    zuzena: 1,
    azalpena: "Epe luzekoak sistemako prozesu kopuru osoa (multiprogramazio maila) kontrolatzen du, diskoan dauden eskaerak memorian noiz onartu erabakiz."
  },
  {
    id: 16,
    gaia: "Planifikazio Mailak",
    enuntziatua: "Zertaz arduratzen da <code class='inline-code'>Epe ertaineko planifikatzailea</code> (Medium-term scheduler)?",
    aukerak: [
      "PUZaren hurrengo instrukzioa zein nukleotan gauzatuko den hautatzeaz.",
      "Memoria nagusia libratzeko prozesuak disko osagarrira (Swap) eramateaz (<code class='inline-code'>Swapping</code>).",
      "Erabiltzailearen teklatuko tekla-sakatze bakoitza aztertzeaz.",
      "Aplikazioak ixtean disko gogorra desfragmentatzeaz."
    ],
    zuzena: 1,
    azalpena: "Epe ertainekoak Swapping-a kudeatzen du: RAM gainkargatuta badago, prozesu batzuk disko osagarrira (Swap) mugitzen ditu ('Esekia' egoeretara) lekua egiteko."
  },
  {
    id: 17,
    gaia: "Planifikazio Mailak",
    enuntziatua: "Zertaz arduratzen da <code class='inline-code'>Epe laburreko planifikatzailea</code> (CPU Scheduler)?",
    aukerak: [
      "Prozesu berriak sortzeko fitxategi exekutagarriak diskotik irakurtzeaz.",
      "Prest dauden prozesuen artean PUZaren hurrengo txanda zeini eman erabakitzeaz.",
      "Aplikazioen lizentziak egiaztatzeaz Internet bidez.",
      "Segurtasun kopiak automatikoki hodeira igotzeaz."
    ],
    zuzena: 1,
    azalpena: "CPU Scheduler-a milisegundoro aritzen da lanean: 'Prest' daudenen ilaratik zein prozesuri emango dion PUZa hautatzen du, planifikazio-algoritmoaren arabera."
  },
  {
    id: 18,
    gaia: "Prozesuen Egoerak",
    enuntziatua: "Prozesu bat 'EXEKUZIOAN' egoeratik 'BLOKEATUA' egoerara igarotzen da zergatik?",
    aukerak: [
      "Esleitutako denbora-kuantua (Quantum) agortu zaiolako.",
      "Kanpoko gertaera baten zain geratu delako (adib. S/I eragiketa edo baliabide baten zain).",
      "Bere lana behar bezala amaitu duelako eta itxi nahi duelako.",
      "Memoria nagusia agortu eta disko gogorrera eraman dutelako."
    ],
    zuzena: 1,
    azalpena: "Prozesu batek ezin badu aurrera egin kanpoko zerbaiten zain dagoelako (fitxategi bat irakurri, sarea, erabiltzailearen sarrera), 'Blokeatua' egoerara pasatzen da eta PUZa askatzen du."
  },
  {
    id: 19,
    gaia: "Prozesuen Egoerak",
    enuntziatua: "Prozesu bat 'EXEKUZIOAN' egoeratik 'PREST' egoerara igarotzen da zergatik?",
    aukerak: [
      "Diskoan fitxategi bat idazteko baimena ukatu zaiolako.",
      "Sistema eragileak esleitutako denbora-kuantua agortu zaiolako edo lehentasun handiagoko bat iritsi delako.",
      "Aplikazioak salbuespen larri bat jaurti duelako kodean.",
      "Erabiltzaileak saguaren eskuineko botoia sakatu duelako."
    ],
    zuzena: 1,
    azalpena: "Exekuzioan dagoen prozesu baten quantum-a agortzen denean, planifikatzaileak kanporatu egiten du PUZetik eta 'Prest' egoerara itzultzen du, hurrengo txandaren zain gera dadin."
  },
  {
    id: 20,
    gaia: "Prozesuen Egoerak",
    enuntziatua: "Zer gertatzen da prozesu batekin 'BLOKEATUA' egoeran dagoenean PUZa libre geratzen bada?",
    aukerak: [
      "Berehala hartzen du PUZa eta aginduak exekutatzen hasten da berriro.",
      "Ezin du PUZa hartu; zain dagoen gertaera amaitu arte 'Blokeatua' jarraituko du.",
      "Sistema eragileak automatikoki amaitu eta ezabatu egiten du.",
      "Lehentasun goreneko prozesu bihurtzen da automatikoki."
    ],
    zuzena: 1,
    azalpena: "Blokeatutako prozesu batek ez du PUZik behar une horretan (kanpoko gertaeraren zain dago). Behin gertaera jasotakoan 'Prest' egoerara igaroko da, eta orduan bai, PUZa eskuratu ahal izango du."
  },
  {
    id: 21,
    gaia: "Prozesuen Egoerak",
    enuntziatua: "Zer desberdintasun dago 'ESEKIA-PREST' eta 'ESEKIA-BLOKEATUA' egoeren artean?",
    aukerak: [
      "Esekia-Prest RAMen dago eta Esekia-Blokeatua diskoan dago.",
      "Biak daude Swap-ean; Esekia-Prest-ek ez du S/Irik itxaroten, Esekia-Blokeatuak oraindik bai.",
      "Esekia-Blokeatua prozesua betiko itzali da eta Esekia-Prest martxan dago.",
      "Bata sareko aplikazioena da eta bestea sistema eragilearen barnekoa."
    ],
    zuzena: 1,
    azalpena: "Biak daude diskoan (Swap). Baina Esekia-Prest dagoenak gertaera guztiak jaso ditu eta RAMera ekartzeko prest dago; Esekia-Blokeatuak oraindik kanpoko gertaera amaitzea behar du."
  },
  {
    id: 22,
    gaia: "SE Komandoak",
    enuntziatua: "Windows terminalean martxan dauden prozesuak ikusi eta PID jakin bat bortxaz ixteko zein komando erabiltzen dira?",
    aukerak: [
      "`dir` eta `del /f`",
      "`tasklist` eta `taskkill /PID <zenb> /F`",
      "`netstat` eta `ipconfig /flushdns`",
      "`get-process` eta `stop-computer`"
    ],
    zuzena: 1,
    azalpena: "Windows-en 'tasklist' komandoak prozesu guztiak eta haien PIDak erakusten ditu, eta 'taskkill /PID ... /F' bidez prozesua bortxaz (/F = forcibly) amaitzen da."
  },
  {
    id: 23,
    gaia: "SE Komandoak",
    enuntziatua: "Linux terminalean prozesu guztiak xehetasunez ikusi eta seinale bortitzena (<code class='inline-code'>SIGKILL</code>) bidaltzeko zein komando erabiltzen dira?",
    aukerak: [
      "`ls -la` eta `rm -rf`",
      "`ps aux` eta `kill -9 <PID>`",
      "`cat /proc` eta `reboot`",
      "`top -b` eta `shutdown now`"
    ],
    zuzena: 1,
    azalpena: "Linux-en 'ps aux' komandoak sistema osoko prozesuak zerrendatzen ditu, eta 'kill -9 <PID>' aginduak 9. seinalea (SIGKILL) bidaltzen dio, kernelak berehala hil dezan."
  },
  {
    id: 24,
    gaia: "SE Komandoak",
    enuntziatua: "Linux-en prozesu baten lehentasuna aldatzeko zein tresna erabiltzen dira?",
    aukerak: [
      "`chmod` eta `chown`",
      "`nice` (abiaraztean) eta `renice` (martxan dagoenean)",
      "`ping` eta `traceroute`",
      "`grep` eta `awk`"
    ],
    zuzena: 1,
    azalpena: "'nice' balioak (-20tik +19ra) prozesuaren lehentasuna definitzen du. Zenbaki txikiagoak lehentasun handiagoa dakar. 'renice' bidez martxan dagoen prozesu baten lehentasuna aldatzen da."
  },
  {
    id: 25,
    gaia: "Prozesuen Komunikazioa (IPC)",
    enuntziatua: "Prozesuen arteko komunikazioan (<code class='inline-code'>IPC</code>), zein da mekanismorik azkarrena?",
    aukerak: [
      "Fitxategi arruntak disko gogorrean idaztea eta irakurtzea.",
      "Memoria Partekatua (<code class='inline-code'>Shared Memory</code>), nukleoek RAM helbide berak atzitzen dituztelako.",
      "Internet bidezko mezu elektronikoak bidaltzea.",
      "Sistema eragilearen erregistro-fitxategia (Windows Registry) erabiltzea."
    ],
    zuzena: 1,
    azalpena: "Memoria partekatua azkarrena da, datuak ez direlako kernel bidez kopiatu behar; prozesuek RAM bera irakurtzen dute zuzenean. Horregatik, sinkronizazio zorrotza eskatzen du."
  },
  {
    id: 26,
    gaia: "Prozesuen Komunikazioa (IPC)",
    enuntziatua: "Zer da tutua (<code class='inline-code'>Pipe</code>) sistema eragileetan?",
    aukerak: [
      "Ordenagailuaren kable fisikoa plaka nagusia eta diskoa lotzen dituena.",
      "Prozesu baten irteera estandarra (<code class='inline-code'>stdout</code>) beste baten sarrera estandarrari (<code class='inline-code'>stdin</code>) lotzeko bidea.",
      "Memoria nagusiko akatsak detektatzen dituen tresna berezi bat.",
      "Prozesadorearen hozte-likidoa garraiatzen duen hodia."
    ],
    zuzena: 1,
    azalpena: "Tutu batek (adib. 'ps aux | grep java') lehen komandoaren testu-irteera bigarrenaren sarrera bihurtzen du, bi prozesuen arteko datu-korronte zuzena sortuz."
  },

  // =========================================================================
  // 2. GAIA: SE PLANIFIKAZIO ALGORITMOAK (SCHEDULING) (27-38)
  // =========================================================================
  {
    id: 27,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Nola jokatzen du <code class='inline-code'>FCFS</code> (First-Come, First-Served) algoritmoak?",
    aukerak: [
      "Prozesu laburrenari ematen dio beti lehentasuna beste guztien aurretik.",
      "Lehen iristen dena lehen exekutatzen da, eta osorik amaitu arte ez da ateratzen.",
      "Prozesu guztiei denbora-tarte bera banatzen die txandaka ilaran.",
      "Prozesuaren lehentasun-zenbakiaren arabera antolatzen du ilara."
    ],
    zuzena: 1,
    azalpena: "FCFS algoritmo ez-aproposa da: iritsiera-ordenan zerbitzatzen ditu prozesuak, supermerkatuko kutxa batean bezala. Sinplea da, baina itxaron-denbora handiak sor ditzake."
  },
  {
    id: 28,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer da FCFS algoritmoan gertatzen den 'Konboi Efektua' (<code class='inline-code'>Convoy Effect</code>)?",
    aukerak: [
      "Sareko konektagarritasuna eten egiten denean gertatzen den akatsa.",
      "Prozesu luze batek PUZa denbora luzez hartzeagatik, atzetik datozen labur guztiak atzeratzea.",
      "Disko gogorra betetzean prozesuak fitxategi bakar batean batzea.",
      "Sistema eragileak aldi berean 10 prozesu berri abiaraztea."
    ],
    zuzena: 1,
    azalpena: "Kamioi motel baten atzean auto azkarrak harrapatuta geratzen diren bezala, prozesu astun batek atzeko ataza arin guztiak geldiarazten ditu, sistemaren erantzun-gaitasuna hondatuz."
  },
  {
    id: 29,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer da <code class='inline-code'>Round Robin</code> (RR) algoritmoaren <code class='inline-code'>Quantum</code>-a?",
    aukerak: [
      "Prozesu batek erabil dezakeen gehienezko RAM memoria kopurua megabytetan.",
      "Prozesu bakoitzari txanda bakoitzean esleitzen zaion denbora-tarte finko eta mugatua.",
      "Prozesadorearen tenperatura segurua neurtzen duen parametro fisikoa.",
      "Sisteman onartzen den gehienezko prozesu independenteen kopurua."
    ],
    zuzena: 1,
    azalpena: "Quantum-a (normalean 10-100 ms) Round Robin-en funtsa da. Denbora hori agortzean etenaldi bat sortzen da eta hurrengo prozesuari ematen zaio txanda."
  },
  {
    id: 30,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer gertatzen da Round Robin-en Quantum-a handiegia edo txikiegia bada?",
    aukerak: [
      "Ez du inolako eraginik, errendimendua beti berdin mantentzen baita.",
      "Handiegia bada FCFS bihurtzen da; txikiegia bada context switch gainkargak sistema moteltzen du.",
      "Handiegia bada memoria agortzen da; txikiegia bada fitxategiak galtzen dira.",
      "Prozesuak ausaz ezabatzen hasten dira sistemaren oreka mantentzeko."
    ],
    zuzena: 1,
    azalpena: "Quantum erraldoia bada, prozesuak beren lana bukatuta irteten dira (FCFS bilakatuz). Quantum txikiegia bada (adib. 1 ms), PUZak denbora gehiago pasatzen du egoerak aldatzen lanean baino."
  },
  {
    id: 31,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Nola aukeratzen du prozesua <code class='inline-code'>SPF / SPN</code> (Shortest Process First) algoritmoak?",
    aukerak: [
      "PID zenbaki txikiena duen prozesua aukeratzen du beti.",
      "Prest daudenen artetik hurrengo PUZ erabilera laburrena beharko duena hautatzen du lehenik.",
      "Sarreran denbora gehien daramana hautatzen du ilaran.",
      "Ausazko prozesu bat aukeratzen du inpartzialtasuna bermatzeko."
    ],
    zuzena: 1,
    azalpena: "SPFk batez besteko itxaron-denbora txikiena lortzen du teorian, baina desabantaila nagusi bat du: zaila da aldez aurretik zehatz jakitea prozesu batek zenbat iraungo duen."
  },
  {
    id: 32,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zein da desberdintasuna <code class='inline-code'>SPF</code> eta <code class='inline-code'>SRT</code> (Shortest Remaining Time) artean?",
    aukerak: [
      "SPF algoritmo aproposa da eta SRT algoritmo ez-aproposa da.",
      "SPF ez-aproposa da; SRT, aldiz, aproposa da (gainerako denbora gutxiago duen berria iristean kanporatu egiten du).",
      "SPF Windows-en bakarrik dabil eta SRT Linux sisteman bakarrik.",
      "Bi algoritmoek berdintsu funtzionatzen dute, ez dago desberdintasunik."
    ],
    zuzena: 1,
    azalpena: "SRTn uneko prozesua exekutatzen ari denean beste bat iristen bada eta amaitzeko unekoak baino denbora gutxiago behar badu, unekoa kendu eta berria sartzen du berehala."
  },
  {
    id: 33,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer da <code class='inline-code'>Inanizioa</code> (Starvation / Gosea) planifikazio-algoritmoetan?",
    aukerak: [
      "Ordenagailua elikatze-iturririk gabe geratzean itzaltzea.",
      "Prozesu batek PUZa inoiz ez lortzea, beste batzuei etengabe lehentasuna ematen zaielako.",
      "Diskoan lekua amaitzeagatik aplikazioak blokeatuta geratzea.",
      "Memoria nagusia garbitzeko sistema eragileak egiten duen ekintza."
    ],
    zuzena: 1,
    azalpena: "SRT bezalako algoritmoetan ataza laburrak etengabe iristen badira, ataza luze batek sekula ez du txandarik lortuko ('goseak hiltzen da'), nahiz eta prest egon."
  },
  {
    id: 34,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Nola konpontzen da inanizioa <code class='inline-code'>Zahartze</code> (Aging) teknikaren bidez?",
    aukerak: [
      "Prozesu zaharkituak automatikoki ezabatuz sistema azkartzeko.",
      "Ilaran itxaroten daraman denboraren arabera prozesuaren lehentasuna pixkanaka igoz.",
      "Prozesadorearen erloju-maiztasuna jaitsiz berotze globala ekiditeko.",
      "Fitxategiak formatu berriago batera itzuliz bateragarritasuna lortzeko."
    ],
    zuzena: 1,
    azalpena: "Aging teknikak itxaroten daramaten prozesuen lehentasuna handitzen du denborarekin. Horrela, nahiz eta hasieran lehentasun baxukoa izan, azkenean lehentasun gorena lortuko du."
  },
  {
    id: 35,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Nola funtzionatzen dute <code class='inline-code'>Berrelikaduradun Hainbat Ilarek</code> (Multilevel Feedback Queues)?",
    aukerak: [
      "Ilara bakar bat dago eta prozesu guztiak ausaz mugitzen dira.",
      "Hainbat ilara daude; ataza berriak goiko RR mailetan sartzen dira eta quantum-a agortzean beherantz jaisten dira.",
      "CPU asko kontsumitzen duten prozesuak berehala ezabatzen dira.",
      "Prozesu luzeak beti goiko ilaretara bidaltzen dira lehenik bukatzeko."
    ],
    zuzena: 1,
    azalpena: "Algoritmo erreal modernoena da: interaktibo laburrak goiko mailetan (RR quantum txikia) amaitzen dira azkar; kalkulu luzeak beheragoko mailetara (RR handiagoa edo FCFS) jaisten dira."
  },
  {
    id: 36,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer esan nahi du algoritmo bat <code class='inline-code'>Aproposa</code> (Preemptive) izateak?",
    aukerak: [
      "Sistema eragileak prozesuari PUZa kendu diezaiokeela bere lana amaitu baino lehen.",
      "Aplikazioak nahi adina denbora erabil dezakeela PUZa bere borondatez utzi arte.",
      "Kodea automatikoki konpilatzen dela exekuzioan zehar erroreak zuzenduz.",
      "Erabiltzaileak interfaze grafikoan botoi guztiak desgaituta dituela."
    ],
    zuzena: 0,
    azalpena: "Algoritmo aproposetan (preemptive, adib. Round Robin, SRT), sistemak uneko prozesua eteteko eta PUZetik ateratzeko eskumena du. Ez-aproposetan (FCFS), prozesuak berak askatu behar du."
  },
  {
    id: 37,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer da erantzun-denbora (<code class='inline-code'>Response Time</code>) sistema interaktiboetan?",
    aukerak: [
      "Eskaera bat egin zenetik lehen erantzuna bistaratu arte pasatako denbora.",
      "Prozesua sortu zenetik bere azken lerrora arte igarotako denbora osoa.",
      "Disko gogorrak fitxategi bat bilatzeko behar duen biraketa-denbora.",
      "Ordenagailua piztu zenetik login pantaila agertu arteko tartea."
    ],
    zuzena: 0,
    azalpena: "Erantzun-denbora eskaera sartzen denetik sistemak lehen erreakzioa erakusten duen artekoa da. Sistema interaktiboetan funtsezkoa da baxua izatea, erabiltzaileak moteltasunik ez nabaritzeko."
  },
  {
    id: 38,
    gaia: "Planifikazio Algoritmoak",
    enuntziatua: "Zer da produktibitatea (<code class='inline-code'>Throughput</code>) planifikazioaren ikuspegitik?",
    aukerak: [
      "Denbora-unitate bakoitzean arrakastaz amaitzen den prozesu kopurua.",
      "PUZaren barruan dauden transistoreen guztizko kopurua.",
      "Sareko konexioak segundoko deskargatzen duen megabyte kopurua.",
      "Aplikazio batek idatzitako kode-lerroen batez besteko kopurua."
    ],
    zuzena: 0,
    azalpena: "Throughput-ak sistemak orduko edo segundoko zenbat ataza burutzeko gai den adierazten du. Helburua balio hau maximizatzea izaten da lote-sistemetan (batch)."
  },

  // =========================================================================
  // 3. GAIA: JAVA PROCESSBUILDER, RUNTIME ETA 2. ATAZA (39-50)
  // =========================================================================
  {
    id: 39,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Java-n nola instantziatzen da <code class='inline-code'>Runtime</code> klasea?",
    aukerak: [
      "`Runtime r = new Runtime();` erabiliz zuzenean.",
      "`Runtime r = Runtime.getRuntime();` Singleton metodo estatikoaren bidez.",
      "`Runtime r = ProcessBuilder.getRuntime();` bidez.",
      "`Runtime r = System.createRuntime();` erabiliz."
    ],
    zuzena: 1,
    azalpena: "Runtime klaseak Singleton diseinu-patroia darabil: eraikitzailea pribatua da eta 'Runtime.getRuntime()' bidez atzitzen da JVMren instantzia bakarra."
  },
  {
    id: 40,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Zer itzultzen du <code class='inline-code'>Runtime.getRuntime().availableProcessors()</code> metodoak?",
    aukerak: [
      "Dendan erosteko eskuragarri dauden PUZ modeloen zerrenda.",
      "JVMk erabil ditzakeen prozesadore/nukleo logikoen guztizko kopurua.",
      "Une horretan hutsik eta lanean ez dauden nukleoen kopurua.",
      "Plaka nagusian instalatuta dauden RAM txipen kopurua."
    ],
    zuzena: 1,
    azalpena: "Metodo honek makina horretan sistemak eskura dituen nukleo/hari logikoen zenbatekoa ematen du, hari-kopuru egokia dimentsionatzeko oso erabilgarria dena."
  },
  {
    id: 41,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Zergatik da hobetsia <code class='inline-code'>ProcessBuilder</code> erabiltzea <code class='inline-code'>Runtime.exec()</code> baino?",
    aukerak: [
      "ProcessBuilder-ek ez duelako inolako baimenik behar sistema eragilean.",
      "Parametroak zerrendatan banatzeko, ingurunea aldatzeko eta I/O bideratzeko askoz kontrol hobea baitu.",
      "Runtime klasea erabat debekatuta dagoelako Java bertsio guztietan.",
      "ProcessBuilder-ek prozesuak C++ lengoaiara itzultzen dituelako automatikoki."
    ],
    zuzena: 1,
    azalpena: "ProcessBuilder-ek (Java 5+) argumentuak String array edo List gisa jasotzen ditu espazio-akatsak saihestuz, ingurune-aldagaiak moldatzen uzten du eta I/O korronteak garbi kudeatzen ditu."
  },
  {
    id: 42,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Nola abiarazten da kanpoko prozesua <code class='inline-code'>ProcessBuilder</code> erabiliz?",
    aukerak: [
      "`pb.run()` metodoari deituz.",
      "`Process p = pb.start();` metodoari deituz.",
      "`pb.executeProcess();` deituz.",
      "`Process p = new Process(pb);` eginez."
    ],
    zuzena: 1,
    azalpena: "'pb.start()' deitzean sistema eragileak kanpoko prozesua abiarazten du eta Java-n hura kontrolatzeko 'Process' motako objektu bat itzultzen du."
  },
  {
    id: 43,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Java 9tik aurrera, nola lor dezakegu prozesu baten PID zenbakia modu estandarrean?",
    aukerak: [
      "`process.getPidNumber()`",
      "`process.pid()`",
      "`process.toHandle().getId()`",
      "`Runtime.findPid(process)`"
    ],
    zuzena: 1,
    azalpena: "Java 9 bertsioan 'Process.pid()' metodoa gehitu zen, zuzenean 'long' balio gisa prozesuaren identifikatzailea ematen duena."
  },
  {
    id: 44,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Zer egiten du <code class='inline-code'>process.waitFor()</code> metodoak?",
    aukerak: [
      "Prozesua berehala suntsitu eta RAMetik kanporatzen du.",
      "Uneko Java haria itxaroten uzten du kanpoko prozesua amaitu arte, eta irteera-kodea itzultzen du.",
      "Prozesuaren abiadura moteldu egiten du memoria gutxiago gasta dezan.",
      "Prozesuaren leihoa minimizatu egiten du ataza-barran."
    ],
    zuzena: 1,
    azalpena: "'waitFor()' metodoak uneko haria blokeatzen du kanpoko azpiprozesuak bere lana bukatu arte. Amaitzean irteera-kodea (exitValue, 0 arrakasta bada) itzultzen du."
  },
  {
    id: 45,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Zer itzultzen du <code class='inline-code'>process.isAlive()</code> metodoak?",
    aukerak: [
      "Boolear bat (<code class='inline-code'>true/false</code>), prozesua oraindik martxan dagoen ala jada amaitu den jakiteko.",
      "Prozesuak kontsumitu duen bateriaren ehunekoa.",
      "Prozesuak erabili duen PUZ denbora milisegundotan.",
      "Prozesuaren leihoaren koordenatuak pantailan."
    ],
    zuzena: 0,
    azalpena: "'isAlive()' metodoak azpiprozesua oraindik bizirik dagoen (true) ala amaitu den (false) egiaztatzen du haria blokeatu gabe."
  },
  {
    id: 46,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Nola lor daiteke prozesu baten hasiera-ordua Java 9+ bertsioetan?",
    aukerak: [
      "`process.getStartTime()` deituz.",
      "`process.info().startInstant()` metodoaren bidez (<code class='inline-code'>Optional&lt;Instant&gt;</code>).",
      "`System.currentTimeMillis()` deituz prozesua amaitzean.",
      "`Runtime.getRuntime().startTime(process)` bidez."
    ],
    zuzena: 1,
    azalpena: "'process.info()' bidez 'ProcessHandle.Info' eskuratzen da, eta 'startInstant()' metodoak SEren kernelak erregistratutako hasiera-une zehatza eskaintzen du."
  },
  {
    id: 47,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Zer desberdintasun dago <code class='inline-code'>destroy()</code> eta <code class='inline-code'>destroyForcibly()</code> artean?",
    aukerak: [
      "Biek berdin jokatzen dute, izen desberdinak besterik ez dira.",
      "`destroy()`-k amaitze normala eskatzen du (<code class='inline-code'>SIGTERM</code>); `destroyForcibly()`-k bortxaz hiltzen du (<code class='inline-code'>SIGKILL</code>).",
      "`destroy()` fitxategiak ezabatzeko da eta `destroyForcibly()` leihoa ixteko.",
      "`destroy()` metodoak Java aplikazio osoa ixten du beti."
    ],
    zuzena: 1,
    azalpena: "'destroy()' metodoak seinale arrunta bidaltzen du garbi ixteko aukera emanez; 'destroyForcibly()' metodoak, berriz, sistema eragileari prozesua berehala hiltzeko agintzen dio."
  },
  {
    id: 48,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Nola irakurtzen da kanpoko prozesu baten kontsolako testu-irteera Javan?",
    aukerak: [
      "`process.getOutputStream()` erabiliz.",
      "`process.getInputStream()` irakurriz (prozesuaren irteera Java-ren sarrera baita).",
      "`System.in.read()` zuzenean deituz.",
      "`Scanner sc = new Scanner(process);` eginez."
    ],
    zuzena: 1,
    azalpena: "Perspektiba Java da: prozesuaren irteera estandarra (stdout) Java programaren sarrera-korrontea da; beraz, 'process.getInputStream()' irakurri behar da."
  },
  {
    id: 49,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "Zertarako balio du <code class='inline-code'>pb.redirectErrorStream(true)</code> ezartzeak?",
    aukerak: [
      "Errore guztiak isilpean gorde eta pantailatik kentzeko.",
      "Errore-korrontea (<code class='inline-code'>stderr</code>) eta irteera arrunta (<code class='inline-code'>stdout</code>) korronte bakar batean bateratzeko.",
      "Aplikazioak akats bat duenean automatikoki berrabiarazteko.",
      "Fitxategiak bakarrik irakurtzeko moduan irekitzeko."
    ],
    zuzena: 1,
    azalpena: "Bi korronteak bateratzean, programatzaileak korronte bakarra irakurri behar du 'getInputStream()' bidez, mezu arruntak zein erroreak elkarrekin jasoz."
  },
  {
    id: 50,
    gaia: "Java Prozesuen Kudeaketa",
    enuntziatua: "2. Atazako kodean zergatik erabili zen <code class='inline-code'>komandoa.split(\"\\\\s+\")</code>?",
    aukerak: [
      "Testuko letra guztiak maiuskula bihurtzeko.",
      "Zuriune bat edo gehiagoren arabera banatzeko, programa eta parametroak bereiziz.",
      "Komandoaren letra kopurua zenbatzeko.",
      "Fitxategiaren luzapena (.exe) ezabatzeko."
    ],
    zuzena: 1,
    azalpena: "'\\s+' adierazpen erregularrak espazio bat edo gehiago hartzen ditu; horrela 'notepad.exe fitx.txt' bi zatitan banatzen da garbi ProcessBuilder-entzat."
  },

  // =========================================================================
  // 4. GAIA: HARIAK (THREADS) ETA MULTITHREADING JAVAN (51-64)
  // =========================================================================
  {
    id: 51,
    gaia: "Hariak eta Multithreading",
    enuntziatua: "Zergatik esaten zaie hariei (<code class='inline-code'>Threads</code>) 'prozesu arinak'?",
    aukerak: [
      "Datu gutxiago erabiltzen dituztelako eta ez dutelako matematikarik egiten.",
      "Prozesuaren memoria bera partekatzen dutelako eta testuinguru-aldaketa askoz merkeagoa delako.",
      "Bakarrik sareko konexio txikietarako balio dutelako.",
      "Ez dutelako prozesadorearen nukleorik behar exekutatzeko."
    ],
    zuzena: 1,
    azalpena: "Hari berri bat sortzeak ez du memoria-espazio isolatu berririk eskatzen; prozesuaren Heap bera partekatzen dute, eta horregatik txandakatzea oso azkarra da."
  },
  {
    id: 52,
    gaia: "Hariak eta Multithreading",
    enuntziatua: "Zer gertatzen da hari batean harrapatu gabeko errore larri bat gertatzen bada?",
    aukerak: [
      "Sistema eragileak ordenagailua berrabiarazi egingo du unean.",
      "Kudeatu ezean, hari hori hiltzeaz gain prozesu osoa erorarazi dezake.",
      "Beste hariek automatikoki konponduko dute errorea.",
      "Ez du inolako eraginik, hariak guztiz isolatuta daudelako."
    ],
    zuzena: 1,
    azalpena: "Prozesu ezberdinen artean isolamendua dago (batek huts egiteak ez die besteei eragiten), baina hariak prozesu beraren baitan daudenez, salbuespen larri batek aplikazio osoa itzal dezake."
  },
  {
    id: 53,
    gaia: "Hariak eta Multithreading",
    enuntziatua: "Java-n hariak sortzeko zein bide da GOMENDATUENA?",
    aukerak: [
      "`Thread` klasetik heredatzea (<code class='inline-code'>extends Thread</code>).",
      "`Runnable` interfazea inplementatzea (<code class='inline-code'>implements Runnable</code>).",
      "`System.createThread()` deitzea zuzenean.",
      "Bakarrik C lengoaiako JNI liburutegiak erabiltzea."
    ],
    zuzena: 1,
    azalpena: "Javak ez du herentzia anitzik onartzen. 'Runnable' inplementatuz klaseak beste klase baten oinordeko izaten jarrai dezake (adib. 'extends JFrame implements Runnable')."
  },
  {
    id: 54,
    gaia: "Hariak eta Multithreading",
    enuntziatua: "Zer gertatzen da objektu bati <code class='inline-code'>haria.run()</code> deitzen badiogu <code class='inline-code'>haria.start()</code> deitu beharrean?",
    aukerak: [
      "Ez da hari berririk sortzen; deia egin duen uneko hariaren barruan exekutatzen da sekuentzialki.",
      "Sistema eragileak errore sintaktiko bat botatzen du eta JVM gelditu egiten da.",
      "Haria lehentasun bikoitzarekin hasten da atzeko planoan lanean.",
      "Haria betirako blokeatuta geratzen da 'start()' deitu arte."
    ],
    zuzena: 0,
    azalpena: "'start()' metodoak sistema eragileari eskatzen dio hari berri bat sortzea eta bertan 'run()' abiaraztea. 'run()' zuzenean deituz gero, metodo arrunt bat bezala exekutatzen da uneko haria blokeatuz."
  },
  {
    id: 55,
    gaia: "Harien Egoerak",
    enuntziatua: "Zein da hari baten hasierako egoera <code class='inline-code'>new Thread(...)</code> egin ondoren, <code class='inline-code'>start()</code> deitu aurretik?",
    aukerak: [
      "`RUNNABLE`",
      "`NEW`",
      "`BLOCKED`",
      "`WAITING`"
    ],
    zuzena: 1,
    azalpena: "Haria instantziatu da baina oraindik ez da abiarazi. Bere egoera 'NEW' da; 'start()' deitzean 'RUNNABLE' egoerara pasatuko da."
  },
  {
    id: 56,
    gaia: "Harien Egoerak",
    enuntziatua: "Zein egoeratan dago hari bat <code class='inline-code'>Thread.sleep(1000)</code> deitu ondoren?",
    aukerak: [
      "`RUNNABLE`",
      "`TIMED_WAITING`",
      "`BLOCKED`",
      "`TERMINATED`"
    ],
    zuzena: 1,
    azalpena: "Denbora-muga jakin bat duten itxaronaldiek ('sleep(ms)', 'join(ms)', 'wait(ms)') 'TIMED_WAITING' egoeran uzten dute haria, denbora agortzean berriz 'RUNNABLE' bihurtzeko."
  },
  {
    id: 57,
    gaia: "Harien Egoerak",
    enuntziatua: "Zein egoeratan dago hari bat bloke <code class='inline-code'>synchronized</code> batean sartzeko giltzaren zain dagoenean?",
    aukerak: [
      "`WAITING`",
      "`BLOCKED`",
      "`TIMED_WAITING`",
      "`NEW`"
    ],
    zuzena: 1,
    azalpena: "Beste hari batek monitorearen giltza (lock) hartuta badauka, sartu nahi duen haria 'BLOCKED' egoeran geratzen da giltza libre geratu arte."
  },
  {
    id: 58,
    gaia: "Harien Egoerak",
    enuntziatua: "Noiz iristen da hari bat <code class='inline-code'>TERMINATED</code> egoerara?",
    aukerak: [
      "`Thread.sleep()` deia amaitzen denean.",
      "Bere `run()` metodoa osorik amaitu denean edo kudeatu gabeko salbuespen batek eten duenean.",
      "Erabiltzaileak teklatuaren zuriune-barra sakatzean.",
      "Sistema eragileak hariari quantum-a kentzen dionean."
    ],
    zuzena: 1,
    azalpena: "'run()' metodoaren azken lerrora iristen denean, hariaren bizi-zikloa amaitu egiten da eta 'TERMINATED' egoerara pasatzen da; ezin da berriz 'start()' deitu."
  },
  {
    id: 59,
    gaia: "Harien Koordinazioa",
    enuntziatua: "Zer egiten du <code class='inline-code'>haria.join()</code> metodoak?",
    aukerak: [
      "Bi hari elkarrekin batu eta hari bakar bihurtzen ditu.",
      "Deia egin duen haria zain geratzen da deitutako haria guztiz amaitu arte (<code class='inline-code'>TERMINATED</code>).",
      "Hariaren abiadura azkartu egiten du lehenago amaitu dadin.",
      "Hariaren lehentasuna txikiagotu egiten du ilaran."
    ],
    zuzena: 1,
    azalpena: "Adibidez, hari nagusiak langile-hari baten emaitza behar badu, 'langilea.join()' deituko du, eta bertan geratuko da geldirik langileak 'run()' amaitu arte."
  },
  {
    id: 60,
    gaia: "Harien Koordinazioa",
    enuntziatua: "Zer egiten du <code class='inline-code'>Thread.yield()</code> metodoak?",
    aukerak: [
      "Haria berehala suntsitu eta baliabide guztiak askatzen ditu.",
      "Planifikatzaileari iradokitzen dio uneko haria prest dagoela bere PUZ txanda beste bati uzteko.",
      "Haria zehaztutako milisegundoetan lo uzten du.",
      "Hariaren lehentasuna maila gorenera igotzen du."
    ],
    zuzena: 1,
    azalpena: "'yield()' adeitasun-keinu bat da: planifikatzaileari esaten dio prest dagoela txanda uzteko, baina ez dago bermatuta sistemak kasu egingo dionik."
  },
  {
    id: 61,
    gaia: "Harien Koordinazioa",
    enuntziatua: "Zergatik dago gaitzetsia (<code class='inline-code'>deprecated</code>) <code class='inline-code'>Thread.stop()</code> metodoa?",
    aukerak: [
      "Java lengoaia motelagoa egiten duelako.",
      "Haria bat-batean hiltzen duelako, blokeoak askatuz eta datuak egoera inkonsistentean utziz.",
      "C++ konpilatzaileak onartzen ez duelako.",
      "Bakarrik Android sistemetan dagoelako debekatuta."
    ],
    zuzena: 1,
    azalpena: "'stop()'-ek haria edozein puntutan mozten du. Hari hori datu-egitura bat aldatzen ari bazen, datuak erdi-idatzita geratuko dira. Horregatik debekatuta dago."
  },
  {
    id: 62,
    gaia: "Harien Koordinazioa",
    enuntziatua: "Nola gelditu behar da hari bat modu garbi eta seguruan?",
    aukerak: [
      "`System.exit(0)` deituz klase guztietatik.",
      "Kontrol-bandera boolear bat (<code class='inline-code'>volatile boolean martxan</code>) edo <code class='inline-code'>interrupt()</code> erabiliz.",
      "Hariaren lehentasuna 0 jarriz.",
      "Kablea fisikoki deskonektatuz."
    ],
    zuzena: 1,
    azalpena: "Hariaren begiztak 'while(martxan)' aztertu behar du. Gelditu nahi denean 'martxan = false' jarri eta 'interrupt()' deitzen da (sleep-ean badago esnatzeko), bere 'run()' garbi amai dadin."
  },
  {
    id: 63,
    gaia: "Swing eta Hariak",
    enuntziatua: "Zergatik EZ da egin behar ataza luze bat Swing-eko <code class='inline-code'>EDT</code> (Event Dispatch Thread) barruan?",
    aukerak: [
      "EDTak ezin duelako fitxategirik irakurri segurtasun-arauengatik.",
      "EDTak marrazketa eta klikak kudeatzen dituelako; blokeatuz gero interfaze osoa izoztu egiten da.",
      "Leihoa automatikoki pantailatik desagertuko litzatekeelako.",
      "PUZaren nukleo guztiak desaktibatu egingo liratekeelako."
    ],
    zuzena: 1,
    azalpena: "Swing 'single-threaded' da: EDT hari bakarrak marrazten du pantaila eta entzuten ditu botoiak. Ataza luze bat bertan exekutatzen bada, leihoak ez du erantzungo ('Izoztuta')."
  },
  {
    id: 64,
    gaia: "Swing eta Hariak",
    enuntziatua: "Atzeko haritik interfaze grafikoa eguneratzeko zein metodo erabili BEHAR da?",
    aukerak: [
      "Zuzenean deitu: `botoia.setText(\"Kaixo\");`",
      "`SwingUtilities.invokeLater(Runnable)` erabiliz aldaketa EDT-ren ilaran sartzeko.",
      "`Thread.currentThread().sleep(100);` eginez.",
      "`System.gc();` deituz memorian lekua egiteko."
    ],
    zuzena: 1,
    azalpena: "Swing osagaiak ez dira hari-seguruak (non-thread-safe). EDT ez den beste hari batetik UI aldatzeko 'SwingUtilities.invokeLater()' erabili behar da nahitaez."
  },

  // =========================================================================
  // 5. GAIA: SINKRONIZAZIOA, ESKUALDE KRITIKOAK, SEMAFOROAK ETA MONITOREAK (65-72)
  // =========================================================================
  {
    id: 65,
    gaia: "Sinkronizazioa",
    enuntziatua: "Zer da 'Eskualde Kritikoa' (<code class='inline-code'>Critical Section</code>)?",
    aukerak: [
      "Sistema eragilearen instalazio-karpeta babestua.",
      "Baliabide partekatua erabiltzen duen kode zatia, elkar-bazterketan eta modu atomikoan exekutatu beharrekoa.",
      "Prozesadorearen tenperatura gehiegi igotzen denean sortzen den errore-eremua.",
      "Datu-baseko taula bat ezabatzeko agindua."
    ],
    zuzena: 1,
    azalpena: "Eskualde kritikoa hainbat harik batera uki dezaketen baliabidea erabiltzen duen kodea da. Une bakoitzean hari bakarrak exekutatu behar du, datuen sendotasuna bermatzeko."
  },
  {
    id: 66,
    gaia: "Sinkronizazioa",
    enuntziatua: "Zein da eskualde kritikoak diseinatzeko urrezko arau nagusietako bat?",
    aukerak: [
      "Ahalik eta kode gehien babestea, metodo osoak barruan sartuz.",
      "Gutxieneko kodea babestea: soilik baliabide partekatua ukitzen duten instrukzioak sartu behar dira.",
      "Eskualde kritikoaren barruan beste ataza luze batzuk exekutatzea.",
      "Beti aldagai global guztiak ezabatzea eskualde kritikotik irtetean."
    ],
    zuzena: 1,
    azalpena: "Eskualde kritikoa ahalik eta laburrena izan behar da. Eragiketa luzeak (adib. I/O, kalkulu astunak) kanpoan utzi behar dira, beste hariak alferrik ez blokeatzeko."
  },
  {
    id: 67,
    gaia: "Sinkronizazioa",
    enuntziatua: "Zergatik saihestu behar da 'Itxaronaldi Aktiboa' (<code class='inline-code'>Busy Waiting / Polling</code>)?",
    aukerak: [
      "Javak ez duelako `while` begiztarik onartzen harien barruan.",
      "PUZ zikloak xahutzen dituelako begizta huts batean, eta datua sortu behar duenari baliabideak kentzen dizkiolako.",
      "Disko gogorra betetzen duelako testu-fitxategiekin.",
      "Sareko konexioaren IP helbidea aldatzen duelako."
    ],
    zuzena: 1,
    azalpena: "Itxaronaldi aktiboak ('while(!prest){}') PUZa %100ean erretzen du. Soluzio zuzena blokeo-mekanismoak erabiltzea da: haria lotan geratzen da eta seinale batek esnatuko du."
  },
  {
    id: 68,
    gaia: "Semaforoak",
    enuntziatua: "Nola funtzionatzen du Dijkstraren semaforo baten <code class='inline-code'>wait()</code> (P) eragiketak balioa 0 denean?",
    aukerak: [
      "Balioari 1 gehitzen dio eta aurrera jarraitzen du.",
      "Deia egin duen haria blokeatu egiten du eta itxaron-ilaran sartzen du.",
      "Balioa negatibo bihurtzen du eta errore bat jaurtitzen du.",
      "Aplikazio osoa berrabiarazten du automatikoki."
    ],
    zuzena: 1,
    azalpena: "Semaforoaren balioa > 0 bada, wait()-ek balioa jaisten du eta pasatzen uzten du. Balioa 0 bada, ezin da sartu: haria blokeatu egiten da beste batek signal() deitu arte."
  },
  {
    id: 69,
    gaia: "Semaforoak",
    enuntziatua: "Zer desberdintasun dago Semaforo Bitarraren (<code class='inline-code'>Mutex</code>) eta Zenbatzeko Semaforoaren artean?",
    aukerak: [
      "Bitarrak 0 eta 1 balioak soilik ditu (elkar-bazterketa); Zenbatzekoak N baliabide aske kontrola ditzake.",
      "Bitarrak zenbaki bikoitiak zenbatzen ditu eta besteak bakoitiak.",
      "Bitarra fitxategietarako da eta Zenbatzekoa pantailarako.",
      "Bitarrak bi hari uzten ditu aldi berean sartzen eta besteak bat bakarra."
    ],
    zuzena: 0,
    azalpena: "Mutex-ak giltza bakarra du (sarbide esklusiboa). Zenbatzeko semaforo batek (Counting Semaphore) baliabide berdin anitzen kopurua kontrolatzen du (adib. 5 konexioko pool bat)."
  },
  {
    id: 70,
    gaia: "Monitoreak eta Synchronized",
    enuntziatua: "Java-n zer gertatzen da hari bat metodo edo bloke <code class='inline-code'>synchronized</code> batean sartzen denean?",
    aukerak: [
      "Hariaren abiadura bikoiztu egiten da besteak baino lehenago bukatzeko.",
      "Objektuaren monitorearen blokeoa (lock / giltza) eskuratzen du; beste hariek itxaron egin behar dute giltza askatu arte.",
      "Datu guztiak disko gogorrean gordetzen dira segurtasun kopia gisa.",
      "Haria automatikoki bi hari berritan banatzen da."
    ],
    zuzena: 1,
    azalpena: "Java-ko objektu orok blokeo inplizitu bat du. 'synchronized' blokean sartzean hariak giltza hartzen du; giltza askatu arte beste inor ezin da sartu objektu horren kode sinkronizatuan."
  },
  {
    id: 71,
    gaia: "Irakurle-Idazle Arazoa",
    enuntziatua: "Irakurle-Idazle arazo klasikoan, zein da sarbide-araua?",
    aukerak: [
      "Idazle asko sar daitezke batera, baina irakurle bakarra une bakoitzean.",
      "Hainbat irakurle aldi berean sar daitezke; idazleak, ordea, sarbide esklusiboa behar du bakarrik egoteko.",
      "Inor ezin da sartu bi baino gehiago badira.",
      "Irakurleek eta idazleek beti batera sartu behar dute bikoteka."
    ],
    zuzena: 1,
    azalpena: "Irakurtzeak ez ditu datuak aldatzen; beraz, hainbat irakurle aldi berean sartzea segurua da. Baina idazketa batek datuak aldatzen dituenez, elkar-bazterketa zorrotza behar du."
  },
  {
    id: 72,
    gaia: "Sinkronizazioa",
    enuntziatua: "Kotxe Lasterketaren ariketan, zergatik erabili zen <code class='inline-code'>synchronized(giltza)</code> auto batek helmuga zeharkatzean?",
    aukerak: [
      "Kotxeen aurrerapen-barraren kolorea aldatzeko.",
      "Bi auto aldi berean iritsiz gero, auto BATEK BAKARRIK irabazle mezua ezar dezan lasterketa-baldintza ekidinez.",
      "Kotxeak azkarrago ibil daitezen zirkuituan zehar.",
      "Swing interfazearen leihoa ez dadin pantailatik mugitu."
    ],
    zuzena: 1,
    azalpena: "Lau autoak paraleloan dabiltza. Biek distantzia maximoa une berean gaindituko balute, sinkronizaziorik gabe biek irabazle izendatuko lukete beren burua. Lock-ak irabazle bakarra bermatzen du."
  },

  // =========================================================================
  // 6. GAIA: 5 ARAZOAK, BILDUMAK ETA TIMER / TIMER_TASK (73-80)
  // =========================================================================
  {
    id: 73,
    gaia: "5 Arazoak: Deadlock",
    enuntziatua: "Coffman-en 4 baldintzetatik, zein apurtzen da <code class='inline-code'>Resource Ordering</code> (Baliabideen Ordenamendu Zorrotza) erabiliz?",
    aukerak: [
      "Elkarrekiko Bazterketa (Mutual Exclusion).",
      "Itxaronaldi Zirkularra (<code class='inline-code'>Circular Wait</code>), blokeoak beti ordena finko berean eskatzen direlako.",
      "Desjabetzerik eza (No Preemption).",
      "Eutsi eta Itxaron (Hold and Wait)."
    ],
    zuzena: 1,
    azalpena: "Hari guztiek blokeoak beti ordena berean eskuratzen badituzte (adib. beti lehenik Kontu1 eta ondoren Kontu2), ezinezkoa da mendetasun-ziklo itxi bat sortzea (Circular wait ezabatzen da)."
  },
  {
    id: 74,
    gaia: "5 Arazoak: Inanizioa",
    enuntziatua: "Lanketa IVko praktikan, nola konpondu zen Inanizioa (<code class='inline-code'>Starvation</code>) lehentasun baxuko haria baztertua geratu ez zedin?",
    aukerak: [
      "`Thread.sleep(5000)` deituz hari bakoitzean.",
      "`new ReentrantLock(true)` (Fair Lock) erabiliz, harien arteko FIFO ilara bidezkoa ezartzeko.",
      "`volatile` hitz gakoa gehituz aldagai guztiei.",
      "Lehentasun baxuko haria ezabatuz."
    ],
    zuzena: 1,
    azalpena: "'new ReentrantLock(true)' ezartzean (fairness = true), giltza eskatzen lehena iritsi denari ematen zaio txanda (FIFO), hari guztiek sarbide kopuru orekatua lortuz."
  },
  {
    id: 75,
    gaia: "5 Arazoak: Race Condition",
    enuntziatua: "Zergatik ez da atomikoa <code class='inline-code'>kontagailua++</code> eragiketa makina-mailan?",
    aukerak: [
      "Konpilatzaileak zenbaki negatibo bihurtzen duelako.",
      "3 mikro-agindutan banatzen delako: Irakurri RAMetik, Gehitu 1 erregistroan, eta Idatzi RAMen.",
      "Bakarrik hari bakarreko programetan funtzionatzen duelako.",
      "Memoria nagusian lekurik ez duelako hartzen."
    ],
    zuzena: 1,
    azalpena: "Read-Modify-Write sekuentzia da. Bi harik aldi berean irakurtzen badute balio bera, biek 1 gehituko diote eta balio bera idatziko dute; beraz, gehitze bat galdu egiten da. Soluzioa: AtomicInteger edo synchronized."
  },
  {
    id: 76,
    gaia: "5 Arazoak: Memoria Inkontsistentzia",
    enuntziatua: "Zertarako balio du <code class='inline-code'>volatile</code> hitz gakoak Java aldagaiekin?",
    aukerak: [
      "Aldagaia konstante bihurtzen du sekula aldatu ez dadin.",
      "Irakurketa eta idazketa guztiak RAM nagusitik zuzenean egitea bermatzen du, CPU katxeen desfasajeak saihestuz.",
      "Aldagaia fitxategi batean gordetzen du diskoan.",
      "Aldagaiaren tamaina automatikoki bikoizten du."
    ],
    zuzena: 1,
    azalpena: "'volatile'-k ikusgarritasuna (visibility) bermatzen du: hari batek balioa aldatzen duenean, beste nukleo guztiek berehala ikusten dute balio berria RAMetik, beren katxe lokaleko balio zaharkitua erabili beharrean."
  },
  {
    id: 77,
    gaia: "5 Arazoak: Slipped Conditions",
    enuntziatua: "Zer da Lerratutako Baldintza bat (<code class='inline-code'>Slipped Condition / Check-then-Act</code>)?",
    aukerak: [
      "Programa baten kodea beste fitxategi batera mugitzea.",
      "Baldintza bat egiaztatu eta ekintza burutu artean beste hari batek egoera aldatzea.",
      "if baldintzaren barruan else ez idaztea.",
      "Haria itxaronaldi aktiboan betiko geratzea."
    ],
    zuzena: 1,
    azalpena: "Adibidez, 'if (saldoa >= 100)' egiaztatu eta dirua atera artean beste hari batek saldoa hustu badu, kontua negatiboan geratuko da. Soluzioa: egiaztapena eta ekintza bloke sinkronizatu berean biltzea."
  },
  {
    id: 78,
    gaia: "Java Bildumak",
    enuntziatua: "Hari anitzeko ingurune batean, zein klase da gomendagarria <code class='inline-code'>HashMap</code> arruntaren ordez?",
    aukerak: [
      "`ArrayList`",
      "`ConcurrentHashMap`, segmentuka blokeatzen duelako (Lock Striping) irakurketak libre utziz.",
      "`HashSet`",
      "`StringBuilder`"
    ],
    zuzena: 1,
    azalpena: "HashMap arrunta ez da hari-segurua. 'ConcurrentHashMap'-ek sarbide paralelo oso azkarrak eskaintzen ditu giltzape segmentatuen bidez, irakurketak sekula blokeatu gabe."
  },
  {
    id: 79,
    gaia: "Timer eta TimerTask",
    enuntziatua: "Luzatze-ataza bat 2 segundora lehenik abiatu eta ondoren 10 segundoro errepikatzeko, zein deia da ZUZENA?",
    aukerak: [
      "`timer.start(ataza, 2000, 10000);`",
      "`timer.scheduleAtFixedRate(ataza, 2000L, 10000L);`",
      "`ataza.run(2000, 10000);`",
      "`Thread.sleep(2000); timer.repeat(10000);`"
    ],
    zuzena: 1,
    azalpena: "'timer.scheduleAtFixedRate(task, delay, period)' metodoak hasierako itxaronaldia ('delay', ms) eta errepikatze-tartea ('period', ms) jasotzen ditu."
  },
  {
    id: 80,
    gaia: "Timer eta TimerTask",
    enuntziatua: "Luzatze-ariketan nola bistaratu zen abisua Windows-eko jakinarazpen-eremuan (<code class='inline-code'>System Tray</code>)?",
    aukerak: [
      "`JOptionPane.showMessageDialog` deituz.",
      "`SystemTray` instantziari `TrayIcon` bat gehituz eta `trayIcon.displayMessage(...)` deituz.",
      "`System.out.println` deituz kontsolan.",
      "`ProcessBuilder` bidez mezulari bat irekiz."
    ],
    zuzena: 1,
    azalpena: "AWT-ko 'SystemTray.getSystemTray().add(trayIcon)' bidez ikonoa ataza-barran kokatzen da, eta 'trayIcon.displayMessage()' bidez Windows-eko jakinarazpen natiboa ateratzen da."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GALDERA_BANKUA };
}
