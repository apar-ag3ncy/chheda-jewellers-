#!/usr/bin/env python3
"""
Cut the Bloom ring out of its green studio plate.

Reads  public/media/reels/turn/f00..f71.webp   (opaque, ring on a green plate)
Writes public/media/reels/turn-cut/            (RGBA, ring alone)

Run:  python3 scripts/cut-ring.py

Done locally with PIL rather than an online background remover, so 72 frames
of the house's own product photography never leave the machine - and so the
thresholds below are recorded and repeatable instead of living in someone's
browser history. Every number here was measured off the frames; the comments
say which measurement.
"""
from PIL import Image, ImageFilter
import numpy as np
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _ring_cc import label_runs

# Fixed camera, fixed plate, so these rows hold for all 72 frames.
RIM_GATE_TOP, RIM_GATE_BOT = 680, 720   # diamonds end ~600, plate rim starts ~755
CUT_TOP, CUT_BOT = 892, 934
# Vertical crop of the output: the ring's union bbox is y141..932 across all
# 72 frames, so this keeps the piece and drops the empty sky and the plate.
CROP_TOP, CROP_BOT = 130, 940

# Largest enclosed background region treated as a speck inside a stone rather
# than a real opening. The gap in the data is 162 -> 121,218, so this is not
# a delicate number.
MAX_SPECK = 3000


def _enclosed_specks(bg, max_area):
    """Background regions that touch no edge and are smaller than max_area."""
    lab = label_runs(bg)
    if lab.max() == 0:
        return np.zeros_like(bg)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    ids, counts = np.unique(lab[lab > 0], return_counts=True)
    keep = {int(i) for i, c in zip(ids, counts) if int(i) not in border and c <= max_area}
    if not keep:
        return np.zeros_like(bg)
    return np.isin(lab, list(keep))             # ring meets the plate at 890-905

def _matte(a):
    """
    The ring's silhouette, as a hard matte.

    A soft colour ramp is the wrong instrument here and was the whole defect:
    a diamond is neutral, so warmth scores it ~0 and only brightness carries
    it, which left a stone at L=160 sitting at alpha 0.74 - a quarter of the
    page showing straight through it. On screen that read as green speckle
    inside every stone. Colour cannot fix that; those pixels really are green,
    because a polished stone mirrors the plate it is standing on.

    So colour is used only to seed a rough background, and TOPOLOGY decides:
    what the backdrop can reach from the frame edge is background, everything
    the ring encloses is the ring, and an enclosed region only stays
    see-through if it is big enough to be a real opening. The matte is then
    binary, so the piece is fully opaque, and softened by less than a pixel so
    its outline is not stair-stepped.
    """
    R, G, B = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    h = a.shape[0]
    y = np.arange(h, dtype=np.float32)[:, None]

    # Seed: the piece is rose gold (R > G); backdrop, plate and reflection are
    # green (G > R). Diamonds are neutral and brightness rescues them - except
    # in the band where the plate's own lit rim is neutral white too, which
    # position rules out (diamonds stop by row 600, the rim starts at 755).
    above_rim = np.clip((RIM_GATE_BOT - y) / float(RIM_GATE_BOT - RIM_GATE_TOP), 0, 1)
    warm = np.clip((R - G - 4.0) / 10.0, 0, 1)
    bright = np.clip((L - 132.0) / 38.0, 0, 1) * above_rim
    bg = np.maximum(warm, bright) < 0.5

    lab = label_runs(bg)
    transparent = np.zeros_like(bg)
    if lab.max() > 0:
        border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        ids, counts = np.unique(lab[lab > 0], return_counts=True)
        keep = [int(i) for i, c in zip(ids, counts)
                if int(i) in border or c > MAX_SPECK]
        if keep:
            transparent = np.isin(lab, keep)

    solid = (~transparent).astype(np.float32)
    # Sub-pixel feather: enough to kill the jaggies, not enough to halo.
    solid = np.asarray(
        Image.fromarray((solid * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    ).astype(np.float32) / 255.0

    # Below the contact line everything is reflection - warm, so only its
    # position separates it. Ramped so the band's base is not a hard edge.
    solid *= np.clip((CUT_BOT - y) / float(CUT_BOT - CUT_TOP), 0, 1)
    return solid


def cut(path):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    alpha = _matte(a)

    # Despill ONLY along the silhouette edge, where a pixel is genuinely part
    # gold and part plate. Applying it everywhere greyed the stones, which are
    # allowed to be neutral - and a whole-image clamp is what put a pale rim
    # around the petals.
    edge = (alpha > 0.02) & (alpha < 0.98)
    R, G, B = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    a[:, :, 1] = np.where(edge, np.minimum(G, np.maximum(R, B) + 6.0), G)

    return Image.fromarray(
        np.dstack([a, alpha * 255.0]).clip(0, 255).astype(np.uint8), "RGBA"
    )


if __name__ == "__main__":
    import os
    # The uncut masters live OUTSIDE public/ - they are the source for this
    # script, not something to ship. Only the cut frames are served.
    SRC, DST = "public/media/reels/turn", "public/media/reels/turn-cut"
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
