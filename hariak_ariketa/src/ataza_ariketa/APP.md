# APP.java

`APP` klaseak aplikazioaren exekuzio nagusia kudeatzen du:

1. Erabiltzaileari $N$ eta $H$ balioak eskatzen dizkio eta balidazioak betetzen direla ziurtatzen du ($N > 0$, $H > 0$ eta $H \le N$).
2. Zenbaki-tarteak zati berdinetan kalkulatu eta banatzen ditu hari guztien artean, hondarra lehen hariei banan-banan gehituz.
3. Hari guztiak sortu eta martxan jartzen ditu (`start()`).
4. `join()` metodoaren bidez hari guztien amaiera itxaroten du eta azkenik `Kontaketa amaituta` idazten du.

```java
package ataza_ariketa;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class APP {

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
            // Hondarreko zenbakiak lehen hariei banatu
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

        // 2. Hari guztiak amaitu direnean, programa nagusiak (join() erabiliz)
        // Kontaketa amaituta idatziko du:
        for (Thread t : hariak) {
            try {
                t.join();
            } catch (InterruptedException e) {
                System.err.println("Hari nagusia etenda: " + e.getMessage());
            }
        }

        /*
         * =========================================================================
         * NOLA IZANGO LITZATEKE join() GABE?
         * =========================================================================
         * join() metodoak hari nagusia (main) geldiarazten du beste hariak amaitu arte.
         * join() blokea KENDUZ edo KOMENTATUZ gero, kodea honela geratuko litzateke:
         *
         *     // Hariak abiatu:
         *     for (Thread t : hariak) {
         *         t.start();
         *     }
         *
         *     // join() blokea KENDUTA:
         *     // (Hari nagusiak ez die beste hariei itxaroten eta zuzenean aurrera doa)
         *
         *     System.out.println("Kontaketa amaituta");
         *
         * ZER GERTATUKO LITZATEKE?
         * "Kontaketa amaituta" mezua BEREHALA inprimatuko litzateke pantailan,
         * beste hariak oraindik zenbaketa hasi berritan edo kontatzen ari diren
         * bitartean, bukaeran agertu beharrean.
         * =========================================================================
         */

        System.out.println("Kontaketa amaituta");
        scanner.close();
    }
}
```
