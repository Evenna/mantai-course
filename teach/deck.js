// ===== 图片自动回退：优先 png(抠图) → jpg → svg 占位 =====
function applyBg(el, name){
  // 直接图片路径（含 / 或扩展名）：直接用，不做 assets/ 回退
  if(/\//.test(name) || /\.(jpg|jpeg|png|webp|svg)$/i.test(name)){
    el.style.backgroundImage = `url("${name}")`; return;
  }
  const svg = `assets/${name}.svg`, jpg = `assets/${name}.jpg`, png = `assets/${name}.png`;
  el.style.backgroundImage = `url("${svg}")`;
  const pp = new Image();
  pp.onload = ()=>{ el.style.backgroundImage = `url("${png}")`; };
  pp.onerror = ()=>{ const pr = new Image(); pr.onload = ()=>{ el.style.backgroundImage = `url("${jpg}")`; }; pr.src = jpg; };
  pp.src = png;
}

const slides = [];

// ===== 图标库：统一 24×24 线性描边，继承 currentColor =====
function ic(p, o){ o=o||{}; return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${o.w||1.6}" stroke-linecap="round" stroke-linejoin="round" ${o.fill?'':''}>${p}</svg>`; }
const I = {
  // 安装 · 下载盒
  install: ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>'),
  // 拼图 · Skill
  puzzle: ic('<path d="M10 4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H6v-4a2 2 0 1 1 0-4V4z"/>'),
  // 闪电 · 提效
  bolt: ic('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
  // 火箭 · Future Design
  rocket: ic('<path d="M12 2c3 1 6 4 6 9a10 10 0 0 1-2 6l-4 1-4-1a10 10 0 0 1-2-6c0-5 3-8 6-9z"/><circle cx="12" cy="9" r="1.8"/><path d="M8 17c-1.5.5-2.5 2-2.5 4 2 0 3.5-1 4-2.5M16 17c1.5.5 2.5 2 2.5 4-2 0-3.5-1-4-2.5"/>'),
  // 奖杯 · 案例
  trophy: ic('<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/><path d="M10 13.5v3M14 13.5v3M8 20h8M9 20v-1.5h6V20"/>'),
  // 小红书 · 书本
  book: ic('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/><path d="M9 7h6M9 10h4"/>'),
  // 抖音 · 影片
  film: ic('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/>'),
  // 搜索
  search: ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
  // 多模态 · 图像+火花
  image: ic('<rect x="3" y="4" width="14" height="14" rx="2"/><circle cx="8" cy="9" r="1.6"/><path d="M3 15l4-3 4 3 3-2 3 2"/><path d="M19 3v4M17 5h4" stroke-width="1.4"/>'),
  // 说话 · 沟通
  chat: ic('<path d="M4 5h16v11H9l-4 4z"/><path d="M8 9h8M8 12h5"/>'),
  // 记忆 · 大脑
  brain: ic('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 4 3 3 0 0 0 5 1V4.5A2.5 2.5 0 0 0 9 4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 4 3 3 0 0 1-5 1"/>'),
  // 图钉 · 沉淀
  pin: ic('<path d="M12 3l4 4-2 1 1 6-3-3-5 5v-6l-3-1 4-4z" transform="rotate(0 12 12)"/><path d="M9 15l-4 4"/>'),
  // 信号 · 天线
  signal: ic('<path d="M5 7a9 9 0 0 0 0 10M8 9.5a5 5 0 0 0 0 5M19 7a9 9 0 0 1 0 10M16 9.5a5 5 0 0 1 0 5"/><circle cx="12" cy="12" r="1.6"/><path d="M12 13.5V21"/>'),
  // 卡片 · 原型卡
  card: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 12h8M7 15h4"/>'),
  // 报纸 · 明日头条
  news: ic('<path d="M4 5h13v14H5a1 1 0 0 1-1-1z"/><path d="M17 8h3v9a2 2 0 0 1-2 2"/><path d="M7 8h6M7 11h6M7 14h4"/>'),
  // 画框 · 概念图
  frame: ic('<rect x="3" y="4" width="18" height="14" rx="1.5"/><path d="M3 14l5-4 4 3 3-2 6 4"/><circle cx="8.5" cy="8.5" r="1.4"/><path d="M9 21h6"/>'),
  // 案例占位图标
  gyro: ic('<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3"/><ellipse cx="12" cy="12" rx="3" ry="8"/>', {w:1.3}),
  flame: ic('<path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-4 1 1 2 1 2 0 0-1.5-.5-2.5 1-4z"/>'),
  orbit: ic('<circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)"/><circle cx="20" cy="8" r="1.2"/>', {w:1.3}),
  check: ic('<path d="M20 6 9 17l-5-5"/>'),
  layers: ic('<path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5M3 8v5m18-5v5"/>'),
  target: ic('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>'),
  sparkle: ic('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),
  clock: ic('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
  users: ic('<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.7"/>'),
  globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'),
  wand: ic('<path d="M15 4V2M15 10V8M11 6h2M17 6h2"/><path d="M6 20 18 8l-2-2L4 18z"/>'),
  gear: ic('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
  folder: ic('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  compass: ic('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z"/>'),
  map: ic('<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
};

// ===== 1 封面 =====
slides.push({bg:"img/cover.jpg", bgcls:"left", html:`
  <div class="inner" style="align-items:flex-start;text-align:left">
    <div class="kicker anim">曼塔 AI × FUTURE DESIGN LAB · 实战教学</div>
    <h1 class="anim">用 Hermes Agent<br>把「未来设计」项目做出来</h1>
    <div class="rule anim"></div>
    <p class="lead anim">这节课不讲概念——从<b>安装、配置</b>，到装好一套<b>基础技能</b>把 Agent 玩起来，<br>再用 <span class="hl-g">Future Design 专属 Skill</span> 一步步把我们的<span class="hl">太空艺术设计项目</span>真正做出来。</p>
    <p class="sub anim">全程使用 Hermes Agent（不再用 Codex），与体验课完全一致，一套工具走到底。</p>
    <div class="metarow anim">
      <span class="chip">${I.clock}<b>约 90 分钟</b>&nbsp;实战工作坊</span>
      <span class="chip">${I.layers}<b>5 阶段</b>&nbsp;从装机到交付</span>
      <span class="chip">${I.rocket}<b>1 个真实项目</b>&nbsp;太空艺术设计</span>
      <span class="chip">${I.check}&nbsp;零基础可跟</span>
    </div>
  </div>`});

// ===== 2 今天的路线图 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">今天怎么走 · 5 个阶段</div>
    <h2 class="anim">从装好工具，到交出一个完整项目</h2>
    <div class="roadmap anim">
      <div class="rstep"><div class="ri">${I.install}</div><div class="rn">STEP 01</div><div class="rt">安装 & 配置</div><div class="rd">装好 Hermes，接上模型，第一句话就能对话。</div></div>
      <div class="rstep"><div class="ri">${I.puzzle}</div><div class="rn">STEP 02</div><div class="rt">基础 Skill</div><div class="rd">小红书 / 抖音 / 搜索 / 多模态，先把 Agent 玩起来。</div></div>
      <div class="rstep"><div class="ri">${I.bolt}</div><div class="rn">STEP 03</div><div class="rt">用它提效</div><div class="rd">把重复的活交出去，理解 Agent 怎么帮你干活。</div></div>
      <div class="rstep"><div class="ri">${I.rocket}</div><div class="rn">STEP 04</div><div class="rt">Future Design Skill</div><div class="rd">安装专属技能，用方法链把项目做出来。</div></div>
      <div class="rstep"><div class="ri">${I.trophy}</div><div class="rn">STEP 05</div><div class="rt">案例 & 收尾</div><div class="rd">看优秀作品长什么样，明确你的产出。</div></div>
    </div>
    <p class="sub anim">先把 Agent 变成顺手的工具，再让它成为你做项目的「共创搭档」。</p>
  </div>`});

// ===== 3 章节 01 =====
slides.push({bg:"img/ch1.jpg", bgcls:"left", html:`
  <div class="chapter rich">
    <div class="cleft">
      <div class="cnum anim">01</div>
      <div class="clabel anim">Install & Configure</div>
      <h2 class="anim">安装 & 配置 Hermes Agent</h2>
      <p class="lead anim">先把工具装好、把「大脑」接上——这一步过了，后面全是玩。</p>
      <div class="ctrail anim"><span class="on">01 安装配置</span><span>02 基础 Skill</span><span>03 用它提效</span><span>04 项目 Skill</span><span>05 案例收尾</span></div>
    </div>
    <div class="chwill anim">
      <div class="wt">本章你会拿到</div>
      <ul>
        <li><span class="k">${I.install}</span><div>一条命令<b>装好 Hermes</b>，本机就有了 AI Agent</div></li>
        <li><span class="k">${I.gear}</span><div>接上模型，<b>用曼塔一个入口</b>，不翻墙不办会员</div></li>
        <li><span class="k">${I.chat}</span><div>第一句对话就能跑通，<b>确认环境 OK</b></div></li>
      </ul>
    </div>
  </div>`});

// ===== 4 安装 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">STEP 01 · 装上它</div>
    <h2 class="anim">一条命令，把 Hermes 装进电脑</h2>
    <p class="lead anim">Hermes 是我们全程要用的 AI Agent。安装很简单，跟着敲就行——装完，你就有了一个能听懂人话、还能动手干活的助手。</p>
    <div class="term anim">
      <div class="bar"><i class="r"></i><i class="y"></i><i class="g"></i><span class="ttl">terminal — 安装 Hermes Agent</span></div>
      <pre><span class="cmt"># 1. 安装（macOS / Linux，一行搞定）</span>
<span class="prm">$</span> <span class="cmd">curl -fsSL https://hermes-agent.nousresearch.com/install.sh | sh</span>

<span class="cmt"># 2. 启动，进入对话</span>
<span class="prm">$</span> <span class="cmd">hermes</span>
<span class="out">✓ Hermes Agent 已就绪，输入你的第一句话开始对话。</span></pre>
    </div>
    <div class="callout warn anim"><div class="ci">${I.check}</div><div class="cx">装不上不要慌——现场老师会<b>一个个帮你过</b>，绝不让任何人卡在第一步。</div></div>
  </div>`});

// ===== 5 配置 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">STEP 01 · 接上大脑</div>
    <h2 class="anim">配置模型，让 Agent 真正「聪明」起来</h2>
    <p class="lead anim">Agent 的能力来自背后的大模型。配置这一步，就是把最新最强的模型接进来——用曼塔的工具，<b>不用翻墙、不用一堆会员、一个入口全都有</b>。</p>
    <div class="rows anim">
      <div class="row"><div class="rn">1</div><div class="rb"><h4>填入 API</h4><p>运行 <code>hermes setup</code>，把曼塔提供的模型服务地址和 Key 填进去。</p></div></div>
      <div class="row"><div class="rn">2</div><div class="rb"><h4>选模型</h4><p>用 <code>hermes config</code> 选默认模型，哪个强用哪个，随时一键切换。</p></div></div>
      <div class="row"><div class="rn">3</div><div class="rb"><h4>验证</h4><p>回到对话里问一句「你好，你现在用的什么模型？」，能答上来就通了。</p></div></div>
    </div>
    <div class="callout anim"><div class="ci">${I.gear}</div><div class="cx">一次配好，<b>永久生效</b>——之后每次打开 Hermes 都直接可用，不用重复设置。</div></div>
  </div>`});

// ===== 6 章节 02 =====
slides.push({bg:"img/ch2.jpg", bgcls:"left", html:`
  <div class="chapter rich">
    <div class="cleft">
      <div class="cnum anim">02</div>
      <div class="clabel anim">Base Skills</div>
      <h2 class="anim">装几个基础 Skill，把 Agent 玩起来</h2>
      <p class="lead anim">Skill = 给 Agent 装上的「专业技能包」。装上就能用，先玩几个高频的，建立手感。</p>
      <div class="ctrail anim"><span>01 安装配置</span><span class="on">02 基础 Skill</span><span>03 用它提效</span><span>04 项目 Skill</span><span>05 案例收尾</span></div>
    </div>
    <div class="chwill anim">
      <div class="wt">这章要玩的四个 Skill</div>
      <ul>
        <li><span class="k">${I.book}</span><div><b>小红书</b>：选题、爆款标题、文案配图一条龙</div></li>
        <li><span class="k">${I.film}</span><div><b>抖音</b>：对标拆解、脚本分镜、口播文案</div></li>
        <li><span class="k">${I.search}</span><div><b>Web Search</b>：实时联网，抓资料整理成表</div></li>
        <li><span class="k">${I.image}</span><div><b>多模态生成</b>：一句话文生图 / 图生视频</div></li>
      </ul>
    </div>
  </div>`});

// ===== 7 Skill 是什么 & 怎么装 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">先搞懂 · Skill 是什么</div>
    <h2 class="anim">一个 Skill，就是一套「干好某类活」的现成能力</h2>
    <p class="lead anim">写小红书、剪视频、查资料、生成图片……每一样都有对应的 Skill。<b>安装 = 一句话的事</b>，装完 Agent 在对话里就会自动调用它。</p>
    <div class="term anim">
      <div class="bar"><i class="r"></i><i class="y"></i><i class="g"></i><span class="ttl">在对话里安装 Skill</span></div>
      <pre><span class="cmt"># 在 Hermes 对话里直接说人话即可：</span>
<span class="prm">你 ›</span> <span class="cmd">帮我安装小红书 skill</span>
<span class="out">✓ 正在从技能市场安装 xiaohongshu ... 完成，现在我能帮你做小红书选题、文案和配图了。</span>

<span class="cmt"># 或指定技能市场地址一键安装</span>
<span class="prm">你 ›</span> <span class="cmd">用 npx skills add &lt;技能包地址&gt; 装上这个 skill</span></pre>
    </div>
    <div class="howflow anim">
      <div class="hf"><div class="hfi">${I.install}</div><h5>装</h5><p>一句话安装，技能进入 Agent</p></div>
      <div class="hfa">→</div>
      <div class="hf"><div class="hfi">${I.chat}</div><h5>说</h5><p>用大白话下达你的需求</p></div>
      <div class="hfa">→</div>
      <div class="hf"><div class="hfi">${I.check}</div><h5>干</h5><p>Agent 自动调用技能交付成果</p></div>
    </div>
  </div>`});

// ===== 8 四个基础 Skill =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">先装这四个 · 覆盖最高频的场景</div>
    <h2 class="anim">四个基础 Skill，先把 Agent 用起来</h2>
    <div class="skgrid g4 anim">
      <div class="skcard"><div class="skic">${I.book}</div><div class="sktag">内容运营</div><h4>小红书 Skill</h4><p>选题、爆款标题、正文文案、配图一条龙，套账号风格直接产出。</p></div>
      <div class="skcard"><div class="skic">${I.film}</div><div class="sktag">短视频</div><h4>抖音 Skill</h4><p>对标拆解、脚本分镜、口播文案，把一个选题拆成能直接拍的脚本。</p></div>
      <div class="skcard"><div class="skic">${I.search}</div><div class="sktag">搜索检索</div><h4>Web Search Skill</h4><p>实时联网搜索、读取网页/公众号/链接，把资料抓回来整理成你要的样子。</p></div>
      <div class="skcard"><div class="skic">${I.image}</div><div class="sktag">多模态</div><h4>多模态生成 Skill</h4><p>一句话文生图、图生视频。做海报、做封面、做概念图，素材自己产。</p></div>
    </div>
    <p class="sub anim">这四个装好，你就能感受到：Agent 不只是聊天，它能<b>真的动手帮你产出东西</b>。</p>
  </div>`});

// ===== 9 基础 Skill 用法示范 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">怎么用 · 都是一句话的事</div>
    <h2 class="anim">装好之后，你只管说人话</h2>
    <div class="skgrid anim">
      <div class="skcard"><div class="sktag">小红书</div><h4>让它产出一篇笔记</h4><div class="ex">"帮我写一篇关于宿舍收纳的小红书，要爆款标题 + 5 个要点 + 配图建议"</div></div>
      <div class="skcard"><div class="sktag">Web Search</div><h4>让它查最新资料</h4><div class="ex">"搜一下今年火星栖居的最新研究，整理 5 条要点给我"</div></div>
      <div class="skcard"><div class="sktag">抖音</div><h4>让它写口播脚本</h4><div class="ex">"把这个选题写成一条 30 秒抖音口播脚本，带分镜"</div></div>
      <div class="skcard"><div class="sktag">多模态生成</div><h4>让它出图出片</h4><div class="ex">"用 generate-multimodal-media 生成一张未来太空舱内部的概念图"</div></div>
    </div>
    <div class="callout anim"><div class="ci">${I.sparkle}</div><div class="cx">要点只有一个：<b>把「要什么」说清楚</b>——主题、风格、篇幅、格式。说得越具体，产出越接近你要的样子。</div></div>
  </div>`});

// ===== 10 章节 03 =====
slides.push({bg:"img/ch3.jpg", bgcls:"left", html:`
  <div class="chapter rich">
    <div class="cleft">
      <div class="cnum anim">03</div>
      <div class="clabel anim">Work Smarter</div>
      <h2 class="anim">懂得用 Agent 给工作提效</h2>
      <p class="lead anim">工具会用了，关键是转变思路——把「自己一步步做」变成「交代清楚、让它替你做」。</p>
      <div class="ctrail anim"><span>01 安装配置</span><span>02 基础 Skill</span><span class="on">03 用它提效</span><span>04 项目 Skill</span><span>05 案例收尾</span></div>
    </div>
    <div class="chwill anim">
      <div class="wt">这章要建立的心法</div>
      <ul>
        <li><span class="k">${I.chat}</span><div>把任务<b>说清楚</b>，输出就稳、少返工</div></li>
        <li><span class="k">${I.puzzle}</span><div>把多个 Skill <b>串成一条链</b>，一次跑完一整件事</div></li>
        <li><span class="k">${I.brain}</span><div>让它<b>记住你的偏好</b>，不用每次重头交代</div></li>
        <li><span class="k">${I.pin}</span><div>跑通的流程<b>沉淀成 Skill</b>，同类活一键复用</div></li>
      </ul>
    </div>
  </div>`});

// ===== 11 思路转变 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">核心心法 · 换个方式干活</div>
    <h2 class="anim">从「自己动手」到「把活派出去」</h2>
    <div class="vs anim">
      <div class="col pain"><h4>过去的你</h4>
        <ul>
          <li>查资料：一个个网页翻，复制粘贴半小时</li>
          <li>做文案：对着空白文档发呆</li>
          <li>找素材：全网搜图、抠图、拼</li>
          <li>重复的活：每次都从头再来一遍</li>
        </ul></div>
      <div class="col fix"><h4>用 Agent 之后</h4>
        <ul>
          <li>一句话让它<b>搜完、读完、整理成表格</b>给你</li>
          <li>把要求说清楚，<b>初稿它先出</b>，你只改</li>
          <li>直接<b>让它生成</b>，要什么风格说什么风格</li>
          <li>沉淀成 Skill，<b>同类活一键复用</b></li>
        </ul></div>
    </div>
    <p class="sub anim">你的价值从「执行」上移到「判断和把关」——这就是提效的本质。</p>
  </div>`});

// ===== 12 提效的关键动作 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">四个动作 · 让 Agent 越用越顺手</div>
    <h2 class="anim">把它变成真正帮你干活的助手</h2>
    <div class="feats anim">
      <div class="feat"><div class="ic">${I.chat}</div><div class="ft">把任务说清楚</div><div class="fd">目标、要求、格式讲明白，Agent 输出就稳、就少返工。</div></div>
      <div class="feat"><div class="ic">${I.puzzle}</div><div class="ft">组合多个 Skill</div><div class="fd">搜索 + 文案 + 生图串起来，一条链子跑完一整件事。</div></div>
      <div class="feat"><div class="ic">${I.brain}</div><div class="ft">让它记住你</div><div class="fd">偏好、项目背景记进记忆，不用每次重头交代。</div></div>
      <div class="feat"><div class="ic">${I.pin}</div><div class="ft">沉淀成 Skill</div><div class="fd">跑通的流程存下来，下次同类活直接一键复用。</div></div>
    </div>
    <p class="sub anim">掌握了提效，接下来我们就把这套本事，用到今天真正的主角——<b>Future Design 项目</b>上。</p>
  </div>`});

// ===== 13 章节 04 =====
slides.push({bg:"img/ch4.jpg", bgcls:"left", html:`
  <div class="chapter rich">
    <div class="cleft">
      <div class="cnum anim">04</div>
      <div class="clabel anim">Future Design Skill</div>
      <h2 class="anim">重点来了：Future Design 专属 Skill</h2>
      <p class="lead anim">前面都是热身。这一章，我们用一套专门的技能，把今天的<b>太空艺术设计项目</b>真正做出来。</p>
      <div class="ctrail anim"><span>01 安装配置</span><span>02 基础 Skill</span><span>03 用它提效</span><span class="on">04 项目 Skill</span><span>05 案例收尾</span></div>
    </div>
    <div class="chwill anim">
      <div class="wt">本章带你走完</div>
      <ul>
        <li><span class="k">${I.install}</span><div>一句话<b>装上 Future Design Skill</b>（全程 Hermes）</div></li>
        <li><span class="k">${I.compass}</span><div>认识内置的<b>六步设计方法链</b></div></li>
        <li><span class="k">${I.chat}</span><div>跟 Agent 对话，<b>把方法链跑一遍</b></div></li>
        <li><span class="k">${I.frame}</span><div>产出<b>你自己的太空设计提案</b></div></li>
      </ul>
    </div>
  </div>`});

// ===== 14 安装 Future Design Skill =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">第一步 · 装上专属技能</div>
    <h2 class="anim">安装 Future Design Skill</h2>
    <p class="lead anim">和基础 Skill 一样一句话就能装。<b>注意：这套技能全程用 Hermes，不再教 Codex</b>——和前面的操作完全一致，无缝衔接。</p>
    <div class="term anim">
      <div class="bar"><i class="r"></i><i class="y"></i><i class="g"></i><span class="ttl">安装 Future Design Skill</span></div>
      <pre><span class="cmt"># 打开安装页拿到技能地址：future-design-lab.github.io/tools/skill-install.html</span>
<span class="prm">你 ›</span> <span class="cmd">帮我安装 future design 的 skill</span>
<span class="out">✓ 已安装 future-design 技能包。现在我能带你走完
  未来信号 → 解读 → 原型卡 → 明日头条 → 回溯路线图 的完整设计流程。</span></pre>
    </div>
    <div class="callout anim"><div class="ci">${I.check}</div><div class="cx">装完之后，Agent 就变成了你的<b>「未来设计共创搭档」</b>——和前面的操作零切换，全程陪你把项目做完。</div></div>
  </div>`});

// ===== 15 项目引入 =====
slides.push({bg:"img/project.jpg", html:`
  <div class="inner">
    <div class="kicker anim">今天的项目 · 我们要做什么</div>
    <h2 class="anim">国际太空艺术设计共创营</h2>
    <p class="lead anim">这不是练习题——是一个真实的国际共创项目。你要用刚学会的 Agent，产出一份属于自己的<b>未来太空设计提案</b>。</p>
    <div class="stats anim">
      <div class="stat"><div class="num">6</div><div class="lab">创作赛道</div><div class="sd">具身 / 文化 / 时间 / 生态…</div></div>
      <div class="stat"><div class="num">6</div><div class="lab">导师带队</div><div class="sd">跨学科专家全程点评</div></div>
      <div class="stat"><div class="num">18+</div><div class="lab">国家 / 地区</div><div class="sd">全球同侪一起共创</div></div>
      <div class="stat"><div class="num">30+</div><div class="lab">参与院校</div><div class="sd">艺术 / 设计 / 科技交叉</div></div>
    </div>
    <div class="phases anim">
      <span class="ph">① 知识输入 Knowledge</span><span class="arr">→</span>
      <span class="ph">② 共创设计 Co-creation</span><span class="arr">→</span>
      <span class="ph">③ 展览呈现 Exhibition</span><span class="arr">→</span>
      <span class="ph">④ 验证迭代 Validation</span>
    </div>
  </div>`});

// ===== 16 方法链 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">Future Design Skill · 内置的设计方法链</div>
    <h2 class="anim">一条链子，把「未来」一步步推导出来</h2>
    <p class="lead anim">这套 Skill 不是替你想，而是<b>带着你想</b>——每一步 Agent 都会引导你产出一份成果，环环相扣。</p>
    <div class="chain anim">
      <div class="clink"><div class="cst">01</div><div class="ctt">未来信号</div><div class="cdd">Future Signals：捕捉正在冒头的变化</div></div>
      <div class="carr">→</div>
      <div class="clink"><div class="cst">02</div><div class="ctt">STEEP 分析</div><div class="cdd">社会/科技/经济/环境/政治 五维扫描</div></div>
      <div class="carr">→</div>
      <div class="clink"><div class="cst">03</div><div class="ctt">本地挑战</div><div class="cdd">把宏大信号，落到一个具体问题</div></div>
      <div class="carr">→</div>
      <div class="clink"><div class="cst">04</div><div class="ctt">Interpretation</div><div class="cdd">解读：这意味着什么、机会在哪</div></div>
      <div class="carr">→</div>
      <div class="clink"><div class="cst">05</div><div class="ctt">明日头条</div><div class="cdd">Tomorrow Headline：写下未来的新闻</div></div>
      <div class="carr">→</div>
      <div class="clink"><div class="cst">06</div><div class="ctt">回溯路线图</div><div class="cdd">Backcasting：从未来倒推今天怎么做</div></div>
    </div>
    <div class="legend anim">
      <span><i style="background:var(--blue)"></i>发散：捕捉信号、多维扫描</span>
      <span><i style="background:var(--yellow)"></i>聚焦：落到本地挑战与解读</span>
      <span><i style="background:var(--pink)"></i>成形：头条叙事 + 回溯行动</span>
    </div>
    <p class="sub anim">你只需要对话，Agent 用这条链把你的灵感，变成一份有逻辑、有结构的设计提案。</p>
  </div>`});

// ===== 17 用 Skill 完成项目 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">实操 · 用这套 Skill 把项目做出来</div>
    <h2 class="anim">你只管对话，它带你走完全流程</h2>
    <div class="annot anim">
      <div class="term tall">
        <div class="bar"><i class="r"></i><i class="y"></i><i class="g"></i><span class="ttl">Hermes · Future Design 共创</span></div>
        <pre><span class="prm">你 ›</span> <span class="cmd">我选「新太空仪式感物件」赛道，用 future design skill 带我开始</span>
<span class="out">✓ 好，先做未来信号扫描。你观察到哪些跟「太空生活」相关的新变化？</span>
<span class="prm">你 ›</span> <span class="cmd">长期驻留太空的人，会想念地球上的节日和仪式……</span>
<span class="out">✓ 很好，这是一个强信号。我用 STEEP 帮你展开 →
  定位本地挑战 → 生成 Interpretation → 写一条 2045 的明日头条 →
  再用 Backcasting 倒推出你现在该设计什么物件。</span>
<span class="prm">你 ›</span> <span class="cmd">再用 generate-multimodal-media 把这个物件画出来</span>
<span class="out">✓ 已生成概念图 + 30 秒展示视频，可直接放进你的提案。</span></pre>
      </div>
      <div class="asteps">
        <div class="as"><div class="asn">对话即操作</div><h5>你说人话，它做事</h5><p>不用记命令，选个赛道、描述你的观察就行。</p></div>
        <div class="as"><div class="asn">方法内置</div><h5>它替你套流程</h5><p>STEEP、Backcasting 这些方法，Agent 自动带你走。</p></div>
        <div class="as"><div class="asn">一站到底</div><h5>顺手出图出片</h5><p>调基础 Skill 生成视觉，提案当场就有画面。</p></div>
      </div>
    </div>
  </div>`});

// ===== 18 你会产出什么 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">这节课结束时 · 你手里会有</div>
    <h2 class="anim">一份完整、能拿去展览的设计提案</h2>
    <div class="skgrid g4 anim">
      <div class="skcard"><span class="qn">01</span><div class="skic">${I.signal}</div><h4>未来信号 & 解读</h4><p>一份结构化的趋势判断，说清「为什么是它」。</p></div>
      <div class="skcard"><span class="qn">02</span><div class="skic">${I.card}</div><h4>原型卡 Prototyping Card</h4><p>你的核心设计概念，一张卡讲清楚。</p></div>
      <div class="skcard"><span class="qn">03</span><div class="skic">${I.news}</div><h4>明日头条</h4><p>一句话把观众带进你设想的未来场景。</p></div>
      <div class="skcard"><span class="qn">04</span><div class="skic">${I.frame}</div><h4>概念图 & 视频</h4><p>AI 生成的视觉素材，提案立刻有画面。</p></div>
    </div>
    <div class="callout anim"><div class="ci">${I.check}</div><div class="cx">四份成果拼在一起，就是一份<b>能展示、能答辩、能落地</b>的完整提案——不用另外排版。</div></div>
  </div>`});

// ===== 19 章节 05 =====
slides.push({bg:"img/ch5.jpg", bgcls:"left", html:`
  <div class="chapter rich">
    <div class="cleft">
      <div class="cnum anim">05</div>
      <div class="clabel anim">Showcase & Wrap-up</div>
      <h2 class="anim">优秀案例 & 收尾</h2>
      <p class="lead anim">看看往届和同侪做出了什么，找到你的方向，然后——开始动手。</p>
      <div class="ctrail anim"><span>01 安装配置</span><span>02 基础 Skill</span><span>03 用它提效</span><span>04 项目 Skill</span><span class="on">05 案例收尾</span></div>
    </div>
    <div class="chwill anim">
      <div class="wt">这章会看到</div>
      <ul>
        <li><span class="k">${I.trophy}</span><div>三个不同赛道的<b>代表作拆解</b></div></li>
        <li><span class="k">${I.compass}</span><div>它们<b>怎么用同一条方法链</b>做出来的</div></li>
        <li><span class="k">${I.rocket}</span><div>把今天所学<b>收进口袋，立刻开工</b></div></li>
      </ul>
    </div>
  </div>`});

// ===== 20 案例展示 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">优秀案例 · 四大方向的代表作</div>
    <h2 class="anim">别人用同样的流程，做出了这些</h2>
    <div class="cases anim">
      <div class="ccard"><div class="cimg" data-bg="img/case1.jpg"><span class="cbadge">赛道 · 具身体验</span></div><div class="cbody"><div class="ctag">具身体验 · 交互设计</div><h4>零重力下的身体与感知</h4><p>把失重的空间体验，转译成可交互的装置。</p><div class="cmeta"><div><b>2043</b>明日头条</div><div><b>4 步</b>方法链推导</div></div></div></div>
      <div class="ccard"><div class="cimg" data-bg="img/case2.jpg"><span class="cbadge">赛道 · 文化结构</span></div><div class="cbody"><div class="ctag">文化结构 · 仪式演化</div><h4>太空里的新节日</h4><p>脱离地球后，人类如何重建仪式与归属感。</p><div class="cmeta"><div><b>2050</b>明日头条</div><div><b>装置+影像</b>成果形态</div></div></div></div>
      <div class="ccard"><div class="cimg" data-bg="img/case3.jpg"><span class="cbadge">赛道 · 时间重构</span></div><div class="cbody"><div class="ctag">时间重构 · 情感连接</div><h4>跨越光年的思念</h4><p>当通讯有延迟，情感如何被重新设计与承载。</p><div class="cmeta"><div><b>2060</b>明日头条</div><div><b>物件+仪式</b>成果形态</div></div></div></div>
    </div>
    <p class="sub anim">它们都从一个小小的「未来信号」开始——你的起点，和他们完全一样。</p>
  </div>`});

// ===== 21 现在开始 =====
slides.push({bg:"", html:`
  <div class="inner">
    <div class="kicker anim">现在 · 轮到你了</div>
    <h2 class="anim">今天的三步，收进口袋</h2>
    <div class="recap anim">
      <div class="rc"><div class="rcn">1</div><div class="rcb"><h4>装好、配好</h4><p>Hermes + 基础 Skill，Agent 已经能帮你干活。</p></div></div>
      <div class="rc"><div class="rcn">2</div><div class="rcb"><h4>装上 Future Design Skill</h4><p>全程用 Hermes，一句话开始你的设计流程。</p></div></div>
      <div class="rc"><div class="rcn">3</div><div class="rcb"><h4>产出你的提案</h4><p>沿着方法链走一遍，交出属于你的太空设计。</p></div></div>
    </div>
    <p class="lead anim" style="margin-top:2vh">别只是听——<b>现在就打开 Hermes，敲下你的第一句话。</b></p>
  </div>`});

// ===== 22 结束页 =====
slides.push({bg:"img/ch5.jpg", bgcls:"end", html:`
  <div class="inner" style="text-align:center;align-items:center">
    <div class="kicker anim">FUTURE DESIGN LAB · SPACE CAMP</div>
    <h1 class="anim" style="font-size:6vw">开始你的<span class="hl-g">未来设计</span></h1>
    <div class="rule anim" style="margin:2.4vh auto"></div>
    <p class="lead anim">工具已经在你手里，方法已经讲清。<br>剩下的，是把你脑子里的未来，做出来。</p>
    <p class="sub anim" style="margin-top:3vh">曼塔 AI × Future Design Lab · Powered by Manta AI &nbsp;·&nbsp; 用 Hermes Agent 一起共创</p>
  </div>`});

// ===== 渲染 =====
function render(){
  const deck = document.getElementById("deck");
  deck.innerHTML = "";
  slides.forEach((s)=>{
    const el = document.createElement("section");
    el.className = "slide";
    const bg = document.createElement("div");
    bg.className = "bg" + (s.bgcls ? " "+s.bgcls : "");
    el.appendChild(bg);
    const noise = document.createElement("div"); noise.className="noise"; el.appendChild(noise);
    const wrap = document.createElement("div"); wrap.innerHTML = s.html;
    while(wrap.firstChild) el.appendChild(wrap.firstChild);
    deck.appendChild(el);
    if(s.bg) applyBg(bg, s.bg);
    el.querySelectorAll("[data-bg]").forEach(d=>applyBg(d, d.dataset.bg));
  });
  boot();
}
let secs = [], idx = 0, pager, prog;
function show(n){
  idx = Math.max(0, Math.min(secs.length-1, n));
  secs.forEach((s,i)=>s.classList.toggle("active", i===idx));
  pager.textContent = String(idx+1).padStart(2,"0")+" / "+String(secs.length).padStart(2,"0");
  prog.style.width = ((idx+1)/secs.length*100)+"%";
}
function boot(){
  secs = [...document.querySelectorAll(".slide")];
  pager = document.getElementById("pager");
  prog = document.getElementById("prog");
  window.show = show;
  document.getElementById("next").onclick=()=>show(idx+1);
  document.getElementById("prev").onclick=()=>show(idx-1);
  document.addEventListener("keydown",e=>{
    if(["ArrowRight","ArrowDown"," ","PageDown"].includes(e.key)){e.preventDefault();show(idx+1);}
    else if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key)){e.preventDefault();show(idx-1);}
    else if(e.key==="Home")show(0); else if(e.key==="End")show(secs.length-1);
    else if(e.key==="f"||e.key==="F"){if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen();}
  });
  show(0);
}

// ===== 启动 =====
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", render);
else render();
