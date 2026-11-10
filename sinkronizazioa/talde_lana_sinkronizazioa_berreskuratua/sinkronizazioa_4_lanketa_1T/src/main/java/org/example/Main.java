package org.example;

import org.example.arazoak.DeadlockAdibidea;
import org.example.arazoak.InanizioAdibidea;
import org.example.arazoak.LasterketaBaldintzaAdibidea;
import org.example.arazoak.MemoriaInkontsistentziaAdibidea;
import org.example.arazoak.LerratutakoBaldintzakAdibidea;

import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

/**
 * LANKETA IV: PROGRAMAZIO KONKURRENTEAREN ARAZOAK
 * ===============================================
 * Proiektu honek programazio konkurrentean gertatzen diren 5 arazo nagusiak
 * aplikatzen, simulatzen eta azaltzen ditu Java erabiliz (IntelliJ IDEA):
 *
 * 1. Interbloqueo o Deadlock (Blokeo elkarrekikoa)
 * 2. Muerte por inanición (Starvation / Baliabide-gosetea)
 * 3. Condiciones de carrera (Race conditions / Lasterketa-baldintza)
 * 4. Inconsistencia de memoria (Memory inconsistency / Sendotasun-eza)
 * 5. Condiciones deslizadas (Slipped conditions / Lerratutako baldintzak)
 *
 * Gainera, Sinkronizazioa01.pdf teoriako kontzeptuak txertatzen ditu:
 * - java.lang (Thread, Runnable, Timer, TimerTask)
 * - synchronized hitz-gakoa eta monitoreak
 * - volatile aldagaia eta memoria-ikusgarritasuna
 * - java.util.concurrent (AtomicInteger, ReentrantLock)
 */
public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean irten = false;

        System.out.println("====================================================================");
        System.out.println("  0490 - ZERBITZU ETA PROZESUEN PROGRAMAZIOA");
        System.out.println("  LANKETA IV: PROGRAMAZIO KONKURRENTEAREN ARAZO NAGUSIAK");
        System.out.println("====================================================================");

        // Komando lerroko parametro bidez demo osoa zuzenean exekutatzeko aukera
        if (args.length > 0 && args[0].equalsIgnoreCase("demo")) {
            exekutatuGuztiak();
            return;
        }

        while (!irten) {
            erakutsiMenua();
            System.out.print("Hautatu aukera bat (0-6): ");
            String aukera = scanner.nextLine().trim();

            switch (aukera) {
                case "1":
                    DeadlockAdibidea.erakutsiDeadlockArriskua();
                    DeadlockAdibidea.erakutsiKonponbidea();
                    break;
                case "2":
                    InanizioAdibidea.erakutsiInanizioArriskua();
                    InanizioAdibidea.erakutsiKonponbidea();
                    break;
                case "3":
                    LasterketaBaldintzaAdibidea.erakutsiLasterketaArriskua();
                    LasterketaBaldintzaAdibidea.erakutsiKonponbidea();
                    break;
                case "4":
                    MemoriaInkontsistentziaAdibidea.erakutsiMemoriaArazoaAzalpena();
                    MemoriaInkontsistentziaAdibidea.erakutsiKonponbidea();
                    break;
                case "5":
                    LerratutakoBaldintzakAdibidea.erakutsiLerratutakoBaldintzaArriskua();
                    LerratutakoBaldintzakAdibidea.erakutsiKonponbidea();
                    break;
                case "6":
                    erakutsiTimerAriketaTeoria();
                    break;
                case "0":
                    irten = true;
                    System.out.println("\nEskerrik asko! Programa amaituta.");
                    break;
                default:
                    System.out.println("Aukera baliogabea. Mesedez, hautatu 0 eta 6 arteko zenbaki bat.");
                    break;
            }

            if (!irten) {
                System.out.println("\nSakatu ENTER menura itzultzeko...");
                scanner.nextLine();
            }
        }
        scanner.close();
    }

    private static void erakutsiMenua() {
        System.out.println("\n--------------------------------------------------------------------");
        System.out.println("                        AUKERA MENUA");
        System.out.println("--------------------------------------------------------------------");
        System.out.println(" 1. Interbloqueo o Deadlock (Blokeo elkarrekikoa)");
        System.out.println(" 2. Muerte por inanición / Starvation (Baliabide-gosetea)");
        System.out.println(" 3. Condiciones de car2rera / Race conditions (Lasterketa-baldintza)");
        System.out.println(" 4. Inconsistencia de memoria (Memoriaren sendotasun-eza / volatile)");
        System.out.println(" 5. Condiciones deslizadas / Slipped conditions (Lerratutako baldintzak)");
        System.out.println(" 6. Teoria Gehigarria (Timer / TimerTask sinkronizazioa - Sinkronizazioa01.pdf)");
        System.out.println(" 0. Irten");
        System.out.println("--------------------------------------------------------------------");
    }

    public static void exekutatuGuztiak() {
        System.out.println("\n>>> HASIERATZEN: 5 PUNTUEN DEMO OSOA JARRAIAN <<<\n");

        System.out.println("=== 1/5: DEADLOCK ===");
        DeadlockAdibidea.erakutsiDeadlockArriskua();
        DeadlockAdibidea.erakutsiKonponbidea();

        pausatuPixkaBat(1000);

        System.out.println("\n=== 2/5: INANIZIOA (STARVATION) ===");
        InanizioAdibidea.erakutsiInanizioArriskua();
        InanizioAdibidea.erakutsiKonponbidea();

        pausatuPixkaBat(1000);

        System.out.println("\n=== 3/5: LASTERKETA-BALDINTZA (RACE CONDITION) ===");
        LasterketaBaldintzaAdibidea.erakutsiLasterketaArriskua();
        LasterketaBaldintzaAdibidea.erakutsiKonponbidea();

        pausatuPixkaBat(1000);

        System.out.println("\n=== 4/5: MEMORIAREN SENDOTASUN-EZA ===");
        MemoriaInkontsistentziaAdibidea.erakutsiMemoriaArazoaAzalpena();
        MemoriaInkontsistentziaAdibidea.erakutsiKonponbidea();

        pausatuPixkaBat(1000);

        System.out.println("\n=== 5/5: LERRATUTAKO BALDINTZAK (SLIPPED CONDITIONS) ===");
        LerratutakoBaldintzakAdibidea.erakutsiLerratutakoBaldintzaArriskua();
        LerratutakoBaldintzakAdibidea.erakutsiKonponbidea();

        System.out.println("\n====================================================================");
        System.out.println("  DEMO OSOA ARRAKASTAZ AMAITU DA!");
        System.out.println("====================================================================");
    }

    /**
     * Sinkronizazioa01.pdf dokumentuan ageri den Timer eta TimerTask
     * kontzeptuaren erakustaldia (hari programatua).
     */
    private static void erakutsiTimerAriketaTeoria() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> SINKRONIZAZIOA01.PDF - TIMER ETA TIMERTASK <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Teorian emandakoa: java.util.Timer eta java.util.TimerTask");
        System.out.println("aplikazio bati atzeko planoan aldizkako abisuak/planifikazioak");
        System.out.println("egitea ahalbidetzen dio (adibidez, 'Mugitu zaitez 30 minuturo!').");
        System.out.println("Hemen 1 segundoko simulazio bat ikusiko dugu (3 jakinarazpen):\n");

        Timer timer = new Timer(true); // daemon haria gisa
        final int[] kontagailua = {0};

        TimerTask ataza = new TimerTask() {
            @Override
            public void run() {
                kontagailua[0]++;
                System.out.println("[TimerTask Hari Programatua] Abisua #" + kontagailua[0] + ": 'Mugitu zaitez! Eserita denbora gehiegi daramazu.'");
                if (kontagailua[0] >= 3) {
                    cancel();
                    System.out.println("[TimerTask] Planifikatzailea amaitu da.");
                }
            }
        };

        // 500ms-ra hasi eta 800ms-ro errepikatu
        timer.scheduleAtFixedRate(ataza, 500, 800);

        try {
            Thread.sleep(3200);
        } catch (InterruptedException ignored) {}
    }

    private static void pausatuPixkaBat(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}