#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成风格统一的深色占位图 SVG。人物用3D卡通剪影占位(带性别标注)。"""
import os

OUT = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUT, exist_ok=True)

# 场景类占位：(filename, w, h, label_cn, sub)
SCENES = [
    ("cover",     1920, 1080, "封面背景",     "神经网络汇聚成光球 · 智能觉醒"),
    ("team-bg",   1920, 1080, "团队总览背景", "黄昏现代科技办公室 · 无人"),
    ("mission",   1920, 1080, "我们的理想",   "一束光引路上行 · 不被落下"),
    ("money-1",   1920, 1080, "接单赚钱",     "技能变现 · 完成项目收款"),
    ("money-2",   1200, 1200, "商单交付",     "项目完成 · 稳定收入"),
    ("money-3",   1200, 1200, "收入增长",     "收益曲线上扬 · 光粒上升"),
    ("award",     1920, 1080, "参赛拿奖",     "奖杯与黑客松领奖台 · 荣誉"),
    ("award-1",   1200, 1200, "奖杯与证书",   "金奖杯 + 证书 · 荣誉"),
    ("award-2",   1200, 1200, "黑客松现场",   "团队协作 · 竞赛氛围"),
    ("award-3",   1200, 1200, "领奖高举奖杯", "背影 · 胜利瞬间 · 彩带"),
    ("award-4",   1200, 1200, "企业合作",     "签约握手 · 商业联盟"),
    ("tool",      1920, 1080, "自研工具",     "多模型统一面板 · 一键切换"),
    ("cta",       1920, 1080, "报名行动",     "跨进光之门 · 决定性瞬间"),
]

# 人物类占位：(filename, label, sub, gender)  gender: 'M' 男 / 'F' 女
PEOPLE = [
    ("teacher-1", "老师一 · 3D卡通", "前腾讯AI算法工程师 · 沉稳", "M"),
    ("teacher-2", "老师二 · 3D卡通", "前腾讯AI算法工程师 · 创意", "M"),
    ("teacher-3", "老师三 · 3D卡通", "前字节Seed产品经理 · 清华", "F"),
    ("professor", "特邀嘉宾 · 3D卡通", "北京理工大学 教授 · 睿智", "M"),
]

DEFS = '''  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#131318"/><stop offset="0.5" stop-color="#0d0d0f"/><stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.62">
      <stop offset="0" stop-color="#0A84FF" stop-opacity="0.22"/><stop offset="0.55" stop-color="#30D158" stop-opacity="0.06"/><stop offset="1" stop-color="#0d0d0f" stop-opacity="0"/>
    </radialGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.035"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>'''

def scene(fn, w, h, label, sub):
    m = min(w, h)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
{DEFS}
  <rect width="{w}" height="{h}" fill="url(#bg)"/>
  <rect width="{w}" height="{h}" fill="url(#glow)"/>
  <rect width="{w}" height="{h}" filter="url(#n)" opacity="0.5"/>
  <g fill="none" stroke="#0A84FF" stroke-opacity="0.16" stroke-width="1">
    <circle cx="{w*0.5:.0f}" cy="{h*0.42:.0f}" r="{m*0.22:.0f}"/><circle cx="{w*0.5:.0f}" cy="{h*0.42:.0f}" r="{m*0.32:.0f}"/>
  </g>
  <rect x="{w*0.5-70:.0f}" y="{h*0.62:.0f}" width="140" height="1" fill="#30D158" fill-opacity="0.4"/>
  <text x="{w*0.5:.0f}" y="{h*0.5:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(m*0.055)}" font-weight="600" fill="#F5F5F7" fill-opacity="0.92">{label}</text>
  <text x="{w*0.5:.0f}" y="{h*0.58:.0f}" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="{int(m*0.028)}" fill="#F5F5F7" fill-opacity="0.5">{sub}</text>
  <text x="{w*0.5:.0f}" y="{h*0.7:.0f}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="{int(m*0.022)}" fill="#0A84FF" fill-opacity="0.7">assets/{fn}.jpg</text>
  <text x="{w*0.5:.0f}" y="{h*0.75:.0f}" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="{int(m*0.019)}" fill="#F5F5F7" fill-opacity="0.3">占位图 · 待替换（见 图片生成清单.md）</text>
</svg>'''

def person(fn, label, sub, gender):
    w, h = 800, 1000
    cx = w/2
    accent = "#30D158" if gender == "F" else "#0A84FF"
    gtext = "女 · FEMALE" if gender == "F" else "男 · MALE"
    # 简单的3D卡通头肩剪影：大脑袋(卡通比例) + 肩
    head_cy = 420; head_r = 150
    # 女生加一点发型宽度暗示
    hair = f'<ellipse cx="{cx}" cy="{head_cy+40}" rx="185" ry="200" fill="{accent}" fill-opacity="0.10"/>' if gender=="F" else ''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
{DEFS}
  <rect width="{w}" height="{h}" fill="url(#bg)"/>
  <rect width="{w}" height="{h}" fill="url(#glow)"/>
  <rect width="{w}" height="{h}" filter="url(#n)" opacity="0.5"/>
  <!-- 3D卡通剪影占位 -->
  {hair}
  <g fill="{accent}" fill-opacity="0.16" stroke="{accent}" stroke-opacity="0.35" stroke-width="2">
    <path d="M {cx-230} 1000 C {cx-230} 720, {cx-140} 640, {cx} 640 C {cx+140} 640, {cx+230} 720, {cx+230} 1000 Z"/>
    <circle cx="{cx}" cy="{head_cy}" r="{head_r}"/>
  </g>
  <text x="{cx}" y="{head_cy+12}" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="34" fill="#F5F5F7" fill-opacity="0.5">3D 卡通</text>
  <rect x="{cx-90}" y="150" width="180" height="1" fill="{accent}" fill-opacity="0.5"/>
  <text x="{cx}" y="120" text-anchor="middle" font-family="-apple-system,PingFang SC,sans-serif" font-size="42" font-weight="600" fill="#F5F5F7" fill-opacity="0.92">{label}</text>
  <text x="{cx}" y="180" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="26" fill="{accent}" fill-opacity="0.9" font-weight="600">{gtext}</text>
  <text x="{cx}" y="880" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="26" fill="#F5F5F7" fill-opacity="0.5">{sub}</text>
  <text x="{cx}" y="930" text-anchor="middle" font-family="ui-monospace,monospace" font-size="24" fill="{accent}" fill-opacity="0.8">assets/{fn}.jpg</text>
  <text x="{cx}" y="965" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="20" fill="#F5F5F7" fill-opacity="0.3">占位 · 待替换为 3D 卡通形象</text>
</svg>'''

for fn, w, h, label, sub in SCENES:
    open(os.path.join(OUT, fn+".svg"), "w", encoding="utf-8").write(scene(fn, w, h, label, sub))
for fn, label, sub, g in PEOPLE:
    open(os.path.join(OUT, fn+".svg"), "w", encoding="utf-8").write(person(fn, label, sub, g))
print("done scenes", len(SCENES), "people", len(PEOPLE))
