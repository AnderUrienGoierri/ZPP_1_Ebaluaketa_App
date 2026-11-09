package HarienHastapenak;

public class APP {

    public static void main(String[] args) throws InterruptedException {
        Haria h1 = new Haria();
        Haria h2 = new Haria();
        Ataza a1 = new Ataza("1.Ataza");
        Thread h3 = new Thread(a1);

        h1.start();
        h2.start();
        //a1.start();
        h3.start();

        System.out.println("Ni naiz Hari nagusia!");
        Thread.sleep(2000);
        h1.gelditu();
        h2.gelditu();
        System.out.println("Nire eginkizunak burutu ditut!");
    }
}
