import type { ArticleContent } from "./types";

export const playEn: ArticleContent = {
  locale: "en",
  path: "/play/",
  title: "Play Angler Escape Online | Free Browser Stealth Fishing Game",
  description:
    "Play Angler Escape in your browser: jump into Second Escape now, browse levels, and learn how to shake the Inspector. Pure fiction casual game.",
  h1: "Play Angler Escape",
  intro: [
    "Pick how you want to jump in. Second Escape is ready to play today. Full heist levels and more modes are rolling out behind the same short, slapstick loop: steal, get spotted, run—and escape again.",
  ],
  sections: [
    {
      h2: "Playable Now",
      cards: [
        {
          title: "Second Escape",
          meta: "Playable demo",
          body: "Start already caught and claw back a cartoon getaway. Short rounds, instant retries.",
          href: "/play/second-escape/",
        },
      ],
    },
    {
      h2: "Coming Soon on This Hub",
      paragraphs: [
        "Full heist runs for Park Pond, Reservoir Night, and City Canal will plug in here as demos land. Until then, use the walkthroughs to learn the routes and practice the comeback mode.",
      ],
      cards: [
        {
          title: "Levels overview",
          body: "Difficulty, Inspectors, legendary fish, and walkthrough links.",
          href: "/levels/",
        },
        {
          title: "Escape guide",
          body: "Vision cones, noise meter, decoys, and Second Escape tips.",
          href: "/guides/how-to-escape-inspector/",
        },
      ],
    },
    {
      h2: "Quick Links",
      links: [
        { label: "Characters →", href: "/characters/" },
        { label: "Similar games →", href: "/similar-games/" },
        { label: "Fiction disclaimer →", href: "/about/fishing-rules-disclaimer/" },
      ],
    },
  ],
  primaryCta: "Launch Second Escape",
  primaryHref: "/play/second-escape/",
  secondaryCta: "Browse Levels →",
  secondaryHref: "/levels/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Is Angler Escape free to play?",
      a: "Yes. The browser demos on this site are free.",
    },
    {
      q: "Do I need to download anything?",
      a: "No. Play in your browser on desktop or mobile.",
    },
    {
      q: "Is this real fishing advice?",
      a: "No. Angler Escape is pure fiction entertainment.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Play", href: "/play/" },
  ],
};

export const playZh: ArticleContent = {
  locale: "zh",
  path: "/play/",
  title: "开始玩钓鱼佬大逃亡｜浏览器免费潜行钓鱼小游戏",
  description:
    "浏览器开始玩钓鱼佬大逃亡：立刻进入二次逃脱，浏览关卡，学习怎么甩掉巡查员。纯虚构休闲小游戏。",
  h1: "开始玩钓鱼佬大逃亡",
  intro: [
    "选你想怎么开玩。二次逃脱今天就能上手；完整摸鱼大逃亡关卡会陆续接到同一个短局循环里：偷钓、被发现、逃跑——被抓了还能再逃。",
  ],
  sections: [
    {
      h2: "现在就能玩",
      cards: [
        {
          title: "二次逃脱",
          meta: "可玩 demo",
          body: "开局就被抓住，再从卡通窘境里翻盘。短局，失败立刻重来。",
          href: "/zh/play/second-escape/",
        },
      ],
    },
    {
      h2: "本页即将接入",
      paragraphs: [
        "公园池塘、水库夜钓、城市河道的完整摸鱼流程会在 demo 就绪后接到这里。在此之前，先看关卡攻略熟悉路线，并用二次逃脱练翻盘。",
      ],
      cards: [
        {
          title: "关卡总览",
          body: "难度、巡查员、传说鱼与攻略入口。",
          href: "/zh/levels/",
        },
        {
          title: "甩掉巡查员攻略",
          body: "视野锥、噪音条、道具与二次逃脱技巧。",
          href: "/zh/guides/how-to-escape-inspector/",
        },
      ],
    },
    {
      h2: "快捷入口",
      links: [
        { label: "角色介绍 →", href: "/zh/characters/" },
        { label: "类似游戏 →", href: "/zh/similar-games/" },
        { label: "虚构免责声明 →", href: "/zh/about/fishing-rules-disclaimer/" },
      ],
    },
  ],
  primaryCta: "立刻二次逃脱",
  primaryHref: "/zh/play/second-escape/",
  secondaryCta: "浏览关卡 →",
  secondaryHref: "/zh/levels/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "钓鱼佬大逃亡免费吗？",
      a: "是的，本站浏览器试玩免费。",
    },
    {
      q: "需要下载吗？",
      a: "不用，手机和电脑浏览器都能玩。",
    },
    {
      q: "这是现实钓鱼建议吗？",
      a: "不是。本游戏纯属虚构娱乐。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "开始玩", href: "/zh/play/" },
  ],
};
