#!/usr/bin/env python3
"""
Cut the "featured pieces" set out of the existing photography.

Writes public/media/featured/*.webp

Every frame here must show JEWELLERY ONLY - no model's face at all. That is a
stricter rule than the site's usual "the piece must read whole", and it is why
these are baked to files instead of being object-position crops of the
originals: a CSS crop moves with the container's aspect ratio, and a card that
turns portrait on a phone would pull a chin or an ear back into frame. A file
cannot drift.

Boxes were chosen by rendering each candidate and checking it by eye. Three
further candidates (bridal-red, ivory-suite, g3) were tried and dropped - once
cropped below the face they held more fabric than jewellery.

Run: python3 scripts/make-featured.py
"""
from PIL import Image

SIZE = 1000  # square; displays at ~420px, so sharp at 2x

PIECES = [
    # (out name, source, crop box on the source)
    ("lotus-ring",     "public/media/reels/turn/f36.webp",                  (140, 150,  760,  770)),
    ("sapphire-choker","public/media/categories/polki/sapphire-choker.jpg", (120, 560, 1080, 1520)),
    ("drop-earring",   "public/media/categories/polki/drop-earrings.jpg",   (470, 540,  950, 1020)),
    ("kundan-choker",  "public/media/types/necklace.jpg",                   (170,1180, 1030, 1790)),
    ("bangle-stack",   "public/media/types/hathphool.jpg",                  (250, 900, 1150, 1800)),
    ("polki-rings",    "public/media/types/rings.jpg",                      (150, 700, 1050, 1600)),
]

if __name__ == "__main__":
    import os
    total = 0
    for name, src, box in PIECES:
        im = Image.open(src).convert("RGB").crop(box)
        # square off from the centre of the chosen box
        s = min(im.size)
        l = (im.width - s) // 2
        t = (im.height - s) // 2
        im = im.crop((l, t, l + s, t + s)).resize((SIZE, SIZE), Image.LANCZOS)
        out = f"public/media/featured/{name}.webp"
        im.save(out, "WEBP", quality=82, method=4)
        total += os.path.getsize(out)
    print(f"{len(PIECES)} featured crops -> public/media/featured ({total/1e6:.2f} MB)")
