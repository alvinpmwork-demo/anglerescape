import type { ArticleContent } from "./types";

export const levelsHubEn: ArticleContent = {
  locale: "en",
  path: "/levels/",
  title: "Angler Escape Levels: All Stages, Difficulty & Walkthroughs",
  description:
    "All Angler Escape levels at a glance: Park Pond, Reservoir Night, and City Canal with difficulty, Inspector count, legendary fish, items, and walkthrough links.",
  h1: "Angler Escape Levels: All Stages and Walkthroughs",
  topNote:
    "Every location below is fictional. Tips are in-game only—no real waters, agencies, or illegal fishing advice.",
  intro: [
    "Angler Escape levels are short cartoon heists, and Week 1 opens three of them. Each one teaches a new skill: noise, flashlight cones, then dual patrols. Pick a card for the full walkthrough, or scan the table below to see what each stage throws at you.",
  ],
  sections: [
    {
      h2: "Level Select",
      cards: [
        {
          title: "01 Park Pond",
          meta: "★☆☆ · 1 Inspector · Golden Koi",
          body: "Daytime tutorial. Learn the noise meter behind reeds and benches.",
          href: "/levels/01-park-pond/",
        },
        {
          title: "02 Reservoir Night",
          meta: "★★☆ · 1 Inspector · Moonlight Silverfish",
          body: "A long flashlight beam and a glowing bobber. Unlock the Firefly Jar.",
          href: "/levels/02-reservoir-night/",
        },
        {
          title: "03 City Canal",
          meta: "★★★ · 2 Inspectors · Neon Catfish",
          body: "Crossing patrols, noisy bystanders, and a harder Second Escape if you bust.",
          href: "/levels/03-city-canal/",
        },
      ],
    },
    {
      h2: "What Each Level Teaches",
      table: {
        headers: ["Level", "Time", "Inspectors", "Legendary fish", "New item", "Core skill"],
        rows: [
          ["01 Park Pond", "Day", "1", "Golden Koi", "None (tutorial)", "Noise meter and cover"],
          ["02 Reservoir Night", "Night", "1 (flashlight)", "Moonlight Silverfish", "Firefly Jar", "Reading a light beam"],
          ["03 City Canal", "Dusk", "2 (crossing)", "Neon Catfish", "Rubber Duck", "Timing two patrols"],
        ],
      },
    },
    {
      h2: "How 3-Star Ratings Work",
      paragraphs: [
        "Every stage awards up to three stars. One is almost always for staying unseen, one for landing the legendary fish, and one for speed or for clearing without items. You do not need three stars to move on, but chasing them is the fastest way to learn each patrol by heart. The walkthroughs list the exact criteria for each level.",
      ],
    },
    {
      h2: "Suggested Order",
      paragraphs: [
        "Play 1 → 2 → 3. Each level unlocks a new item. If you are stuck, read the general escape guide first, then return to the stage walkthrough.",
      ],
      links: [
        {
          label: "How to Escape the Inspector →",
          href: "/guides/how-to-escape-inspector/",
        },
      ],
    },
    {
      h2: "Coming Soon",
      paragraphs: [
        "Future teaser slots include stages like Rainy Pavilion Lake. Check back as we expand the map—Second Escape mode stays open even while new levels cook.",
      ],
    },
  ],
  primaryCta: "Start Level 1",
  primaryHref: "/levels/01-park-pond/",
  secondaryCta: "Read the Escape Guide →",
  secondaryHref: "/guides/how-to-escape-inspector/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "How many levels are there?",
      a: "Three at launch, with more coming.",
    },
    {
      q: "Do levels unlock in order?",
      a: "Yes. Second Escape mode is always open.",
    },
    {
      q: "Are the locations real?",
      a: "No. Every location is fictional.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels/" },
  ],
  related: [
    { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/", note: "general stealth tips" },
    { label: "Meet the characters", href: "/characters/", note: "who you play and who chases you" },
    { label: "Play the free fishing game online", href: "/play/" },
    { label: "Second Escape mini-game", href: "/play/second-escape/", note: "always unlocked" },
  ],
  schemaType: "CollectionPage",
};

export const levelsHubZh: ArticleContent = {
  locale: "zh",
  path: "/levels/",
  title: "钓鱼佬大逃亡关卡攻略大全｜3关难度、传说鱼与三星条件",
  description:
    "钓鱼佬大逃亡关卡攻略大全：公园池塘、水库夜钓、城市河道三关的难度、巡查员数量、传说鱼、新道具和三星条件一览，点进关卡页看完整通关攻略，纯属虚构。",
  h1: "钓鱼佬大逃亡关卡攻略大全",
  topNote:
    "以下场景全部虚构。技巧只适用于游戏内，不含真实水域、机构或非法捕捞建议。",
  intro: [
    "这份钓鱼佬大逃亡关卡攻略覆盖首周开放的三关，每关都是短小的卡通逃亡关。每一关教一个新技能：噪音、手电视野，再到双巡查员。点卡片看完整攻略，或者先看下面的对比表，了解每关难在哪。",
  ],
  sections: [
    {
      h2: "关卡一览",
      cards: [
        {
          title: "第1关 公园池塘",
          meta: "★☆☆ · 1 名巡查员 · 金色锦鲤",
          body: "白天新手关。在长椅和芦苇丛里学噪音条。",
          href: "/zh/levels/01-park-pond/",
        },
        {
          title: "第2关 水库夜钓",
          meta: "★★☆ · 1 名巡查员 · 月光银鱼",
          body: "夜间长光束，浮漂会发光。解锁萤火虫罐。",
          href: "/zh/levels/02-reservoir-night/",
        },
        {
          title: "第3关 城市河道",
          meta: "★★★ · 2 名巡查员 · 霓虹鲶鱼",
          body: "交叉巡逻、围观路人；被抓后二次逃脱更难。",
          href: "/zh/levels/03-city-canal/",
        },
      ],
    },
    {
      h2: "每关学什么",
      table: {
        headers: ["关卡", "时间", "巡查员", "传说鱼", "新道具", "核心技巧"],
        rows: [
          ["第1关 公园池塘", "白天", "1 名", "金色锦鲤", "无（新手关）", "噪音条与掩体"],
          ["第2关 水库夜钓", "夜晚", "1 名（手电）", "月光银鱼", "萤火虫罐", "读懂光束"],
          ["第3关 城市河道", "黄昏", "2 名（交叉巡逻）", "霓虹鲶鱼", "橡皮鸭", "卡两人的节奏"],
        ],
      },
    },
    {
      h2: "三星条件怎么算",
      paragraphs: [
        "每关最多三颗星：一颗几乎总是给「全程不被发现」，一颗给「钓到传说鱼」，还有一颗看速度或是否不用道具。不拿满三星也能继续下一关，但冲三星是把巡逻路线背熟最快的办法。具体条件写在各关攻略页里。",
      ],
    },
    {
      h2: "推荐通关顺序",
      paragraphs: [
        "按 1→2→3 打，每关解锁一个新道具。卡关了先看通用攻略，再回关卡页。",
      ],
      links: [
        {
          label: "甩掉巡查员攻略 →",
          href: "/zh/guides/how-to-escape-inspector/",
        },
      ],
    },
    {
      h2: "即将上线",
      paragraphs: [
        "后续关卡占位，比如「雨夜湖心亭」。地图扩容期间，二次逃脱模式仍可随时玩。",
      ],
    },
  ],
  primaryCta: "从第1关开始",
  primaryHref: "/zh/levels/01-park-pond/",
  secondaryCta: "看甩掉巡查员攻略 →",
  secondaryHref: "/zh/guides/how-to-escape-inspector/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "一共有多少关？",
      a: "首周开放 3 关，后续会持续更新。",
    },
    {
      q: "要按顺序解锁吗？",
      a: "要按顺序解锁，但二次逃脱模式可以随时玩。",
    },
    {
      q: "关卡场景是真实地点吗？",
      a: "不是，全部是虚构场景。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "关卡", href: "/zh/levels/" },
  ],
  related: [
    { label: "钓鱼佬游戏攻略：甩掉巡查员", href: "/zh/guides/how-to-escape-inspector/", note: "通用潜行技巧" },
    { label: "钓鱼佬大逃亡角色介绍", href: "/zh/characters/", note: "你扮演谁、谁在追你" },
    { label: "钓鱼小游戏在线玩", href: "/zh/play/" },
    { label: "二次逃脱小游戏", href: "/zh/play/second-escape/", note: "随时可玩" },
  ],
  schemaType: "CollectionPage",
};

export const level01En: ArticleContent = {
  locale: "en",
  path: "/levels/01-park-pond/",
  title: "Park Pond Walkthrough (Level 1): 3-Star Tips | Angler Escape",
  description:
    "Park Pond walkthrough for Angler Escape Level 1: the Inspector's route, best casting spots, how to catch the Golden Koi, the escape path, and 3-star tips.",
  h1: "Level 1: Park Pond Walkthrough",
  topNote:
    "In-game tips only. Park Pond is a fictional stage—no real park, pond, or enforcement advice.",
  intro: [
    "This Park Pond walkthrough gets you through Level 1 with all three stars. Park Pond is the tutorial heist: one Inspector, soft cover, and enough time to learn the noise meter before the legendary Golden Koi tempts you into a splashy mistake.",
  ],
  sections: [
    {
      h2: "Overview",
      paragraphs: [
        "Daytime. One Inspector. Benches and reeds for cover. The legendary fish is the Golden Koi (fictional). Your job is to cast quietly, land a catch, and leave through the south gate.",
      ],
    },
    {
      h2: "Inspector Route",
      paragraphs: [
        "He loops the pond clockwise in about twenty seconds and pauses two seconds at the fountain. That pause is your casting window. Watch one full loop before you commit.",
      ],
    },
    {
      h2: "Best Casting Spots",
      subsections: [
        {
          title: "West reeds",
          body: "Best cover and the safest place to learn soft reels. Start here on your first clears.",
        },
        {
          title: "East bench",
          body: "More fish, but wide open. Save it for score runs once you know the loop by heart.",
        },
      ],
    },
    {
      h2: "Escape Path",
      paragraphs: [
        "If you get spotted, loop the flowerbed to break line of sight, then exit through the south gate marked with a green arrow. Do not cut across the open path in front of the fountain.",
      ],
    },
    {
      h2: "Common Rookie Mistakes",
      list: [
        { title: "Starting at the east bench:", body: "more fish, but no cover. Learn the loop from the reeds first." },
        { title: "Yanking the Golden Koi:", body: "one hard reel spikes the noise meter and turns the Inspector around." },
        { title: "Cutting across the fountain path:", body: "the shortest route to the gate is also the most visible one." },
      ],
    },
    {
      h2: "3-Star Criteria",
      list: [
        { title: "Unseen:", body: "finish without entering chase." },
        { title: "Legendary:", body: "land the Golden Koi." },
        { title: "Speed:", body: "exit in under 60 seconds." },
      ],
    },
  ],
  primaryCta: "Play Level 1",
  primaryHref: "/play/",
  secondaryCta: "Next: Reservoir Night →",
  secondaryHref: "/levels/02-reservoir-night/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "How do I 3-star Park Pond?",
      a: "Cast during the fountain pause, hide in the reeds, then grab the Koi and go.",
    },
    {
      q: "How do I catch the Golden Koi?",
      a: "Two soft reels in a row. Yanking spikes the noise meter.",
    },
    {
      q: "I keep getting spotted. What should I do?",
      a: "Turn on vision cones and watch one full loop first.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels/" },
    { label: "Park Pond", href: "/levels/01-park-pond/" },
  ],
  related: [
    { label: "Next: Reservoir Night walkthrough", href: "/levels/02-reservoir-night/" },
    { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/", note: "noise meter basics" },
    { label: "Meet Ah Diao, the angler you play", href: "/characters/" },
    { label: "All Angler Escape levels", href: "/levels/" },
  ],
};

export const level01Zh: ArticleContent = {
  locale: "zh",
  path: "/levels/01-park-pond/",
  title: "第1关 公园池塘攻略｜钓鱼佬大逃亡新手关三星怎么过",
  description:
    "钓鱼佬大逃亡第1关公园池塘攻略：巡查员路线、最佳下竿位、金色锦鲤怎么钓、被发现后的逃跑路线和常见翻车点。新手三星通关指南，纯游戏内技巧，请勿模仿。",
  h1: "第1关 公园池塘攻略",
  topNote:
    "纯游戏内技巧。公园池塘是虚构关卡，不含真实公园、水域或执法建议。",
  intro: [
    "这篇第1关公园池塘攻略带你三星通关。公园池塘是教学向逃亡：一名巡查员、温和掩体，以及足够时间让你先学会噪音条——然后再被金色锦鲤诱惑出一记大水花。",
  ],
  sections: [
    {
      h2: "关卡概况",
      paragraphs: [
        "白天，1 名巡查员，长椅和芦苇丛做掩体。传说鱼是金色锦鲤（虚构）。目标是安静下竿、拿到鱼获，从南门离开。",
      ],
    },
    {
      h2: "巡查员路线",
      paragraphs: [
        "绕池塘顺时针一圈约 20 秒，经过喷泉时会停顿 2 秒，这就是你的下竿窗口。出手前先看完一整圈。",
      ],
    },
    {
      h2: "最佳下竿位",
      subsections: [
        {
          title: "西侧芦苇丛",
          body: "掩体最好，适合练噪音条。第一次通关从这里开始。",
        },
        {
          title: "东侧长椅",
          body: "鱼多但视野开阔，适合熟练后来冲分。",
        },
      ],
    },
    {
      h2: "逃跑路线",
      paragraphs: [
        "被发现后沿花坛绕一圈断视线，再从南门绿色箭头出关。别从喷泉正面的空地硬切。",
      ],
    },
    {
      h2: "新手常见翻车",
      list: [
        { title: "一上来就去东侧长椅：", body: "鱼多但没掩体，先在芦苇丛把路线摸熟。" },
        { title: "猛拉金色锦鲤：", body: "一次猛收竿就能让噪音条爆表，巡查员立刻回头。" },
        { title: "从喷泉前空地抄近路：", body: "离南门最近的路，也是最显眼的路。" },
      ],
    },
    {
      h2: "三星条件",
      list: [
        { title: "不被发现：", body: "全程不进入追击。" },
        { title: "传说鱼：", body: "钓到金色锦鲤。" },
        { title: "速度：", body: "60 秒内出关。" },
      ],
    },
  ],
  primaryCta: "开始第1关",
  primaryHref: "/zh/play/",
  secondaryCta: "下一关：水库夜钓 →",
  secondaryHref: "/zh/levels/02-reservoir-night/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "第1关怎么三星？",
      a: "在喷泉停顿窗口下竿，躲芦苇丛，钓到锦鲤后直接出关。",
    },
    {
      q: "金色锦鲤怎么钓？",
      a: "需要连续两次轻收竿，猛拉会炸噪音条。",
    },
    {
      q: "总被发现怎么办？",
      a: "打开视野锥辅助，看清路线再动。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "关卡", href: "/zh/levels/" },
    { label: "公园池塘", href: "/zh/levels/01-park-pond/" },
  ],
  related: [
    { label: "下一关：第2关水库夜钓攻略", href: "/zh/levels/02-reservoir-night/" },
    { label: "钓鱼佬游戏攻略：甩掉巡查员", href: "/zh/guides/how-to-escape-inspector/", note: "噪音条基础" },
    { label: "钓鱼佬阿钓角色介绍", href: "/zh/characters/" },
    { label: "钓鱼佬大逃亡关卡攻略大全", href: "/zh/levels/" },
  ],
};

export const level02En: ArticleContent = {
  locale: "en",
  path: "/levels/02-reservoir-night/",
  title: "Reservoir Night Walkthrough (Level 2) | Angler Escape Guide",
  description:
    "Reservoir Night walkthrough for Angler Escape Level 2: flashlight beam rules, the Firefly Jar decoy, the Moonlight Silverfish, and the dam escape route.",
  h1: "Level 2: Reservoir Night Walkthrough",
  topNote:
    "Fiction only. Reservoir Night is a cartoon stage with made-up fish, items, and patrol rules.",
  intro: [
    "This Reservoir Night walkthrough covers Level 2, where night changes everything. The Inspector carries a long, narrow flashlight beam: safe outside it, busted in one second inside it. Your new toy is the Firefly Jar.",
  ],
  sections: [
    {
      h2: "Overview",
      paragraphs: [
        "One Inspector with a flashlight. The legendary fish is the Moonlight Silverfish (fictional). The new item is the Firefly Jar. Your bobber also glows in the dark—pretty, and dangerous.",
      ],
    },
    {
      h2: "Night Rules",
      subsections: [
        {
          title: "Outside the beam you are safe. Inside, you are busted in 1 second",
          body: "Move to the rhythm of the sweep. Commit during the dark gaps, freeze when the light turns toward your bank.",
        },
        {
          title: "Your bobber glows",
          body: "It can draw his attention after you cast. Check beam direction before the line hits the water.",
        },
      ],
    },
    {
      h2: "Firefly Jar",
      paragraphs: [
        "Throw it the opposite way and he investigates for about three seconds. That window is perfect for the Silverfish fight. Advanced players save the jar and clear on timing alone.",
      ],
    },
    {
      h2: "Escape Route",
      paragraphs: [
        "Follow the shadow strip under the dam. The beam cannot reach it, and the exit sits at the end. If you panic into open moonlight, the chase usually ends badly.",
      ],
    },
    {
      h2: "Common Rookie Mistakes",
      list: [
        { title: "Casting while the beam faces your bank:", body: "the glowing bobber lands right in his line of sight." },
        { title: "Throwing the Firefly Jar too close:", body: "he investigates the jar and finds you standing next to it." },
        { title: "Running into open moonlight:", body: "the dam shadow is slower to reach, but it is the only safe lane." },
      ],
    },
    {
      h2: "3-Star Criteria",
      list: [
        { title: "Never lit:", body: "stay out of the beam entirely." },
        { title: "Legendary:", body: "land the Moonlight Silverfish." },
        { title: "Advanced:", body: "keep the Firefly Jar unused." },
      ],
    },
  ],
  primaryCta: "Play Level 2",
  primaryHref: "/play/",
  secondaryCta: "Next: City Canal →",
  secondaryHref: "/levels/03-city-canal/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Why do I keep getting lit up?",
      a: "Your glowing bobber. Wait until the beam swings away before you cast.",
    },
    {
      q: "When does the Silverfish spawn?",
      a: "On the moon's second break through the clouds.",
    },
    {
      q: "Can I 3-star without items?",
      a: "Yes, with tighter timing.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels/" },
    { label: "Reservoir Night", href: "/levels/02-reservoir-night/" },
  ],
  related: [
    { label: "Previous: Park Pond walkthrough", href: "/levels/01-park-pond/" },
    { label: "Next: City Canal walkthrough", href: "/levels/03-city-canal/" },
    { label: "Escape guide: vision cones and decoys", href: "/guides/how-to-escape-inspector/" },
    { label: "Captain Zhang's flashlight sweep", href: "/characters/", note: "character abilities" },
  ],
};

export const level02Zh: ArticleContent = {
  locale: "zh",
  path: "/levels/02-reservoir-night/",
  title: "第2关水库夜钓攻略｜手电视野怎么躲 - 钓鱼佬大逃亡",
  description:
    "钓鱼佬大逃亡第2关水库夜钓攻略：夜间手电视野规则、发光浮漂注意事项、萤火虫罐用法、月光银鱼怎么钓、堤坝阴影逃跑路线。纯虚构游戏关卡技巧，请勿模仿。",
  h1: "第2关 水库夜钓攻略",
  topNote:
    "纯属虚构。水库夜钓是卡通关卡，鱼、道具和巡逻规则都是游戏设定。",
  intro: [
    "这篇第2关水库夜钓攻略讲怎么躲手电。夜间会改写整套节奏。巡查员拿手电，光束又窄又长：光外很安全，光里一秒暴露。本关新道具是萤火虫罐。",
  ],
  sections: [
    {
      h2: "关卡概况",
      paragraphs: [
        "1 名巡查员拿手电。传说鱼是月光银鱼（虚构）。新道具是萤火虫罐。浮漂在黑暗中会发光——好看，也危险。",
      ],
    },
    {
      h2: "夜间规则",
      subsections: [
        {
          title: "光束外很安全，光束里一秒就暴露",
          body: "盯着光束扫过的节奏走。黑暗空档再行动，光朝你这边转时先停住。",
        },
        {
          title: "浮漂会发光",
          body: "下竿后可能吸引注意。下竿前先确认光束方向。",
        },
      ],
    },
    {
      h2: "萤火虫罐怎么用",
      paragraphs: [
        "扔到反方向，巡查员会去查看约 3 秒，这是钓月光银鱼的最佳时机。进阶玩家可以留着不用，纯靠节奏三星。",
      ],
    },
    {
      h2: "逃跑路线",
      paragraphs: [
        "沿堤坝下方的阴影带跑，光束照不到，尽头就是出口。慌不择路冲进月光空地，追击通常很难收场。",
      ],
    },
    {
      h2: "新手常见翻车",
      list: [
        { title: "光束朝你这边时下竿：", body: "发光浮漂正好落进他的视线里。" },
        { title: "萤火虫罐扔得太近：", body: "他过去查看罐子，顺便就看见了站在旁边的你。" },
        { title: "慌忙冲进月光空地：", body: "堤坝阴影带虽然绕一点，却是唯一安全的路线。" },
      ],
    },
    {
      h2: "三星条件",
      list: [
        { title: "不被手电照到：", body: "全程避开光束。" },
        { title: "传说鱼：", body: "钓到月光银鱼。" },
        { title: "进阶：", body: "保留萤火虫罐不用。" },
      ],
    },
  ],
  primaryCta: "开始第2关",
  primaryHref: "/zh/play/",
  secondaryCta: "下一关：城市河道 →",
  secondaryHref: "/zh/levels/03-city-canal/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "第2关为什么总被照到？",
      a: "浮漂发光会引起注意，先等光束转走再下竿。",
    },
    {
      q: "月光银鱼什么时候出现？",
      a: "每局第二次月亮出云时刷新。",
    },
    {
      q: "不用道具能三星吗？",
      a: "可以，但更考验节奏。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "关卡", href: "/zh/levels/" },
    { label: "水库夜钓", href: "/zh/levels/02-reservoir-night/" },
  ],
  related: [
    { label: "上一关：第1关公园池塘攻略", href: "/zh/levels/01-park-pond/" },
    { label: "下一关：第3关城市河道攻略", href: "/zh/levels/03-city-canal/" },
    { label: "甩掉巡查员攻略：视野锥与道具", href: "/zh/guides/how-to-escape-inspector/" },
    { label: "老张的手电巡视", href: "/zh/characters/", note: "角色能力" },
  ],
};

export const level03En: ArticleContent = {
  locale: "en",
  path: "/levels/03-city-canal/",
  title: "City Canal Walkthrough: Dodge Two Inspectors | Angler Escape",
  description:
    "City Canal walkthrough for Angler Escape Level 3: read the crossing patrol, use bridge cover and the rubber duck, land the Neon Catfish, escape via the alley.",
  h1: "Level 3: City Canal Walkthrough",
  topNote:
    "In-game fiction only. City Canal is a made-up dusk stage with cartoon Inspectors and no real city location.",
  intro: [
    "This City Canal walkthrough covers Level 3. Dusk on the canal is Week 1's final exam: two Inspectors on crossing routes, noisy bystanders, and a legendary Neon Catfish waiting under the bridge.",
  ],
  sections: [
    {
      h2: "Overview",
      paragraphs: [
        "Two Inspectors. Bystanders who shout when you get a bite. New item: the Rubber Duck. Legendary fish: Neon Catfish (fictional). A bust here sends you into a harder Second Escape.",
      ],
    },
    {
      h2: "Reading the Crossing Patrol",
      paragraphs: [
        "The Inspectors meet mid-bridge every thirty seconds. The three seconds they spend back-to-back are the safest window in the level. Move then—or wait for the next meet.",
      ],
    },
    {
      h2: "Cover & Traps",
      subsections: [
        {
          title: "Under the bridge",
          body: "The best cover, but it has one exit. If it is blocked, you have to bolt into the open.",
        },
        {
          title: "Bystanders",
          body: 'They shout "Whoa, a bite!" and spike your noise. Keep your distance while fighting a fish.',
        },
      ],
    },
    {
      h2: "Escape Route",
      paragraphs: [
        "If the main road is blocked, cut through the left alley to the subway exit. A rubber duck stalls one chaser long enough to break the pincer.",
      ],
    },
    {
      h2: "Caught?",
      paragraphs: [
        "A bust on City Canal opens a tougher Second Escape with a shorter wriggle window. Practice that mode on its own page if the comeback feels brutal.",
      ],
      links: [
        { label: "Practice Second Escape →", href: "/play/second-escape/" },
      ],
    },
    {
      h2: "Common Rookie Mistakes",
      list: [
        { title: "Hiding under the bridge with no plan B:", body: "if one Inspector blocks the only exit, you are cornered." },
        { title: "Fighting a fish next to bystanders:", body: "their cheering spikes your noise meter at the worst moment." },
        { title: "Spending the Rubber Duck too early:", body: "save it for the pincer, when two chasers close in at once." },
      ],
    },
    {
      h2: "3-Star Criteria",
      list: [
        { title: "Unseen:", body: "no chase." },
        { title: "Legendary:", body: "land the Neon Catfish." },
        { title: "Speed:", body: "exit in under 90 seconds." },
      ],
    },
  ],
  primaryCta: "Play Level 3",
  primaryHref: "/play/",
  secondaryCta: "Practice Second Escape →",
  secondaryHref: "/play/second-escape/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "How do I dodge two Inspectors?",
      a: "Move during the 3-second back-to-back window mid-bridge.",
    },
    {
      q: "Where's the Neon Catfish?",
      a: "In deep water under the bridge, after the streetlights turn on.",
    },
    {
      q: "Is this the last level?",
      a: "It is the last one at launch. More levels are coming.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Levels", href: "/levels/" },
    { label: "City Canal", href: "/levels/03-city-canal/" },
  ],
  related: [
    { label: "Previous: Reservoir Night walkthrough", href: "/levels/02-reservoir-night/" },
    { label: "Practice Second Escape", href: "/play/second-escape/", note: "the comeback after a bust" },
    { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/" },
    { label: "Meet the Inspector squad", href: "/characters/" },
  ],
};

export const level03Zh: ArticleContent = {
  locale: "zh",
  path: "/levels/03-city-canal/",
  title: "第3关城市河道攻略｜双巡查员怎么躲 - 钓鱼佬大逃亡",
  description:
    "钓鱼佬大逃亡第3关城市河道攻略：两名巡查员交叉巡逻怎么躲、桥洞掩体、橡皮鸭诱饵、霓虹鲶鱼怎么钓、小巷逃跑路线与二次逃脱。纯虚构游戏技巧，请勿模仿。",
  h1: "第3关 城市河道攻略",
  topNote:
    "纯游戏虚构。城市河道是黄昏卡通关，巡查员与地点都不是现实映射。",
  intro: [
    "这篇第3关城市河道攻略专讲双巡查员怎么躲。黄昏河道是首周的期末考：两名巡查员交叉巡逻，围观路人爱起哄，桥下还藏着传说霓虹鲶鱼。",
  ],
  sections: [
    {
      h2: "关卡概况",
      paragraphs: [
        "2 名巡查员。路人咬钩会喊。新道具：橡皮鸭。传说鱼：霓虹鲶鱼（虚构）。本关被抓会进入更难的二次逃脱。",
      ],
    },
    {
      h2: "读懂交叉巡逻",
      paragraphs: [
        "两人每 30 秒在桥中央会合一次，背对背的那 3 秒是全关最安全的窗口。就在那时候动——或者等下一轮会合。",
      ],
    },
    {
      h2: "掩体与陷阱",
      subsections: [
        {
          title: "桥洞",
          body: "最强掩体，但只有一个出口，被堵就只能硬冲。",
        },
        {
          title: "围观路人",
          body: "靠近会涨噪音条（他们会喊「哇钓到了！」），搏鱼时尽量远离。",
        },
      ],
    },
    {
      h2: "逃跑路线",
      paragraphs: [
        "主路被堵时，从左侧小巷绕到地铁口出关。扔橡皮鸭可以拖住一个追兵，拆开包夹。",
      ],
    },
    {
      h2: "被抓了？",
      paragraphs: [
        "本关被抓直接进二次逃脱，难度比前两关高，挣脱时间更短。觉得难就先去二次逃脱页单独练。",
      ],
      links: [
        { label: "先练二次逃脱 →", href: "/zh/play/second-escape/" },
      ],
    },
    {
      h2: "新手常见翻车",
      list: [
        { title: "躲进桥洞却没想退路：", body: "一名巡查员堵住唯一出口，你就被包了饺子。" },
        { title: "在路人旁边搏鱼：", body: "他们一起哄，噪音条在最要命的时候爆表。" },
        { title: "橡皮鸭用得太早：", body: "留到两名追兵同时包夹时再扔。" },
      ],
    },
    {
      h2: "三星条件",
      list: [
        { title: "不被发现：", body: "不进入追击。" },
        { title: "传说鱼：", body: "钓到霓虹鲶鱼。" },
        { title: "速度：", body: "90 秒内出关。" },
      ],
    },
  ],
  primaryCta: "开始第3关",
  primaryHref: "/zh/play/",
  secondaryCta: "先练二次逃脱 →",
  secondaryHref: "/zh/play/second-escape/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "两个巡查员怎么躲？",
      a: "等他们在桥中央背对背的 3 秒窗口再行动。",
    },
    {
      q: "霓虹鲶鱼在哪？",
      a: "桥洞下方的深水区，路灯亮起后出现。",
    },
    {
      q: "第3关是最后一关吗？",
      a: "是首周的最后一关，后续还会更新。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "关卡", href: "/zh/levels/" },
    { label: "城市河道", href: "/zh/levels/03-city-canal/" },
  ],
  related: [
    { label: "上一关：第2关水库夜钓攻略", href: "/zh/levels/02-reservoir-night/" },
    { label: "二次逃脱：被抓了还能跑", href: "/zh/play/second-escape/", note: "被抓后的翻盘" },
    { label: "钓鱼佬游戏攻略：甩掉巡查员", href: "/zh/guides/how-to-escape-inspector/" },
    { label: "巡查员角色介绍", href: "/zh/characters/" },
  ],
};
