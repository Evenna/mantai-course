#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成明亮风占位图 SVG。
A类(场景/人物)=明媚可爱撞色浅底; B类(获奖/接单)=写实照片占位(浅灰+相机标注)。
人物用3D卡通剪影占位(带性别标注)。"""
import os

OUT = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUT, exist_ok=True)

# 撞色调色板
PINK = "#FF5D73"; ORANGE = "#FF9F1C"; MINT = "#2EC4B6"; BLUE = "#3A86FF"; PURPLE = "#8338EC"; YELLOW = "#FFC94B"
INK = "#1D1B2E"

# 场景类占位：(filename, w, h, label_cn, sub, style)  style: 'A'明亮 / 'B'写实
SCENES = [
    ("cover",     1920, 1080, "封面背景",     "圆润光点汇聚成友好光球 · 明亮好奇", "A"),
    ("team-bg",   1920, 1080, "团队总览背景", "明亮通透创意工作室 · 无人",        "A"),
    ("mission",   1920, 1080, "我们的理想",   "众人拾级向暖阳上行 · 不被落下",     "A"),
    ("money-1",   1920, 1080, "接单赚钱",     "写实照片 · 技能变现 · 收款到账",     "B"),
    ("money-2",   1200, 1200, "商单交付",     "写实照片 · 项目完成 · 稳定收入",     "B"),
    ("money-3",   1200, 1200, "收入增长",     "写实照片 · 收益上涨",               "B"),
    ("award",     1920, 1080, "参赛拿奖",     "写实照片 · 真实领奖现场 · 荣誉",     "B"),
    ("award-1",   1200, 1200, "奖杯与证书",   "写实照片 · 奖杯+证书",              "B"),
    ("award-2",   1200, 1200, "黑客松现场",   "写实照片 · 团队协作竞赛",           "B"),
    ("award-3",   1200, 1200, "登台领奖",     "写实照片 · 背影 · 胜利瞬间 · 彩带",  "B"),
    ("award-4",   1200, 1200, "企业合作",     "写实照片 · 签约握手",               "B"),
    ("tool",      1920, 1080, "自研工具",     "明亮UI · 多模型统一面板 · 一键切换", "A"),
    ("cta",       1920, 1080, "报名行动",     "跨进暖光之门 · 决定性瞬间",         "A"),
]

# 人物类占位：(filename, label, sub, gender)  gender: 'M' 男 / 'F' 女
PEOPLE = [
    ("teacher-1", "老师一 · 3D卡通", "前腾讯AI算法工程师 · 沉稳", "M"),
    ("teacher-2", "老师二 · 3D卡通", "前腾讯AI算法工程师 · 创意", "M"),
    ("teacher-3", "老师三 · 3D卡通", "前字节Seed产品经理 · 清华", "F"),
    ("professor", "特邀嘉宾 · 3D卡通", "北京理工大学 教授 · 睿智", "M"),
]

# A明亮风 defs：奶白底 + 撞色柔和光斑
DEFS_A = f'''  <defs>
    <linearGradient id="bgA" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/><stop offset="0.55" stop-color="#FBFAF7"/><stop offset="1" stop-color="#F3F0EA"/>
    </linearGradient>
    <radialGradient id="blobP" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="{PINK}" stop-opacity="0.5"/><stop offset="1" stop-color="{PINK}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobO" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="{ORANGE}" stop-opacity="0.42"/><stop offset="1" stop-color="{ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobM" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="{MINT}" stop-opacity="0.42"/><stop offset="1" stop-color="{MINT}" stop-opacity="0"/>
    </radialGradient>
  </defs>'''

# B写实风 defs：浅灰"照片"底
DEFS_B = '''  <defs>
    <linearGradient id="bgB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#E9E7E3"/><stop offset="1" stop-color="#D8D5CF"/>
    </linearGradient>
  </defs>'''

def scene_A(fn, w, h, label, sub):
    m = min(w, h)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
{DEFS_A}
  <rect width="{w}" height="{h}" fill="url(#bgA)"/>
  <circle cx="{w*0.2:.0f}" cy="{h*0.28:.0f}" r="{m*0.34:.0f}" fill="url(#blobP)"/>
  <circle cx="{w*0.82:.0f}" cy="{h*0.24:.0f}" r="{m*0.3:.0f}" fill="url(#blobO)"/>
  <circle cx="{w*0.7:.0f}" cy="{h*0.82:.0f}" r="{m*0.32:.0f}" fill="url(#blobM)"/>
  <circle cx="{w*0.5:.0f}" cy="{h*0.44:.0f}" r="{m*0.16:.0f}" fill="none" stroke="{PINK}" stroke-opacity="0.35" stroke-width="3"/>
  <circle cx="{w*0.5:.0f}" cy="{h*0.44:.0f}" r="{m*0.24:.0f}" fill="none" stroke="{ORANGE}" stroke-opacity="0.28" stroke-width="3"/>
  <rect x="{w*0.5-70:.0f}" y="{h*0.61:.0f}" width="140" height="4" rx="2" fill="{PINK}" fill-opacity="0.7"/>
  <text x="{w*0.5:.0f}" y="{h*0.5:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(m*0.055)}" font-weight="700" fill="{INK}">{label}</text>
  <text x="{w*0.5:.0f}" y="{h*0.575:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(m*0.028)}" fill="{INK}" fill-opacity="0.6">{sub}</text>
  <text x="{w*0.5:.0f}" y="{h*0.7:.0f}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="{int(m*0.022)}" fill="{PINK}" fill-opacity="0.85">assets/{fn}.jpg</text>
  <text x="{w*0.5:.0f}" y="{h*0.75:.0f}" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="{int(m*0.019)}" fill="{INK}" fill-opacity="0.32">明亮风占位 · 待替换（见 图片生成清单.md）</text>
</svg>'''

def scene_B(fn, w, h, label, sub):
    m = min(w, h)
    # 写实照片占位：浅灰底 + 相机图标暗示"真实照片"
    cx, cy = w/2, h*0.42
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
{DEFS_B}
  <rect width="{w}" height="{h}" fill="url(#bgB)"/>
  <!-- 相机图标 -->
  <g transform="translate({cx:.0f},{cy:.0f})" fill="none" stroke="{INK}" stroke-opacity="0.28" stroke-width="{m*0.006:.0f}">
    <rect x="{-m*0.11:.0f}" y="{-m*0.07:.0f}" width="{m*0.22:.0f}" height="{m*0.15:.0f}" rx="{m*0.02:.0f}"/>
    <circle cx="0" cy="{m*0.005:.0f}" r="{m*0.045:.0f}"/>
    <rect x="{-m*0.045:.0f}" y="{-m*0.095:.0f}" width="{m*0.09:.0f}" height="{m*0.03:.0f}" rx="{m*0.008:.0f}"/>
  </g>
  <rect x="{cx-70:.0f}" y="{h*0.6:.0f}" width="140" height="4" rx="2" fill="{INK}" fill-opacity="0.3"/>
  <text x="{cx:.0f}" y="{h*0.53:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(m*0.05)}" font-weight="700" fill="{INK}" fill-opacity="0.72">{label}</text>
  <text x="{cx:.0f}" y="{h*0.575:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(m*0.026)}" fill="{INK}" fill-opacity="0.5">{sub}</text>
  <text x="{cx:.0f}" y="{h*0.69:.0f}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="{int(m*0.022)}" fill="{INK}" fill-opacity="0.6">assets/{fn}.jpg</text>
  <text x="{cx:.0f}" y="{h*0.74:.0f}" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="{int(m*0.019)}" fill="{INK}" fill-opacity="0.4">📷 写实照片占位 · 待替换为真实照片</text>
</svg>'''

def person(fn, label, sub, gender):
    w, h = 800, 1000
    cx = w/2
    accent = PINK if gender == "F" else BLUE
    accent2 = ORANGE if gender == "F" else MINT
    gtext = "女 · FEMALE" if gender == "F" else "男 · MALE"
    head_cy = 430; head_r = 150
    hair = f'<ellipse cx="{cx}" cy="{head_cy+40}" rx="185" ry="200" fill="{accent}" fill-opacity="0.14"/>' if gender=="F" else ''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FBFAF7"/>
    </linearGradient>
    <radialGradient id="paccent" cx="0.5" cy="0.55" r="0.55">
      <stop offset="0" stop-color="{accent2}" stop-opacity="0.28"/><stop offset="1" stop-color="{accent2}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#pbg)"/>
  <circle cx="{cx}" cy="640" r="360" fill="url(#paccent)"/>
  <!-- 3D卡通剪影占位 -->
  {hair}
  <g fill="{accent}" fill-opacity="0.18" stroke="{accent}" stroke-opacity="0.4" stroke-width="3">
    <path d="M {cx-230} 1000 C {cx-230} 730, {cx-140} 650, {cx} 650 C {cx+140} 650, {cx+230} 730, {cx+230} 1000 Z"/>
    <circle cx="{cx}" cy="{head_cy}" r="{head_r}"/>
  </g>
  <text x="{cx}" y="{head_cy+12}" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="34" fill="{INK}" fill-opacity="0.42">3D 卡通</text>
  <rect x="{cx-90}" y="150" width="180" height="4" rx="2" fill="{accent}" fill-opacity="0.7"/>
  <text x="{cx}" y="120" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="42" font-weight="700" fill="{INK}">{label}</text>
  <text x="{cx}" y="182" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="26" fill="{accent}" font-weight="700">{gtext}</text>
  <text x="{cx}" y="880" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="26" fill="{INK}" fill-opacity="0.55">{sub}</text>
  <text x="{cx}" y="930" text-anchor="middle" font-family="ui-monospace,monospace" font-size="24" fill="{accent}" fill-opacity="0.9">assets/{fn}.jpg</text>
  <text x="{cx}" y="965" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="20" fill="{INK}" fill-opacity="0.32">占位 · 待替换为明亮可爱 3D 卡通形象</text>
</svg>'''

for fn, w, h, label, sub, style in SCENES:
    svg = scene_A(fn, w, h, label, sub) if style == "A" else scene_B(fn, w, h, label, sub)
    open(os.path.join(OUT, fn+".svg"), "w", encoding="utf-8").write(svg)
for fn, label, sub, g in PEOPLE:
    open(os.path.join(OUT, fn+".svg"), "w", encoding="utf-8").write(person(fn, label, sub, g))
print("done scenes", len(SCENES), "people", len(PEOPLE))
