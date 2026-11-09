# Ulermen-galderak eta Erantzunak

---

### 1. Zergatik ez da irteera ordenatuta agertzen? Beti berdina al da exekuzio bakoitzean?

**Erantzuna:**

- **Konkurrentzia eta Planifikatzailea (Scheduler):** Hariak modu konkurrentean/paraleloan exekutatzen dira. Sistema Eragilearen planifikatzaileak (_thread scheduler_) erabakitzen du une bakoitzean zein hariri esleitzen dion prozesagailuaren (CPU) denbora-tartea (_quantum_).
- **Ez-deterministikoa:** Harien txandakatzea ez-deterministikoa da; faktore askoren mende dago (CPUaren uneko lan-karga, hariei emandako denbora, beste prozesuak, etab.).
- **Ondorioa:** Zenbakiak ordenatu gabe eta elkarren artean nahastuta inprimatzen dira. Exekuzio bakoitzean sekuentzia desberdina izan daiteke, harien exekuzio-ordena ezin delako aurretik bermatu.

---

### 2. Zer gertatzen da `join()` kentzen bada?

**Erantzuna:**

- **`join()` metodoaren zeregina:** `join()` metodoak deia egiten duen haria (kasu honetan hari nagusia edo `main`) blokeatuta mantentzen du zehaztutako hariak beren exekuzioa guztiz amaitu arte.
- **Kentzen bada:** Hari nagusiak ez die beste hariei itxarongo eta berehala jarraituko du hurrengo aginduekin.
- **Ondorioa:** `"Kontaketa amaituta"` mezua programa abiarazi bezain laster edo beste hariak oraindik kontatzen ari diren bitartean agertuko da pantailan, bukaeran agertu beharrean.
