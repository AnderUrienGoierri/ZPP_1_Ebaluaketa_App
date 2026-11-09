package Ariketa_1;

/**
 * ZenbatzaileAtaza klaseak Runnable interfazea inplementatzen du.
 * Esleitutako hasiera eta bukaera tarteko zenbakiak pantailaratzen ditu.
 */
public class ZenbatzaileAtaza implements Runnable {

    private String izena;
    private int hasiera;
    private int bukaera;

    public ZenbatzaileAtaza(String izena, int hasiera, int bukaera) {
        this.izena = izena;
        this.hasiera = hasiera;
        this.bukaera = bukaera;
    }

    @Override
    public void run() {
        System.out.println("-> [" + izena + "] hasi da (" + hasiera + " - " + bukaera + " tartea)");
        for (int i = hasiera; i <= bukaera; i++) {
            System.out.println("[" + izena + "] Zenbakia: " + i);
            try {
                // Harien arteko konkurrentzia argi ikusteko geldialdi txiki bat
                Thread.sleep(100);
            } catch (InterruptedException e) {
                System.err.println(izena + " haria eten da: " + e.getMessage());
            }
        }
        System.out.println("✓ [" + izena + "] amaitu da.");
    }
}
