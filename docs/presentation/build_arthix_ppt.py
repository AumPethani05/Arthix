#!/usr/bin/env python3
"""
ARTHIX — CTRL FREAKS
Hackathon 6-slide presentation generator.

Design tokens match the product (tailwind.config.js / arthix-logo.svg).
Content is sourced from the implemented repository, not marketing copy.

Unknown portal fields (PS ID, Theme, Team ID) stay explicitly unfilled
until the team supplies official slide content.
"""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import nsmap, qn
from pptx.oxml.xmlchemy import OxmlElement
from pptx.util import Emu, Inches, Pt

# ── Paths ────────────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parents[2]
SHOTS = ROOT / "docs" / "screenshots"
ASSETS = Path(__file__).resolve().parent / "assets"
OUT = Path(__file__).resolve().parent / "ARTHIX_CTRL_FREAKS_Hackathon_DRAFT.pptx"
LOGO_SVG = ROOT / "public" / "arthix-logo.svg"
QR_PATH = ASSETS / "github-qr.png"
LOGO_PNG = ASSETS / "arthix-mark.png"

# ── Brand tokens (from tailwind.config.js) ───────────────────────────────
NAVY_DEEP = RGBColor(0x08, 0x13, 0x2B)
NAVY = RGBColor(0x0F, 0x20, 0x42)
NAVY_RICH = RGBColor(0x1E, 0x3A, 0x8A)
AZURE = RGBColor(0x1D, 0x4E, 0xD8)
EMERALD = RGBColor(0x0F, 0x76, 0x6E)
EMERALD_B = RGBColor(0x10, 0xB9, 0x81)
TERRACOTTA = RGBColor(0xC2, 0x41, 0x0C)
AMBER = RGBColor(0xB4, 0x53, 0x09)
VERMILION = RGBColor(0xBE, 0x12, 0x3C)
CANVAS = RGBColor(0xF8, 0xF9, 0xFC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
INK = RGBColor(0x0F, 0x17, 0x2A)
MUTED = RGBColor(0x47, 0x55, 0x69)
FAINT = RGBColor(0x94, 0xA3, 0xB8)
LINE = RGBColor(0xE2, 0xE8, 0xF0)
SOFT_EM = RGBColor(0xF0, 0xFD, 0xF4)
SOFT_AZ = RGBColor(0xEF, 0xF6, 0xFF)
SOFT_VE = RGBColor(0xFF, 0xF1, 0xF2)
SOFT_AM = RGBColor(0xFF, 0xFB, 0xEB)
SOFT_NAVY = RGBColor(0xEE, 0xF2, 0xFF)

FONT = "Calibri"
FONT_B = "Calibri"

SW, SH = Inches(13.333), Inches(7.5)

# Portal fields — DO NOT invent. Update when official content arrives.
PORTAL = {
    "ps_id": "To be confirmed",
    "ps_title": "Arthix | AI-Powered Hyper-Personalized Banking for Bharat | Ctrl Freaks",
    "theme": "Digital Transformation in Lending",
    "category": "Software",
    "team_id": "To be confirmed",
    "team_name": "CTRL FREAKS",
}

GITHUB = "https://github.com/AumPethani05/Arthix"


# ── Low-level helpers ────────────────────────────────────────────────────
def _set_run(run, size, bold=False, color=INK, font=FONT, italic=False):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    run.font.name = FONT_B if bold else font
    rPr = run._r.get_or_add_rPr()
    ea = rPr.find(qn("a:ea"))
    if ea is None:
        ea = OxmlElement("a:ea")
        rPr.append(ea)
    ea.set("typeface", run.font.name)


def add_text(shape, text, size=12, bold=False, color=INK, align=PP_ALIGN.LEFT, font=FONT, italic=False):
    tf = shape.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    p.clear()
    run = p.add_run()
    run.text = text
    _set_run(run, size, bold, color, font, italic)
    return tf


def add_lines(shape, lines, default_size=11, default_color=INK, align=PP_ALIGN.LEFT, spacing=1.0):
    """lines: list of str or dicts {text,size,bold,color,italic}"""
    tf = shape.text_frame
    tf.word_wrap = True
    for i, line in enumerate(lines):
        if isinstance(line, str):
            line = {"text": line}
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(2)
        p.line_spacing = spacing
        run = p.add_run()
        run.text = line.get("text", "")
        _set_run(
            run,
            line.get("size", default_size),
            line.get("bold", False),
            line.get("color", default_color),
            italic=line.get("italic", False),
        )
    return tf


def rect(slide, x, y, w, h, fill, line=None):
    s = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    s.fill.solid()
    s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = Pt(1)
    s.shadow.inherit = False
    return s


def round_rect(slide, x, y, w, h, fill, line=None, adj=0.08):
    s = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    s.fill.solid()
    s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = Pt(1.15)
    try:
        s.adjustments[0] = adj
    except Exception:
        pass
    s.shadow.inherit = False
    return s


def oval(slide, x, y, w, h, fill):
    s = slide.shapes.add_shape(MSO_SHAPE.OVAL, x, y, w, h)
    s.fill.solid()
    s.fill.fore_color.rgb = fill
    s.line.fill.background()
    s.shadow.inherit = False
    return s


def chevron(slide, x, y, w, h, fill):
    s = slide.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, x, y, w, h)
    s.fill.solid()
    s.fill.fore_color.rgb = fill
    s.line.fill.background()
    s.shadow.inherit = False
    return s


def tbox(slide, x, y, w, h):
    return slide.shapes.add_textbox(x, y, w, h)


def picture(slide, path, x, y, w, h):
    return slide.shapes.add_picture(str(path), x, y, w, h)


def hyperlink_run(paragraph, text, url, size=11, bold=False, color=AZURE):
    run = paragraph.add_run()
    run.text = text
    _set_run(run, size, bold, color)
    if url:
        run.hyperlink.address = url
    return run


def set_slide_bg(slide, color):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color


def footer(slide, n, dark=False):
    rect(slide, Inches(0), Inches(7.28), SW, Pt(1), LINE)
    tb = tbox(slide, Inches(0.42), Inches(7.30), Inches(9.2), Inches(0.20))
    add_text(tb, "ARTHIX  ·  CTRL FREAKS  ·  Hackathon prototype  ·  Not RBI / DPDP certified", 9, False, FAINT)
    tb2 = tbox(slide, Inches(11.4), Inches(7.30), Inches(1.5), Inches(0.20))
    add_text(tb2, f"{n}  /  6", 9, True, NAVY_RICH, PP_ALIGN.RIGHT)


def header_light(slide, kicker, title, subtitle=None):
    rect(slide, Inches(0), Inches(0), SW, Inches(0.08), NAVY_RICH)
    k = tbox(slide, Inches(0.42), Inches(0.18), Inches(12.4), Inches(0.24))
    add_text(k, "ARTHIX  ·  CTRL FREAKS", 10, True, AZURE)
    t = tbox(slide, Inches(0.42), Inches(0.38), Inches(12.4), Inches(0.42))
    add_text(t, title, 26, True, NAVY_DEEP)
    if subtitle:
        s = tbox(slide, Inches(0.42), Inches(0.80), Inches(12.4), Inches(0.28))
        add_text(s, subtitle, 12, False, MUTED)


def pill(slide, x, y, w, h, fill, text, tcolor, size=10):
    sh = round_rect(slide, x, y, w, h, fill, adj=0.5)
    tb = tbox(slide, x, y + Inches(0.02), w, h)
    add_text(tb, text, size, True, tcolor, PP_ALIGN.CENTER)
    return sh


def card(slide, x, y, w, h, fill=WHITE, line=LINE):
    return round_rect(slide, x, y, w, h, fill, line, adj=0.06)


def accent_bar(slide, x, y, h, color):
    return rect(slide, x, y, Inches(0.07), h, color)


# ── Image prep ───────────────────────────────────────────────────────────
def rounded_image(src: Path, dest: Path, radius=28, crop_bottom_frac=0.0, max_w=1600):
    im = Image.open(src).convert("RGBA")
    if crop_bottom_frac:
        h = int(im.height * (1 - crop_bottom_frac))
        im = im.crop((0, 0, im.width, h))
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.Resampling.LANCZOS)
    mask = Image.new("L", im.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, im.size[0], im.size[1]), radius=radius, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.paste(im, mask=mask)
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.convert("RGB").save(dest, "PNG", optimize=True)
    return dest


def make_logo_mark():
    """Rasterize the ARTHIX shield from the SVG using a tiny HTML + PIL fallback."""
    ASSETS.mkdir(parents=True, exist_ok=True)
    # Draw a faithful mark in PIL so the PPT never depends on SVG support.
    s = 256
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((8, 8, 248, 248), radius=56, fill=(30, 58, 138, 255))
    # shield
    d.polygon([(128, 36), (196, 84), (196, 148), (128, 220), (60, 148), (60, 84)], fill=(37, 99, 235, 90))
    d.ellipse((88, 96, 168, 176), fill=(16, 185, 129, 255))
    d.ellipse((108, 116, 148, 156), fill=(30, 58, 138, 255))
    im.save(LOGO_PNG, "PNG")
    return LOGO_PNG


def make_qr():
    try:
        import qrcode
    except ImportError:
        return None
    ASSETS.mkdir(parents=True, exist_ok=True)
    qr = qrcode.QRCode(version=2, box_size=8, border=2)
    qr.add_data(GITHUB)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0F2042", back_color="white").convert("RGB")
    img.save(QR_PATH)
    return QR_PATH


def prep_shots():
    mapping = {
        "landing": ("01-landing.png", 0.08),
        "login": ("02-login.png", 0.12),
        "consent": ("04-consent.png", 0.22),
        "dashboard": ("05-dashboard-rahul.png", 0.18),
        "vivek_rec": ("06-vivek-recommend.png", 0.22),
        "jeevan": ("07-jeevanchakra.png", 0.28),
        "sahara": ("08-sahara-kamala.png", 0.22),
        "vivek_sup": ("09-vivek-suppress.png", 0.26),
        "kavach": ("10-kavach-fraud.png", 0.26),
        "bhasha": ("11-bhashasahayak.png", 0.24),
        "nyay": ("12-nyay-audit.png", 0.24),
        "onboard": ("03-onboarding.png", 0.18),
    }
    out = {}
    ASSETS.mkdir(parents=True, exist_ok=True)
    for key, (name, crop) in mapping.items():
        src = SHOTS / name
        dest = ASSETS / f"{key}.png"
        if src.exists():
            rounded_image(src, dest, radius=22, crop_bottom_frac=crop)
            out[key] = dest
    return out


# ── SLIDE 1 — Title / Problem ────────────────────────────────────────────
def slide_01(prs, shots):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(sl, WHITE)
    rect(sl, Inches(0), Inches(0), SW, Inches(0.08), NAVY_RICH)
    rect(sl, Inches(0), Inches(0), Inches(0.10), SH, NAVY_RICH)

    pill(sl, Inches(0.48), Inches(0.26), Inches(2.35), Inches(0.26), SOFT_NAVY, "HACKATHON MVP  ·  SOFTWARE", NAVY_RICH, 9)
    pill(
        sl,
        Inches(2.95),
        Inches(0.26),
        Inches(4.85),
        Inches(0.26),
        SOFT_AM,
        "THEME  ·  DIGITAL TRANSFORMATION IN LENDING",
        TERRACOTTA,
        9,
    )

    if LOGO_PNG.exists():
        sl.shapes.add_picture(str(LOGO_PNG), Inches(0.48), Inches(0.66), Inches(0.46), Inches(0.46))
    brand = tbox(sl, Inches(1.08), Inches(0.68), Inches(5.5), Inches(0.42))
    add_text(brand, "ARTHIX", 26, True, NAVY_DEEP)
    sub = tbox(sl, Inches(1.08), Inches(1.06), Inches(6.2), Inches(0.22))
    add_text(sub, "BHARAT INTELLIGENCE", 10, True, EMERALD)

    title = tbox(sl, Inches(0.48), Inches(1.34), Inches(8.8), Inches(1.22))
    add_lines(
        title,
        [
            {"text": "The right product.", "size": 28, "bold": True, "color": NAVY_DEEP},
            {"text": "The right moment.", "size": 28, "bold": True, "color": NAVY_DEEP},
            {"text": "Or no product at all.", "size": 28, "bold": True, "color": EMERALD},
        ],
        spacing=0.92,
    )

    tag = tbox(sl, Inches(0.48), Inches(2.58), Inches(8.7), Inches(0.42))
    add_text(
        tag,
        "An AI-powered hyper-personalized banking intelligence layer for Bharat —\n"
        "not a new bank, and not a chatbot that always sells.",
        13,
        False,
        MUTED,
    )

    round_rect(sl, Inches(0.48), Inches(3.08), Inches(8.7), Inches(0.72), SOFT_NAVY, LINE, adj=0.08)
    psl = tbox(sl, Inches(0.66), Inches(3.12), Inches(8.34), Inches(0.20))
    add_text(psl, "PROBLEM STATEMENT TITLE", 9, True, AZURE)
    pst = tbox(sl, Inches(0.66), Inches(3.32), Inches(8.34), Inches(0.42))
    add_text(pst, PORTAL["ps_title"], 14, True, NAVY_DEEP)

    round_rect(sl, Inches(0.48), Inches(3.92), Inches(8.7), Inches(0.78), WHITE, LINE, adj=0.08)
    tn = tbox(sl, Inches(0.66), Inches(3.98), Inches(4.4), Inches(0.20))
    add_text(tn, "TEAM NAME  (REGISTERED ON PORTAL)", 9, True, FAINT)
    tn2 = tbox(sl, Inches(0.66), Inches(4.16), Inches(5.5), Inches(0.46))
    add_text(tn2, PORTAL["team_name"], 26, True, NAVY_DEEP)
    tn3 = tbox(sl, Inches(6.1), Inches(4.18), Inches(2.9), Inches(0.42))
    add_text(tn3, "Personalization as a\nfiduciary act.", 12, False, AZURE, PP_ALIGN.RIGHT)

    cards = [
        ("PROBLEM STATEMENT ID", PORTAL["ps_id"]),
        ("THEME", PORTAL["theme"]),
        ("PS CATEGORY", PORTAL["category"]),
        ("TEAM ID", PORTAL["team_id"]),
    ]
    cw = Inches(2.08)
    for i, (lab, val) in enumerate(cards):
        x = Inches(0.48) + i * Inches(2.20)
        round_rect(sl, x, Inches(4.84), cw, Inches(2.12), WHITE, LINE, adj=0.08)
        accent_bar(sl, x, Inches(4.84), Inches(2.12), [AZURE, TERRACOTTA, EMERALD, AMBER][i])
        a = tbox(sl, x + Inches(0.16), Inches(4.96), cw - Inches(0.22), Inches(0.40))
        add_text(a, lab, 9, True, FAINT)
        b = tbox(sl, x + Inches(0.16), Inches(5.36), cw - Inches(0.22), Inches(1.42))
        add_text(b, val, 14, True, NAVY_DEEP)

    # Right identity column — Vivek spine
    round_rect(sl, Inches(9.48), Inches(0.22), Inches(3.52), Inches(6.92), SOFT_NAVY, None, adj=0.04)
    rtitle = tbox(sl, Inches(9.72), Inches(0.36), Inches(3.1), Inches(0.22))
    add_text(rtitle, "THE DECISION SPINE", 10, True, AZURE)
    rname = tbox(sl, Inches(9.72), Inches(0.58), Inches(3.1), Inches(0.38))
    add_text(rname, "Vivek", 22, True, NAVY_DEEP)
    rsub = tbox(sl, Inches(9.72), Inches(0.96), Inches(3.1), Inches(0.42))
    add_text(rsub, "Recommend  ·  Assist First\nSuppress  ·  Verify", 12, False, MUTED)

    outcomes = [
        (EMERALD, SOFT_EM, "RECOMMEND", "Need + eligibility +\nsuitability + safety."),
        (AZURE, WHITE, "ASSIST FIRST", "Help before another\nproduct is sold."),
        (VERMILION, SOFT_VE, "SUPPRESS", "The responsible action\nis to show nothing."),
        (AMBER, SOFT_AM, "VERIFY", "Unusual activity —\nask the customer."),
    ]
    for i, (col, fill, lab, desc) in enumerate(outcomes):
        y = Inches(1.52) + i * Inches(1.32)
        round_rect(sl, Inches(9.68), y, Inches(3.14), Inches(1.20), WHITE, LINE, adj=0.1)
        oval(sl, Inches(9.84), y + Inches(0.46), Inches(0.26), Inches(0.26), col)
        a = tbox(sl, Inches(10.22), y + Inches(0.14), Inches(2.45), Inches(0.28))
        add_text(a, lab, 12, True, col)
        b = tbox(sl, Inches(10.22), y + Inches(0.44), Inches(2.45), Inches(0.64))
        add_text(b, desc, 12, False, MUTED)

    footer(sl, 1)


# ── SLIDE 2 — Proposed Solution ──────────────────────────────────────────
def slide_02(prs, shots):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(sl, WHITE)
    header_light(
        sl,
        "Proposed Solution",
        "Proposed Solution",
        "A wellbeing-first intelligence layer that sits on existing banking journeys.",
    )

    # What it is
    card(sl, Inches(0.38), Inches(1.16), Inches(4.55), Inches(1.55), WHITE, LINE)
    accent_bar(sl, Inches(0.38), Inches(1.16), Inches(1.55), EMERALD)
    t = tbox(sl, Inches(0.58), Inches(1.22), Inches(4.2), Inches(0.24))
    add_text(t, "WHAT WE BUILT", 9, True, EMERALD)
    b = tbox(sl, Inches(0.58), Inches(1.44), Inches(4.2), Inches(1.18))
    add_text(
        b,
        "ARTHIX reads a consented ledger, builds a financial profile, ranks product candidates, then lets Vivek decide whether to recommend, assist, suppress, or verify — with a Nyay reason the customer can inspect.",
        12,
        False,
        INK,
    )

    # How it addresses
    card(sl, Inches(5.08), Inches(1.16), Inches(4.00), Inches(1.55), WHITE, LINE)
    accent_bar(sl, Inches(5.08), Inches(1.16), Inches(1.55), AZURE)
    t = tbox(sl, Inches(5.28), Inches(1.22), Inches(3.65), Inches(0.24))
    add_text(t, "HOW IT ADDRESSES THE PROBLEM", 9, True, AZURE)
    b = tbox(sl, Inches(5.28), Inches(1.44), Inches(3.65), Inches(1.18))
    add_text(
        b,
        "Same generic offer today reaches a first-time Gujarati user, a salaried Tier-2 professional, and a household missing EMI. ARTHIX personalizes the decision of whether to sell at all.",
        12,
        False,
        INK,
    )

    # Uniqueness
    card(sl, Inches(9.22), Inches(1.16), Inches(3.72), Inches(1.55), SOFT_EM, LINE)
    t = tbox(sl, Inches(9.40), Inches(1.22), Inches(3.4), Inches(0.24))
    add_text(t, "INNOVATION", 9, True, EMERALD)
    b = tbox(sl, Inches(9.40), Inches(1.44), Inches(3.4), Inches(1.18))
    add_text(
        b,
        "Ethics is a runtime gate, not a PDF. Vivek is deterministic — no neural net can override stress, leverage, or revoked consent.",
        12,
        False,
        INK,
    )

    # Pipeline
    steps = [
        ("Ledger", "Consented\nsample txs", NAVY),
        ("ArthBodh", "Profile · DTI\nrunway · surplus", NAVY_RICH),
        ("JeevanChakra", "Ranks candidates\n35/25/20/20 score", AZURE),
        ("Vivek", "5 deterministic\ngates", EMERALD),
        ("Nyay", "Consent · reasons\naudit trail", AMBER),
        ("Output", "Recommend /\nAssist / Suppress", TERRACOTTA),
    ]
    for i, (lab, desc, col) in enumerate(steps):
        x = Inches(0.38) + i * Inches(2.16)
        round_rect(sl, x, Inches(2.86), Inches(2.00), Inches(1.18), WHITE, LINE, 0.1)
        rect(sl, x, Inches(2.86), Inches(2.00), Inches(0.08), col)
        a = tbox(sl, x + Inches(0.08), Inches(2.96), Inches(1.84), Inches(0.28))
        add_text(a, lab, 13, True, NAVY_DEEP, PP_ALIGN.CENTER)
        b = tbox(sl, x + Inches(0.08), Inches(3.24), Inches(1.84), Inches(0.70))
        add_text(b, desc, 10, False, MUTED, PP_ALIGN.CENTER)
        if i < 5:
            chevron(sl, x + Inches(1.92), Inches(3.28), Inches(0.22), Inches(0.18), FAINT)

    # Screenshots
    shot_specs = [
        (shots.get("dashboard"), "Rahul · Dashboard  ·  RECOMMEND SIP"),
        (shots.get("sahara"), "Kamala · Sahara  ·  ASSIST FIRST"),
        (shots.get("bhasha"), "BhashaSahayak  ·  Gujarati KYC"),
    ]
    for i, (path, cap) in enumerate(shot_specs):
        x = Inches(0.38) + i * Inches(4.32)
        card(sl, x, Inches(4.18), Inches(4.14), Inches(2.52), WHITE, LINE)
        if path and path.exists():
            sl.shapes.add_picture(str(path), x + Inches(0.08), Inches(4.26), Inches(3.98), Inches(2.10))
        c = tbox(sl, x + Inches(0.10), Inches(6.36), Inches(3.94), Inches(0.28))
        add_text(c, cap, 10, True, MUTED, PP_ALIGN.CENTER)

    footer(sl, 2)


# ── SLIDE 3 — Technology ─────────────────────────────────────────────────
def slide_03(prs, shots):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(sl, WHITE)
    header_light(
        sl,
        "Technology Stack & Implementation",
        "Technology Stack & Implementation",
        "What this repository actually runs — not a production wish-list.",
    )

    stack = [
        ("Frontend", "Next.js 14  ·  React 18\nTypeScript  ·  Tailwind  ·  Lucide", AZURE),
        ("Backend", "Next.js Route Handlers\n+ optional Express 5", NAVY_RICH),
        ("Database", "SQLite via better-sqlite3\narthix.db auto-seeded", EMERALD),
        ("AI / ML (MVP)", "Deterministic rules + ranking\nIntent templates  ·  no LLM wired", AMBER),
        ("Auth / Privacy", "Demo persona session token\nMasked accounts  ·  purpose consent", TERRACOTTA),
        ("Tests / Run", "tsx suites  ·  npm run dev :3000\nnpm run server :5000", VERMILION),
    ]
    for i, (lab, desc, col) in enumerate(stack):
        r, c = divmod(i, 3)
        x = Inches(0.38) + c * Inches(2.92)
        y = Inches(1.16) + r * Inches(1.18)
        card(sl, x, y, Inches(2.80), Inches(1.08), WHITE, LINE)
        accent_bar(sl, x, y, Inches(1.08), col)
        a = tbox(sl, x + Inches(0.18), y + Inches(0.08), Inches(2.52), Inches(0.24))
        add_text(a, lab.upper(), 9, True, col)
        b = tbox(sl, x + Inches(0.18), y + Inches(0.32), Inches(2.52), Inches(0.70))
        add_text(b, desc, 11, False, INK)

    # Architecture flow
    card(sl, Inches(0.38), Inches(3.58), Inches(8.36), Inches(3.48), WHITE, LINE)
    ht = tbox(sl, Inches(0.56), Inches(3.66), Inches(8.0), Inches(0.26))
    add_text(ht, "MVP RUNTIME ARCHITECTURE", 10, True, NAVY_RICH)

    arch = [
        ("Customer", "UI / locale"),
        ("Next.js UI", "/  /login  /consent  /app"),
        ("API /api/v1", "15 REST routes"),
        ("Services", "7 Sanskrit modules"),
        ("SQLite", "Seeded ledgers"),
        ("Vivek+Nyay", "Action + reasons"),
    ]
    for i, (lab, desc) in enumerate(arch):
        x = Inches(0.56) + i * Inches(1.34)
        round_rect(sl, x, Inches(4.04), Inches(1.22), Inches(1.05), SOFT_NAVY if i % 2 == 0 else SOFT_AZ, adj=0.12)
        a = tbox(sl, x, Inches(4.10), Inches(1.22), Inches(0.40))
        add_text(a, lab, 11, True, NAVY_DEEP, PP_ALIGN.CENTER)
        b = tbox(sl, x + Inches(0.04), Inches(4.48), Inches(1.14), Inches(0.52))
        add_text(b, desc, 9, False, MUTED, PP_ALIGN.CENTER)
        if i < 5:
            chevron(sl, x + Inches(1.18), Inches(4.42), Inches(0.18), Inches(0.16), FAINT)

    mods = [
        ("1  ArthBodh", "Feature jobs on the sample ledger"),
        ("2  JeevanChakra", "Ranks; does not decide"),
        ("3  Vivek", "4-state decision gates"),
        ("4  BhashaSahayak", "HI · GU · EN grounded chat"),
        ("5  Sahara", "Stress 0–100 · High → assist"),
        ("6  Kavach", "Rule anomaly · never freeze"),
        ("7  Nyay", "Consent · reasons · audit"),
    ]
    for i, (lab, desc) in enumerate(mods):
        x = Inches(0.56) + (i % 4) * Inches(2.02)
        y = Inches(5.22) + (i // 4) * Inches(0.78)
        a = tbox(sl, x, y, Inches(1.95), Inches(0.28))
        add_text(a, lab, 12, True, NAVY_DEEP)
        b = tbox(sl, x, y + Inches(0.26), Inches(1.95), Inches(0.42))
        add_text(b, desc, 10, False, MUTED)

    # Screenshot + honesty
    card(sl, Inches(8.90), Inches(3.58), Inches(4.04), Inches(3.48), WHITE, LINE)
    if shots.get("nyay"):
        sl.shapes.add_picture(str(shots["nyay"]), Inches(9.02), Inches(3.70), Inches(3.80), Inches(2.15))
    cap = tbox(sl, Inches(9.02), Inches(5.88), Inches(3.80), Inches(0.28))
    add_text(cap, "Nyay  ·  inspectable ‘Why this?’ trail", 10, True, MUTED, PP_ALIGN.CENTER)
    note = tbox(sl, Inches(9.02), Inches(6.18), Inches(3.80), Inches(0.72))
    add_text(
        note,
        "Not in this MVP: live CBS / UPI / CKYC / bureau, Isolation Forest, K-Means, LLM API, Docker, voice.",
        10,
        False,
        AMBER,
    )

    footer(sl, 3)


# ── SLIDE 4 — Feasibility ────────────────────────────────────────────────
def slide_04(prs, shots):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(sl, WHITE)
    header_light(
        sl,
        "Feasibility, Challenges & Risk Mitigation",
        "Feasibility, Challenges & Risk Mitigation",
        "Honest prototype assessment against the implemented MVP.",
    )

    feas = [
        ("Technical", "High", EMERALD, "Seven modules, /api/v1, tests, and a runnable Next.js demo on sample ledgers."),
        ("Operational", "Demo-ready", AZURE, "Persona login, consent, dashboard, and 5-minute judge path are implemented."),
        ("Economic", "Low cost", EMERALD, "Local SQLite. No paid model API in the MVP. Fits a hackathon budget."),
        ("Scalability", "Contract-ready", AMBER, "Decision contract (profile in → action + reasons out) can swap SQLite later."),
        ("Deployment", "Local / simple", AZURE, "npm run dev. No Docker in-repo. Production would need bank infra."),
        ("Integration", "Mocked rails", AMBER, "CBS, UPI, CKYC, OTP, DigiLocker, Google are honest demo adapters."),
    ]
    for i, (lab, score, col, desc) in enumerate(feas):
        r, c = divmod(i, 3)
        x = Inches(0.38) + c * Inches(4.32)
        y = Inches(1.16) + r * Inches(1.22)
        card(sl, x, y, Inches(4.14), Inches(1.10), WHITE, LINE)
        a = tbox(sl, x + Inches(0.16), y + Inches(0.08), Inches(2.4), Inches(0.24))
        add_text(a, lab.upper(), 10, True, MUTED)
        pill(sl, x + Inches(2.55), y + Inches(0.10), Inches(1.42), Inches(0.26), col, score.upper(), WHITE, 9)
        b = tbox(sl, x + Inches(0.16), y + Inches(0.42), Inches(3.82), Inches(0.58))
        add_text(b, desc, 12, False, INK)

    # Risk matrix header
    ht = tbox(sl, Inches(0.38), Inches(3.62), Inches(12.5), Inches(0.28))
    add_text(ht, "CHALLENGE  →  RISK  →  MITIGATION     (each card reads left to right)", 11, True, NAVY_DEEP)

    risks = [
        ("Sample-ledger intelligence", "Quality depends on seeded txs, not live bureau.", "Keep Vivek deterministic; label demo data; swap feature store later."),
        ("Mocked bank rails", "Judges / users may read OTP/AA as live.", "UI + README mark adapters as demo. Never claim live CBS/UPI."),
        ("AI accuracy / opacity", "Black-box scoring would be unauditable.", "No NN for decisions. Rule codes + EN/HI/GU reasons + Nyay log."),
        ("Consent / privacy", "Financial data is sensitive; DPDP is statutory.", "Purpose toggles, masked A/Cs, no PAN/Aadhaar stored, default-off model training."),
        ("Fraud false positives", "Rule anomaly is a prototype, not a bank platform.", "VERIFY with customer. Account is never auto-frozen."),
        ("Adoption / literacy", "English-first apps cause KYC drop-off.", "HI/GU/EN assistant, large type, one primary action, empty-state as a feature."),
    ]
    for i, (ch, risk, mit) in enumerate(risks):
        r, c = divmod(i, 2)
        x = Inches(0.38) + c * Inches(6.48)
        y = Inches(3.94) + r * Inches(1.04)
        card(sl, x, y, Inches(6.32), Inches(0.96), WHITE, LINE)
        a = tbox(sl, x + Inches(0.14), y + Inches(0.06), Inches(2.00), Inches(0.80))
        add_text(a, ch, 12, True, NAVY_DEEP)
        b = tbox(sl, x + Inches(2.16), y + Inches(0.06), Inches(2.00), Inches(0.80))
        add_text(b, risk, 11, False, MUTED)
        csh = tbox(sl, x + Inches(4.18), y + Inches(0.06), Inches(2.02), Inches(0.80))
        add_text(csh, mit, 11, False, EMERALD)

    footer(sl, 4)


# ── SLIDE 5 — Impact ─────────────────────────────────────────────────────
def slide_05(prs, shots):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(sl, WHITE)
    header_light(
        sl,
        "Impact & Benefits",
        "Impact & Benefits",
        "Value shown on three seeded Bharat personas — not invented market statistics.",
    )

    # Audience
    audiences = [
        ("Primary users", EMERALD, "Retail bank customers in Tier 2/3/4 and rural Bharat — first-time digital, salaried, and cashflow-stressed households."),
        ("Secondary users", AZURE, "Bank relationship staff / future RM workstation who need an inspectable reason instead of a propensity score."),
        ("Stakeholders", AMBER, "Host bank (conduct + trust), regulators (explainability), and families protected from unsuitable credit."),
    ]
    for i, (lab, col, desc) in enumerate(audiences):
        x = Inches(0.38) + i * Inches(4.32)
        card(sl, x, Inches(1.16), Inches(4.14), Inches(1.22), WHITE, LINE)
        accent_bar(sl, x, Inches(1.16), Inches(1.22), col)
        a = tbox(sl, x + Inches(0.18), Inches(1.22), Inches(3.82), Inches(0.24))
        add_text(a, lab.upper(), 10, True, col)
        b = tbox(sl, x + Inches(0.18), Inches(1.48), Inches(3.82), Inches(0.80))
        add_text(b, desc, 12, False, INK)

    # Impact chain
    chain = [
        ("Solution", "Vivek + Nyay\non consented context"),
        ("Immediate", "Right action now:\nrecommend / assist / stop"),
        ("User", "Dignity, vernacular\nhelp, inspectable why"),
        ("Organisation", "Conduct risk ↓\ntrustworthy personalization"),
        ("Bharat", "Fewer harmful loans;\nbetter-timed suitable products"),
    ]
    for i, (lab, desc) in enumerate(chain):
        x = Inches(0.38) + i * Inches(2.58)
        round_rect(sl, x, Inches(2.52), Inches(2.42), Inches(1.12), SOFT_EM if i == 4 else WHITE, LINE, 0.1)
        a = tbox(sl, x + Inches(0.10), Inches(2.58), Inches(2.22), Inches(0.26))
        add_text(a, lab.upper(), 10, True, EMERALD if i == 4 else AZURE, PP_ALIGN.CENTER)
        b = tbox(sl, x + Inches(0.10), Inches(2.84), Inches(2.22), Inches(0.70))
        add_text(b, desc, 12, False, INK, PP_ALIGN.CENTER)
        if i < 4:
            chevron(sl, x + Inches(2.34), Inches(2.92), Inches(0.22), Inches(0.18), FAINT)

    # Before / after
    card(sl, Inches(0.38), Inches(3.80), Inches(6.32), Inches(3.26), WHITE, LINE)
    h = tbox(sl, Inches(0.56), Inches(3.88), Inches(6.0), Inches(0.26))
    add_text(h, "BEFORE  vs  AFTER  (same engine, three ledgers)", 11, True, NAVY_DEEP)

    rows = [
        ("Meena  ·  first digital", "English jargon KYC drop-off", "Gujarati assist. No product dump."),
        ("Rahul  ·  surplus", "Offer fatigue / ULIP push", "₹3,000 Direct Nifty 50 SIP + Why this?"),
        ("Kamala  ·  stress", "High-APR credit + collections", "Credit suppressed. 60-day EMI relief path."),
    ]
    for i, (who, before, after) in enumerate(rows):
        y = Inches(4.24) + i * Inches(0.88)
        a = tbox(sl, Inches(0.56), y, Inches(1.70), Inches(0.80))
        add_text(a, who, 12, True, NAVY_DEEP)
        round_rect(sl, Inches(2.28), y, Inches(2.05), Inches(0.72), SOFT_VE, adj=0.12)
        b = tbox(sl, Inches(2.36), y + Inches(0.08), Inches(1.90), Inches(0.56))
        add_text(b, before, 11, False, VERMILION)
        round_rect(sl, Inches(4.48), y, Inches(2.05), Inches(0.72), SOFT_EM, adj=0.12)
        c = tbox(sl, Inches(4.56), y + Inches(0.08), Inches(1.90), Inches(0.56))
        add_text(c, after, 11, False, EMERALD)

    # Demo KPI cards — labelled as seeded persona data
    kpis = [
        ("₹15,120", "Rahul monthly surplus\n(seeded ledger)"),
        ("16.3%", "Rahul DTI  ·  gate < 35%"),
        ("82 / 100", "Kamala Sahara stress\nHIGH band"),
        ("3 langs", "Hindi · Gujarati · English\n(text MVP, not voice)"),
    ]
    for i, (n, lab) in enumerate(kpis):
        y = Inches(3.80) + i * Inches(0.82)
        card(sl, Inches(6.86), y, Inches(6.08), Inches(0.74), WHITE, LINE)
        a = tbox(sl, Inches(7.04), y + Inches(0.08), Inches(1.70), Inches(0.58))
        add_text(a, n, 18, True, NAVY_DEEP)
        b = tbox(sl, Inches(8.80), y + Inches(0.10), Inches(3.90), Inches(0.54))
        add_text(b, lab, 12, False, MUTED)

    footer(sl, 5)


# ── SLIDE 6 — References ─────────────────────────────────────────────────
def slide_06(prs, shots):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(sl, WHITE)
    header_light(
        sl,
        "References & Research Work",
        "References & Research Work",
        "Sources actually used in the prototype. No project-report PDF was present in the workspace.",
    )

    # Left: official / regulatory
    card(sl, Inches(0.38), Inches(1.16), Inches(6.32), Inches(5.90), WHITE, LINE)
    h = tbox(sl, Inches(0.56), Inches(1.24), Inches(6.0), Inches(0.28))
    add_text(h, "OFFICIAL & REGULATORY  (cited in Vivek / Nyay)", 11, True, NAVY_DEEP)

    refs = [
        (
            "DPDP Act, 2023 — purpose-level consent",
            "https://www.indiacode.nic.in/handle/123456789/22037?locale=en",
            "Consent gate; model-improvement defaults to revoked.",
        ),
        (
            "RBI NBFC-Account Aggregator Master Directions",
            "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10598",
            "Consent-artifact pattern; AA UI is a mocked adapter in MVP.",
        ),
        (
            "RBI Guidelines on Digital Lending, 2022",
            "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12382&Mode=0",
            "Cited when suppressing aggressive unsecured credit under stress.",
        ),
        (
            "RBI Digital Lending Directions, 2025 (consolidation)",
            "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=60403",
            "Production direction — not claimed as MVP certification.",
        ),
        (
            "SEBI — Investment Advisers / direct-plan discipline",
            "https://www.sebi.gov.in/",
            "Zero-commission Direct Nifty 50 SIP in the catalogue.",
        ),
        (
            "RBI KYC Master Direction (guidance only in chat)",
            "https://www.rbi.org.in/",
            "BhashaSahayak KYC help is a checklist, not live CKYC.",
        ),
    ]
    for i, (name, url, note) in enumerate(refs):
        y = Inches(1.58) + i * Inches(0.86)
        nbox = tbox(sl, Inches(0.56), y, Inches(5.96), Inches(0.28))
        tf = nbox.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        hyperlink_run(p, f"{i+1}.  {name}", url, 13, True, AZURE)
        d = tbox(sl, Inches(0.78), y + Inches(0.28), Inches(5.70), Inches(0.46))
        add_text(d, note, 11, False, MUTED)

    # Right: research performed + tech
    card(sl, Inches(6.86), Inches(1.16), Inches(6.08), Inches(2.55), WHITE, LINE)
    h = tbox(sl, Inches(7.04), Inches(1.24), Inches(5.72), Inches(0.26))
    add_text(h, "RESEARCH PERFORMED IN THIS REPO", 11, True, NAVY_DEEP)
    bullets = [
        "Studied generic campaign / chatbot / separate-fraud stacks vs one fiduciary spine.",
        "Mapped three Bharat personas (Meena, Rahul, Kamala) to seeded ledgers.",
        "Chose rules over neural nets so a judge can replay every gate.",
        "K-Means, Isolation Forest, and LLM API remain documented production extensions — not shipped models.",
    ]
    b = tbox(sl, Inches(7.04), Inches(1.54), Inches(5.72), Inches(2.05))
    add_lines(
        b,
        [{"text": "•  " + t, "size": 12, "color": INK} for t in bullets],
        spacing=1.08,
    )

    card(sl, Inches(6.86), Inches(3.84), Inches(4.05), Inches(3.22), WHITE, LINE)
    h = tbox(sl, Inches(7.04), Inches(3.92), Inches(3.72), Inches(0.26))
    add_text(h, "TECHNICAL REFERENCES", 11, True, NAVY_DEEP)
    tech = [
        ("Next.js 14 App Router", "https://nextjs.org/docs"),
        ("Express 5", "https://expressjs.com/"),
        ("better-sqlite3", "https://github.com/WiseLibs/better-sqlite3"),
        ("Tailwind CSS 3", "https://tailwindcss.com/docs"),
        ("ARTHIX GitHub", GITHUB),
        ("Project README / constitution", None),
    ]
    tb = tbox(sl, Inches(7.04), Inches(4.24), Inches(3.72), Inches(2.65))
    tf = tb.text_frame
    tf.word_wrap = True
    for i, (name, url) in enumerate(tech):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(6)
        hyperlink_run(p, "→  " + name, url, 13, False, AZURE if url else INK)

    # QR
    card(sl, Inches(11.05), Inches(3.84), Inches(1.89), Inches(3.22), WHITE, LINE)
    if QR_PATH.exists():
        sl.shapes.add_picture(str(QR_PATH), Inches(11.22), Inches(4.02), Inches(1.55), Inches(1.55))
    q = tbox(sl, Inches(11.12), Inches(5.62), Inches(1.75), Inches(1.20))
    add_text(q, "Scan repo\nAumPethani05\n/Arthix", 11, True, NAVY_DEEP, PP_ALIGN.CENTER)

    footer(sl, 6)


def build():
    ASSETS.mkdir(parents=True, exist_ok=True)
    make_logo_mark()
    make_qr()
    shots = prep_shots()

    prs = Presentation()
    prs.slide_width = SW
    prs.slide_height = SH

    slide_01(prs, shots)
    slide_02(prs, shots)
    slide_03(prs, shots)
    slide_04(prs, shots)
    slide_05(prs, shots)
    slide_06(prs, shots)

    prs.save(OUT)
    print(f"Wrote {OUT}")
    return OUT


if __name__ == "__main__":
    build()
