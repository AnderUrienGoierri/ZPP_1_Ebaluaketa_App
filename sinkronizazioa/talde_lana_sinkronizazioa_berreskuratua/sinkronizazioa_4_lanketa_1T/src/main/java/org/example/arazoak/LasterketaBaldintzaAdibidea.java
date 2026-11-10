package org.example.arazoak;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * 3. PUNTUA: CONDICIONES DE CARRERA / RACE CONDITIONS (LASTERKETA-BALDINTZA)
 * =========================================================================
 * TEORIA:
 * Lasterketa-baldintza gertatzen da bi hari edo gehiago aldi berean partekatutako
 * baliabide edo aldagai berera iristen direnean, eta emaitza harien exekuzio-ordenaren
 * edo abiaduraren mende geratzen denean (ez-deterministikoa).
 *
 * `kontagailua++` eragiketa ez da atomikoa, 3 makina-instrukzio ditu:
 * 1. Aldagaiaren uneko balioa erregistrora irakurri (READ).
 * 2. Balioari 1 gehitu (MODIFY).
 * 3. Emaitza berria memorian gorde (WRITE).
 *
 * Bi hari une berean sartzen badira, biek balio bera irakur dezakete eta batak
 * bestearen gehiketa gainidatzi egiten du (datu-galera!).
 */
public class LasterketaBaldintzaAdibidea {

    // Aldagai arrunta (sinkronizatu gabea)
    private static int kontagailuNormala = 0;

    // Aldagai sinkronizatua
    private static int kontagailuSinkronizatua = 0;

    // java.util.concurrent.atomic-eko aldagai atomikoa
    private static final AtomicInteger kontagailuAtomikoa = new AtomicInteger(0);

    private static synchronized void inkrementatuSinkronizatua() {
        kontagailuSinkronizatua++;
    }

    /**
     * Lasterketa-baldintza simulatzen du sinkronizaziorik gabe.
     */
    public static void erakutsiLasterketaArriskua() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 3. LASTERKETA-BALDINTZA (RACE CONDITION) - ARRISKUA <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Bi harik partekatutako kontagailua bakoitzak 10.000 aldiz gehituko dute.");
        System.out.println("Espero den emaitza: 20.000");

        kontagailuNormala = 0;

        Thread h1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                kontagailuNormala++; // Ez da atomikoa!
            }
        });

        Thread h2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                kontagailuNormala++; // Ez da atomikoa!
            }
        });

        h1.start();
        h2.start();

        try {
            h1.join();
            h2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Lortutako azken balioa (Sinkronizatu gabe): " + kontagailuNormala);
        if (kontagailuNormala != 20000) {
            System.err.println("[ARAZOA!] Lasterketa-baldintza gertatu da! Galdu diren gehiketak: " + (20000 - kontagailuNormala));
        } else {
            System.out.println("[OHARRA] Zorteagatik 20.000 atera daiteke exekuzio jakin batean, baina ez dago bermatuta!");
        }
    }

    /**
     * KONPONBIDEAK:
     * 1. 'synchronized' gako-hitza erabiltzea (elkarrekiko bazterketa bermatzeko).
     * 2. AtomicInteger erabiltzea (hardware mailako CAS eragiketak erabiliz).
     */
    public static void erakutsiKonponbidea() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 3. LASTERKETA-BALDINTZA - KONPONBIDEA <<<");
        System.out.println("--------------------------------------------------");

        kontagailuSinkronizatua = 0;
        kontagailuAtomikoa.set(0);

        // 1. Irtenbidea: synchronized
        Thread h1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                inkrementatuSinkronizatua();
            }
        });

        Thread h2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                inkrementatuSinkronizatua();
            }
        });

        // 2. Irtenbidea: AtomicInteger
        Thread h3 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                kontagailuAtomikoa.incrementAndGet();
            }
        });

        Thread h4 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                kontagailuAtomikoa.incrementAndGet();
            }
        });

        h1.start();
        h2.start();
        h3.start();
        h4.start();

        try {
            h1.join();
            h2.join();
            h3.join();
            h4.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("1. Emaitza 'synchronized' metodoarekin: " + kontagailuSinkronizatua + " / 20.000");
        System.out.println("2. Emaitza 'AtomicInteger'-ekin:        " + kontagailuAtomikoa.get() + " / 20.000");
        System.out.println("[ONDO!] Bi konponbideek emaitza zehatza eta sendoa (thread-safe) bermatzen dute!");
    }
}
