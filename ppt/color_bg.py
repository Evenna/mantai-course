#!/usr/bin/env python3
"""Composite each transparent cutout onto a uniform-size solid-color canvas.
Figures normalized to the same height fraction, bottom-anchored, centered.
Output overwrites teacher-1/2/3.png + professor.png (colored versions).
Originals backed up to assets/cutout_src/ first.
"""
import os
from PIL import Image

ASSETS = "/root/mantai-course/ppt/assets"
SRC = os.path.join(ASSETS, "cutout_src")

# Uniform canvas 4:5 (matches spotlight; cover-crops fine in 1:1 grid)
CW, CH = 1000, 1250
FIG_H = int(CH * 0.90)      # every figure occupies 90% of canvas height -> same visual size
BOTTOM_MARGIN = int(CH * 0.03)

JOBS = {
    "teacher-1": (0x3B, 0x7D, 0xFF),   # blue
    "teacher-2": (0x12, 0xC7, 0xA6),   # teal-green
    "teacher-3": (0xFF, 0x4D, 0x7D),   # pink
    "professor": (0xFF, 0x8A, 0x1E),   # orange
}

os.makedirs(SRC, exist_ok=True)

for name, rgb in JOBS.items():
    p = os.path.join(ASSETS, name + ".png")
    # back up original transparent cutout once
    bak = os.path.join(SRC, name + ".png")
    fig = Image.open(p).convert("RGBA")
    if not os.path.exists(bak):
        fig.save(bak)
    else:
        # if backup exists, always start from the pristine transparent cutout
        fig = Image.open(bak).convert("RGBA")

    # trim to content bbox
    bb = fig.getbbox()
    if bb:
        fig = fig.crop(bb)
    fw, fh = fig.size
    # scale so figure height == FIG_H (uniform visual size)
    scale = FIG_H / fh
    nw, nh = max(1, round(fw * scale)), FIG_H
    fig = fig.resize((nw, nh), Image.LANCZOS)

    # if too wide for canvas, fit by width instead
    if nw > CW - 40:
        scale2 = (CW - 40) / nw
        nw, nh = round(nw * scale2), round(nh * scale2)
        fig = fig.resize((nw, nh), Image.LANCZOS)

    canvas = Image.new("RGBA", (CW, CH), rgb + (255,))
    x = (CW - nw) // 2
    y = CH - BOTTOM_MARGIN - nh
    canvas.alpha_composite(fig, (x, y))
    canvas.convert("RGB").save(p)  # solid bg -> save as opaque
    print(f"{name}: bg={rgb} figH={nh} -> {p}")

print("done")
