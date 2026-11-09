import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 1. ARIKETA: KRONOMETROA (CRONÓMETRO)
 * 
 * Ariketa honen helburua:
 * Erabiltzaileak sartutako segundo kopururaino kontagailu bat aurrera eramatea,
 * aurrerapen-barra (JProgressBar) eta testu-etiketa (JLabel) baten bidez erakutsiz.
 * Edozein unetan kontua gelditzeko aukera egongo da ("Parar" botoia).
 * 
 * HARIAK (THREADS) ETA SWING AZALPENA:
 * - Swing interfazeak hari bakar batean lan egiten du: Event Dispatch Thread (EDT).
 * - Denbora itxaron behar badugu (Thread.sleep) EDT haria blokeatuko bagenu,
 *   leihoa "izoztu" egingo litzateke eta botoiek ez lukete erantzungo.
 * - Hori saihesteko, kontaketa hari bereizi batean (Thread independente batean)
 *   egiten da. Horrela, "Parar" botoiak klikak jasotzen jarraitu ahal izango du.
 */
public class Cronometroa extends JFrame {

    // Interfazearen osagaiak
    private JTextField txtSegunduak;
    private JButton btnIniciar;
    private JButton btnParar;
    private JProgressBar progressBar;
    private JLabel lblEgoera;

    // Haria kudeatzeko aldagaiak
    private Thread kronometroHaria;     // Kontaketa egingo duen haria
    private volatile boolean martxan;    // Haria gelditu behar den kontrolatzeko bandera (volatile, hari artean sinkronizatzeko)

    public Cronometroa() {
        // Leihoaren oinarrizko konfigurazioa
        setTitle("Cronómetro");
        setSize(400, 220);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLocationRelativeTo(null); // Pantailaren erdian kokatu
        setLayout(new BorderLayout(10, 10));

        // 1. GOIKO PANELA: Zenbakia sartzeko eremua
        JPanel panelGoikoa = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 10));
        panelGoikoa.add(new JLabel("Cronómetro (segundos):"));
        txtSegunduak = new JTextField("10", 8); // Balio lehenetsia: 10
        panelGoikoa.add(txtSegunduak);
        add(panelGoikoa, BorderLayout.NORTH);

        // 2. ERDIKO PANELA: Botoiak eta Aurrerapen-barra
        JPanel panelErdikoa = new JPanel();
        panelErdikoa.setLayout(new BoxLayout(panelErdikoa, BoxLayout.Y_AXIS));
        panelErdikoa.setBorder(BorderFactory.createEmptyBorder(0, 15, 0, 15));

        // Botoien panela
        JPanel panelBotoiak = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 5));
        btnIniciar = new JButton("Iniciar");
        btnParar = new JButton("Parar");
        btnParar.setEnabled(false); // Hasieran ezin da gelditu, oraindik hasi gabe dagoelako
        panelBotoiak.add(btnIniciar);
        panelBotoiak.add(btnParar);
        panelErdikoa.add(panelBotoiak);

        // Aurrerapen-barra
        progressBar = new JProgressBar();
        progressBar.setStringPainted(true); // Ehunekoa edo testua barran ikusteko
        progressBar.setValue(0);
        panelErdikoa.add(progressBar);

        add(panelErdikoa, BorderLayout.CENTER);

        // 3. BEHEKO PANELA: Testu etiketa (adibidez: "3 de 10 segundos")
        JPanel panelBehekoa = new JPanel(new FlowLayout(FlowLayout.LEFT, 15, 10));
        lblEgoera = new JLabel("Sartu segundoak eta sakatu 'Iniciar'");
        panelBehekoa.add(lblEgoera);
        add(panelBehekoa, BorderLayout.SOUTH);

        // Botoien ekintzak (Event Listeners)
        btnIniciar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                hasiKontaketa();
            }
        });

        btnParar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                geldituKontaketa();
            }
        });
    }

    /**
     * Kontaketa hasten duen metodoa.
     * Hari berri bat sortzen du atzeko planoan segundoak zenbatzeko.
     */
    private void hasiKontaketa() {
        int segunduGuztira;

        // Erabiltzaileak sartutako balioa zenbaki osoa dela ziurtatu
        try {
            segunduGuztira = Integer.parseInt(txtSegunduak.getText().trim());
            if (segunduGuztira <= 0) {
                JOptionPane.showMessageDialog(this, "Mesedez, sartu 0 baino handiagoa den zenbaki bat.", "Errorea", JOptionPane.ERROR_MESSAGE);
                return;
            }
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Mesedez, sartu zenbaki baliodun bat.", "Errorea", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // Botoien eta osagaien egoera egokitu
        btnIniciar.setEnabled(false);
        btnParar.setEnabled(true);
        txtSegunduak.setEnabled(false);

        // Aurrerapen-barra konfiguratu
        progressBar.setMinimum(0);
        progressBar.setMaximum(segunduGuztira);
        progressBar.setValue(0);
        lblEgoera.setText("0 de " + segunduGuztira + " segundos");

        martxan = true;

        // =========================================================================
        // HARIAREN SORKUNTZA (THREAD)
        // =========================================================================
        // Zergatik hemen hari bat?
        // Begiztan segundoero Thread.sleep(1000) egingo dugu.
        // Hau hari nagusian egingo bagenu, interfazea blokeatuta geratuko litzateke.
        // Horregatik, Runnable interfazea erabiliz hari bereizi bat abiatzen dugu.
        kronometroHaria = new Thread(new Runnable() {
            @Override
            public void run() {
                int pasatakoSegundoak = 0;

                // Begizta: segundu guztiak bete arte edo gelditu agindua jaso arte
                while (pasatakoSegundoak < segunduGuztira && martxan) {
                    try {
                        // Segundo 1 itxaron (1000 milisegundo)
                        Thread.sleep(1000);
                        pasatakoSegundoak++;

                        final int unekoSegundoa = pasatakoSegundoak;

                        // Swing-eko osagaiak eguneratzeko, gomendagarria da SwingUtilities.invokeLater erabiltzea,
                        // osagai grafikoak beti Event Dispatch Thread (EDT) bidez aldatzen direla bermatzeko.
                        SwingUtilities.invokeLater(new Runnable() {
                            @Override
                            public void run() {
                                progressBar.setValue(unekoSegundoa);
                                lblEgoera.setText(unekoSegundoa + " de " + segunduGuztira + " segundos");
                            }
                        });

                    } catch (InterruptedException e) {
                        // Haria eteten bada (interrupt()), begiztatik irten
                        break;
                    }
                }

                // Kontaketa amaitu denean (osorik edo bertan behera utzita) interfazea berrezarri
                SwingUtilities.invokeLater(new Runnable() {
                    @Override
                    public void run() {
                        btnIniciar.setEnabled(true);
                        btnParar.setEnabled(false);
                        txtSegunduak.setEnabled(true);

                        if (progressBar.getValue() >= segunduGuztira) {
                            lblEgoera.setText("Amaituta: " + segunduGuztira + " de " + segunduGuztira + " segundos.");
                        } else {
                            lblEgoera.setText("Geldituta: " + progressBar.getValue() + " de " + segunduGuztira + " segundos.");
                        }
                    }
                });
            }
        });

        // Haria abiatu
        kronometroHaria.start();
    }

    /**
     * Martxan dagoen haria gelditzen duen metodoa.
     */
    private void geldituKontaketa() {
        martxan = false; // Banderari false jarri, begizta hurrengo bueltan geldi dadin
        if (kronometroHaria != null && kronometroHaria.isAlive()) {
            kronometroHaria.interrupt(); // Lo badago (Thread.sleep), berehala esnatu eta amaitzeko
        }
    }

    public static void main(String[] args) {
        // Interfaze grafikoa Swing-en hari egokian abiatu
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new Cronometroa().setVisible(true);
            }
        });
    }
}
