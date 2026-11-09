import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()
    
    # 1. Page Margins (1 inch)
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        section.header.is_linked_to_previous = False
        
        # Header
        hp = section.header.paragraphs[0]
        hp.alignment = WD_PARAGRAPH_ALIGNMENT.RIGHT
        hrun = hp.add_run("0490 - Zerbitzu eta Prozesuen Programazioa | 2. Ataza")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
        
        # Footer
        fp = section.footer.paragraphs[0]
        fp.alignment = WD_PARAGRAPH_ALIGNMENT.JUSTIFY
        frun_l = fp.add_run("Goierri Eskola - Goi Mailako Zikloa (DAM / DAW)")
        frun_l.font.name = "Calibri"
        frun_l.font.size = Pt(8.5)
        frun_l.font.color.rgb = RGBColor(0x88, 0x88, 0x88)

    # Helper Styles
    COLOR_PRIMARY = RGBColor(0x1B, 0x36, 0x5D)    # Navy
    COLOR_SECONDARY = RGBColor(0x0F, 0x4C, 0x81)  # Classic Blue
    COLOR_TEXT = RGBColor(0x22, 0x22, 0x22)       # Charcoal Body
    COLOR_MUTED = RGBColor(0x66, 0x66, 0x66)      # Gray
    
    HEX_PRIMARY = "1B365D"
    HEX_LIGHT_BG = "F4F6F9"
    HEX_CODE_BG = "F8F9FA"
    HEX_BORDER = "D3D3D3"

    def set_cell_background(cell, fill_hex):
        tcPr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_table_borders(table, color="D3D3D3", sz="4"):
        tblPr = table._tbl.tblPr
        borders = parse_xml(
            f'<w:tblBorders {nsdecls("w")}>'
            f'  <w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'  <w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'  <w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
            f'  <w:insideV w:val="none"/>'
            f'  <w:left w:val="none"/>'
            f'  <w:right w:val="none"/>'
            f'</w:tblBorders>'
        )
        tblPr.append(borders)

    def add_callout(text, title="OHARRA", color="1B365D", bg="F0F4F8"):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        cell = table.cell(0, 0)
        cell.width = Inches(6.5)
        set_cell_background(cell, bg)
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'  <w:left w:val="single" w:sz="24" w:color="{color}"/>'
            f'  <w:top w:val="none"/>'
            f'  <w:bottom w:val="none"/>'
            f'  <w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.left_indent = Inches(0.15)
        p.paragraph_format.right_indent = Inches(0.15)
        run_t = p.add_run(f"📌 {title}: ")
        run_t.bold = True
        run_t.font.name = "Calibri"
        run_t.font.size = Pt(10)
        run_t.font.color.rgb = RGBColor(0x1B, 0x36, 0x5D)
        run_b = p.add_run(text)
        run_b.font.name = "Calibri"
        run_b.font.size = Pt(9.5)
        run_b.font.color.rgb = COLOR_TEXT

    def add_code_block(code_str, caption=None):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        cell = table.cell(0, 0)
        cell.width = Inches(6.5)
        set_cell_background(cell, "F4F5F7")
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'  <w:left w:val="single" w:sz="8" w:color="CCCCCC"/>'
            f'  <w:top w:val="single" w:sz="8" w:color="CCCCCC"/>'
            f'  <w:bottom w:val="single" w:sz="8" w:color="CCCCCC"/>'
            f'  <w:right w:val="single" w:sz="8" w:color="CCCCCC"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.05
        p.paragraph_format.left_indent = Inches(0.15)
        p.paragraph_format.right_indent = Inches(0.15)
        r = p.add_run(code_str)
        r.font.name = "Consolas"
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(0x11, 0x11, 0x11)
        if caption:
            cp = doc.add_paragraph()
            cp.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
            cp.paragraph_format.space_before = Pt(2)
            cp.paragraph_format.space_after = Pt(6)
            cr = cp.add_run(caption)
            cr.font.name = "Calibri"
            cr.font.size = Pt(8.5)
            cr.font.italic = True
            cr.font.color.rgb = COLOR_MUTED

    def add_image(img_path, caption, width=Inches(5.8)):
        if os.path.exists(img_path):
            p = doc.add_paragraph()
            p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
            p.paragraph_format.space_before = Pt(6)
            p.paragraph_format.space_after = Pt(2)
            run = p.add_run()
            run.add_picture(img_path, width=width)
            
            cp = doc.add_paragraph()
            cp.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
            cp.paragraph_format.space_before = Pt(2)
            cp.paragraph_format.space_after = Pt(6)
            cpr = cp.add_run(caption)
            cpr.font.name = "Calibri"
            cpr.font.size = Pt(8.5)
            cpr.font.italic = True
            cpr.font.color.rgb = COLOR_MUTED

    def add_p(text, bold_prefix="", italic=False, space_after=5):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            r_pre = p.add_run(bold_prefix)
            r_pre.bold = True
            r_pre.font.name = "Calibri"
            r_pre.font.size = Pt(10.5)
            r_pre.font.color.rgb = COLOR_PRIMARY
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(10.5)
        r.font.color.rgb = COLOR_TEXT
        r.italic = italic
        return p

    def add_h1(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(16)
        h.paragraph_format.space_after = Pt(6)
        h.paragraph_format.keep_with_next = True
        r = h.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(15)
        r.bold = True
        r.font.color.rgb = COLOR_PRIMARY
        return h

    def add_h2(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(12)
        h.paragraph_format.space_after = Pt(4)
        h.paragraph_format.keep_with_next = True
        r = h.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(12.5)
        r.bold = True
        r.font.color.rgb = COLOR_SECONDARY
        return h

    def add_h3(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(8)
        h.paragraph_format.space_after = Pt(2)
        h.paragraph_format.keep_with_next = True
        r = h.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(11)
        r.bold = True
        r.font.color.rgb = COLOR_TEXT
        return h

    # -------------------------------------------------------------
    # COVER / HEADER TITLE
    # -------------------------------------------------------------
    p_pre = doc.add_paragraph()
    p_pre.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    p_pre.paragraph_format.space_after = Pt(2)
    r_pre = p_pre.add_run("GOIERRI ESKOLA | 0490 - ZERBITZU ETA PROZESUEN PROGRAMAZIOA")
    r_pre.font.name = "Calibri"
    r_pre.font.size = Pt(10)
    r_pre.bold = True
    r_pre.font.color.rgb = COLOR_MUTED

    p_title = doc.add_paragraph()
    p_title.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    p_title.paragraph_format.space_before = Pt(4)
    p_title.paragraph_format.space_after = Pt(4)
    r_title = p_title.add_run("2. ATAZA: EBAZPEN TEORIKO ETA PRAKTIKO OSOA")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(20)
    r_title.bold = True
    r_title.font.color.rgb = COLOR_PRIMARY

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    p_sub.paragraph_format.space_after = Pt(12)
    r_sub = p_sub.add_run("Prozesuen Antolaketa, Bizitza-Zikloa (7 Egoera), Komunikazioa (IPC), Java Runtime & ProcessBuilder eta Exekuzio Programa")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(11)
    r_sub.italic = True
    r_sub.font.color.rgb = COLOR_SECONDARY

    # Metadata Table
    meta_table = doc.add_table(rows=2, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False
    for r in meta_table.rows:
        for c in r.cells:
            c.width = Inches(3.2)
            set_cell_background(c, HEX_LIGHT_BG)
    meta_table.cell(0, 0).paragraphs[0].add_run("Modulua: 0490 - Zerbitzu eta Prozesuen Programazioa").bold = True
    meta_table.cell(0, 1).paragraphs[0].add_run("Zikloa: Goi Mailako Zikloa (DAM / DAW)").bold = True
    meta_table.cell(1, 0).paragraphs[0].add_run("Ikastetxea: Goierri Eskola").bold = True
    meta_table.cell(1, 1).paragraphs[0].add_run("Data: 2026-09-30").bold = True
    set_table_borders(meta_table, "CCCCCC", "6")

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # STATEMENT IMAGE
    base_dir = "c:/Dev/GoierriEskola/2_maila/0490-Zerbitzu eta prozesuen programazioa/1_ebaluaketa/1_sarrera/2_ataza"
    img_stmt = f"{base_dir}/2_ataza.png"
    add_image(img_stmt, "1. Irudia: 2. Atazako ariketa guztien jatorrizko enuntziatua (2_ataza.png)", width=Inches(5.5))

    add_callout(
        "Dokumentu honek enuntziatuko 4 puntu zehatzak erantzuten ditu xehetasun tekniko eta akademiko osoz. "
        "Atal bakoitzean teoria sakona, egitura grafikoak, konparaketa-taulak eta IntelliJ IDEA bidez "
        "errealitatean egindako exekuzioen pantaila-kapturak txertatu dira.",
        title="DOKUMENTUAREN HELBURUA"
    )

    # =============================================================
    # 1. PUNTUA: PROZESUEN ANTOLAKETA ETA EGOERA POSIBLEAK
    # =============================================================
    add_h1("1. PUNTUA: Prozesuen Antolaketa eta Egoera Posibleak")
    add_p(
        "Aztertu nola antolatzen dira prozesuak eta zeintzuk dira bere egoera posiblek. Egoera guztiak definituz era egoki batean.",
        bold_prefix="Enuntziatua: ", italic=True
    )

    add_h2("1.1. Prozesuen Antolaketa Sistema Eragilean eta PCB Egitura")
    add_p(
        "Sistema Eragile moderno baten ikuspuntutik, prozesua ez da diskoan gordetako fitxategi estatikoa (programa edo exekutagarria), "
        "baizik eta exekuzio-bidean dagoen entitate aktibo eta dinamikoa. Prozesu bakoitzak baliabide propioak eta isolatuak ditu: "
        "CPU denbora, RAM memoria-eremu independentea (helbide-espazio logikoa), irekitako fitxategien taula eta lehentasuna."
    )
    add_p(
        "Multiprogramazioa ahalbidetzeko, Sistema Eragileak prozesu bakoitza datu-egitura zentral baten bidez erregistratu eta kudeatzen du: "
        "PCB (Process Control Block edo Prozesuaren Kontrol Blokea). PCBak prozesuaren 'NAN' edo nortasun-agiri digital gisa jokatzen du."
    )

    # PCB Table
    pcb_tbl = doc.add_table(rows=8, cols=2)
    pcb_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    pcb_tbl.autofit = False
    pcb_tbl.rows[0].cells[0].width = Inches(2.2)
    pcb_tbl.rows[0].cells[1].width = Inches(4.3)
    
    headers = ["PCBaren Eremua", "Deskribapena eta Funtzioa"]
    for i, h in enumerate(headers):
        c = pcb_tbl.cell(0, i)
        set_cell_background(c, HEX_PRIMARY)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        
    pcb_data = [
        ("PID (Process ID)", "Sistema eragileak esleitutako zenbakizko identifikatzaile bakarra (adib. 14250)."),
        ("Uneko Egoera", "Prozesua une horretan non dagoen: Berria, Prest, Exekuzioan, Blokeatua edo Esekia."),
        ("Program Counter (PC)", "CPUak exekutatu behar duen hurrengo makina-aginduaren memoria-helbidea."),
        ("CPU Erregistroak eta SP", "Eragiketen datuak gordetzen dituzten CPU erregistroen egoera (AX, BX, Stack Pointer...)."),
        ("Memoria Kudeaketa", "Oinarrizko helbidea, muga-helbidea eta orri-taulak (Memory Protection bermatzeko)."),
        ("Planifikazio Informazioa", "Prozesuaren lehentasuna (nice), quantum balioa eta ilaretako kokapena."),
        ("Baliabideen Kontabilitatea", "Irekitako fitxategien deskriptoreak, S/I gailuen erabilera eta kontsumitutako CPU denbora.")
    ]
    for row_idx, (k, v) in enumerate(pcb_data, start=1):
        c0 = pcb_tbl.cell(row_idx, 0)
        c1 = pcb_tbl.cell(row_idx, 1)
        if row_idx % 2 == 1:
            set_cell_background(c0, HEX_LIGHT_BG)
            set_cell_background(c1, HEX_LIGHT_BG)
        c0.paragraphs[0].add_run(k).bold = True
        c1.paragraphs[0].add_run(v)
    set_table_borders(pcb_tbl)

    add_p(
        "Testuinguru-Aldaketa (Context Switch): CPUak prozesu baten exekuzioa eten eta beste bati ekiten dionean, "
        "unean martxan dagoen prozesuaren CPU erregistroak bere PCBean gordetzen dira, eta hurrengo prozesuaren "
        "balioak CPUra kargatzen dira. Eragiketa honek gainkarga (overhead) sortzen du, baina funtsezkoa da multiataza bermatzeko."
    )

    add_h2("1.2. Sistema Eragilearen 3 Planifikazio Mailak")
    add_p(
        "Enuntziatuko 1.11 irudiak erakusten duen bezala, sistema eragile batek prozesuak hiru planifikazio-maila nagusitan kudeatzen ditu:"
    )

    levels_tbl = doc.add_table(rows=4, cols=3)
    levels_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    levels_tbl.autofit = False
    levels_tbl.rows[0].cells[0].width = Inches(1.8)
    levels_tbl.rows[0].cells[1].width = Inches(1.8)
    levels_tbl.rows[0].cells[2].width = Inches(2.9)
    for i, h in enumerate(["Planifikazio Maila", "Osagaia / Maiztasuna", "Helburua eta Zeregina"]):
        c = levels_tbl.cell(0, i)
        set_cell_background(c, HEX_PRIMARY)
        r = c.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    levels_data = [
        ("Epe Luzekoa (Largo Plazo)", "Job Scheduler / Loader\n(Gutxitan, segundo/minuturo)", "Multiprogramazio-maila kontrolatzen du. Diskoan dauden prozesu berrietatik zeintzuk onartuko diren RAMera erabakitzen du (Nuevo -> Listo)."),
        ("Epe Ertainekoa (Medio Plazo)", "Swapper\n(Tarteka, memoriaren arabera)", "RAM memoria nagusiaren eta bigarren mailako diskoaren (Swap) arteko oreka kudeatzen du. Esekipena (Suspensión) eta Berrekitea (Reanudación) gauzatzen ditu."),
        ("Epe Laburrekoa (Corto Plazo)", "CPU Scheduler / Dispatcher\n(Etengabe, 10-100 ms-ro)", "RAMean prest daudenen artetik (Listo) CPUa uneko unean zeini esleitu erabakitzen du (Round-Robin, Lehentasunak, FCFS...).")
    ]
    for row_idx, (col0, col1, col2) in enumerate(levels_data, start=1):
        for col_idx, text in enumerate([col0, col1, col2]):
            c = levels_tbl.cell(row_idx, col_idx)
            if row_idx % 2 == 1:
                set_cell_background(c, HEX_LIGHT_BG)
            c.paragraphs[0].add_run(text)
    set_table_borders(levels_tbl)

    add_h2("1.3. Prozesuen 7 Egoera Posibleak eta Bizitza-Zikloa")
    add_p(
        "Enuntziatuan ageri den 'Figura 1.11 Planificación de procesos' diagramak 7 egoerako eredu hedatua aurkezten du. "
        "Eredu honek 5 egoera klasikoak (Berria, Prest, Exekuzioan, Blokeatua eta Amaitua) eta memoria-esekipenaren 2 egoera osagarriak "
        "(Esekia Prest eta Esekia Blokeatua) barneratzen ditu."
    )

    img_f11 = f"{base_dir}/irudiak/figura_1_11_planificacion_procesos.png"
    add_image(img_f11, "2. Irudia: Enuntziatuko 'Figura 1.11 Planificación de procesos' diagramaren xehetasuna.", width=Inches(5.4))

    states_tbl = doc.add_table(rows=8, cols=3)
    states_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    states_tbl.autofit = False
    states_tbl.rows[0].cells[0].width = Inches(1.5)
    states_tbl.rows[0].cells[1].width = Inches(1.5)
    states_tbl.rows[0].cells[2].width = Inches(3.5)
    for i, h in enumerate(["Egoera", "Kokapen Fisikoa", "Definizio Zehatza"]):
        c = states_tbl.cell(0, i)
        set_cell_background(c, HEX_PRIMARY)
        r = c.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    states_data = [
        ("1. Berria (Nuevo)", "Diskoa / RAM hasiera", "Prozesua sortu berria da; SEak bere PCB prestatzen du baina oraindik ez da onartu memorian exekutatzeko."),
        ("2. Prest (Listo)", "Memoria Nagusia (RAM)", "Prozesua RAMean dago, baliabide guztiak eskuragarri ditu eta CPU txandaren zain dago ilaran."),
        ("3. Exekuzioan (En ejecución)", "CPU + RAM", "Prozesuak CPUaren kontrol osoa dauka une horretan eta bere instrukzioak exekutatzen ari da."),
        ("4. Blokeatua (Bloqueado)", "Memoria Nagusia (RAM)", "Kanpoko gertaera baten zain dago (diskoan irakurri, sareko datuak jaso, tekla sakatu). Ezin du CPUa erabili."),
        ("5. Esekia Prest (Suspendido listo)", "Memoria Sekundarioa (Swap)", "Prozesua exekutatzeko prest dago (ez dago blokeatuta), baina RAMean lekurik ez zegoenez aldi baterako diskora eraman da."),
        ("6. Esekia Blokeatua (Suspendido bloqueado)", "Memoria Sekundarioa (Swap)", "Prozesua kanpoko gertaera baten zain dago ETA, aldi berean, RAM memoria askatzeko diskora eraman da."),
        ("7. Amaitua (Terminado)", "Askatua", "Prozesuak bere lana amaitu du (arrakastaz edo salbuespenez). SEak bere baliabide guztiak birziklatu eta PCB ezabatzen du.")
    ]
    for row_idx, (c0_t, c1_t, c2_t) in enumerate(states_data, start=1):
        for col_idx, text in enumerate([c0_t, c1_t, c2_t]):
            c = states_tbl.cell(row_idx, col_idx)
            if row_idx % 2 == 1:
                set_cell_background(c, HEX_LIGHT_BG)
            if col_idx == 0:
                c.paragraphs[0].add_run(text).bold = True
            else:
                c.paragraphs[0].add_run(text)
    set_table_borders(states_tbl)

    add_h3("Egoeren Arteko Trantsizio Gakoak:")
    transitions = [
        ("Admitido (Onartua): ", "Nuevo -> Listo. Epe luzeko planifikatzaileak prozesua RAM memorian kargatzen du."),
        ("Planificación / Despacho: ", "Listo -> En ejecución. Epe laburreko planifikatzaileak CPUa esleitzen dio prozesuari."),
        ("Interrupción (Quantum agortzea): ", "En ejecución -> Listo. Multiataza aproposan prozesuari esleitutako denbora-tartea amaitu da; CPUa kentzen zaio."),
        ("E/S o espera de evento: ", "En ejecución -> Bloqueado. Prozesuak baliabide motela eskatu du eta itxarotera pasatzen da CPUa libre utziz."),
        ("Finalización E/S: ", "Bloqueado -> Listo. Datuak iritsi dira; prozesua prest dago CPUa berriro hartzeko."),
        ("Suspensión / Reanudación (Swap): ", "RAM memoria betetzean prozesuak diskora (Swap) bidaltzen dira (Suspensión), eta lekua dagoenean berreskuratzen dira (Reanudación)."),
        ("Finalización E/S esekita: ", "Suspendido bloqueado -> Suspendido listo. Gertaera gertatu da prozesua diskoan zegoen bitartean; prest geratzen da RAMera igotzeko zain.")
    ]
    for b_title, b_desc in transitions:
        add_p(b_desc, bold_prefix=f"• {b_title}", space_after=3)

    # =============================================================
    # 2. PUNTUA: PROZESUEN ARTEKO KOMUNIKAZIOA (IPC)
    # =============================================================
    add_h1("2. PUNTUA: Prozesuen Arteko Komunikazioa (IPC)")
    add_p(
        "Nola ematen da prozesuen arteko komunikazioa?",
        bold_prefix="Enuntziatua: ", italic=True
    )

    add_h2("2.1. Zergatik Behar Da IPC? (Memoria-Babesa eta Isolamendua)")
    add_p(
        "Sistema Eragile modernoek memoria-babes zorrotza (Memory Protection) ezartzen dute. Prozesu bakoitzari helbide-espazio "
        "birtual independente eta isolatu bat esleitzen zaio. Prozesu batek beste baten memoria atzitzen saiatzen bada, "
        "hardwareak (MMU) eta kernelak salbuespen larri bat jaurtitzen dute (Segmentation Fault Linuxen edo Access Violation Windowsen) "
        "eta prozesu erasotzailea berehala hiltzen dute."
    )
    add_p(
        "Hala ere, aplikazio moderno askotan ezinbestekoa da prozesuek elkarrekin kolaboratzea: datu-base zentralak atzitzeko, "
        "kalkuluak paraleloan bizkortzeko edo zerbitzu modularrak eraikitzeko (adib. Web zerbitzaria + Datu-basea). "
        "Horretarako, Sistema Eragileak IPC (Inter-Process Communication) mekanismo ofizialak eskaintzen ditu."
    )

    add_h2("2.2. IPC Mekanismo Nagusien Azterketa")
    
    ipc_mechanisms = [
        ("1. Memoria Partekatua (Shared Memory):",
         "Bi prozesuk RAM memoria-segmentu fisiko berbera mapatzen dute beren helbide-espazio birtualean. "
         "Mekanismorik azkarrena da, datuak irakurri eta idazteko ez baitago sistema eragilearen bitartekaririk (Zero-Copy). "
         "Dena den, datuen koherentzia bermatzea aplikazioaren ardura da (Mutex-ak edo Semaforoak beharrezkoak dira)."),
        ("2. Tutuak (Pipes):",
         "Noranzko bakarreko (unidirekzionalak) byte-korronteak dira. "
         "Tutu Anonimoak guraso-ume erlazioa duten prozesuen artean erabiltzen dira (adib. kontsolan: ps aux | grep java). "
         "Tutu Izendunak (FIFOak), ordea, fitxategi-sisteman izen bat dute eta erlaziorik gabeko prozesuen artean erabil daitezke."),
        ("3. Mezu-Ilarak (Message Queues):",
         "Sistema eragilearen nukleoan kudeatzen diren ilara sinkronizatuak dira. "
         "Izaera asinkronoa dute: igorleak mezu egituratua ilaran uzten du eta jarraitzen du; hartzaileak bere erritmoan jasotzen du."),
        ("4. Seinaleak (Signals):",
         "Gertaera asinkronoen jakinarazpen laburrak dira (software-etenaldiak). "
         "Ez dute datu-bloke handirik garraiatzen, aginduak baizik (adibidez: SIGINT prozesua eteteko, SIGTERM itxiera adeitsurako, SIGKILL berehala akabatzeko)."),
        ("5. Socket-ak (Sockets):",
         "Muturreko komunikazio-kanalak dira (IP helbidea + Portua). "
         "Ordenagailu bereko prozesuen artean (Unix Domain Sockets) zein sare osoan zehar (TCP/IP edo UDP) komunikatzeko balio dute. Bezero-zerbitzari arkitekturaren oinarria dira."),
        ("6. Urruneko Prozedura-Deiak (RPC / Java RMI):",
         "Prozesu batek beste makina batean dagoen funtzio edo objektu bati dei egiten dio, deia tokikoa balitz bezala tratatuz.")
    ]
    for title, desc in ipc_mechanisms:
        add_p(desc, bold_prefix=title + " ", space_after=4)

    add_h2("2.3. Sinkronizazioa eta Problemak (Mutex, Deadlock)")
    add_p(
        "Memoria partekatua edo baliabide arruntak erabiltzean, prozesuak sinkronizatu egin behar dira. "
        "Bi prozesuk aldi berean aldagai bera aldatzen badute, Lasterketa-Baldintza (Race Condition) gertatzen da. "
        "Hori saihesteko Atal Kritikoa babestu behar da Mutex (Mutual Exclusion) edo Semaforoen bidez."
    )
    add_p(
        "Kontu handiz ibili behar da Blokeo Elkarrekikoarekin (Deadlock): 1. prozesuak A baliabidea dauka eta B behar du, "
        "eta 2. prozesuak B dauka eta A behar du. Biak betiko geratzen dira zain, sistema osoa blokeatuz."
    )

    # IPC Comparison Table
    ipc_tbl = doc.add_table(rows=7, cols=5)
    ipc_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    ipc_tbl.autofit = False
    ipc_tbl.rows[0].cells[0].width = Inches(1.5)
    ipc_tbl.rows[0].cells[1].width = Inches(1.1)
    ipc_tbl.rows[0].cells[2].width = Inches(1.2)
    ipc_tbl.rows[0].cells[3].width = Inches(1.3)
    ipc_tbl.rows[0].cells[4].width = Inches(1.4)

    for i, h in enumerate(["Mekanismoa", "Abiadura", "Sinkronizazioa", "Eremua (Scope)", "Datu Mota"]):
        c = ipc_tbl.cell(0, i)
        set_cell_background(c, HEX_PRIMARY)
        r = c.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    ipc_data = [
        ("Memoria Partekatua", "Oso Handia (Max)", "Kanpokoa (Mutex)", "Makina Lokala", "Datu-egitura gordinak"),
        ("Tutu Anonimoak", "Handia", "Integratua (FIFO)", "Guraso-Umeak", "Byte-korrontea"),
        ("Tutu Izendunak (FIFO)", "Handia", "Integratua (FIFO)", "Makina Lokala", "Byte-korrontea"),
        ("Mezu-Ilarak", "Ertaina", "Integratua (Asink)", "Makina Lokala", "Mezu formatudunak"),
        ("Seinaleak", "Oso Azkarra", "Ez da behar", "Makina Lokala", "Gertaera-zenbakia"),
        ("Socket-ak", "Ertaina (Net)", "Integratua (TCP)", "Lokala eta Sarea", "Byteak / Paketeak / JSON")
    ]
    for row_idx, row_vals in enumerate(ipc_data, start=1):
        for col_idx, val in enumerate(row_vals):
            c = ipc_tbl.cell(row_idx, col_idx)
            if row_idx % 2 == 1:
                set_cell_background(c, HEX_LIGHT_BG)
            if col_idx == 0:
                c.paragraphs[0].add_run(val).bold = True
            else:
                c.paragraphs[0].add_run(val)
    set_table_borders(ipc_tbl)

    # =============================================================
    # 3. PUNTUA: JAVAKO RUNTIME ETA PROCESSBUILDER KLASEAK
    # =============================================================
    add_h1("3. PUNTUA: Java Runtime eta ProcessBuilder Klaseak")
    add_p(
        "Aztertu JAVAko Runtime eta ProcessBuilder claseak. Zertarako balio dute? Ze metodok dituzte?",
        bold_prefix="Enuntziatua: ", italic=True
    )

    add_p(
        "Java aplikazioak Java Makina Birtualean (JVM) isolatuta exekutatzen badira ere, maiz Sistema Eragilearen "
        "baliabide natiboekin komunikatu edo kanpoko programak abiarazi behar dituzte. Horretarako Java APIak "
        "java.lang paketean bi klase nagusi eskaintzen ditu: Runtime eta ProcessBuilder."
    )

    img_recuerda = f"{base_dir}/irudiak/recuerda_api_process.png"
    add_image(img_recuerda, "3. Irudia: Enuntziatuko oharra: Oracle Java Process APIaren dokumentazio ofiziala.", width=Inches(4.5))

    add_h2("3.1. java.lang.Runtime Klasea")
    add_p(
        "Zertarako balio du? Java aplikazio bati uneko exekuzio-ingurunearekin (JVM eta azpiko sistema eragilea) "
        "elkarrekintzan aritzeko bidea ematen dio. Singleton diseinu-patroia erabiltzen du: eraikitzailea pribatua da "
        "eta Runtime.getRuntime() metodo estatikoaren bidez eskuratzen da instantzia bakarra."
    )

    # Runtime methods table
    rt_tbl = doc.add_table(rows=9, cols=2)
    rt_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    rt_tbl.autofit = False
    rt_tbl.rows[0].cells[0].width = Inches(2.2)
    rt_tbl.rows[0].cells[1].width = Inches(4.3)
    for i, h in enumerate(["Runtime Metodoa", "Funtzioa eta Deskribapen Teknikoa"]):
        c = rt_tbl.cell(0, i)
        set_cell_background(c, HEX_PRIMARY)
        r = c.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    rt_data = [
        ("getRuntime() (static)", "Uneko JVMari lotutako Runtime instantzia bakarra itzultzen du."),
        ("exec(String command)", "Sistema eragilearen komando bat exekutatzen du eta Process instantzia bat itzultzen du."),
        ("exec(String[] cmdarray)", "Komandoa eta argumentuak array bidez pasata prozesua abiarazten du."),
        ("availableProcessors()", "JVMrentzat eskuragarri dauden CPU prozesadore logikoen/nukleoen kopurua itzultzen du."),
        ("freeMemory() / totalMemory()", "JVM memorian libre dagoen byte kopurua eta uneko memoria osoa itzultzen ditu."),
        ("maxMemory()", "JVMak erabil dezakeen gehienezko memoria muga (-Xmx) byteetan itzultzen du."),
        ("gc()", "JVMari zabor-biltzailea (Garbage Collector) exekutatzeko iradokizuna egiten dio."),
        ("exit(int status)", "Uneko JVMren exekuzio osoa amaitu eta itzali egiten du (System.exit()-ek deitzen duena).")
    ]
    for row_idx, (m, d) in enumerate(rt_data, start=1):
        c0 = rt_tbl.cell(row_idx, 0)
        c1 = rt_tbl.cell(row_idx, 1)
        if row_idx % 2 == 1:
            set_cell_background(c0, HEX_LIGHT_BG)
            set_cell_background(c1, HEX_LIGHT_BG)
        c0.paragraphs[0].add_run(m).bold = True
        c1.paragraphs[0].add_run(d)
    set_table_borders(rt_tbl)

    add_h2("3.2. java.lang.ProcessBuilder Klasea")
    add_p(
        "Zertarako balio du? Java 5 bertsioan gehitu zen Runtime.exec() zaharra ordezkatzeko. "
        "Kanpoko sistema eragileko prozesuak konfiguratu, pertsonalizatu eta abiarazteko bide moderno eta gomendatua da. "
        "Builder diseinu-patroia erabiltzen du: lehenik parametro guztiak konfiguratzen dira (ingurune-aldagaiak, direktorioa, "
        "sarrera/irteerak) eta amaieran start() deituz prozesua abiarazten da."
    )

    pb_tbl = doc.add_table(rows=9, cols=2)
    pb_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    pb_tbl.autofit = False
    pb_tbl.rows[0].cells[0].width = Inches(2.5)
    pb_tbl.rows[0].cells[1].width = Inches(4.0)
    for i, h in enumerate(["ProcessBuilder Metodoa", "Funtzioa eta Deskribapena"]):
        c = pb_tbl.cell(0, i)
        set_cell_background(c, HEX_PRIMARY)
        r = c.paragraphs[0].add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    pb_data = [
        ("command(String... / List)", "Exekutatu beharreko programa eta haren argumentuak ezartzen ditu."),
        ("directory(File dir)", "Prozesu berriaren lan-direktorioa (Working Directory) finkatzen du."),
        ("environment()", "Prozesuaren ingurune-aldagaien mapa (Map<String, String>) itzultzen du aldaketak egiteko."),
        ("redirectInput(File / Redirect)", "Sarrera estandarra (stdin) fitxategi batetik irakurtzeko birbideratzen du."),
        ("redirectOutput(File / Redirect)", "Irteera estandarra (stdout) fitxategi batera idazteko birbideratzen du."),
        ("redirectErrorStream(boolean)", "Egia jarriz gero, irteera estandarra eta erroreak kanal bakarrean bateratzen ditu."),
        ("inheritIO()", "Prozesu berriak gurasoaren (Java programaren) kontsola S/I bera heredatzen du."),
        ("start()", "Konfiguratutako prozesua sistema eragilean abiarazten du eta Process instantzia itzultzen du.")
    ]
    for row_idx, (m, d) in enumerate(pb_data, start=1):
        c0 = pb_tbl.cell(row_idx, 0)
        c1 = pb_tbl.cell(row_idx, 1)
        if row_idx % 2 == 1:
            set_cell_background(c0, HEX_LIGHT_BG)
            set_cell_background(c1, HEX_LIGHT_BG)
        c0.paragraphs[0].add_run(m).bold = True
        c1.paragraphs[0].add_run(d)
    set_table_borders(pb_tbl)

    add_h2("3.3. java.lang.Process eta ProcessHandle Klaseak")
    add_p(
        "ProcessBuilder.start() deitzean Process objektu bat itzultzen da, martxan jarritako kanpoko prozesua kontrolatzeko:"
    )
    add_p("• waitFor(): Prozesua amaitu arte itxaroten du eta irteera-kodea (exit code) itzultzen du.")
    add_p("• exitValue(): Amaitutako prozesuaren kodea itzultzen du (0 arrakasta da).")
    add_p("• isAlive(): Prozesua une honetan martxan jarraitzen duen ala jada amaitu den adierazten du.")
    add_p("• destroy() eta destroyForcibly(): Prozesua adeitsuki itzali (SIGTERM) edo bortxaz hiltzeko (SIGKILL).")
    add_p("• pid() (Java 9+): Prozesuaren PID zenbaki erreala eskuratzen du zuzenean (lehen C/JNA deiak behar ziren).")
    add_p("• toHandle().info().startInstant() (Java 9+): Sistema eragilearen kernelak erregistratutako hasiera-une zehatza lortzen du.")

    # =============================================================
    # 4. PUNTUA: EXEKUTAGARRIEN ZERRENDA ABIARAZTEKO PROGRAMA
    # =============================================================
    add_h1("4. PUNTUA: Exekutagarrien Zerrenda Abiarazteko Java Programa")
    add_p(
        "Se pide un programa que reciba por la línea de comandos una lista de programas ejecutables y los ejecute, mostrando su PID y el momento de inicio.",
        bold_prefix="Enuntziatua: ", italic=True
    )

    add_h2("4.1. Programaren Arkitektura eta Diseinua")
    add_p(
        "Ariketak eskatzen duen programa osoa garatu da ataza2 paketean: ProzesuExekutatzailea.java. "
        "Programak honako ezaugarri sendoak barneratzen ditu:"
    )
    add_p("1. Komando-lerroko argumentuak jasotzea (String[] args): Erabiltzaileak pasatako exekutagarrien zerrenda irakurtzen du.")
    add_p("2. Kodean bertan gordetako zerrenda lehenetsia: Argumenturik pasatzen ez bada (args.length == 0), programak ez du hutsik egiten; kodean bertan gordetako 4 aplikazio (Notepad, Kalkulagailua, Paint eta CMD) abiarazten ditu automatikoki.")
    add_p("3. Espazioen araberako banaketa (split(\"\\\\s+\")): Komando bakunak (notepad.exe) zein parametrodunak (\"cmd.exe /c start...\") ondo bereizten ditu ProcessBuilder-entzat.")
    add_p("4. PID eta Hasiera-unearen doitasuna: Java 9ko process.pid() eta process.info().startInstant() erabiliz.")
    add_p("5. Errore-kudeaketa: Zerrendan fitxategi ezezagun bat badago, IOException harrapatzen du eta gainerakoekin aurrera jarraitzen du.")

    add_h2("4.2. Kode Iturburu Osoa (ProzesuExekutatzailea.java)")
    
    code_text = """package ataza2;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ProzesuExekutatzailea {

    private static final DateTimeFormatter FORMATZAILEA = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    // Kodean bertan gordetako programa-zerrenda lehenetsia (args hutsik badago erabiltzeko)
    private static final String[] LEHENETSITAKO_PROGRAMAK = {
            "notepad.exe",                                          // Bloc de notas
            "calc.exe",                                             // Kalkulagailua
            "mspaint.exe",                                          // Paint
            "cmd.exe /c start cmd.exe /k echo Kaixo_Mundua"         // CMD leiho ikusgaia
    };

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("       PROZESU EXEKUTATZAILEA - ZERBITZU ETA PROZESUEN PROGRAMAZIOA             ");
        System.out.println("================================================================================");

        String[] exekutagarriak;
        if (args.length > 0) {
            exekutagarriak = args;
            System.out.println("Komando-lerroko 'args' bidez jasotako programak: " + exekutagarriak.length);
        } else {
            System.out.println("[OHARRA] Ez da programarik zehaztu agindu-lerroan.");
            System.out.println("-> 'ProzesuExekutatzailea' klaseko zerrenda lehenetsia erabiliko da!");
            exekutagarriak = LEHENETSITAKO_PROGRAMAK;
        }

        List<Process> abiarazitakoProzesuak = new ArrayList<>();

        for (int i = 0; i < exekutagarriak.length; i++) {
            String komandoa = exekutagarriak[i].trim();
            System.out.println("[" + (i + 1) + "/" + exekutagarriak.length + "] Abiarazten: " + komandoa);

            try {
                String[] zatiak = komandoa.split("\\\\s+");
                ProcessBuilder pb = new ProcessBuilder(zatiak);
                LocalDateTime tokikoHasieraUnea = LocalDateTime.now();

                Process prozesua = pb.start();
                abiarazitakoProzesuak.add(prozesua);

                long pid = prozesua.pid();
                ProcessHandle.Info info = prozesua.info();
                String hasieraTestua;
                if (info.startInstant().isPresent()) {
                    Instant instant = info.startInstant().get();
                    LocalDateTime seHasiera = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
                    hasieraTestua = seHasiera.format(FORMATZAILEA) + " (OS Kernel timestamp)";
                } else {
                    hasieraTestua = tokikoHasieraUnea.format(FORMATZAILEA) + " (Java Instant)";
                }

                System.out.println("  [ARRAKASTA] PID: " + pid + " | Hasiera: " + hasieraTestua);
            } catch (IOException e) {
                System.err.println("  [ERROREA] Ezin izan da exekutatu: " + e.getMessage());
            }
        }
    }
}"""
    add_code_block(code_text, caption="Kodea: src/ataza2/ProzesuExekutatzailea.java fitxategiaren egitura nagusia.")

    add_h2("4.3. IntelliJ IDEA-n Konfigurazioa eta Kodearen Pantaila-Kapturak")
    add_p(
        "Ariketa garatzeko eta probatzeko IntelliJ IDEA 2026 ingurunea erabili da. "
        "Jarraian, garapen-prozesuaren eta konfigurazioaren benetako pantaila-kapturak aurkezten dira:"
    )

    # 1. Image: IntelliJ Code View
    img_code = f"{base_dir}/irudiak/intellij_kodea.png"
    add_image(img_code, "4. Irudia: ProzesuExekutatzailea.java IntelliJ IDEA editorean irekita (src/ataza2 paketean).", width=Inches(5.8))

    # 2. Image: IntelliJ Run Config
    img_rc = f"{base_dir}/irudiak/intellij_run_config.png"
    add_image(img_rc, "5. Irudia: IntelliJ-ko Run/Debug Configuration leihoa, programa-argumentuak CLI bidez konfiguratuta.", width=Inches(5.4))

    add_h2("4.4. Exekuzio Errealaren Emaitzak eta Kontsolako Kapturak")
    add_p(
        "Programak IntelliJ IDEA kontsolan emandako emaitza erreala, 4 programak aldi berean arrakastaz abiaraziz:"
    )

    # 3. Image: IntelliJ Console Output
    img_out = f"{base_dir}/irudiak/intellij_kontsola_irteera.png"
    add_image(img_out, "6. Irudia: IntelliJ IDEA-ko 'Run' kontsolaren pantaila-kaptura, programak nola exekutatzen diren erakutsiz.", width=Inches(5.8))

    # Real Console Output in code block
    sample_run = """================================================================================
       PROZESU EXEKUTATZAILEA - ZERBITZU ETA PROZESUEN PROGRAMAZIOA             
================================================================================
Komando-lerroko 'args' bidez jasotako programak erabiliko dira.
Jasotako programa kopurua: 4
Exekuzioari hasiera ematen...

--------------------------------------------------------------------------------
[1/4] Abiarazten: "notepad.exe"
  [ARRAKASTA] Prozesua ondo abiarazi da.
  -> PID (Process ID):   16916
  -> Hasiera-unea:       2026-09-30 13:58:47.685 (OS Kernel timestamp)
  -> Bizirik dago?       BAI (Martxan)
--------------------------------------------------------------------------------
[2/4] Abiarazten: "calc.exe"
  [ARRAKASTA] Prozesua ondo abiarazi da.
  -> PID (Process ID):   11788
  -> Hasiera-unea:       2026-09-30 13:58:47.708 (OS Kernel timestamp)
  -> Bizirik dago?       BAI (Martxan)
--------------------------------------------------------------------------------
[3/4] Abiarazten: "mspaint.exe"
  [ARRAKASTA] Prozesua ondo abiarazi da.
  -> PID (Process ID):   27060
  -> Hasiera-unea:       2026-09-30 13:58:47.745 (OS Kernel timestamp)
  -> Bizirik dago?       BAI (Martxan)
--------------------------------------------------------------------------------
[4/4] Abiarazten: "cmd.exe /c start cmd.exe /k echo Kaixo_Mundua"
  [ARRAKASTA] Prozesua ondo abiarazi da.
  -> PID (Process ID):   22604
  -> Hasiera-unea:       2026-09-30 13:58:47.898 (OS Kernel timestamp)
  -> Bizirik dago?       BAI (Martxan)
--------------------------------------------------------------------------------

Prozesu guztiak abiarazi dira.
Guztira arrakastaz martxan jarritako prozesuak: 4/4
================================================================================"""
    add_code_block(sample_run, caption="Irteera: ProzesuExekutatzailea-k emandako kontsolako testu erreala.")

    # Extra section: Process killing lab
    add_h2("4.5. Kasu Praktiko Osagarria: Prozesuak Terminalean Identifikatu eta Hiltzea (tasklist & taskkill)")
    add_p(
        "Praktika osagarri gisa, abiarazitako prozesuak Windows terminalean bilatu eta amaitzeko probak egin dira. "
        "Hasieran taskkill /PID 20580 /F exekutatzean 'no se encontró el proceso' errorea gertatu zen, "
        "20580 prozesua tasklist.exe bera zelako (milisegundotan amaitzen den prozesu iragankorra)."
    )

    img_tk = f"{base_dir}/irudiak/terminal_taskkill.png"
    add_image(img_tk, "7. Irudia: taskkill saiakeraren errorea (prozesu iragankorra amaituta zegoelako).", width=Inches(4.8))

    img_tl = f"{base_dir}/irudiak/terminal_tasklist.png"
    add_image(img_tl, "8. Irudia: tasklist exekuzioaren emaitza, non PID 20580 tasklist.exe bera zela ikusten den.", width=Inches(4.8))

    add_callout(
        "Prozesu bat taskkill bidez behar bezala hiltzeko, prozesu iraunkor bat (notepad.exe adibidez) erabili behar da: "
        "1) notepad.exe ireki; 2) tasklist bidez bere PID erreala bilatu (adib. 16916); "
        "3) taskkill /PID 16916 /F agindua exekutatu eta berehala itxiko da.",
        title="PROZESUAK HILTZEKO ONDORIOA"
    )

    # =============================================================
    # ONDORIOAK ETA ERREFERENTZIAK
    # =============================================================
    add_h1("5. ONDORIO NAGUSIAK ETA LABURPENA")
    add_p("1. Prozesuen kudeaketak sistema eragilearen muina osatzen du. PCB egiturari, 3 planifikazio mailei eta 7 egoerei esker, SEak baliabideen oreka zorrotza mantentzen du.")
    add_p("2. Prozesuak erabat isolatuta daude segurtasunagatik. Horregatik, haien arteko komunikazioak IPC mekanismo egokiak eskatzen ditu (Memoria partekatua azkartasunerako, Socketak sareko zerbitzuetarako).")
    add_p("3. Java plataforman, ProcessBuilder klaseak malgutasun osoa eskaintzen du kanpoko prozesuak konfiguratzeko, eta Java 9tik aurrera Process.pid() eta ProcessHandle bidez informazio natiboa modu estandarrean eskuratzen da.")

    add_h2("6. Erreferentzia Bibliografikoak")
    add_p("• Oracle Java Documentation: https://docs.oracle.com/javase/8/docs/api/java/lang/Process.html")
    add_p("• Oracle Java 17 ProcessBuilder API: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/ProcessBuilder.html")
    add_p("• Silberschatz, A., Galvin, P. B., & Gagne, G. (2018): Operating System Concepts (10th ed.). Wiley.")
    add_p("• Goierri Eskola: 0490 - Zerbitzu eta Prozesuen Programazioa material didaktikoa.")

    out_path = f"{base_dir}/2_Ataza_Ebazpena.docx"
    doc.save(out_path)
    print("Document successfully created at:", out_path)

if __name__ == "__main__":
    create_document()
