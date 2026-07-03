import markdown
md = open('/root/mantai-course/体验课逐字讲稿.md', encoding='utf-8').read()
body = markdown.markdown(md, extensions=['tables','fenced_code','nl2br'])
html = '''<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>曼塔 AI 体验课逐字讲稿</title>
<style>
body{background:#0d0d0f;color:rgba(245,245,247,0.92);font-family:-apple-system,"PingFang SC",sans-serif;line-height:1.9;max-width:820px;margin:0 auto;padding:32px 22px 120px;font-size:17px}
h1{font-size:26px;border-bottom:1px solid rgba(255,255,255,0.12);padding-bottom:14px;margin-top:48px}
h2{font-size:21px;color:#0A84FF;margin-top:40px}
h3{font-size:18px;color:#30D158;margin-top:30px}
blockquote{border-left:3px solid #FF9F0A;background:rgba(255,255,255,0.04);margin:14px 0;padding:10px 16px;border-radius:6px;color:rgba(245,245,247,0.75)}
code{background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:15px}
pre{background:rgba(10,132,255,0.1);border:1px solid rgba(10,132,255,0.3);padding:14px 16px;border-radius:8px;overflow-x:auto}
pre code{background:none;padding:0}
table{width:100%;border-collapse:collapse;margin:18px 0;font-size:15px}
th,td{border:0.5px solid rgba(255,255,255,0.15);padding:9px 12px;text-align:left}
th{background:rgba(10,132,255,0.15)}
strong{color:#fff}
hr{border:0;border-top:1px solid rgba(255,255,255,0.1);margin:36px 0}
.dl{position:fixed;bottom:0;left:0;right:0;background:rgba(20,20,22,0.95);backdrop-filter:blur(20px);border-top:0.5px solid rgba(255,255,255,0.15);padding:14px;text-align:center}
.dl a{color:#0A84FF;font-weight:600;text-decoration:none;font-size:16px;margin:0 14px}
</style></head><body>
''' + body + '''
<div class="dl"><a href="体验课逐字讲稿.md" download>下载 Markdown 原文</a><a href="体验课逐字讲稿.zip" download>下载 ZIP</a></div>
</body></html>'''
open('/root/mantai-course/index.html','w',encoding='utf-8').write(html)
print('html written', len(html))
