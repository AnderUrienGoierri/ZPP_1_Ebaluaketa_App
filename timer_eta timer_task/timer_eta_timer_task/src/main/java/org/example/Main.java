package org.example;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.SystemTray;
import java.awt.TrayIcon;
import java.awt.image.BufferedImage;
import java.util.Scanner;
import java.util.Timer;

public class Main {

    // Ariketaren tarte erreala: 30 minutu (milisegundotan)
    private static final long TARTEA_30_MINUTU = 30L * 60 * 1000;

    // Probetarako tartea: 10 segundo
    private static final long TARTEA_10_SEGUNDO = 10L * 1000;

    // True = Proba azkarra (10 segundoro); False = 30 minuturo
    private static final boolean PROBA_MODUA = true;

    public static void main(String[] args) {
        System.out.println("=======================================================");
        System.out.println("   LUZATZE-ARIKETEN PLANGINTZA (Timer eta TimerTask)   ");
        System.out.println("=======================================================");

        long hasierakoItxaronaldia;
        long errepikatzeTartea;

        if (PROBA_MODUA) {
            System.out.println("[MODUA] PROBA MODUA aktibatuta (10 segundoro abisua).");
            System.out.println("        (30 minutuko modurako, jarri PROBA_MODUA = false)");
            hasierakoItxaronaldia = 2000L;          // 2 segundora lehen abisua
            errepikatzeTartea = TARTEA_10_SEGUNDO;    // 10 segundoro ondoren
        } else {
            System.out.println("[MODUA] EKOIZPEN MODUA aktibatuta (30 minuturo abisua).");
            hasierakoItxaronaldia = TARTEA_30_MINUTU;
            errepikatzeTartea = TARTEA_30_MINUTU;
        }

        // 1. Windows ataza-barran ikonoa prestatu
        TrayIcon trayIcon = sortuTrayIcon();

        // 2. Timer objektua sortu
        Timer timer = new Timer("LuzatzeTimerHaria");

        // 3. TimerTask ataza sortu
        LuzatzeAtaza ataza = new LuzatzeAtaza(trayIcon);

        // 4. Ataza programatu scheduleAtFixedRate bidez
        timer.scheduleAtFixedRate(ataza, hasierakoItxaronaldia, errepikatzeTartea);

        System.out.println("\n>> Timer-a martxan da atzeko planoan.");
        System.out.println(">> Aplikazioa gelditzeko, sakatu [ENTER] kontsolan...\n");

        // Erabiltzaileak ENTER sakatu arte itxaron
        Scanner scanner = new Scanner(System.in);
        scanner.nextLine();

        // 5. Baliabideak garbi itxi
        System.out.println("Timer-a gelditzen...");
        ataza.cancel();
        timer.cancel();
        timer.purge();

        if (trayIcon != null && SystemTray.isSupported()) {
            SystemTray.getSystemTray().remove(trayIcon);
        }

        System.out.println("Aplikazioa itxi da. Agur!");
    }

    private static TrayIcon sortuTrayIcon() {
        if (!SystemTray.isSupported()) {
            System.out.println("[OHARRA] SystemTray ez dago eskuragarri ingurune honetan.");
            return null;
        }

        try {
            SystemTray tray = SystemTray.getSystemTray();

            // Memorian 16x16 tamainako ikono urdin bat sortu 'i' letrarekin
            BufferedImage image = new BufferedImage(16, 16, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g = image.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.setColor(new Color(0, 120, 215));
            g.fillOval(1, 1, 14, 14);
            g.setColor(Color.WHITE);
            g.setFont(new Font("SansSerif", Font.BOLD, 11));
            g.drawString("i", 6, 12);
            g.dispose();

            TrayIcon trayIcon = new TrayIcon(image, "Luzatze Ariketak");
            trayIcon.setImageAutoSize(true);
            tray.add(trayIcon);

            return trayIcon;
        } catch (Exception e) {
            System.err.println("[ERROREA] Ezin izan da TrayIcon sortu: " + e.getMessage());
            return null;
        }
    }
}