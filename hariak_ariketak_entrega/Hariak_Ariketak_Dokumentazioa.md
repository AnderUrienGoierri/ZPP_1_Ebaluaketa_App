# Zerbitzu eta Prozesuen Programazioa (0490)
## Hariekin Ariketak (Multithreading eta Swing) — Dokumentazio Teknikoa

---

### 1. Sarrera eta Testuingurua

Praktika honen helburua Java bidezko hari anitzeko programazioaren (**Multithreading**) oinarriak eta interfaze grafikoekin (**Java Swing**) duten elkarreragina ulertzea eta modu praktikoan garatzea da.

Mahaigaineko aplikazio grafikoetan (GUI), interfazearen gertaerak eta marrazketa hari bakar batek kudeatzen ditu: **Event Dispatch Thread (EDT)** izenekoak. Denbora eskatzen duen ataza bat (adibidez, segundo bat itxarotea `Thread.sleep()` erabiliz) hari nagusi horretan exekutatuko bagenu, interfaze osoa "izoztu" egingo litzateke eta erabiltzaileak ezingo luke botoirik sakatu. Hori ekiditeko, atzeko planoko hari independenteak (**Threads**) erabiltzen dira.

Dokumentu honetan garatutako hiru ariketak, horien egitura, aplikatutako kontzeptu teorikoak eta kodearen funtzionamendua azaltzen dira.

---

### 2. Oinarri Teorikoak eta Erabilitako Mekanismoak

1. **`Thread` eta `Runnable`:**
   * Java-n hari berri bat sortzeko `Runnable` interfazea inplementatzen dugu eta `new Thread(runnable).start()` bidez abiarazten dugu. Honek sistema eragilearen hari berri bat sortzen du ataza paraleloan egiteko.

2. **Interfazea ez blokeatzea:**
   * Begizta luzeak edo denbora-itxaronaldiak (`Thread.sleep(1000)`) atzeko planoko hariaren barruan sartzen dira. Ondorioz, interfazearen hari nagusia libre geratzen da erabiltzailearen ekintzei (klikak, botoiak) erantzuteko.

3. **Harien arteko komunikazioa eta gelditze segurua (`volatile` eta `interrupt()`):**
   * Antzinako `thread.stop()` metodoa guztiz debekatuta dago arriskutsua delako.
   * Horren ordez, kontrol-bandera boolearrak (`volatile boolean martxan`) eta `thread.interrupt()` mekanismoa erabili dira. `volatile` hitz gakoak bermatzen du hari batek aldagaiari balioa aldatzen dionean, beste hari guztiek berehala ikusten dutela balio berria memoriatik zuzenean.
   * Haria lo dagoenean (`Thread.sleep`), `interrupt()` deitzeak `InterruptedException` salbuespena sortzen du, haria berehala esnatuz eta modu garbian amaitzea ahalbidetuz.

4. **Hari-segurtasuna eta Sinkronizazioa (`synchronized`):**
   * Autoen lasterketan, 4 hari ari dira aldi berean korrika. Bi autok aldi berean helmuga zeharkatuko balute, **lasterketa-baldintza** (*race condition*) gerta liteke.
   * Hori saihesteko, `synchronized(lock)` blokea erabili da: lehenengo iristen den hariak soilik eskuratzen du giltza irabazle izendatzeko.

5. **`SwingUtilities.invokeLater()`:**
   * Swing osagaiak (adibidez `progressBar.setValue()` edo `label.setText()`) EDT haritik aldatu behar dira beti. Metodo honek atzeko planoko haritik UI-ren eguneraketak ilaran jartzen ditu modu seguruan exekutatu daitezen.

---

### 3. Garatutako Ariketen Deskribapena

Sortutako Java proiektuaren egitura:
```text
hariak_ariketak/
├── pom.xml
└── src/main/java/
    ├── Main.java              (Menu orokorra, 3 ariketak irekitzeko)
    ├── Cronometroa.java       (1. Ariketa: Kronometroa)
    ├── KotxeLasterketa.java   (2. Ariketa: Auto Lasterketa)
    └── AtzerakoKontua.java    (3. Ariketa: Atzerako Kontua)
```

---

#### 3.1. Kronometroa (`Cronometroa.java`)

* **Ariketaren helburua:**  
  Erabiltzaileak sartutako segunduetaraino kontagailu bat aurrera eramatea. Aurrerapen-barra bat (`JProgressBar`) betetzen joango da eta azpiko etiketan `X de Y segundos` erakutsiko da. Edozein unetan kontua bertan behera uzteko aukera egongo da ("Parar" botoia).

* **Interfazearen osagaiak:**
  * `JTextField txtSegunduak`: erabiltzaileak nahi duen segundo kopurua sartzeko.
  * `JButton btnIniciar` eta `JButton btnParar`: kontaketa hasteko eta gelditzeko.
  * `JProgressBar progressBar`: aurrerapena bistaratzeko (0tik sartutako maximo arte).
  * `JLabel lblEgoera`: unean uneko testua erakusteko.

* **Funtsezko kode zatia:**
  ```java
  kronometroHaria = new Thread(new Runnable() {
      @Override
      public void run() {
          int pasatakoSegundoak = 0;
          while (pasatakoSegundoak < segunduGuztira && martxan) {
              try {
                  Thread.sleep(1000); // Segundo bat itxaron
                  pasatakoSegundoak++;
                  final int s = pasatakoSegundoak;
                  SwingUtilities.invokeLater(() -> {
                      progressBar.setValue(s);
                      lblEgoera.setText(s + " de " + segunduGuztira + " segundos");
                  });
              } catch (InterruptedException e) {
                  break; // Gelditu botoiak etena eragiten du
              }
          }
      }
  });
  kronometroHaria.start();
  ```

---

#### 3.2. Auto Lasterketa (`KotxeLasterketa.java`)

* **Ariketaren helburua:**  
  Gehienez 4 autoren arteko lasterketa simulatzea:
  * Zirkuituaren distantzia konfiguragarria da (adib. 100 metro).
  * Auto bakoitzaren abiadura independentea eta konfiguragarria da.
  * Auto bakoitza hari independente batek mugiarazten du (konkurrentzia erreala).
  * Auto batek helmuga zeharkatzean, irabazlea iragartzen da, gainerako autoak berehala gelditzen dira eta bakoitzak egindako distantzia pantailaratzen da.

* **Funtsezko kode zatia (Konkurrentzia eta Sinkronizazioa):**
  ```java
  // Auto bakoitzeko hari bana abiarazten da
  for (int i = 0; i < AUTO_KOPURUA; i++) {
      final int autoId = i + 1;
      final double abiadura = abiadurak[i];

      Thread t = new Thread(() -> {
          double distantzia = 0.0;
          while (!lasterketaAmaituta && distantzia < helburuDistantzia) {
              try {
                  Thread.sleep(100); // 100 ms-ro eguneratu
                  distantzia += abiadura * 0.1;

                  if (distantzia >= helburuDistantzia) {
                      distantzia = helburuDistantzia;
                      // Giltza/Lock bidezko sinkronizazioa: irabazle bakarra egon dadin
                      synchronized (giltza) {
                          if (!lasterketaAmaituta) {
                              lasterketaAmaituta = true;
                              irabazlea = "Autoa " + autoId;
                          }
                      }
                  }
                  // Barra eta etiketa eguneratu...
              } catch (InterruptedException e) {
                  break;
              }
          }
      });
      t.start();
  }
  ```

---

#### 3.3. Atzerako Kontua (`AtzerakoKontua.java`)

* **Ariketaren helburua:**  
  Erabiltzaileak programatutako segundoetatik 0ra arteko atzerako kontua egitea.
  * Aurrerapen-barra hasieran balio maximoan dago eta **husten** joango da.
  * 0ra iristean, pantaila nagusian etiketa gorri nabarmen batekin eta abisu-koadro batekin (`JOptionPane`) jakinaraziko da denbora amaitu dela.
  * "Utzi" botoia sakatuz gero atzerako kontua eten daiteke.

* **Funtsezko kode zatia:**
  ```java
  progressBar.setMaximum(segunduHasiera);
  progressBar.setValue(segunduHasiera); // Hasieran beteta

  atzerakoHaria = new Thread(() -> {
      int geratzenDena = segunduHasiera;
      while (geratzenDena > 0 && martxan) {
          try {
              Thread.sleep(1000);
              geratzenDena--;
              final int g = geratzenDena;
              SwingUtilities.invokeLater(() -> {
                  progressBar.setValue(g); // Barra hustuz doa
                  lblMezua.setText("Kontua martxan: " + g + " segundo geratzen dira");
              });
          } catch (InterruptedException e) {
              break;
          }
      }
      if (geratzenDena == 0 && martxan) {
          SwingUtilities.invokeLater(() -> {
              lblMezua.setText("¡DENBORA BUKATU DA! (0 segundo)");
              JOptionPane.showMessageDialog(AtzerakoKontua.this, "¡Atzerako kontua amaitu da!");
          });
      }
  });
  atzerakoHaria.start();
  ```

---

### 4. Proiektua Exekutatzeko Argibideak

Proiektua exekutatzeko bi bide daude:

1. **Menu Nagusitik (`Main.java`):**
   * `Main.java` fitxategian eskuineko botoia sakatu eta **Run 'Main.main()'** aukeratu.
   * Leiho bat irekiko da hiru botoirekin, ariketa bakoitza klik bakarrez irekitzeko.

2. **Ariketak banaka exekutatuz:**
   * Klase bakoitzak (`Cronometroa`, `KotxeLasterketa`, `AtzerakoKontua`) bere `public static void main(String[] args)` metodoa dauka.
   * Beraz, nahi den ariketaren fitxategia ireki eta zuzenean bertatik exekutatu daiteke.

---

### 5. Ondorioak

Praktika honen bidez, honako ezagutza gakoak finkatu dira:
* Interfaze grafikoek hari espezifiko bat (EDT) behar dutela arin mantentzeko.
* Ataza luzeak hari laguntzaileetan exekutatu behar direla aplikazioa ez blokeatzeko.
* Hariak gelditzeko eta eteteko teknika moderno eta seguruak (`volatile`, `interrupt`).
* Hari anitzek baliabide edo egoera partekatuak dituztenean sinkronizazioa (`synchronized`) ezinbestekoa dela datuen sendotasuna bermatzeko.
