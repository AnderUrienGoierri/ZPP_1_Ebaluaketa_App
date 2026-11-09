package is_alive;

public class AtazaAlive implements Runnable {
    private Thread besteHaribat;

    public AtazaAlive(Thread besteHaribat) {
        this.besteHaribat = besteHaribat;
    }

    @Override
    public void run() {
        while (besteHaribat.isAlive()) {
            System.out.println("Martxan nago beste haria bizirik dagoen bitartean");
            try {
                Thread.sleep(500);
            } catch (InterruptedException ie) {
                ie.printStackTrace();
            }
        }
        System.out.println("Beste hariak bukatu du eta ni berarekin");
    }
}
