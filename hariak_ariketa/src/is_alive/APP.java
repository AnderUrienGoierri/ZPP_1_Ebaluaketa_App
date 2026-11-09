package is_alive;

public class APP {

    public static void main(String args[]) {
        Ataza atazaNagusia = new Ataza();
        Thread hariNagusia = new Thread(atazaNagusia);

        AtazaAlive atazaAlive = new AtazaAlive(hariNagusia);
        Thread hariaAlive = new Thread(atazaAlive);

        hariNagusia.start();
        hariaAlive.start();

        System.out.println("Noiz bukatuko dute bi hariek?");
    }
}
