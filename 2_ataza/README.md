# 2. ATAZA: Prozesuak, Planifikazioa, IPC eta Java ProcessBuilder

Karpeta honek **Zerbitzu eta Prozesuen Programazioa (0490)** moduluko **2. Atazaren** ebazpen osoa eta kode iturburua biltzen ditu.

---

## Fitxategien Egitura

```text
2_ataza/
│
├── 2_ataza.png                  # Ariketen enuntziatu originalaren irudia
├── 2_Ataza_Ebazpena.docx        # Ebazpen txosten profesionala Word formatuan (Kapturak eta formatu aberatsa)
├── 2_Ataza_Ebazpena.md          # Ariketa guztien ebazpen txosten sakona (Euskaraz)
├── Prozesuak_Identifikatu_Eta_Hil_Gida.md # tasklist eta taskkill erabiltzeko gida praktikoa (Errorea eta konponbidea)
│
├── irudiak/                     # Txostenean erabilitako irudiak eta diagramak
│   ├── 2_ataza_zatia_1.png
│   ├── 2_ataza_zatia_2.png
│   ├── figura_1_11_planificacion_procesos.png
│   ├── recuerda_api_process.png
│   ├── intellij_kodea.png
│   ├── intellij_kontsola_irteera.png
│   ├── intellij_run_config.png
│   ├── terminal_taskkill.png
│   └── terminal_tasklist.png
│
└── src/
    └── ataza2/
        └── ProzesuExekutatzailea.java  # Pakete egituradun Java klasea (ataza2)
```

---

## Dokumentu Nagusiak

- 📄 **Word Dokumentu Profesionala:** **[`2_Ataza_Ebazpena.docx`](2_Ataza_Ebazpena.docx)** *(Formatua, taulak, estilo korporatiboa eta kode/kontsola pantaila-kaptura guztiak barneratuta).*
- 📝 **Markdown Txostena:** **[`2_Ataza_Ebazpena.md`](2_Ataza_Ebazpena.md)**
- 💡 **Prozesuak Hiltzeko Gida Osagarria:** **[`Prozesuak_Identifikatu_Eta_Hil_Gida.md`](Prozesuak_Identifikatu_Eta_Hil_Gida.md)**

Bertan garatzen dira:
1. **1. Blokeko 1. Ariketa:** Prozesuen antolaketa, PCB, 3 planifikazio mailak eta 7 egoeren definizioak (Figura 1.11).
2. **1. Blokeko 2. Ariketa:** Prozesuen arteko komunikazio mekanismoak (IPC: Memoria partekatua, Tutuak, Mezu-ilarak, Seinaleak, Socket-ak, RMI).
3. **2. Blokeko 1. Ariketa:** Java `Runtime` eta `ProcessBuilder` klaseen azterketa konparatiboa eta metodo nagusiak.
4. **2. Blokeko 2. Ariketa:** Komando-lerroko exekutagarriak abiarazten dituen programa, bere PIDa eta hasiera-unea erakutsiz.

---

## Java Programaren Erabilera Azkarra

### A) IntelliJ IDEA-n:
- Ireki `src/ataza2/ProzesuExekutatzailea.java`.
- Sakatu botoi berdea (`▶️ Run`).
- Parametroak ezartzeko: `Run` -> `Edit Configurations...` -> **Program arguments** eremuan jarri exekutagarriak.

### B) Komando-lerroan (CLI):
```bash
# Konpilatu:
javac src/ataza2/ProzesuExekutatzailea.java

# Exekutatu (Windows):
java -cp src ataza2.ProzesuExekutatzailea notepad.exe calc.exe "cmd.exe /c echo Kaixo"

# Exekutatu (Linux):
java -cp src ataza2.ProzesuExekutatzailea gedit xcalc "bash -c 'uptime'"
```
