package ataza2;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 2. ATAZA - 2. Ariketa.
   Komando-lerrotik programa exekutagarrien zerrenda bat jaso eta horiek
    exekutatzen dituen programa, bakoitzaren PIDa eta hasiera-unea erakutsiz.
    Agindu-lerrotik argumenturik pasatzen ez bada, kodean bertan gordetako
    zerrenda lehenetsia erabiltzen du automatikoki.

 * Modulua: Zerbitzu eta Prozesuen Programazioa (0490)

 */
public class ProzesuExekutatzailea {

    // Data eta ordua modu ulergarrian erakusteko formatua (Urtea-Hilabetea-Eguna Ordua:Minutua:Segundua.Milisegunduak)
    private static final DateTimeFormatter FORMATZAILEA = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    // Kodean bertan gordetako programa-zerrenda lehenetsia (args hutsik badago erabiltzeko)
    private static final String[] LEHENETSITAKO_PROGRAMAK = {
            "notepad.exe",                                          // Bloc de notas
            "calc.exe",                                             // Kalkulagailua
            "mspaint.exe",                                          // Paint
            "cmd.exe /c start cmd.exe /k echo Kaixo_Mundua"         // CMD leiho ikusgaia
    };

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("       PROZESU EXEKUTATZAILEA - ZERBITZU ETA PROZESUEN PROGRAMAZIOA             ");
        System.out.println("================================================================================");

        // Exekutatuko diren programen zerrenda:
        // 1. Agindu-lerroan (args) argumentuak jaso badira, horiek erabiliko dira.
        // 2. Argumenturik jaso ez bada, kodean bertan gordetako programa lehenetsiak erabiliko dira.
        String[] exekutagarriak;

        if (args.length > 0) {
            exekutagarriak = args;
            System.out.println("Komando-lerroko 'args' bidez jasotako programak erabiliko dira.");
            System.out.println("Jasotako programa kopurua: " + exekutagarriak.length);
        } else {
            System.out.println("[OHARRA] Ez da programa exekutagarririk zehaztu komando-lerroko 'args' aldagaian.");
            System.out.println("-> 'ProzesuExekutatzailea' klasean bertan gordetako zerrenda lehenetsia erabiliko da!");
            System.out.println("-> Abiaraziko diren programa lehenetsiak: " + LEHENETSITAKO_PROGRAMAK.length);
            exekutagarriak = LEHENETSITAKO_PROGRAMAK;
        }

        System.out.println("Exekuzioari hasiera ematen...\n");

        List<Process> abiarazitakoProzesuak = new ArrayList<>();

        // Zerrendako programa bakoitzeko prozesu bat abiarazi ProcessBuilder bidez
        for (int i = 0; i < exekutagarriak.length; i++) {
            String komandoa = exekutagarriak[i].trim();
            System.out.println("--------------------------------------------------------------------------------");
            System.out.println("[" + (i + 1) + "/" + exekutagarriak.length + "] Abiarazten: \"" + komandoa + "\"");

            try {
                // Komandoa eta balizko parametroak banatu (espazioen arabera)
                String[] zatiak = komandoa.split("\\s+");

                // 1. ProcessBuilder instantziatu komando eta parametroekin
                ProcessBuilder pb = new ProcessBuilder(zatiak);

                // 2. Tokiko hasiera-unea gorde abiarazte deia egin baino lehentxeago
                LocalDateTime tokikoHasieraUnea = LocalDateTime.now();

                // 3. Prozesua abiarazi sistema eragilean
                Process prozesua = pb.start();
                abiarazitakoProzesuak.add(prozesua);

                // 4. PIDa eskuratu (Java 9+ bertsioetan Process.pid() zuzenean erabil daiteke)
                long pid = prozesua.pid();

                // 5. Sistema Eragileak emandako hasiera-une zehatza eskuratu (ProcessHandle bidez)
                ProcessHandle.Info info = prozesua.info();
                String hasieraTestua;
                if (info.startInstant().isPresent()) {
                    Instant instant = info.startInstant().get();
                    LocalDateTime seHasiera = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                    hasieraTestua = seHasiera.format(FORMATZAILEA) + " (OS Kernel timestamp)";
                } else {
                    hasieraTestua = tokikoHasieraUnea.format(FORMATZAILEA) + " (Java Instant)";
                }

                // Emaitzak bistaratu kontsolan
                System.out.println("  [ARRAKASTA] Prozesua ondo abiarazi da.");
                System.out.println("  -> PID (Process ID):   " + pid);
                System.out.println("  -> Hasiera-unea:       " + hasieraTestua);
                System.out.println("  -> Bizirik dago?       " + (prozesua.isAlive() ? "BAI (Martxan)" : "EZ (Jada amaitua)"));

            } catch (IOException e) {
                System.err.println("  [ERROREA] Ezin izan da \"" + komandoa + "\" exekutatu: " + e.getMessage());
            } catch (SecurityException e) {
                System.err.println("  [SEGURTASUN ERROREA] Baimen nahikorik ez prozesua abiarazteko: " + e.getMessage());
            }
        }

        System.out.println("--------------------------------------------------------------------------------");
        System.out.println("\nProzesu guztiak abiarazi dira.");
        System.out.println("Guztira arrakastaz martxan jarritako prozesuak: " + abiarazitakoProzesuak.size() + "/" + exekutagarriak.length);
        System.out.println("================================================================================");
    }
}

