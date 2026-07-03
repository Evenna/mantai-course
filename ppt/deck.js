// ===== 图片自动回退：优先 assets/xxx.jpg，无则用 assets/xxx.svg =====
// 用户生成真图后命名 .jpg 丢进 assets/ 即自动替换，无需改代码。
function bgImg(name){
  // 返回一个占位背景，随后异步探测 jpg 是否存在
  return name; // 具体在下方 applyBg 处理
}
function applyBg(el, name, cls){
  const svg = `assets/${name}.svg`;
  const jpg = `assets/${name}.jpg`;
  el.style.backgroundImage = `url("${svg}")`;
  const probe = new Image();
  probe.onload = ()=>{ el.style.backgroundImage = `url("${jpg}")`; };
  probe.src = jpg;
}

// ===== 幻灯片内容 =====
const slides = [

// 1 封面
{bg:"cover", html:`
  <div class="inner" style="align-items:flex-start;text-align:left">
    <div class="kicker anim">曼塔 AI · AGENT 体验课 <span class="dot">●</span> 第三部分</div>
    <h1 class="anim">我们是谁<br>凭什么带你，学了能干嘛</h1>
    <div class="rule anim"></div>
    <p class="lead anim">名校大厂背书 · 真实变现出口 · 自研工具护航<br>——这一节，把底牌全亮给你看。</p>
  </div>`},

// 2 团队总览
{bg:"team-bg", html:`
  <div class="inner">
    <div class="kicker anim">我们的主讲团队</div>
    <h2 class="anim">一线大厂算法 × 最前沿产品 × 清华学术底子</h2>
    <p class="lead anim" style="margin-bottom:2vw">网上教 AI 的一抓一大把，凭啥跟我们学？不整虚的，一样一样说清楚。</p>
    <div class="grid3 anim">
      <div class="card tcard"><div class="ph" data-bg="teacher-1"></div>
        <div class="role">前腾讯 · AI 算法工程师</div>
        <div class="name">大规模算法落地</div>
        <div class="desc">跑过上亿用户体量的 AI 系统，国内最早把大模型用进实际业务的人之一。把复杂原理讲成你一学就会用的东西。</div></div>
      <div class="card tcard"><div class="ph" data-bg="teacher-2"></div>
        <div class="role">前腾讯 · AI 算法工程师</div>
        <div class="name">生成式 & 多模态</div>
        <div class="desc">深耕生成式 AI，参与多个大模型产品 0→1，开源项目贡献者。带你玩透生图、生视频、自动化工作流。</div></div>
      <div class="card tcard"><div class="ph" data-bg="teacher-3"></div>
        <div class="role">前字节 · Seed AI 产品经理</div>
        <div class="name">清华人机交互 本硕</div>
        <div class="desc">站在国内 AI 最前线看行业走向，最懂怎么让 AI 真正好用、贴合普通人。你学的"怎么跟 AI 打交道"，很多来自他。</div></div>
    </div>
  </div>`},

// 3 老师一特写
{bg:"team-bg", bgcls:"left", html:`
  <div class="spotlight">
    <div class="photo anim" data-bg="teacher-1"></div>
    <div class="body">
      <div class="tag anim">主讲老师 · 01</div>
      <h2 class="anim">前腾讯 AI 算法工程师</h2>
      <p class="lead anim">在腾讯做过<b>大规模推荐算法</b>和<b>大模型应用落地</b>，手上跑过真正<span class="hl">上亿用户体量</span>的 AI 系统，也是国内最早一批把大模型用到实际业务里的人之一。</p>
      <p class="lead anim" style="margin-top:1.2vw">他最擅长的，就是把复杂的 AI 原理，<b>讲成你一听就懂、一学就会用</b>的东西。</p>
    </div>
  </div>`},

// 4 老师二特写
{bg:"team-bg", bgcls:"left", html:`
  <div class="spotlight">
    <div class="photo anim" data-bg="teacher-2"></div>
    <div class="body">
      <div class="tag anim">主讲老师 · 02</div>
      <h2 class="anim">前腾讯 AI 算法工程师</h2>
      <p class="lead anim">深耕<b>生成式 AI 和多模态</b>方向，参与过多个大模型产品从 <span class="hl">0 到 1</span> 的搭建，还是好几个<b>开源 AI 项目的贡献者</b>。</p>
      <p class="lead anim" style="margin-top:1.2vw">他会带你钻进 AI 最前沿的玩法里——<span class="hl-g">生图、生视频、自动化工作流</span>，这些别人还在观望的能力，他早就玩透了。</p>
    </div>
  </div>`},

// 5 老师三特写
{bg:"team-bg", bgcls:"left", html:`
  <div class="spotlight">
    <div class="photo anim" data-bg="teacher-3"></div>
    <div class="body">
      <div class="tag anim">主讲老师 · 03</div>
      <h2 class="anim">前字节 Seed AI 产品经理 · 清华人机交互本硕</h2>
      <p class="lead anim">Seed 是字节最核心的 AI 大模型团队。他在里面做产品，等于<b>站在国内 AI 最前线</b>看这个行业往哪走。</p>
      <p class="lead anim" style="margin-top:1.2vw">加上清华人机交互的本硕背景，他最懂的是——<span class="hl">怎么让 AI 真正好用、真正贴合普通人的需求</span>。你在课里学到的"怎么跟 AI 打交道"的方法论，很多就来自他。</p>
    </div>
  </div>`},

// 6 特邀嘉宾
{bg:"team-bg", bgcls:"left", html:`
  <div class="spotlight">
    <div class="photo anim" data-bg="professor"></div>
    <div class="body">
      <div class="tag anim">特邀嘉宾 · 学术护航</div>
      <h2 class="anim">北京理工大学 教授 · 在线指导</h2>
      <p class="lead anim">教授会在课程里给大家<b>做点评、把关方向</b>。你的学习不只是"跟着老师做"，还有<span class="hl">高校学术层面的指导兜底</span>。</p>
      <p class="lead anim" style="margin-top:1.2vw">这是很多商业课程<b>给不了</b>的——有真正的学术权威，帮你把关方向、给你信心。</p>
    </div>
  </div>`},

// 7 我们的理想
{bg:"mission", html:`
  <div class="inner" style="align-items:flex-start">
    <div class="kicker anim">我们做这件事的初心</div>
    <h2 class="anim">说实话，我们做这门课<br>真不是为了赚多少钱</h2>
    <p class="lead anim">市面同类 AI 课动辄大几千、上万。我们这个价格放进去，说句不夸张的——<span class="hl-g">基本就跟公益课差不多了。</span></p>
    <p class="lead anim" style="margin-top:1.2vw">那图啥？<b>AI 这波浪潮是几十年一遇的风口，我们不想看着对 AI 感兴趣的人，因为没人带、因为门槛，就白白错过。</b></p>
    <p class="lead anim" style="margin-top:1.2vw">我们真心希望每个愿意学的人，都能<span class="hl">真正跟上这波先进生产力</span>——而不是几年后回头才发现"原来那时候上车最好"。</p>
  </div>`},

// 8 变现总览
{bg:"money-1", html:`
  <div class="inner">
    <div class="kicker anim">学会了能干嘛 · 能赚钱，也能拿奖</div>
    <h2 class="anim">别人只教"怎么用"<br>我们除了教，还给你"出口"</h2>
    <p class="lead anim">啥叫出口？就是你学完，我们手里有资源，<b>能帮你把这本事真的变成钱、变成奖。</b></p>
    <div class="paths anim">
      <div class="path card"><div class="n">路径 01</div><h3 class="hl">接活赚钱</h3><p>一单就能把学费赚回来，还倒赚。</p></div>
      <div class="path card"><div class="n">路径 02</div><h3 class="hl-g">参赛拿奖</h3><p>推荐项目参赛、拿背书、打黑客松赢奖金。</p></div>
    </div>
  </div>`},

// 9 接单算账
{bg:"money-1", html:`
  <div class="inner">
    <div class="kicker anim">路径一 · 接单赚钱</div>
    <h2 class="anim">我给你算笔账</h2>
    <p class="lead anim">我们手上有各种<b>企业合作和外包资源</b>。你学完会做网页、做内容、做小工具，就能通过我们平台接<span class="hl">真实商单</span>——别人付钱，你用 AI 帮他做。</p>
    <div class="calc anim">
      <div class="box card"><div class="num" style="color:var(--ink)">&lt;500</div><div class="lbl">正课学费（元）</div></div>
      <div class="arrow">→</div>
      <div class="box card"><div class="num hl-g">1 单</div><div class="lbl">一个企业落地页的报酬</div></div>
      <div class="arrow">=</div>
      <div class="box card"><div class="num hl">回本 + 倒赚</div><div class="lbl">学费翻倍赚回来</div></div>
    </div>
    <p class="sub anim">这不是画饼，是我们平台上正在发生的事。你这学费，本质是一笔能快速回本、还能持续带来收入的投资。</p>
  </div>`},

// 10 参赛拿奖
{bg:"team-bg", html:`
  <div class="inner">
    <div class="kicker anim">路径二 · 参赛拿奖 / 打黑客松</div>
    <h2 class="anim" style="font-size:2.9vw">不急着赚钱？那就要荣誉、要能写进简历的背书</h2>
    <div class="split anim">
      <div class="split-l">
        <p class="lead">我们手上有<b>各大高校和初创企业的比赛资源</b>。你用 AI 做的项目，我们能帮你<span class="hl">推荐参赛、拿奖、拿背书</span>，也能带你打黑客松赢奖金。</p>
        <p class="lead" style="margin-top:1vw">还记得那个 <b>Nithin 的网站</b>吗？AI 做的，拿了国际大奖提名。你今天做的第一个网页，只要往下走，完全可能变成一个<span class="hl-g">能拿奖、能写进简历、能帮你谈实习和工作</span>的作品。</p>
      </div>
      <div class="wall">
        <div class="wcell"><div class="wimg" data-bg="award-1"></div><span>奖杯 / 证书</span></div>
        <div class="wcell"><div class="wimg" data-bg="award-2"></div><span>黑客松现场</span></div>
        <div class="wcell"><div class="wimg" data-bg="award-3"></div><span>登台领奖</span></div>
        <div class="wcell"><div class="wimg" data-bg="award-4"></div><span>企业合作</span></div>
      </div>
    </div>
  </div>`},

// 11 自研工具
{bg:"tool", html:`
  <div class="inner">
    <div class="kicker anim">别人给不了的东西 · 我们自研的工具</div>
    <h2 class="anim">一套工具，解决你用 AI 所有的糟心事</h2>
    <div class="vs anim">
      <div class="col pain"><h4>你现在的折腾</h4>
        <ul><li>想用国外最强模型，得翻墙</li><li>这家会员那家会员，一个月好几百</li><li>今天崩、明天限流，还怕账号被封</li><li>模型更新快，永远追不上</li></ul></div>
      <div class="col fix"><h4>用我们的工具</h4>
        <ul><li>不用翻墙，国内外最新模型直接用</li><li>不用充一堆会员，一个工具全都有</li><li>自己维护，稳定可靠，不怕封号</li><li>所有最新模型一键切换，哪个强用哪个</li></ul></div>
    </div>
  </div>`},

// 12 工具福利 + 报名 CTA
{bg:"cta", html:`
  <div class="inner">
    <div class="kicker anim">报名正课 · 现在就是最好的时机</div>
    <h2 class="anim">体验课让你"跑通"<br>正课让你真正"拥有"一套能赚钱的系统</h2>
    <ul class="bullets anim">
      <li><b>自研工具直接开放</b>，报名即用、一直更新，不额外收费</li>
      <li><b>专属辅导答疑</b> + 作品部署上线 + 专属域名与云服务器</li>
      <li><b>接单 / 比赛资源出口</b>，手把手带你落地第一份 AI 副业</li>
    </ul>
    <div class="price anim">
      <span class="old">原价 999</span>
      <span class="new">499<span class="yuan"> 元</span></span>
      <span class="plus">含 100 元 token · 工具费都帮你出了一部分</span>
    </div>
    <a class="btn anim" href="#">趁手感最热的时候，按下报名键 →</a>
  </div>`},

];

// ===== 渲染 =====
const deck = document.getElementById("deck");
slides.forEach((s,i)=>{
  const el = document.createElement("section");
  el.className = "slide";
  const bg = document.createElement("div");
  bg.className = "bg" + (s.bgcls? " "+s.bgcls : "");
  el.appendChild(bg);
  const noise = document.createElement("div"); noise.className="noise"; el.appendChild(noise);
  const wrap = document.createElement("div"); wrap.innerHTML = s.html; 
  while(wrap.firstChild) el.appendChild(wrap.firstChild);
  deck.appendChild(el);
  applyBg(bg, s.bg);
  // 内部 data-bg 元素（老师头像等）
  el.querySelectorAll("[data-bg]").forEach(d=>applyBg(d, d.dataset.bg));
});

const secs = [...document.querySelectorAll(".slide")];
let idx = 0;
const pager = document.getElementById("pager");
const prog = document.getElementById("prog");
function show(n){
  idx = Math.max(0, Math.min(secs.length-1, n));
  secs.forEach((s,i)=>s.classList.toggle("active", i===idx));
  pager.textContent = String(idx+1).padStart(2,"0")+" / "+String(secs.length).padStart(2,"0");
  prog.style.width = ((idx+1)/secs.length*100)+"%";
}
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
