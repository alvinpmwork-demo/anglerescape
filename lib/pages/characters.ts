import type { ArticleContent } from "./types";

export const charactersEn: ArticleContent = {
  locale: "en",
  path: "/characters/",
  title: "Angler Escape Characters: Meet Ah Diao and Captain Zhang",
  description:
    "Meet the Angler Escape characters: Ah Diao, the fishing guy who swears he never goes Air Force, and Captain Zhang, the Inspector who always yells \"Stop!\"",
  h1: "Angler Escape Characters: The Angler and the Inspector",
  devNotice:
    "Only Second Escape is playable today. The character skills below (Soft Reel, Dodge Roll, Drop the Catch) belong to the full game, which is still in development.",
  intro: [
    "The Angler Escape characters are a classic comedy duo, and the game is a two-hander: one obsessive angler who will not go home empty-handed, and one cartoon captain who will not let him finish the cast. Both are fiction. Neither maps to a real person or agency.",
  ],
  sections: [
    {
      h2: 'The Angler, "Ah Diao"',
      images: [
        {
          src: "/game/angler.png",
          alt: "Ah Diao, the cartoon fishing guy: a smiling angler in a bucket hat and fishing vest with a rod over his shoulder",
          width: 128,
          height: 128,
          caption: "Ah Diao, the playable angler",
        },
      ],
      subsections: [
        {
          title: "Bio",
          body: 'Claims he "never goes Air Force". Straw hat, folding stool, will wait all day for a legendary bite—and still risk one more cast after the whistle blows.',
        },
        {
          title: "Skills",
          body: "Soft Reel (less noise), Dodge Roll (short burst), Drop the Catch (lighter means faster). All are game abilities, not real fishing tips.",
        },
        {
          title: "Catchphrase",
          body: '"One last cast. Really the last one."',
        },
      ],
    },
    {
      h2: 'The Inspector Captain, "Captain Zhang"',
      images: [
        {
          src: "/game/inspector.png",
          alt: "Captain Zhang, the fictional park Inspector: a stern patroller in a dark cap, olive work jacket and neon-yellow reflective vest, holding a flashlight",
          width: 128,
          height: 128,
          caption: "Captain Zhang, head of the fictional park patrol",
        },
      ],
      subsections: [
        {
          title: "Bio",
          body: "Head patroller of a fictional park office. The whistle is louder than he is, and his plain cap and reflective vest carry no insignia, badge, or agency name.",
        },
        {
          title: "Abilities",
          body: "Flashlight sweep, sound tracking, and a burst sprint when the chase meter flips to red.",
        },
        {
          title: "Catchphrase",
          body: '"Stop right there, angler!" / "You again?"',
        },
      ],
    },
    {
      h2: "Why the Fishing Guy vs Inspector Duo Works",
      paragraphs: [
        "Ah Diao is built on the Chinese internet's 钓鱼佬 (fishing guy) meme: endless optimism, zero catch, one more cast. Captain Zhang is the straight man who has heard every excuse twice. Neither is a villain. The joke is that both take a very small fish very seriously, and the chase is the punchline.",
      ],
      links: [{ label: "Read the fishing guy meme explainer →", href: "/meme/fishing-guy-meme/" }],
    },
    {
      h2: "Rivalry Highlights",
      paragraphs: [
        "Favorite slapstick beats (GIFs coming soon): a head-on bump at the bridge, a double slip on the docks, and the Captain zoning out for one perfect second during Second Escape.",
      ],
    },
    {
      h2: "Coming Soon",
      paragraphs: [
        "Inspector squad extras, a nosy bystander, and a black cat that steals your fish mid-run. Follow updates from the play hub.",
      ],
    },
  ],
  primaryCta: "Play as Ah Diao",
  primaryHref: "/play/",
  secondaryCta: "Learn to Outsmart the Captain →",
  secondaryHref: "/guides/how-to-escape-inspector/",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Can I play as the Inspector?",
      a: "Not yet. A reverse mode may come later.",
    },
    {
      q: "Are they based on real people?",
      a: "No. They are fictional cartoon characters.",
    },
    {
      q: "Can I unlock skins?",
      a: "Yes, through Daily Challenge rewards.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Characters", href: "/characters/" },
  ],
  related: [
    { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/", note: "outsmart Captain Zhang" },
    { label: "All levels and walkthroughs", href: "/levels/", note: "where the two meet" },
    { label: "Play as Ah Diao for free", href: "/play/" },
    { label: "Fishing guy meme explained", href: "/meme/fishing-guy-meme/" },
  ],
};

export const charactersZh: ArticleContent = {
  locale: "zh",
  path: "/characters/",
  title: "钓鱼佬大逃亡角色介绍｜钓鱼佬阿钓、巡查队长老张头像",
  description:
    "钓鱼佬大逃亡角色介绍：嘴上永不空军的钓鱼佬阿钓，和永远在喊「钓鱼佬，站住！」的巡查队长老张。人设、技能、口头禅、角色头像与名场面，全部虚构。",
  h1: "钓鱼佬大逃亡角色介绍",
  devNotice:
    "目前能玩的只有二次逃脱。下面写的角色技能（轻收竿、翻滚、丢鱼保命）属于还在开发中的完整版。",
  intro: [
    "钓鱼佬大逃亡角色介绍先说结论：主角只有一对冤家，整部游戏就是一出对手戏喜剧：一边是死不空军的钓鱼佬，一边是不让他把竿收完的卡通队长。两人都是虚构角色，不对应任何真实人物或机构。",
  ],
  sections: [
    {
      h2: "钓鱼佬「阿钓」",
      images: [
        {
          src: "/game/angler.png",
          alt: "钓鱼佬阿钓头像：戴渔夫帽、穿钓鱼马甲、肩扛鱼竿、笑眯眯的卡通钓鱼佬",
          width: 128,
          height: 128,
          caption: "钓鱼佬阿钓（玩家角色）",
        },
      ],
      subsections: [
        {
          title: "人设",
          body: "永不空军（嘴上）。草帽配马扎，为了一条传说鱼能蹲一整天——哨子响了还想再来最后一竿。",
        },
        {
          title: "技能",
          body: "轻收竿（降噪音）、翻滚（短距离冲刺）、丢鱼保命（减重加速）。都是游戏能力，不是现实钓鱼技巧。",
        },
        {
          title: "口头禅",
          body: "「最后一竿，真的最后一竿。」",
        },
      ],
    },
    {
      h2: "巡查队长「老张」",
      images: [
        {
          src: "/game/inspector.png",
          alt: "巡查队长老张头像：戴深色帽子、穿橄榄色工装外套和荧光黄反光背心、手拿手电筒、表情严肃的虚构公园巡查员",
          width: 128,
          height: 128,
          caption: "巡查队长老张（虚构公园巡逻队）",
        },
      ],
      subsections: [
        {
          title: "人设",
          body: "虚构公园管理处的巡查队长。哨子比嗓门大，一顶普通帽子加一件荧光反光背心，没有任何标识、徽章或机构名。",
        },
        {
          title: "能力",
          body: "手电巡视、听声辨位，以及追击条变红时的关键冲刺。",
        },
        {
          title: "口头禅",
          body: "「钓鱼佬，站住！」「又是你？」",
        },
      ],
    },
    {
      h2: "钓鱼佬 vs 巡查员：这对组合为什么好笑",
      paragraphs: [
        "阿钓的人设直接来自网上的钓鱼佬梗：永远乐观、永远空军、永远「最后一竿」。老张则是那个什么借口都听过两遍的捧哏。两人都不是反派，笑点在于他们都把一条小鱼看得特别重，而追逐就是包袱。",
      ],
      links: [{ label: "看钓鱼佬梗是什么意思 →", href: "/zh/meme/fishing-guy-meme/" }],
    },
    {
      h2: "相爱相杀名场面",
      paragraphs: [
        "经典无厘头瞬间（动图稍后上线）：桥上撞个正着、码头一起摔跤、二次逃脱时老张转身发呆那一秒。",
      ],
    },
    {
      h2: "即将登场",
      paragraphs: [
        "巡查员小队、围观大爷，以及会偷你鱼的黑猫。可从开始玩页面留意更新。",
      ],
    },
  ],
  primaryCta: "扮演阿钓开始逃亡",
  primaryHref: "/zh/play/",
  secondaryCta: "看甩掉老张攻略 →",
  secondaryHref: "/zh/guides/how-to-escape-inspector/",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "能扮演巡查队长吗？",
      a: "目前不能，后续可能开放反向模式。",
    },
    {
      q: "角色有原型吗？",
      a: "没有，全部是虚构的卡通角色。",
    },
    {
      q: "阿钓能换装吗？",
      a: "每日挑战可以解锁草帽等皮肤。",
    },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "角色", href: "/zh/characters/" },
  ],
  related: [
    { label: "钓鱼佬游戏攻略：甩掉巡查员", href: "/zh/guides/how-to-escape-inspector/", note: "怎么甩掉老张" },
    { label: "钓鱼佬大逃亡关卡攻略大全", href: "/zh/levels/", note: "两人交手的地方" },
    { label: "扮演阿钓，钓鱼小游戏在线玩", href: "/zh/play/" },
    { label: "钓鱼佬梗是什么意思", href: "/zh/meme/fishing-guy-meme/" },
  ],
};
