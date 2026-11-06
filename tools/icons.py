# Génère l'icône de l'app, l'icône de notification et l'écran de démarrage.
import os, glob
from PIL import Image, ImageDraw
RES = "android/app/src/main/res"
NAVY = (15, 61, 94); ORANGE = (234, 88, 12); GREEN = (5, 150, 105); WHITE = (255, 255, 255)

def glyph(size, bg=True, scale=0.62):
    S = size * 4
    im = Image.new("RGBA", (S, S), NAVY + (255,) if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    w = S * scale; x0 = (S - w) / 2; y0 = (S - w) / 2 + S * 0.02; x1 = x0 + w; y1 = y0 + w * 0.92
    r = w * 0.12
    d.rounded_rectangle([x0, y0, x1, y1], r, fill=WHITE)
    d.rounded_rectangle([x0, y0, x1, y0 + w * 0.26], r, fill=ORANGE)
    d.rectangle([x0, y0 + w * 0.14, x1, y0 + w * 0.26], fill=ORANGE)
    for cx in (x0 + w * 0.3, x0 + w * 0.7):
        d.rounded_rectangle([cx - w * 0.045, y0 - w * 0.09, cx + w * 0.045, y0 + w * 0.1], w * 0.04, fill=WHITE if not bg else (230, 236, 242))
    lw = int(w * 0.085)
    pts = [(x0 + w * 0.27, y0 + w * 0.58), (x0 + w * 0.44, y0 + w * 0.74), (x0 + w * 0.75, y0 + w * 0.42)]
    d.line(pts, fill=GREEN, width=lw, joint="curve")
    for p in (pts[0], pts[-1]):
        d.ellipse([p[0] - lw / 2, p[1] - lw / 2, p[0] + lw / 2, p[1] + lw / 2], fill=GREEN)
    return im.resize((size, size), Image.LANCZOS)

def rounded(im, rad):
    m = Image.new("L", im.size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1], rad, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0)); out.paste(im, (0, 0), m); return out

for dens, (L, F) in {"mdpi": (48, 108), "hdpi": (72, 162), "xhdpi": (96, 216), "xxhdpi": (144, 324), "xxxhdpi": (192, 432)}.items():
    folder = f"{RES}/mipmap-{dens}"
    g = glyph(L, True, 0.6)
    rounded(g, int(L * 0.22)).save(f"{folder}/ic_launcher.png")
    circ = Image.new("L", (L, L), 0); ImageDraw.Draw(circ).ellipse([0, 0, L - 1, L - 1], fill=255)
    rr = Image.new("RGBA", (L, L), (0, 0, 0, 0)); rr.paste(g, (0, 0), circ); rr.save(f"{folder}/ic_launcher_round.png")
    glyph(F, False, 0.40).save(f"{folder}/ic_launcher_foreground.png")

open(f"{RES}/values/ic_launcher_background.xml", "w").write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#0F3D5E</color>\n</resources>\n')

# icône de notification (blanche, vectorielle)
open(f"{RES}/drawable/ic_stat_notify.xml", "w").write('''<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">
    <path android:fillColor="#FFFFFFFF"
        android:pathData="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4 3,4.9 3,6v14c0,1.1 0.89,2 2,2h14c1.1,0 2,-0.9 2,-2V6C21,4.9 20.1,4 19,4zM19,20H5V9h14V20zM10.6,18.2l-3.5,-3.5l1.4,-1.4l2.1,2.1l4.9,-4.9l1.4,1.4L10.6,18.2z"/>
</vector>
''')

# écran de démarrage
for path in glob.glob(f"{RES}/drawable*/splash.png"):
    w, h = Image.open(path).size
    sp = Image.new("RGB", (w, h), NAVY)
    s = int(min(w, h) * 0.28); g = glyph(s, False, 0.9)
    sp.paste(g, ((w - s) // 2, (h - s) // 2), g); sp.save(path)
glyph(1024, True, 0.6).save("assets/icon-1024.png")
print("icons ok")
