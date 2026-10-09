export type Locale = "en" | "zh";

export type FaqItem = { q: string; a: string };

export type HomeContent = {
  locale: Locale;
  title: string;
  description: string;
  h1: string;
  /** one-line hero subhead above the embedded game */
  subhead: string;
  trustLabels: string[];
  /** one-line controls hint under the embedded game (only real controls) */
  gameHint: string;
  intro: string[];
  primaryCta: string;
  secondaryCta: string;
  disclaimer: string;
  sectionStealthTitle: string;
  sectionStealthBody: string[];
  sectionLoopTitle: string;
  sectionLoopIntro: string;
  acts: { title: string; body: string }[];
  whyTitle: string;
  whyItems: { title: string; body: string }[];
  howTitle: string;
  howIntro: string;
  howSteps: string[];
  /** label for the planned full-heist steps (not playable yet) */
  howFutureTitle: string;
  howFutureSteps: string[];
  howOutro: string;
  faqTitle: string;
  faq: FaqItem[];
  /** "What's next" card below the game (full heist is in development) */
  nextTitle: string;
  nextBody: string;
  relatedTitle: string;
  related: RelatedLink[];
  navHome: string;
  navSecond: string;
  langSwitchLabel: string;
  langSwitchHref: string;
  footerHow: string;
  footerDisclaimer: string;
  siteName: string;
};

export type RelatedLink = { label: string; href: string; note?: string };

export type SecondEscapeContent = {
  locale: Locale;
  title: string;
  description: string;
  h1: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  disclaimer: string;
  bustTitle: string;
  bustBody: string[];
  backFootTitle: string;
  backFootIntro: string;
  subsections: { title: string; body: string }[];
  breakTitle: string;
  breakBody: string;
  routesTitle: string;
  routes: { name: string; desc: string }[];
  highlightTitle: string;
  highlightBody: string;
  practiceTitle: string;
  practiceBody: string;
  faqTitle: string;
  faq: FaqItem[];
  /** "How to play" section right under the canvas (real controls only) */
  howTitle: string;
  howSteps: string[];
  breadcrumbs: { label: string; href: string }[];
  relatedTitle: string;
  related: RelatedLink[];
  navHome: string;
  navSecond: string;
  langSwitchLabel: string;
  langSwitchHref: string;
  footerHow: string;
  footerDisclaimer: string;
  siteName: string;
};

export const DISCLAIMER_EN =
  "※ Pure fiction casual-game entertainment. No real-world illegal fishing, poaching, or escape advice. Do not try this IRL.";

export const DISCLAIMER_ZH =
  "※ 本站为纯虚构休闲小游戏内容，不含任何现实非法捕捞、偷钓或逃脱建议，请勿模仿。";

export const homeEn: HomeContent = {
  locale: "en",
  title: "Angler Escape: Free Stealth Fishing Game in Your Browser",
  description:
    "Angler Escape is a funny stealth fishing game: sneak a catch, get spotted by the Inspector, run, and escape again. Free in your browser, pure fiction.",
  h1: "Angler Escape: The Stealth Fishing Game Where You Steal, Get Spotted, and Run",
  subhead:
    "You've already been caught. Slip past the Inspector's flashlight, hide behind the rocks, and reach the bush to save your gear.",
  trustLabels: ["Free", "No download", "~30s run", "Phone & desktop"],
  gameHint: "Arrow keys / WASD or the on-screen pad · Rocks block the light · Don't bump into the Inspector",
  intro: [
    'Angler Escape is a free stealth fishing game you play right in your browser. Somewhere past the "Private Pond" sign there\'s a fish everyone has heard about and no one has actually landed. You have a rod, a bucket, and way too much confidence. What could go wrong? Pretty much everything, and that\'s the game.',
    "It plays like a comedy heist. You sneak in, hook something you shouldn't, get spotted at the worst moment, and run for it. If they catch you, you get to run again. The rounds are short, the fails are loud, and the Inspector is always a little too close. The whole thing riffs on the Chinese internet's 钓鱼佬 (\"fishing guy\") meme, and every bit of it is cartoon fiction.",
  ],
  primaryCta: "▶ Play Second Escape",
  secondaryCta: "Open Second Escape on its own page →",
  disclaimer: DISCLAIMER_EN,
  sectionStealthTitle: "This Isn't a Fishing Sim. It's a Stealth Comedy.",
  sectionStealthBody: [
    "Forget patient sunrise casts and arguing about lure weights. In Angler Escape the fishing takes about three seconds. The tension comes from everything around it. A patrol walks by on a loop, a flashlight sweeps the reeds, and your bucket makes a noise every time it moves.",
    "You hold still and creep along the bank, waiting for your gap. Then you strike. Sometimes it goes perfectly. More often a giant carp slaps the water and every head in the park turns toward you. It's a lot like sneaking a snack during a meeting, except the snack weighs twelve pounds and is still flopping.",
  ],
  sectionLoopTitle: "The Four-Act Loop: Steal → Spotted → Escape → Escape Again",
  sectionLoopIntro:
    'The full game is built around one simple four-act structure, which is why "one more try" happens so often. Act 4, Second Escape, is playable right now at the top of this page; Acts 1–3 are in development.',
  acts: [
    {
      title: "Act 1: Keep It Quiet",
      body: "Read the patrol route, find the blind spot, and get your line in the water before anyone notices. Timing matters more than speed here. The legendary fish only bites when you've been patient, which is exactly when patience gets hard.",
    },
    {
      title: "Act 2: Spotted? Totally Normal.",
      body: 'A slipped foot, a squeaky bucket, a splash way too big for the fish you caught. Any of these can trigger the dreaded "Hey! You! Angler! Stop right there!" Getting spotted isn\'t failing. It\'s the moment the real game starts.',
    },
    {
      title: "Act 3: The Great Escape",
      body: "Now you're running with a fish under one arm. Dodge benches, duck behind bushes, break line of sight, and head for the exit. The guard is faster than you'd like and your bucket is louder than you'd like. Clean getaways do happen. Ridiculous near-misses happen more.",
    },
    {
      title: "Act 4: Caught? Run Again.",
      body: "This is the part that makes Angler Escape different: you can get caught and escape again. In Second Escape mode the bust is just a plot twist. You start cornered, at a disadvantage, and you get one more cartoonish shot at freedom. It's fiction, it's slapstick, and it's the most satisfying part of the game.",
    },
  ],
  whyTitle: "Why Players Keep Coming Back",
  whyItems: [
    {
      title: "Short rounds.",
      body: 'One run fits in a coffee break, or in the gap between "I\'ll stop after this one" and the one after that.',
    },
    {
      title: "Big contrast.",
      body: "You spend ten quiet seconds tiptoeing, then ten seconds of total chaos. The switch from silence to sirens works every single time.",
    },
    {
      title: "Screenshot-worthy fails.",
      body: "Getting caught mid-cast with a fish on the line is the kind of moment you'll want to send to your group chat.",
    },
    {
      title: "A twist on sneaky fishing games.",
      body: 'If you like cozy, sneaky fishing comedies, you\'ll feel right at home. Angler Escape just keeps going after the bust and makes "caught, then escaped again" its signature move.',
    },
  ],
  howTitle: "How to Play (Free, No Download)",
  howIntro:
    "No download and no install. Angler Escape is a browser stealth game that runs on desktop or mobile, and a run takes about as long as a coffee break.",
  howSteps: [
    "Click or tap the game above (or press Space once it's selected) to start Second Escape. The full heist run is coming soon.",
    "Move with the arrow keys or WASD; on a phone, use the on-screen pad.",
    "Stay out of the Inspector's flashlight. Rocks block the light, so sneak through their shadows.",
    "Don't bump into the Inspector, and reach the green EXIT bush to save your gear.",
  ],
  howFutureTitle: "Coming in the full heist (in development):",
  howFutureSteps: [
    "Watch the patrol, pick your moment, and land your fish.",
    "When you get spotted (you will), run for the exit.",
    "Caught anyway? That's where Second Escape kicks in.",
  ],
  howOutro:
    "Want a bigger screen? Second Escape also has its own page.",
  faqTitle: "FAQ",
  faq: [
    {
      q: "What kind of game is Angler Escape?",
      a: "It's a fictional, lighthearted stealth fishing game. You sneak in, grab a fish, get spotted, run, and if things go badly, escape a second time. Think of it as a heist comedy where the loot has fins.",
    },
    {
      q: 'What does "get caught and escape again" mean?',
      a: "It's the hook of our Second Escape mode. When the main run ends in a bust, the story isn't over: you get a second chance to slip away. It's a purely story-driven game mechanic.",
    },
    {
      q: "How is it different from other sneaky fishing games like unBAITable?",
      a: "Same goofy, cozy energy. Angler Escape puts more focus on the full chain of getting spotted, escaping, and then escaping a second time, so the chase is the main event instead of an occasional surprise.",
    },
    {
      q: "Does this game teach real-world fishing tricks or how to avoid getting caught?",
      a: "No. Everything here is cartoon fiction made for laughs. There's no real-world fishing, poaching, or escape advice in the game or on this site. Please fish legally and follow local rules.",
    },
    {
      q: "Can I play on my phone?",
      a: "Yes. Angler Escape runs in your browser and plays well on both mobile and desktop. Rounds are short, so it's a good fit for quick breaks.",
    },
  ],
  nextTitle: "What's next:",
  nextBody:
    "the full heist (sneak in → hook the fish → get spotted → run) is in development. Second Escape above is the playable comeback round.",
  relatedTitle: "Explore Angler Escape",
  related: [
    { label: "Play the free fishing game online", href: "/play/", note: "every playable mode in one hub" },
    { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/", note: "planned full-game mechanics (in development)" },
    { label: "All levels and walkthroughs", href: "/levels/", note: "Park Pond, Reservoir Night, City Canal (in development)" },
    { label: "Meet the angler and the Inspector", href: "/characters/", note: "Ah Diao vs Captain Zhang" },
    { label: "The Chinese fishing guy meme", href: "/meme/fishing-guy-meme/", note: "钓鱼佬 and \"Air Force\" explained" },
    { label: "Games like unBAITable", href: "/similar-games/", note: "more sneaky fishing games" },
  ],
  navHome: "Home",
  navSecond: "Second Escape",
  langSwitchLabel: "中文",
  langSwitchHref: "/zh/",
  footerHow: "How to Play",
  footerDisclaimer: "Disclaimer",
  siteName: "Angler Escape",
};

export const homeZh: HomeContent = {
  locale: "zh",
  title: "钓鱼佬游戏《钓鱼佬大逃亡》｜被抓了还能跑的潜行小游戏",
  description:
    "钓鱼佬游戏《钓鱼佬大逃亡》：偷偷摸鱼、被巡查员发现、撒腿狂奔，被抓了还能二次逃脱！浏览器免费玩的搞笑钓鱼佬小游戏，手机电脑都能玩，无需下载，纯属虚构娱乐。",
  h1: "钓鱼佬大逃亡：摸鱼翻车、拔腿就跑的钓鱼佬游戏",
  subhead: "刚被巡查员逮住？躲开手电光、借石头阴影溜进灌木丛出口，把装备保下来。",
  trustLabels: ["免费", "无需下载", "一局约 30 秒", "手机电脑都能玩"],
  gameHint: "方向键 / WASD 或屏幕方向键移动 · 石头能挡光 · 别撞上巡查员",
  intro: [
    '《钓鱼佬大逃亡》是一款打开浏览器就能免费玩的钓鱼佬游戏。"闲人免进"的牌子后面，据说住着一条传说中的大鱼。人人都听说过，谁也没钓上来过。你手里一根竿、一个桶，外加一份完全不知道从哪来的自信。能出什么事呢？什么事都能出，这正是这个游戏好玩的地方。',
    "《钓鱼佬大逃亡》是一款当喜剧来玩的潜行钓鱼小游戏：悄悄摸进去，钓一条不该钓的鱼，在最要命的时候被发现，然后撒腿就跑。要是被抓了？没事，被抓了还能跑。一局很短，翻车动静很大，巡查员永远离你只差那么一点。灵感来自网上的钓鱼佬梗——钓鱼佬永不空军，嘴上说的。",
  ],
  primaryCta: "▶ 马上开逃",
  secondaryCta: "打开二次逃脱单独页面 →",
  disclaimer: DISCLAIMER_ZH,
  sectionStealthTitle: "这不是正经钓鱼，是潜行喜剧",
  sectionStealthBody: [
    "别指望日出抛竿、慢慢等口，也不用纠结铅坠几克。在《钓鱼佬大逃亡》里，钓鱼本身大概只要三秒，真正紧张的是钓鱼之外的那些事：巡逻按固定路线来回走，手电光扫过芦苇丛，鱼桶稍微一动就“哐当”一声。",
    "你得屏住呼吸，贴着岸边一点点挪，等那个空档，然后果断出手。偶尔一气呵成，更多时候是一条大鲤鱼“啪”地甩出个大水花，全场目光唰地全落到你身上。这感觉就像开会时偷吃零食，只不过零食有十几斤重，而且还在扑腾。专治上班摸鱼欲。",
  ],
  sectionLoopTitle: "四幕循环：偷 → 发现 → 逃 → 再逃",
  sectionLoopIntro:
    "完整版的每一局都是同一个简单结构，所以“再来一把”根本停不下来。第四幕「二次逃脱」现在就能在本页顶部玩，前三幕还在开发中。",
  acts: [
    {
      title: "第一幕：下手要轻",
      body: "看清巡逻路线，找到视野死角，在没人注意时把线甩进水里。这一幕拼的是时机，不是手速。传说中的鱼只在你足够有耐心的时候咬钩，偏偏这个时候最难忍住。",
    },
    {
      title: "第二幕：被发现了？正常操作",
      body: "脚下一滑、鱼桶一响，或者水花大得跟钓上来的鱼完全不成比例，都可能触发那句经典台词：“钓鱼佬，站住！” 被发现不算输，这才是好戏开场。",
    },
    {
      title: "第三幕：大逃亡开场",
      body: "现在你夹着一条鱼开跑了。绕开长椅、钻进灌木、甩掉视线、直奔出口。保安比你想的快，鱼桶比你想的响。完美脱身有，但更多的是各种离谱的险些被抓。",
    },
    {
      title: "第四幕：被抓了还能跑",
      body: "这是《钓鱼佬大逃亡》最不一样的地方：被抓了，还能再逃一次。在「二次逃脱」模式里，被抓只是剧情反转。你开局就被逼到墙角、处处被动，但还有一次卡通式的翻盘机会。纯属虚构，纯属搞笑，也是整个游戏最爽的部分。",
    },
  ],
  whyTitle: "为什么玩家会回来反复刷",
  whyItems: [
    {
      title: "短局。",
      body: "一局刚好一杯咖啡的时间，或者从“玩完这把就停”到“再来最后一把”中间那点时间。",
    },
    {
      title: "高反差。",
      body: "前十秒蹑手蹑脚，后十秒鸡飞狗跳。从安安静静到警报大作，这种切换每次都好使。",
    },
    {
      title: "可截图的翻车名场面。",
      body: "鱼刚上钩就被逮个正着，这种画面你一定想发到群里。",
    },
    {
      title: "熟悉的偷偷钓鱼玩法，加点不一样的。",
      body: "喜欢偷偷钓个鱼这类轻松摸鱼风的话，你会很快上手。《钓鱼佬大逃亡》的不同是被抓之后游戏还没完，“抓了再逃”就是它的招牌。",
    },
  ],
  howTitle: "怎么开玩（免费、无需下载）",
  howIntro: "这是一款网页潜行钓鱼小游戏：浏览器就能上，无需下载、无需安装，手机电脑都能玩，一局也就一杯咖啡的工夫。",
  howSteps: [
    "点一下上面的游戏（选中后也可以按空格），开始二次逃脱。完整的摸鱼大逃亡流程即将上线。",
    "方向键或 WASD 移动；手机上用画面下方的方向键。",
    "别待在巡查员的手电光里。石头能挡光，借它的阴影潜行。",
    "别撞上巡查员，冲进绿色「出口」草丛，装备就保住了。",
  ],
  howFutureTitle: "完整版流程预告（开发中）：",
  howFutureSteps: [
    "观察巡逻，挑准时机，把鱼钓上来。",
    "被发现时（一定会被发现）往出口冲。",
    "还是被抓了？这时就轮到二次逃脱登场。",
  ],
  howOutro: "想要更大的画面？二次逃脱也有单独的页面。",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "《钓鱼佬大逃亡》是什么游戏？",
      a: "一款虚构的轻松潜行钓鱼小游戏：摸进去、钓条鱼、被发现、开跑，翻车了还能再逃一次。可以理解成一部战利品长着鱼鳍的盗宝喜剧。",
    },
    {
      q: "“被抓了还能跑”是什么意思？",
      a: "这是我们「二次逃脱」模式的核心。主流程被抓之后故事还没结束，你还有第二次溜走的机会。这是纯剧情向的游戏玩法。",
    },
    {
      q: "和偷偷钓个鱼、unBAITable 这类游戏有什么区别？",
      a: "同样是幽默轻松的路线。《钓鱼佬大逃亡》更突出“被发现 → 逃亡 → 二次逃脱”这条完整链路，追逐和逃跑就是主菜，不只是偶尔来一下的意外。",
    },
    {
      q: "游戏会教现实中怎么偷钓或者躲避检查吗？",
      a: "不会。这里的一切都是为了好笑而做的卡通虚构内容，游戏和本站都不含任何现实捕捞、偷钓或逃脱建议。现实钓鱼请遵守当地规定，文明垂钓。",
    },
    {
      q: "手机能玩吗？",
      a: "能。游戏在浏览器里运行，手机和电脑都能流畅游玩。一局很短，碎片时间正合适。",
    },
  ],
  nextTitle: "接下来：",
  nextBody: "完整版「潜入 → 钓鱼 → 被发现 → 逃跑」正在开发，上面的二次逃脱是现在就能玩的翻盘关。",
  relatedTitle: "继续逛逛",
  related: [
    { label: "钓鱼小游戏在线玩", href: "/zh/play/", note: "所有可玩模式入口" },
    { label: "钓鱼佬游戏攻略：甩掉巡查员", href: "/zh/guides/how-to-escape-inspector/", note: "完整版机制预告（开发中）" },
    { label: "钓鱼佬大逃亡关卡攻略大全", href: "/zh/levels/", note: "公园池塘、水库夜钓、城市河道（开发中）" },
    { label: "钓鱼佬阿钓与巡查队长老张", href: "/zh/characters/", note: "角色介绍" },
    { label: "钓鱼佬梗是什么意思？", href: "/zh/meme/fishing-guy-meme/", note: "空军、永不空军一次看懂" },
    { label: "类似偷偷钓个鱼的游戏", href: "/zh/similar-games/", note: "同类钓鱼佬小游戏推荐" },
    { label: "路亚跑毒是什么意思？", href: "/zh/meme/luya-paodu/", note: "毒区、跑毒、百万撤离梗科普" },
  ],
  navHome: "首页",
  navSecond: "二次逃脱",
  langSwitchLabel: "English",
  langSwitchHref: "/",
  footerHow: "怎么开玩",
  footerDisclaimer: "免责声明",
  siteName: "钓鱼佬大逃亡",
};

export const secondEn: SecondEscapeContent = {
  locale: "en",
  title: "Second Escape: Stealth Escape Game Online, Free to Play",
  description:
    "Second Escape is a free stealth escape game online: get caught, then sneak past the Inspector's flashlight and escape again. No download, pure fiction.",
  h1: "Second Escape: Get Caught, Then Escape Again in This Stealth Escape Game",
  intro:
    "Second Escape is a free stealth escape game you can play online right now, no download needed. In most stealth games, getting caught means game over. In Angler Escape, it means intermission. You've been spotted, chased, and finally collared, fish still in hand, looking very guilty. Second Escape picks up right there. The story isn't over and neither is your run.",
  primaryCta: "Launch Second Escape",
  secondaryCta: "Back to the Angler Escape homepage →",
  disclaimer: DISCLAIMER_EN,
  bustTitle: "The Bust Is Where the Fun Starts",
  bustBody: [
    "Every main run in the full Angler Escape game (in development) follows the same arc: steal, get spotted, escape. Second Escape is the fourth act, the comeback no one expected. Your sneaky plan has completely fallen apart, the guard is very pleased with himself, and you've just made a terrible first impression. Good. It's a lot more interesting to escape from the bottom.",
    "The mode is pure slapstick. Think cartoon chase, not real-life getaway. Every trick in it only works because it's a game.",
  ],
  backFootTitle: "You Start on the Back Foot",
  backFootIntro:
    "Second Escape starts out unfair on purpose. You're cornered, your options are limited, and someone is watching you closely. You don't get a quiet setup phase, and nobody is going to look away while you get ready.",
  subsections: [
    {
      title: "Read the Room, Fast (full-game mechanic, in development)",
      body: "The guard has habits. Watch for the moment their attention slips: a sneeze, a distraction, a stubborn walkie-talkie. Those few seconds are your window. Hesitate and it closes.",
    },
    {
      title: "Every Move Is Louder Now (full-game mechanic, in development)",
      body: "Your bucket is still squeaking. The fish is still flopping. In Second Escape every bit of noise counts double, so choose carefully when to move and when to freeze like a very nervous garden statue.",
    },
  ],
  breakTitle: "Spotted by the Inspector? Use the Rocks, Then Bolt for the Exit",
  breakBody:
    "In this level your only cover is the rocks. The Inspector's flashlight can't shine through them, so their shadows are safe: duck into one and you'll see \"hidden\" above your head. Wait for the beam to swing away, hop to the next rock, then make a run for the green EXIT bush in the top-right corner. Don't look back. Or look back once, for drama, just don't bump into the Inspector.",
  routesTitle: "Full-Game Preview: More Escape Routes (In Development)",
  routes: [
    {
      name: "The hedge hop:",
      desc: "slower, but it keeps you hidden longest.",
    },
    {
      name: "The dock dash:",
      desc: "fast and risky, with a lot of slippery planks.",
    },
    {
      name: "The bold walk:",
      desc: "walk past casually and hope nobody asks. Not recommended. Very funny when it works.",
    },
  ],
  highlightTitle: "Win or Lose, It's a Highlight Reel",
  highlightBody:
    "A clean getaway feels amazing: tail flapping and freedom ahead. Getting caught a second time can be even better, because nothing beats a slow-motion re-bust a few steps from the exit. Either way you'll end up with a story, and probably a screenshot.",
  practiceTitle: "Practice Here, Then Run the Full Heist When It Launches",
  practiceBody:
    "Second Escape is a great place to sharpen your timing because it squeezes the best part of the game into a short, intense round. The full heist, from the first quiet cast to the final getaway, is still in development. When it lands, see if you can finish without needing a second escape at all. (You'll still need one. That's fine.)",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Is Second Escape a separate mode?",
      a: "Yes. You can launch Second Escape directly as its own mode, right on this page. In the full Angler Escape game (in development) it will also be the fourth act that kicks in after you get caught in the main story.",
    },
    {
      q: "Do I need to finish the main run first?",
      a: "No. The main run is still in development, so Second Escape is the playable part today. Jump straight in from this page.",
    },
    {
      q: "Is Second Escape hard?",
      a: "It's short but tense: you start already caught, the Inspector's flashlight keeps sweeping, and standing in the light fills the detection meter fast. Rounds take about 30 seconds and retries are instant, so a few failed attempts are part of the fun.",
    },
    {
      q: 'What does "get caught and escape again" actually mean?',
      a: "It's the core idea of this mode: getting caught isn't the end of the run. You get a second, fictional shot at slipping away. It's a story-driven game mechanic, not a real-world concept.",
    },
    {
      q: "Does this teach any real-world escape or fishing tricks?",
      a: "No. Second Escape is cartoon fiction made for laughs. There's no real-world fishing, poaching, or escape advice here. In real life, follow local fishing rules and cooperate with officials.",
    },
  ],
  howTitle: "How to Play: Dodge the Inspector's Flashlight",
  howSteps: [
    "Start: tap the game, or press Space / an arrow key.",
    "Move: arrow keys or WASD; on a phone, use the on-screen pad below the game.",
    "Stay out of the flashlight: while it's on you, the Detection meter rises. Fill it and you're spotted.",
    "Rocks block the light. Hide in their shadows and you'll see \"hidden\".",
    "Don't bump into the Inspector, or you're caught.",
    "Reach the green EXIT bush in the top-right corner to save your gear. Failed? Press Space / Enter or tap to retry instantly.",
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Play", href: "/play/" },
    { label: "Second Escape", href: "/play/second-escape/" },
  ],
  relatedTitle: "Related Pages",
  related: [
    { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/", note: "the full in-game escape guide" },
    { label: "City Canal walkthrough", href: "/levels/03-city-canal/", note: "planned level, in development" },
    { label: "Meet Captain Zhang, the Inspector", href: "/characters/", note: "know who you're running from" },
    { label: "Free fishing game online hub", href: "/play/", note: "all playable modes" },
    { label: "Back to the stealth fishing game homepage", href: "/" },
  ],
  navHome: "Home",
  navSecond: "Second Escape",
  langSwitchLabel: "中文",
  langSwitchHref: "/zh/play/second-escape/",
  footerHow: "How to Play",
  footerDisclaimer: "Disclaimer",
  siteName: "Angler Escape",
};

export const secondZh: SecondEscapeContent = {
  locale: "zh",
  title: "管理员追钓鱼佬游戏：二次逃脱｜钓鱼佬逃跑小游戏在线玩",
  description:
    "管理员追钓鱼佬小游戏《钓鱼佬大逃亡·二次逃脱》：被巡查员逮住后躲开手电光、借石头阴影溜进出口，保住装备。免费在线玩，一局约30秒，手机电脑都能玩，纯属虚构。",
  h1: "二次逃脱：管理员追钓鱼佬，被抓了还能跑",
  intro:
    "钓鱼佬被抓了还能跑？在这款管理员追钓鱼佬的逃跑小游戏里可以：免费在线玩，无需下载，一局大约 30 秒。追你的是巡查员（管理员），纯属虚构的卡通角色。大多数潜行游戏里，被抓就是 Game Over。在《钓鱼佬大逃亡》里，被抓只是中场休息。你被发现了、被追了、最后被一把揪住，手里还拎着那条鱼，一脸心虚。「二次逃脱」就从这一刻开始：故事没完，这一局也没完。",
  primaryCta: "立刻二次逃脱",
  secondaryCta: "回钓鱼佬大逃亡首页 →",
  disclaimer: DISCLAIMER_ZH,
  bustTitle: "主流程翻车后，好戏才开始",
  bustBody: [
    "《钓鱼佬大逃亡》完整版（开发中）的每一局主流程都是同一条线：偷鱼、被发现、逃跑。二次逃脱就是第四幕，谁都没想到的绝地翻盘。你精心设计的潜行计划已经彻底崩了，保安正得意洋洋，你的第一印象也糟透了。挺好，从谷底往外逃才最有意思。",
    "这个模式是纯粹的无厘头喜剧，更像卡通片里的追逐戏，而不是现实里的逃跑。里面的每一招都只在游戏里管用。",
  ],
  backFootTitle: "开局被动，处处受限",
  backFootIntro:
    "二次逃脱故意开局不公平：你被堵在角落，能做的事很少，还有人盯着你。没有安静的准备阶段，也不会有人在你准备好之前转过头去。",
  subsections: [
    {
      title: "快速观察局势（完整版机制，开发中）",
      body: "保安也有自己的小习惯。留意他走神的瞬间，比如打个喷嚏、被什么吸引了注意力、对讲机又出毛病了。这几秒就是你的窗口，一犹豫就关上了。",
    },
    {
      title: "每个动作都更“响”了（完整版机制，开发中）",
      body: "鱼桶还在吱吱响，鱼还在扑腾。在二次逃脱里，任何动静都要算两倍。什么时候动、什么时候假装自己是一尊特别紧张的园林雕塑，都得想清楚。",
    },
  ],
  breakTitle: "被管理员发现了怎么跑？借石头挡光，冲向出口",
  breakBody:
    "这一关能用的掩体只有石头：巡查员的手电照不穿石头，石头后面的阴影就是安全区，躲进去头顶会显示「藏好了」。等光扫开，再挪到下一块石头，最后冲进右上角的绿色「出口」草丛。别回头。实在想回头，就回一次，为了效果，但千万别撞上巡查员。",
  routesTitle: "完整版预告：更多逃跑路线（开发中）",
  routes: [
    { name: "灌木丛穿行：", desc: "慢一点，但藏得最久。" },
    { name: "码头冲刺：", desc: "又快又险，木板还特别滑。" },
    {
      name: "大摇大摆走过去：",
      desc: "假装没事人，赌没人问你。不推荐，但成功的时候特别好笑。",
    },
  ],
  highlightTitle: "成功失败，都是名场面",
  highlightBody:
    "完美脱身的感觉超爽：鱼尾一甩，自由就在眼前。二次被抓说不定更有节目效果，离出口只差几步时来个慢镜头再次落网，谁看了都忍不住笑。不管哪种结果，你都会多一个能讲的故事，大概率还多一张截图。",
  practiceTitle: "练完这里，等完整版上线再打一整局",
  practiceBody:
    "二次逃脱把整个游戏最精彩的部分浓缩成一局短而紧张的关卡，很适合练手感、找节奏。从第一次悄悄抛竿一路打到最后逃出生天的完整版还在开发中，上线后看看你能不能一局下来完全不用二次逃脱。（其实还是会用到的，没关系。）",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "管理员追钓鱼佬的游戏在哪里玩？",
      a: "就在本页。《钓鱼佬大逃亡·二次逃脱》打开浏览器就能免费玩，手机电脑都可以，不用下载。游戏里的「巡查员」就是追你的管理员，纯属虚构的卡通角色。",
    },
    {
      q: "钓鱼佬逃跑游戏怎么操作？",
      a: "方向键或 WASD 移动，手机用屏幕方向键。躲开手电光，借石头的阴影潜行，别撞上巡查员，冲进右上角的绿色出口就通关。",
    },
    {
      q: "二次逃脱是独立模式吗？",
      a: "是的，在本页就能直接单独开玩。在开发中的《钓鱼佬大逃亡》完整版里，它也会是主流程被抓之后接上的第四幕。",
    },
    {
      q: "必须先打完主流程吗？",
      a: "不用。完整的主流程还在开发中，二次逃脱是现在就能玩的部分，从本页直接开玩就行。",
    },
    {
      q: "二次逃脱难吗？",
      a: "短但紧张：开局就已经被逮住，巡查员的手电一直在扫，站在光里「暴露度」涨得很快。一局大约 30 秒，失败后能马上重来，翻车几次本来就是乐趣的一部分。",
    },
    {
      q: "“钓鱼佬被抓了还能跑”到底是什么意思？",
      a: "这是本模式的核心设定：被抓并不代表这局结束，你还有第二次虚构的溜走机会。这是剧情向的游戏玩法，和现实无关。",
    },
    {
      q: "会教现实中的逃脱或钓鱼技巧吗？",
      a: "不会。二次逃脱是为了好笑而做的卡通虚构内容，不含任何现实捕捞、偷钓或逃脱建议。现实中请遵守当地钓鱼规定，配合相关工作人员。",
    },
  ],
  howTitle: "怎么玩：躲开巡查员（管理员）的手电光",
  howSteps: [
    "开始：点一下画面，或按空格 / 方向键。",
    "移动：方向键或 WASD；手机上用画面下方的方向键。",
    "别待在手电光里：被照到时「暴露度」会上涨，涨满就被发现。",
    "石头能挡住手电光，躲进它的阴影里，会显示「藏好了」。",
    "别撞上巡查员，撞上就被抓。",
    "冲进右上角绿色「出口」草丛，装备成功保下。失败了按空格 / 回车或点一下马上重来。",
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "开始玩", href: "/zh/play/" },
    { label: "二次逃脱", href: "/zh/play/second-escape/" },
  ],
  relatedTitle: "相关页面",
  related: [
    { label: "钓鱼佬游戏攻略：甩掉巡查员", href: "/zh/guides/how-to-escape-inspector/", note: "完整游戏内逃跑技巧" },
    { label: "第3关 城市河道攻略", href: "/zh/levels/03-city-canal/", note: "规划中的关卡，开发中" },
    { label: "路亚跑毒是什么梗？", href: "/zh/meme/luya-paodu/", note: "游戏灵感来源" },
    { label: "巡查队长老张角色介绍", href: "/zh/characters/", note: "先认识一下追你的人" },
    { label: "钓鱼小游戏在线玩", href: "/zh/play/", note: "所有可玩模式" },
    { label: "回到钓鱼佬游戏首页", href: "/zh/" },
  ],
  navHome: "首页",
  navSecond: "二次逃脱",
  langSwitchLabel: "English",
  langSwitchHref: "/play/second-escape/",
  footerHow: "怎么开玩",
  footerDisclaimer: "免责声明",
  siteName: "钓鱼佬大逃亡",
};

export const SITE_URL = "https://anglerescape.com";
