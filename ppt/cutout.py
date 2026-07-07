#!/usr/bin/env python3
"""Border flood-fill white-background removal -> transparent PNG.
Preserves interior white (socks, shoes, laptop) because only white pixels
connected to the image border are made transparent.
"""
import sys
from collections import deque
from PIL import Image, ImageFilter

# src_path, out_path
JOBS = [
    ("/root/.hermes/profiles/yiwen/image_cache/img_e0d9d80f4da6.png", "/root/mantai-course/ppt/assets/teacher-1.png"),  # glasses boy
    ("/root/.hermes/profiles/yiwen/image_cache/img_7add675c85da.png", "/root/mantai-course/ppt/assets/teacher-2.png"),  # laptop boy
    ("/root/.hermes/profiles/yiwen/image_cache/img_01efecb54de8.png", "/root/mantai-course/ppt/assets/teacher-3.png"),  # 134 girl 清华人机交互
]

THRESH = 238  # pixels brighter than this (all channels) count as "white background"

def process(src, out):
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()

    def is_white(x, y):
        r, g, b, a = px[x, y]
        return r >= THRESH and g >= THRESH and b >= THRESH

    # BFS flood fill from all border pixels
    visited = bytearray(w * h)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_white(x, y) and not visited[y*w+x]:
                visited[y*w+x] = 1; q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_white(x, y) and not visited[y*w+x]:
                visited[y*w+x] = 1; q.append((x, y))

    while q:
        x, y = q.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny*w+nx] and is_white(nx, ny):
                visited[ny*w+nx] = 1; q.append((nx, ny))

    # Build alpha: transparent where visited(=exterior white)
    for i in range(w*h):
        if visited[i]:
            x = i % w; y = i // w
            r, g, b, _ = px[x, y]
            px[x, y] = (r, g, b, 0)

    # Anti-alias the alpha edge slightly to kill white fringe
    r, g, b, a = im.split()
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    im = Image.merge("RGBA", (r, g, b, a))

    # Crop to content bounding box + small margin
    bbox = im.getbbox()
    if bbox:
        pad = 12
        l, t, rr, bb = bbox
        l = max(0, l-pad); t = max(0, t-pad)
        rr = min(w, rr+pad); bb = min(h, bb+pad)
        im = im.crop((l, t, rr, bb))

    im.save(out)
    print(f"{out}  size={im.size}")

for s, o in JOBS:
    process(s, o)
print("done")
