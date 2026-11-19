"""Genera public/og.jpg (1200x630), la vista previa al compartir el enlace.
Uso: python3 scripts/og-image.py  (requiere Pillow). Se ejecuta solo al cambiar la imagen."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff"
BODY = "/usr/share/fonts/opentype/inter/Inter-Medium.otf"
WINE, INK, PAPER = (122, 28, 36), (18, 18, 20), (250, 248, 245)

W, H = 1200, 630
og = Image.new("RGB", (W, H), PAPER)
photo = Image.open(ROOT / "src/assets/proyectos/placilla.webp").convert("RGB")
ph = photo.resize((470, int(560 * photo.height / photo.width)), Image.LANCZOS)
d = ImageDraw.Draw(og)
d.rounded_rectangle((720, 80, 1180, 630), 36, fill=WINE)
mask = Image.new("L", ph.size, 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, ph.width, ph.height), 32, fill=255)
og.paste(ph, (690, 50), mask)

logo = Image.open(ROOT / "src/assets/logo.webp").convert("RGBA").resize((96, 96), Image.LANCZOS)
og.paste(logo, (64, 64), logo)
title = ImageFont.truetype(str(FONT), 84)
brand = ImageFont.truetype(str(FONT), 46)
small = ImageFont.truetype(BODY, 23)
d.text((180, 78), "GAUZA", font=brand, fill=INK)
d.text((182, 126), "ARQUITECTURA Y CONSTRUCCIÓN", font=ImageFont.truetype(BODY, 17), fill=(103, 103, 111))
y = 230
for line, color in (("TU PROYECTO,", INK), ("DEL PLANO A LA", INK), ("RECEPCIÓN FINAL", WINE)):
    d.text((64, y), line, font=title, fill=color)
    y += 86
d.text((64, 540), "Diseño · Planos · Permisos DOM · 5ª Región", font=small, fill=(103, 103, 111))
og.save(ROOT / "public/og.jpg", quality=86, optimize=True)
print("public/og.jpg listo")
