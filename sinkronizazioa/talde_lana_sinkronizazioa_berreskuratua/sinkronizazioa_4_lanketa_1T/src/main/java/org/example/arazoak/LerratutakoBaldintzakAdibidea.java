package org.example.arazoak;

/**
 * 5. PUNTUA: CONDICIONES DESLIZADAS / SLIPPED CONDITIONS (LERRATUTAKO BALDINTZAK)
 * ==============================================================================
 * TEORIA:
 * Lerratutako baldintza (Slipped Condition) lasterketa-baldintza mota espezifiko bat da.
 * Hari batek baldintza jakin bat egiaztatzen duenean (Check), baina ekintza gauzatzera
 * doanean (Act), beste hari batek baldintza hori jada aldatu edo baliogabetu du.
 *
 * Hau "Check-then-Act" (Egiaztatu eta Gero Ekin) arrakala deitzen zaio.
 * Bi eragiketak (egiaztapena eta ekintza) ez badaude bloke atomiko bakar batean babestuta,
 * baldintza "lerratu" edo labaindu egiten da hari baten eskuetatik.
 */
public class LerratutakoBaldintzakAdibidea {

    // Banku-kontu sinplea lerratutako baldintza frogatzeko
    static class BankuKontua {
        private int saldoa;

        public BankuKontua(int hasierakoSaldoa) {
            this.saldoa = hasierakoSaldoa;
        }

        public int getSaldoa() {
            return saldoa;
        }

        // Metodo arrunta saldoa kentzeko (ez du saldoa egiaztatzen)
        public void kenduDirua(int kantitatea) {
            saldoa -= kantitatea;
        }

        // KONPONBIDEA: Egiaztapena eta ateratzea ekintza ATOMIKO bakarrean babestuta
        public synchronized boolean ateraDiruaAtomikoki(String haria, int kantitatea) {
            if (saldoa >= kantitatea) {
                System.out.println("[" + haria + "] Saldo nahikoa dago (" + saldoa + "€). Ateratzen: " + kantitatea + "€");
                saldoa -= kantitatea;
                System.out.println("[" + haria + "] Eragiketa eginda. Saldo berria: " + saldoa + "€");
                return true;
            } else {
                System.out.println("[" + haria + "] EZEZTATUA! Saldo gutxiegi (" + saldoa + "€). Ezin dira " + kantitatea + "€ atera.");
                return false;
            }
        }
    }

    /**
     * Lerratutako baldintzaren akatsa simulatzen du.
     * Saldoa 100€ da. Bi harik 100€ atera nahi dituzte.
     * Biek ikusten dute 100€ daudela, baina biek ateratzean saldoa -100€ geratzen da!
     */
    public static void erakutsiLerratutakoBaldintzaArriskua() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 5. LERRATUTAKO BALDINTZAK (SLIPPED CONDITIONS) - ARRISKUA <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Hasierako saldoa: 100€.");
        System.out.println("Hari-1 eta Hari-2-k 100€ atera nahi dituzte bakoitzak.");
        System.out.println("Egiaztapena eta ateratzea SINKRONIZATU GABE daude bananduta!\n");

        BankuKontua kontua = new BankuKontua(100);

        Runnable ateratzekoAtazaArriskutsua = () -> {
            String izena = Thread.currentThread().getName();

            // 1. URRATSA: EGIAZTATU (Check)
            if (kontua.getSaldoa() >= 100) {
                System.out.println("[" + izena + "] Egiaztapena: 100€ badira kontuan. Ateratzera noa...");

                // Etenaldi txiki batek testuinguru-aldaketa (context-switch) simulatzen du
                try {
                    Thread.sleep(50);
                } catch (InterruptedException ignored) {}

                // 2. URRATSA: EKINTZA (Act) - Bitartean beste haria sartu bada, baldintza lerratu da!
                kontua.kenduDirua(100);
                System.out.println("[" + izena + "] 100€ atera ditut! Uneko saldoa: " + kontua.getSaldoa() + "€");
            } else {
                System.out.println("[" + izena + "] Ez dago diru nahikorik.");
            }
        };

        Thread h1 = new Thread(ateratzekoAtazaArriskutsua, "Hari-1");
        Thread h2 = new Thread(ateratzekoAtazaArriskutsua, "Hari-2");

        h1.start();
        h2.start();

        try {
            h1.join();
            h2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("\nAZKEN SALDOA: " + kontua.getSaldoa() + "€");
        if (kontua.getSaldoa() < 0) {
            System.err.println("[ARAZOA!] Saldo negatiboa sortu da! Baldintza egiaztatu ondoren lerratu delako!");
        }
    }

    /**
     * KONPONBIDEA: "Check-then-Act" eragiketa metodo edo bloke sinkronizatu
     * bakar batean biltzea (Atomikotasuna).
     */
    public static void erakutsiKonponbidea() {
        System.out.println("\n--------------------------------------------------");
        System.out.println(">>> 5. LERRATUTAKO BALDINTZAK - KONPONBIDEA <<<");
        System.out.println("--------------------------------------------------");
        System.out.println("Egiaztapena eta diru-kentzea metodo 'synchronized' bakarrean egingo dira.");
        System.out.println("Horrela, ezin da beste haririk sartu egiaztatu eta ekintza gauzatu bitartean.\n");

        BankuKontua kontua = new BankuKontua(100);

        Thread h1 = new Thread(() -> kontua.ateraDiruaAtomikoki("Hari-1", 100), "Hari-1");
        Thread h2 = new Thread(() -> kontua.ateraDiruaAtomikoki("Hari-2", 100), "Hari-2");

        h1.start();
        h2.start();

        try {
            h1.join();
            h2.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("\nAZKEN SALDOA (Konponduta): " + kontua.getSaldoa() + "€");
        System.out.println("[ONDO!] Haria batek bakarrik atera ahal izan du dirua, eta bigarrenari ezezkoa eman zaio.");
    }
}
