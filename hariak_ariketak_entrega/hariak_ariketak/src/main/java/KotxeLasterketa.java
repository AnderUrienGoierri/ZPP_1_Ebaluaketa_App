import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

/**
 * 2. ARIKETA: AUTO LASTERKETA (CARRERA DE COCHES)
 * 
 * Ariketa honen helburua:
 * Gehienez 4 autoren arteko lasterketa simulatzea.
 * - Zirkuituaren distantzia konfiguragarria da.
 * - Auto bakoitzaren abiadura konfiguragarria da.
 * - Auto bakoitza HARI INDEPENDENTE (Thread) batek kudeatzen du aldi berean (konkurrentzia).
 * - Lasterketaren garapena aurrerapen-barren (JProgressBar) bidez erakusten da.
 * - Auto batek helmuga zeharkatzen duenean:
 *     1. Auto irabazlea iragartzen da.
 *     2. Beste auto guztiak une horretan gelditzen dira.
 *     3. Auto bakoitzak egindako distantzia erakusten da.
 * 
 * HARIAK (THREADS) ETA KONKURRENTZIA AZALPENA:
 * - Kasu honetan 4 hari paralelo abiarazten dira (hari bat auto bakoitzeko).
 * - Baliabide partekatu bat dugu: helmugara lehena nor iristen den jakitea (lasterketaAmaituta).
 * - 'synchronized' blokea erabiltzen da lehen iristen den autoa bakarrik izendatzeko irabazle,
 *   lasterketa-baldintzak (race conditions) saihestuz.
 * - 'volatile boolean' erabiliz, hari guztiek berehala ikusten dute beste batek lasterketa amaitu duela.
 */
public class KotxeLasterketa extends JFrame {

    // Zirkuituaren distantzia sartzeko eremua
    private JTextField txtDistantzia;
    private JButton btnHasi;
    private JLabel lblEmaitza;

    // 4 autoen datuak gordetzeko osagaiak
    private static final int AUTO_KOPURUA = 4;
    private JTextField[] txtAbiadurak;
    private JProgressBar[] barrak;
    private JLabel[] lblDistantziak;

    // Lasterketaren egoera partekatua (hari guztiek partekatzen dutena)
    private volatile boolean lasterketaAmaituta = false;
    private String irabazlea = "";
    private final Object giltza = new Object(); // Sinkronizaziorako blokeoa (lock)
    private List<Thread> hariak;

    public KotxeLasterketa() {
        setTitle("Auto Lasterketa (Carrera de coches)");
        setSize(550, 420);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(10, 10));

        // 1. GOIKO PANELA: Zirkuituaren distantzia eta Hasi botoia
        JPanel panelGoikoa = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 10));
        panelGoikoa.add(new JLabel("Zirkuituaren distantzia (m):"));
        txtDistantzia = new JTextField("100", 6);
        panelGoikoa.add(txtDistantzia);

        btnHasi = new JButton("Hasi Lasterketa");
        panelGoikoa.add(btnHasi);
        add(panelGoikoa, BorderLayout.NORTH);

        // 2. ERDIKO PANELA: 4 autoen lerroak (abiadura, aurrerapen-barra eta distantzia)
        JPanel panelAutoak = new JPanel(new GridLayout(AUTO_KOPURUA, 1, 10, 10));
        panelAutoak.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));

        txtAbiadurak = new JTextField[AUTO_KOPURUA];
        barrak = new JProgressBar[AUTO_KOPURUA];
        lblDistantziak = new JLabel[AUTO_KOPURUA];

        // Hasierako abiadura proposatuak (desberdinak izan daitezen)
        int[] abiaduraLehenetsiak = {12, 10, 15, 9};
        Color[] koloreak = {Color.RED, Color.BLUE, Color.GREEN, Color.MAGENTA};

        for (int i = 0; i < AUTO_KOPURUA; i++) {
            JPanel lerroa = new JPanel(new BorderLayout(10, 5));
            lerroa.setBorder(BorderFactory.createTitledBorder("Autoa " + (i + 1)));

            // Ezkerraldea: Abiadura ezartzeko
            JPanel panelAbiadura = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 0));
            panelAbiadura.add(new JLabel("Abiadura (m/s):"));
            txtAbiadurak[i] = new JTextField(String.valueOf(abiaduraLehenetsiak[i]), 4);
            panelAbiadura.add(txtAbiadurak[i]);
            lerroa.add(panelAbiadura, BorderLayout.WEST);

            // Erdialdea: Aurrerapen-barra
            barrak[i] = new JProgressBar(0, 100);
            barrak[i].setStringPainted(true);
            barrak[i].setForeground(koloreak[i]);
            barrak[i].setValue(0);
            lerroa.add(barrak[i], BorderLayout.CENTER);

            // Eskuinaldea: Egindako distantzia
            lblDistantziak[i] = new JLabel("0.0 / 100 m  ");
            lblDistantziak[i].setPreferredSize(new Dimension(100, 20));
            lerroa.add(lblDistantziak[i], BorderLayout.EAST);

            panelAutoak.add(lerroa);
        }
        add(panelAutoak, BorderLayout.CENTER);

        // 3. BEHEKO PANELA: Emaitza orokorra (Irabazlea nork lortu duen)
        JPanel panelBehekoa = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        lblEmaitza = new JLabel("Konfiguratu abiadurak eta sakatu 'Hasi Lasterketa'");
        lblEmaitza.setFont(new Font("Arial", Font.BOLD, 13));
        panelBehekoa.add(lblEmaitza);
        add(panelBehekoa, BorderLayout.SOUTH);

        // Botoiaren ekintza
        btnHasi.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                hasiLasterketa();
            }
        });
    }

    /**
     * Lasterketa hasi eta 4 hariak abiarazten dituen metodoa.
     */
    private void hasiLasterketa() {
        final double helburuDistantzia;
        final double[] abiadurak = new double[AUTO_KOPURUA];

        // Balidatu zirkuituaren distantzia
        try {
            helburuDistantzia = Double.parseDouble(txtDistantzia.getText().trim());
            if (helburuDistantzia <= 0) {
                JOptionPane.showMessageDialog(this, "Distantziak 0 baino handiagoa izan behar du.", "Errorea", JOptionPane.ERROR_MESSAGE);
                return;
            }
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Mesedez, sartu distantzia baliodun bat.", "Errorea", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Balidatu auto bakoitzaren abiadura
        for (int i = 0; i < AUTO_KOPURUA; i++) {
            try {
                abiadurak[i] = Double.parseDouble(txtAbiadurak[i].getText().trim());
                if (abiadurak[i] <= 0) {
                    JOptionPane.showMessageDialog(this, (i + 1) + ". autoaren abiadurak 0 baino handiagoa izan behar du.", "Errorea", JOptionPane.ERROR_MESSAGE);
                    return;
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, (i + 1) + ". autoaren abiadura ez da balioduna.", "Errorea", JOptionPane.ERROR_MESSAGE);
                return;
            }
        }

        // Interfazea prestatu
        btnHasi.setEnabled(false);
        txtDistantzia.setEnabled(false);
        for (int i = 0; i < AUTO_KOPURUA; i++) {
            txtAbiadurak[i].setEnabled(false);
            barrak[i].setMinimum(0);
            barrak[i].setMaximum((int) helburuDistantzia);
            barrak[i].setValue(0);
            lblDistantziak[i].setText("0.0 / " + (int) helburuDistantzia + " m");
        }

        lasterketaAmaituta = false;
        irabazlea = "";
        lblEmaitza.setText("Lasterketa martxan da...");
        lblEmaitza.setForeground(Color.BLACK);

        hariak = new ArrayList<>();

        // =========================================================================
        // 4 HARIAK SORTU ETA ABIATU (AUTO BAKOITZEKO HARI BAT)
        // =========================================================================
        for (int i = 0; i < AUTO_KOPURUA; i++) {
            final int autoZenbakia = i + 1;
            final int indizea = i;
            final double autoAbiadura = abiadurak[i];

            Thread autoHaria = new Thread(new Runnable() {
                @Override
                public void run() {
                    double unekoDistantzia = 0.0;
                    // Begizta: autoa helmugara iritsi arte ETA beste inork irabazi ez duen bitartean
                    while (!lasterketaAmaituta && unekoDistantzia < helburuDistantzia) {
                        try {
                            // 100 milisegundoro aurrerapen bat kalkulatzen dugu
                            Thread.sleep(100);

                            // 100 ms = 0.1 segundo. Distantzia = abiadura * denbora (0.1 s)
                            unekoDistantzia += autoAbiadura * 0.1;

                            // Helmugara iritsi bada
                            if (unekoDistantzia >= helburuDistantzia) {
                                unekoDistantzia = helburuDistantzia;

                                // SINKRONIZAZIOA (SYNCHRONIZED):
                                // Auto batek baino gehiagok aldi berean helmuga zeharkatzen badute,
                                // lehena sartzen denak bakarrik harrapatuko du blokeoa (lock)
                                // eta bera bakarrik izendatuko da irabazle!
                                synchronized (giltza) {
                                    if (!lasterketaAmaituta) {
                                        lasterketaAmaituta = true;
                                        irabazlea = "Autoa " + autoZenbakia;
                                    }
                                }
                            }

                            final double distantziaFinala = unekoDistantzia;

                            // Interfaze grafikoa eguneratu
                            SwingUtilities.invokeLater(new Runnable() {
                                @Override
                                public void run() {
                                    barrak[indizea].setValue((int) distantziaFinala);
                                    lblDistantziak[indizea].setText(String.format("%.1f / %d m", distantziaFinala, (int) helburuDistantzia));
                                }
                            });

                        } catch (InterruptedException e) {
                            // Haria eten bada, begiztatik irten
                            break;
                        }
                    }

                    // Lasterketa amaitu denean (irabazlea zehaztu ondoren), interfazea berrabiarazi
                    SwingUtilities.invokeLater(new Runnable() {
                        @Override
                        public void run() {
                            if (lasterketaAmaituta && !btnHasi.isEnabled()) {
                                lblEmaitza.setText("¡Lasterketa amaituta! IRABAZLEA: " + irabazlea);
                                lblEmaitza.setForeground(new Color(0, 128, 0)); // Berdez

                                // Botoiak berriro gaitu
                                btnHasi.setEnabled(true);
                                txtDistantzia.setEnabled(true);
                                for (int j = 0; j < AUTO_KOPURUA; j++) {
                                    txtAbiadurak[j].setEnabled(true);
                                }
                            }
                        }
                    });
                }
            });

            hariak.add(autoHaria);
            autoHaria.start(); // Haria abiatu
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new KotxeLasterketa().setVisible(true);
            }
        });
    }
}
