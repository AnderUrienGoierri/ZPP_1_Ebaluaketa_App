package org.example;

import java.awt.TrayIcon;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.TimerTask;

/**
 * LuzatzeAtaza klasea:
 * TimerTask hedatzen du. 30 minuturo exekutatuko den abisua definitzen du.
 */
public class LuzatzeAtaza extends TimerTask {

    private final TrayIcon trayIcon;
    private int abisuKontagailua = 0;
    private static final DateTimeFormatter FORMATUA = DateTimeFormatter.ofPattern("HH:mm:ss");

    public LuzatzeAtaza(TrayIcon trayIcon) {
        this.trayIcon = trayIcon;
    }

    @Override
    public void run() {
        abisuKontagailua++;
        String unekoOrdua = LocalTime.now().format(FORMATUA);

        // 1. Kontsolan mezua inprimatu
        System.out.println("-------------------------------------------------------");
        System.out.println("[" + unekoOrdua + "] " + abisuKontagailua + ". ABISUA:");
        System.out.println(">> Hankak luzatzeko garaia da(5 minutuz ibili)");
        System.out.println("-------------------------------------------------------");

        // 2. Windows-eko jakinarazpen-eremuan globo-abisua atera
        if (trayIcon != null) {
            trayIcon.displayMessage(
                    "Aviso de actividad",
                    "Es momento de andar durante 5 minutos",
                    TrayIcon.MessageType.INFO
            );
        }
    }

    public int getAbisuKontagailua() {
        return abisuKontagailua;
    }
}