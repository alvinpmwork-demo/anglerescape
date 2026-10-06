import type { ArticleContent } from "./types";

export const guideEn: ArticleContent = {
  locale: "en",
  path: "/guides/how-to-escape-inspector/",
  title: "How to Escape the Inspector: Angler Escape Stealth Guide",
  description:
    "How to escape the Inspector in Angler Escape: read vision cones, keep the noise meter low, use cover and decoys, and nail the Second Escape. In-game tips only.",
  h1: "How to Escape the Inspector (In-Game Guide)",
  topNote:
    "Every tip on this page is an Angler Escape game mechanic, not real-world advice. Do not try any of this IRL.",
  intro: [
    "Want fewer busts and more fish in the bucket? Here is how to escape the Inspector in Angler Escape, step by step. This stealth fishing game guide walks through how the fictional Inspector works, how to stay quiet while you cast, and what to do when the chase starts. Everything below is cartoon comedy for Angler Escape—vision cones, noise meters, rubber ducks, and all.",
  ],
  sections: [
    {
      h2: "Know Your Inspector: 3 Alert States",
      paragraphs: [
        "The Inspector is a cartoon park patroller with no real agency, badge, or uniform. His AI has three moods. Learn them and half the game clicks into place.",
      ],
      subsections: [
        {
          title: "Patrol (white flashlight)",
          body: "He walks a fixed route with a narrow vision cone. Timing beats reflexes: watch one full loop before you cast, then move when his back is turned.",
        },
        {
          title: 'Suspicious (yellow "?")',
          body: "Splashes and footsteps make him turn and check. Crouch in place and wait until the question mark fades. Moving too soon often triggers a chase.",
        },
        {
          title: 'Chase (red "!")',
          body: 'He yells "Stop right there, angler!" and speeds up. Do not sprint in a straight line. Break line of sight first, then decide whether to decoy or bolt for the exit.',
        },
      ],
    },
    {
      h2: "The Steal Phase: Stay Unseen",
      subsections: [
        {
          title: "The noise meter is everything",
          body: "Hard reels, crunchy leaves, and a rattling bucket all add noise. Fill the meter and you jump straight to suspicious—sometimes straight to chase. Soft inputs keep you fishing longer.",
        },
        {
          title: "Pick your fish, pick your risk",
          body: "Golden legendary fish fight longer and splash louder. Practice on small fry until the noise rhythm feels natural, then go for the big score.",
        },
        {
          title: "Use cover spots",
          body: "Reeds, benches, and beach umbrellas cut detection. Cast from cover whenever you can; open banks are score runs for players who already know the patrol.",
        },
      ],
    },
    {
      h2: "Spotted? The 3-Step Escape",
      subsections: [
        {
          title: "Step 1: Break line of sight",
          body: "Duck behind obstacles until the cone loses you. When the chase drops back to suspicious, you have breathing room again.",
        },
        {
          title: "Step 2: Use a decoy",
          body: "The rubber duck lures him away for about three seconds. The banana peel trips him for a slapstick beat. Both are fictional comedy items—great for buying an exit window.",
        },
        {
          title: "Step 3: Hit the exit",
          body: "Exits are marked with green arrows. A full bucket slows you down, so drop fish to survive if you must. Escaping with half a catch still beats a full bust.",
        },
      ],
    },
    {
      h2: "Caught? Go for the Second Escape",
      paragraphs: [
        "Once you are cuffed, a mini-game starts: mash to wriggle free and slip away when the Captain turns. Succeed and you keep half your catch. Second Escape is also playable as its own short mode if you want to practice the comeback without a full heist.",
      ],
      links: [
        { label: "Practice Second Escape →", href: "/play/second-escape/" },
      ],
    },
    {
      h2: "Top 5 Rookie Fails",
      paragraphs: [
        "Most early busts come from the same five habits. Fix these and your clear rate jumps fast.",
      ],
      list: [
        {
          title: "Greedy legendary casts:",
          body: "Going for gold before you can manage noise is a classic splash-and-bust.",
        },
        {
          title: "Fishing with your back to the patrol:",
          body: "Always face the route, or at least keep the cone on screen.",
        },
        {
          title: "An overloaded bucket:",
          body: "More fish means slower sprints. Leave room to run.",
        },
        {
          title: "Straight-line sprints:",
          body: "Chases punish open lines. Zigzag through cover.",
        },
        {
          title: "Hoarding items:",
          body: "A decoy unused in your pocket is a decoy wasted. Spend them early in a chase.",
        },
      ],
    },
    {
      h2: "Tips by Level",
      paragraphs: [
        "Week 1 opens three fictional stages. Park Pond teaches the noise meter, Reservoir Night teaches flashlight cones, and City Canal teaches dual patrols. Jump to a walkthrough when you are stuck.",
      ],
      cards: [
        {
          title: "01 Park Pond",
          meta: "★☆☆ · noise meter",
          body: "Daytime tutorial with one Inspector, reeds, and the Golden Koi.",
          href: "/levels/01-park-pond/",
        },
        {
          title: "02 Reservoir Night",
          meta: "★★☆ · flashlight cones",
          body: "Night fishing under a long beam. Learn the Firefly Jar.",
          href: "/levels/02-reservoir-night/",
        },
        {
          title: "03 City Canal",
          meta: "★★★ · dual patrols",
          body: "Two Inspectors, noisy bystanders, and the Neon Catfish.",
          href: "/levels/03-city-canal/",
        },
      ],
    },
  ],
  primaryCta: "Try These Tips Now",
  primaryHref: "/play/",
  secondaryCta: "Practice Second Escape →",
  secondaryHref: "/play/second-escape/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "How do I see the Inspector's vision cone?",
      a: 'Turn on the "Show vision cones" assist. A translucent wedge appears on the ground, and stepping into it gets you spotted.',
    },
    {
      q: "Does getting spotted mean game over?",
      a: "No. Break line of sight, drop a decoy, and run for the exit to shake most chases.",
    },
    {
      q: "Where do I get items?",
      a: "Supply crates drop them at random, and the Daily Challenge gives one guaranteed item.",
    },
    {
      q: "Do these tips work in real life?",
      a: "No. They are fictional game mechanics. Follow your local fishing rules.",
    },
    {
      q: "Which level is hardest?",
      a: "Of the Week-1 levels, City Canal: two Inspectors with crossing routes.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Escape Guide", href: "/guides/how-to-escape-inspector/" },
  ],
  related: [
    { label: "Play the free stealth fishing game", href: "/play/", note: "try the tips right away" },
    { label: "Practice Second Escape", href: "/play/second-escape/", note: "the comeback mini-game" },
    { label: "All Angler Escape levels", href: "/levels/", note: "difficulty and walkthroughs" },
    { label: "Meet Captain Zhang, the Inspector", href: "/characters/", note: "abilities and catchphrases" },
    { label: "Why this is fiction", href: "/about/fishing-rules-disclaimer/", note: "disclaimer and real fishing rules" },
  ],
};

export const guideZh: ArticleContent = {
  locale: "zh",
  path: "/guides/how-to-escape-inspector/",
  title: "钓鱼佬游戏攻略：甩掉巡查员的10个技巧｜钓鱼佬大逃亡",
  description:
    "新手必看的钓鱼佬游戏攻略：读懂巡查员视野锥、控制噪音条、用掩体和道具甩掉追兵，被抓了还能二次逃脱。《钓鱼佬大逃亡》纯游戏内技巧，虚构娱乐，请勿模仿。",
  h1: "钓鱼佬游戏攻略：怎么甩掉巡查员（游戏内）",
  topNote:
    "以下全部是《钓鱼佬大逃亡》游戏机制技巧，与现实无关。请勿模仿。",
  intro: [
    "想少被抓、多带点鱼回家？这篇钓鱼佬游戏攻略会讲清楚虚构的巡查员怎么工作、下竿时如何保持安静、以及被发现之后该怎么跑。下面说到的视野锥、噪音条、橡皮鸭，全是《钓鱼佬大逃亡》里的卡通玩法。",
  ],
  sections: [
    {
      h2: "先读懂巡查员：三种状态",
      paragraphs: [
        "巡查员是卡通化的公园巡逻角色，没有真实机构、徽章或制服。他的 AI 有三种情绪，摸清之后游戏就顺了一半。",
      ],
      subsections: [
        {
          title: "巡逻（白色手电）",
          body: "按固定路线走，视野锥比较窄。看清路线再下竿，比手速重要得多。",
        },
        {
          title: "起疑（黄色问号）",
          body: "听到水花或脚步会转身查看。此时原地蹲下，等问号消失就安全。太早乱动，容易直接进入追击。",
        },
        {
          title: "追击（红色感叹号）",
          body: "喊出「钓鱼佬，站住！」并加速。别硬跑直线，先断视线，再决定扔道具还是冲出口。",
        },
      ],
    },
    {
      h2: "摸鱼阶段：别让自己暴露",
      subsections: [
        {
          title: "噪音条是第一生命线",
          body: "收竿太猛、踩到落叶、鱼桶晃动都会涨噪音。噪音条满格就直接触发起疑，有时直接追击。轻操作才能钓得更久。",
        },
        {
          title: "选鱼也是选风险",
          body: "金色传说鱼挣扎时间长、水花大。新手先钓小鱼练节奏，再去冲传说。",
        },
        {
          title: "掩体位",
          body: "芦苇丛、长椅后面、遮阳伞下能降低被看见的概率，蹲在里面下竿最稳。空旷岸边留给已经摸清路线的冲分局。",
        },
      ],
    },
    {
      h2: "被发现后：大逃亡三步走",
      subsections: [
        {
          title: "第一步：断视线",
          body: "绕到障碍物后面，让巡查员的视野锥丢掉你，追击就会降回起疑。",
        },
        {
          title: "第二步：扔道具",
          body: "橡皮鸭诱饵能把巡查员引开约 3 秒，香蕉皮能让他滑一跤。都是虚构喜剧道具，用来换冲出口的窗口。",
        },
        {
          title: "第三步：冲出口",
          body: "每关的出口用绿色箭头标出。鱼桶越满跑得越慢，必要时丢鱼保命。带着一半鱼获逃出去，也比全灭强。",
        },
      ],
    },
    {
      h2: "被抓了也别慌：二次逃脱",
      paragraphs: [
        "被铐上之后会进入二次逃脱小游戏：连按挣脱、趁队长转身溜走。成功能保住一半鱼获。也可以单独练习二次逃脱模式，专门练翻盘手感。",
      ],
      links: [
        { label: "去练二次逃脱 →", href: "/zh/play/second-escape/" },
      ],
    },
    {
      h2: "新手常见翻车 TOP 5",
      paragraphs: ["早期被抓，多半栽在这五个习惯上。改掉之后通关率会明显上去。"],
      list: [
        {
          title: "贪传说鱼：",
          body: "还管不住噪音就冲金色，水花一响就全场目光。",
        },
        {
          title: "背对巡逻路线下竿：",
          body: "尽量面向路线，至少让视野锥留在屏幕里。",
        },
        {
          title: "鱼桶装太满：",
          body: "鱼越多冲刺越慢，要给逃跑留重量余量。",
        },
        {
          title: "追击时跑直线：",
          body: "开阔直线最容易被追上，记得绕掩体。",
        },
        {
          title: "道具留到最后才用：",
          body: "口袋里的诱饵等于没用。追击一开始就该花。",
        },
      ],
    },
    {
      h2: "按关卡找攻略",
      paragraphs: [
        "首周开放三关虚构场景：第 1 关公园池塘练噪音，第 2 关水库夜钓练手电视野，第 3 关城市河道练多巡查员。卡住了就点进对应关卡页。",
      ],
      cards: [
        {
          title: "第1关 公园池塘",
          meta: "★☆☆ · 噪音条",
          body: "白天新手关，一名巡查员，金色锦鲤。",
          href: "/zh/levels/01-park-pond/",
        },
        {
          title: "第2关 水库夜钓",
          meta: "★★☆ · 手电视野",
          body: "夜间长光束，学习萤火虫罐。",
          href: "/zh/levels/02-reservoir-night/",
        },
        {
          title: "第3关 城市河道",
          meta: "★★★ · 双巡查员",
          body: "交叉巡逻、围观路人、霓虹鲶鱼。",
          href: "/zh/levels/03-city-canal/",
        },
      ],
    },
  ],
  primaryCta: "用技巧再来一局",
  primaryHref: "/zh/play/",
  secondaryCta: "去练二次逃脱 →",
  secondaryHref: "/zh/play/second-escape/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "巡查员的视野范围怎么看？",
      a: "开启「显示视野锥」辅助后，地面会出现半透明扇形，进入扇形就会被发现。",
    },
    {
      q: "被发现后一定会被抓吗？",
      a: "不会。断视线、扔道具、冲出口三步做好，大多数追击都能甩掉。",
    },
    {
      q: "道具在哪里拿？",
      a: "关卡里的补给箱随机掉落，每日挑战会固定送一个。",
    },
    {
      q: "这些技巧现实中能用吗？",
      a: "不能。全部是虚构游戏机制，现实请遵守当地钓鱼与禁渔规定。",
    },
    {
      q: "最难的是哪一关？",
      a: "Week 1 开放的三关里，第 3 关城市河道有两名巡查员交叉巡逻，最考验路线判断。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "甩掉巡查员攻略", href: "/zh/guides/how-to-escape-inspector/" },
  ],
  related: [
    { label: "钓鱼小游戏在线玩", href: "/zh/play/", note: "马上试试这些技巧" },
    { label: "二次逃脱：被抓了还能跑", href: "/zh/play/second-escape/", note: "专练翻盘" },
    { label: "钓鱼佬大逃亡关卡攻略大全", href: "/zh/levels/", note: "难度与三星条件" },
    { label: "巡查队长老张角色介绍", href: "/zh/characters/", note: "能力与口头禅" },
    { label: "为什么说游戏是虚构的", href: "/zh/about/fishing-rules-disclaimer/", note: "免责声明与现实钓鱼规定" },
  ],
};

