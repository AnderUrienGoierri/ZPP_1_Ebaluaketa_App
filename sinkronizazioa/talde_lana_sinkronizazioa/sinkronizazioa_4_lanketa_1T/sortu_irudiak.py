import os
from PIL import Image, ImageDraw, ImageFont

img_dir = r"C:\Dev\GoierriEskola\2_maila\0490-Zerbitzu eta prozesuen programazioa\1_ebaluaketa\1_sarrera\sinkronizazioa\talde_lana_sinkronizazioa\sinkronizazioa_4_lanketa_1T\irudiak"
os.makedirs(img_dir, exist_ok=True)

FONT_PATH = r"C:\Windows\Fonts\consola.ttf"
TITLE_FONT_PATH = r"C:\Windows\Fonts\segoeui.ttf"

def render_terminal_or_code_card(
    output_filename,
    title,
    lines,
    is_code=True,
    width=900,
    min_height=380
):
    font_size = 17
    font = ImageFont.truetype(FONT_PATH, font_size)
    title_font = ImageFont.truetype(TITLE_FONT_PATH, 15)
    
    line_height = 26
    top_bar_height = 38
    padding_x = 24
    padding_y = 18
    
    content_height = len(lines) * line_height + padding_y * 2
    height = max(min_height, top_bar_height + content_height)
    
    # Background colors
    if is_code:
        bg_color = (30, 30, 46)        # IntelliJ/Catppuccin dark
        bar_color = (24, 24, 37)
        border_color = (69, 71, 90)
    else:
        bg_color = (15, 23, 42)        # Slate terminal dark
        bar_color = (30, 41, 59)
        border_color = (51, 65, 85)
        
    img = Image.new("RGB", (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Outer border
    draw.rectangle([0, 0, width - 1, height - 1], outline=border_color, width=2)
    
    # Title bar
    draw.rectangle([1, 1, width - 2, top_bar_height], fill=bar_color)
    draw.line([1, top_bar_height, width - 2, top_bar_height], fill=border_color, width=1)
    
    # Window action dots
    draw.ellipse([14, 13, 26, 25], fill=(237, 106, 94))   # Red
    draw.ellipse([34, 13, 46, 25], fill=(245, 192, 67))   # Yellow
    draw.ellipse([54, 13, 66, 25], fill=(98, 197, 84))    # Green
    
    # Title text
    draw.text((78, 9), title, font=title_font, fill=(205, 214, 244))
    
    # Draw content lines
    curr_y = top_bar_height + padding_y
    for item in lines:
        if isinstance(item, tuple):
            text, color = item
        else:
            text = item
            color = (205, 214, 244) # Default light
            
        draw.text((padding_x, curr_y), text, font=font, fill=color)
        curr_y += line_height
        
    filepath = os.path.join(img_dir, output_filename)
    img.save(filepath, "PNG")
    print(f"Saved: {filepath}")

# -------------------------------------------------------------
# 1. DEADLOCK
# -------------------------------------------------------------
render_terminal_or_code_card(
    "1_deadlock_kodea.png",
    "DeadlockAdibidea.java - Kode Arriskutsua eta Konponbidea",
    [
        ("// ARRISKUA: Hurrenkera gurutzatua (Itxaronaldi zirkularra)", (147, 153, 178)),
        ("Thread hari1 = new Thread(() -> {", (137, 180, 250)),
        ("    synchronized (baliabideA) {", (243, 139, 168)),
        ("        Thread.sleep(100);", (249, 226, 175)),
        ("        synchronized (baliabideB) { /* ... */ } // Zain geratzen da!", (243, 139, 168)),
        ("    }", (243, 139, 168)),
        ("});", (137, 180, 250)),
        ("Thread hari2 = new Thread(() -> {", (137, 180, 250)),
        ("    synchronized (baliabideB) {", (243, 139, 168)),
        ("        Thread.sleep(100);", (249, 226, 175)),
        ("        synchronized (baliabideA) { /* ... */ } // Zain geratzen da!", (243, 139, 168)),
        ("    }", (243, 139, 168)),
        ("});", (137, 180, 250)),
        ("", (205, 214, 244)),
        ("// KONPONBIDEA: Hurrenkera BEREAN eskuratu blokeoak (A gero B)", (166, 227, 161)),
        ("// Bi hariek lehenik baliabideA eta gero baliabideB eskatuko dute beti.", (166, 227, 161)),
    ],
    is_code=True,
    min_height=480
)

render_terminal_or_code_card(
    "1_deadlock_irteera.png",
    "IntelliJ Terminal - 1. Deadlock Exekuzioa",
    [
        (">>> 1. DEADLOCK (BLOKEO ELKARREKIKOA) - ARRISKUA <<<", (249, 226, 175)),
        ("[Hari-1] BaliabideA blokeatu du.", (147, 197, 253)),
        ("[Hari-2] BaliabideB blokeatu du.", (196, 181, 253)),
        ("[Hari-1] BaliabideB eskuratzen saiatzen... (zain)", (252, 165, 165)),
        ("[Hari-2] BaliabideA eskuratzen saiatzen... (zain)", (252, 165, 165)),
        ("", (255, 255, 255)),
        ("[OHARRA / DEADLOCK DETEKTATUA!] Bi hariak blokeatuta geratu dira elkarren zain!", (248, 113, 113)),
        ("[Hari-1] egoera: BLOCKED (BaliabideB eskuratzeko zain)", (248, 113, 113)),
        ("[Hari-2] egoera: BLOCKED (BaliabideA eskuratzeko zain)", (248, 113, 113)),
        ("", (255, 255, 255)),
        (">>> 1. DEADLOCK - KONPONBIDEA (Hurrenkera Bera Erabiliz) <<<", (134, 239, 172)),
        ("[Hari-1 Zuzena] BaliabideA blokeatu du.", (134, 239, 172)),
        ("[Hari-1 Zuzena] BaliabideB ere blokeatu du eta lana amaitu du.", (134, 239, 172)),
        ("[Hari-2 Zuzena] BaliabideA blokeatu du.", (134, 239, 172)),
        ("[Hari-2 Zuzena] BaliabideB ere blokeatu du eta lana amaitu du.", (134, 239, 172)),
        ("[ONDO!] Bi hariak arazorik gabe amaitu dira Deadlock-ik gabe.", (74, 222, 128))
    ],
    is_code=False,
    min_height=480
)

# -------------------------------------------------------------
# 2. INANIZIOA (STARVATION)
# -------------------------------------------------------------
render_terminal_or_code_card(
    "2_inanizioa_kodea.png",
    "InanizioAdibidea.java - Lehentasunak vs ReentrantLock(true)",
    [
        ("// ARRISKUA: Lehentasun desberdinak eta bidegabekeria", (147, 153, 178)),
        ("Thread hariAltua1 = new Thread(ataza);", (137, 180, 250)),
        ("hariAltua1.setPriority(Thread.MAX_PRIORITY); // Lehentasun gorena (10)", (249, 226, 175)),
        ("", (205, 214, 244)),
        ("Thread hariBaxua = new Thread(ataza);", (137, 180, 250)),
        ("hariBaxua.setPriority(Thread.MIN_PRIORITY);  // Lehentasun baxuena (1)", (243, 139, 168)),
        ("// Hari baxuak ia ez du CPU edo blokeo-txandarik lortzen!", (243, 139, 168)),
        ("", (205, 214, 244)),
        ("// KONPONBIDEA: ReentrantLock justizia bermearekin (Fairness)", (166, 227, 161)),
        ("final ReentrantLock fairLock = new ReentrantLock(true); // fair = true", (166, 227, 161)),
        ("fairLock.lock();", (166, 227, 161)),
        ("try {", (205, 214, 244)),
        ("    // Lan kritikoa egiten da FIFO (First-In, First-Out) ordenan", (147, 153, 178)),
        ("} finally {", (205, 214, 244)),
        ("    fairLock.unlock();", (166, 227, 161)),
        ("}", (205, 214, 244))
    ],
    is_code=True,
    min_height=480
)

render_terminal_or_code_card(
    "2_inanizioa_irteera.png",
    "IntelliJ Terminal - 2. Inanizioa (Starvation) Exekuzioa",
    [
        (">>> 2. INANIZIOA (STARVATION) - ARRISKUA <<<", (249, 226, 175)),
        ("[Hari ALTUA 1] Bukatuta. Lortutako sarbideak: 7.982.843", (252, 165, 165)),
        ("[Hari ALTUA 2] Bukatuta. Lortutako sarbideak: 7.829.451", (252, 165, 165)),
        ("[Hari BAXUA (Gosez)] Bukatuta. Lortutako sarbideak: 6.786.502", (248, 113, 113)),
        ("OHARRA: Hari indartsuek etengabe monopolizatu dute monitorea!", (248, 113, 113)),
        ("", (255, 255, 255)),
        (">>> 2. INANIZIOA - KONPONBIDEA (Fair Lock bidez) <<<", (134, 239, 172)),
        ("java.util.concurrent.locks.ReentrantLock(true) erabiliz ('fairness' = true)", (147, 197, 253)),
        ("[Hari-3 (Max)]  Bidezko sarbideak: 11", (134, 239, 172)),
        ("[Hari-1 (Min)]  Bidezko sarbideak: 12", (134, 239, 172)),
        ("[Hari-2 (Norm)] Bidezko sarbideak: 12", (134, 239, 172)),
        ("", (255, 255, 255)),
        ("[ONDO!] 'Fairness' aktibatuta, hari guztiek aukera orekatuak izan dituzte!", (74, 222, 128))
    ],
    is_code=False,
    min_height=440
)

# -------------------------------------------------------------
# 3. LASTERKETA-BALDINTZA (RACE CONDITION)
# -------------------------------------------------------------
render_terminal_or_code_card(
    "3_lasterketa_kodea.png",
    "LasterketaBaldintzaAdibidea.java - kontagailua++ vs synchronized / Atomic",
    [
        ("// ARRISKUA: kontagailua++ ez da atomikoa (Read-Modify-Write)", (147, 153, 178)),
        ("private static int kontagailuNormala = 0;", (243, 139, 168)),
        ("// Bi harik 10.000 aldiz: kontagailuNormala++;", (243, 139, 168)),
        ("// Biek balio bera irakurtzen badute, batak bestea gainidazten du!", (243, 139, 168)),
        ("", (205, 214, 244)),
        ("// 1. KONPONBIDEA: synchronized metodoa", (166, 227, 161)),
        ("private static synchronized void inkrementatuSinkronizatua() {", (166, 227, 161)),
        ("    kontagailuSinkronizatua++;", (205, 214, 244)),
        ("}", (166, 227, 161)),
        ("", (205, 214, 244)),
        ("// 2. KONPONBIDEA: AtomicInteger (Hardware CAS bidez)", (166, 227, 161)),
        ("private static final AtomicInteger kontagailuAtomikoa = new AtomicInteger(0);", (166, 227, 161)),
        ("kontagailuAtomikoa.incrementAndGet(); // Atomikoa eta azkarra", (166, 227, 161))
    ],
    is_code=True,
    min_height=440
)

render_terminal_or_code_card(
    "3_lasterketa_irteera.png",
    "IntelliJ Terminal - 3. Lasterketa-Baldintza (Race Condition) Exekuzioa",
    [
        (">>> 3. LASTERKETA-BALDINTZA (RACE CONDITION) - ARRISKUA <<<", (249, 226, 175)),
        ("Bi harik partekatutako kontagailua bakoitzak 10.000 aldiz gehituko dute.", (205, 214, 244)),
        ("Espero den emaitza teorikoa: 20.000", (205, 214, 244)),
        ("Lortutako azken balioa (Sinkronizatu gabe): 17.524", (248, 113, 113)),
        ("[ARAZOA!] Lasterketa-baldintza gertatu da! Galdu diren gehiketak: 2.476", (248, 113, 113)),
        ("", (255, 255, 255)),
        (">>> 3. LASTERKETA-BALDINTZA - KONPONBIDEA <<<", (134, 239, 172)),
        ("1. Emaitza 'synchronized' metodoarekin: 20000 / 20.000", (134, 239, 172)),
        ("2. Emaitza 'AtomicInteger'-ekin:        20000 / 20.000", (134, 239, 172)),
        ("", (255, 255, 255)),
        ("[ONDO!] Bi konponbideek emaitza zehatza eta sendoa (thread-safe) bermatzen dute!", (74, 222, 128))
    ],
    is_code=False,
    min_height=420
)

# -------------------------------------------------------------
# 4. MEMORIA INKONTSIZTEZIA (MEMORY INCONSISTENCY)
# -------------------------------------------------------------
render_terminal_or_code_card(
    "4_memoria_kodea.png",
    "MemoriaInkontsistentziaAdibidea.java - CPU Cache vs volatile",
    [
        ("// ARRISKUA: Aldagai arrunta core bakoitzeko cachean gorde daiteke", (147, 153, 178)),
        ("private static boolean gelditu = false; // ez-volatile", (243, 139, 168)),
        ("// Langile-haria:", (147, 153, 178)),
        ("while (!gelditu) { /* PUZ cachetik irakurtzen du etengabe! */ }", (243, 139, 168)),
        ("// Hari nagusiak 'gelditu = true' jarri arren, langileak agian ez du IKUSIKO!", (243, 139, 168)),
        ("", (205, 214, 244)),
        ("// KONPONBIDEA: volatile hitz-gakoa", (166, 227, 161)),
        ("private static volatile boolean banderaVolatile = false;", (166, 227, 161)),
        ("// 1. Idazketak zuzenean RAM memorian gordetzen dira berehala.", (166, 227, 161)),
        ("// 2. Irakurketak zuzenean RAM memoriatik egiten dira (Happens-Before).", (166, 227, 161))
    ],
    is_code=True,
    min_height=380
)

render_terminal_or_code_card(
    "4_memoria_irteera.png",
    "IntelliJ Terminal - 4. Memoria Inkontsistentzia Exekuzioa",
    [
        (">>> 4. MEMORIAREN SENDOTASUN-EZA - KONPONBIDEA ('volatile') <<<", (249, 226, 175)),
        ("Aldagaia 'volatile' gisa deklaratzean:", (205, 214, 244)),
        ("private static volatile boolean banderaVolatile = false;", (147, 197, 253)),
        ("", (255, 255, 255)),
        ("[Langile-Haria] Martxan... 'banderaVolatile = true' izateko zain.", (205, 214, 244)),
        ("[Hari Nagusia] 'banderaVolatile = true' ezartzen ari da...", (249, 226, 175)),
        ("[Langile-Haria] Banderaren aldaketa IKUSI DUT! Gelditzen naiz. (Iterazioak: 797.125.150)", (134, 239, 172)),
        ("", (255, 255, 255)),
        ("[ONDO!] Langile-haria garaiz gelditu da, 'volatile'-k RAM bidezko ikusgarritasuna bermatu duelako!", (74, 222, 128))
    ],
    is_code=False,
    min_height=380
)

# -------------------------------------------------------------
# 5. LERRATUTAKO BALDINTZAK (SLIPPED CONDITIONS)
# -------------------------------------------------------------
render_terminal_or_code_card(
    "5_lerratuak_kodea.png",
    "LerratutakoBaldintzakAdibidea.java - Check-then-Act arrakala vs Metodo Atomikoa",
    [
        ("// ARRISKUA: Check-then-Act bereizita (Baldintza lerratu egiten da)", (147, 153, 178)),
        ("if (kontua.getSaldoa() >= 100) { // 1. EGIAZTAPENA (Check)", (243, 139, 168)),
        ("    Thread.sleep(50);             // Testuinguru aldaketa (Hari 2 sartu da!)", (249, 226, 175)),
        ("    kontua.kenduDirua(100);        // 2. EKINTZA (Act) -> Saldo negatiboa!", (243, 139, 168)),
        ("}", (243, 139, 168)),
        ("", (205, 214, 244)),
        ("// KONPONBIDEA: Egiaztapena eta ekintza bloke ATOMIKO bakarrean", (166, 227, 161)),
        ("public synchronized boolean ateraDiruaAtomikoki(String haria, int kantitatea) {", (166, 227, 161)),
        ("    if (saldoa >= kantitatea) {", (205, 214, 244)),
        ("        saldoa -= kantitatea;", (205, 214, 244)),
        ("        return true;", (166, 227, 161)),
        ("    }", (205, 214, 244)),
        ("    return false; // Saldo nahikorik ez badago, ezeztatu", (243, 139, 168)),
        ("}", (166, 227, 161))
    ],
    is_code=True,
    min_height=440
)

render_terminal_or_code_card(
    "5_lerratuak_irteera.png",
    "IntelliJ Terminal - 5. Lerratutako Baldintzak Exekuzioa",
    [
        (">>> 5. LERRATUTAKO BALDINTZAK (SLIPPED CONDITIONS) - ARRISKUA <<<", (249, 226, 175)),
        ("Hasierako saldoa: 100€. Bi bezerok 100€ atera nahi dituzte.", (205, 214, 244)),
        ("[Hari-2] Egiaztapena: 100€ badira kontuan. Ateratzera noa...", (196, 181, 253)),
        ("[Hari-1] Egiaztapena: 100€ badira kontuan. Ateratzera noa...", (147, 197, 253)),
        ("[Hari-2] 100€ atera ditut! Uneko saldoa: -100€", (252, 165, 165)),
        ("[Hari-1] 100€ atera ditut! Uneko saldoa: -100€", (252, 165, 165)),
        ("AZKEN SALDOA: -100€ (ARAZOA! Saldo negatiboa sortu da!)", (248, 113, 113)),
        ("", (255, 255, 255)),
        (">>> 5. LERRATUTAKO BALDINTZAK - KONPONBIDEA <<<", (134, 239, 172)),
        ("[Hari-2] Saldo nahikoa dago (100€). Ateratzen: 100€ -> Saldo berria: 0€", (134, 239, 172)),
        ("[Hari-1] EZEZTATUA! Saldo gutxiegi (0€). Ezin dira 100€ atera.", (249, 226, 175)),
        ("AZKEN SALDOA (Konponduta): 0€", (74, 222, 128)),
        ("[ONDO!] Haria batek bakarrik atera du, bigarrenari ezezkoa eman zaio.", (74, 222, 128))
    ],
    is_code=False,
    min_height=440
)

print("All 10 images successfully generated!")
