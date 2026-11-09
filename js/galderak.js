/**
 * ZPP (Zerbitzu eta Prozesuen Programazioa) - 1. Ebaluaketako Galdera-Banku Osoa (80 GALDERA)
 * 
 * Hobekuntza Aurreratuak:
 * 1. 80 galdera teoriko osoak klaseko gai guztiak xehetasunez lantzeko.
 * 2. ERANTZUNEN LUZERA OREKATUAK: Erantzun okerrak (distractors) berdin-berdin
 *    xehatuak, sakonak eta sinesgarriak dira. Luzerak ez du sekula erantzun zuzena salatzen!
 * 3. Hitz gakoak, klaseak eta metodoak <code class="inline-code"> bidez koloreztatuta.
 * 4. A, B, C, D erantzunen posizioak oreka zehatzean banatuta.
 */

const GALDERA_BANKUA = [
  {
    "id": 1,
    "gaia": "Sarrera eta Prozesadoreak",
    "enuntziatua": "Nukleo bakarreko (<code class='inline-code'>Single-Core</code>) PUZ batean hainbat ataza aldi berean exekutatzen direla dirudienean, zer gertatzen da benetan hardware mailan?",
    "aukerak": [
      "Hardwarearen barneko L1 eta L2 katxeek paralelismo fisikoa garatzen dute aldi berean hainbat kalkulu eginez.",
      "PUZak denbora-tarte txikiak txandakatzen ditu (<code class='inline-code'>time-slicing</code>), aldiberekotasun simulatua sortuz.",
      "Sistema eragileak ataza guztiak sekuentzialki ilara bakar batean metatzen ditu eta multzoka azkarrago ebazten ditu.",
      "Prozesadorearen erloju-maiztasuna bikoiztu egiten da ataza bakoitzari bere nukleo birtual propioa eskaintzeko."
    ],
    "zuzena": 1,
    "azalpena": "Nukleo bakarreko PUZ batean une bakoitzean agindu bakarra gauzatzen da. Sistema eragilearen planifikatzaileak denbora-tarte txikiak (zenbait milisegundo) esleitzen dizkie atazei txandaka, giza begiarentzat aldibereko ilusioa sortuz."
  },
  {
    "id": 2,
    "gaia": "Sarrera eta Prozesadoreak",
    "enuntziatua": "Konparatu Intel 80486 (1989) eta gaur egungo Intel Core i7 prozesadore moderno bat. Zein baieztapen da ZUZENA?",
    "aukerak": [
      "Intel Core i7-ak GHz abiadura, nukleo anitzak eta <code class='inline-code'>Hyper-Threading</code> bidez hari logiko ugari eskaintzen ditu.",
      "Intel 486ak 64 biteko arkitektura zuen eta zortzi nukleo integratu zituen lehen aldiz merkatuko zerbitzari handietan.",
      "Intel 486ak erloju-maiztasun handiagoa lortzen zuen (5 GHz inguru), baina siliziozko transistore gutxiago zituen barruan.",
      "Bi prozesadoreek 32 biteko arkitektura bera mantentzen dute eta L3 motako katxe memoria partekatua dute oinarrian."
    ],
    "zuzena": 0,
    "azalpena": "Intel 486ak 25-50 MHz, 32 bit eta nukleo bakarra zituen (~1.2 milioi transistore). Core i7 modernoek GHz-tako maiztasuna, 8-24 nukleo, Hyper-Threading eta 24-36 MB L3 katxe dituzte."
  },
  {
    "id": 3,
    "gaia": "Programazio Lengoaiak",
    "enuntziatua": "Nola sailkatzen da Java programazio-lengoaia konpilazio eta exekuzio ereduari dagokionez?",
    "aukerak": [
      "Lengoaia konpilatu hutsa da (C bezala), kode iturburua zuzenean x86 makina-kodera itzultzen delako aldez aurretik.",
      "Lengoaia interpretatu hutsa da (Python bezala), kodea unean bertan lerroz lerro irakurri eta gauzatzen baita.",
      "Lengoaia deklaratiboa da (SQL bezala), ez baitu inolako tarteko fitxategirik ezta exekuzio-ingurunerik behar.",
      "Lengoaia hibridoa da: Bytecodera konpilatu eta JVMk interpretatzen du."
    ],
    "zuzena": 3,
    "azalpena": "Javak 'Write Once, Run Anywhere' printzipioa du: javac-ek Java kodea plataforma-independentea den Bytecode bihurtzen du (.class), eta sistema bakoitzeko JVMk (JIT konpilatzaile bidez) hardwareari egokitzen dio."
  },
  {
    "id": 4,
    "gaia": "Kontzeptu Oinarrizkoak",
    "enuntziatua": "Zein da desberdintasun zehatza 'Programa' baten eta 'Prozesu' baten artean?",
    "aukerak": [
      "Programa erabiltzaileak fitxategian idazten duen testua da, eta prozesua sareko komunikazio-bide bati deitzen zaio.",
      "Programa kode pasiboa da diskoan; prozesua, aldiz, exekuzioan dagoen programa aktiboa da RAMen.",
      "Ez dago inolako desberdintasunik kontzeptu hauetan, sistema eragilearen dokumentazioan sinonimoak baitira.",
      "Programa RAM memorian kargatutako datu-egitura da, eta prozesua disko gogorrean gordetako exekutagarria da."
    ],
    "zuzena": 1,
    "azalpena": "Programa entitate pasiboa da (kode iturburua edo exekutagarria diskoan). Prozesua entitate aktiboa da: RAMen dago, PIDa du, baliabideak esleituta ditu eta PUZ denbora jasotzen du."
  },
  {
    "id": 5,
    "gaia": "Kontzeptu Oinarrizkoak",
    "enuntziatua": "Zer da 'Zerbitzu' bat (Windows-en Service, Linux-en Daemon)?",
    "aukerak": [
      "Atzeko planoan (<code class='inline-code'>background</code>), GUI gabe martxan dagoen prozesu iraunkor bat.",
      "Erabiltzailearen mahaigainean leiho grafiko interaktibo bat irekitzen duen aplikazio arrunta.",
      "Fitxategiak diskotik ezabatzeko sistema eragilearen kernelak exekutatzen duen agindu azkar bat.",
      "Prozesadorearen nukleo fisiko bat aldi baterako desaktibatzen duen tenperatura-kontrolagailua."
    ],
    "zuzena": 0,
    "azalpena": "Zerbitzuak (daemons) erabiltzailearen zuzeneko interakziorik gabe atzeko planoan lanean ari diren prozesu iraunkorrak dira (adib. spoolsv.exe inprimatzeko, web zerbitzariak, sshd)."
  },
  {
    "id": 6,
    "gaia": "Sistema Banatuak",
    "enuntziatua": "Zein da sistema banatuen (<code class='inline-code'>Distributed Systems</code>) ezaugarri nagusia?",
    "aukerak": [
      "Nodo guztiek fisikoki memoria nagusi (RAM) bera partekatzen dute abiadura handiko bus baten bidez.",
      "Lana sare bidez lotutako ordenagailuetan banatzen da, mezuak trukatuz elkarlanean aritzeko.",
      "Sistema eragilearen kernel bakar batek zuzentzen ditu sareko ordenagailu guztien hardware baliabideak.",
      "Nodo bakoitzak ezin du besteekin komunikatu, segurtasun arrazoiengatik erabat isolatuta baitaude."
    ],
    "zuzena": 1,
    "azalpena": "Sistema banatuetan ordenagailu independenteek ez dute memoria fisikorik partekatzen; sare-protokoloen (TCP/IP, RPC, REST) bidez trukatzen dituzte mezuak elkarlanean aritzeko."
  },
  {
    "id": 7,
    "gaia": "Programazio Lengoaiak",
    "enuntziatua": "Lengoaia konpilatuen (adib. C, C++) alde onena eta txarrena zeintzuk dira?",
    "aukerak": [
      "Web nabigatzaileetan bakarrik exekuta daitezke, baina segurtasun handia eskaintzen dute moteltasunaren truke.",
      "Ez dute inolako konpilatzailerik behar exekutatzeko, baina RAM memoria asko xahutzen dute ziklo bakoitzean.",
      "Exekuzio-abiadura maximoa dute, baina ez dira eramangarriak (sistema bakoitzerako berriz konpilatu behar da).",
      "Oso eramangarriak dira sistema guztietan, baina exekuzio-abiadura oso motela dute interpretazioaren ondorioz."
    ],
    "zuzena": 2,
    "azalpena": "Konpilatutako kodea zuzenean makina-kodera (.exe, ELF) bihurtzen denez, abiadura eta errendimendua gorenekoak dira, baina sistema eragile eta arkitektura zehatzari estuki lotuta daude."
  },
  {
    "id": 8,
    "gaia": "Programazio Lengoaiak",
    "enuntziatua": "Zer da <code class='inline-code'>JIT</code> (Just-In-Time) konpilatzailea Java-ren JVM barruan?",
    "aukerak": [
      "Klaseak disko gogorretik automatikoki garbitzen dituen zabor-biltzailearen osagai osagarri bat.",
      "Maiz erabilitako Bytecode-a exekuzio-unean bertan makina-kode natibo bihurtzen duen mekanismoa.",
      "Java kodearen sintaxi akatsak testu-editorean azpimarratzen dituen garapen-inguruneko gehigarria.",
      "Sareko konektagarritasuna uneoro aztertzen duen komunikazio-protokolo kriptografiko bat."
    ],
    "zuzena": 1,
    "azalpena": "JIT konpilatzaileak JVMren errendimendua biderkatzen du: gehien erabiltzen diren Bytecode zatiak ('hot spots') unean bertan makina-kode erreal bihurtzen ditu, etengabeko interpretazioa saihestuz."
  },
  {
    "id": 9,
    "gaia": "Kontzeptu Oinarrizkoak",
    "enuntziatua": "Zer gertatzen da fitxategi exekutagarri batekin erabiltzaileak klik bikoitza egiten dionean?",
    "aukerak": [
      "Fitxategia RAMera kargatzen da, SEak PCB eta PID esleitzen dizkio eta prozesu bihurtzen da.",
      "Fitxategia berriz konpilatzen da diskoan segurtasun-kopia berri bat sortuz sistema osoan zehar.",
      "Sistema eragileak fitxategiaren kodea sareko urruneko zerbitzari batera bidaltzen du aztertzeko.",
      "Prozesadorearen nukleo fisiko guztiak itzali egiten dira fitxategiaren sinadura digitala ikusi arte."
    ],
    "zuzena": 0,
    "azalpena": "Diskoan dagoen fitxategi pasiboa sistema eragilearen kargatzaileak (loader) RAMera ekartzen du, bere helbide-eremua sortzen du, PCB prestatu eta 'Prest' (Ready) egoeran jartzen du."
  },
  {
    "id": 10,
    "gaia": "Sarrera eta Prozesadoreak",
    "enuntziatua": "Zer adierazten du prozesadore baten erloju-maiztasunak (adib. 4.2 GHz)?",
    "aukerak": [
      "Ordenagailuak Internetetik fitxategiak deskargatzeko duen gehienezko transmisio-abiadura fisikoa.",
      "Memoria nagusiak (RAM) biltegiratu dezakeen informazio-bolumen osoa gigabytetan neurtuta.",
      "Prozesadoreak segundoko exekutatu ditzakeen oinarrizko erloju-zikloen kopurua.",
      "Txipak bere tenperatura egonkor mantentzeko behar duen haizagailuaren bira-kopurua minutuko."
    ],
    "zuzena": 2,
    "azalpena": "Hertz-ak (Hz) segundoko zikloak dira. 4.2 GHz = segundoko 4.200 milioi ziklo. Ziklo bakoitzean PUZak instrukzio zati bat gauzatu dezake."
  },
  {
    "id": 11,
    "gaia": "Sarrera eta Prozesadoreak",
    "enuntziatua": "Zer da <code class='inline-code'>Hyper-Threading</code> teknologia Intel prozesadore modernoetan?",
    "aukerak": [
      "Nukleo bakoitzari tenperatura jaisteko aukera ematen dion barne-zirkuituko hozte-sistema adimenduna.",
      "Disko gogorreko fitxategiak automatikoki RAM memorian bikoizten dituen cache-hardware azkarra.",
      "Nukleo fisiko bakoitza sistema eragilearen aurrean bi nukleo logiko gisa aurkezteko gaitasuna.",
      "Sareko kableen bidez datuak azkarrago transmititzeko plaka basean integratutako txip berezia."
    ],
    "zuzena": 2,
    "azalpena": "Hyper-Threading-ek (SMT) nukleo fisiko baten barneko erregistroak bikoizten ditu. Horrela, nukleo fisiko batek 2 hari logiko kudea ditzake aldi berean, arkitekturaren erabilera optimizatuz."
  },
  {
    "id": 12,
    "gaia": "Kontzeptu Oinarrizkoak",
    "enuntziatua": "Zein ataletan banatzen da prozesu baten memoria-eremua RAM memorian?",
    "aukerak": [
      "Testua (Kodea), Datuak (Globalak), Heap (Dinamikoa) eta Stack (Deien Pila eta Tokikoak).",
      "Sektorea, Pista zirkularra, Zilindro magnetikoa eta Partizio nagusiaren abio-sektorea.",
      "Kernel gunea, Erregistro orokorrak, BIOS bufferra eta Swap fitxategiaren indize-orriak.",
      "HTML fitxategia, CSS estiloak, JavaScript logika eta Irudien kaxako memoria-segmentuak."
    ],
    "zuzena": 0,
    "azalpena": "Prozesu baten helbide-eremuak 4 atal ditu: Testua (agindu bitarrak), Datuak (aldagai estatiko/globalak), Heap ('new' bidez sortutako objektuak) eta Stack (metodoen deiak eta tokiko aldagaiak)."
  },
  {
    "id": 13,
    "gaia": "Prozesuak eta PCB",
    "enuntziatua": "Zer datu gordetzen ditu <code class='inline-code'>PCB</code> (Process Control Block) egiturak?",
    "aukerak": [
      "Erabiltzailearen pasahitza eta ordenagailuaren lizentzia-zenbaki digitalaren ziurtagiri enkriptatua.",
      "Aplikazioak sarean kontsultatu dituen webguneen eta cookie-en zerrenda osoa kronologikoki.",
      "PIDa, prozesuaren egoera, Program Counter (PC), erregistroak, lehentasuna eta memoria-mugak.",
      "Konpilatzaileak sortutako errore sintaktikoen eta ohar guztien erregistro historiko osoa diskoan."
    ],
    "zuzena": 2,
    "azalpena": "PCB prozesuaren kontrol-fitxa da kernelarentzat: bertan daude PIDa, uneko egoera, PC (hurrengo aginduaren helbidea), CPU erregistroak, memoria-mapa eta irekitako fitxategien taula."
  },
  {
    "id": 14,
    "gaia": "Prozesuak eta PCB",
    "enuntziatua": "Zer da <code class='inline-code'>Testuinguru-aldaketa</code> (Context Switch) eta zer eragin du sisteman?",
    "aukerak": [
      "Sistema eragilearen hizkuntza aldatzean leihoak birkargatzeko abiarazten den prozedura grafikoa.",
      "PUZak prozesu bat utzi eta bestea hartzeko egoerak gorde/kargatzea; gainkarga dakar.",
      "Aplikazio batek fitxategi bat diskotik irakurtzean egiten duen memoria-kopia azkarraren prozesua.",
      "Erabiltzaile batek saioa amaitu eta beste batek saio berria hasteko behar den baimen-egiaztapena."
    ],
    "zuzena": 1,
    "azalpena": "Testuinguru-aldaketan PUZak uneko prozesuaren erregistroak bere PCBean gordetzen ditu eta hurrengoarenak kargatzen ditu. Une horretan PUZak ez du lan erabilgarririk egiten; beraz, gainkarga da (overhead)."
  },
  {
    "id": 15,
    "gaia": "Planifikazio Mailak",
    "enuntziatua": "Zertaz arduratzen da <code class='inline-code'>Epe luzeko planifikatzailea</code> (Long-term scheduler)?",
    "aukerak": [
      "CPU librea geratzean prest daudenen artean hurrengoa hautatzeaz milisegundo bakoitzean.",
      "Sistema eragilean prozesu berriak noiz onartu erabakitzeaz eta multiprogramazio-maila finkatzeaz.",
      "Memoria nagusia betetzen denean prozesuak swap eremura bidaltzeaz espazioa libratzeko.",
      "Sareko paketeen bideratze-bide motzena kalkulatzeaz bideratzaile nagusiaren protokoloan."
    ],
    "zuzena": 1,
    "azalpena": "Epe luzekoak sistemako prozesu kopuru osoa (multiprogramazio maila) kontrolatzen du, diskoan dauden eskaerak memorian noiz onartu erabakiz."
  },
  {
    "id": 16,
    "gaia": "Planifikazio Mailak",
    "enuntziatua": "Zertaz arduratzen da <code class='inline-code'>Epe ertaineko planifikatzailea</code> (Medium-term scheduler)?",
    "aukerak": [
      "PUZaren hurrengo instrukzioa zein nukleotan gauzatuko den berehala erabakitzeaz.",
      "Erabiltzailearen teklatuko tekla-sakatze bakoitza aztertu eta interpretatzeaz.",
      "Memoria nagusia libratzeko prozesuak disko osagarrira (Swap) eramateaz (<code class='inline-code'>Swapping</code>).",
      "Aplikazioak ixtean disko gogorra desfragmentatzeaz fitxategien antolaketa hobetzeko."
    ],
    "zuzena": 2,
    "azalpena": "Epe ertainekoak Swapping-a kudeatzen du: RAM gainkargatuta badago, prozesu batzuk disko osagarrira (Swap) mugitzen ditu ('Esekia' egoeretara) lekua egiteko."
  },
  {
    "id": 17,
    "gaia": "Planifikazio Mailak",
    "enuntziatua": "Zertaz arduratzen da <code class='inline-code'>Epe laburreko planifikatzailea</code> (CPU Scheduler)?",
    "aukerak": [
      "Prest dauden prozesuen artean PUZaren hurrengo txanda zeini eman erabakitzeaz.",
      "Prozesu berriak sortzeko fitxategi exekutagarriak diskotik irakurtzeaz RAMera.",
      "Aplikazioen lizentziak egiaztatzeaz Interneteko zerbitzari nagusiaren bidez.",
      "Segurtasun kopiak automatikoki hodeira igotzeaz egunero ordu zehatz batean."
    ],
    "zuzena": 0,
    "azalpena": "CPU Scheduler-a milisegundoro aritzen da lanean: 'Prest' daudenen ilaratik zein prozesuri emango dion PUZa hautatzen du, planifikazio-algoritmoaren arabera."
  },
  {
    "id": 18,
    "gaia": "Prozesuen Egoerak",
    "enuntziatua": "Prozesu bat 'EXEKUZIOAN' egoeratik 'BLOKEATUA' egoerara igarotzen da zergatik?",
    "aukerak": [
      "Esleitutako denbora-kuantua (Quantum) agortu zaiolako eta beste prozesu bati txanda utzi behar diolako.",
      "Kanpoko gertaera baten zain geratu delako (adib. S/I eragiketa edo baliabide baten zain).",
      "Bere lana behar bezala amaitu duelako eta sistema eragileari amaiera-kodea jakinarazi nahi diolako.",
      "Memoria nagusia agortu eta sistema eragileak disko osagarriko swap partiziora eraman duelako."
    ],
    "zuzena": 1,
    "azalpena": "Prozesu batek ezin badu aurrera egin kanpoko zerbaiten zain dagoelako (fitxategi bat irakurri, sarea, erabiltzailearen sarrera), 'Blokeatua' egoerara pasatzen da eta PUZa askatzen du."
  },
  {
    "id": 19,
    "gaia": "Prozesuen Egoerak",
    "enuntziatua": "Zer da 'ESEKIA-PREST' (Suspended Ready) egoera?",
    "aukerak": [
      "Prozesua RAMen dago, baina erabiltzaileak teklatu bidez aldi baterako eten du.",
      "Prozesua diskoan (Swap) dago, baina ez du S/I gertaerarik itxaroten; RAMera itzultzeko prest dago.",
      "Prozesuak errorea eman du eta sistema eragilea memoria-iraulketa (dump) egiten ari da.",
      "Prozesua sareko datuak jasotzen ari da zuzenean txartel grafikoko memoriara."
    ],
    "zuzena": 1,
    "azalpena": "Eseki egoerak diskoan (Swap) dauden prozesuak dira. 'Esekia-Prest' dagoena exekutatzeko prest dago, bere kodea berriz RAMera kargatu bezain laster."
  },
  {
    "id": 20,
    "gaia": "Prozesuen Egoerak",
    "enuntziatua": "Nola igarotzen da prozesu bat 'BLOKEATUA' egoeratik 'PREST' egoerara?",
    "aukerak": [
      "CPU Scheduler-ak lehentasun handiagoa esleitu diolako uneko ilara zirkularrean.",
      "Itxaroten ari zen S/I eragiketa edo kanpoko gertaera amaitu denean.",
      "Erabiltzaileak saguaren botoia sakatu duelako aplikazioaren leihoaren gainean.",
      "Prozesadorearen erlojuak ziklo berri bat hasi duelako sistema eragilearen nukleoan."
    ],
    "zuzena": 1,
    "azalpena": "Gertaera bukatzean (adibidez diskoko datuak irakurri direnean), hardwareak etendura (interrupt) sortzen du eta SEak prozesua 'Prest' ilarara pasatzen du, PUZa berriz jasotzeko zain."
  },
  {
    "id": 21,
    "gaia": "SE Komandoak",
    "enuntziatua": "Windows-en zein komandok erakusten du martxan dauden prozesuen zerrenda zehatza PIDarekin?",
    "aukerak": [
      "get-process-list /all /verbose",
      "tasklist",
      "show processes --active --pid",
      "winproc -list -details"
    ],
    "zuzena": 1,
    "azalpena": "Windows-en 'tasklist' komandoak uneko prozesuak, haien PID zenbakia, saio mota eta memoria-erabilera zerrendatzen ditu kontsolan."
  },
  {
    "id": 22,
    "gaia": "SE Komandoak",
    "enuntziatua": "Nola amaitzen da Windows-en PID=4520 duen prozesu bat kontsolatik behartuta (force)?",
    "aukerak": [
      "taskkill /PID 4520 /F",
      "kill -force 4520 /windows",
      "stop-process --id 4520 --kill",
      "terminate /proc 4520 /now"
    ],
    "zuzena": 0,
    "azalpena": "Windows-en: taskkill /PID 4520 /F (/F = Force). Linux-en baliokidea: kill -9 4520 litzateke."
  },
  {
    "id": 23,
    "gaia": "SE Komandoak",
    "enuntziatua": "Linux-en zein da uneko prozesuen zerrenda osoa ikusteko komando estandarra?",
    "aukerak": [
      "show-all-jobs -u",
      "procmon --linux",
      "ps aux",
      "list-tasks -a"
    ],
    "zuzena": 2,
    "azalpena": "Linux-en 'ps aux' (edo 'ps -ef') komandoak sistemako erabiltzaile guztien prozesu aktiboak zerrendatzen ditu PID, CPU eta RAM ehunekoekin."
  },
  {
    "id": 24,
    "gaia": "Prozesuen Komunikazioa (IPC)",
    "enuntziatua": "Zergatik behar dute prozesuek <code class='inline-code'>IPC</code> (Inter-Process Communication) elkarrekin komunikatzeko?",
    "aukerak": [
      "Prozesu bakoitzak bere memoria-eremu isolatu propioa duelako eta ezin duelako bestearena zuzenean irakurri.",
      "Sistema eragileak hariak bakarrik onartzen dituelako sare bidezko datuak bidaltzeko unean bertan.",
      "Prozesadorearen erlojuak prozesu bakoitza maiztasun desberdin batean exekutatzen duelako hardwarean.",
      "Fitxategi-sistemak fitxategi guztiak blokeatzen dituelako aplikazio bat abiarazten den bakoitzean."
    ],
    "zuzena": 0,
    "azalpena": "Prozesuak isolatuta daude segurtasunagatik (memoria-babesa). Horregatik, ezin dute elkarren RAMa irakurri; SEak eskainitako bideak behar dituzte (hodiak/pipes, socketak, memoria partekatua)."
  },
  {
    "id": 25,
    "gaia": "Prozesuen Komunikazioa (IPC)",
    "enuntziatua": "Zer desberdintasun dago komunikazio <code class='inline-code'>Sinkrono</code> eta <code class='inline-code'>Asinkronoaren</code> artean?",
    "aukerak": [
      "Sinkronoan igorlea blokeatu egiten da hartzaileak mezua jaso arte; asinkronoan berehala aurrera doa.",
      "Sinkronoan testu hutsa bakarrik bidal daiteke, eta asinkronoan edozein datu bitar transmiti daiteke saretik.",
      "Sinkronoan kable bidezko konexioa behar da, eta asinkronoan Wi-Fi bidezko haririk gabeko lotura nahikoa da.",
      "Sinkronoan mezuak disko gogorrean gordetzen dira beti, eta asinkronoan CPUren erregistroetan bakarrik."
    ],
    "zuzena": 0,
    "azalpena": "Sinkronoan igorleak eta hartzaileak koordinatu egin behar dute (igorleak itxaron egiten du). Asinkronoan igorleak mezua ilaran (bufferrean) utzi eta lanean jarraitzen du itxaron gabe."
  },
  {
    "id": 26,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Zer desberdintasun dago planifikazio-algoritmo <code class='inline-code'>Apropos</code> (Preemptive) eta <code class='inline-code'>Ez-apropos</code> (Non-preemptive) artean?",
    "aukerak": [
      "Aproposak memoria nagusia baino ez du erabiltzen, eta ez-aproposak disko osagarriko swap partizioa soilik.",
      "Aproposak prozesuari CPUa kendu diezaioke; ez-aproposak prozesuak berak CPUa borondatez askatu arte itxaroten du.",
      "Aproposak lehentasun txikiko atazak bakarrik onartzen ditu, eta ez-aproposak kernelaren zerbitzuak soilik.",
      "Aproposak erloju-zikloak bikoizten ditu, eta ez-aproposak hardware-nukleo bakarra mantentzen du piztuta beti."
    ],
    "zuzena": 1,
    "azalpena": "Aproposetan (preemptive) SEak prozesuari CPUa kendu diezaioke (adibidez quantum-a agortzean edo lehentasun handiagoa iristean). Ez-aproposetan prozesua amaitu edo blokeatu arte ez da kentzen."
  },
  {
    "id": 27,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Nola funtzionatzen du <code class='inline-code'>FCFS</code> (First-Come, First-Served) algoritmoak?",
    "aukerak": [
      "Hurrengo CPU-bolada laburrena duen prozesuari ematen dio beti lehentasuna itxaron-denbora murrizteko asmoz.",
      "Denbora-tarte finko bat (quantum) banatzen du txandaka prozesu guztien artean ilara zirkular batean.",
      "Iritsiera-ordenan esleitzen du CPUa eta ez-aproposa da; prozesu luze batek atzekoak geldiarazi ditzake.",
      "Prozesuak haien memoria-beharren arabera ordenatzen ditu txikienetik handienera CPUra sartzeko."
    ],
    "zuzena": 2,
    "azalpena": "FCFS ilara sinplea da: lehenengo iritsi dena lehenengo exekutatzen da amaitu arte. Eragozpen nagusia 'Konboi efektua' da (prozesu luze batek labur guztiak blokeatzen ditu)."
  },
  {
    "id": 28,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Zer da <code class='inline-code'>Konboi Efektua</code> (Convoy Effect) FCFS algoritmoan?",
    "aukerak": [
      "Hainbat harik aldi berean sareko baliabide bera eskatzean gertatzen den datu-paketeen talka eta galera fisikoa.",
      "Sistema eragileak disko gogorraren burua leku batetik bestera etengabe mugitu behar izatea fitxategiak irakurtzeko.",
      "Memoria nagusian lekurik ez dagoenean prozesu guztiak aldi berean swap eremura mugitzeko atzerapen handia.",
      "Prozesu labur askok prozesu luze baten atzean itxaron behar izatea, batez besteko itxaron-denbora asko handituz."
    ],
    "zuzena": 3,
    "azalpena": "Supermerkatuko ilaran erosketa-orga leporaino beteta duen baten atzean ogi bakarra erosi nahi duten pertsona asko itxaroten geratzea bezalakoa da."
  },
  {
    "id": 29,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Nola funtzionatzen du <code class='inline-code'>Round Robin (RR)</code> algoritmoak?",
    "aukerak": [
      "Prozesu bakoitzari denbora-kuantu (<code class='inline-code'>Quantum</code>) finko bat ematen zaio txandaka ilara zirkular batean.",
      "Lehentasun altueneko prozesuari CPU osoa ematen dio amaitu arte, beste guztiak blokeatuta utziz.",
      "Amaitzeko denbora laburrena geratzen zaion prozesua hautatzen du beti hurrengo txandarako.",
      "Fitxategien tamainaren arabera ordenatzen ditu prozesuak disko gogorrean exekutatu aurretik."
    ],
    "zuzena": 0,
    "azalpena": "Round Robin sistema partekatu eta interaktiboetarako egokiena da. Prozesu bakoitzak 'q' denbora du; agortzean, 'Prest' ilararen amaierara doa eta hurrengoari ematen zaio CPUa."
  },
  {
    "id": 30,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Round Robin algoritmoan, zer gertatzen da kuantua (<code class='inline-code'>q</code>) OSO HANDIA bada ((q \to infty))?",
    "aukerak": [
      "Algoritmoa Shortest Process First (SPF) bihurtzen da automatikoki memoriaren arabera.",
      "Testuinguru-aldaketa gehiegi gertatuko dira eta CPUak errendimendu osoa galduko du.",
      "Sistema eragileak ezin izango du prozesu berririk onartu RAM memoriako ilaretan.",
      "Algoritmoa FCFS bihurtzen da praktikan, prozesuak amaitu arte ez baitira kenduko."
    ],
    "zuzena": 3,
    "azalpena": "Kuantua infinitua balitz, inori ez litzaioke inoiz CPUa kenduko bere borondatez utzi edo amaitu arte; beraz, FCFS bilakatuko litzateke."
  },
  {
    "id": 31,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Round Robin algoritmoan, zer gertatzen da kuantua (<code class='inline-code'>q</code>) OSO TXIKIA bada (adib. 1 ms baino gutxiago)?",
    "aukerak": [
      "Prozesu luzeak inoiz ez dira amaituko eta sistemako hari guztiek gosea jasango dute.",
      "Testuinguru-aldaketen gainkargak (overhead) CPU denbora gehiena alferrik xahutuko du.",
      "Sistemak FCFS algoritmoaren portaera bera garatuko du prozesu laburrekin bakarrik.",
      "Memoria nagusiak ezin izango du hainbeste aldagai aldi berean kargatu hardwarean."
    ],
    "zuzena": 1,
    "azalpena": "Kuantua oso txikia bada, CPUak denbora gehiago pasatuko du prozesuen erregistroak gorde eta kargatzen (testuinguru-aldaketa) benetako lana egiten baino."
  },
  {
    "id": 32,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Nola funtzionatzen du <code class='inline-code'>SPF / SPN</code> (Shortest Process First) algoritmoak?",
    "aukerak": [
      "Iritsiera-ordenan exekutatzen du prozesu bakoitza amaitu arte inolako etendurarik gabe.",
      "Denbora-tarte finko laburrak banatzen ditu prozesu guztien artean txanda zirkularretan.",
      "Hurrengo CPU-bolada (burst) laburrena duen prozesua hautatzen du; ez-aproposa da.",
      "Lehentasun administratibo handiena duen prozesua hautatzen du erabiltzailearen arabera."
    ],
    "zuzena": 2,
    "azalpena": "SPFk kalkulu-denbora txikiena behar duena sartzen du. Batez besteko itxaron-denbora txikiena lortzen du, baina zaila da aurrez jakitea prozesu batek zenbat denbora beharko duen."
  },
  {
    "id": 33,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Nola funtzionatzen du <code class='inline-code'>SRT</code> (Shortest Remaining Time) algoritmoak?",
    "aukerak": [
      "SPFren bertsio aproposa da: amaitzeko denbora gutxien geratzen zaionari ematen dio CPUa.",
      "Iritsiera-ordenan exekutatzen du prozesu bakoitza amaitu arte inolako etendurarik gabe.",
      "Lehentasun finkoen bidez antolatzen ditu prozesuak erabiltzailearen baimenen arabera.",
      "Prozesu luzeei ematen die lehentasuna memoria nagusia lehenbailehen libratzeko asmoz."
    ],
    "zuzena": 0,
    "azalpena": "SRTn, prozesu berri bat iristean amaitzeko uneko prozesuak baino denbora gutxiago behar badu, unekoari CPUa kendu eta berriari ematen zaio (preemption)."
  },
  {
    "id": 34,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Zer da <code class='inline-code'>Inanizioa</code> (Starvation) SPF eta SRT algoritmoetan?",
    "aukerak": [
      "Memoria nagusia agortzean sistema eragilearen kernelak funtzionatzeari uztea bat-batean.",
      "Prozesu luzeek inoiz CPUrik ez lortzea, ataza laburragoak etengabe iristen direlako.",
      "Bi prozesuk elkarren baliabideak betiko blokeatuta edukitzea zirkulu itxi baten barruan.",
      "Txiparen tenperatura gehiegi igotzean erloju-maiztasuna jaistea hozteko helburuarekin."
    ],
    "zuzena": 1,
    "azalpena": "Inanizioa (gosez hiltzea): lehentasun txikiko edo exekuzio luzeko prozesuek inoiz ez dute CPUrik eskuratzen ataza laburragoak sartzen jarraitzen badute."
  },
  {
    "id": 35,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Nola konpontzen da Inanizioa algoritmo horietan?",
    "aukerak": [
      "Prozesu luze guztiak automatikoki bertan behera utziz eta errore-kode bat bueltatuz.",
      "Kuantuaren tamaina zero segundora jaitsiz prest dauden prozesu guztien ilaretan.",
      "<code class='inline-code'>Zahartze</code> (Aging) teknikaren bidez: itxaroten daraman denboraren arabera lehentasuna igoz.",
      "Memoria nagusiaren edukiera bikoiztuz prozesu guztiak aldi berean kargatu ahal izateko."
    ],
    "zuzena": 2,
    "azalpena": "Zahartzeak (Aging) bermatzen du prozesu batek zenbat eta denbora gehiago eman 'Prest' ilaran itxaroten, orduan eta lehentasun handiagoa izango duela, azkenean CPUa lortuz."
  },
  {
    "id": 36,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Nola antolatzen dira <code class='inline-code'>Multilevel Feedback Queues</code> (Maila anitzeko berrelikaduradun ilarak)?",
    "aukerak": [
      "Ilara bakar bat dago eta bertan prozesuak fitxategiaren tamainaren arabera ordenatzen dira.",
      "Lehentasun desberdineko ilarak daude; prozesuak kuantua agortzen badu beheko ilarara jaisten da.",
      "Prozesu bakoitzak bere ilara propioa du eta ez da inoiz beste ilara batera mugitzen sisteman.",
      "Sistemako zerbitzuek bakarrik erabil ditzakete ilarak, erabiltzailearen aplikazioek ez."
    ],
    "zuzena": 1,
    "azalpena": "Goiko ilarek kuantu txikia dute (interaktiboentzat aproposa). CPU asko behar duten prozesuak beheko ilaretara jaisten dira (kuantu handiagoarekin edo FCFSrekin)."
  },
  {
    "id": 37,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Prozesu batek (T_e) (Itxaron-denbora) kalkulatzeko formula zein da?",
    "aukerak": [
      "(T_e = T_s \times 2) (Zerbitzu-denbora bider bi ziklo).",
      "(T_e = T_a - T_s - T_i) (Amaiera ken Zerbitzu-denbora eta ken Iritsiera).",
      "(T_e = T_a + T_i) (Amaiera-unea gehi Iritsiera-unea batuz).",
      "(T_e = T_s / Quantum) (Zerbitzu-denbora zati kuantuaren tamaina)."
    ],
    "zuzena": 1,
    "azalpena": "Itxaron-denbora da prozesua sisteman egon den denbora osoa ((T_r = T_a - T_i)) ken benetan CPUa erabiltzen eman duen denbora ((T_s)): (T_e = T_r - T_s)."
  },
  {
    "id": 38,
    "gaia": "Planifikazio Algoritmoak",
    "enuntziatua": "Zer da Itzulera Denbora Normalizatua ((T_r / T_s))?",
    "aukerak": [
      "Prozesuak disko gogorrean okupatzen duen espazioaren eta RAM memoriaren arteko erlazioa.",
      "Sistema eragileak testuinguru-aldaketan galtzen duen segundu kopuru osoaren indizea.",
      "Zerbitzu-denborarekiko itxaronaldi erlatiboa neurtzen duen indizea; zenbat eta gertuago 1etik, hobea.",
      "CPUaren tenperaturaren eta erloju-maiztasunaren arteko zatidura erlatiboa hardwarean."
    ],
    "zuzena": 2,
    "azalpena": "(T_r / T_s) indizeak erakusten du prozesu batek bere kalkulu-denboraren multiplo zenbat itxaron behar izan duen. 1.0 balio ideala da (ez du batere itxaron)."
  },
  {
    "id": 39,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zergatik da gomendagarria <code class='inline-code'>ProcessBuilder</code> erabiltzea zaharkitutako <code class='inline-code'>Runtime.getRuntime().exec()</code> ordez?",
    "aukerak": [
      "Runtime.exec() ezin da Windows sisteman erabili, Linux sistema eragileetarako bakarrik garatu baitzen.",
      "ProcessBuilder-ek argumentuak zerrenda gisa (<code class='inline-code'>List&lt;String&gt;</code>) seguru kudeatzen ditu espazio-arazorik gabe.",
      "ProcessBuilder-ek ez du sistema eragilearen baimenik behar fitxategiak irekitzeko edo aldatzeko.",
      "Runtime.exec() klaseak Java 8tik aurrera konpilazio errore larria ematen du beti proiektu guztietan."
    ],
    "zuzena": 1,
    "azalpena": "ProcessBuilder-ek komandoaren parametroak bananduta jasotzen ditu, komatxo, espazio eta segurtasun-arazoak (komando-injekzioa) modu sendoan saihestuz."
  },
  {
    "id": 40,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Nola abiarazten da kanpoko prozesu bat ProcessBuilder erabiliz Javan?",
    "aukerak": [
      "<code class='inline-code'>Process p = pb.run();</code>",
      "<code class='inline-code'>Process p = pb.execute();</code>",
      "<code class='inline-code'>Process p = pb.start();</code>",
      "<code class='inline-code'>Process p = new Process(pb);</code>"
    ],
    "zuzena": 2,
    "azalpena": "ProcessBuilder konfiguratu ondoren, bere 'start()' metodoa deitzen da sistema eragilean prozesu berria sortzeko. Honek 'Process' instantzia bat itzultzen du."
  },
  {
    "id": 41,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Java 9tik aurrera, nola lortzen da Process objektu baten PID zenbakia zuzenean?",
    "aukerak": [
      "<code class='inline-code'>long pid = prozesua.pid();</code>",
      "<code class='inline-code'>int pid = prozesua.getId();</code>",
      "<code class='inline-code'>long pid = System.getProcessId(prozesua);</code>",
      "<code class='inline-code'>String pid = prozesua.getHandle().toString();</code>"
    ],
    "zuzena": 0,
    "azalpena": "Java 9an 'pid()' metodoa gehitu zitzaion Process klaseari, sistema eragilearen gaineko kode natiborik (JNI) erabili gabe PIDa eskuratzeko."
  },
  {
    "id": 42,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zer egiten du <code class='inline-code'>prozesua.waitFor()</code> metodoak?",
    "aukerak": [
      "Prozesua atzeko planora eramaten du eta Java programak berehala jarraitzen du lanean inolako atzerapenik gabe.",
      "Prozesuaren memoria garbitzen du eta CPUaren erabilera zeroan uzten du hurrengo prozesurako lekua eginez.",
      "Prozesuaren kodea birkonpilatzen du akatsik ez dagoela ziurtatzeko sistema eragilearen segurtasun bidez.",
      "Java programa blokeatzen du kanpoko prozesua amaitu arte, eta bere irteera-kodea itzultzen du."
    ],
    "zuzena": 3,
    "azalpena": "'waitFor()' metodoak itxaroten du kanpoko prozesua 'Amaitua' (Terminated) egoerara iritsi arte. Amaitzean irteera-kodea (exit code) itzultzen du (0 = arrakasta)."
  },
  {
    "id": 43,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zer gertatzen da prozesua oraindik martxan badago eta <code class='inline-code'>prozesua.exitValue()</code> deitzen bada?",
    "aukerak": [
      "0 balioa itzultzen du prozesua martxan dagoela adierazteko modu estandarrean sistema eragilean.",
      "<code class='inline-code'>IllegalThreadStateException</code> salbuespena jaurtitzen da prozesua amaitu gabe dagoelako.",
      "-1 balioa itzultzen du eta automatikoki prozesua hiltzen du sistema eragilearen kernela erabiliz.",
      "Java haria blokeatu egiten da prozesua berez amaitu arte inolako errore-mezurik jaurti gabe."
    ],
    "zuzena": 1,
    "azalpena": "'exitValue()' soilik dei daiteke prozesua amaituta dagoenean. Oraindik martxan badago, IllegalThreadStateException salbuespena jaurtiko du."
  },
  {
    "id": 44,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Nola egiaztatzen da Process objektu bat oraindik martxan dagoen?",
    "aukerak": [
      "<code class='inline-code'>boolean bizirik = prozesua.isRunning();</code>",
      "<code class='inline-code'>boolean bizirik = prozesua.isAlive();</code>",
      "<code class='inline-code'>boolean bizirik = prozesua.getStatus() == Status.RUNNING;</code>",
      "<code class='inline-code'>boolean bizirik = prozesua.hasExited() == false;</code>"
    ],
    "zuzena": 1,
    "azalpena": "'isAlive()' metodoak true itzultzen du prozesua oraindik exekuzioan edo blokeatuta badago, eta false amaitu denean."
  },
  {
    "id": 45,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zer desberdintasun dago <code class='inline-code'>destroy()</code> eta <code class='inline-code'>destroyForcibly()</code> metodoen artean?",
    "aukerak": [
      "destroy()-k itxiera arrunta eskatzen du (SIGTERM); destroyForcibly()-k berehala hiltzen du (SIGKILL).",
      "destroy() Linuxerako bakarrik da eta destroyForcibly() Windows sistemarako bakarrik garatu zen.",
      "destroy()-k fitxategiak ezabatzen ditu eta destroyForcibly()-k RAM memoria bakarrik libratzen du diskoan.",
      "Ez dago inolako desberdintasunik metodo hauen artean, biak seinale berarekin aritzen baitira JREan."
    ],
    "zuzena": 0,
    "azalpena": "destroy() eskaera adeitsua da (prozesuak garbiketa egin dezake). destroyForcibly()-k behartu egiten du SEaren bidez prozesua hiltzera (ezin da saihestu)."
  },
  {
    "id": 46,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Nola irakurtzen da kanpoko prozesu baten kontsolako testu-irteera Javan?",
    "aukerak": [
      "<code class='inline-code'>prozesua.getOutputStream()</code> bidez datuak zuzenean idatziz bufferrera.",
      "<code class='inline-code'>prozesua.getInputStream()</code> bidez BufferedReader bat sortuz.",
      "<code class='inline-code'>System.in.read()</code> erabiliz teklatuko sarrera orokorretik modu zuzenean.",
      "<code class='inline-code'>prozesua.getConsoleOutput()</code> metodo estatikoa deituz pantailan."
    ],
    "zuzena": 1,
    "azalpena": "Kontuz izenekin! Kanpoko prozesuaren irteera (stdout) Java programaren sarrera da; horregatik 'prozesua.getInputStream()' erabiltzen da irakurtzeko."
  },
  {
    "id": 47,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zer egiten du <code class='inline-code'>pb.inheritIO()</code> aukerak ProcessBuilder-en?",
    "aukerak": [
      "Prozesuaren fitxategi guztiak diskoan gordetzen ditu segurtasun-kopia gisa berreskuratzeko.",
      "Kanpoko prozesuaren sarrera/irteera Java uneko kontsolara birbideratzen ditu zuzenean.",
      "Prozesuari gurasoaren aldagai guztiak ezabatzen dizkio isolamendu osoa lortzeko memorian.",
      "Prozesua administratzaile baimenekin abiarazten du sistema eragilearen kontrol-gunean."
    ],
    "zuzena": 1,
    "azalpena": "'inheritIO()'-k kanpoko prozesuaren stdout eta stderr zuzenean uneko Javako kontsolan inprimatzea eragiten du, eskuz irakurri beharrik gabe."
  },
  {
    "id": 48,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Nola lortu daiteke sistema eragilean martxan dauden prozesu GUZTIEN zerrenda Java 9+ erabiliz?",
    "aukerak": [
      "<code class='inline-code'>System.getAllProcesses()</code> metodo estatikoaren bidez sisteman.",
      "<code class='inline-code'>Runtime.getRuntime().getProcessList()</code> deituz array batean.",
      "<code class='inline-code'>ProcessBuilder.listAll()</code> deituz uneko kontsolako zerrendan.",
      "<code class='inline-code'>ProcessHandle.allProcesses()</code> bidez Stream bat lortuz."
    ],
    "zuzena": 3,
    "azalpena": "ProcessHandle.allProcesses() metodoak sistema eragileko prozesu guztien Stream<ProcessHandle> itzultzen du, iragazketa eta kontrol osoa ahalbidetuz."
  },
  {
    "id": 49,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zer informazio eskaintzen du <code class='inline-code'>ProcessHandle.Info</code> interfazeak?",
    "aukerak": [
      "Ordenagailuaren lizentzia-zenbakia eta BIOSaren bertsio zehatza uneko hardware-plakan.",
      "Hasiera-ordua (<code class='inline-code'>startInstant</code>), PUZ denbora osoa, komandoa eta erabiltzailea.",
      "Aplikazioak erabili dituen sareko pasahitzak eta datu-baseko taulak segurtasun-giltzan.",
      "Konpilatzaileak sortutako bytecode aginduen zerrenda osoa memoriako mapan kokatuta."
    ],
    "zuzena": 1,
    "azalpena": "info()-k Optional formatuan eskaintzen ditu komandoaren bidea, argumentuak, erabiltzailearen izena, hasiera-unea eta erabilitako CPU denbora."
  },
  {
    "id": 50,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Nola bideratzen dira errore-mezuak (stderr) irteera estandarrera (stdout) ProcessBuilder-en?",
    "aukerak": [
      "<code class='inline-code'>pb.mergeStreams();</code>",
      "<code class='inline-code'>pb.setStdErrToStdOut(true);</code>",
      "<code class='inline-code'>pb.redirectErrorStream(true);</code>",
      "<code class='inline-code'>pb.combineAllOutputs();</code>"
    ],
    "zuzena": 2,
    "azalpena": "'redirectErrorStream(true)' jarrita, errore-irteera eta irteera estandarra elkartu egiten dira, korronte bakar batetik (getInputStream) irakurri ahal izateko."
  },
  {
    "id": 51,
    "gaia": "Hariak eta Multithreading",
    "enuntziatua": "Zein da desberdintasun nagusia Prozesu baten eta Hari (<code class='inline-code'>Thread</code>) baten artean?",
    "aukerak": [
      "Prozesuak Java bakarrik onartzen du eta hariek C++ lengoaia bakarrik erabiltzen dute sistema eragilean.",
      "Hariak disko gogorrean gordetzen dira fitxategi gisa eta prozesuak RAM memorian bakarrik daude uneoro.",
      "Ez dago inolako desberdintasunik, bi terminoek hardware-erregistro berak erabiltzen baitituzte beti.",
      "Prozesuak memoria isolatua du; hariek prozesu bereko Heap memoria eta aldagaiak partekatzen dituzte."
    ],
    "zuzena": 3,
    "azalpena": "Prozesuak 'unitate astunak' dira (helbide-eremu propioa dute). Hariak 'unitate arinak' dira: prozesuaren barruan bizi dira eta Heap memoria partekatzen dute."
  },
  {
    "id": 52,
    "gaia": "Hariak eta Multithreading",
    "enuntziatua": "Zergatik da gomendagarria <code class='inline-code'>implements Runnable</code> erabiltzea <code class='inline-code'>extends Thread</code> ordez?",
    "aukerak": [
      "Javak herentzia anitza ez duelako onartzen; Runnable erabiliz klaseak beste klase bat heda dezake.",
      "extends Thread erabiltzeak konpilazio errore larria ematen duelako Java bertsio modernoetan.",
      "Runnable interfazeak automatikoki prozesadorearen nukleo guztiak blokeatzen dituelako segurtasunez.",
      "extends Thread klaseak ezin duelako inolako metodori dei egin bere kodearen barruan."
    ],
    "zuzena": 0,
    "azalpena": "Klase batek Thread hedatzen badu, ezin du beste klaserik hedatu (adibidez JPanel edo JFrame). Runnable interfaze funtzionala denez, herentzia librea uzten du."
  },
  {
    "id": 53,
    "gaia": "Hariak eta Multithreading",
    "enuntziatua": "Zer gertatzen da hari bati <code class='inline-code'>haria.run()</code> deitzen bazaio <code class='inline-code'>haria.start()</code> deitu beharrean?",
    "aukerak": [
      "Sistema eragileak automatikoki bi hari paralelo abiarazten ditu segurtasuna bermatzeko helburuarekin.",
      "Ez da hari berririk sortzen; deitu duen hari beraren barruan sekuentzialki exekutatzen da metodo arrunt gisa.",
      "IllegalThreadStateException salbuespena jaurtiko da berehala konpilatzailearen bidez metodoan.",
      "Aplikazio osoa itxi egingo da eta sistema eragilearen kontrol-panela irekiko da errorea aztertzeko."
    ],
    "zuzena": 1,
    "azalpena": "start()-ek sistema eragileari eskatzen dio hari berria sortzeko eta haren barruan run() deitzeko. run() eskuz deituz gero, uneko hariaren metodo arrunt bat besterik ez da."
  },
  {
    "id": 54,
    "gaia": "Harien Egoerak",
    "enuntziatua": "Zeintzuk dira Java hari baten 6 egoerak (<code class='inline-code'>Thread.State</code> enum)?",
    "aukerak": [
      "START, RUNNING, SLEEPING, STOPPED, DEAD, SUSPENDED.",
      "BERRIA, PREST, EXEKUZIOAN, BLOKEATUA, ESEKIA, AMAITUA.",
      "NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
      "INIT, ACTIVE, PAUSED, IDLE, FINISHED, ERROR."
    ],
    "zuzena": 2,
    "azalpena": "Javako Thread.State enumak 6 balio zehatz ditu: NEW (sortua), RUNNABLE (exekutatzen edo prest), BLOCKED (monitorraren zain), WAITING (wait/join), TIMED_WAITING (sleep), TERMINATED (amaitua)."
  },
  {
    "id": 55,
    "gaia": "Harien Koordinazioa",
    "enuntziatua": "Zer egiten du <code class='inline-code'>t.join()</code> metodoak?",
    "aukerak": [
      "Bi hariak elkartu egiten ditu metodo bakar bat paraleloan exekutatu dezaten elkarrekin.",
      "Deitu duen haria geldiarazten du 't' hariak bere exekuzio osoa amaitu arte.",
      "Hariaren exekuzioa bertan behera uzten du eta bere memoria garbitzen du unean bertan.",
      "Hariaren lehentasuna maximora igotzen du besteak baino lehenago amaitu dadin zikloetan."
    ],
    "zuzena": 1,
    "azalpena": "Hari nagusiak (main) t.join() deitzen badu, main haria WAITING egoeran geratzen da 't' haria amaitu arte. Horrela bermatzen da emaitzak amaitzean irakurriko direla."
  },
  {
    "id": 56,
    "gaia": "Harien Koordinazioa",
    "enuntziatua": "Zer gertatzen da <code class='inline-code'>Thread.sleep(1000)</code> deitzean?",
    "aukerak": [
      "Ordenagailu osoa itzali egiten da segundu batez tenperatura kontrolatzeko helburuarekin.",
      "Haria betiko blokeatuta geratzen da beste hari batek esnatu arte inolako denbora-mugarik gabe.",
      "Sistemako prozesu guztiak batera gelditzen dira segundu batez CPU erregistroak garbitzeko.",
      "Uneko haria TIMED_WAITING egoerara pasatzen da segundu batez eta PUZa askatzen du."
    ],
    "zuzena": 3,
    "azalpena": "sleep()-ek uneko haria lo jartzen du zehaztutako milisegundoetan. Tarte horretan PUZa beste hariek erabil dezakete. Bukaeran RUNNABLE egoerara itzultzen da."
  },
  {
    "id": 57,
    "gaia": "Harien Koordinazioa",
    "enuntziatua": "Zergatik eskatzen du <code class='inline-code'>Thread.sleep()</code> metodoak <code class='inline-code'>InterruptedException</code> harrapatzea?",
    "aukerak": [
      "Beste hari batek <code class='inline-code'>interrupt()</code> deitu diezaiokeelako lo dagoen bitartean haria esnatzeko.",
      "Hardwareak erlojua gal dezakeelako eta denbora zehatza ez delako bermatzen plaka basean.",
      "Memoria nagusiak loaldian datuak gal ditzakeelako zabor-biltzailearen garbiketa-zikloetan.",
      "Konpilatzaileak ezin duelako milisegundoen kalkulua aldez aurretik egiaztatu metodoan."
    ],
    "zuzena": 0,
    "azalpena": "Hari bat lo edo itxaroten dagoenean beste hari batek 'interrupt()' deitzen badio, loaldia eten egiten da eta InterruptedException jaurtitzen da."
  },
  {
    "id": 58,
    "gaia": "Harien Koordinazioa",
    "enuntziatua": "Zer egiten du <code class='inline-code'>Thread.yield()</code> metodoak?",
    "aukerak": [
      "Haria behin betiko amaiarazten du eta bere baliabide guztiak askatzen ditu sistema osoan.",
      "Hariaren lehentasuna zerora jaisten du eta atzeko planoan jartzen du betiko memorian.",
      "Uneko hariak bere borondatez PUZa uzten du lehentasun bereko beste hari batek aukera izan dezan.",
      "Hariaren egoera disko gogorrean gordetzen du geroago berreskuratzeko helburuarekin."
    ],
    "zuzena": 2,
    "azalpena": "yield() metodoak CPU Scheduler-ari iradokitzen dio uneko haria prest dagoela txanda uzteko lehentasun bereko beste hari bati."
  },
  {
    "id": 59,
    "gaia": "Swing eta Hariak",
    "enuntziatua": "Zer da <code class='inline-code'>EDT</code> (Event Dispatch Thread) Swing-en?",
    "aukerak": [
      "Datu-baseko kontsultak atzeko planoan egiteaz arduratzen den hari berezia proiektuan.",
      "Interfaze grafikoko gertaerak (klikak) prozesatzeaz eta leihoa marrazteaz arduratzen den hari nagusia.",
      "Sareko konexioak etengabe monitorizatzen dituen protokolo-haria komunikazioan.",
      "Fitxategiak diskoan idazteko eta irakurtzeko erabiltzen den sarrera/irteerako hari azkarra."
    ],
    "zuzena": 1,
    "azalpena": "Swing 'hari bakarrekoa' da (Single-Threaded rule). EDT haria da osagai grafikoak marraztu eta botoien klikak kudeatzen dituen bakarra."
  },
  {
    "id": 60,
    "gaia": "Swing eta Hariak",
    "enuntziatua": "Zergatik EZ da inoiz <code class='inline-code'>Thread.sleep()</code> deitu behar Swing botoi baten ekintzaren barruan?",
    "aukerak": [
      "Swing-ek automatikoki botoia ezabatuko lukeelako interfaze grafikotik behin betiko.",
      "Konpilatzaileak errore larria emango lukeelako grafikoetan ezin baita metodo hori erabili.",
      "EDT haria lo geratuko litzatekeelako, leiho osoa izoztuz eta erabiltzailearen klikik onartu gabe.",
      "Prozesadorearen nukleo guztiak itzaliko liratekeelako tenperatura gehiegi igota sisteman."
    ],
    "zuzena": 2,
    "azalpena": "ActionListener-ak EDT barruan exekutatzen dira. Bertan sleep egiten bada, EDT blokeatu egiten da: interfazea ezin da berriz marraztu eta aplikazioa 'Izoztuta' geratzen da."
  },
  {
    "id": 61,
    "gaia": "Swing eta Hariak",
    "enuntziatua": "Nola eguneratu behar da Swing osagai grafiko bat (adib. JLabel) atzeko planoan dabilen hari batetik?",
    "aukerak": [
      "Zuzenean etiketa.setText() deituz atzeko hariaren run() metodoaren barrutik inolako arazorik gabe.",
      "etiketa.repaint() metodoari lehentasuna emanez metodo estatikoen bidezko azterketan.",
      "<code class='inline-code'>SwingUtilities.invokeLater(() -&gt; etiketa.setText(\"...\"))</code> erabiliz.",
      "JFrame berri bat sortuz eta zaharra berehala System.exit(0) bidez itxiz pantailan."
    ],
    "zuzena": 2,
    "azalpena": "Swing hari-segurua ez denez, UI aldaketak beti EDT hariari eskatu behar zaizkio 'SwingUtilities.invokeLater' metodoaren bidez, lasterketa-baldintzak saihesteko."
  },
  {
    "id": 62,
    "gaia": "Harien Koordinazioa",
    "enuntziatua": "Zer da <code class='inline-code'>Daemon Thread</code> (Hari deabrua) Java-n?",
    "aukerak": [
      "Birusak edo kode maltzurrak exekutatzeko erabiltzen den hari berezi bat sistema eragilean.",
      "Inoiz amaitu ezin den eta sistema eragilea blokeatzen duen akats-haria memorian.",
      "Administratzaile baimenekin bakarrik abiarazi daitekeen hari pribilegiatua plataforma guztietan.",
      "Atzeko planoko haria da; hari ez-daemon guztiak amaitzen direnean, JVMk automatikoki hiltzen du."
    ],
    "zuzena": 3,
    "azalpena": "Daemon hariek (adib. Zabor-biltzailea / Garbage Collector) atzeko zerbitzuak ematen dituzte. Erabiltzailearen azken hari arrunta amaitzean, JVM itxi egiten da daemon-ak geldituz."
  },
  {
    "id": 63,
    "gaia": "Sinkronizazioa",
    "enuntziatua": "Zer da <code class='inline-code'>Eskualde Kritikoa</code> (Critical Section)?",
    "aukerak": [
      "Sistema eragilearen pasahitzak eta segurtasun-giltzak gordetzen dituen disko-eremua.",
      "Konpilatzaileak akatsak bilatzeko erabiltzen duen sintaxi-analisirako modulua proiektuan.",
      "Aplikazio batek Interneteko datuak deskargatzeko erabiltzen duen sare-ataka nagusia.",
      "Partekatutako baliabide bat aldatzen duen kode zatia; aldi berean hari bakar batek exekutatu behar du."
    ],
    "zuzena": 3,
    "azalpena": "Eskualde kritikoa aldagai edo datu-egitura partekatuak aldatzen diren eremua da. Elkarrekiko bazterketa (Mutual Exclusion) bermatzen ez bada, datuak hondatu daitezke."
  },
  {
    "id": 64,
    "gaia": "Sinkronizazioa",
    "enuntziatua": "Nola funtzionatzen du Java-ko <code class='inline-code'>synchronized</code> blokeak?",
    "aukerak": [
      "Hariaren exekuzio-abiadura bikoizten du memoria nagusiko katxea erabiliz hardwarean.",
      "Objektu baten barneko giltza (<code class='inline-code'>Intrinsic Lock / Monitor</code>) hartzen du; beste hariak itxaron beharko dute.",
      "Aldagaia fitxategi batean gordetzen du beste prozesuek irakurri ahal izateko diskoan.",
      "Prozesadorearen nukleo guztiak gelditzen ditu agindua amaitu arte tenperatura zaintzeko."
    ],
    "zuzena": 1,
    "azalpena": "Java-ko objektu bakoitzak 'monitor' bat du. Haria synchronized(obj) blokean sartzean lock-a hartzen du, eta irtetean askatzen du. Bitartean beste inor ezin da sartu objektu horrekin."
  },
  {
    "id": 65,
    "gaia": "5 Arazoak: Race Condition",
    "enuntziatua": "Zergatik da <code class='inline-code'>kontagailua++</code> eragiketa lasterketa-baldintza baten iturri (Race Condition)?",
    "aukerak": [
      "++ eragilea Java 17tik aurrera zaharkituta geratu delako eta erroreak ematen dituelako.",
      "Prozesadoreak ezin duelako zenbaki bati bat gehitu aldez aurretik baimenik gabe sisteman.",
      "Ez delako atomikoa: 3 urrats ditu (Irakurri, Gehitu, Idatzi); bi harik balio zaharra irakur dezakete.",
      "Eragiketa horrek RAM memoriako helbide guztiak batera aldatzen dituelako agindu bakarrean."
    ],
    "zuzena": 2,
    "azalpena": "kontagailua++ ez da eragiketa atomiko bakarra. Urratsak: 1) RAMetik irakurri CPUra, 2) 1 gehitu, 3) RAMen idatzi. Bi harik batera egiten badute, gehikuntza bat galdu egiten da."
  },
  {
    "id": 66,
    "gaia": "5 Arazoak: Memoria Inkontsistentzia",
    "enuntziatua": "Zer bermatzen du aldagai bat <code class='inline-code'>volatile</code> deklaratzeak Javan?",
    "aukerak": [
      "Eragiketa konplexu guztiak automatikoki blokeo bidez sinkronizatuko direla kode osoan zehar.",
      "Aldagaiaren balioa ezin izango dela inoiz aldatu 'final' hitz gakoaren moduan metodoetan.",
      "Idazketa eta irakurketa guztiak zuzenean RAM nagusian egingo direla, CPU katxeen desfasajeak saihestuz.",
      "Aldagaia disko gogorreko fitxategi enkriptatu batean gordeko dela automatikoki uneoro."
    ],
    "zuzena": 2,
    "azalpena": "volatile-k 'ikusgaitasuna' (visibility) bermatzen du: hari batek balioa aldatzen duenean, beste hari guztiek berehala ikusten dute RAM nagusitik, katxe desfasajerik gabe."
  },
  {
    "id": 67,
    "gaia": "5 Arazoak: Deadlock",
    "enuntziatua": "Zer da <code class='inline-code'>Deadlock</code> (Hil-blokeoa) eta zeintzuk dira Coffman-en 4 baldintzak?",
    "aukerak": [
      "Memoria nagusia guztiz betetzea: Paginazioa, Segmentazioa, Swapping eta Fragmentazioa sisteman.",
      "Bi hari elkarren baliabideen zain betiko geratzea: Bazterketa, Eutsi eta Itxaron, Kaleratzerik Ez, Zirkularra.",
      "CPUaren tenperatura gehiegi igotzea: Tentsioa, Frekuentzia, Haizagailua eta Nukleoa hardwarean.",
      "Sareko konexioa etetea: Latentzia, Pakete galduak, DNS errorea eta Timeout-a protokoloan."
    ],
    "zuzena": 1,
    "azalpena": "Deadlock-a gertatzeko 4 baldintza hauek aldi berean bete behar dira. Bat apurtuz gero (adibidez Resource Ordering bidez Itxaronaldi Zirkularra saihestuz), Deadlock-a ekiditen da."
  },
  {
    "id": 68,
    "gaia": "5 Arazoak: Deadlock",
    "enuntziatua": "Nola ekiditen da Deadlock-a <code class='inline-code'>Resource Ordering</code> (Baliabideen Ordenamendua) teknikarekin?",
    "aukerak": [
      "Giltza guztiak batera ezabatuz eta sinkronizaziorik gabe programatuz kode osoa metodo guztietan.",
      "Hari bakoitzari bere giltza pribatu propioa emanez besteekin partekatu gabe bere kodean.",
      "Hari guztiek blokeoak BETI ordena finko eta berdinean hartzen dituzte (adib. Lock A lehenik, gero Lock B).",
      "Aplikazioa berrabiaraziz Deadlock bat gertatzen den bakoitzean errorea erregistratu ostean."
    ],
    "zuzena": 2,
    "azalpena": "Giltzak beti ordena globalean hartzen badira (adibidez kontuaren ID txikiena lehenik, handiena gero), sekula ezin da zirkulurik sortu; beraz, Deadlock-a ezinezkoa da."
  },
  {
    "id": 69,
    "gaia": "5 Arazoak: Inanizioa",
    "enuntziatua": "Zer desberdintasun dago Deadlock eta <code class='inline-code'>Inanizioaren</code> (Starvation) artean?",
    "aukerak": [
      "Deadlock-ean hari guztiak betiko blokeatuta daude; Inanizioan sistema aurrera doa, baina hari batek ez du txandarik lortzen.",
      "Deadlock Javan bakarrik gertatzen da eta Inanizioa C++ lengoaiako akats esklusiboa da.",
      "Deadlock-ek fitxategiak ezabatzen ditu eta Inanizioak sareko ataka guztiak ixten ditu.",
      "Ez dago inolako desberdintasunik, termino biak kontzeptu beraren sinonimoak baitira."
    ],
    "zuzena": 0,
    "azalpena": "Deadlock-ean inork ezin du aurrera egin (blokeo zirkularra). Inanizioan beste hariek lanean jarraitzen dute, baina hari zoritxarreko batek ez du inoiz CPU edo giltzarik eskuratzen."
  },
  {
    "id": 70,
    "gaia": "5 Arazoak: Inanizioa",
    "enuntziatua": "Nola saihesten da Inanizioa Java-ko <code class='inline-code'>ReentrantLock</code> erabiliz?",
    "aukerak": [
      "Lock-aren gainean 'synchronized' blokea jarriz segurtasun bikoitza lortzeko metodoan.",
      "Hariaren lehentasuna aldizka zerora jaitsiz besteak azkarrago ibil daitezen zikloetan.",
      "<code class='inline-code'>new ReentrantLock(true)</code> sortuz: 'fairness' gaitzen du eta FIFO ilara bermatzen du.",
      "Lock-aren metodo guztiak 'volatile' deklaratuz aldagai globaletan memoria zaintzeko."
    ],
    "zuzena": 2,
    "azalpena": "new ReentrantLock(true) bidezko lock 'bidezkoa' (fair) da: itxaroten gehien daraman hariari emango dio sarbidea lehenik (FIFO), inor gosez hil ez dadin."
  },
  {
    "id": 71,
    "gaia": "5 Arazoak: Slipped Conditions",
    "enuntziatua": "Zer da <code class='inline-code'>Slipped Conditions</code> (Egoera Lerratuak) arazoa konkurrentzian?",
    "aukerak": [
      "Hariaren erlojuak milisegundoak galtzea prozesadorearen tenperatura altua denean hardwarean.",
      "Hari batek baldintza bat egiaztatu (Check) eta ekintza egin (Act) bitartean beste hari batek egoera aldatzea.",
      "Memoria nagusiko datuak disko gogorrera automatikoki mugitzea swap bidezko transferentzian.",
      "Konpilatzaileak aginduen ordena aldatzea kodea optimizatzeko helburuarekin JVMren barruan."
    ],
    "zuzena": 1,
    "azalpena": "Check-then-Act arazoa: 'if (!beteta)' egiaztatu eta 'gehitu()' egin artean beste hari bat sartu bada, ilara gainezka egin daiteke. Konponbidea: egiaztapena eta ekintza bloke berean babestea."
  },
  {
    "id": 72,
    "gaia": "Semaforoak",
    "enuntziatua": "Nola funtzionatzen du <code class='inline-code'>Semaphore</code> batek Javan?",
    "aukerak": [
      "Trafiko-argi bat erakusten du pantailan interfaze grafikoaren koloreak aldatzeko zikloetan.",
      "Prozesu bakoitzari bere memoria pribatua ematen dio besteek ikusi ez dezaten helbideetan.",
      "Fitxategiak irakurtzeko baimenak egiaztatzen ditu Windows-eko erregistroaren bidez uneoro.",
      "Baimen-kontagailu bat du (<code class='inline-code'>permits</code>): <code class='inline-code'>acquire()</code>-k bat kentzen du eta <code class='inline-code'>release()</code>-k bat gehitzen du."
    ],
    "zuzena": 3,
    "azalpena": "Semaforoak hainbat hariri aldi berean sartzeko baimena eman diezaieke (adibidez 3 konexio aldi berean). permits=1 denean Semaforo Bitarra da (Mutex-en baliokidea)."
  },
  {
    "id": 73,
    "gaia": "Monitoreak eta Synchronized",
    "enuntziatua": "Zer desberdintasun dago <code class='inline-code'>wait()</code> eta <code class='inline-code'>sleep()</code> metodoen artean?",
    "aukerak": [
      "wait() metodoak CPU denbora gehiago kontsumitzen du sleep() baino uneoro erregistroetan.",
      "wait()-ek objektuaren giltza (lock) ASKATZEN du; sleep()-ek giltza EDUKITA jarraitzen du loaldian.",
      "wait() metodoa C++ lengoaiakoa da eta sleep() metodoa Java lengoaiakoa metodoetan.",
      "Ez dago inolako desberdintasunik, bi metodoek portaera bera dute Javan harien artean."
    ],
    "zuzena": 1,
    "azalpena": "Funtsezko galdera! sleep()-ek lock-a mantentzen du (besteak ezin dira sartu). wait()-ek lock-a askatzen du beste hari batek notify() bidez esnatu arte."
  },
  {
    "id": 74,
    "gaia": "Irakurle-Idazle Arazoa",
    "enuntziatua": "Irakurle-Idazle arazoan, zein da baimendutako sarbide eredua?",
    "aukerak": [
      "Idazle guztiek batera idatz dezakete, baina irakurleek banan-banan irakurri behar dute txandan.",
      "Irakurle batek eta idazle batek beti batera sartu behar dute eskualde kritikora une berean.",
      "Hainbat irakurlek batera irakur dezakete; idazle bat dagoenean ezin da beste inor sartu (ez irakurle, ez idazle).",
      "Ez dago inolako mugarik, sistema eragileak automatikoki konpontzen ditu talkak RAMean."
    ],
    "zuzena": 2,
    "azalpena": "Irakurketek ez dute daturik aldatzen (aldi berean egin daitezke). Idazketek datuak aldatzen dituztenez, elkarrekiko bazterketa osoa behar dute (ReentrantReadWriteLock)."
  },
  {
    "id": 75,
    "gaia": "Java Bildumak",
    "enuntziatua": "Zergatik da <code class='inline-code'>ConcurrentHashMap</code> hobea <code class='inline-code'>Collections.synchronizedMap</code> baino?",
    "aukerak": [
      "Ez duelako inolako memoriarik erabiltzen RAMean datuak gordetzeko helburuarekin.",
      "Segmentuen araberako blokeoa (<code class='inline-code'>Lock Striping</code>) duelako; irakurketak ez dira sekula blokeatzen.",
      "Elementuak disko gogorrean automatikoki ordenatzen dituelako gakoen arabera beti.",
      "Java 8 baino lehenagoko bertsioetan bakarrik erabil daitekeelako metodo zaharkituetan."
    ],
    "zuzena": 1,
    "azalpena": "synchronizedMap-ek mapa osoa blokeatzen du edozein eragiketatan. ConcurrentHashMap-ek bloke txikiak bakarrik blokeatzen ditu (Lock Striping), errendimendu izugarria lortuz."
  },
  {
    "id": 76,
    "gaia": "Java Bildumak",
    "enuntziatua": "Noiz da egokia <code class='inline-code'>CopyOnWriteArrayList</code> erabiltzea?",
    "aukerak": [
      "Etengabe milioika elementu gehitu eta kentzen ari garen zerrenda erraldoietan segundoko.",
      "Hari bakar batean lan egiten dugunean memoria aurrezteko helburuarekin metodoetan.",
      "Irakurketa asko eta idazketa gutxi daudenean; idazketa bakoitzean barne-array berri bat kopiatzen du.",
      "Fitxategi bitarrak sare bidez transmititzeko datu-egitura gisa komunikazio guztietan."
    ],
    "zuzena": 2,
    "azalpena": "CopyOnWriteArrayList-ek idazketa bakoitzean array osoa kopiatzen du. Idazketak garestiak dira, baina irakurketak blokeorik gabe eta oso azkar egiten dira (adib. entzule/listener zerrendetan)."
  },
  {
    "id": 77,
    "gaia": "Java Bildumak",
    "enuntziatua": "Nola funtzionatzen du <code class='inline-code'>BlockingQueue</code> egiturak ekoizle-kontsumitzaile ereduan?",
    "aukerak": [
      "Elementuak automatikoki ezabatzen ditu 5 segundu igaro ondoren inork hartu ez baditu.",
      "<code class='inline-code'>put()</code> blokeatu egiten da ilara beteta badago; <code class='inline-code'>take()</code> blokeatu egiten da hutsik badago.",
      "Ekoizleak eta kontsumitzaileak hari berean exekutatzera behartzen ditu sekuentzialki beti.",
      "Ilara betetzen denean salbuespen larria jaurtitzen du eta programa itzali egiten du."
    ],
    "zuzena": 1,
    "azalpena": "BlockingQueue-k eskuzko wait/notify kode konplexua ordezkatzen du: hariak automatikoki blokeatzen dira ilara beteta edo hutsik dagoenean, datu-truke segurua bermatuz."
  },
  {
    "id": 78,
    "gaia": "Timer eta TimerTask",
    "enuntziatua": "Zer desberdintasun dago <code class='inline-code'>schedule()</code> eta <code class='inline-code'>scheduleAtFixedRate()</code> artean Timer klasean?",
    "aukerak": [
      "schedule metodoak milisegundoak erabiltzen ditu eta scheduleAtFixedRate metodoak minutuak bakarrik.",
      "schedule ataza bakarra exekutatzeko da eta scheduleAtFixedRate hiru ataza batera egiteko.",
      "scheduleAtFixedRate errepikapen zehatzetarako da (atzerapenak konpentsatzen ditu); schedule-k tarte erlatiboa mantentzen du.",
      "Ez dago inolako desberdintasunik, bi metodoek erloju bera erabiltzen baitute Javan."
    ],
    "zuzena": 2,
    "azalpena": "scheduleAtFixedRate-k hasierako denborarekiko maiztasun finkoa mantentzen du (erlojuko kanpaiak bezala). schedule-k aurreko exekuzioaren amaierarekiko atzerapena mantentzen du."
  },
  {
    "id": 79,
    "gaia": "Timer eta TimerTask",
    "enuntziatua": "Zergatik da garrantzitsua <code class='inline-code'>timer.cancel()</code> deitzea aplikazioa ixtean?",
    "aukerak": [
      "Timer-ak disko gogorra blokeatuta mantentzen duelako beste programek ezin erabili ahal izateko.",
      "cancel deitu ezean ordenagailuko data eta ordua deskonfiguratu egingo liratekeelako unean.",
      "Sistema eragileak memoria-isuri larria hauteman eta automatikoki berrabiaraziko lukeelako.",
      "Timer-ak background hari bat bizirik mantentzen duelako; cancel deitu ezean JVM ez da inoiz itxiko."
    ],
    "zuzena": 3,
    "azalpena": "Timer-ak ez-daemon motako background hari bat sortzen du bere zereginetarako. 'timer.cancel()' deitu ezean hari hori bizirik geratzen da eta Java aplikazioa ez da sekula amaituko."
  },
  {
    "id": 80,
    "gaia": "Java Prozesuen Kudeaketa",
    "enuntziatua": "Zer eragin du <code class='inline-code'>ProcessBuilder.directory(File dir)</code> metodoak?",
    "aukerak": [
      "Direktorio horretako fitxategi guztiak automatikoki ezabatzen ditu segurtasuna bermatzeko.",
      "Kanpoko prozesuaren lan-direktorioa (<code class='inline-code'>Working Directory</code>) ezartzen du, fitxategi erlatiboak bertatik irekitzeko.",
      "Prozesuaren iturburu-kodea direktorio horretan konpilatzen du exekutatu aurretik diskoan.",
      "Sistema eragilearen instalazio-karpeta nagusia aldatzen du uneko saioan administratzaile gisa."
    ],
    "zuzena": 1,
    "azalpena": "'directory(File)' bidez prozesuaren uneko lan-karpeta zehazten da. Horrela, prozesuak fitxategi erlatiboak karpeta horretan bilatuko ditu."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GALDERA_BANKUA };
}
