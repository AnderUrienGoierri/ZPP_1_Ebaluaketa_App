package Ariketa_2;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class APP {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== ARIKETA 2: Zenbaketa N harirekin (tarte berdinetan) ===");
        System.out.print("Sartu zenbatu beharreko azken zenbakia (N): ");
        int n = scanner.nextInt();

        System.out.print("Sartu erabili beharreko hari-kopurua (M): ");
        int hariKopurua = scanner.nextInt();

        if (n < 1 || hariKopurua < 1) {
            System.out.println("Zenbakiak eta hari-kopuruak 1 edo handiagoak izan behar dute.");
            scanner.close();
            return;
        }

        // Hari kopurua zenbakia baino handiagoa bada, doitu
        if (hariKopurua > n) {
            System.out.println("Oharra: Hari gehiago daude zenbakiak baino. Hari-kopurua " + n + "-ra mugatu da.");
            hariKopurua = n;
        }

        List<Thread> hariak = new ArrayList<>();

        // Tarteak zati berdinetan banatu
        int oinarrizkoTamaina = n / hariKopurua;
        int hondarra = n % hariKopurua; // Zatiketa zehatza ez denean soberan daudenak banatzeko

        int unekoHasiera = 1;

        System.out.println("\n--- Tarteak eta hariak prestatzen ---");
        for (int i = 0; i < hariKopurua; i++) {
            // Hondarra lehenengo hariei banatu zatiak ahalik eta berdinenak izateko
            int tamaina = oinarrizkoTamaina + (i < hondarra ? 1 : 0);
            int unekoBukaera = unekoHasiera + tamaina - 1;

            String hariIzena = "Haria-" + (i + 1);
            ZenbatzaileAtaza ataza = new ZenbatzaileAtaza(hariIzena, unekoHasiera, unekoBukaera);
            Thread haria = new Thread(ataza);
            hariak.add(haria);

            System.out.println(hariIzena + ": [" + unekoHasiera + " - " + unekoBukaera + "] (" + tamaina + " zenbaki)");
            unekoHasiera = unekoBukaera + 1;
        }

        System.out.println("\nHari guztiak abiarazten...");
        for (Thread haria : hariak) {
            haria.start();
        }

        // Teoria (12. orrialdea): join() bidez hari nagusiak hari guztien amaiera itxaroten du
        for (Thread haria : hariak) {
            try {
                haria.join();
            } catch (InterruptedException e) {
                System.err.println("Hari nagusia etenda: " + e.getMessage());
            }
        }

        System.out.println("\nHari guztiek beren zeregina amaitu dute!");
        scanner.close();
    }
}
