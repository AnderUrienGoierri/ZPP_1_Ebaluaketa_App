package org.example.arazoak;

import java.util.concurrent.locks.ReentrantLock;

/**
 * 2. PUNTUA: MUERTE POR INANICIÓN / STARVATION (BALIABIDE-GOSETEA)
 * ==============================================================
 * TEORIA:
 * Inanizioa (starvation) gertatzen da hari batek (normalean lehentasun baxukoa edo
 * zorte txarrekoa) behar duen baliabide bat edo CPU denbora sekula lortu ezin duenean,
 * beste hari batzuek (lehentasun handiagokoak edo oldarkorragoak) baliabidea
 * etengabe monopolizatzen dutelako.
 *
 * Haria ez dago blokeo zirkularrean (deadlock ez bezala); haria exekutatzeko prest
 * dago (READY egoeran), baina planifikatzaileak (scheduler) edo sinkronizazio-mekanismoak
 * ez diote sekula txandarik ematen.
 */
public class InanizioAdibidea {

    // Baliabide partekatua
    private static final Object blokeoMonopolizatua = new Object();
    private static volatile boolean gelditu = false;

    /**
     * Inanizioa simulatzen du lehentasun altuko hariak etengabe baliabidea hartuz.
     */
    public static void erakutsiInanizioArriskua() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 2. INANIZIOA (STARVATION) - ARRISKUA <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Hari 'Lehentasun Handikoa' (MAX_PRIORITY) etengabe baliabidea hartzen saiatuko da.");
        System.out.println("Hari 'Lehentasun Baxukoa' (MIN_PRIORITY) ia ezin izango da sekula sartu.\n");

        gelditu = false;

        // Lehentasun baxuko haria (Gosez geratuko dena)
        Thread hariBaxua = new Thread(() -> {
            int lortutakoak = 0;
            while (!gelditu) {
                synchronized (blokeoMonopolizatua) {
                    lortutakoak++;
                }
            }
            System.out.println("[Hari BAXUA (Gosez)] Bukatuta. Lortutako sarbideak: " + lortutakoak);
        }, "Hari-Baxua");
        hariBaxua.setPriority(Thread.MIN_PRIORITY);

        // Lehentasun handiko bi hari (Baliabidea monopolizatzen dutenak)
        Thread hariAltua1 = new Thread(() -> {
            int lortutakoak = 0;
            while (!gelditu) {
                synchronized (blokeoMonopolizatua) {
                    lortutakoak++;
                }
            }
            System.out.println("[Hari ALTUA 1] Bukatuta. Lortutako sarbideak: " + lortutakoak);
        }, "Hari-Altua-1");
        hariAltua1.setPriority(Thread.MAX_PRIORITY);

        Thread hariAltua2 = new Thread(() -> {
            int lortutakoak = 0;
            while (!gelditu) {
                synchronized (blokeoMonopolizatua) {
                    lortutakoak++;
                }
            }
            System.out.println("[Hari ALTUA 2] Bukatuta. Lortutako sarbideak: " + lortutakoak);
        }, "Hari-Altua-2");
        hariAltua2.setPriority(Thread.MAX_PRIORITY);

        hariBaxua.start();
        hariAltua1.start();
        hariAltua2.start();

        try {
            // Proba segundo 1ez utzi martxan
            Thread.sleep(1000);
            gelditu = true;

            hariBaxua.join();
            hariAltua1.join();
            hariAltua2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("\nIKUS DAITEKEENEZ: Hari Altuek milaka aldiz lortu dute sarbidea,");
        System.out.println("baina Hari Baxuak oso-oso gutxitan edo ezer gutxi (inanizioa/starvation)!");
    }

    /**
     * KONPONBIDEA: Justizia bermatzea (Fairness).
     * ReentrantLock(true) erabilita, blokeoa itxaron-ilaran lehenago sartu den hariarentzat
     * izango da lehentasuna (FIFO ordena).
     */
    public static void erakutsiKonponbidea() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 2. INANIZIOA - KONPONBIDEA (Fair Lock bidez) <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("java.util.concurrent.locks.ReentrantLock(true) erabiliko dugu ('fairness' = true).");
        System.out.println("Honela, sarbidea FIFO (First In, First Out) ordenan ematen zaie hariei.\n");

        final ReentrantLock fairLock = new ReentrantLock(true);
        gelditu = false;

        Runnable atazaJustua = () -> {
            String izena = Thread.currentThread().getName();
            int lortutakoak = 0;
            while (!gelditu) {
                fairLock.lock();
                try {
                    lortutakoak++;
                    // Etenaldi txikia beste hariei ilaran jartzeko aukera emateko
                    Thread.sleep(10);
                } catch (InterruptedException ignored) {
                } finally {
                    fairLock.unlock();
                }
            }
            System.out.println("[" + izena + "] Bidezko sarbideak: " + lortutakoak);
        };

        Thread h1 = new Thread(atazaJustua, "Hari-1 (Min)");
        h1.setPriority(Thread.MIN_PRIORITY);

        Thread h2 = new Thread(atazaJustua, "Hari-2 (Norm)");
        h2.setPriority(Thread.NORM_PRIORITY);

        Thread h3 = new Thread(atazaJustua, "Hari-3 (Max)");
        h3.setPriority(Thread.MAX_PRIORITY);

        h1.start();
        h2.start();
        h3.start();

        try {
            Thread.sleep(500);
            gelditu = true;
            h1.join();
            h2.join();
            h3.join();
            System.out.println("\n[ONDO!] 'Fairness' aktibatuta, hari guztiek aukera orekatuak izan dituzte!");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
