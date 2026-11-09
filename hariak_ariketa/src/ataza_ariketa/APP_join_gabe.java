package ataza_ariketa;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class APP_join_gabe {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = 0;
        int h = 0;

        // 3. Balidazioak: N > 0, H > 0 eta H <= N
        while (true) {
            System.out.print("Sartu azken zenbakia (N > 0): ");
            if (scanner.hasNextInt()) {
                n = scanner.nextInt();
                if (n > 0) {
                    break;
                }
            } else {
                scanner.next();
            }
            System.out.println("Errorea: N balioak 0 baino handiagoa izan behar du.");
        }

        while (true) {
            System.out.print("Sartu hari-kopurua (H > 0 eta H <= " + n + "): ");
            if (scanner.hasNextInt()) {
                h = scanner.nextInt();
                if (h > 0 && h <= n) {
                    break;
                }
            } else {
                scanner.next();
            }
            System.out.println("Errorea: H balioak 0 baino handiagoa eta N (" + n + ") baino txikiagoa edo berdina izan behar du.");
        }

        // Tarteak banatu: zatiketa zehatza ez bada, hondarra banan-banan banatu lehen hariei
        int oinarrizkoTamaina = n / h;
        int hondarra = n % h;

        List<Thread> hariak = new ArrayList<>();
        int unekoHasiera = 1;

        for (int i = 0; i < h; i++) {
            int tamaina = oinarrizkoTamaina + (i < hondarra ? 1 : 0);
            int unekoBukaera = unekoHasiera + tamaina - 1;
            String izena = "Hari-" + (i + 1);

            KontagailuAtaza ataza = new KontagailuAtaza(izena, unekoHasiera, unekoBukaera);
            Thread haria = new Thread(ataza);
            hariak.add(haria);

            unekoHasiera = unekoBukaera + 1;
        }

        // 1. Hari guztiak martxan jarri
        for (Thread t : hariak) {
            t.start();
        }

        // KONTUZ: join() kenduta dago!
        // Hari nagusiak ez die beste hariei itxarongo eta berehala lerro honetara salto egingo du:
        System.out.println("Kontaketa amaituta (join() gabe - ikusi nola agertzen den hariak bukatu aurretik!)");
        scanner.close();
    }
}
