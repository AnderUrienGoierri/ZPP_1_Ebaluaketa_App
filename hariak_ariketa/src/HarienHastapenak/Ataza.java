package HarienHastapenak;

public class Ataza implements Runnable {
    String izena;
    public Ataza(String izena) {
        this.izena = izena;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Ataza bat naiz eta nire izena " + izena);
            try {
                Thread.sleep(500);
            }catch (InterruptedException e){
                throw  new RuntimeException(e);
            }
        }
    }
}