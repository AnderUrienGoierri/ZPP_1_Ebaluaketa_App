# Sinkronizazioa - Lanketa IV (Goierri Eskola)
## Programazio Konkurrentearen Arazo Nagusiak

**Egileak (1T Taldea):** Julen, Iker, Ander U  
**Modulua:** 0490 - Zerbitzu eta Prozesuen Programazioa (2. Maila, DAM/DAW)  
**Ikastetxea:** Goierri Eskola | 1. Ebaluaketa  

Aurkezpeneko eskakizunak (`4_lanketa_1T.png`) eta gelako teoria (`Sinkronizazioa01.pdf`) jarraituz, aldi bereko programazioaren **5 arazo nagusiak** aplikatu, simulatu eta dokumentatu dira:

1. **Interbloqueo o Deadlock (Blokeo elkarrekikoa)**
2. **Muerte por inanición / Starvation (Baliabide-gosetea)**
3. **Condiciones de carrera / Race conditions (Lasterketa-baldintza)**
4. **Inconsistencia de memoria / Memory inconsistency (Memoriaren sendotasun-eza / volatile)**
5. **Condiciones deslizadas / Slipped conditions (Lerratutako baldintzak / Check-then-act)**

---

### Baliabideak eta Fitxategiak

- 📄 **Txosten Osoa (Markdown):** [LANKETA_IV_AZALPENA.md](LANKETA_IV_AZALPENA.md)
- 📊 **PowerPoint Aurkezpena (.pptx):** [../LANKETA_IV_1T_TALDEA.pptx](../LANKETA_IV_1T_TALDEA.pptx)
- 📑 **Aurkezpenaren PDF Bertsioa (.pdf):** [../LANKETA_IV_1T_TALDEA.pdf](../LANKETA_IV_1T_TALDEA.pdf)
- 🖼️ **Pantaila-Argazkiak (Kodea eta Exekuzioa):** [irudiak/](irudiak/)
- ☕ **Programa Nagusia:** [src/main/java/org/example/Main.java](src/main/java/org/example/Main.java)

---

### Nola Exekutatu

- **IntelliJ IDEA-tik**: Ireki `src/main/java/org/example/Main.java` eta sakatu **Run**.
- **Komando-lerrotik**:
  ```powershell
  javac -d target/classes (Get-ChildItem -Path src/main/java -Recurse -Filter *.java | Select-Object -ExpandProperty FullName)
  java -cp target/classes org.example.Main demo
  ```
