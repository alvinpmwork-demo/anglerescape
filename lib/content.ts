export type Locale = "en" | "zh";

export type FaqItem = { q: string; a: string };

export type HomeContent = {
  locale: Locale;
  title: string;
  description: string;
  h1: string;
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
  howOutro: string;
  faqTitle: string;
  faq: FaqItem[];
  playPlaceholder: string;
  playPlaceholderHint: string;
  navHome: string;
  navSecond: string;
  langSwitchLabel: string;
  langSwitchHref: string;
  footerHow: string;
  footerDisclaimer: string;
  siteName: string;
};

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
  playPlaceholder: string;
  playPlaceholderHint: string;
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
  title: "Angler Escape｜Steal Fish, Get Caught, Escape Again",
  description:
    "Play Angler Escape—the stealth fishing game where you snatch fish, get spotted, bolt, and escape again. Funny, light, pure fiction. No real tips.",
  h1: "Angler Escape: Steal the Fish. Blow the Cover. Run.",
  intro: [
    'Somewhere past the "Private Pond" sign there\'s a fish everyone has heard about and no one has actually landed. You have a rod, a bucket, and way too much confidence. What could go wrong? Pretty much everything, and that\'s the game.',
    "Angler Escape is a stealth fishing game played as comedy. You sneak in, hook something you shouldn't, get spotted at the worst moment, and run for it. If they catch you, you get to run again. The rounds are short, the fails are loud, and the guard is always a little too close.",
  ],
  primaryCta: "Start the Fish Heist",
  secondaryCta: "Play Second Escape →",
  disclaimer: DISCLAIMER_EN,
  sectionStealthTitle: "This Isn't a Fishing Sim. It's a Stealth Comedy.",
  sectionStealthBody: [
    "Forget patient sunrise casts and arguing about lure weights. In Angler Escape the fishing takes about three seconds. The tension comes from everything around it. A patrol walks by on a loop, a flashlight sweeps the reeds, and your bucket makes a noise every time it moves.",
    "You hold still and creep along the bank, waiting for your gap. Then you strike. Sometimes it goes perfectly. More often a giant carp slaps the water and every head in the park turns toward you. It's a lot like sneaking a snack during a meeting, except the snack weighs twelve pounds and is still flopping.",
  ],
  sectionLoopTitle: "The Four-Act Loop: Steal → Spotted → Escape → Escape Again",
  sectionLoopIntro:
    'Every run follows the same simple structure. That\'s why "one more try" happens so often.',
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
      title: "A twist on a familiar genre.",
      body: 'If you like cozy, sneaky fishing comedies, you\'ll feel right at home. Angler Escape just keeps going after the bust and makes "caught, then escaped again" its signature move.',
    },
  ],
  howTitle: "How to Play",
  howIntro:
    "No download and no install. Angler Escape runs right in your browser on desktop or mobile.",
  howSteps: [
    "Hit Start the Fish Heist to begin a full run, from sneaking in to the final getaway.",
    "Watch the patrol, pick your moment, and land your fish.",
    "When you get spotted (you will), run for the exit.",
    "Caught anyway? Jump into Second Escape and try again.",
  ],
  howOutro:
    "Want to skip ahead to the good part? Second Escape can also be played as its own mode.",
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
  playPlaceholder: "Demo coming soon",
  playPlaceholderHint: "Playable canvas placeholder — full heist demo loading later.",
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
  title: "钓鱼佬大逃亡｜被抓了还能跑的钓鱼小游戏",
  description:
    "钓鱼佬小游戏《钓鱼佬大逃亡》：偷偷摸鱼、被发现、狂奔逃脱，被抓了还能跑！轻松幽默潜行钓鱼，纯属虚构娱乐。",
  h1: "钓鱼佬大逃亡：摸鱼翻车，拔腿就跑",
  intro: [
    '"闲人免进"的牌子后面，据说住着一条传说中的大鱼。人人都听说过，谁也没钓上来过。你手里一根竿、一个桶，外加一份完全不知道从哪来的自信。能出什么事呢？什么事都能出，这正是这个游戏好玩的地方。',
    "《钓鱼佬大逃亡》是一款当喜剧来玩的潜行钓鱼小游戏：悄悄摸进去，钓一条不该钓的鱼，在最要命的时候被发现，然后撒腿就跑。要是被抓了？没事，被抓了还能跑。一局很短，翻车动静很大，保安永远离你只差那么一点。",
  ],
  primaryCta: "开始摸鱼大逃亡",
  secondaryCta: "先玩二次逃脱 →",
  disclaimer: DISCLAIMER_ZH,
  sectionStealthTitle: "这不是正经钓鱼，是潜行喜剧",
  sectionStealthBody: [
    "别指望日出抛竿、慢慢等口，也不用纠结铅坠几克。在《钓鱼佬大逃亡》里，钓鱼本身大概只要三秒，真正紧张的是钓鱼之外的那些事：巡逻按固定路线来回走，手电光扫过芦苇丛，鱼桶稍微一动就“哐当”一声。",
    "你得屏住呼吸，贴着岸边一点点挪，等那个空档，然后果断出手。偶尔一气呵成，更多时候是一条大鲤鱼“啪”地甩出个大水花，全场目光唰地全落到你身上。这感觉就像开会时偷吃零食，只不过零食有十几斤重，而且还在扑腾。专治上班摸鱼欲。",
  ],
  sectionLoopTitle: "四幕循环：偷 → 发现 → 逃 → 再逃",
  sectionLoopIntro: "每一局都是同一个简单结构，所以“再来一把”根本停不下来。",
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
      title: "熟悉的玩法，加点不一样的。",
      body: "喜欢偷偷钓个鱼这类轻松摸鱼风的话，你会很快上手。《钓鱼佬大逃亡》的不同是被抓之后游戏还没完，“抓了再逃”就是它的招牌。",
    },
  ],
  howTitle: "怎么开玩",
  howIntro: "浏览器就能上，无需下载、无需安装，手机电脑都能玩。",
  howSteps: [
    "点 开始摸鱼大逃亡，从潜入到最后逃出完整打一局。",
    "观察巡逻，挑准时机，把鱼钓上来。",
    "被发现时（一定会被发现）往出口冲。",
    "还是被抓了？进入 二次逃脱 再来一次。",
  ],
  howOutro: "想直接玩最精彩的部分？二次逃脱也可以单独开玩。",
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
  playPlaceholder: "试玩即将上线",
  playPlaceholderHint: "可玩画布占位 — 完整摸鱼大逃亡 demo 稍后上线。",
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
  title: "Second Escape｜Get Caught and Escape Again | Angler Escape",
  description:
    "Second Escape mode in Angler Escape: get caught and escape again. Funny stealth fishing chaos after the bust—pure fiction, zero real-world tips.",
  h1: "Second Escape: Get Caught and Escape Again",
  intro:
    "In most stealth games, getting caught means game over. In Angler Escape, it means intermission. You've been spotted, chased, and finally collared, fish still in hand, looking very guilty. Second Escape picks up right there. The story isn't over and neither is your run.",
  primaryCta: "Launch Second Escape",
  secondaryCta: "Back to Homepage Heist →",
  disclaimer: DISCLAIMER_EN,
  bustTitle: "The Bust Is Where the Fun Starts",
  bustBody: [
    "Every main run in Angler Escape follows the same arc: steal, get spotted, escape. Second Escape is the fourth act, the comeback no one expected. Your sneaky plan has completely fallen apart, the guard is very pleased with himself, and you've just made a terrible first impression. Good. It's a lot more interesting to escape from the bottom.",
    "The mode is pure slapstick. Think cartoon chase, not real-life getaway. Every trick in it only works because it's a game.",
  ],
  backFootTitle: "You Start on the Back Foot",
  backFootIntro:
    "Second Escape starts out unfair on purpose. You're cornered, your options are limited, and someone is watching you closely. You don't get a quiet setup phase, and nobody is going to look away while you get ready.",
  subsections: [
    {
      title: "Read the Room, Fast",
      body: "The guard has habits. Watch for the moment their attention slips: a sneeze, a distraction, a stubborn walkie-talkie. Those few seconds are your window. Hesitate and it closes.",
    },
    {
      title: "Every Move Is Louder Now",
      body: "Your bucket is still squeaking. The fish is still flopping. In Second Escape every bit of noise counts double, so choose carefully when to move and when to freeze like a very nervous garden statue.",
    },
  ],
  breakTitle: "Break Line of Sight, Bolt for the Exit",
  breakBody:
    "Once you're loose, it's a sprint. Get something between you and the guard, like a hedge, a bait shed, or a suspiciously convenient stack of crates, and get out of view. Out of sight means out of mind, at least for a second. Then go for the exit and don't look back. Or look back once, for drama.",
  routesTitle: "Escape Routes Worth Trying",
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
  practiceTitle: "Practice Here, Then Pull Off the Full Heist",
  practiceBody:
    "Second Escape is a great place to sharpen your timing because it squeezes the best part of the game into a short, intense round. Once you've got the rhythm, head back to the homepage and run the whole heist from the first quiet cast to the final getaway. Can you finish without needing a second escape at all? (You'll still need one. That's fine.)",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Is Second Escape a separate mode?",
      a: "Yes. You can launch Second Escape directly as its own mode. It's also the fourth act of a full Angler Escape run and kicks in after you get caught in the main story.",
    },
    {
      q: "Do I need to finish the main run first?",
      a: "No. You can jump straight in from this page. Playing the main run first gives the bust more comedic setup, though, because you'll know exactly how badly you got caught.",
    },
    {
      q: "Is Second Escape hard?",
      a: "It's a little tougher than the main escape because you start cornered and every noise matters more. Rounds are short and retries are instant, so a few failed attempts are part of the fun.",
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
  playPlaceholder: "Demo coming soon",
  playPlaceholderHint: "Second Escape playable canvas placeholder — demo loading later.",
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
  title: "二次逃脱｜钓鱼佬被抓了还能跑 - 钓鱼佬大逃亡",
  description:
    "《钓鱼佬大逃亡》二次逃脱模式：被抓了还能跑！潜行摸鱼翻车后再逃一次，幽默轻松的钓鱼佬小游戏关卡，纯属虚构。",
  h1: "二次逃脱：钓鱼佬被抓了还能跑",
  intro:
    "大多数潜行游戏里，被抓就是 Game Over。在《钓鱼佬大逃亡》里，被抓只是中场休息。你被发现了、被追了、最后被一把揪住，手里还拎着那条鱼，一脸心虚。「二次逃脱」就从这一刻开始：故事没完，这一局也没完。",
  primaryCta: "立刻二次逃脱",
  secondaryCta: "回首页重开摸鱼 →",
  disclaimer: DISCLAIMER_ZH,
  bustTitle: "主流程翻车后，好戏才开始",
  bustBody: [
    "《钓鱼佬大逃亡》的每一局主流程都是同一条线：偷鱼、被发现、逃跑。二次逃脱就是第四幕，谁都没想到的绝地翻盘。你精心设计的潜行计划已经彻底崩了，保安正得意洋洋，你的第一印象也糟透了。挺好，从谷底往外逃才最有意思。",
    "这个模式是纯粹的无厘头喜剧，更像卡通片里的追逐戏，而不是现实里的逃跑。里面的每一招都只在游戏里管用。",
  ],
  backFootTitle: "开局被动，处处受限",
  backFootIntro:
    "二次逃脱故意开局不公平：你被堵在角落，能做的事很少，还有人盯着你。没有安静的准备阶段，也不会有人在你准备好之前转过头去。",
  subsections: [
    {
      title: "快速观察局势",
      body: "保安也有自己的小习惯。留意他走神的瞬间，比如打个喷嚏、被什么吸引了注意力、对讲机又出毛病了。这几秒就是你的窗口，一犹豫就关上了。",
    },
    {
      title: "每个动作都更“响”了",
      body: "鱼桶还在吱吱响，鱼还在扑腾。在二次逃脱里，任何动静都要算两倍。什么时候动、什么时候假装自己是一尊特别紧张的园林雕塑，都得想清楚。",
    },
  ],
  breakTitle: "断开视线，冲向出口",
  breakBody:
    "一旦脱身，就是全力冲刺。在你和保安之间隔点东西，比如一排灌木、一间渔具小屋，或者一摞位置过于凑巧的木箱，先从他眼前消失。看不见就想不起来，至少能撑一秒。然后直奔出口，别回头。实在想回头，就回一次，为了效果。",
  routesTitle: "值得一试的逃跑路线",
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
  practiceTitle: "练完这里，回首页打完整一局",
  practiceBody:
    "二次逃脱把整个游戏最精彩的部分浓缩成一局短而紧张的关卡，很适合练手感、找节奏。找到节奏之后就回首页，从第一次悄悄抛竿一路打到最后逃出生天。能不能一局下来完全不用二次逃脱？（其实还是会用到的，没关系。）",
  faqTitle: "常见问题（FAQ）",
  faq: [
    {
      q: "二次逃脱是独立模式吗？",
      a: "是的。你可以直接单独开启二次逃脱模式。它同时也是《钓鱼佬大逃亡》完整一局里的第四幕，主流程被抓之后自动接上。",
    },
    {
      q: "必须先打完主流程吗？",
      a: "不用，从本页就能直接开玩。不过先打一遍主流程，被抓的那一刻会更有喜剧铺垫，你会清楚地知道自己到底翻车翻得有多惨。",
    },
    {
      q: "二次逃脱难吗？",
      a: "比主流程的逃亡稍微难一点：开局就被堵住，而且每个动静影响更大。但一局很短，失败后能马上重来，翻车几次本来就是乐趣的一部分。",
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
  playPlaceholder: "试玩即将上线",
  playPlaceholderHint: "二次逃脱可玩画布占位 — demo 稍后上线。",
  navHome: "首页",
  navSecond: "二次逃脱",
  langSwitchLabel: "English",
  langSwitchHref: "/play/second-escape/",
  footerHow: "怎么开玩",
  footerDisclaimer: "免责声明",
  siteName: "钓鱼佬大逃亡",
};

export const SITE_URL = "https://anglerescape.com";
