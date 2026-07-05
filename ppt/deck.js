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
    <div class="grid3 team-grid anim">
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
    <h2 class="anim">AI 这波浪潮<br>我们不想看着有人白白错过</h2>
    <p class="lead anim">市面同类 AI 课动辄大几千、上万。我们把价格压到这儿，就是想让<span class="hl-g">门槛别再挡住任何一个愿意学的人。</span></p>
    <p class="lead anim" style="margin-top:1.2vw"><b>这波浪潮是几十年一遇的风口。太多对 AI 感兴趣的人，只是因为没人带、因为门槛高，就白白错过了。</b>我们想做的，就是把那个"没人带"的坎给你抹平。</p>
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
      <div class="box card"><div class="num" style="color:var(--ink)">&lt;600</div><div class="lbl">正课学费（元）</div></div>
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
    <div class="split awards anim">
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

// 12 正课预告 · 总览
{bg:"team-bg", html:`
  <div class="inner">
    <div class="kicker anim">第三部分 · AGENT 进阶</div>
    <h2 class="anim">正课是 Agent 进阶课<br>把它变成你自己的一整套生产力系统</h2>
    <p class="lead anim" style="margin-bottom:.6vw">体验课带你"跑通第一次"，进阶课带你把这些能力<b>真正装进日常、变成随时能调用的系统</b>。下面这些，都是进阶课里手把手带你搭起来的：</p>
    <div class="feats anim">
      <div class="feat"><div class="ic">💬</div><div class="ft">微信随时调用</div><div class="fd">离开电脑也能用，手机发一句话就触发任务。</div></div>
      <div class="feat"><div class="ic">🌐</div><div class="ft">网站部署上线</div><div class="fd">作品真正上线，配专属域名和云服务器，可访问可分享。</div></div>
      <div class="feat"><div class="ic">🎨</div><div class="ft">生图 / 生视频</div><div class="fd">接入更有想象力的多模态模型，做图做视频。</div></div>
      <div class="feat"><div class="ic">🧩</div><div class="ft">Skill 技能系统</div><div class="fd">去哪找、怎么装、怎么把你自己的经验沉淀成 skill。</div></div>
      <div class="feat"><div class="ic">⏰</div><div class="ft">定时任务</div><div class="fd">让 Agent 定点自动干活，日报、监控、抓取全自动。</div></div>
      <div class="feat"><div class="ic">🧠</div><div class="ft">记忆系统</div><div class="fd">它记得住你的偏好和上下文，越用越懂你、越用越顺手。</div></div>
      <div class="feat"><div class="ic">👥</div><div class="ft">学员专属社群</div><div class="fd">AI 新品第一手、使用技巧、副业机会，一群人一起往前走。</div></div>
      <div class="feat"><div class="ic">🚀</div><div class="ft">副业落地出口</div><div class="fd">把跑通的工作流变成能交付的产品或服务，真正变现。</div></div>
    </div>
  </div>`},

// 12.5 正课预告 · 高端进阶内容
{bg:"mission", html:`
  <div class="inner adv">
    <div class="kicker anim">进阶课 · 这些才是真正拉开差距的地方</div>
    <h2 class="anim">别人还在"会用"，你已经在<br>"搭系统"——进阶课带你啃下这些硬核</h2>
    <p class="lead anim" style="margin-bottom:.6vw">体验课解决"能不能用"，进阶课解决"能做到多强"。下面每一项，都是让你的 Agent 从<b>玩具变成生产力工具</b>的关键：</p>
    <div class="feats anim">
      <div class="feat"><div class="ic">🤝</div><div class="ft">多 Agent 协作编排</div><div class="fd">一个指挥、多个分工，让一群 Agent 并行干活、互相配合，复杂任务拆开同时推进。</div></div>
      <div class="feat"><div class="ic">🔌</div><div class="ft">MCP 工具接入</div><div class="fd">用 MCP 协议给 Agent 外挂各种工具和数据源，想接什么接什么，能力边界你自己定。</div></div>
      <div class="feat"><div class="ic">🧬</div><div class="ft">复杂工作流编排</div><div class="fd">多步骤、带条件判断、能循环重试的自动化流程，把一整条业务链交给 Agent 跑通。</div></div>
      <div class="feat"><div class="ic">📚</div><div class="ft">私有知识库 / RAG</div><div class="fd">把你的文档、资料喂给 Agent，让它基于你的私有知识回答，答得准、不瞎编。</div></div>
      <div class="feat"><div class="ic">🔗</div><div class="ft">API 集成打通</div><div class="fd">对接外部系统和第三方服务，让 Agent 真正接进你的工具链，读得到、写得回。</div></div>
      <div class="feat"><div class="ic">🖥️</div><div class="ft">自托管 / 私有化部署</div><div class="fd">把整套 Agent 部署到自己的服务器上，数据自己掌控，稳定、可控、可长期运营。</div></div>
      <div class="feat"><div class="ic">🧭</div><div class="ft">Prompt / 上下文工程</div><div class="fd">进阶调教方法——把任务讲清楚、把上下文管好，让 Agent 输出稳定、少翻车。</div></div>
      <div class="feat"><div class="ic">💰</div><div class="ft">成本 / 性能调优</div><div class="fd">模型怎么选、token 怎么省、速度怎么提，把系统跑得又快又省，能长期用得起。</div></div>
    </div>
    <p class="sub anim">这些不是概念课——每一项都手把手带你在自己的 Agent 上真正搭起来、跑起来。</p>
  </div>`},

{bg:"cover", html:`
  <div class="inner" style="align-items:flex-start">
    <div class="kicker anim">正课重头戏 · SKILL 技能系统</div>
    <h2 class="anim">Skill 是什么？<br>就是给 Agent 装上"专业技能包"</h2>
    <p class="lead anim">一个 skill，就是一套让 Agent 干好某类活的现成能力——写小红书、做 PPT、剪视频、爬数据……装上就能用。正课把这套玩法<b>从头带你打通</b>：</p>
    <div class="steps anim">
      <div class="step"><div class="sn">STEP 01</div><div class="st">去哪找</div><div class="sd">带你逛 <b>SkillHub 技能市场</b>——100+ 真实技能按场景分好类，搜索、办公、内容运营、视觉视频，找到你用得上的那个。</div></div>
      <div class="sarr">→</div>
      <div class="step"><div class="sn">STEP 02</div><div class="st">如何安装</div><div class="sd">一条命令的事。带你把感兴趣的 skill <b>装进自己的 Agent</b>，当场跑通，不卡在配置这种破事上。</div></div>
      <div class="sarr">→</div>
      <div class="step"><div class="sn">STEP 03</div><div class="st">沉淀自己的</div><div class="sd">最值钱的一步——把<b>你自己的经验、你的工作流</b>沉淀成一个专属 skill。以后同类活，Agent 按你的方法一键搞定。</div></div>
    </div>
    <p class="sub anim">别人的 skill 拿来即用，你的 skill 越攒越多——这就是你跟 AI 之间，别人复制不走的护城河。</p>
  </div>`},

// 14 正课预告 · 自动化：定时任务 + 记忆
{bg:"tool", html:`
  <div class="inner">
    <div class="kicker anim">正课能力 · 让 Agent 自己动起来</div>
    <h2 class="anim">从"你问它答"<br>到"它主动帮你干活、还记得住你"</h2>
    <div class="duo anim">
      <div class="dcol">
        <div class="dh"><span class="di">⏰</span>定时任务</div>
        <ul>
          <li>设好时间，Agent <b>定点自动执行</b>，不用你守着。</li>
          <li>每天早上自动出一份<b>行业日报 / 数据简报</b>推给你。</li>
          <li>定时<b>监控网站、抓取内容、跑批处理</b>，睡一觉活就干完了。</li>
          <li>把重复的活交给它，你只管收结果。</li>
        </ul>
      </div>
      <div class="dcol">
        <div class="dh"><span class="di">🧠</span>记忆系统</div>
        <ul>
          <li>它<b>记得住你的偏好、习惯、项目背景</b>，不用每次重头交代。</li>
          <li>跨对话、跨天都还在——<b>越用越懂你</b>。</li>
          <li>你纠正过一次的东西，它<b>记住不再犯</b>。</li>
          <li>用得越久，它就越像一个<b>真正懂你的私人助理</b>。</li>
        </ul>
      </div>
    </div>
  </div>`},

// 15 正课预告 · 部署上线 + 生图生视频 + 微信
{bg:"cta", html:`
  <div class="inner">
    <div class="kicker anim">正课能力 · 让成果走出电脑、走进生活</div>
    <h2 class="anim">做出来 · 发出去 · 随身带</h2>
    <div class="duo anim" style="grid-template-columns:1fr 1fr 1fr">
      <div class="dcol">
        <div class="dh"><span class="di">🌐</span>部署上线</div>
        <ul>
          <li>作品<b>真正上线</b>，配专属域名。</li>
          <li>个人<b>云服务器</b>，随时可访问。</li>
          <li>做的东西<b>能分享、能拿去谈</b>。</li>
        </ul>
      </div>
      <div class="dcol">
        <div class="dh"><span class="di">🎨</span>生图生视频</div>
        <ul>
          <li>接入<b>多模态大模型</b>。</li>
          <li>文生图、图生视频，<b>一句话出片</b>。</li>
          <li>内容创作、素材生产<b>全打通</b>。</li>
        </ul>
      </div>
      <div class="dcol">
        <div class="dh"><span class="di">💬</span>微信调用</div>
        <ul>
          <li>离开电脑<b>照样能用</b>。</li>
          <li>手机发一句话<b>就触发任务</b>。</li>
          <li>你的 Agent，<b>装进口袋随身带</b>。</li>
        </ul>
      </div>
    </div>
    <p class="sub anim">这些不是"以后可能有"，是正课里一样一样带你搭起来、当场就能用的。</p>
  </div>`},

// 16 工具福利 + 报名 CTA
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
      <span class="old">原价 1299</span>
      <span class="new">599<span class="yuan"> 元</span></span>
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
