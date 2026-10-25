#!/usr/bin/env python3
"""Compress site images and record which ones exist.

Reads images-src/<group>/<name>.(png|jpg|jpeg|webp) and writes
public/images/<group>/<name>.webp (1600 px wide) and <name>-card.webp (800 px wide),
then rewrites src/content/imageManifest.json with the names available per group.
Pages only show an image when its name is in the manifest.

Needs Pillow:  python3 scripts/add-images.py
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images-src"
OUT = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "content" / "imageManifest.json"
GROUPS = ["industries"]
SIZES = {"": 1600, "-card": 800}
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def to_16_9(img):
    """Centre-crop to 16:9 so every header lines up."""
    w, h = img.size
    target = 16 / 9
    if w / h > target:
        nw = round(h * target)
        left = (w - nw) // 2
        return img.crop((left, 0, left + nw, h))
    nh = round(w / target)
    top = (h - nh) // 2
    return img.crop((0, top, w, top + nh))


def main():
    manifest = {}
    for group in GROUPS:
        (OUT / group).mkdir(parents=True, exist_ok=True)
        for src in sorted((SRC / group).glob("*")) if (SRC / group).exists() else []:
            if src.suffix.lower() not in EXTS:
                continue
            img = to_16_9(Image.open(src).convert("RGB"))
            for suffix, width in SIZES.items():
                out = OUT / group / f"{src.stem}{suffix}.webp"
                resized = img.resize((width, round(width * 9 / 16)), Image.LANCZOS) if img.width > width else img
                resized.save(out, "WEBP", quality=80, method=6)
                print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")
        # The manifest lists what is published, so deleting a WebP removes the image.
        manifest[group] = sorted(
            p.stem for p in (OUT / group).glob("*.webp") if not p.stem.endswith("-card")
        )
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"updated {MANIFEST.relative_to(ROOT)}: {manifest}")


if __name__ == "__main__":
    main()
