package Ariketa_1;

import java.util.Scanner;

public class APP {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== ARIKETA 1: Zenbaketa 2 harirekin ===");
        System.out.print("Sartu zenbatu beharreko azken zenbakia (N): ");
        int n = scanner.nextInt();

        if (n < 1) {
            System.out.println("Zenbakiak 1 edo handiagoa izan behar du.");
            scanner.close();
            return;
        }

        // Tartea bitan banatu
        int erdia = n / 2;

        // Bi atazak sortu dagokien tartearekin
        ZenbatzaileAtaza ataza1 = new ZenbatzaileAtaza("Haria-1", 1, erdia);
        ZenbatzaileAtaza ataza2 = new ZenbatzaileAtaza("Haria-2", erdia + 1, n);

        // Hariak sortu Runnable objektuekin
        Thread hari1 = new Thread(ataza1);
        Thread hari2 = new Thread(ataza2);

        System.out.println("\nHariak abiarazten...");
        hari1.start();
        hari2.start();

        try {
            // Teoria (12. orrialdea): join() erabiltzen dugu hari nagusiak bi hariak bukatu arte itxaron dezan
            hari1.join();
            hari2.join();
        } catch (InterruptedException e) {
            System.err.println("Hari nagusia etenda: " + e.getMessage());
        }

        System.out.println("\nBi hariek zenbaketa amaitu dute!");
        scanner.close();
    }
}
