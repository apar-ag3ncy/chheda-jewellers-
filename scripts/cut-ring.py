#!/usr/bin/env python3
"""
Cut the Bloom ring out of its green studio plate.

Reads  media-src/reels/turn/f00..f71.webp     (opaque, ring on a green plate)
Writes public/media/reels/turn-cut/            (RGBA, ring alone)

Run:  python3 scripts/cut-ring.py

Done locally with PIL rather than an online background remover, so 72 frames
of the house's own product photography never leave the machine - and so the
thresholds below are recorded and repeatable instead of living in someone's
browser history. Every number here was measured off the frames; the comments
say which measurement.
"""
from PIL import Image
import numpy as np

# Fixed camera, fixed plate, so these rows hold for all 72 frames.
RIM_GATE_TOP, RIM_GATE_BOT = 680, 720   # diamonds end ~600, plate rim starts ~755
CUT_TOP, CUT_BOT = 892, 934
# Vertical crop of the output: the ring's union bbox is y141..932 across all
# 72 frames, so this keeps the piece and drops the empty sky and the plate.
CROP_TOP, CROP_BOT = 130, 940             # ring meets the plate at 890-905

def cut(path):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    R, G, B = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    h = a.shape[0]
    y = np.arange(h, dtype=np.float32)[:, None]

    # The piece is rose gold - R > G on every part of it. The backdrop, the
    # plate and the reflection are green, G > R.
    # Threshold at +4, not 0. The plate's lit rim is marginally warm (R-G is
    # about +1) while the gold is emphatically so (+26), and a threshold at
    # zero let the rim through at half alpha as a pale streak behind the band.
    warm = np.clip((R - G - 4.0) / 10.0, 0, 1)

    # Diamonds go neutral, so warmth alone loses them and brightness has to
    # bring them back. But the plate's far rim is neutral white too, up to
    # L=230 - no colour rule can tell the two apart. Position can: measured
    # across all frames, diamonds stop by row 600 and the rim starts at 755,
    # with nothing in between, so the rescue is switched off in that gap.
    above_rim = np.clip((RIM_GATE_BOT - y) / float(RIM_GATE_BOT - RIM_GATE_TOP), 0, 1)
    bright = np.clip((L - 132.0) / 38.0, 0, 1) * above_rim

    alpha = np.maximum(warm, bright)

    # Below the contact line everything is reflection. It is warm - it is a
    # mirror of the ring - so only position separates it. Ramped, so the
    # band's base does not end on a hard horizontal edge.
    alpha *= np.clip((CUT_BOT - y) / float(CUT_BOT - CUT_TOP), 0, 1)

    # Green spill reads as a lime rim on the gold once the plate is gone.
    a[:, :, 1] = np.minimum(G, np.maximum(R, B) + 6.0)
    return Image.fromarray(np.dstack([a, alpha * 255.0]).clip(0, 255).astype(np.uint8), "RGBA")

def _sheet(idxs, out, bg, cols=8, cell=190):
    tiles = [cut(f"public/media/reels/turn/f{i:02d}.webp") for i in idxs]
    ch = int(cell * tiles[0].size[1] / tiles[0].size[0])
    rows = (len(tiles) + cols - 1) // cols
    s = Image.new("RGB", (cols * cell, rows * ch), bg)
    for i, t in enumerate(tiles):
        b = Image.new("RGB", t.size, bg); b.paste(t, (0, 0), t)
        s.paste(b.resize((cell, ch)), ((i % cols) * cell, (i // cols) * ch))
    s.save(out, quality=88); print("saved", out, s.size)


if __name__ == "__main__":
    import os
    # The uncut masters live OUTSIDE public/ - they are the source for this
    # script, not something to ship. Only the cut frames are served.
    SRC, DST = "media-src/reels/turn", "public/media/reels/turn-cut"
    os.makedirs(DST, exist_ok=True)
    total = 0
    for i in range(72):
        img = cut(f"{SRC}/f{i:02d}.webp").crop((0, CROP_TOP, 880, CROP_BOT))
        out = f"{DST}/f{i:02d}.webp"
        img.save(out, "WEBP", quality=74, method=3)
        total += os.path.getsize(out)
    cut(f"{SRC}/f00.webp").crop((0, CROP_TOP, 880, CROP_BOT)).save(
        f"{DST}/poster.webp", "WEBP", quality=82, method=3)
    print(f"72 frames + poster -> {DST}  ({total/1e6:.2f} MB)")
