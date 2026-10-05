import type { ArticleContent } from "./types";

export const charactersEn: ArticleContent = {
  locale: "en",
  path: "/characters/",
  title: "Characters: The Angler & the Inspector Captain | Angler Escape",
  description:
    "Meet Angler Escape's cast: Ah Diao, the never-say-zero-catch angler, and Captain Zhang, who always yells \"Stop right there!\" Skills, catchphrases, fictional rivalry.",
  h1: "Meet the Characters",
  intro: [
    "Angler Escape is a two-hander comedy: one obsessive angler who will not go home empty-handed, and one cartoon captain who will not let him finish the cast. Both are fiction. Neither maps to a real person or agency.",
  ],
  sections: [
    {
      h2: 'The Angler, "Ah Diao"',
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
      subsections: [
        {
          title: "Bio",
          body: "Head patroller of a fictional park office. The whistle is louder than he is, and his cartoon uniform has no real insignia, badge, or agency name.",
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
};

export const charactersZh: ArticleContent = {
  locale: "zh",
  path: "/characters/",
  title: "角色介绍：钓鱼佬与巡查队长｜钓鱼佬大逃亡",
  description:
    "认识钓鱼佬大逃亡的角色：执念满满的钓鱼佬阿钓、永远在喊「站住」的巡查队长老张。技能、口头禅、相爱相杀名场面，全部虚构。",
  h1: "钓鱼佬大逃亡角色介绍",
  intro: [
    "《钓鱼佬大逃亡》是对手戏喜剧：一边是死不空军的钓鱼佬，一边是不让他把竿收完的卡通队长。两人都是虚构角色，不对应任何真实人物或机构。",
  ],
  sections: [
    {
      h2: "钓鱼佬「阿钓」",
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
      subsections: [
        {
          title: "人设",
          body: "虚构公园管理处的巡查队长。哨子比嗓门大，穿卡通制服，没有任何真实标识、徽章或机构名。",
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
};
