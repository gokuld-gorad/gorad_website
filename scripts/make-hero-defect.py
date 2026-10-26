# Makes public/images/hero/hero-part-ng.webp: the hero flange with a chipped rim, shown for
# the NG part in the homepage scan. Usage: python3 scripts/make-hero-defect.py <in.webp> <out.webp> <preview.png>
import math, random, sys
from PIL import Image, ImageDraw, ImageFilter
src, out, prev = sys.argv[1:4]
random.seed(7)
im = Image.open(src).convert('RGB')
x0, y0, x1, y1 = 1060, 260, 1180, 420
K = 4
reg = im.crop((x0, y0, x1, y1)).resize(((x1 - x0) * K, (y1 - y0) * K), Image.LANCZOS)
S = lambda pts: [((x - x0) * K, (y - y0) * K) for x, y in pts]
bg = im.getpixel((1160, 330))

# The outer rim runs roughly from (1131, 296) down to (1129, 360). The chip is a scalloped
# bite into it: an irregular arc whose deepest point is ~16 px in from the rim.
def arc(depth, n=11):
    pts = []
    for i in range(n + 1):
        t = i / n
        y = 296 + 64 * t
        rim_x = 1131 - 2 * t
        bite = depth * math.sin(math.pi * t) ** 0.8
        jitter = random.uniform(-2.2, 2.2) if 0 < i < n else 0
        pts.append((rim_x - bite + jitter, y))
    return pts

edge = arc(24)                  # fracture boundary on the top face
face = arc(15)                # inner line of the exposed break, nearer the rim
d = ImageDraw.Draw(reg)
# 1. Remove the chipped piece: background shows through outside the fracture boundary.
d.polygon(S(edge + [(1165, 360), (1165, 296)]), fill=bg)
# 2. Exposed fracture face: a rough, darker metal band between the boundary and the face line.
band = Image.new('L', reg.size, 0)
ImageDraw.Draw(band).polygon(S(edge + list(reversed(face))), fill=255)
noise = Image.effect_noise(reg.size, 38).filter(ImageFilter.GaussianBlur(1.2 * K))
tex = Image.merge('RGB', [noise.point(lambda v: int(70 + v * 0.35))] * 3)
reg = Image.composite(tex, reg, band)
# 3. A soft shadow on the top face just inside the break, and a hairline highlight on its lip.
sh = Image.new('L', reg.size, 0)
ImageDraw.Draw(sh).line(S([(x - 2.5, y) for x, y in edge]), fill=120, width=5 * K)
sh = sh.filter(ImageFilter.GaussianBlur(3 * K))
reg = Image.composite(Image.new('RGB', reg.size, (90, 94, 100)), reg, sh.point(lambda v: int(v * 0.5)))
ImageDraw.Draw(reg).line(S(edge), fill=(214, 218, 222), width=int(0.8 * K), joint='curve')
reg = reg.resize((x1 - x0, y1 - y0), Image.LANCZOS)
im.paste(reg, (x0, y0))
im.save(out, 'WEBP', quality=85, method=6)
im.crop((1000, 180, 1300, 520)).resize((600, 680)).save(prev)
