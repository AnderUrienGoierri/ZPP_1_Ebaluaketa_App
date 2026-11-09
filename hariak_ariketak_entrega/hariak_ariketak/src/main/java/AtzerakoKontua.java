import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 3. ARIKETA: ATZERAKO KONTUA (CUENTA ATRÁS)
 * 
 * Ariketa honen helburua:
 * Erabiltzaileak programatutako denboraren atzerako kontua egitea.
 * - Aurrerapen-barra bat erabiliko da, baina oraingoan HUSTEN joango da
 *   (balio maximoan hasi eta zeroraino jaisten).
 * - Amaitzean, pantaila nagusian mezu argi bat agertuko da (adibidez,
 *   testu handi batean eta elkarrizketa-koadro batean).
 * - Kontua edozein unetan bertan behera uzteko aukera egongo da ("Utzi / Parar").
 * 
 * HARIAREN (THREAD) AZALPENA:
 * - Atzerako kontua segundoz segundo (Thread.sleep(1000)) jaitsiko da atzeko planoko hari batean.
 * - Barraren balioa (progressBar.setValue(geratzenDena)) segundoero jaisten da 0ra iritsi arte.
 * - 0ra iristean, amaierako mezua erakusten da pantaila nagusian.
 */
public class AtzerakoKontua extends JFrame {

    // Interfazearen osagaiak
    private JTextField txtSegundoak;
    private JButton btnHasi;
    private JButton btnUtzi;
    private JProgressBar progressBar;
    private JLabel lblMezua;

    // Haria kudeatzeko aldagaiak
    private Thread atzerakoHaria;
    private volatile boolean martxan;

    public AtzerakoKontua() {
        setTitle("Atzerako Kontua (Cuenta atrás)");
        setSize(420, 240);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(10, 10));

        // 1. GOIKO PANELA: Segundoak sartzeko eremua
        JPanel panelGoikoa = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        panelGoikoa.add(new JLabel("Atzerako kontua (segundoak):"));
        txtSegundoak = new JTextField("10", 6);
        panelGoikoa.add(txtSegundoak);
        add(panelGoikoa, BorderLayout.NORTH);

        // 2. ERDIKO PANELA: Botoiak eta aurrerapen-barra
        JPanel panelErdikoa = new JPanel();
        panelErdikoa.setLayout(new BoxLayout(panelErdikoa, BoxLayout.Y_AXIS));
        panelErdikoa.setBorder(BorderFactory.createEmptyBorder(0, 20, 0, 20));

        // Botoien panela
        JPanel panelBotoiak = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 5));
        btnHasi = new JButton("Hasi");
        btnUtzi = new JButton("Utzi");
        btnUtzi.setEnabled(false); // Hasieran desgaituta
        panelBotoiak.add(btnHasi);
        panelBotoiak.add(btnUtzi);
        panelErdikoa.add(panelBotoiak);

        // Aurrerapen-barra (husten joango dena)
        progressBar = new JProgressBar();
        progressBar.setStringPainted(true);
        progressBar.setValue(100);
        panelErdikoa.add(progressBar);

        add(panelErdikoa, BorderLayout.CENTER);

        // 3. BEHEKO PANELA: Pantaila nagusiko mezua
        JPanel panelBehekoa = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        lblMezua = new JLabel("Programatu segundoak eta sakatu 'Hasi'");
        lblMezua.setFont(new Font("Arial", Font.BOLD, 14));
        panelBehekoa.add(lblMezua);
        add(panelBehekoa, BorderLayout.SOUTH);

        // Ekintzak (Listeners)
        btnHasi.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                hasiAtzerakoKontua();
            }
        });

        btnUtzi.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                utziAtzerakoKontua();
            }
        });
    }

    /**
     * Atzerako kontua abiatzen duen metodoa.
     */
    private void hasiAtzerakoKontua() {
        final int segunduHasiera;

        // Balidatu erabiltzailearen sarrera
        try {
            segunduHasiera = Integer.parseInt(txtSegundoak.getText().trim());
            if (segunduHasiera <= 0) {
                JOptionPane.showMessageDialog(this, "Mesedez, sartu 0 baino handiagoa den zenbaki bat.", "Errorea", JOptionPane.ERROR_MESSAGE);
                return;
            }
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Mesedez, sartu zenbaki baliodun bat.", "Errorea", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Botoiak eta osagaiak prestatu
        btnHasi.setEnabled(false);
        btnUtzi.setEnabled(true);
        txtSegundoak.setEnabled(false);

        // Barra hasieran BETETA jartzen dugu (husten joan dadin)
        progressBar.setMinimum(0);
        progressBar.setMaximum(segunduHasiera);
        progressBar.setValue(segunduHasiera);
        progressBar.setString(segunduHasiera + " seg geratzen dira");

        lblMezua.setText("Kontua martxan: " + segunduHasiera + " segundo geratzen dira");
        lblMezua.setForeground(Color.BLUE);

        martxan = true;

        // =========================================================================
        // ATZERAKO KONTUAREN HARIA (THREAD)
        // =========================================================================
        atzerakoHaria = new Thread(new Runnable() {
            @Override
            public void run() {
                int geratzenDena = segunduHasiera;

                while (geratzenDena > 0 && martxan) {
                    try {
                        // Segundo 1 itxaron
                        Thread.sleep(1000);
                        geratzenDena--;

                        final int unekoGeratzenDena = geratzenDena;

                        // UI eguneratu (barra hustu eta testua aldatu)
                        SwingUtilities.invokeLater(new Runnable() {
                            @Override
                            public void run() {
                                progressBar.setValue(unekoGeratzenDena);
                                progressBar.setString(unekoGeratzenDena + " seg geratzen dira");
                                lblMezua.setText("Kontua martxan: " + unekoGeratzenDena + " segundo geratzen dira");
                            }
                        });

                    } catch (InterruptedException e) {
                        // Haria eten bada, begiztatik irten
                        break;
                    }
                }

                // Kontua amaitu bada (0ra iritsi delako edo gelditu delako)
                final boolean amaituDaOsorik = (geratzenDena == 0 && martxan);

                SwingUtilities.invokeLater(new Runnable() {
                    @Override
                    public void run() {
                        btnHasi.setEnabled(true);
                        btnUtzi.setEnabled(false);
                        txtSegundoak.setEnabled(true);

                        if (amaituDaOsorik) {
                            // Ariketak eskatzen duen pantaila nagusiko mezua:
                            lblMezua.setText("¡DENBORA BUKATU DA! (0 segundo)");
                            lblMezua.setForeground(Color.RED);
                            progressBar.setString("0 seg (Amaituta)");

                            // Elkarrizketa-koadro batekin ere jakinarazi
                            JOptionPane.showMessageDialog(AtzerakoKontua.this, 
                                    "¡Atzerako kontua amaitu da!", 
                                    "Denbora agortuta", 
                                    JOptionPane.INFORMATION_MESSAGE);
                        } else {
                            lblMezua.setText("Atzerako kontua bertan behera utzi da.");
                            lblMezua.setForeground(Color.GRAY);
                        }
                    }
                });
            }
        });

        atzerakoHaria.start();
    }

    /**
     * Atzerako kontua bertan behera uzten du.
     */
    private void utziAtzerakoKontua() {
        martxan = false;
        if (atzerakoHaria != null && atzerakoHaria.isAlive()) {
            atzerakoHaria.interrupt();
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new AtzerakoKontua().setVisible(true);
            }
        });
    }
}
