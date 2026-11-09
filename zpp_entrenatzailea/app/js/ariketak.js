/**
 * ZPP 1. Ebaluaketako Ariketa Praktikoen Datu-Egitura Osoa
 * Klaseko ataza errealetan oinarrituta (Hariak, Sinkronizazioa, ProcessBuilder, Swing EDT, Timer).
 * 
 * Azterketako 4 ariketa motak:
 * 1. KODEAREN AZALPENA (Klaseko kode errealak, kontzeptu gakoak eta azterketa galderak)
 * 2. KODEAN HUTSUNEAK BETE (Sintaxi kritikoa osatu)
 * 3. AKATSAK BILATU ETA ZUZENDU (Bug Hunter)
 * 4. KODE ZATIA IDATZI (Azterketako kode zatiak idatzi eta ebaluatu)
 */

const PRAKTIKA_DATA = {
  // =========================================================================
  // 1. KODEAREN AZALPENA (KLASEKO ARIKETA ERREALAK)
  // =========================================================================
  azalpenak: [
    {
      id: "prozesuak",
      izenburua: "2. Ataza: ProzesuExekutatzailea (ProcessBuilder eta ProcessHandle)",
      deskribapena: "Komando-lerrotik programa bat abiarazi, PID zenbakia lortu, SEaren hasiera-ordua eskuratu eta prozesuaren amaierari itxaron.",
      fitxategia: "ProzesuExekutatzailea.java",
      kodea: `// 1. Komandoa eta parametroak banatu espazioen arabera
String[] zatiak = komandoa.split("\\\\s+");

// 2. ProcessBuilder instantziatu parametro zerrendarekin
ProcessBuilder pb = new ProcessBuilder(zatiak);

// 3. Prozesua abiarazi sistema eragilearen kernelean
Process prozesua = pb.start();

// 4. PID zenbakia eskuratu modu eramangarrian (Java 9+)
long pid = prozesua.pid();
System.out.println("Prozesuaren PIDa: " + pid);

// 5. Sistema Eragilearen hasiera-une zehatza eskuratu ProcessHandle bidez
ProcessHandle.Info info = prozesua.info();
if (info.startInstant().isPresent()) {
    Instant instant = info.startInstant().get();
    LocalDateTime hasiera = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
    System.out.println("Hasiera-ordua: " + hasiera.format(FORMATZAILEA));
}

// 6. Prozesua amaitu arte itxaron eta bere irteera-kodea (exit code) jaso
int irteeraKodea = prozesua.waitFor();
System.out.println("Prozesua amaitu da kode honekin: " + irteeraKodea);`,
      kontzeptuak: [
        {
          lerroa: "ProcessBuilder pb = new ProcessBuilder(zatiak);",
          azalpena: "ProcessBuilder-ek exekutatuko den programaren izena eta bere argumentuak jasotzen ditu banatuta, komatxo eta espazio arazoak saihesteko."
        },
        {
          lerroa: "Process prozesua = pb.start();",
          azalpena: "start() deitzean SEaren kernelak memoria esleitzen du, helbide-eremu berria sortzen du eta prozesua PREST/EXEKUZIOAN jartzen du."
        },
        {
          lerroa: "long pid = prozesua.pid();",
          azalpena: "Java 9tik aurrera prozesuaren PID (Process ID) zenbakia zuzenean eskuratzen da platforma-independentzia bermatuz."
        },
        {
          lerroa: "int irteeraKodea = prozesua.waitFor();",
          azalpena: "waitFor() metodoak uneko Java haria blokeatzen du kanpoko prozesua AMAITUA egoerara igaro arte. 0 = Arrakasta; 0 != Errorea."
        }
      ],
      galdetegia: [
        {
          galdera: "Zer gertatuko litzateke 'waitFor()' deitu beharrean zuzenean 'prozesua.exitValue()' deituko bagenu?",
          erantzuna: "Prozesua oraindik amaitu ez bada, 'IllegalThreadStateException' salbuespena jaurtiko luke JREak."
        },
        {
          galdera: "Nola behartu dezakegu erantzuten ez duen prozesu bat hiltzera?",
          erantzuna: "'prozesua.destroyForcibly()' deituz (OS mailan SIGKILL bidaltzen du)."
        }
      ]
    },
    {
      id: "hariak_hastapenak",
      izenburua: "Harien Hastapenak: Thread vs Runnable (Ataza.java & Haria.java)",
      deskribapena: "Hariak sortzeko bi bide nagusiak: Thread hedatzea (extends) ala Runnable inplementatzea (implements), eta haien abantailak.",
      fitxategia: "Ataza.java / Haria.java",
      kodea: `// 1. AUKERA GOMENDATUA: Runnable inplementatzea
public class Ataza implements Runnable {
    private String izena;
    public Ataza(String izena) { this.izena = izena; }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Ataza: " + izena + " -> Zenbakia: " + i);
            try {
                Thread.sleep(500); // 500 ms itxaron (BLOKEATUA egoera)
            } catch (InterruptedException e) {
                System.out.println("Haria eten da!");
                break;
            }
        }
    }
}

// 2. AUKERA: Thread klasea hedatzea (Herentzia anitza mugatzen du)
public class Haria extends Thread {
    private volatile boolean martxan = true;

    public void gelditu() { this.martxan = false; }

    @Override
    public void run() {
        while (martxan) {
            System.out.println("Haria: " + this.getName() + " lanean");
            try { Thread.sleep(500); } catch (InterruptedException e) { break; }
        }
    }
}

// PROGRAMA NAGUSIA (APP.java):
// Ataza instantziatu eta Thread berri batean bildu:
Ataza ataza1 = new Ataza("A-Ataza");
Thread h1 = new Thread(ataza1);
h1.start(); // <-- start() deitu behar da, EZ run()!`,
      kontzeptuak: [
        {
          lerroa: "public class Ataza implements Runnable",
          azalpena: "Runnable interfaze funtzionala da. Klaseak bere herentzia libre mantentzen du beste klase bat hedatu ahal izateko (adibidez JFrame)."
        },
        {
          lerroa: "h1.start(); (EZ h1.run())",
          azalpena: "start() metodoak sistema eragilean exekuzio-pila (Call Stack) berria sortzen du eta barnean run() abiarazten du. run() eskuz deituko bagenu, hari nagusi beraren barruan modu sekuentzialean exekutatuko litzateke!"
        },
        {
          lerroa: "Thread.sleep(500) eta InterruptedException",
          azalpena: "sleep() metodoak haria BLOKEATUA (TIMED_WAITING) egoerara eramaten du. Beste hari batek interrupt() deitzen badio, InterruptedException sortuko da."
        }
      ],
      galdetegia: [
        {
          galdera: "Zergatik da 'implements Runnable' eredu gomendatua 'extends Thread' baino gehiago?",
          erantzuna: "Javak herentzia sinplea soilik onartzen duelako (klase bakar bat hedatu daiteke) eta atazaren logika harien kudeaketatik bereizten duelako (Separation of Concerns)."
        }
      ]
    },
    {
      id: "hariak_join",
      izenburua: "Harien Koordinazioa: join() Mekanismoa (APP.java vs APP_join_gabe.java)",
      deskribapena: "Zeregin bat N zatitan banatu eta H hariren bidez paraleloan zenbatu. Hari guztiek amaitu arte main haria itxaronaraztea.",
      fitxategia: "ataza_ariketa/APP.java",
      kodea: `List<Thread> hariak = new ArrayList<>();
int unekoHasiera = 1;

for (int i = 0; i < h; i++) {
    int tamaina = oinarrizkoTamaina + (i < hondarra ? 1 : 0);
    int unekoBukaera = unekoHasiera + tamaina - 1;
    String izena = "Hari-" + (i + 1);

    KontagailuAtaza ataza = new KontagailuAtaza(izena, unekoHasiera, unekoBukaera);
    Thread haria = new Thread(ataza);
    hariak.add(haria);

    unekoHasiera = unekoBukaera + 1;
}

// 1. Hari guztiak martxan jarri
for (Thread t : hariak) {
    t.start();
}

// 2. Hari guztiak amaitu arte ITXARON (join erabiliz)
for (Thread t : hariak) {
    try {
        t.join(); // Main haria blokeatzen da 't' amaitu arte
    } catch (InterruptedException e) {
        System.err.println("Hari nagusia etenda: " + e.getMessage());
    }
}

// 3. Guztiek amaitzean soilik inprimatuko da hau:
System.out.println("Kontaketa guztiz amaituta dago!");`,
      kontzeptuak: [
        {
          lerroa: "t.join();",
          azalpena: "join() deitzen duen haria (kasu honetan main) BLOKEATUA (WAITING) egoeran geratzen da 't' haria AMAITUA (TERMINATED) egoerara iritsi arte."
        },
        {
          lerroa: "Zer gertatzen da join() GABE (APP_join_gabe.java)?",
          azalpena: "Hari nagusia ez da gelditzen; 'Kontaketa guztiz amaituta dago!' mezua BEREHALA agertuko da kontsolan, beste hariak oraindik kontatzen hasi ere egin ez direnean!"
        }
      ],
      galdetegia: [
        {
          galdera: "join() metodoak hari guztiak sekuentzialki bihurtzen al ditu?",
          erantzuna: "EZ, hari guztiak aurretik start() bidez martxan jarri badira, paraleloan ari dira korrika; join() begiztak soilik bermatzen du azken emaitza denak amaitutakoan irakurriko dela."
        }
      ]
    },
    {
      id: "is_alive",
      izenburua: "Hariaren Bizitza Egiaztatzea: isAlive() (AtazaAlive.java)",
      deskribapena: "Hari batek beste baten egoera monitorizatzea isAlive() erabiliz eta hura amaitzean bere lana amaitzea.",
      fitxategia: "is_alive/AtazaAlive.java",
      kodea: `public class AtazaAlive implements Runnable {
    private Thread besteHaria;

    public AtazaAlive(Thread besteHaria) {
        this.besteHaria = besteHaria;
    }

    @Override
    public void run() {
        // Beste haria bizirik dagoen bitartean jarraitu lanean
        while (besteHaria.isAlive()) {
            System.out.println("Monitorizatzen: beste haria oraindik BIZIRIK dago...");
            try {
                Thread.sleep(500); // 500 ms-ro egiaztatu
            } catch (InterruptedException ie) {
                System.out.println("Monitorea etenda");
                break;
            }
        }
        System.out.println("Beste hariak amaitu du, ni ere banoa!");
    }
}`,
      kontzeptuak: [
        {
          lerroa: "besteHaria.isAlive()",
          azalpena: "Boolean itzultzen du: 'true' baldin eta haria start() egin bada eta oraindik run() amaitu ez badu (Ready, Running edo Blocked egoeretan dagoenean). New edo Terminated egoeran 'false' itzultzen du."
        }
      ],
      galdetegia: [
        {
          galdera: "Zein egoeratan itzultzen du isAlive()-k 'false'?",
          erantzuna: "Haria sortu berri denean (NEW, start deitu gabe) edo hariaren run() metodoa guztiz amaitu denean (TERMINATED)."
        }
      ]
    },
    {
      id: "kotxeak",
      izenburua: "Kotxe Lasterketa: Konkurrentzia eta Sinkronizazioa (KotxeLasterketa.java)",
      deskribapena: "Hainbat kotxe hari independenteetan, JProgressBar aurrerapenarekin eta irabazle bakarra zehazteko 'synchronized' bloke kritikoa.",
      fitxategia: "KotxeLasterketa.java",
      kodea: `// Partekatutako egoera (Shared State)
private volatile boolean lasterketaAmaituta = false;
private String irabazlea = "";
private final Object giltza = new Object(); // Lock objektua

// Auto bakoitzeko haria:
Thread autoHaria = new Thread(new Runnable() {
    @Override
    public void run() {
        double unekoDistantzia = 0.0;
        while (!lasterketaAmaituta && unekoDistantzia < helburuDistantzia) {
            try {
                Thread.sleep(100); // 100 ms itxaron
                unekoDistantzia += autoAbiadura * 0.1;

                if (unekoDistantzia >= helburuDistantzia) {
                    unekoDistantzia = helburuDistantzia;
                    
                    // SINKRONIZAZIO ESKUALDE KRITIKOA:
                    synchronized (giltza) {
                        if (!lasterketaAmaituta) {
                            lasterketaAmaituta = true;
                            irabazlea = "Autoa " + autoZenbakia;
                        }
                    }
                }

                final double distFinala = unekoDistantzia;
                SwingUtilities.invokeLater(() -> {
                    barrak[indizea].setValue((int) distFinala);
                    lblDistantziak[indizea].setText(String.format("%.1f m", distFinala));
                });
            } catch (InterruptedException e) { break; }
        }
    }
});
autoHaria.start();`,
      kontzeptuak: [
        {
          lerroa: "private volatile boolean lasterketaAmaituta = false;",
          azalpena: "volatile hitz gakoak bermatzen du aldagai honen idazketak berehala RAM memoria nagusian idatziko direla eta beste hari guztiek unean bertan ikusiko dutela (CPU katxe desfasajeak saihestuz)."
        },
        {
          lerroa: "synchronized (giltza) { ... }",
          azalpena: "Lock objektu bera erabiliz hari bakar bat sar daiteke aldi berean barruko blokera. Horrela, bi autok aldi berean helmuga gaindituta ere, irabazle bakar bat izendatuko da (Race Condition saihestuz)."
        },
        {
          lerroa: "SwingUtilities.invokeLater(() -> { ... });",
          azalpena: "Swing interfazea hari-segurua EZ denez (Not Thread-Safe), osagai grafikoen aldaketak (setValue, setText) Event Dispatch Thread (EDT) hariari pasatu behar zaizkio beti."
        }
      ],
      galdetegia: [
        {
          galdera: "Zergatik dago 'if (!lasterketaAmaituta)' baldintza synchronized blokearen barruan berriz?",
          erantzuna: "Double-Checked Locking delako: bi hari batera iristen badira, lehenengoak irabazlea jarri eta gero bigarrena sartzean egiaztatu dezan lasterketa jada amaituta dagoela."
        }
      ]
    },
    {
      id: "kronometroa",
      izenburua: "Kronometroa & EDT Segurtasuna (Cronometroa.java & AtzerakoKontua.java)",
      deskribapena: "Zergatik blokeatzen den pantaila Thread.sleep botoi baten barruan deitzean eta nola konpontzen den atzeko haria erabiliz.",
      fitxategia: "Cronometroa.java",
      kodea: `// Botoia sakatzean exekutatzen den kodea (EDT haria):
btnIniciar.addActionListener(e -> {
    btnIniciar.setEnabled(false);
    btnParar.setEnabled(true);
    martxan = true;

    // KRONOMETRO HARIA (Atzeko planoko haria):
    kronometroHaria = new Thread(() -> {
        int pasatakoak = 0;
        while (pasatakoak < segunduGuztira && martxan) {
            try {
                Thread.sleep(1000); // 1 segundo itxaron
                pasatakoak++;

                final int seg = pasatakoak;
                // UI eguneraketak EDT hariari bidali:
                SwingUtilities.invokeLater(() -> {
                    progressBar.setValue(seg);
                    lblEgoera.setText(seg + " / " + segunduGuztira + " s");
                });
            } catch (InterruptedException ex) {
                break; // Parar sakatzean etena
            }
        }
        SwingUtilities.invokeLater(() -> {
            btnIniciar.setEnabled(true);
            btnParar.setEnabled(false);
        });
    });
    kronometroHaria.start();
});`,
      kontzeptuak: [
        {
          lerroa: "Zergatik ez dugu Thread.sleep(1000) zuzenean ActionListener-en egiten?",
          azalpena: "ActionListener-ak Event Dispatch Thread (EDT) barruan exekutatzen dira. Bertan sleep egiten bada, interfaze osoa izoztuta geratzen da: leihoa ez da berriz marrazten eta 'Parar' botoiak ez du klikik onartzen."
        }
      ],
      galdetegia: [
        {
          galdera: "Nola gelditu dezakegu martxan dagoen kronometro haria?",
          erantzuna: "'martxan = false;' bandera ezarriz edo 'kronometroHaria.interrupt()' deituz sleep-etik ateratzeko."
        }
      ]
    },
    {
      id: "timer",
      izenburua: "Timer eta TimerTask: Aldizkako Jakinarazpenak (LuzatzeAtaza.java)",
      deskribapena: "Java java.util.Timer eta TimerTask klaseak erabiliz denbora-tarte finko batean atazak errepikatzea eta SystemTray bidez jakinaraztea.",
      fitxategia: "LuzatzeAtaza.java",
      kodea: `public class LuzatzeAtaza extends TimerTask {
    private int kontagailua = 0;
    private TrayIcon trayIcon;

    public LuzatzeAtaza(TrayIcon trayIcon) {
        this.trayIcon = trayIcon;
    }

    @Override
    public void run() {
        kontagailua++;
        System.out.println("Timer ataza exekutatzen: " + kontagailua + ". aldia");
        if (trayIcon != null) {
            trayIcon.displayMessage(
                "Luzatze Abisua!",
                "Gorputza luzatzeko ordua iritsi da (" + kontagailua + ")",
                TrayIcon.MessageType.INFO
            );
        }
    }
}

// PROGRAMA NAGUSIAN:
Timer timer = new Timer();
LuzatzeAtaza ataza = new LuzatzeAtaza(trayIcon);

// Hasierako atzerapena: 0 ms; Aldizkako tartea: 5000 ms (5 segundoro)
timer.scheduleAtFixedRate(ataza, 0, 5000);`,
      kontzeptuak: [
        {
          lerroa: "timer.scheduleAtFixedRate(ataza, delay, period);",
          azalpena: "scheduleAtFixedRate-k zehaztutako period bakoitzean TimerTask-aren run() metodoa exekutatuko du background hari batean."
        },
        {
          lerroa: "timer.cancel(); eta ataza.cancel();",
          azalpena: "Timer-ak background hari bat bizirik mantentzen du berez; programa amaitu ahal izateko timer.cancel() deitu behar da baliabideak askatzeko."
        }
      ],
      galdetegia: [
        {
          galdera: "Zer desberdintasun dago schedule() eta scheduleAtFixedRate() metodoen artean?",
          erantzuna: "scheduleAtFixedRate errepikapen zorrotzetarako da (atzerapenak konpentsatzen ditu); schedule errepikapen bakoitzaren arteko tarte erlatiboa mantentzeko da."
        }
      ]
    },
    {
      id: "lanketa4",
      izenburua: "Konkurrentziaren 5 Arazoak: Deadlock & Inanizioa (Lanketa IV)",
      deskribapena: "Hil-blokeoa (Deadlock) eta Inanizioa (Starvation). Zergatik gertatzen diren eta nola konpondu Resource Ordering eta Fairness bidez.",
      fitxategia: "DeadlockAdibidea.java / InanizioAdibidea.java",
      kodea: `// DEADLOCK ARRISKUA (Alderantzizko blokeoa):
// Haria 1: Lock A hartu eta Lock B-ren zain geratu
// Haria 2: Lock B hartu eta Lock A-ren zain geratu -> BETIKO BLOKEOA!

// KONPONBIDEA: BALIABIDEEN ORDENAMENDUA (RESOURCE ORDERING)
// Bi hariek BETI ordena berean hartu behar dituzte blokeoak:
public void transferitu(Kontua nork, Kontua nori, double dirua) {
    Kontua lehena = nork.getId() < nori.getId() ? nork : nori;
    Kontua bigarrena = nork.getId() < nori.getId() ? nori : nork;

    synchronized (lehena) {
        synchronized (bigarrena) {
            nork.atera(dirua);
            nori.sartu(dirua);
        }
    }
}

// INANIZIOA SAIHESTEKO BIDEZKO LOCK-A (FAIRNESS):
// Lock arruntek ez dute FIFO bermatzen; bidezkoak bai:
Lock bidezkoGiltza = new ReentrantLock(true); // true = Fair / FIFO ilara`,
      kontzeptuak: [
        {
          lerroa: "Coffman-en 4 baldintzak (Deadlock)",
          azalpena: "Elkarrekiko Bazterketa, Eutsi eta Itxaron, Kaleratzerik Ez, eta Itxaronaldi Zirkularra. Lauak aldi berean betetzen direnean soilik gertatzen da Deadlock."
        },
        {
          lerroa: "new ReentrantLock(true)",
          azalpena: "Fairness parametroak gehien itxaroten daraman hariari emango dio sarbidea (FIFO ilara), lehentasun txikiko hariak gosez hil ez daitezen (Inanizioa saihestuz)."
        }
      ],
      galdetegia: [
        {
          galdera: "Deadlock-a gertatzeko 4 baldintzetatik zein apurtzen du Resource Ordering teknikak?",
          erantzuna: "Itxaronaldi Zirkularra (Circular Wait) baldintza apurtzen du."
        }
      ]
    }
  ],

  // =========================================================================
  // 2. KODEAN HUTSUNEAK BETE (10 ARIKETA OSOAK)
  // =========================================================================
  betetzeak: [
    {
      titulua: "1. Kotxe Lasterketako Irabazlearen Sinkronizazioa",
      argibidea: "Bete 'volatile' aldagaia eta 'synchronized' blokea irabazlea zehazteko:",
      hasierakoKodea: `// Aldagaia RAM nagusian berehala ikusteko:
private _____ boolean lasterketaAmaituta = false;

// Eskualde kritikoa babesteko blokeoa:
_____ (giltza) {
    if (!lasterketaAmaituta) {
        lasterketaAmaituta = true;
        irabazlea = "Autoa " + zenbakia;
    }
}`,
      soluzioa: ["volatile", "synchronized"],
      azalpena: "'volatile'-k CPU katxe desfasajeak saihesten ditu, eta 'synchronized(giltza)'-k hariei elkarrekiko bazterketa ezartzen die irabazle bakar bat izateko."
    },
    {
      titulua: "2. Runnable Inplementatu eta Haria Abiarazi",
      argibidea: "Bete 'implements Runnable' eta haria abiarazteko deia:",
      hasierakoKodea: `public class NireAtaza _____ Runnable {
    @Override
    public void run() {
        System.out.println("Ataza lanean");
    }
}

// Main metodoan:
Thread haria = new Thread(new NireAtaza());
haria._____();`,
      soluzioa: ["implements", "start"],
      azalpena: "Interfazeak inplementatzeko 'implements' erabiltzen da, eta haria sistema eragilean lanean jartzeko 'start()' deitu behar da ('run()' deitu ordez)."
    },
    {
      titulua: "3. join() Bidez Haria Amaitu Arte Itxaron",
      argibidea: "Bete hari nagusiak beste haria amaitu arte itxaroteko metodoa eta salbuespena:",
      hasierakoKodea: `Thread t = new Thread(ataza);
t.start();

try {
    t._____(); // Hari nagusiak 't' amaitu arte itxaroten du
} catch (_____ e) {
    System.err.println("Itxaronaldia eten da!");
}`,
      soluzioa: ["join", "InterruptedException"],
      azalpena: "'t.join()' metodoak uneko haria blokeatzen du 't' amaitu arte, eta hari hori eteten bada 'InterruptedException' jaurtitzen du."
    },
    {
      titulua: "4. Haria Bizirik Dagoen Egiaztatzea (isAlive)",
      argibidea: "Bete hariaren bizitza egiaztatzeko metodoa eta eteteko komandoa:",
      hasierakoKodea: `while (besteHaria._____()) {
    System.out.println("Martxan jarraitzen du...");
    try {
        Thread._____(500);
    } catch (InterruptedException e) {
        break;
    }
}`,
      soluzioa: ["isAlive", "sleep"],
      azalpena: "'isAlive()' metodoak haria amaitu ez dela egiaztatzen du, eta 'Thread.sleep(500)' metodoak 500 ms itxaroten du."
    },
    {
      titulua: "5. AtomicInteger Lasterketa Baldintzarik Gabe",
      argibidea: "Bete zenbaki atomikoen klasea eta gehikuntza atomikoaren metodoa:",
      hasierakoKodea: `// Race condition saihesteko zenbaki atomikoa:
private _____ kontagailua = new AtomicInteger(0);

public void gehituBat() {
    kontagailua._____(); // i++ eragiketa modu atomikoan egin
}`,
      soluzioa: ["AtomicInteger", "incrementAndGet"],
      azalpena: "'AtomicInteger'-ek hardwarearen CAS (Compare-And-Swap) aginduak erabiltzen ditu 'incrementAndGet()' atomikoki exekutatzeko blokeorik gabe."
    },
    {
      titulua: "6. ReentrantLock eta Eskualde Kritiko Segurua",
      argibidea: "Bete ReentrantLock blokeoa eskuratu eta beti askatzeko egitura:",
      hasierakoKodea: `Lock giltza = new ReentrantLock();

giltza._____();
try {
    // Eskualde kritikoa
    saldoa -= kopurua;
} _____ {
    giltza.unlock(); // Beti askatu, salbuespena gertatuta ere!
}`,
      soluzioa: ["lock", "finally"],
      azalpena: "'giltza.lock()' deitu ostean, 'finally' blokeak bermatzen du 'unlock()' beti exekutatuko dela salbuespen bat gertatuta ere."
    },
    {
      titulua: "7. ProcessBuilder Bidez Prozesua Sortu eta Itxaron",
      argibidea: "Bete ProcessBuilder instantziazioa eta prozesuaren amaierari itxaroteko agindua:",
      hasierakoKodea: `ProcessBuilder pb = new _____(Arrays.asList("ping", "localhost"));
Process p = pb.start();

// Prozesua amaitu arte itxaron eta exit kodea jaso:
int irteera = p._____();`,
      soluzioa: ["ProcessBuilder", "waitFor"],
      azalpena: "'ProcessBuilder'-ek prozesua konfiguratzen du, 'start()'-ek abiarazten du eta 'waitFor()'-ek amaitu arte itxaronarazten dio Java programari."
    },
    {
      titulua: "8. Timer eta TimerTask Aldizkako Zikloa",
      argibidea: "Bete Timer-aren metodoa eta ataza amaitzeko deia:",
      hasierakoKodea: `Timer timer = new Timer();
TimerTask ataza = new LuzatzeAtaza();

// 0 ms atzerapenez hasi eta 3000 ms-ro errepikatu:
timer._____(ataza, 0, 3000);

// Geroago timer-a gelditzeko:
timer._____();`,
      soluzioa: ["scheduleAtFixedRate", "cancel"],
      azalpena: "'scheduleAtFixedRate'-k aldizkako planifikazio zehatza egiten du, eta 'cancel()'-ek timer-aren background haria hiltzen du."
    },
    {
      titulua: "9. SwingUtilities.invokeLater UI Segururako",
      argibidea: "Bete Swing EDT harira lana bidaltzeko metodo estatikoa:",
      hasierakoKodea: `// Atzeko haritik Swing elementu bat aldatzeko:
_____.invokeLater(new Runnable() {
    @Override
    public void run() {
        progressBar.setValue(100);
        etiketa.setText("Amaituta!");
    }
});`,
      soluzioa: ["SwingUtilities"],
      azalpena: "'SwingUtilities.invokeLater'-ek UI eguneraketak Event Dispatch Thread (EDT) ilaran jartzen ditu modu hari-seguruan."
    },
    {
      titulua: "10. BlockingQueue Ekoizle-Kontsumitzailea",
      argibidea: "Bete BlockingQueue-tik elementua ateratzeko blokeo-metodoa:",
      hasierakoKodea: `BlockingQueue<String> ilara = new ArrayBlockingQueue<>(10);

// Ekoizleak elementua sartu (ilara beteta badago blokeatzen da):
ilara.put("Paketea");

// Kontsumitzaileak elementua atera (hutsik badago blokeatzen da):
String mezua = ilara._____();`,
      soluzioa: ["take"],
      azalpena: "'take()' metodoak elementu bat ateratzen du, eta ilara hutsik badago automatikoki itxaroten du norbaitek 'put()' egin arte."
    }
  ],

  // =========================================================================
  // 3. AKATSAK BILATU ETA ZUZENDU (BUG HUNTER - 10 ARIKETA)
  // =========================================================================
  zuzenketak: [
    {
      titulua: "1. run() vs start() Nahastea",
      enuntziatua: "Programatzaileak haria abiarazi nahi du, baina dena sekuentzialki exekutatzen da eta programa blokeatu egiten da:",
      okerrekoKodea: `Thread haria = new Thread(new Runnable() {
    @Override
    public void run() {
        egindakoKalkuluLuzea();
    }
});
haria.run(); // <-- HEMEN AKATSA!`,
      aukerak: [
        "'haria.run()' ordez 'haria.start()' deitu behar da hari berria sortzeko.",
        "'haria.execute()' deitu behar da Java 17tik aurrera.",
        "'haria.run()' metodoari 'true' parametroa pasatu behar zaio.",
        "Runnable-k ezin du metodo propiorik exekutatu."
      ],
      zuzenaIndex: 0,
      azalpena: "'run()' deitzeak ez du hari berririk sortzen; deitu duen hari beraren barruan metodo arrunt bat bezala exekutatzen da. 'start()' deitu behar da sistema eragileak hari paralelo berri bat sor dezan.",
      zuzenekoKodea: `Thread haria = new Thread(new Runnable() {
    @Override
    public void run() {
        egindakoKalkuluLuzea();
    }
});
haria.start(); // ZUZENA: OS mailako hari berria abiarazten du`
    },
    {
      titulua: "2. Swing EDT Haria Blokeatzea",
      enuntziatua: "Botoia sakatzean aplikazioaren leiho osoa izoztu egiten da 10 segundoz eta ez du klikik onartzen:",
      okerrekoKodea: `botoia.addActionListener(e -> {
    try {
        Thread.sleep(10000); // <-- AKATSA: EDT haria lo geratzen da!
        etiketa.setText("Amaitua!");
    } catch (InterruptedException ex) {}
});`,
      aukerak: [
        "Thread.sleep(10000) deia background hari batean sartu behar da eta emaitza invokeLater bidez eguneratu.",
        "Etiketa aldatu aurretik botoia.setVisible(false) deitu behar da.",
        "Thread.sleep-ek milisegundoak ordez segundoak behar ditu.",
        "Swing-en ezin da inoiz itxaronaldirik egin."
      ],
      zuzenaIndex: 0,
      azalpena: "ActionListener-ak Event Dispatch Thread (EDT) barruan dabiltza. EDT lo geratzen bada, ezin du leihoa berriz marraztu ezta beste gertaerarik prozesatu. Ataza luzeak background Thread batean egin behar dira.",
      zuzenekoKodea: `botoia.addActionListener(e -> {
    new Thread(() -> {
        try {
            Thread.sleep(10000);
            SwingUtilities.invokeLater(() -> etiketa.setText("Amaitua!"));
        } catch (InterruptedException ex) {}
    }).start();
});`
    },
    {
      titulua: "3. Deadlock Zirkularra (Lock Alderantziz)",
      enuntziatua: "Bi harik elkarren baliabideak itxaroten dituzte eta programa betiko blokeatzen da:",
      okerrekoKodea: `// Hari 1:
synchronized (lockA) {
    synchronized (lockB) { lana1(); }
}
// Hari 2:
synchronized (lockB) { // <-- AKATSA: Alderantzizko ordena!
    synchronized (lockA) { lana2(); }
}`,
      aukerak: [
        "Bi hariek BETI ordena berean hartu behar dituzte lock-ak (Resource Ordering): lehenik lockA, gero lockB.",
        "lockB objektua 'volatile' deklaratu behar da.",
        "synchronized blokeak kendu eta for ziklo bat erabili behar da.",
        "Lock bakoitzari izen bera jarri behar zaio."
      ],
      zuzenaIndex: 0,
      azalpena: "Deadlock-aren kausa nagusia 'Itxaronaldi Zirkularra' da. Bi hariek blokeoak beti ordena berean hartzen badituzte (Resource Ordering), sekula ezin da ziklorik sortu.",
      zuzenekoKodea: `// Hari 1:
synchronized (lockA) {
    synchronized (lockB) { lana1(); }
}
// Hari 2 (ORDENA BEREAN):
synchronized (lockA) {
    synchronized (lockB) { lana2(); }
}`
    },
    {
      titulua: "4. join() Gabe Balioa Irakurtzea",
      enuntziatua: "Haria amaitu aurretik emaitza irakurtzen da eta beti 0 edo balio okerra agertzen da:",
      okerrekoKodea: `BatuketaAtaza ataza = new BatuketaAtaza();
Thread t = new Thread(ataza);
t.start();

// <-- AKATSA: t.join() falta da hemen!
System.out.println("Emaitza: " + ataza.getEmaitza());`,
      aukerak: [
        "Emaitza irakurri aurretik 't.join()' deitu behar da hariak bere lana amaitu arte itxaroteko.",
        "getEmaitza() metodoa 'static' bihurtu behar da.",
        "t.start() ordez t.run() deitu behar da.",
        "System.out.println kendu eta fitxategi batean idatzi behar da."
      ],
      zuzenaIndex: 0,
      azalpena: "Hari nagusiak ez badio 't' hariaren amaierari itxaroten (t.join()), getEmaitza() deitzen denean ataza oraindik kalkulatzen ariko da eta balio lehenetsia (0) irakurriko du.",
      zuzenekoKodea: `BatuketaAtaza ataza = new BatuketaAtaza();
Thread t = new Thread(ataza);
t.start();
try {
    t.join(); // ZUZENA: amaitu arte itxaron
} catch (InterruptedException e) {}
System.out.println("Emaitza: " + ataza.getEmaitza());`
    },
    {
      titulua: "5. Memoria Inkontsistentzia (volatile falta)",
      enuntziatua: "Beste hari batek 'gelditu = true' ezarri arren, while begiztak ez du sekula amaitzen:",
      okerrekoKodea: `// Aldagai arrunta (CPU katxean geratzen da):
private boolean gelditu = false; // <-- AKATSA: volatile falta!

public void run() {
    while (!gelditu) {
        // lana egin
    }
}`,
      aukerak: [
        "'private volatile boolean gelditu = false;' deklaratu behar da.",
        "gelditu aldagaia 'final' egin behar da.",
        "while begiztaren barruan System.exit(0) jarri behar da.",
        "Interfaze grafikoan bakarrik erabil daiteke boolean."
      ],
      zuzenaIndex: 0,
      azalpena: "'volatile' gabe, hari bakoitzak aldagaiaren kopia bat gorde dezake bere CPU erregistro/katxean. 'volatile' gehitzean aldaketa guztiak RAM nagusira doaz zuzenean.",
      zuzenekoKodea: `private volatile boolean gelditu = false; // ZUZENA

public void run() {
    while (!gelditu) {
        // berehala detektatuko du balio aldaketa
    }
}`
    },
    {
      titulua: "6. Synchronized Objektu Berri Baten Gainean",
      enuntziatua: "Sinkronizazio blokea jarrita ere, lasterketa-baldintzak (Race Condition) jarraitzen du gertatzen:",
      okerrekoKodea: `public void gehitu() {
    // <-- AKATSA: Dei bakoitzean objektu berria sortzen da!
    synchronized (new Object()) {
        kontagailua++;
    }
}`,
      aukerak: [
        "Partekatutako 'final Object lock = new Object()' instantzia bera erabili behar dute hari guztiek.",
        "new Object() ordez new String() erabili behar da.",
        "kontagailua bider 2 egin behar da.",
        "synchronized kendu eta if jarri behar da."
      ],
      zuzenaIndex: 0,
      azalpena: "'new Object()' jartzean hari bakoitzak bere objektu propioa blokeatzen du; beraz, inor ez da bestearen zain geratzen! Blokeo objektuak partekatua izan behar du.",
      zuzenekoKodea: `private final Object lock = new Object(); // ZUZENA: partekatua

public void gehitu() {
    synchronized (lock) {
        kontagailua++;
    }
}`
    },
    {
      titulua: "7. ReentrantLock: unlock() finally Barruan Ez Egotea",
      enuntziatua: "Metodoan salbuespen bat gertatzen bada, giltza ez da sekula askatzen eta programa betiko blokeatzen da:",
      okerrekoKodea: `lock.lock();
eragiketaArriskutsua(); // Salbuespena bota dezake!
lock.unlock(); // <-- AKATSA: Salbuespena badago ez da hona iritsiko!`,
      aukerak: [
        "'lock.unlock()' agindua beti 'try ... finally' blokeko 'finally'-ren barruan jarri behar da.",
        "lock.unlock() hasieran deitu behar da.",
        "Salbuespena jaurti ordez eragiketa ezabatu behar da.",
        "ReentrantLock-ek ez du askatu beharrik."
      ],
      zuzenaIndex: 0,
      azalpena: "Lock-ak beti askatu behar dira 'finally' blokean, salbuespen batek metodoa eten arren giltza askatuko dela bermatzeko.",
      zuzenekoKodea: `lock.lock();
try {
    eragiketaArriskutsua();
} finally {
    lock.unlock(); // ZUZENA: Beti askatuko da
}`
    },
    {
      titulua: "8. ArrayList Arrunta Hari Anitzetan Erabiltzea",
      enuntziatua: "Hainbat harik aldi berean zerrendara elementuak gehitzen dituztenean, ConcurrentModificationException agertzen da edo datuak galtzen dira:",
      okerrekoKodea: `// Hari-segurua EZ den bilduma arrunta:
List<String> zerrenda = new ArrayList<>(); // <-- AKATSA!

// Hari anitzetan:
zerrenda.add("Datua");`,
      aukerak: [
        "Datu-egitura konkurrente bat erabili behar da: CopyOnWriteArrayList edo Collections.synchronizedList.",
        "ArrayList-en ordez String[] array finkoa erabili behar da.",
        "Hariak ezin dute zerrendarik erabili.",
        "add() metodoaren ordez set() erabili behar da."
      ],
      zuzenaIndex: 0,
      azalpena: "ArrayList arrunta ez da hari-segurua (Not Thread-Safe). 'CopyOnWriteArrayList' edo 'Collections.synchronizedList' erabili behar da aldibereko idazketak seguruak izateko.",
      zuzenekoKodea: `// ZUZENA: Hari-segurua den bilduma
List<String> zerrenda = new CopyOnWriteArrayList<>();
// Edo: List<String> zerrenda = Collections.synchronizedList(new ArrayList<>());`
    },
    {
      titulua: "9. ProcessBuilder: exitValue() waitFor() Aurretik",
      enuntziatua: "Prozesuaren irteera-kodea eskuratzean IllegalThreadStateException jaurtitzen da:",
      okerrekoKodea: `Process p = new ProcessBuilder("notepad.exe").start();
int kodea = p.exitValue(); // <-- AKATSA: Prozesua oraindik martxan dago!`,
      aukerak: [
        "Lehenik 'p.waitFor()' deitu behar da prozesua amaitu arte itxaroteko, edo 'int kodea = p.waitFor()' erabili.",
        "notepad.exe ordez cmd.exe jarri behar da.",
        "exitValue() kendu eta getPid() jarri behar da.",
        "ProcessBuilder-ek ez du irteera koderik eskaintzen."
      ],
      zuzenaIndex: 0,
      azalpena: "'exitValue()' soilik dei daiteke prozesua AMAITUA egoeran dagoenean. 'waitFor()' deitu behar da lehenik programa amaitu arte itxaroteko.",
      zuzenekoKodea: `Process p = new ProcessBuilder("notepad.exe").start();
int kodea = p.waitFor(); // ZUZENA: amaitu arte itxaroten du eta kodea itzultzen du`
    },
    {
      titulua: "10. wait() Synchronized Bloketik Kanpo Deitzea",
      enuntziatua: "t.wait() deitzean 'IllegalMonitorStateException' salbuespena gertatzen da:",
      okerrekoKodea: `Object giltza = new Object();
giltza.wait(); // <-- AKATSA: Ez dago synchronized bloke baten barruan!`,
      aukerak: [
        "'wait()' eta 'notify()' soilik dei daitezke objektu beraren 'synchronized (giltza)' blokearen barruan.",
        "wait() metodoari milisegundoak pasatu behar zaizkio beti.",
        "Object giltza 'Thread' bihurtu behar da.",
        "wait() ordez System.gc() deitu behar da."
      ],
      zuzenaIndex: 0,
      azalpena: "Javan objektu baten monitor-a eduki behar da (synchronized bidez) wait(), notify() edo notifyAll() deitu ahal izateko. Bestela JREak IllegalMonitorStateException jaurtitzen du.",
      zuzenekoKodea: `Object giltza = new Object();
synchronized (giltza) { // ZUZENA: monitor-a hartu lehenik
    try {
        giltza.wait();
    } catch (InterruptedException e) {}
}`
    }
  ],

  // =========================================================================
  // 4. KODE ZATIA IDATZI (AZTERKETA ARIKETAK - 8 ARIKETA)
  // =========================================================================
  idazteak: [
    {
      titulua: "1. Runnable Ataza eta Haria Sortu",
      argibidea: "Idatzi kode zati bat: 'Runnable' inplementatzen duen ataza anonimo bat definitu 'run()' metodoarekin, eta 'Thread' berri batean 'start()' deitu:",
      hitzGakoak: ["Runnable", "run", "Thread", "start"],
      azalpena: "Runnable instantziatu, run() metodoan lana jarri, Thread eraikitzaileari pasatu eta start() bidez abiarazi behar da.",
      adibidea: `Thread t = new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Haria martxan!");
    }
});
t.start();`
    },
    {
      titulua: "2. Bi Hariren Amaierari Itxaron (join)",
      argibidea: "Idatzi kode zatia: 't1' eta 't2' hariak abiarazi ostean, hari nagusiak biei 'join()' bidez itxaroteko egitura try-catch blokean:",
      hitzGakoak: ["t1.join", "t2.join", "try", "catch", "InterruptedException"],
      azalpena: "Hari bakoitzaren join() deitu behar da InterruptedException harrapatzen duen try-catch egitura baten barruan.",
      adibidea: `try {
    t1.join();
    t2.join();
    System.out.println("Bi hariak amaitu dira!");
} catch (InterruptedException e) {
    System.err.println("Eten da: " + e.getMessage());
}`
    },
    {
      titulua: "3. Saldo Bankarioa Synchronized Blokearekin Babestu",
      argibidea: "Idatzi 'ateraDirua(double zenbatekoa)' metodoa. 'lock' objektua erabiliz, egiaztatu saldoa >= zenbatekoa den eta kendu:",
      hitzGakoak: ["synchronized", "lock", "saldoa", "zenbatekoa"],
      azalpena: "synchronized(lock) blokeak bermatzen du hainbat kutxazainek aldi berean saldo bera negatiboan ez uztea.",
      adibidea: `public void ateraDirua(double zenbatekoa) {
    synchronized (lock) {
        if (saldoa >= zenbatekoa) {
            saldoa -= zenbatekoa;
            System.out.println("Aterata. Saldo berria: " + saldoa);
        } else {
            System.out.println("Ez dago nahiko saldorik!");
        }
    }
}`
    },
    {
      titulua: "4. ProcessBuilder Bidez Komandoa Abiarazi eta Itxaron",
      argibidea: "Idatzi Java kodea: 'ProcessBuilder' bidez 'ping localhost' komandoa abiarazi eta bere irteera-kodeari 'waitFor()' bidez itxaron:",
      hitzGakoak: ["ProcessBuilder", "start", "waitFor"],
      azalpena: "ProcessBuilder instantziatu parametroekin, start() deitu prozesua sortzeko eta waitFor() deitu amaiera jasotzeko.",
      adibidea: `ProcessBuilder pb = new ProcessBuilder("ping", "localhost");
Process p = pb.start();
int kodea = p.waitFor();
System.out.println("Prozesua amaitu da: " + kodea);`
    },
    {
      titulua: "5. Timer eta TimerTask Aldizkako Zikloa",
      argibidea: "Idatzi kodea: 'Timer' bat sortu eta 3 segundoro (3000 ms) 'Mezua' inprimatzen duen 'TimerTask' ataza planifikatu:",
      hitzGakoak: ["Timer", "TimerTask", "run", "scheduleAtFixedRate"],
      azalpena: "TimerTask-aren run() gainidatzi eta timer.scheduleAtFixedRate(ataza, delay, period) bidez errepikatu.",
      adibidea: `Timer timer = new Timer();
TimerTask ataza = new TimerTask() {
    @Override
    public void run() {
        System.out.println("Mezua 3 segundoro!");
    }
};
timer.scheduleAtFixedRate(ataza, 0, 3000);`
    },
    {
      titulua: "6. ReentrantLock eta try-finally Blokea",
      argibidea: "Idatzi 'lock.lock()' eta 'finally { lock.unlock(); }' bidezko kode eskema segurua:",
      hitzGakoak: ["lock.lock", "try", "finally", "lock.unlock"],
      azalpena: "Lock-ak eskuratu ostean beti jarri behar da finally blokean unlock() deia.",
      adibidea: `lock.lock();
try {
    // Eskualde kritikoa
    kontagailua++;
} finally {
    lock.unlock();
}`
    },
    {
      titulua: "7. SwingUtilities.invokeLater Erabiliz UI Eguneratu",
      argibidea: "Idatzi 'SwingUtilities.invokeLater' deia atzeko haritik 'etiketa.setText(\"Eginda!\")' seguru exekutatzeko:",
      hitzGakoak: ["SwingUtilities.invokeLater", "Runnable", "run"],
      azalpena: "SwingUtilities.invokeLater bidez UI eguneraketak EDT ilaran txertatzen dira.",
      adibidea: `SwingUtilities.invokeLater(new Runnable() {
    @Override
    public void run() {
        etiketa.setText("Eginda!");
    }
});`
    },
    {
      titulua: "8. AtomicInteger Lasterketa Baldintzarik Gabe",
      argibidea: "Idatzi kontagailua gehitzen duen metodoa 'AtomicInteger' baten 'incrementAndGet()' erabiliz:",
      hitzGakoak: ["AtomicInteger", "incrementAndGet"],
      azalpena: "AtomicInteger-ek blokeorik gabeko aldibereko gehikuntza segurua ahalbidetzen du.",
      adibidea: `private AtomicInteger kontagailua = new AtomicInteger(0);

public int gehituBat() {
    return kontagailua.incrementAndGet();
}`
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRAKTIKA_DATA };
}
