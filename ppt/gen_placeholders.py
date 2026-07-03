#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成风格统一的深色占位图 SVG。每张标注文件名、用途、比例。"""
import os

OUT = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUT, exist_ok=True)

# (filename, w, h, label_cn, sub)
IMGS = [
    ("cover",     1920, 1080, "封面背景",     "神经网络汇聚成光球 · 智能觉醒"),
    ("team-bg",   1920, 1080, "团队总览背景", "黄昏现代科技办公室 · 无人"),
    ("teacher-1", 800,  1000, "老师一 头像",  "前腾讯AI算法工程师 · 沉稳可信"),
    ("teacher-2", 800,  1000, "老师二 头像",  "前腾讯AI算法工程师 · 创意技术"),
    ("teacher-3", 800,  1000, "老师三 头像",  "前字节Seed产品经理 · 清华本硕"),
    ("professor", 1920, 1080, "特邀嘉宾意象", "学术讲堂 · 权威背书 · 无人"),
    ("mission",   1920, 1080, "我们的理想",   "一束光引路上行 · 不被落下"),
    ("money-1",   1920, 1080, "接单赚钱",     "技能变现 · 完成项目收款"),
    ("award",     1920, 1080, "参赛拿奖",     "奖杯与黑客松领奖台 · 荣誉"),
    ("tool",      1920, 1080, "自研工具",     "多模型统一面板 · 一键切换"),
    ("cta",       1920, 1080, "报名行动",     "跨进光之门 · 决定性瞬间"),
]

def svg(fn, w, h, label, sub):
    # 方向随尺寸变化的渐变角度
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#131318"/>
      <stop offset="0.5" stop-color="#0d0d0f"/>
      <stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.6">
      <stop offset="0" stop-color="#0A84FF" stop-opacity="0.22"/>
      <stop offset="0.55" stop-color="#30D158" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#0d0d0f" stop-opacity="0"/>
    </radialGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.035"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#bg)"/>
  <rect width="{w}" height="{h}" fill="url(#glow)"/>
  <rect width="{w}" height="{h}" filter="url(#n)" opacity="0.5"/>
  <g fill="none" stroke="#0A84FF" stroke-opacity="0.16" stroke-width="1">
    <circle cx="{w*0.5:.0f}" cy="{h*0.42:.0f}" r="{min(w,h)*0.22:.0f}"/>
    <circle cx="{w*0.5:.0f}" cy="{h*0.42:.0f}" r="{min(w,h)*0.32:.0f}"/>
  </g>
  <rect x="{w*0.5-70:.0f}" y="{h*0.62:.0f}" width="140" height="1" fill="#30D158" fill-opacity="0.4"/>
  <text x="{w*0.5:.0f}" y="{h*0.5:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(min(w,h)*0.055)}" font-weight="600" fill="#F5F5F7" fill-opacity="0.92">{label}</text>
  <text x="{w*0.5:.0f}" y="{h*0.58:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(min(w,h)*0.028)}" fill="#F5F5F7" fill-opacity="0.5">{sub}</text>
  <text x="{w*0.5:.0f}" y="{h*0.7:.0f}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="{int(min(w,h)*0.022)}" fill="#0A84FF" fill-opacity="0.7">assets/{fn}.jpg</text>
  <text x="{w*0.5:.0f}" y="{h*0.75:.0f}" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="{int(min(w,h)*0.019)}" fill="#F5F5F7" fill-opacity="0.3">占位图 · 待替换为生成图（见 图片生成清单.md）</text>
</svg>'''

for fn, w, h, label, sub in IMGS:
    path = os.path.join(OUT, fn + ".svg")
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg(fn, w, h, label, sub))
    print("wrote", path)
print("done", len(IMGS))
