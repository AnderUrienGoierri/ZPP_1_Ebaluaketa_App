# 2.4 Ariketa Proposatua: Luzatze-ariketen plangintza

**Modulua:** 0490 - Zerbitzu eta Prozesuen Programazioa (2. maila)
**Gaia:** Hariak, prozesuak eta aldizkako atazak (`Timer` eta `TimerTask`)

---

## 1. Enuntziatua

> **Luzatze-ariketen plangintza**
> Sortu aplikazio bat, `Timer` eta `TimerTask` klaseak erabiliz, erabiltzaileari **30 minuturo** hankak luzatzeko jaiki behar dela gogorarazten diona.
>
> Oharra sistema eragilearen jakinarazpen baten bidez erakutsi daiteke, `java.awt` paketeko `SystemTray` eta `TrayIcon` klaseak erabiliz.

---

## 2. Helburuak eta Erabilitako Klaseak

1. **`java.util.TimerTask`**:

   - Atzeko planoan aldizka exekutatu beharreko lana edo logika definitzen du.
   - `Runnable` interfazea inplementatzen du eta `run()` metodoan kokatzen da 30 minuturo burutuko den ekintza (kontsolan mezua inprimatu eta/edo sistema eragilearen jakinarazpena bidali).
2. **`java.util.Timer`**:

   - Ataza kudeatu eta programatzen duen haria (thread) da.
   - `scheduleAtFixedRate(TimerTask task, long delay, long period)` metodoaren bidez, ataza maiztasun finko batekin exekutatzen da.
3. **`java.awt.SystemTray` eta `java.awt.TrayIcon`**:

   - Sistema eragilearen ataza-barran (Windows-eko jakinarazpen-eremuan) ikono bat jarri eta jakinarazpen-burbuilak (_balloon notifications_) bistaratzeko aukera ematen du.
   - `SystemTray.isSupported()` erabiliz egiaztatzen da sistemak onartzen duen, ingurune bateraezinetan errorerik ez emateko.

---

## 3. Aplikazioaren Funtzionamendua

- **Hasieratzea:** Aplikazioa abiaraztean, ongietorri-mezua eta konfigurazio-datuak (maiztasuna, ordua) kontsolan inprimatzen dira.
- **Denboralizazioa:** `Timer` batek ataza abiarazten du.
  - _Modu errealean:_ 30 minuturo (30 _ 60 _ 1000 ms).
  - _Proba moduan (test):_ Segundo gutxitan (adib. 10 segundoro) funtzionamendua azkar egiaztatu ahal izateko.
- **Abisua:** Une bakoitzean kontsolan ordua eta abisua inprimatzen dira, eta sistema eragilearen jakinarazpen bat ateratzen da:
  - **Izenburua:** _Aviso de actividad_ (Jarduera-abisua)
  - **Mezua:** _Es momento de andar durante 5 minutos_ (5 minutuz ibiltzeko unea da)
- **Baliabideen itxiera:** Aplikazioa amaitzeko `Enter` sakatuz gero, `timer.cancel()` eta `tray.remove(trayIcon)` exekutatzen dira baliabideak garbi askatzeko.
