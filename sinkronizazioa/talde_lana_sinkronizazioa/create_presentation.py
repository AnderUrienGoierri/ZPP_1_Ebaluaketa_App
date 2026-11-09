import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Paths
base_dir = r"C:\Dev\GoierriEskola\2_maila\0490-Zerbitzu eta prozesuen programazioa\1_ebaluaketa\1_sarrera\sinkronizazioa\talde_lana_sinkronizazioa"
img_dir = os.path.join(base_dir, "sinkronizazioa_4_lanketa_1T", "irudiak")
pptx_path = os.path.join(base_dir, "LANKETA_IV_1T_TALDEA.pptx")

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

# Color palette
C_NAVY_DARK = RGBColor(11, 44, 61)     # Primary dark (#0B2C3D)
C_TEAL = RGBColor(8, 131, 149)          # Secondary teal (#088395)
C_CYAN = RGBColor(5, 191, 219)          # Accent cyan (#05BFDB)
C_DARK_TEXT = RGBColor(30, 41, 59)      # Slate 800 (#1E293B)
C_MUTED_TEXT = RGBColor(100, 116, 139)  # Slate 500 (#64748B)
C_BG_CARD = RGBColor(241, 245, 249)     # Slate 100 (#F1F5F9)
C_WHITE = RGBColor(255, 255, 255)
C_GREEN = RGBColor(16, 185, 129)        # Emerald 500 (#10B981)
C_RED = RGBColor(239, 68, 68)           # Coral 500 (#EF4444)
C_BORDER = RGBColor(203, 213, 225)      # Slate 300

def add_header(slide, title_text, category_text="LANKETA IV: PROGRAMAZIO KONKURRENTEAREN ARAZOAK"):
    # Top banner bar
    top_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.15))
    top_shape.fill.solid()
    top_shape.fill.fore_color.rgb = C_NAVY_DARK
    top_shape.line.color.rgb = C_NAVY_DARK
    
    # Accent strip under banner
    strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(1.15), Inches(13.333), Inches(0.06))
    strip.fill.solid()
    strip.fill.fore_color.rgb = C_TEAL
    strip.line.color.rgb = C_TEAL
    
    # Category / breadcrumb
    tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.12), Inches(9.5), Inches(0.3))
    tf = tx_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = category_text.upper()
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_CYAN
    p.font.name = "Segoe UI"
    
    # Main title
    tx_box2 = slide.shapes.add_textbox(Inches(0.8), Inches(0.38), Inches(9.5), Inches(0.65))
    tf2 = tx_box2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = title_text
    p2.font.size = Pt(22)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p2.font.name = "Segoe UI"
    
    # Team badge in top right
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(10.2), Inches(0.22), Inches(2.3), Inches(0.7))
    badge.fill.solid()
    badge.fill.fore_color.rgb = C_TEAL
    badge.line.color.rgb = C_CYAN
    btf = badge.text_frame
    btf.word_wrap = True
    bp1 = btf.paragraphs[0]
    bp1.text = "1T TALDEA"
    bp1.alignment = PP_ALIGN.CENTER
    bp1.font.size = Pt(11)
    bp1.font.bold = True
    bp1.font.color.rgb = C_WHITE
    bp2 = btf.add_paragraph()
    bp2.text = "Julen | Iker | Ander U"
    bp2.alignment = PP_ALIGN.CENTER
    bp2.font.size = Pt(10)
    bp2.font.color.rgb = C_WHITE

def add_card(slide, left, top, width, height, title, bg_color=C_BG_CARD, border_color=C_BORDER):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1.5)
    
    if title:
        tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), Inches(0.45))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = C_NAVY_DARK
        p.font.name = "Segoe UI"
    return card

# -------------------------------------------------------------
# SLIDE 1: AZALA (TITLE SLIDE)
# -------------------------------------------------------------
s1 = prs.slides.add_slide(blank_layout)
# Background
bg = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
bg.fill.solid()
bg.fill.fore_color.rgb = C_NAVY_DARK
bg.line.color.rgb = C_NAVY_DARK

# Decorative accent shapes
dec1 = s1.shapes.add_shape(MSO_SHAPE.RIGHT_TRIANGLE, Inches(10), Inches(0), Inches(3.333), Inches(7.5))
dec1.fill.solid()
dec1.fill.fore_color.rgb = RGBColor(14, 60, 84)
dec1.line.color.rgb = RGBColor(14, 60, 84)
dec1.rotation = 180

dec2 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.3), Inches(1.5), Inches(0.08))
dec2.fill.solid()
dec2.fill.fore_color.rgb = C_CYAN
dec2.line.color.rgb = C_CYAN

# Title box
tb = s1.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(9.5), Inches(2.2))
tf = tb.text_frame
tf.word_wrap = True
p = tf.paragraphs[0]
p.text = "LANKETA – IV"
p.font.size = Pt(28)
p.font.bold = True
p.font.color.rgb = C_CYAN
p.font.name = "Segoe UI"

p2 = tf.add_paragraph()
p2.text = "Programazio Konkurrentearen Arazoak"
p2.font.size = Pt(40)
p2.font.bold = True
p2.font.color.rgb = C_WHITE
p2.font.name = "Segoe UI"

p3 = tf.add_paragraph()
p3.text = "Java bidezko analisia, simulazioak eta konponbide praktikoak"
p3.font.size = Pt(18)
p3.font.color.rgb = RGBColor(203, 213, 225)
p3.font.name = "Segoe UI"

# Team Card
t_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.3), Inches(8.5), Inches(2.2))
t_card.fill.solid()
t_card.fill.fore_color.rgb = RGBColor(18, 68, 94)
t_card.line.color.rgb = C_TEAL
t_card.line.width = Pt(2)

ttb = s1.shapes.add_textbox(Inches(1.1), Inches(4.45), Inches(8.0), Inches(1.9))
ttf = ttb.text_frame
tp1 = ttf.paragraphs[0]
tp1.text = "1T TALDEA:  Julen | Iker | Ander U"
tp1.font.size = Pt(20)
tp1.font.bold = True
tp1.font.color.rgb = C_WHITE

tp2 = ttf.add_paragraph()
tp2.text = "Modulua: 0490 - Zerbitzu eta Prozesuen Programazioa (2. Maila)"
tp2.font.size = Pt(14)
tp2.font.color.rgb = C_CYAN

tp3 = ttf.add_paragraph()
tp3.text = "Ikastetxea: Goierri Eskola | 1. Ebaluaketa"
tp3.font.size = Pt(13)
tp3.font.color.rgb = RGBColor(226, 232, 240)

# -------------------------------------------------------------
# SLIDE 2: AURKIBIDEA (5 PUNTU NAGUSIAK)
# -------------------------------------------------------------
s2 = prs.slides.add_slide(blank_layout)
add_header(s2, "Aurkibidea: Landutako 5 Arazo Nagusiak")

topics = [
    ("1", "Interbloqueo o Deadlock", "Bi hari edo gehiago baliabideak elkarri blokeatuta elkarren zain geratzen direnean (itxaronaldi zirkularra).", C_TEAL),
    ("2", "Muerte por Inanición (Starvation)", "Hari batek sekula ez duenean lortzen baliabidea, beste batzuek etengabe monopolizatzen dutelako.", C_CYAN),
    ("3", "Condiciones de Carrera (Race Conditions)", "Partekatutako datuetan eragiketa ez-atomikoak aldi berean egitean datu-galerak gertatzen direnean.", C_TEAL),
    ("4", "Inconsistencia de Memoria", "PUZaren cache lokalaren eraginez hari batek beste hariaren memoria-aldaketak ikusten ez dituenean.", C_CYAN),
    ("5", "Condiciones Deslizadas (Slipped Conditions)", "'Check-then-act' arrakala: baldintza egiaztatu eta ekintza burutu bitartean egoera aldatzen denean.", C_TEAL),
]

for idx, (num, name, desc, color) in enumerate(topics):
    y_pos = Inches(1.45 + idx * 1.12)
    # Box
    box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y_pos, Inches(11.733), Inches(0.95))
    box.fill.solid()
    box.fill.fore_color.rgb = C_BG_CARD
    box.line.color.rgb = color
    box.line.width = Pt(1.5)
    
    # Number circle
    circ = s2.shapes.add_shape(MSO_SHAPE.OVAL, Inches(1.05), y_pos + Inches(0.15), Inches(0.65), Inches(0.65))
    circ.fill.solid()
    circ.fill.fore_color.rgb = C_NAVY_DARK
    circ.line.color.rgb = color
    cp = circ.text_frame.paragraphs[0]
    cp.text = num
    cp.alignment = PP_ALIGN.CENTER
    cp.font.size = Pt(16)
    cp.font.bold = True
    cp.font.color.rgb = C_WHITE
    
    # Text
    tb = s2.shapes.add_textbox(Inches(1.85), y_pos + Inches(0.08), Inches(10.4), Inches(0.8))
    tf = tb.text_frame
    p1 = tf.paragraphs[0]
    p1.text = name
    p1.font.size = Pt(15)
    p1.font.bold = True
    p1.font.color.rgb = C_NAVY_DARK
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(12)
    p2.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 3: 1. DEADLOCK (TEORIA)
# -------------------------------------------------------------
s3 = prs.slides.add_slide(blank_layout)
add_header(s3, "1. Interbloqueo o Deadlock (Blokeo Elkarrekikoa)")

# Card Left: Teoria
add_card(s3, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6), "Zer da Deadlock egoera bat?")
tb = s3.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.8))
tf = tb.text_frame
tf.word_wrap = True
tf.paragraphs[0].text = "• Definizioa: Bi hari edo gehiago modu mugagabean blokeatuta geratzen dira, bakoitzak besteak behar duen baliabidea askatu arte itxaroten duelako."
tf.paragraphs[0].font.size = Pt(13)
tf.paragraphs[0].font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Ondorioa: Prozesua edo zerbitzaria guztiz izoztuta geratzen da eta eskuz birabiarazi behar izaten da."
p.font.size = Pt(13)
p.font.color.rgb = C_RED

p = tf.add_paragraph()
p.text = "• Adibide erreala: Bi transakziok elkarren banku-kontuak blokeatzen dituztenean aldi berean diru-transferentzia bat egiteko."
p.font.size = Pt(13)
p.font.color.rgb = C_DARK_TEXT

# Card Right: Coffman-en 4 baldintzak
add_card(s3, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.6), "Coffman-en 4 Baldintzak (Derrigorrezkoak)")
tb2 = s3.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.8))
tf2 = tb2.text_frame
tf2.word_wrap = True

coffman = [
    ("1. Elkarrekiko Bazterketa (Mutual Exclusion):", "Baliabidea ezin dute bi hariek aldi berean erabili."),
    ("2. Eutsi eta Itxaron (Hold and Wait):", "Hari batek baliabide bat atxikitzen du bigarren baten zain dagoela."),
    ("3. Desjabetzerik Eza (No Preemption):", "Ezin zaio hari bati bere baliabidea indarrez kendu; berak askatu behar du."),
    ("4. Itxaronaldi Zirkularra (Circular Wait):", "Mendekotasun begizta itxia sortzen da (H1 -> B2 -> H2 -> B1).")
]
for title, desc in coffman:
    p = tf2.add_paragraph() if tf2.paragraphs[0].text else tf2.paragraphs[0]
    p.text = title
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_NAVY_DARK
    
    p2 = tf2.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(12)
    p2.font.color.rgb = C_MUTED_TEXT

# -------------------------------------------------------------
# SLIDE 4: 1. DEADLOCK (KODEA ETA EXEKUZIOA)
# -------------------------------------------------------------
s4 = prs.slides.add_slide(blank_layout)
add_header(s4, "1. Deadlock: IntelliJ Kodea, Exekuzioa eta Konponbidea")

# Image Left: Code
slide_left_img = os.path.join(img_dir, "1_deadlock_kodea.png")
if os.path.exists(slide_left_img):
    s4.shapes.add_picture(slide_left_img, Inches(0.8), Inches(1.4), width=Inches(5.7))

# Image Right: Output
slide_right_img = os.path.join(img_dir, "1_deadlock_irteera.png")
if os.path.exists(slide_right_img):
    s4.shapes.add_picture(slide_right_img, Inches(6.8), Inches(1.4), width=Inches(5.7))

# Bottom banner for the fix
bfix = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.733), Inches(1.05))
bfix.fill.solid()
bfix.fill.fore_color.rgb = RGBColor(236, 253, 245) # light green
bfix.line.color.rgb = C_GREEN
bfix.line.width = Pt(1.5)
btf = bfix.text_frame
bp1 = btf.paragraphs[0]
bp1.text = "NOLA KONPONTZEN DA? (Resource Ordering / Blokeoen Hurrenkera Bera)"
bp1.font.bold = True
bp1.font.size = Pt(13)
bp1.font.color.rgb = RGBColor(6, 95, 70)
bp2 = btf.add_paragraph()
bp2.text = "Hari guztiek blokeoak beti ordena BEREAN eskatzen badituzte (lehenik BaliabideA eta gero BaliabideB), ez da inoiz itxaronaldi zirkularrik sortuko eta Deadlock-a guztiz saihesten da!"
bp2.font.size = Pt(11)
bp2.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 5: 2. INANIZIOA (TEORIA)
# -------------------------------------------------------------
s5 = prs.slides.add_slide(blank_layout)
add_header(s5, "2. Muerte por Inanición / Starvation (Baliabide-Gosetea)")

add_card(s5, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6), "Zer da Inanizioa (Starvation)?")
tb = s5.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.8))
tf = tb.text_frame
tf.word_wrap = True
tf.paragraphs[0].text = "• Kontzeptua: Hari batek behar duen baliabidea edo PUZ denbora sekula ez lortzea, beste hari batzuek hura etengabe bereganatzen dutelako."
tf.paragraphs[0].font.size = Pt(13)
tf.paragraphs[0].font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Zergatia: Harien lehentasun desorekatuak (Thread.MAX_PRIORITY vs MIN_PRIORITY) edo blokeo bidegabeak (Unfair Locks)."
p.font.size = Pt(13)
p.font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Deadlock vs Inanizioa:"
p.font.bold = True
p.font.size = Pt(13)
p.font.color.rgb = C_NAVY_DARK

p = tf.add_paragraph()
p.text = "  - Deadlock: Hariak blokeatuta daude; inor ezin da aurrera atera."
p.font.size = Pt(12)
p.font.color.rgb = C_RED

p = tf.add_paragraph()
p.text = "  - Inanizioa: Haria exekutatzeko prest dago (RUNNABLE), baina planifikatzaileak beste hariei ematen die lehentasuna beti."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

add_card(s5, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.6), "Arriskuak eta Konponbide Bidea")
tb2 = s5.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.8))
tf2 = tb2.text_frame
tf2.word_wrap = True

tf2.paragraphs[0].text = "• Eragin Praktikoa:"
tf2.paragraphs[0].font.bold = True
tf2.paragraphs[0].font.size = Pt(13)
tf2.paragraphs[0].font.color.rgb = C_NAVY_DARK

p = tf2.add_paragraph()
p.text = "  Atzeko planoko mantentze-atazak, log-idazleak edo bezero arrunten eskaerak guztiz geldituta geratzea sistema gainkargatuta dagoenean."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "• Konponbide Teknikoa: Justizia (Fairness):"
p.font.bold = True
p.font.size = Pt(13)
p.font.color.rgb = C_NAVY_DARK

p = tf2.add_paragraph()
p.text = "  1. java.util.concurrent.locks.ReentrantLock(true) erabili, sarbidea FIFO (iritsi ahala zerbitzatu) ordenan emateko."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "  2. Lehentasun desorekatu artifizialak saihestea eta hari oldarkorrei 'Thread.sleep()' edo 'yield()' bidez arnasa ematea."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 6: 2. INANIZIOA (KODEA ETA EXEKUZIOA)
# -------------------------------------------------------------
s6 = prs.slides.add_slide(blank_layout)
add_header(s6, "2. Inanizioa: IntelliJ Kodea, ReentrantLock eta Exekuzioa")

slide_left_img = os.path.join(img_dir, "2_inanizioa_kodea.png")
if os.path.exists(slide_left_img):
    s6.shapes.add_picture(slide_left_img, Inches(0.8), Inches(1.4), width=Inches(5.7))

slide_right_img = os.path.join(img_dir, "2_inanizioa_irteera.png")
if os.path.exists(slide_right_img):
    s6.shapes.add_picture(slide_right_img, Inches(6.8), Inches(1.4), width=Inches(5.7))

bfix = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.733), Inches(1.05))
bfix.fill.solid()
bfix.fill.fore_color.rgb = RGBColor(236, 253, 245)
bfix.line.color.rgb = C_GREEN
bfix.line.width = Pt(1.5)
btf = bfix.text_frame
bp1 = btf.paragraphs[0]
bp1.text = "NOLA KONPONTZEN DA? (ReentrantLock bidezko Justizia / Fairness)"
bp1.font.bold = True
bp1.font.size = Pt(13)
bp1.font.color.rgb = RGBColor(6, 95, 70)
bp2 = btf.add_paragraph()
bp2.text = "'new ReentrantLock(true)' erabilita, blokeoa itxaron-ilaran lehenago sartu den hariarentzat izango da (FIFO). Terminaleko irteeran ikus daitekeenez, hari guztiek sarbide kopuru orekatua lortzen dute (11, 12, 12)!"
bp2.font.size = Pt(11)
bp2.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 7: 3. RACE CONDITIONS (TEORIA)
# -------------------------------------------------------------
s7 = prs.slides.add_slide(blank_layout)
add_header(s7, "3. Condiciones de Carrera / Race Conditions (Lasterketa-Baldintza)")

add_card(s7, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6), "Zer da Lasterketa-Baldintza bat?")
tb = s7.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.8))
tf = tb.text_frame
tf.word_wrap = True
tf.paragraphs[0].text = "• Definizioa: Hari anitz aldi berean partekatutako aldagai berera atzitzen direnean eta gutxienez batek idazten duenean, emaitza harien exekuzio-ordenaren mende geratzen da (ez-deterministikoa)."
tf.paragraphs[0].font.size = Pt(13)
tf.paragraphs[0].font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Zergatik gertatzen da? Eragiketa asko ez dira atomikoak. Adibidez, kontagailua++ eragiketak 3 instrukzio ditu:"
p.font.size = Pt(13)
p.font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "  1. READ: Memoriako balioa irakurri erregistrora."
p.font.size = Pt(12)
p.font.color.rgb = C_MUTED_TEXT

p = tf.add_paragraph()
p.text = "  2. MODIFY: Balioari 1 gehitu erregistroan."
p.font.size = Pt(12)
p.font.color.rgb = C_MUTED_TEXT

p = tf.add_paragraph()
p.text = "  3. WRITE: Balio berria memorian gorde."
p.font.size = Pt(12)
p.font.color.rgb = C_MUTED_TEXT

p = tf.add_paragraph()
p.text = "Bi harik aldi berean 1. pausoa egiten badute, balio bera irakurriko dute eta batak bestearen gehiketa gainidatziko du!"
p.font.size = Pt(12)
p.font.color.rgb = C_RED

add_card(s7, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.6), "Konponbideak Javan")
tb2 = s7.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.8))
tf2 = tb2.text_frame
tf2.word_wrap = True

tf2.paragraphs[0].text = "1. 'synchronized' Metodo edo Blokeak:"
tf2.paragraphs[0].font.bold = True
tf2.paragraphs[0].font.size = Pt(14)
tf2.paragraphs[0].font.color.rgb = C_NAVY_DARK

p = tf2.add_paragraph()
p.text = "Objektuaren monitorea (Lock) eskuratzen du. Une bakoitzean haria bakar bat sar daiteke sekzio kritikoan, beste guztiei sarrera itxiz amaitu arte."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "2. java.util.concurrent.atomic.AtomicInteger:"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = C_NAVY_DARK

p = tf2.add_paragraph()
p.text = "Blokeorik gabeko metodoa da. PUZ hardware mailako CAS (Compare-And-Swap) instrukzioak erabiltzen ditu; 'synchronized' baino askoz arinagoa eta eraginkorragoa da kontagailuetarako."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 8: 3. RACE CONDITIONS (KODEA ETA EXEKUZIOA)
# -------------------------------------------------------------
s8 = prs.slides.add_slide(blank_layout)
add_header(s8, "3. Race Conditions: IntelliJ Kodea eta Exekuzio Emaitza")

slide_left_img = os.path.join(img_dir, "3_lasterketa_kodea.png")
if os.path.exists(slide_left_img):
    s8.shapes.add_picture(slide_left_img, Inches(0.8), Inches(1.4), width=Inches(5.7))

slide_right_img = os.path.join(img_dir, "3_lasterketa_irteera.png")
if os.path.exists(slide_right_img):
    s8.shapes.add_picture(slide_right_img, Inches(6.8), Inches(1.4), width=Inches(5.7))

bfix = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.733), Inches(1.05))
bfix.fill.solid()
bfix.fill.fore_color.rgb = RGBColor(236, 253, 245)
bfix.line.color.rgb = C_GREEN
bfix.line.width = Pt(1.5)
btf = bfix.text_frame
bp1 = btf.paragraphs[0]
bp1.text = "EMAITZEN ANALISIA: GALDU DIREN 2.476 GEHIKETAK"
bp1.font.bold = True
bp1.font.size = Pt(13)
bp1.font.color.rgb = RGBColor(6, 95, 70)
bp2 = btf.add_paragraph()
bp2.text = "Sinkronizazio gabe: 20.000 espero ziren arren, 17.524 lortu dira (gainidazketak!). 'synchronized' edo 'AtomicInteger' erabilita berriz, emaitza beti %100 zehatza da: 20.000 / 20.000."
bp2.font.size = Pt(11)
bp2.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 9: 4. MEMORY INCONSISTENCY (TEORIA)
# -------------------------------------------------------------
s9 = prs.slides.add_slide(blank_layout)
add_header(s9, "4. Inconsistencia de Memoria (Memoriaren Sendotasun-Eza)")

add_card(s9, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6), "Zergatik gertatzen da Ikusgarritasun Arazoa?")
tb = s9.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.8))
tf = tb.text_frame
tf.word_wrap = True
tf.paragraphs[0].text = "• PUZ Modernoen Arkitektura: Prozesagailu bakoitzak bere cache memoria azkarrak ditu (L1, L2 eta erregistroak)."
tf.paragraphs[0].font.size = Pt(13)
tf.paragraphs[0].font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Eraginkortasun-arazoa: Haria batek partekatutako aldagai bat irakurtzen duenean, bere cachean kopiatzen du azkarrago atzitzeko."
p.font.size = Pt(13)
p.font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Ondorioa: Beste hari batek aldagaia aldatu arren RAM nagusian, lehen haria bere cache lokal zaharretik irakurtzen jarraitzen du, eta ez da konturatzen balioa aldatu dela!"
p.font.size = Pt(13)
p.font.color.rgb = C_RED

p = tf.add_paragraph()
p.text = "• JIT Optimizations: Konpilatzaileak 'while(!gelditu)' kodea 'while(true)' gisa optimiza dezake, bukle infinituan geratuz."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

add_card(s9, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.6), "Konponbidea: 'volatile' eta Happens-Before")
tb2 = s9.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.8))
tf2 = tb2.text_frame
tf2.word_wrap = True

tf2.paragraphs[0].text = "Zer bermatzen du 'volatile' hitz-gakoak?"
tf2.paragraphs[0].font.bold = True
tf2.paragraphs[0].font.size = Pt(14)
tf2.paragraphs[0].font.color.rgb = C_NAVY_DARK

p = tf2.add_paragraph()
p.text = "1. Zuzeneko Idazketa: Aldagaiaren edozein aldaketa berehala idazten da RAM memoria nagusira, cacheetan gorde gabe."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "2. Zuzeneko Irakurketa: Hari guztiek beti RAM memoria nagusitik irakurtzen dute uneko balio erreala."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "3. 'Happens-Before' Bermeak: Java Memoria Ereduak (JMM) agintzen du idazketa ondorengo irakurketa ororen aurretik gertatuko dela."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "GARRANTZITSUA: 'volatile'-k ikusgarritasuna bermatzen du, baina EZ atomikotasuna (adibidez, kontagailua++ bezalakoetan ez da nahikoa)."
p.font.size = Pt(11)
p.font.color.rgb = C_MUTED_TEXT

# -------------------------------------------------------------
# SLIDE 10: 4. MEMORY INCONSISTENCY (KODEA ETA EXEKUZIOA)
# -------------------------------------------------------------
s10 = prs.slides.add_slide(blank_layout)
add_header(s10, "4. Memoria Inkontsistentzia: IntelliJ Kodea eta Exekuzioa")

slide_left_img = os.path.join(img_dir, "4_memoria_kodea.png")
if os.path.exists(slide_left_img):
    s10.shapes.add_picture(slide_left_img, Inches(0.8), Inches(1.5), width=Inches(5.7))

slide_right_img = os.path.join(img_dir, "4_memoria_irteera.png")
if os.path.exists(slide_right_img):
    s10.shapes.add_picture(slide_right_img, Inches(6.8), Inches(1.5), width=Inches(5.7))

bfix = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.85), Inches(11.733), Inches(1.15))
bfix.fill.solid()
bfix.fill.fore_color.rgb = RGBColor(236, 253, 245)
bfix.line.color.rgb = C_GREEN
bfix.line.width = Pt(1.5)
btf = bfix.text_frame
bp1 = btf.paragraphs[0]
bp1.text = "KODE ETA TERMINAL ANALISIA: 'volatile' EFEKTUA"
bp1.font.bold = True
bp1.font.size = Pt(13)
bp1.font.color.rgb = RGBColor(6, 95, 70)
bp2 = btf.add_paragraph()
bp2.text = "Langile-haria bukle estu batean dabil 'banderaVolatile' aldagaia irakurtzen. Hari nagusiak balioa aldatu bezain laster, langileak berehala detektatzen du RAM-etik eta segurtasunez gelditzen da!"
bp2.font.size = Pt(11)
bp2.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 11: 5. SLIPPED CONDITIONS (TEORIA)
# -------------------------------------------------------------
s11 = prs.slides.add_slide(blank_layout)
add_header(s11, "5. Condiciones Deslizadas / Slipped Conditions (Lerratutako Baldintzak)")

add_card(s11, Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6), "Zer da 'Check-then-Act' Arrakala?")
tb = s11.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.8))
tf = tb.text_frame
tf.word_wrap = True
tf.paragraphs[0].text = "• Definizioa: Lasterketa-baldintza mota espezifiko bat da; hari batek baldintza bat egiaztatzen du (Check), baina ekintza burutu aurretik (Act), beste hari batek baldintza hori baliogabetzen du."
tf.paragraphs[0].font.size = Pt(13)
tf.paragraphs[0].font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Kausa: Egiaztapena eta ekintza sinkronizazio bloke berean ez egotea (bi urrats bananduak izatea)."
p.font.size = Pt(13)
p.font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "• Banku-Kontuaren Adibidea:"
p.font.bold = True
p.font.size = Pt(13)
p.font.color.rgb = C_NAVY_DARK

p = tf.add_paragraph()
p.text = "  1. Kontuan 100 € daude."
p.font.size = Pt(12)
p.font.color.rgb = C_MUTED_TEXT

p = tf.add_paragraph()
p.text = "  2. Hari-1ek egiaztatzen du: '100 € badaude, banoa ateratzera...'"
p.font.size = Pt(12)
p.font.color.rgb = C_MUTED_TEXT

p = tf.add_paragraph()
p.text = "  3. Bitartean Hari-2k ere 100 € daudela ikusi eta atera egiten ditu (Saldoa = 0 €)."
p.font.size = Pt(12)
p.font.color.rgb = C_RED

p = tf.add_paragraph()
p.text = "  4. Hari-1 bueltatu eta dirua ateratzen du: Saldoa = -100 € geratzen da!"
p.font.size = Pt(12)
p.font.color.rgb = C_RED

add_card(s11, Inches(6.8), Inches(1.4), Inches(5.7), Inches(5.6), "Konponbide Atomikoa")
tb2 = s11.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.8))
tf2 = tb2.text_frame
tf2.word_wrap = True

tf2.paragraphs[0].text = "Nola Saihestu Baldintza Labaintzea?"
tf2.paragraphs[0].font.bold = True
tf2.paragraphs[0].font.size = Pt(14)
tf2.paragraphs[0].font.color.rgb = C_NAVY_DARK

p = tf2.add_paragraph()
p.text = "Egiaztapena (Check) eta Diru-Kentzea (Act) eragiketa bakar eta atomiko batean bateratu behar dira metodo edo bloke 'synchronized' baten barruan:"
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf2.add_paragraph()
p.text = "public synchronized boolean ateraDirua(int kantitatea) {\n    if (saldoa >= kantitatea) {\n        saldoa -= kantitatea;\n        return true;\n    }\n    return false;\n}"
p.font.size = Pt(11)
p.font.color.rgb = C_TEAL

p = tf2.add_paragraph()
p.text = "Horrela, Hari-1ek saldoa egiaztatzen duen unetik kentzen duen unera arte, ezin da Hari-2 sartu eta saldo negatiboa sortzea ezinezkoa da!"
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 12: 5. SLIPPED CONDITIONS (KODEA ETA EXEKUZIOA)
# -------------------------------------------------------------
s12 = prs.slides.add_slide(blank_layout)
add_header(s12, "5. Lerratutako Baldintzak: IntelliJ Kodea eta Exekuzioa")

slide_left_img = os.path.join(img_dir, "5_lerratuak_kodea.png")
if os.path.exists(slide_left_img):
    s12.shapes.add_picture(slide_left_img, Inches(0.8), Inches(1.4), width=Inches(5.7))

slide_right_img = os.path.join(img_dir, "5_lerratuak_irteera.png")
if os.path.exists(slide_right_img):
    s12.shapes.add_picture(slide_right_img, Inches(6.8), Inches(1.4), width=Inches(5.7))

bfix = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.733), Inches(1.05))
bfix.fill.solid()
bfix.fill.fore_color.rgb = RGBColor(236, 253, 245)
bfix.line.color.rgb = C_GREEN
bfix.line.width = Pt(1.5)
btf = bfix.text_frame
bp1 = btf.paragraphs[0]
bp1.text = "TERMINALEKO EMAITZA: SALDO NEGATIBOARI IRTENBIDEA"
bp1.font.bold = True
bp1.font.size = Pt(13)
bp1.font.color.rgb = RGBColor(6, 95, 70)
bp2 = btf.add_paragraph()
bp2.text = "Kode arriskutsuan bi hariek atera dute dirua eta saldoa -100€ geratu da. Metodo atomiko sinkronizatuarekin, Hari-2k 100€ atera ondoren saldoa 0€ geratu da, eta Hari-1i ezezkoa eman zaio modu seguruan!"
bp2.font.size = Pt(11)
bp2.font.color.rgb = C_DARK_TEXT

# -------------------------------------------------------------
# SLIDE 13: LABURPEN KONPARATIBOA (TABLE)
# -------------------------------------------------------------
s13 = prs.slides.add_slide(blank_layout)
add_header(s13, "Laburpen Konparatiboa: 5 Arazoak Begiratu Batean")

table_shape = s13.shapes.add_table(6, 4, Inches(0.8), Inches(1.5), Inches(11.733), Inches(5.2))
tbl = table_shape.table

tbl.columns[0].width = Inches(2.3)
tbl.columns[1].width = Inches(3.2)
tbl.columns[2].width = Inches(3.2)
tbl.columns[3].width = Inches(3.033)

headers = ["Arazoa", "Kausa Nagusia", "Sintoma / Arriskua", "Java Konponbidea"]
for i, h in enumerate(headers):
    cell = tbl.cell(0, i)
    cell.fill.solid()
    cell.fill.fore_color.rgb = C_NAVY_DARK
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_WHITE

data = [
    ("1. Deadlock", "Itxaronaldi zirkularra baliabideetan", "Programa betiko izoztuta geratzea", "Baliabideak ordena berean eskuratu"),
    ("2. Inanizioa", "Baliabide-monopolioa / Bidegabekeria", "Hari ahulak sekula ez exekutatzea", "ReentrantLock(true) (Fairness)"),
    ("3. Race Conditions", "Eragiketa ez-atomikoak partekatuan", "Datu-galerak eta emaitza okerrak", "synchronized edo AtomicInteger"),
    ("4. Memoria Inkontsist.", "CPU Cacheak RAM-ekin sinkronizatu gabe", "Hari batek ez ditu aldaketak ikusten", "volatile (Happens-Before erlazioa)"),
    ("5. Slipped Conditions", "Check-then-act arrakala banandua", "Egoera baliogabeak (saldo negatiboa)", "Check eta Act 'synchronized' bakarrean"),
]

for row_idx, row_data in enumerate(data):
    for col_idx, text in enumerate(row_data):
        cell = tbl.cell(row_idx + 1, col_idx)
        cell.fill.solid()
        if row_idx % 2 == 0:
            cell.fill.fore_color.rgb = C_WHITE
        else:
            cell.fill.fore_color.rgb = C_BG_CARD
        p = cell.text_frame.paragraphs[0]
        p.text = text
        p.font.size = Pt(11)
        p.font.color.rgb = C_DARK_TEXT
        if col_idx == 0:
            p.font.bold = True
            p.font.color.rgb = C_NAVY_DARK

# -------------------------------------------------------------
# SLIDE 14: ONDORIOAK ETA GALDERAK
# -------------------------------------------------------------
s14 = prs.slides.add_slide(blank_layout)
add_header(s14, "Ondorioak eta Galderak")

add_card(s14, Inches(0.8), Inches(1.4), Inches(11.733), Inches(4.3), "Ondorio Nagusiak")
tb = s14.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(11.1), Inches(3.5))
tf = tb.text_frame
tf.word_wrap = True

tf.paragraphs[0].text = "1. Programazio Konkurrentearen Konplexutasuna:"
tf.paragraphs[0].font.bold = True
tf.paragraphs[0].font.size = Pt(14)
tf.paragraphs[0].font.color.rgb = C_NAVY_DARK

p = tf.add_paragraph()
p.text = "Hari anitzeko inguruneetan ohiko akatsak ez-deterministikoak dira: baliteke milioika aldiz ondo funtzionatzea eta zerbitzari produkzioan bezero asko daudenean huts egitea."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "2. 'Thread Safety' Bermatzea Garatzailearen Ardura Da:"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = C_NAVY_DARK

p = tf.add_paragraph()
p.text = "Konpilatzaileak ez du lasterketa-baldintzarik edo blokeorik debekatzen. Garatzaileak sinkronizazio-mekanismo egokiak (synchronized, volatile, atomic, Locks) propio erabili behar ditu."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

p = tf.add_paragraph()
p.text = "3. Errendimendua vs Segurtasuna:"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = C_NAVY_DARK

p = tf.add_paragraph()
p.text = "Sinkronizazio gehiegi jartzeak paralelismoa eta abiadura murrizten ditu (bottleneck); gutxiegi jartzeak datuak usteltzen ditu. Diseinu orekatua ezinbestekoa da."
p.font.size = Pt(12)
p.font.color.rgb = C_DARK_TEXT

# Final Banner
f_banner = s14.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.9), Inches(11.733), Inches(1.15))
f_banner.fill.solid()
f_banner.fill.fore_color.rgb = C_NAVY_DARK
f_banner.line.color.rgb = C_CYAN
f_banner.line.width = Pt(1.5)
f_tf = f_banner.text_frame
fp1 = f_tf.paragraphs[0]
fp1.text = "Eskerrik asko zuen arretagatik! Galderarik?"
fp1.alignment = PP_ALIGN.CENTER
fp1.font.bold = True
fp1.font.size = Pt(18)
fp1.font.color.rgb = C_WHITE
fp2 = f_tf.add_paragraph()
fp2.text = "1T Taldea (Julen, Iker, Ander U) | Goierri Eskola 2026"
fp2.alignment = PP_ALIGN.CENTER
fp2.font.size = Pt(12)
fp2.font.color.rgb = C_CYAN

# Save presentation
prs.save(pptx_path)
print(f"Presentation created successfully at: {pptx_path}")
