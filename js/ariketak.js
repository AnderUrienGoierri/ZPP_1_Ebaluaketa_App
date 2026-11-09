/**
 * ZPP (Zerbitzu eta Prozesuen Programazioa) - Zati Praktikoko Ariketa Banku Osoa
 * 
 * Klaseko ariketa erreal guzti-guztietan oinarrituta:
 * - 2. Ataza: ProzesuExekutatzailea (ProcessBuilder eta ProcessHandle)
 * - Harien Hastapenak (Thread, Runnable, isAlive)
 * - Ariketa 1 & 2 (Zenbaketa paraleloa N harirekin eta join())
 * - Kotxe Lasterketa (Swing, synchronized, volatile)
 * - Kronometroa eta Atzerako Kontaketa (EDT, Thread.sleep, interrupt)
 * - Timer eta TimerTask (LuzatzeAtaza, SystemTray)
 * - Konkurrentziaren 5 Arazoak (Deadlock, Inanizioa, Race Condition, Slipped Conditions, Memory Inconsistency)
 * - Sinkronizazio Aurreratua (Semaphore, CyclicBarrier, CountDownLatch, BlockingQueue, ConcurrentHashMap, ExecutorService, Future)
 */

const PRAKTIKA_DATA = {
  "azalpenak": [
    {
      "id": "prozesuak",
      "izenburua": "2. Ataza: ProzesuExekutatzailea (ProcessBuilder eta ProcessHandle)",
      "deskribapena": "Komando-lerrotik programa bat abiarazi, PID zenbakia lortu, SEaren hasiera-ordua eskuratu eta prozesuaren amaierari itxaron.",
      "fitxategia": "ProzesuExekutatzailea.java",
      "kodea": "// 1. Komandoa eta parametroak banatu espazioen arabera\nString[] zatiak = komandoa.split(\"\\\\s+\");\n\n// 2. ProcessBuilder instantziatu parametro zerrendarekin\nProcessBuilder pb = new ProcessBuilder(zatiak);\n\n// 3. Prozesua abiarazi sistema eragilearen kernelean\nProcess prozesua = pb.start();\n\n// 4. PID zenbakia eskuratu modu eramangarrian (Java 9+)\nlong pid = prozesua.pid();\nSystem.out.println(\"Prozesuaren PIDa: \" + pid);\n\n// 5. Sistema Eragilearen hasiera-une zehatza eskuratu ProcessHandle bidez\nProcessHandle.Info info = prozesua.info();\nif (info.startInstant().isPresent()) {\n    Instant instant = info.startInstant().get();\n    LocalDateTime hasiera = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());\n    System.out.println(\"Hasiera-ordua: \" + hasiera.format(FORMATZAILEA));\n}\n\n// 6. Prozesua amaitu arte itxaron eta bere irteera-kodea (exit code) jaso\nint irteeraKodea = prozesua.waitFor();\nSystem.out.println(\"Prozesua amaitu da kode honekin: \" + irteeraKodea);",
      "kontzeptuak": [
        {
          "lerroa": "ProcessBuilder pb = new ProcessBuilder(zatiak);",
          "azalpena": "ProcessBuilder-ek exekutatuko den programaren izena eta bere argumentuak jasotzen ditu banatuta, komatxo eta espazio arazoak saihesteko."
        },
        {
          "lerroa": "Process prozesua = pb.start();",
          "azalpena": "start() deitzean SEaren kernelak memoria esleitzen du, helbide-eremu berria sortzen du eta prozesua PREST/EXEKUZIOAN jartzen du."
        },
        {
          "lerroa": "long pid = prozesua.pid();",
          "azalpena": "Java 9tik aurrera prozesuaren PID (Process ID) zenbakia zuzenean eskuratzen da platforma-independentzia bermatuz."
        },
        {
          "lerroa": "int irteeraKodea = prozesua.waitFor();",
          "azalpena": "waitFor() metodoak uneko Java haria blokeatzen du kanpoko prozesua AMAITUA egoerara igaro arte. 0 = Arrakasta; 0 != Errorea."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zer gertatuko litzateke 'waitFor()' deitu beharrean zuzenean 'prozesua.exitValue()' deituko bagenu?",
          "erantzuna": "Prozesua oraindik amaitu ez bada, 'IllegalThreadStateException' salbuespena jaurtiko luke JREak."
        },
        {
          "galdera": "Nola behartu dezakegu erantzuten ez duen prozesu bat hiltzera?",
          "erantzuna": "'prozesua.destroyForcibly()' deituz (OS mailan SIGKILL bidaltzen du)."
        }
      ]
    },
    {
      "id": "hariak_hastapenak",
      "izenburua": "Harien Hastapenak: Thread vs Runnable (Ataza.java & Haria.java)",
      "deskribapena": "Hariak sortzeko bi bide nagusiak: Thread hedatzea (extends) ala Runnable inplementatzea (implements), eta haien abantailak.",
      "fitxategia": "Ataza.java / Haria.java",
      "kodea": "// 1. AUKERA GOMENDATUA: Runnable inplementatzea\npublic class Ataza implements Runnable {\n    private String izena;\n    public Ataza(String izena) { this.izena = izena; }\n\n    @Override\n    public void run() {\n        for (int i = 0; i < 10; i++) {\n            System.out.println(\"Ataza: \" + izena + \" -> Zenbakia: \" + i);\n            try {\n                Thread.sleep(500); // 500 ms itxaron (BLOKEATUA egoera)\n            } catch (InterruptedException e) {\n                System.out.println(\"Haria eten da!\");\n                break;\n            }\n        }\n    }\n}\n\n// 2. AUKERA: Thread klasea hedatzea (Herentzia anitza mugatzen du)\npublic class Haria extends Thread {\n    private volatile boolean martxan = true;\n\n    public void gelditu() { this.martxan = false; }\n\n    @Override\n    public void run() {\n        while (martxan) {\n            System.out.println(\"Haria: \" + this.getName() + \" lanean\");\n            try { Thread.sleep(500); } catch (InterruptedException e) { break; }\n        }\n    }\n}\n\n// PROGRAMA NAGUSIA (APP.java):\n// Ataza instantziatu eta Thread berri batean bildu:\nAtaza ataza1 = new Ataza(\"A-Ataza\");\nThread h1 = new Thread(ataza1);\nh1.start(); // <-- start() deitu behar da, EZ run()!",
      "kontzeptuak": [
        {
          "lerroa": "public class Ataza implements Runnable",
          "azalpena": "Runnable interfaze funtzionala da. Klaseak bere herentzia libre mantentzen du beste klase bat hedatu ahal izateko (adibidez JFrame)."
        },
        {
          "lerroa": "h1.start(); (EZ h1.run())",
          "azalpena": "start() metodoak sistema eragilean exekuzio-pila (Call Stack) berria sortzen du eta barnean run() abiarazten du. run() eskuz deituko bagenu, hari nagusi beraren barruan modu sekuentzialean exekutatuko litzateke!"
        },
        {
          "lerroa": "Thread.sleep(500) eta InterruptedException",
          "azalpena": "sleep() metodoak haria BLOKEATUA (TIMED_WAITING) egoerara eramaten du. Beste hari batek interrupt() deitzen badio, InterruptedException sortuko da."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zergatik da 'implements Runnable' eredu gomendatua 'extends Thread' baino gehiago?",
          "erantzuna": "Javak herentzia sinplea soilik onartzen duelako (klase bakar bat hedatu daiteke) eta atazaren logika harien kudeaketatik bereizten duelako (Separation of Concerns)."
        }
      ]
    },
    {
      "id": "hariak_join",
      "izenburua": "Harien Koordinazioa: join() Mekanismoa (APP.java vs APP_join_gabe.java)",
      "deskribapena": "Zeregin bat N zatitan banatu eta H hariren bidez paraleloan zenbatu. Hari guztiek amaitu arte main haria itxaronaraztea.",
      "fitxategia": "ataza_ariketa/APP.java",
      "kodea": "List<Thread> hariak = new ArrayList<>();\nint unekoHasiera = 1;\n\nfor (int i = 0; i < h; i++) {\n    int tamaina = oinarrizkoTamaina + (i < hondarra ? 1 : 0);\n    int unekoBukaera = unekoHasiera + tamaina - 1;\n    String izena = \"Hari-\" + (i + 1);\n\n    KontagailuAtaza ataza = new KontagailuAtaza(izena, unekoHasiera, unekoBukaera);\n    Thread haria = new Thread(ataza);\n    hariak.add(haria);\n\n    unekoHasiera = unekoBukaera + 1;\n}\n\n// 1. Hari guztiak martxan jarri\nfor (Thread t : hariak) {\n    t.start();\n}\n\n// 2. Hari guztiak amaitu arte ITXARON (join erabiliz)\nfor (Thread t : hariak) {\n    try {\n        t.join(); // Main haria blokeatzen da 't' amaitu arte\n    } catch (InterruptedException e) {\n        System.err.println(\"Hari nagusia etenda: \" + e.getMessage());\n    }\n}\n\n// 3. Guztiek amaitzean soilik inprimatuko da hau:\nSystem.out.println(\"Kontaketa guztiz amaituta dago!\");",
      "kontzeptuak": [
        {
          "lerroa": "t.join();",
          "azalpena": "join() deitzen duen haria (kasu honetan main) BLOKEATUA (WAITING) egoeran geratzen da 't' haria AMAITUA (TERMINATED) egoerara iritsi arte."
        },
        {
          "lerroa": "Zer gertatzen da join() GABE (APP_join_gabe.java)?",
          "azalpena": "Hari nagusia ez da gelditzen; 'Kontaketa guztiz amaituta dago!' mezua BEREHALA agertuko da kontsolan, beste hariak oraindik kontatzen hasi ere egin ez direnean!"
        }
      ],
      "galdetegia": [
        {
          "galdera": "join() metodoak hari guztiak sekuentzialki bihurtzen al ditu?",
          "erantzuna": "EZ, hari guztiak aurretik start() bidez martxan jarri badira, paraleloan ari dira korrika; join() begiztak soilik bermatzen du azken emaitza denak amaitutakoan irakurriko dela."
        }
      ]
    },
    {
      "id": "is_alive",
      "izenburua": "Hariaren Bizitza Egiaztatzea: isAlive() (AtazaAlive.java)",
      "deskribapena": "Hari batek beste baten egoera monitorizatzea isAlive() erabiliz eta hura amaitzean bere lana amaitzea.",
      "fitxategia": "is_alive/AtazaAlive.java",
      "kodea": "public class AtazaAlive implements Runnable {\n    private Thread besteHaria;\n\n    public AtazaAlive(Thread besteHaria) {\n        this.besteHaria = besteHaria;\n    }\n\n    @Override\n    public void run() {\n        // Beste haria bizirik dagoen bitartean jarraitu lanean\n        while (besteHaria.isAlive()) {\n            System.out.println(\"Monitorizatzen: beste haria oraindik BIZIRIK dago...\");\n            try {\n                Thread.sleep(500); // 500 ms-ro egiaztatu\n            } catch (InterruptedException ie) {\n                System.out.println(\"Monitorea etenda\");\n                break;\n            }\n        }\n        System.out.println(\"Beste hariak amaitu du, ni ere banoa!\");\n    }\n}",
      "kontzeptuak": [
        {
          "lerroa": "besteHaria.isAlive()",
          "azalpena": "Boolean itzultzen du: 'true' baldin eta haria start() egin bada eta oraindik run() amaitu ez badu (Ready, Running edo Blocked egoeretan dagoenean). New edo Terminated egoeran 'false' itzultzen du."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zein egoeratan itzultzen du isAlive()-k 'false'?",
          "erantzuna": "Haria sortu berri denean (NEW, start deitu gabe) edo hariaren run() metodoa guztiz amaitu denean (TERMINATED)."
        }
      ]
    },
    {
      "id": "kotxeak",
      "izenburua": "Kotxe Lasterketa: Konkurrentzia eta Sinkronizazioa (KotxeLasterketa.java)",
      "deskribapena": "Hainbat kotxe hari independenteetan, JProgressBar aurrerapenarekin eta irabazle bakarra zehazteko 'synchronized' bloke kritikoa.",
      "fitxategia": "KotxeLasterketa.java",
      "kodea": "// Partekatutako egoera (Shared State)\nprivate volatile boolean lasterketaAmaituta = false;\nprivate String irabazlea = \"\";\nprivate final Object giltza = new Object(); // Lock objektua\n\n// Auto bakoitzeko haria:\nThread autoHaria = new Thread(new Runnable() {\n    @Override\n    public void run() {\n        double unekoDistantzia = 0.0;\n        while (!lasterketaAmaituta && unekoDistantzia < helburuDistantzia) {\n            try {\n                Thread.sleep(100); // 100 ms itxaron\n                unekoDistantzia += autoAbiadura * 0.1;\n\n                if (unekoDistantzia >= helburuDistantzia) {\n                    unekoDistantzia = helburuDistantzia;\n                    \n                    // SINKRONIZAZIO ESKUALDE KRITIKOA:\n                    synchronized (giltza) {\n                        if (!lasterketaAmaituta) {\n                            lasterketaAmaituta = true;\n                            irabazlea = \"Autoa \" + autoZenbakia;\n                        }\n                    }\n                }\n\n                final double distFinala = unekoDistantzia;\n                SwingUtilities.invokeLater(() -> {\n                    barrak[indizea].setValue((int) distFinala);\n                    lblDistantziak[indizea].setText(String.format(\"%.1f m\", distFinala));\n                });\n            } catch (InterruptedException e) { break; }\n        }\n    }\n});\nautoHaria.start();",
      "kontzeptuak": [
        {
          "lerroa": "private volatile boolean lasterketaAmaituta = false;",
          "azalpena": "volatile hitz gakoak bermatzen du aldagai honen idazketak berehala RAM memoria nagusian idatziko direla eta beste hari guztiek unean bertan ikusiko dutela (CPU katxe desfasajeak saihestuz)."
        },
        {
          "lerroa": "synchronized (giltza) { ... }",
          "azalpena": "Lock objektu bera erabiliz hari bakar bat sar daiteke aldi berean barruko blokera. Horrela, bi autok aldi berean helmuga gaindituta ere, irabazle bakar bat izendatuko da (Race Condition saihestuz)."
        },
        {
          "lerroa": "SwingUtilities.invokeLater(() -> { ... });",
          "azalpena": "Swing interfazea hari-segurua EZ denez (Not Thread-Safe), osagai grafikoen aldaketak (setValue, setText) Event Dispatch Thread (EDT) hariari pasatu behar zaizkio beti."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zergatik dago 'if (!lasterketaAmaituta)' baldintza synchronized blokearen barruan berriz?",
          "erantzuna": "Double-Checked Locking delako: bi hari batera iristen badira, lehenengoak irabazlea jarri eta gero bigarrena sartzean egiaztatu dezan lasterketa jada amaituta dagoela."
        }
      ]
    },
    {
      "id": "kronometroa",
      "izenburua": "Kronometroa & EDT Segurtasuna (Cronometroa.java & AtzerakoKontua.java)",
      "deskribapena": "Zergatik blokeatzen den pantaila Thread.sleep botoi baten barruan deitzean eta nola konpontzen den atzeko haria erabiliz.",
      "fitxategia": "Cronometroa.java",
      "kodea": "// Botoia sakatzean exekutatzen den kodea (EDT haria):\nbtnIniciar.addActionListener(e -> {\n    btnIniciar.setEnabled(false);\n    btnParar.setEnabled(true);\n    martxan = true;\n\n    // KRONOMETRO HARIA (Atzeko planoko haria):\n    kronometroHaria = new Thread(() -> {\n        int pasatakoak = 0;\n        while (pasatakoak < segunduGuztira && martxan) {\n            try {\n                Thread.sleep(1000); // 1 segundo itxaron\n                pasatakoak++;\n\n                final int seg = pasatakoak;\n                // UI eguneraketak EDT hariari bidali:\n                SwingUtilities.invokeLater(() -> {\n                    progressBar.setValue(seg);\n                    lblEgoera.setText(seg + \" / \" + segunduGuztira + \" s\");\n                });\n            } catch (InterruptedException ex) {\n                break; // Parar sakatzean etena\n            }\n        }\n        SwingUtilities.invokeLater(() -> {\n            btnIniciar.setEnabled(true);\n            btnParar.setEnabled(false);\n        });\n    });\n    kronometroHaria.start();\n});",
      "kontzeptuak": [
        {
          "lerroa": "Zergatik ez dugu Thread.sleep(1000) zuzenean ActionListener-en egiten?",
          "azalpena": "ActionListener-ak Event Dispatch Thread (EDT) barruan exekutatzen dira. Bertan sleep egiten bada, interfaze osoa izoztuta geratzen da: leihoa ez da berriz marrazten eta 'Parar' botoiak ez du klikik onartzen."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Nola gelditu dezakegu martxan dagoen kronometro haria?",
          "erantzuna": "'martxan = false;' bandera ezarriz edo 'kronometroHaria.interrupt()' deituz sleep-etik ateratzeko."
        }
      ]
    },
    {
      "id": "timer",
      "izenburua": "Timer eta TimerTask: Aldizkako Jakinarazpenak (LuzatzeAtaza.java)",
      "deskribapena": "Java java.util.Timer eta TimerTask klaseak erabiliz denbora-tarte finko batean atazak errepikatzea eta SystemTray bidez jakinaraztea.",
      "fitxategia": "LuzatzeAtaza.java",
      "kodea": "public class LuzatzeAtaza extends TimerTask {\n    private int kontagailua = 0;\n    private TrayIcon trayIcon;\n\n    public LuzatzeAtaza(TrayIcon trayIcon) {\n        this.trayIcon = trayIcon;\n    }\n\n    @Override\n    public void run() {\n        kontagailua++;\n        System.out.println(\"Timer ataza exekutatzen: \" + kontagailua + \". aldia\");\n        if (trayIcon != null) {\n            trayIcon.displayMessage(\n                \"Luzatze Abisua!\",\n                \"Gorputza luzatzeko ordua iritsi da (\" + kontagailua + \")\",\n                TrayIcon.MessageType.INFO\n            );\n        }\n    }\n}\n\n// PROGRAMA NAGUSIAN:\nTimer timer = new Timer();\nLuzatzeAtaza ataza = new LuzatzeAtaza(trayIcon);\n\n// Hasierako atzerapena: 0 ms; Aldizkako tartea: 5000 ms (5 segundoro)\ntimer.scheduleAtFixedRate(ataza, 0, 5000);",
      "kontzeptuak": [
        {
          "lerroa": "timer.scheduleAtFixedRate(ataza, delay, period);",
          "azalpena": "scheduleAtFixedRate-k zehaztutako period bakoitzean TimerTask-aren run() metodoa exekutatuko du background hari batean."
        },
        {
          "lerroa": "timer.cancel(); eta ataza.cancel();",
          "azalpena": "Timer-ak background hari bat bizirik mantentzen du berez; programa amaitu ahal izateko timer.cancel() deitu behar da baliabideak askatzeko."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zer desberdintasun dago schedule() eta scheduleAtFixedRate() metodoen artean?",
          "erantzuna": "scheduleAtFixedRate errepikapen zorrotzetarako da (atzerapenak konpentsatzen ditu); schedule errepikapen bakoitzaren arteko tarte erlatiboa mantentzeko da."
        }
      ]
    },
    {
      "id": "lanketa4",
      "izenburua": "Konkurrentziaren 5 Arazoak: Deadlock & Inanizioa (Lanketa IV)",
      "deskribapena": "Hil-blokeoa (Deadlock) eta Inanizioa (Starvation). Zergatik gertatzen diren eta nola konpondu Resource Ordering eta Fairness bidez.",
      "fitxategia": "DeadlockAdibidea.java / InanizioAdibidea.java",
      "kodea": "// DEADLOCK ARRISKUA (Alderantzizko blokeoa):\n// Haria 1: Lock A hartu eta Lock B-ren zain geratu\n// Haria 2: Lock B hartu eta Lock A-ren zain geratu -> BETIKO BLOKEOA!\n\n// KONPONBIDEA: BALIABIDEEN ORDENAMENDUA (RESOURCE ORDERING)\n// Bi hariek BETI ordena berean hartu behar dituzte blokeoak:\npublic void transferitu(Kontua nork, Kontua nori, double dirua) {\n    Kontua lehena = nork.getId() < nori.getId() ? nork : nori;\n    Kontua bigarrena = nork.getId() < nori.getId() ? nori : nork;\n\n    synchronized (lehena) {\n        synchronized (bigarrena) {\n            nork.atera(dirua);\n            nori.sartu(dirua);\n        }\n    }\n}\n\n// INANIZIOA SAIHESTEKO BIDEZKO LOCK-A (FAIRNESS):\n// Lock arruntek ez dute FIFO bermatzen; bidezkoak bai:\nLock bidezkoGiltza = new ReentrantLock(true); // true = Fair / FIFO ilara",
      "kontzeptuak": [
        {
          "lerroa": "Coffman-en 4 baldintzak (Deadlock)",
          "azalpena": "Elkarrekiko Bazterketa, Eutsi eta Itxaron, Kaleratzerik Ez, eta Itxaronaldi Zirkularra. Lauak aldi berean betetzen direnean soilik gertatzen da Deadlock."
        },
        {
          "lerroa": "new ReentrantLock(true)",
          "azalpena": "Fairness parametroak gehien itxaroten daraman hariari emango dio sarbidea (FIFO ilara), lehentasun txikiko hariak gosez hil ez daitezen (Inanizioa saihestuz)."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Deadlock-a gertatzeko 4 baldintzetatik zein apurtzen du Resource Ordering teknikak?",
          "erantzuna": "Itxaronaldi Zirkularra (Circular Wait) baldintza apurtzen du."
        }
      ]
    },
    {
      "id": "zenbaketa_n_hariak",
      "izenburua": "9. Ariketa 1 & 2: Zenbaketa Paraleloa N Harirekin (ZenbatzaileAtaza.java)",
      "deskribapena": "1etik N-rako zenbakiak kalkulatzeko lana hari kopuru jakin baten artean zatitu (Tarteka), hari bakoitza abiarazi eta guztien amaierari 'join()' bidez itxaron.",
      "fitxategia": "Ariketa_1/ZenbatzaileAtaza.java & Ariketa_2/APP.java",
      "kodea": "// ARIKETA 1 & 2: Lana N haritan banatu eta amaierari itxaron\nint n = 1000;\nint hariKopurua = 4;\nint tamaina = n / hariKopurua;\n\nList<Thread> hariak = new ArrayList<>();\n\n// 1. Hari bakoitzari bere hasiera eta bukaera tartea esleitu\nfor (int i = 0; i < hariKopurua; i++) {\n    int hasiera = i * tamaina + 1;\n    int bukaera = (i == hariKopurua - 1) ? n : (i + 1) * tamaina;\n\n    // Runnable ataza sortu eta hari berri batean bildu\n    ZenbatzaileAtaza ataza = new ZenbatzaileAtaza(\"Haria-\" + (i + 1), hasiera, bukaera);\n    Thread hari = new Thread(ataza);\n    hariak.add(hari);\n    hari.start(); // Haria paraleloan abiarazi\n}\n\n// 2. Hari guztien amaierari itxaron begizta bidez\nfor (Thread h : hariak) {\n    try {\n        h.join(); // Hari nagusia gelditzen da h amaitu arte\n    } catch (InterruptedException e) {\n        System.err.println(\"Etenaldia: \" + e.getMessage());\n    }\n}\nSystem.out.println(\"✓ Zenbaketa paralelo osoa amaitu da!\");",
      "kontzeptuak": [
        {
          "lerroa": "List<Thread> hariak = new ArrayList<>(); eta h.join();",
          "azalpena": "Hari guztiak zerrenda batean gordetzen dira, eta behin denak abiarazi ondoren (start), bigarren begizta batean banan-banan 'join()' deitzen zaie denak bukatu arte itxaroteko."
        },
        {
          "lerroa": "int bukaera = (i == hariKopurua - 1) ? n : (i + 1) * tamaina;",
          "azalpena": "Zatiketa zehatza ez denean (hondarra dagoenean), azken hariak jasotzen du amaierako zenbakirainoko tarte osoa, zenbaki bakar bat ere galdu ez dadin."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zergatik ezin dugu lehenengo for begiztan 'hari.start()' deitu eta berehala 'hari.join()' deitu?",
          "erantzuna": "Berehala join() deituz gero, lehen haria bukatu arte itxarongo luke bigarrena abiarazi aurretik, paralelismoa guztiz galduz eta exekuzio sekuentziala bihurtuz."
        }
      ]
    },
    {
      "id": "semaforoa",
      "izenburua": "10. Semaforoak: Sarbide Baimen Mugatuak (SemaphoreDemo.java)",
      "deskribapena": "Baimen kopuru mugatu bat kudeatu (adib. aparkalekuko 2 plaza libre) aldi berean hari kopuru zehatz bat baino sartu ez dadin eskualde kritikora.",
      "fitxategia": "SemaphoreDemo.java",
      "kodea": "import java.util.concurrent.Semaphore;\n\npublic class SemaphoreDemo {\n    // Gehienez 2 baimen aldi berean (2 plaza libre):\n    private static final Semaphore sem = new Semaphore(2);\n\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            final int id = i;\n            new Thread(() -> {\n                try {\n                    sem.acquire(); // Baimen bat hartu (hutsik badago, blokeatu)\n                    System.out.println(\"Haria \" + id + \" sartu da eskualde kritikora.\");\n                    Thread.sleep(1500); // Baliabidea erabiltzen\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                } finally {\n                    System.out.println(\"Haria \" + id + \" atera da. Baimena askatzen.\");\n                    sem.release(); // BETI finally barruan baimena askatu!\n                }\n            }).start();\n        }\n    }\n}",
      "kontzeptuak": [
        {
          "lerroa": "sem.acquire();",
          "azalpena": "Baimen bat eskuratzen du. Baimen librerik ez badago, haria automatikoki blokeatu egiten da beste hariren batek 'release()' deitu arte."
        },
        {
          "lerroa": "finally { sem.release(); }",
          "azalpena": "Baimenak askatzea beti 'finally' bloke batean egin behar da; bestela, salbuespen bat gertatuz gero baimena galduko litzateke eta gainontzeko hariak blokeatuta geratuko lirateke."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zer desberdintasun dago Semaphore eta Lock/synchronized artean?",
          "erantzuna": "Lock/synchronized-ek hari bakarrari (1) uzten dio sartzen (elkarrekiko bazterketa); Semaforoak aldiz N hariri baimendu diezaioke aldi bereko sarbidea (N baimen)."
        }
      ]
    },
    {
      "id": "hesiak_latch",
      "izenburua": "11. CyclicBarrier eta CountDownLatch (BarrierDemo & LatchDemo)",
      "deskribapena": "Harien arteko koordinazio-hesiak: CyclicBarrier (denak puntu batera iritsi arte itxaron) eta CountDownLatch (atazen atzerako kontaketa).",
      "fitxategia": "BarrierDemo.java & LatchDemo.java",
      "kodea": "import java.util.concurrent.CyclicBarrier;\nimport java.util.concurrent.CountDownLatch;\n\n// 1. CYCLIC BARRIER: 3 hariak elkargunera iritsi arte itxaroten duen hesia\nCyclicBarrier barrier = new CyclicBarrier(3, () -> {\n    System.out.println(\">>> 3 hariak iritsi dira! Hesia ireki da! <<<\");\n});\n\n// 2. COUNT DOWN LATCH: 3 atazen amaiera kontrolatzeko kontagailua\nCountDownLatch latch = new CountDownLatch(3);\n\nfor (int i = 1; i <= 3; i++) {\n    final int id = i;\n    new Thread(() -> {\n        try {\n            System.out.println(\"Haria \" + id + \" hesira iritsi da.\");\n            barrier.await(); // Beste 2 hariak iritsi arte blokeatu\n            \n            // Lana egin\n            System.out.println(\"Haria \" + id + \" lana amaitu du.\");\n            latch.countDown(); // Kontagailua unitate batez jaitsi\n        } catch (Exception e) {\n            e.printStackTrace();\n        }\n    }).start();\n}\n\nlatch.await(); // Hari nagusiak itxaroten du latch 0 izan arte\nSystem.out.println(\"✓ Ataza guzti-guztiak amaituta!\");",
      "kontzeptuak": [
        {
          "lerroa": "barrier.await();",
          "azalpena": "Haria blokeatu egiten da hesian ezarritako partaide kopuru osoa iritsi arte. Azkena iristen denean, hesiaren ekintza exekutatu eta denak batera askatzen dira."
        },
        {
          "lerroa": "latch.countDown(); eta latch.await();",
          "azalpena": "Ataza bakoitzak amaitzean 'countDown()' deitzen du kontagailua jaisteko. Hari nagusiak 'await()' deitzen du eta kontagailua 0ra iritsi arte blokeatuta itxaroten du."
        }
      ],
      "galdetegia": [
        {
          "galdera": "CyclicBarrier eta CountDownLatch artean, zein berrerabili daiteke behin eta berriz?",
          "erantzuna": "CyclicBarrier berrerabilgarria da ('Cyclic' = ziklikoa); CountDownLatch behin 0ra iritsitakoan ezin da berrezarri."
        }
      ]
    },
    {
      "id": "executors_future",
      "izenburua": "12. ExecutorService eta Future: Hari Poolak (ExecutorDemo & FutureDemo)",
      "deskribapena": "Hariak eskuz sortu beharrean, hari-pool bat erabili baliabideak berrerabiltzeko, eta Callable/Future bidez emaitza asinkronoak berreskuratu.",
      "fitxategia": "ExecutorDemo.java & FutureDemo.java",
      "kodea": "import java.util.concurrent.*;\n\n// 2 hariko pool finkoa sortu\nExecutorService executor = Executors.newFixedThreadPool(2);\n\n// Callable ataza: balio bat itzul dezake eta salbuespenak bota ditzake\nCallable<Integer> kalkuluAtaza = () -> {\n    System.out.println(\"Kalkulua egiten atzeko planoan...\");\n    Thread.sleep(1000);\n    return 42 * 2;\n};\n\n// submit() bidez bidali eta Future (etorkizuneko emaitza) eskuratu\nFuture<Integer> etorkizuna = executor.submit(kalkuluAtaza);\n\nSystem.out.println(\"Hari nagusiak beste gauza batzuk egin ditzake...\");\n// get() metodoak emaitza prest egon arte blokeatzen du\nInteger emaitza = etorkizuna.get();\nSystem.out.println(\"✓ Emaitza asinkronoa eskuratuta: \" + emaitza);\n\n// GARRANTZITSUA: Poola itxi, bestela JVM ez da inoiz amaituko\nexecutor.shutdown();",
      "kontzeptuak": [
        {
          "lerroa": "Future<Integer> etorkizuna = executor.submit(kalkuluAtaza);",
          "azalpena": "submit()-ek Callable ataza hari-poolari ematen dio eta berehala Future objektu bat itzultzen du emaitza asinkronoa kontrolatzeko."
        },
        {
          "lerroa": "executor.shutdown();",
          "azalpena": "Hari-poolari agintzen dio uneko atazak amaitu ondoren hariak ixteko. Deitu ezean hariak aktibo geratuko dira eta Java programa ez da inoiz itxiko."
        }
      ],
      "galdetegia": [
        {
          "galdera": "Zein da 'Runnable' eta 'Callable' arteko funtsezko desberdintasuna?",
          "erantzuna": "Runnable.run()-ek void itzultzen du eta ezin du salbuespenik bota; Callable.call()-ek edozein motatako emaitza (T) itzul dezake eta Exception bota dezake."
        }
      ]
    }
  ],
  "betetzeak": [
    {
      "titulua": "1. Kotxe Lasterketako Irabazlearen Sinkronizazioa",
      "argibidea": "Bete 'volatile' aldagaia eta 'synchronized' blokea irabazlea zehazteko:",
      "hasierakoKodea": "// Aldagaia RAM nagusian berehala ikusteko:\nprivate _____ boolean lasterketaAmaituta = false;\n\n// Eskualde kritikoa babesteko blokeoa:\n_____ (giltza) {\n    if (!lasterketaAmaituta) {\n        lasterketaAmaituta = true;\n        irabazlea = \"Autoa \" + zenbakia;\n    }\n}",
      "soluzioa": [
        "volatile",
        "synchronized"
      ],
      "azalpena": "'volatile'-k CPU katxe desfasajeak saihesten ditu, eta 'synchronized(giltza)'-k hariei elkarrekiko bazterketa ezartzen die irabazle bakar bat izateko."
    },
    {
      "titulua": "2. Runnable Inplementatu eta Haria Abiarazi",
      "argibidea": "Bete 'implements Runnable' eta haria abiarazteko deia:",
      "hasierakoKodea": "public class NireAtaza _____ Runnable {\n    @Override\n    public void run() {\n        System.out.println(\"Ataza lanean\");\n    }\n}\n\n// Main metodoan:\nThread haria = new Thread(new NireAtaza());\nharia._____();",
      "soluzioa": [
        "implements",
        "start"
      ],
      "azalpena": "Interfazeak inplementatzeko 'implements' erabiltzen da, eta haria sistema eragilean lanean jartzeko 'start()' deitu behar da ('run()' deitu ordez)."
    },
    {
      "titulua": "3. join() Bidez Haria Amaitu Arte Itxaron",
      "argibidea": "Bete hari nagusiak beste haria amaitu arte itxaroteko metodoa eta salbuespena:",
      "hasierakoKodea": "Thread t = new Thread(ataza);\nt.start();\n\ntry {\n    t._____(); // Hari nagusiak 't' amaitu arte itxaroten du\n} catch (_____ e) {\n    System.err.println(\"Itxaronaldia eten da!\");\n}",
      "soluzioa": [
        "join",
        "InterruptedException"
      ],
      "azalpena": "'t.join()' metodoak uneko haria blokeatzen du 't' amaitu arte, eta hari hori eteten bada 'InterruptedException' jaurtitzen du."
    },
    {
      "titulua": "4. Haria Bizirik Dagoen Egiaztatzea (isAlive)",
      "argibidea": "Bete hariaren bizitza egiaztatzeko metodoa eta eteteko komandoa:",
      "hasierakoKodea": "while (besteHaria._____()) {\n    System.out.println(\"Martxan jarraitzen du...\");\n    try {\n        Thread._____(500);\n    } catch (InterruptedException e) {\n        break;\n    }\n}",
      "soluzioa": [
        "isAlive",
        "sleep"
      ],
      "azalpena": "'isAlive()' metodoak haria amaitu ez dela egiaztatzen du, eta 'Thread.sleep(500)' metodoak 500 ms itxaroten du."
    },
    {
      "titulua": "5. AtomicInteger Lasterketa Baldintzarik Gabe",
      "argibidea": "Bete zenbaki atomikoen klasea eta gehikuntza atomikoaren metodoa:",
      "hasierakoKodea": "// Race condition saihesteko zenbaki atomikoa:\nprivate _____ kontagailua = new AtomicInteger(0);\n\npublic void gehituBat() {\n    kontagailua._____(); // i++ eragiketa modu atomikoan egin\n}",
      "soluzioa": [
        "AtomicInteger",
        "incrementAndGet"
      ],
      "azalpena": "'AtomicInteger'-ek hardwarearen CAS (Compare-And-Swap) aginduak erabiltzen ditu 'incrementAndGet()' atomikoki exekutatzeko blokeorik gabe."
    },
    {
      "titulua": "6. ReentrantLock eta Eskualde Kritiko Segurua",
      "argibidea": "Bete ReentrantLock blokeoa eskuratu eta beti askatzeko egitura:",
      "hasierakoKodea": "Lock giltza = new ReentrantLock();\n\ngiltza._____();\ntry {\n    // Eskualde kritikoa\n    saldoa -= kopurua;\n} _____ {\n    giltza.unlock(); // Beti askatu, salbuespena gertatuta ere!\n}",
      "soluzioa": [
        "lock",
        "finally"
      ],
      "azalpena": "'giltza.lock()' deitu ostean, 'finally' blokeak bermatzen du 'unlock()' beti exekutatuko dela salbuespen bat gertatuta ere."
    },
    {
      "titulua": "7. ProcessBuilder Bidez Prozesua Sortu eta Itxaron",
      "argibidea": "Bete ProcessBuilder instantziazioa eta prozesuaren amaierari itxaroteko agindua:",
      "hasierakoKodea": "ProcessBuilder pb = new _____(Arrays.asList(\"ping\", \"localhost\"));\nProcess p = pb.start();\n\n// Prozesua amaitu arte itxaron eta exit kodea jaso:\nint irteera = p._____();",
      "soluzioa": [
        "ProcessBuilder",
        "waitFor"
      ],
      "azalpena": "'ProcessBuilder'-ek prozesua konfiguratzen du, 'start()'-ek abiarazten du eta 'waitFor()'-ek amaitu arte itxaronarazten dio Java programari."
    },
    {
      "titulua": "8. Timer eta TimerTask Aldizkako Zikloa",
      "argibidea": "Bete Timer-aren metodoa eta ataza amaitzeko deia:",
      "hasierakoKodea": "Timer timer = new Timer();\nTimerTask ataza = new LuzatzeAtaza();\n\n// 0 ms atzerapenez hasi eta 3000 ms-ro errepikatu:\ntimer._____(ataza, 0, 3000);\n\n// Geroago timer-a gelditzeko:\ntimer._____();",
      "soluzioa": [
        "scheduleAtFixedRate",
        "cancel"
      ],
      "azalpena": "'scheduleAtFixedRate'-k aldizkako planifikazio zehatza egiten du, eta 'cancel()'-ek timer-aren background haria hiltzen du."
    },
    {
      "titulua": "9. SwingUtilities.invokeLater UI Segururako",
      "argibidea": "Bete Swing EDT harira lana bidaltzeko metodo estatikoa:",
      "hasierakoKodea": "// Atzeko haritik Swing elementu bat aldatzeko:\n_____.invokeLater(new Runnable() {\n    @Override\n    public void run() {\n        progressBar.setValue(100);\n        etiketa.setText(\"Amaituta!\");\n    }\n});",
      "soluzioa": [
        "SwingUtilities"
      ],
      "azalpena": "'SwingUtilities.invokeLater'-ek UI eguneraketak Event Dispatch Thread (EDT) ilaran jartzen ditu modu hari-seguruan."
    },
    {
      "titulua": "10. BlockingQueue Ekoizle-Kontsumitzailea",
      "argibidea": "Bete BlockingQueue-tik elementua ateratzeko blokeo-metodoa:",
      "hasierakoKodea": "BlockingQueue<String> ilara = new ArrayBlockingQueue<>(10);\n\n// Ekoizleak elementua sartu (ilara beteta badago blokeatzen da):\nilara.put(\"Paketea\");\n\n// Kontsumitzaileak elementua atera (hutsik badago blokeatzen da):\nString mezua = ilara._____();",
      "soluzioa": [
        "take"
      ],
      "azalpena": "'take()' metodoak elementu bat ateratzen du, eta ilara hutsik badago automatikoki itxaroten du norbaitek 'put()' egin arte."
    },
    {
      "titulua": "11. Semaphore Bidezko Aparkaleku Sarbidea",
      "argibidea": "Bete semaforotik baimena eskuratzeko eta baimena askatzeko metodoak (try-finally barruan):",
      "hasierakoKodea": "Semaphore semaforoa = new Semaphore(2);\n\ntry {\n    semaforoa._____(); // 1. Baimena eskatu (itxaron hutsik ez badago)\n    System.out.println(\"Plaza librean aparkatuta!\");\n} finally {\n    semaforoa._____(); // 2. Baimena askatu besteentzat\n}",
      "soluzioa": [
        "acquire",
        "release"
      ],
      "azalpena": "'acquire()' metodoak baimena hartzen du eta 'release()' metodoak baimena itzultzen du. 'release()' beti 'finally' blokean jarri behar da."
    },
    {
      "titulua": "12. CountDownLatch Bidez Harien Amaierari Itxaron",
      "argibidea": "Bete atazaren amaieran kontagailua jaisteko agindua eta hari nagusian itxaroteko agindua:",
      "hasierakoKodea": "CountDownLatch latch = new CountDownLatch(3);\n\n// Hariaren barruan lana amaitzean:\nlatch._____(); // 1. Kontagailua unitate batez jaitsi\n\n// Hari nagusian 3 atazak amaitu arte blokeatu:\nlatch._____(); // 2. Kontagailua 0 izan arte itxaron",
      "soluzioa": [
        "countDown",
        "await"
      ],
      "azalpena": "'countDown()'-ek latch-aren balioa 1 jaisten du eta 'await()'-ek haria gelditzen du balioa 0ra iritsi arte."
    }
  ],
  "zuzenketak": [
    {
      "titulua": "1. run() vs start() Nahastea",
      "enuntziatua": "Programatzaileak haria abiarazi nahi du, baina dena sekuentzialki exekutatzen da eta programa blokeatu egiten da:",
      "okerrekoKodea": "Thread haria = new Thread(new Runnable() {\n    @Override\n    public void run() {\n        egindakoKalkuluLuzea();\n    }\n});\nharia.run(); // <-- HEMEN AKATSA!",
      "aukerak": [
        "'haria.run()' ordez 'haria.start()' deitu behar da hari berria sortzeko.",
        "'haria.execute()' deitu behar da Java 17tik aurrera.",
        "'haria.run()' metodoari 'true' parametroa pasatu behar zaio.",
        "Runnable-k ezin du metodo propiorik exekutatu."
      ],
      "zuzenaIndex": 0,
      "azalpena": "'run()' deitzeak ez du hari berririk sortzen; deitu duen hari beraren barruan metodo arrunt bat bezala exekutatzen da. 'start()' deitu behar da sistema eragileak hari paralelo berri bat sor dezan.",
      "zuzenekoKodea": "Thread haria = new Thread(new Runnable() {\n    @Override\n    public void run() {\n        egindakoKalkuluLuzea();\n    }\n});\nharia.start(); // ZUZENA: OS mailako hari berria abiarazten du"
    },
    {
      "titulua": "2. Swing EDT Haria Blokeatzea",
      "enuntziatua": "Botoia sakatzean aplikazioaren leiho osoa izoztu egiten da 10 segundoz eta ez du klikik onartzen:",
      "okerrekoKodea": "botoia.addActionListener(e -> {\n    try {\n        Thread.sleep(10000); // <-- AKATSA: EDT haria lo geratzen da!\n        etiketa.setText(\"Amaitua!\");\n    } catch (InterruptedException ex) {}\n});",
      "aukerak": [
        "Thread.sleep(10000) deia background hari batean sartu behar da eta emaitza invokeLater bidez eguneratu.",
        "Etiketa aldatu aurretik botoia.setVisible(false) deitu behar da.",
        "Thread.sleep-ek milisegundoak ordez segundoak behar ditu.",
        "Swing-en ezin da inoiz itxaronaldirik egin."
      ],
      "zuzenaIndex": 0,
      "azalpena": "ActionListener-ak Event Dispatch Thread (EDT) barruan dabiltza. EDT lo geratzen bada, ezin du leihoa berriz marraztu ezta beste gertaerarik prozesatu. Ataza luzeak background Thread batean egin behar dira.",
      "zuzenekoKodea": "botoia.addActionListener(e -> {\n    new Thread(() -> {\n        try {\n            Thread.sleep(10000);\n            SwingUtilities.invokeLater(() -> etiketa.setText(\"Amaitua!\"));\n        } catch (InterruptedException ex) {}\n    }).start();\n});"
    },
    {
      "titulua": "3. Deadlock Zirkularra (Lock Alderantziz)",
      "enuntziatua": "Bi harik elkarren baliabideak itxaroten dituzte eta programa betiko blokeatzen da:",
      "okerrekoKodea": "// Hari 1:\nsynchronized (lockA) {\n    synchronized (lockB) { lana1(); }\n}\n// Hari 2:\nsynchronized (lockB) { // <-- AKATSA: Alderantzizko ordena!\n    synchronized (lockA) { lana2(); }\n}",
      "aukerak": [
        "Bi hariek BETI ordena berean hartu behar dituzte lock-ak (Resource Ordering): lehenik lockA, gero lockB.",
        "lockB objektua 'volatile' deklaratu behar da.",
        "synchronized blokeak kendu eta for ziklo bat erabili behar da.",
        "Lock bakoitzari izen bera jarri behar zaio."
      ],
      "zuzenaIndex": 0,
      "azalpena": "Deadlock-aren kausa nagusia 'Itxaronaldi Zirkularra' da. Bi hariek blokeoak beti ordena berean hartzen badituzte (Resource Ordering), sekula ezin da ziklorik sortu.",
      "zuzenekoKodea": "// Hari 1:\nsynchronized (lockA) {\n    synchronized (lockB) { lana1(); }\n}\n// Hari 2 (ORDENA BEREAN):\nsynchronized (lockA) {\n    synchronized (lockB) { lana2(); }\n}"
    },
    {
      "titulua": "4. join() Gabe Balioa Irakurtzea",
      "enuntziatua": "Haria amaitu aurretik emaitza irakurtzen da eta beti 0 edo balio okerra agertzen da:",
      "okerrekoKodea": "BatuketaAtaza ataza = new BatuketaAtaza();\nThread t = new Thread(ataza);\nt.start();\n\n// <-- AKATSA: t.join() falta da hemen!\nSystem.out.println(\"Emaitza: \" + ataza.getEmaitza());",
      "aukerak": [
        "Emaitza irakurri aurretik 't.join()' deitu behar da hariak bere lana amaitu arte itxaroteko.",
        "getEmaitza() metodoa 'static' bihurtu behar da.",
        "t.start() ordez t.run() deitu behar da.",
        "System.out.println kendu eta fitxategi batean idatzi behar da."
      ],
      "zuzenaIndex": 0,
      "azalpena": "Hari nagusiak ez badio 't' hariaren amaierari itxaroten (t.join()), getEmaitza() deitzen denean ataza oraindik kalkulatzen ariko da eta balio lehenetsia (0) irakurriko du.",
      "zuzenekoKodea": "BatuketaAtaza ataza = new BatuketaAtaza();\nThread t = new Thread(ataza);\nt.start();\ntry {\n    t.join(); // ZUZENA: amaitu arte itxaron\n} catch (InterruptedException e) {}\nSystem.out.println(\"Emaitza: \" + ataza.getEmaitza());"
    },
    {
      "titulua": "5. Memoria Inkontsistentzia (volatile falta)",
      "enuntziatua": "Beste hari batek 'gelditu = true' ezarri arren, while begiztak ez du sekula amaitzen:",
      "okerrekoKodea": "// Aldagai arrunta (CPU katxean geratzen da):\nprivate boolean gelditu = false; // <-- AKATSA: volatile falta!\n\npublic void run() {\n    while (!gelditu) {\n        // lana egin\n    }\n}",
      "aukerak": [
        "'private volatile boolean gelditu = false;' deklaratu behar da.",
        "gelditu aldagaia 'final' egin behar da.",
        "while begiztaren barruan System.exit(0) jarri behar da.",
        "Interfaze grafikoan bakarrik erabil daiteke boolean."
      ],
      "zuzenaIndex": 0,
      "azalpena": "'volatile' gabe, hari bakoitzak aldagaiaren kopia bat gorde dezake bere CPU erregistro/katxean. 'volatile' gehitzean aldaketa guztiak RAM nagusira doaz zuzenean.",
      "zuzenekoKodea": "private volatile boolean gelditu = false; // ZUZENA\n\npublic void run() {\n    while (!gelditu) {\n        // berehala detektatuko du balio aldaketa\n    }\n}"
    },
    {
      "titulua": "6. Synchronized Objektu Berri Baten Gainean",
      "enuntziatua": "Sinkronizazio blokea jarrita ere, lasterketa-baldintzak (Race Condition) jarraitzen du gertatzen:",
      "okerrekoKodea": "public void gehitu() {\n    // <-- AKATSA: Dei bakoitzean objektu berria sortzen da!\n    synchronized (new Object()) {\n        kontagailua++;\n    }\n}",
      "aukerak": [
        "Partekatutako 'final Object lock = new Object()' instantzia bera erabili behar dute hari guztiek.",
        "new Object() ordez new String() erabili behar da.",
        "kontagailua bider 2 egin behar da.",
        "synchronized kendu eta if jarri behar da."
      ],
      "zuzenaIndex": 0,
      "azalpena": "'new Object()' jartzean hari bakoitzak bere objektu propioa blokeatzen du; beraz, inor ez da bestearen zain geratzen! Blokeo objektuak partekatua izan behar du.",
      "zuzenekoKodea": "private final Object lock = new Object(); // ZUZENA: partekatua\n\npublic void gehitu() {\n    synchronized (lock) {\n        kontagailua++;\n    }\n}"
    },
    {
      "titulua": "7. ReentrantLock: unlock() finally Barruan Ez Egotea",
      "enuntziatua": "Metodoan salbuespen bat gertatzen bada, giltza ez da sekula askatzen eta programa betiko blokeatzen da:",
      "okerrekoKodea": "lock.lock();\neragiketaArriskutsua(); // Salbuespena bota dezake!\nlock.unlock(); // <-- AKATSA: Salbuespena badago ez da hona iritsiko!",
      "aukerak": [
        "'lock.unlock()' agindua beti 'try ... finally' blokeko 'finally'-ren barruan jarri behar da.",
        "lock.unlock() hasieran deitu behar da.",
        "Salbuespena jaurti ordez eragiketa ezabatu behar da.",
        "ReentrantLock-ek ez du askatu beharrik."
      ],
      "zuzenaIndex": 0,
      "azalpena": "Lock-ak beti askatu behar dira 'finally' blokean, salbuespen batek metodoa eten arren giltza askatuko dela bermatzeko.",
      "zuzenekoKodea": "lock.lock();\ntry {\n    eragiketaArriskutsua();\n} finally {\n    lock.unlock(); // ZUZENA: Beti askatuko da\n}"
    },
    {
      "titulua": "8. ArrayList Arrunta Hari Anitzetan Erabiltzea",
      "enuntziatua": "Hainbat harik aldi berean zerrendara elementuak gehitzen dituztenean, ConcurrentModificationException agertzen da edo datuak galtzen dira:",
      "okerrekoKodea": "// Hari-segurua EZ den bilduma arrunta:\nList<String> zerrenda = new ArrayList<>(); // <-- AKATSA!\n\n// Hari anitzetan:\nzerrenda.add(\"Datua\");",
      "aukerak": [
        "Datu-egitura konkurrente bat erabili behar da: CopyOnWriteArrayList edo Collections.synchronizedList.",
        "ArrayList-en ordez String[] array finkoa erabili behar da.",
        "Hariak ezin dute zerrendarik erabili.",
        "add() metodoaren ordez set() erabili behar da."
      ],
      "zuzenaIndex": 0,
      "azalpena": "ArrayList arrunta ez da hari-segurua (Not Thread-Safe). 'CopyOnWriteArrayList' edo 'Collections.synchronizedList' erabili behar da aldibereko idazketak seguruak izateko.",
      "zuzenekoKodea": "// ZUZENA: Hari-segurua den bilduma\nList<String> zerrenda = new CopyOnWriteArrayList<>();\n// Edo: List<String> zerrenda = Collections.synchronizedList(new ArrayList<>());"
    },
    {
      "titulua": "9. ProcessBuilder: exitValue() waitFor() Aurretik",
      "enuntziatua": "Prozesuaren irteera-kodea eskuratzean IllegalThreadStateException jaurtitzen da:",
      "okerrekoKodea": "Process p = new ProcessBuilder(\"notepad.exe\").start();\nint kodea = p.exitValue(); // <-- AKATSA: Prozesua oraindik martxan dago!",
      "aukerak": [
        "Lehenik 'p.waitFor()' deitu behar da prozesua amaitu arte itxaroteko, edo 'int kodea = p.waitFor()' erabili.",
        "notepad.exe ordez cmd.exe jarri behar da.",
        "exitValue() kendu eta getPid() jarri behar da.",
        "ProcessBuilder-ek ez du irteera koderik eskaintzen."
      ],
      "zuzenaIndex": 0,
      "azalpena": "'exitValue()' soilik dei daiteke prozesua AMAITUA egoeran dagoenean. 'waitFor()' deitu behar da lehenik programa amaitu arte itxaroteko.",
      "zuzenekoKodea": "Process p = new ProcessBuilder(\"notepad.exe\").start();\nint kodea = p.waitFor(); // ZUZENA: amaitu arte itxaroten du eta kodea itzultzen du"
    },
    {
      "titulua": "10. wait() Synchronized Bloketik Kanpo Deitzea",
      "enuntziatua": "t.wait() deitzean 'IllegalMonitorStateException' salbuespena gertatzen da:",
      "okerrekoKodea": "Object giltza = new Object();\ngiltza.wait(); // <-- AKATSA: Ez dago synchronized bloke baten barruan!",
      "aukerak": [
        "'wait()' eta 'notify()' soilik dei daitezke objektu beraren 'synchronized (giltza)' blokearen barruan.",
        "wait() metodoari milisegundoak pasatu behar zaizkio beti.",
        "Object giltza 'Thread' bihurtu behar da.",
        "wait() ordez System.gc() deitu behar da."
      ],
      "zuzenaIndex": 0,
      "azalpena": "Javan objektu baten monitor-a eduki behar da (synchronized bidez) wait(), notify() edo notifyAll() deitu ahal izateko. Bestela JREak IllegalMonitorStateException jaurtitzen du.",
      "zuzenekoKodea": "Object giltza = new Object();\nsynchronized (giltza) { // ZUZENA: monitor-a hartu lehenik\n    try {\n        giltza.wait();\n    } catch (InterruptedException e) {}\n}"
    },
    {
      "titulua": "11. Semaphore: release() Falta Izatea Salbuespen Gertaeran",
      "enuntziatua": "Kode honek baimen-isuria ('Permit Leak') du fitxategia irakurtzean salbuespen bat gertatzen bada. Nola zuzendu behar da?",
      "okerrekoKodea": "Semaphore sem = new Semaphore(1);\nsem.acquire();\n// Errore bat gertatzen bada hemen, release() ez da inoiz exekutatuko!\nfitxategiaIrakurri();\nsem.release();",
      "aukerak": [
        "sem.acquire() metodotik baimen gehiago eskatu behar dira aldez aurretik.",
        "sem.release() deia 'finally' bloke baten barruan jarri behar da, salbuespena gertatu arren beti askatzeko.",
        "synchronized bloke bat gehitu behar da Semaphore-aren gainean.",
        "fitxategiaIrakurri() metodoa atzeko planoan Thread berri batean exekutatu behar da."
      ],
      "zuzenaIndex": 1,
      "azalpena": "sem.release() beti 'finally' blokean jarri behar da; bestela, errore batek baimena blokeatuta utziko luke betiko.",
      "zuzenekoKodea": "Semaphore sem = new Semaphore(1);\nsem.acquire();\ntry {\n    fitxategiaIrakurri();\n} finally {\n    sem.release(); // Beti exekutatuko da salbuespena gertatu arren\n}"
    },
    {
      "titulua": "12. ExecutorService: shutdown() Ez Deitzea",
      "enuntziatua": "Aplikazio hau ez da inoiz amaitzen nahiz eta main() metodoa amaitu. Zergatik?",
      "okerrekoKodea": "ExecutorService pool = Executors.newFixedThreadPool(4);\npool.execute(() -> System.out.println(\"Lana eginda\"));\n// Main metodoa amaitu da hemen...",
      "aukerak": [
        "pool.execute() ordez pool.start() erabili behar da hariak hiltzeko.",
        "ExecutorService-k atzeko hariak ez-daemon moduan mantentzen ditu; 'pool.shutdown()' deitu behar da lana amaitzean.",
        "newFixedThreadPool(4) ordez newSingleThreadExecutor() erabili behar da.",
        "System.exit(0) behartu behar da metodo guztien amaieran."
      ],
      "zuzenaIndex": 1,
      "azalpena": "ExecutorService-ko hariak ez-daemon dira eta bizirik geratzen dira ataza gehiagoren zain. 'shutdown()' deitu ezean JVM ez da inoiz itxiko.",
      "zuzenekoKodea": "ExecutorService pool = Executors.newFixedThreadPool(4);\npool.execute(() -> System.out.println(\"Lana eginda\"));\npool.shutdown(); // Atazak amaitutakoan hari-poola itzali eta JVM itxi"
    }
  ],
  "idazteak": [
    {
      "titulua": "1. Runnable Ataza eta Haria Sortu",
      "argibidea": "Idatzi kode zati bat: 'Runnable' inplementatzen duen ataza anonimo bat definitu 'run()' metodoarekin, eta 'Thread' berri batean 'start()' deitu:",
      "hitzGakoak": [
        "Runnable",
        "run",
        "Thread",
        "start"
      ],
      "azalpena": "Runnable instantziatu, run() metodoan lana jarri, Thread eraikitzaileari pasatu eta start() bidez abiarazi behar da.",
      "adibidea": "Thread t = new Thread(new Runnable() {\n    @Override\n    public void run() {\n        System.out.println(\"Haria martxan!\");\n    }\n});\nt.start();"
    },
    {
      "titulua": "2. Bi Hariren Amaierari Itxaron (join)",
      "argibidea": "Idatzi kode zatia: 't1' eta 't2' hariak abiarazi ostean, hari nagusiak biei 'join()' bidez itxaroteko egitura try-catch blokean:",
      "hitzGakoak": [
        "t1.join",
        "t2.join",
        "try",
        "catch",
        "InterruptedException"
      ],
      "azalpena": "Hari bakoitzaren join() deitu behar da InterruptedException harrapatzen duen try-catch egitura baten barruan.",
      "adibidea": "try {\n    t1.join();\n    t2.join();\n    System.out.println(\"Bi hariak amaitu dira!\");\n} catch (InterruptedException e) {\n    System.err.println(\"Eten da: \" + e.getMessage());\n}"
    },
    {
      "titulua": "3. Saldo Bankarioa Synchronized Blokearekin Babestu",
      "argibidea": "Idatzi 'ateraDirua(double zenbatekoa)' metodoa. 'lock' objektua erabiliz, egiaztatu saldoa >= zenbatekoa den eta kendu:",
      "hitzGakoak": [
        "synchronized",
        "lock",
        "saldoa",
        "zenbatekoa"
      ],
      "azalpena": "synchronized(lock) blokeak bermatzen du hainbat kutxazainek aldi berean saldo bera negatiboan ez uztea.",
      "adibidea": "public void ateraDirua(double zenbatekoa) {\n    synchronized (lock) {\n        if (saldoa >= zenbatekoa) {\n            saldoa -= zenbatekoa;\n            System.out.println(\"Aterata. Saldo berria: \" + saldoa);\n        } else {\n            System.out.println(\"Ez dago nahiko saldorik!\");\n        }\n    }\n}"
    },
    {
      "titulua": "4. ProcessBuilder Bidez Komandoa Abiarazi eta Itxaron",
      "argibidea": "Idatzi Java kodea: 'ProcessBuilder' bidez 'ping localhost' komandoa abiarazi eta bere irteera-kodeari 'waitFor()' bidez itxaron:",
      "hitzGakoak": [
        "ProcessBuilder",
        "start",
        "waitFor"
      ],
      "azalpena": "ProcessBuilder instantziatu parametroekin, start() deitu prozesua sortzeko eta waitFor() deitu amaiera jasotzeko.",
      "adibidea": "ProcessBuilder pb = new ProcessBuilder(\"ping\", \"localhost\");\nProcess p = pb.start();\nint kodea = p.waitFor();\nSystem.out.println(\"Prozesua amaitu da: \" + kodea);"
    },
    {
      "titulua": "5. Timer eta TimerTask Aldizkako Zikloa",
      "argibidea": "Idatzi kodea: 'Timer' bat sortu eta 3 segundoro (3000 ms) 'Mezua' inprimatzen duen 'TimerTask' ataza planifikatu:",
      "hitzGakoak": [
        "Timer",
        "TimerTask",
        "run",
        "scheduleAtFixedRate"
      ],
      "azalpena": "TimerTask-aren run() gainidatzi eta timer.scheduleAtFixedRate(ataza, delay, period) bidez errepikatu.",
      "adibidea": "Timer timer = new Timer();\nTimerTask ataza = new TimerTask() {\n    @Override\n    public void run() {\n        System.out.println(\"Mezua 3 segundoro!\");\n    }\n};\ntimer.scheduleAtFixedRate(ataza, 0, 3000);"
    },
    {
      "titulua": "6. ReentrantLock eta try-finally Blokea",
      "argibidea": "Idatzi 'lock.lock()' eta 'finally { lock.unlock(); }' bidezko kode eskema segurua:",
      "hitzGakoak": [
        "lock.lock",
        "try",
        "finally",
        "lock.unlock"
      ],
      "azalpena": "Lock-ak eskuratu ostean beti jarri behar da finally blokean unlock() deia.",
      "adibidea": "lock.lock();\ntry {\n    // Eskualde kritikoa\n    kontagailua++;\n} finally {\n    lock.unlock();\n}"
    },
    {
      "titulua": "7. SwingUtilities.invokeLater Erabiliz UI Eguneratu",
      "argibidea": "Idatzi 'SwingUtilities.invokeLater' deia atzeko haritik 'etiketa.setText(\"Eginda!\")' seguru exekutatzeko:",
      "hitzGakoak": [
        "SwingUtilities.invokeLater",
        "Runnable",
        "run"
      ],
      "azalpena": "SwingUtilities.invokeLater bidez UI eguneraketak EDT ilaran txertatzen dira.",
      "adibidea": "SwingUtilities.invokeLater(new Runnable() {\n    @Override\n    public void run() {\n        etiketa.setText(\"Eginda!\");\n    }\n});"
    },
    {
      "titulua": "8. AtomicInteger Lasterketa Baldintzarik Gabe",
      "argibidea": "Idatzi kontagailua gehitzen duen metodoa 'AtomicInteger' baten 'incrementAndGet()' erabiliz:",
      "hitzGakoak": [
        "AtomicInteger",
        "incrementAndGet"
      ],
      "azalpena": "AtomicInteger-ek blokeorik gabeko aldibereko gehikuntza segurua ahalbidetzen du.",
      "adibidea": "private AtomicInteger kontagailua = new AtomicInteger(0);\n\npublic int gehituBat() {\n    return kontagailua.incrementAndGet();\n}"
    },
    {
      "titulua": "9. Semaphore Bidez Sarbide Segurua Kudeatu",
      "argibidea": "Idatzi kode zatia: 'sem.acquire()' bidez baimena eskatu eta 'try-finally' blokean 'sem.release()' deitu.",
      "hitzGakoak": [
        "acquire",
        "release",
        "finally"
      ],
      "azalpena": "Baimena hartu eta beti finally barruan release() deitu behar da, salbuespenak gertatu arren baimena ez galtzeko.",
      "adibidea": "sem.acquire();\ntry {\n    System.out.println(\"Eskualde kritikoa\");\n} finally {\n    sem.release();\n}"
    },
    {
      "titulua": "10. CountDownLatch Kontagailua eta Itxaronaldia",
      "argibidea": "Idatzi kode zatia: ataza amaitzean 'latch.countDown()' deitu eta hari nagusian 'latch.await()' bidez itxaron.",
      "hitzGakoak": [
        "countDown",
        "await"
      ],
      "azalpena": "countDown()-ek kontagailua 1 jaisten du eta await()-ek kontagailua 0 izan arte blokeatzen du haria.",
      "adibidea": "// Hariaren barruan:\nlatch.countDown();\n\n// Hari nagusian:\nlatch.await();"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRAKTIKA_DATA };
}
