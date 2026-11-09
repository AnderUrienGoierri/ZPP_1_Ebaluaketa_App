import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * PROIEKTUAREN SARRERA PUNTU NAGUSIA (MAIN)
 * 
 * Leiho honetatik 3 ariketak ireki daitezke botoi bidez:
 * 1. Kronometroa (Cronómetro aurrera)
 * 2. Auto Lasterketa (Carrera de coches konkurrentziarekin)
 * 3. Atzerako Kontua (Cuenta atrás barra hustuz)
 * 
 * Oharra: Ariketa bakoitzak ere bere 'main' metodo propioa du,
 * beraz banaka ere exekutatu daitezke klase bakoitzean eskuineko botoia sakatuta.
 */
public class Main extends JFrame {

    public Main() {
        setTitle("Harien Ariketak - Menua");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(15, 15));

        // Goiburua
        JPanel panelGoiburua = new JPanel();
        panelGoiburua.setBorder(BorderFactory.createEmptyBorder(15, 10, 5, 10));
        JLabel lblIzenburua = new JLabel("HARIEKIN ARIKETAK", SwingConstants.CENTER);
        lblIzenburua.setFont(new Font("Arial", Font.BOLD, 18));
        panelGoiburua.add(lblIzenburua);
        add(panelGoiburua, BorderLayout.NORTH);

        // Botoien panela
        JPanel panelBotoiak = new JPanel(new GridLayout(3, 1, 10, 15));
        panelBotoiak.setBorder(BorderFactory.createEmptyBorder(10, 30, 20, 30));

        JButton btnAriketa1 = new JButton("1. Kronometroa (Cronómetro)");
        JButton btnAriketa2 = new JButton("2. Auto Lasterketa (Carrera)");
        JButton btnAriketa3 = new JButton("3. Atzerako Kontaketa (Cuenta atrás)");

        btnAriketa1.setFont(new Font("Arial", Font.PLAIN, 14));
        btnAriketa2.setFont(new Font("Arial", Font.PLAIN, 14));
        btnAriketa3.setFont(new Font("Arial", Font.PLAIN, 14));

        panelBotoiak.add(btnAriketa1);
        panelBotoiak.add(btnAriketa2);
        panelBotoiak.add(btnAriketa3);
        add(panelBotoiak, BorderLayout.CENTER);

        // Ekintzak (Ariketen leihoak ireki)
        btnAriketa1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new Cronometroa().setVisible(true);
            }
        });

        btnAriketa2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new KotxeLasterketa().setVisible(true);
            }
        });

        btnAriketa3.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new AtzerakoKontua().setVisible(true);
            }
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new Main().setVisible(true);
            }
        });
    }
}
