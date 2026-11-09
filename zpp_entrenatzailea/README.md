# ZPP 1. Ebaluaketa: Azterketa Entrenatzailea (Web App eta Android APK)

Aplikazio honek **«Zerbitzu eta Prozesuen Programazioa» (0490)** moduluko lehen ebaluaketako teoria eta ariketa praktiko guztiak prestatzeko eta trebatzeko entrenamendu-ingurune oso bat eskaintzen du, bai ordenagailuko nabigatzailetik (`http://localhost:3003`) bai Android gailutik (APK natiboa).

---

## 🎯 Aplikazioaren Ezaugarri Nagusiak

### 1. 📝 Teoria Test Modua (20 Galdera)
- **20 galdera ausazkoak** azterketa bakoitzean, 52 galderako banku teoriko oso batetik aterata.
- **Erantzunen nahasketa dinamikoa:** Galderak ez ezik, erantzun-aukerak (A, B, C, D) ere nahasten dira aldi bakoitzean. Ondorioz, **erantzun zuzena EZ DA BETI 'B'** (edo letra finko bat); letra bakoitzak probabilitate bera du.
- **Tenporizadorea:** 20 minutuko atzerako kontaketa integratua (kolore aldaketekin denbora agortzear dagoenean).
- **Zuzenketa eta Azalpen Sakonak:** Testa amaitzean, nota (0-10), asmatutako/huts egindako kopurua eta galdera bakoitzaren arrazoibide teorikoa bistaratzen dira.
- **🔁 Birpasatu Okerrak Soilik:** Botoi honi sakatuta, testa automatikoki berrezartzen da **soilik huts egindako galderekin**, ikasleak kontzeptu guztiak menderatu arte birpasatzeko aukera emanez!

### 2. 💻 Zati Praktikoa (IDE Modua eta Ariketa Errealak)
- **IDE Kode Ikuslea:** Sintaxi-koloreztatze aurreratua (VS Code / JetBrains Dark Style) aldagai, gako-hitz, mota, metodo, zenbaki, kate eta iruzkinentzat.
- **Lanketa Praktikoak:**
  1. `ProzesuExekutatzailea.java`: `ProcessBuilder`, `start()`, `pid()`, `startInstant()`, `isAlive()`, parametroen banaketa (`split("\\s+")`).
  2. `KotxeLasterketa.java`: Java Swing + 4 hari paralelo (`Thread`), `synchronized(giltza)` irabazlea zehazteko, `volatile boolean lasterketaAmaituta`, `SwingUtilities.invokeLater()`.
  3. `Cronometroa.java` eta `AtzerakoKontua.java`: EDT haria ez blokeatzea, `Thread.sleep(1000)`, `volatile` kontrol-bandera eta `interrupt()` bidezko gelditze garbia.
  4. `LuzatzeAtaza.java` eta `Main.java`: `Timer` eta `TimerTask` bidezko plangintza (`scheduleAtFixedRate`), ataza-barrako `SystemTray` eta `TrayIcon.displayMessage()`.
  5. **Konkurrentziaren 5 Arazo Nagusiak:**
     - *Deadlock:* 4 Coffman baldintzak eta *Resource Ordering* bidezko soluzioa.
     - *Inanizioa (Starvation):* Lehentasun altuko hariek baliabidea monopolizatzea eta *ReentrantLock(true)* (Fair Lock) bidezko konponbidea.
     - *Race Condition:* `kontagailua++` ez-atomikoa (Read-Modify-Write) eta *synchronized* / *AtomicInteger* bidezko konponbidea.
     - *Memoria Inkontsistentzia:* CPU katxearen desfasajea eta *volatile* hitz gakoa.
     - *Slipped Conditions:* Check-then-act egoera eta bloke sinkronizatu bakarrean biltzea.
- **Bug Hunter (Zuzendu Kode Akatsak):** Akats errealak dituzten 5 kode-zati (h.run vs h.start, Swing invokeLater falta, Kotxe Lasterketako lasterketa-baldintza, Deadlock zirkularra, katxean trabatutako bandera).
- **Osatu / Idatzi Kodea:** Hutsuneak interaktiboki betetzeko ariketak berehalako egiaztapenarekin.

### 3. 📚 Gida Bizkorra (Laburpen Orokorra)
- 7 egoeren zikloa eta trantsizioak.
- SEren planifikazio algoritmoen taula konparatiboa (FCFS, RR, SPF, SRT, Feedback Queues).
- Multiprozesua vs Multiharia taula.
- Java bildumen hari-segurtasuna (`ArrayList` vs `ConcurrentHashMap`, `CopyOnWriteArrayList`).

---

## 🚀 Nola Exekutatu

### Web Aplikazioa (`localhost:3003`)
Zerbitzaria abiarazteko komandoa:
```powershell
node server.js
```
Nabigatzailean ireki: **http://localhost:3003**

### Android Aplikazioa (APK)
APK fitxategia karpeta honetan bertan dago:
`ZPP_Entrenatzailea.apk`

Gailuan instalatzeko:
```powershell
adb install -r ZPP_Entrenatzailea.apk
```
