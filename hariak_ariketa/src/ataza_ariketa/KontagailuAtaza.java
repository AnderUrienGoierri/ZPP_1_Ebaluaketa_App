package ataza_ariketa;

/**
 * KontagailuAtaza klaseak Runnable interfazea inplementatzen du.
 * Esleitutako tarteko zenbakiak pantailaratzen ditu formatu honekin:
 * [Hari-X | hasiera-bukaera] -> zenbakia
 */
public class KontagailuAtaza implements Runnable {

    private String izena;
    private int hasiera;
    private int bukaera;

    public KontagailuAtaza(String izena, int hasiera, int bukaera) {
        this.izena = izena;
        this.hasiera = hasiera;
        this.bukaera = bukaera;
    }

    @Override
    public void run() {
        for (int i = hasiera; i <= bukaera; i++) {
            // Eskatutako formatua: [Hari-2 | 5-7] -> 6
            System.out.println("[" + izena + " | " + hasiera + "-" + bukaera + "] -> " + i);
            try {
                // Harien arteko konkurrentzia eta txandakatzea ikusteko etenaldi txiki bat
                Thread.sleep(50);
            } catch (InterruptedException e) {
                System.err.println(izena + " geldituta: " + e.getMessage());
            }
        }
    }
}
