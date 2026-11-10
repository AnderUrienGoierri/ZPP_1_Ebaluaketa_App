package org.example.arazoak;

/**
 * 4. PUNTUA: INCONSISTENCIA DE MEMORIA / MEMORIAREN SENDOTASUN-EZA (IKUSGARRITASUN ARAZOA)
 * =========================================================================================
 * TEORIA:
 * Memoriaren sendotasun-eza (Memory Inconsistency) gertatzen da hari ezberdinek
 * datu berdinen ikuspegi bateraezinak dituztenean.
 *
 * ZERGATIA:
 * PUZ modernoetan core bakoitzak bere cache memoria azkarrak ditu (L1, L2, erregistroak).
 * Hari batek partekatutako aldagai bat aldatzen duenean, baliteke aldaketa hori
 * bere cachean bakarrik geratzea eta RAM nagusira berehala ez idaztea.
 * Ondorioz, beste core batean dabilen haria bere cache lokal zaharkitutik irakurtzen jarraitzen du.
 * Gainera, JIT (Just-In-Time) konpilatzaileak kodea optimiza dezake aldagaiak erregistroetan gordez.
 *
 * KONPONBIDEA:
 * 'volatile' gako-hitza (edo 'synchronized' blokeak).
 * 'volatile'-k bermatzen du:
 * 1. Aldagaian egindako idazketa guztiak zuzenean RAM nagusira idazten direla.
 * 2. Aldagaia irakurtzen den bakoitzean, zuzenean RAM nagusitik irakurtzen dela.
 * 3. 'Happens-before' bermea ezartzen du Java Memoria Ereduan (JMM).
 */
public class MemoriaInkontsistentziaAdibidea {

    // 1. Aldagai arrunta (ez-volatile): ikusgarritasun arazoa eragin dezake
    private static boolean banderaArrunta = false;

    // 2. Aldagai 'volatile'-a: ikusgarritasun osoa bermatzen du hari guztien artean
    private static volatile boolean banderaVolatile = false;

    /**
     * Memoria-ikusgarritasun arazoa azaltzen du.
     * Ohartarazpen gisa, hari bat flag baten zain geratzen denean, flag-a ez bada volatile,
     * baliteke haria bukle infinituan harrapatuta geratzea.
     */
    public static void erakutsiMemoriaArazoaAzalpena() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 4. MEMORIAREN SENDOTASUN-EZA - AZALPENA ETA ARRISKUA <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Imajinatu bandera arrunta: 'private static boolean gelditu = false;'");
        System.out.println("Hari batek:  while (!gelditu) { /* kalkuluak */ }");
        System.out.println("Beste hariek: gelditu = true; ezartzen duenean,");
        System.out.println("PUZaren cache lokalaren optimizazioagatik (JIT hoisting),");
        System.out.println("lehen haria agian INOIZ ez da konturatuko 'gelditu' aldatu dela!\n");
    }

    /**
     * 'volatile' gako-hitzak nola konpontzen duen frogatzen duen proba praktikoa.
     */
    public static void erakutsiKonponbidea() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 4. MEMORIAREN SENDOTASUN-EZA - KONPONBIDEA ('volatile') <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Aldagaia 'volatile' gisa deklaratzean:");
        System.out.println("private static volatile boolean banderaVolatile = false;\n");

        banderaVolatile = false;

        Thread langilea = new Thread(() -> {
            System.out.println("[Langile-Haria] Martxan... 'banderaVolatile = true' izateko zain.");
            long kont = 0;
            // 'volatile' denez, iterazio bakoitzean RAM memorian benetako balioa irakurtzen du
            while (!banderaVolatile) {
                kont++;
            }
            System.out.println("[Langile-Haria] Banderaren aldaketa IKUSI DUT! Gelditzen naiz. (Iterazioak: " + kont + ")");
        }, "Langile-Haria");

        langilea.start();

        try {
            // Hari nagusiak 200ms itxaron eta gero bandera aldatuko du
            Thread.sleep(200);
            System.out.println("[Hari Nagusia] 'banderaVolatile = true' ezartzen ari da...");
            banderaVolatile = true;

            // Langile-hariak berehala ikusiko du eta amaituko da
            langilea.join(2000);
            if (!langilea.isAlive()) {
                System.out.println("[ONDO!] Langile-haria garaiz gelditu da, 'volatile'-k RAM bidezko ikusgarritasuna bermatu duelako!");
            } else {
                System.err.println("[ERROREA] Haria ez da garaiz gelditu.");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
