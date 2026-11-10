package org.example.arazoak;

/**
 * 1. PUNTUA: INTERBLOQUEO O DEADLOCK (BLOKEO ELKARREKIKOA)
 * =======================================================
 * TEORIA:
 * Deadlock edo blokeo elkarrekikoa gertatzen da bi hari (edo gehiago) elkarren zain
 * geratzen direnean modu mugagabean. Hari bakoitzak baliabide bat blokeatuta dauka
 * eta besteak duen baliabidea eskuratzen saiatzen da, inork berea askatu gabe.
 *
 * Baldintza hauek batera betetzen direnean gertatzen da (Coffman-en baldintzak):
 * 1. Elkarrekiko bazterketa (Mutual Exclusion): baliabidea haria bakarrak erabil dezake aldi berean.
 * 2. Eutsi eta itxaron (Hold and Wait): hari batek baliabide bat duela beste baten zain geratzen da.
 * 3. Desjabetzerik eza (No Preemption): ezin zaio haria bati baliabidea indarrez kendu.
 * 4. Itxaronaldi zirkularra (Circular Wait): harien arteko mendekotasun-begizta itxi bat dago.
 */
public class DeadlockAdibidea {

    /**
     * Deadlock sortzen duen egoera simulatzen du.
     * Hariak daemon gisa sortzen dira programa osoa betiko blokeatuta ez uzteko.
     */
    public static void erakutsiDeadlockArriskua() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 1. DEADLOCK (BLOKEO ELKARREKIKOA) - ARRISKUA <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Hari-1: BaliabideA hartuko du, eta gero BaliabideB behar du.");
        System.out.println("Hari-2: BaliabideB hartuko du, eta gero BaliabideA behar du.");
        System.out.println("Itxaronaldi zirkularra sortzen da!\n");

        final Object baliabideA = new Object();
        final Object baliabideB = new Object();

        Thread hari1 = new Thread(() -> {
            synchronized (baliabideA) {
                System.out.println("[Hari-1] BaliabideA blokeatu du.");
                try {
                    // Etenaldi txiki bat Hari-2-ri BaliabideB blokeatzeko denbora emateko
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                System.out.println("[Hari-1] BaliabideB eskuratzen saiatzen... (zain)");
                synchronized (baliabideB) {
                    System.out.println("[Hari-1] BaliabideA eta BaliabideB eskuratu ditu!");
                }
            }
        }, "Hari-1");
        hari1.setDaemon(true); // Daemon gisa aplikazioa ez blokeatzeko

        Thread hari2 = new Thread(() -> {
            synchronized (baliabideB) {
                System.out.println("[Hari-2] BaliabideB blokeatu du.");
                try {
                    // Etenaldi txiki bat Hari-1-ek BaliabideA blokeatu dezan
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                System.out.println("[Hari-2] BaliabideA eskuratzen saiatzen... (zain)");
                synchronized (baliabideA) {
                    System.out.println("[Hari-2] BaliabideB eta BaliabideA eskuratu ditu!");
                }
            }
        }, "Hari-2");
        hari2.setDaemon(true); // Daemon gisa

        hari1.start();
        hari2.start();

        // Segundo 1 itxaron deadlock egoera egiaztatzeko
        try {
            Thread.sleep(600);
        } catch (InterruptedException ignored) {}

        if (hari1.isAlive() && hari2.isAlive()) {
            System.err.println("\n[OHARRA / DEADLOCK DETEKTATUA!] Bi hariak blokeatuta geratu dira elkarren zain!");
            System.err.println("[Hari-1] egoera: " + hari1.getState() + " (BaliabideB eskuratzeko zain)");
            System.err.println("[Hari-2] egoera: " + hari2.getState() + " (BaliabideA eskuratzeko zain)");
        }
    }

    /**
     * KONPONBIDEA: Blokeoak beti ordena zorrotz berean eskuratzea.
     * Bi hariek lehenik BaliabideA eta ondoren BaliabideB eskatzen badute,
     * ez da inoiz itxaronaldi zirkularrik sortuko.
     */
    public static void erakutsiKonponbidea() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 1. DEADLOCK - KONPONBIDEA (Ordena bera erabiliz) <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Bi hariek hurrenkera BEREAN eskuratuko dituzte blokeoak: lehenik A, gero B.\n");

        final Object baliabideA = new Object();
        final Object baliabideB = new Object();

        Thread hari1 = new Thread(() -> {
            synchronized (baliabideA) {
                System.out.println("[Hari-1 Zuzena] BaliabideA blokeatu du.");
                try { Thread.sleep(40); }
                catch (InterruptedException ignored) {

                }

                synchronized (baliabideB) {
                    System.out.println("[Hari-1 Zuzena] BaliabideB ere blokeatu du eta lana amaitu du.");
                }
            }
        }, "Hari-1-Konponduta");

        Thread hari2 = new Thread(() -> {
            // BaliabideA lehenik, Hari-1-ek bezala!
            synchronized (baliabideA) {
                System.out.println("[Hari-2 Zuzena] BaliabideA blokeatu du.");
                try { Thread.sleep(40); } catch (InterruptedException ignored) {}

                synchronized (baliabideB) {
                    System.out.println("[Hari-2 Zuzena] BaliabideB ere blokeatu du eta lana amaitu du.");
                }
            }
        }, "Hari-2-Konponduta");

        hari1.start();
        hari2.start();

        try {
            hari1.join();
            hari2.join();
            System.out.println("\n[ONDO!] Bi hariak arazorik gabe amaitu dira Deadlock-ik gabe.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
