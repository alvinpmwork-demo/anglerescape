import type { ArticleContent } from "./types";

const L = {
  webfishing: "https://store.steampowered.com/app/3146520/WEBFISHING/",
  dredge: "https://store.steampowered.com/app/1562430/DREDGE/",
  castnchill: "https://store.steampowered.com/app/3483740/Cast_n_Chill/",
  unbaitable: "https://eninabox.itch.io/unbaitable",
  riskofreel: "https://snailsquid.itch.io/risk-of-reel",
  stardew: "https://www.stardewvalley.net/",
  shorthike: "https://store.steampowered.com/app/1055540/A_Short_Hike/",
  dave: "https://store.steampowered.com/app/1868140/DAVE_THE_DIVER/",
  catgoes: "https://store.steampowered.com/app/343780/Cat_Goes_Fishing/",
  fishingplanet: "https://store.steampowered.com/app/380600/Fishing_Planet/",
  tinyfishing: "https://poki.com/en/g/tiny-fishing",
};

const items = (play: string) => [
  { name: "Angler Escape", url: `https://anglerescape.com${play}` },
  { name: "WEBFISHING", url: L.webfishing },
  { name: "DREDGE", url: L.dredge },
  { name: "Cast n Chill", url: L.castnchill },
  { name: "unBAITable", url: L.unbaitable },
  { name: "Risk of Reel", url: L.riskofreel },
  { name: "Tiny Fishing", url: L.tinyfishing },
  { name: "Fishing Planet", url: L.fishingplanet },
  { name: "Cat Goes Fishing", url: L.catgoes },
  { name: "Stardew Valley", url: L.stardew },
  { name: "A Short Hike", url: L.shorthike },
  { name: "DAVE THE DIVER", url: L.dave },
];

export const fishingGamesEn: ArticleContent = {
  locale: "en",
  path: "/fishing-games/",
  datePublished: "2026-10-14",
  dateModified: "2026-10-14",
  title: "Fishing Games Online Free (No Download) + Best Picks 2026",
  description:
    "Play a free fishing game in your browser now, then browse an honest list of fishing games: WEBFISHING, DREDGE, Cast n Chill, unBAITable, Tiny Fishing, Stardew Valley and more, with platform and price.",
  h1: "Fishing Games: Play Free Online, Plus the Best Ones to Try",
  intro: [
    "Want a fishing game right now, no download? Start with Angler Escape below: a free 30-second browser game where a cartoon angler sneaks past the Inspector's flashlight. Then scroll for a short, honest list of other fishing games, from free browser toys to paid PC and console favorites. We only link to official or store pages; prices and platforms change, so check each store before you buy.",
  ],
  sections: [
    {
      h2: "Play Now: Angler Escape (Free, Browser)",
      paragraphs: [
        "Angler Escape is our own game, built on the Chinese 钓鱼佬 (fishing guy) meme. In Second Escape you already got caught once; hug the rock shadows, stay out of the flashlight cone and reach the green EXIT bush. Runs take about 30 seconds, it works on desktop and mobile, and it is completely free.",
      ],
      links: [
        { label: "▶ Play Second Escape free (no download)", href: "/play/second-escape/" },
        { label: "All playable modes", href: "/play/" },
      ],
    },
    {
      h2: "Free Fishing Games You Can Play in a Browser",
      cards: [
        { title: "Angler Escape", meta: "Browser · Free", body: "Stealth comedy fishing game; sneak past the Inspector in ~30-second rounds.", href: "/play/second-escape/" },
        { title: "Tiny Fishing", meta: "Browser (Poki) · Free", body: "Idle arcade fishing: drop your line, hook as many fish as you can, buy upgrades.", href: L.tinyfishing },
        { title: "unBAITable", meta: "itch.io · Pay what you want", body: "Story game in a world where fishing is banned; dodge patrols across story nights.", href: L.unbaitable },
        { title: "Risk of Reel", meta: "itch.io", body: "Small night-fishing game where the spot is illegal in-game and you hide from guards.", href: L.riskofreel },
      ],
    },
    {
      h2: "Best Fishing Games on PC and Console",
      cards: [
        { title: "WEBFISHING", meta: "PC (Steam) · Paid", body: "Multiplayer social fishing hangout: fish, chat and goof around with friends as cartoon animals.", href: L.webfishing },
        { title: "DREDGE", meta: "PC & consoles · Paid", body: "Fishing adventure with a creeping horror mystery; sail a trawler and sell your catch.", href: L.dredge },
        { title: "Cast n Chill", meta: "PC (Steam) · Paid", body: "Cozy, relaxed pixel-art fishing game you can leave running.", href: L.castnchill },
        { title: "Fishing Planet", meta: "PC & consoles · Free-to-play", body: "Realistic fishing simulator with real-world style lakes and gear.", href: L.fishingplanet },
        { title: "Cat Goes Fishing", meta: "PC (Steam) · Paid", body: "A cat in a boat fishing deeper and deeper waters; simple, charming progression.", href: L.catgoes },
        { title: "Stardew Valley", meta: "PC, consoles, mobile · Paid", body: "Farming life sim with a famous fishing minigame and fish collection.", href: L.stardew },
        { title: "A Short Hike", meta: "PC & Switch · Paid", body: "Short exploration game where fishing is a relaxing side activity.", href: L.shorthike },
        { title: "DAVE THE DIVER", meta: "PC & consoles · Paid", body: "Dive and catch fish by day, run a sushi restaurant by night.", href: L.dave },
      ],
    },
    {
      h2: "Games Like WEBFISHING",
      paragraphs: [
        "If you like WEBFISHING for the low-stress, social, cartoon vibe, try Cast n Chill for chill solo fishing, Stardew Valley for fishing inside a cozy life sim, and A Short Hike for a small relaxing world. For a quick free fix in a browser tab, Tiny Fishing and Angler Escape both load instantly.",
      ],
    },
    {
      h2: "Games Like DREDGE",
      paragraphs: [
        "DREDGE mixes fishing with a story and a little dread. unBAITable and Risk of Reel bring story or tension to fishing in a smaller indie package, DAVE THE DIVER pairs catching fish with a bigger adventure, and Cat Goes Fishing scratches the 'go deeper for stranger fish' itch.",
      ],
      links: [
        { label: "Sneaky fishing games like unBAITable", href: "/similar-games/" },
        { label: "Illegal fishing games (all fiction)", href: "/similar-games/illegal-fishing-games/" },
      ],
    },
  ],
  primaryCta: "▶ Play Free Fishing Game",
  primaryHref: "/play/second-escape/",
  secondaryCta: "Games like unBAITable →",
  secondaryHref: "/similar-games/",
  faqTitle: "FAQ",
  faq: [
    { q: "What is a good free fishing game online with no download?", a: "Angler Escape runs free in your browser on desktop and mobile. Tiny Fishing on Poki is another free browser option." },
    { q: "Is WEBFISHING free?", a: "No, WEBFISHING is a paid game on Steam. Check the store page for the current price." },
    { q: "What are games like DREDGE?", a: "Try unBAITable, Risk of Reel, DAVE THE DIVER and Cat Goes Fishing for fishing with story, tension or deep-water progression." },
    { q: "Is there a free fishing simulator?", a: "Fishing Planet is free-to-play on PC and consoles." },
    { q: "Are you affiliated with these games?", a: "No, except Angler Escape, which is ours. All other games belong to their creators." },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Fishing Games", href: "/fishing-games/" },
  ],
  related: [
    { label: "Play Second Escape free", href: "/play/second-escape/" },
    { label: "Games like unBAITable", href: "/similar-games/" },
    { label: "Illegal fishing games (all fiction)", href: "/similar-games/illegal-fishing-games/" },
    { label: "Chinese fishing guy meme explained", href: "/meme/fishing-guy-meme/" },
  ],
  schemaType: "CollectionPage",
  itemList: items("/play/second-escape/"),
};

export const fishingGamesZh: ArticleContent = {
  locale: "zh",
  path: "/fishing-games/",
  datePublished: "2026-10-14",
  dateModified: "2026-10-14",
  title: "钓鱼小游戏免费在线玩｜钓鱼游戏推荐大全（免下载）",
  description:
    "免费在线钓鱼小游戏，打开网页就能玩《钓鱼佬大逃亡》；另附钓鱼游戏推荐：WEBFISHING、DREDGE、Cast n Chill、unBAITable、星露谷物语等，标注平台和是否免费。",
  h1: "钓鱼小游戏在线玩：免费入口 + 钓鱼游戏推荐",
  intro: [
    "想马上玩钓鱼小游戏、不用下载？先玩下面的《钓鱼佬大逃亡》：免费网页小游戏，一局约 30 秒，钓鱼佬要躲开巡查员的手电筒。往下是一份实在的在线钓鱼游戏和钓鱼游戏推荐，从免费网页游戏到付费的电脑、主机作品都有。我们只链接官方或商店页面，价格和平台可能变化，购买前请以商店为准。",
  ],
  sections: [
    {
      h2: "现在就玩：钓鱼佬大逃亡（免费网页版）",
      paragraphs: [
        "《钓鱼佬大逃亡》是我们自己做的钓鱼佬梗小游戏。「二次逃脱」里你已经被抓过一次，要贴着石头阴影走、避开手电筒光圈，跑到绿色 EXIT 草丛。一局约 30 秒，电脑和手机都能玩，完全免费。",
      ],
      links: [
        { label: "▶ 免费玩二次逃脱（免下载）", href: "/zh/play/second-escape/" },
        { label: "所有可玩模式", href: "/zh/play/" },
      ],
    },
    {
      h2: "免费在线钓鱼游戏（网页直接玩）",
      cards: [
        { title: "钓鱼佬大逃亡", meta: "网页 · 免费", body: "潜行搞笑钓鱼小游戏，30 秒一局躲开巡查员。", href: "/zh/play/second-escape/" },
        { title: "Tiny Fishing", meta: "网页（Poki，英文）· 免费", body: "放置类街机钓鱼：下钩、尽量多钓鱼、买升级。", href: L.tinyfishing },
        { title: "unBAITable", meta: "itch.io · 自愿付费", body: "设定里钓鱼被禁止的剧情游戏，要一夜夜躲过巡逻。", href: L.unbaitable },
        { title: "Risk of Reel", meta: "itch.io", body: "小品级夜钓游戏，游戏里这片湖禁止钓鱼，要躲保安。", href: L.riskofreel },
      ],
    },
    {
      h2: "电脑和主机上的钓鱼游戏推荐",
      cards: [
        { title: "WEBFISHING", meta: "PC（Steam）· 付费", body: "多人社交钓鱼，扮成卡通小动物和朋友一起钓鱼聊天。", href: L.webfishing },
        { title: "DREDGE（渔帆暗涌）", meta: "PC 及主机 · 付费", body: "驾驶渔船捕鱼、卖鱼，同时揭开带点恐怖氛围的谜团。", href: L.dredge },
        { title: "Cast n Chill", meta: "PC（Steam）· 付费", body: "像素风的休闲钓鱼游戏，适合挂着放松。", href: L.castnchill },
        { title: "Fishing Planet", meta: "PC 及主机 · 免费游玩", body: "偏写实的钓鱼模拟器，湖泊和钓具都比较真实。", href: L.fishingplanet },
        { title: "Cat Goes Fishing", meta: "PC（Steam）· 付费", body: "小猫划船钓鱼，越钓越深，成长简单有趣。", href: L.catgoes },
        { title: "星露谷物语", meta: "PC、主机、手机 · 付费", body: "农场生活模拟，里面的钓鱼小游戏和鱼类收集很出名。", href: L.stardew },
        { title: "A Short Hike", meta: "PC 及 Switch · 付费", body: "短篇探索游戏，钓鱼是很放松的支线玩法。", href: L.shorthike },
        { title: "潜水员戴夫", meta: "PC 及主机 · 付费", body: "白天潜水抓鱼，晚上经营寿司店。", href: L.dave },
      ],
    },
    {
      h2: "类似 WEBFISHING 的游戏",
      paragraphs: [
        "喜欢 WEBFISHING 那种轻松、卡通、和朋友一起钓的氛围，可以试试单人休闲的 Cast n Chill、生活模拟里钓鱼的星露谷物语，以及小而治愈的 A Short Hike。想在浏览器里马上玩，Tiny Fishing 和钓鱼佬大逃亡打开就能玩。",
      ],
    },
    {
      h2: "类似 DREDGE 的游戏",
      paragraphs: [
        "DREDGE 是钓鱼加剧情加一点紧张感。unBAITable 和 Risk of Reel 用更小的独立游戏体量做了剧情和紧张感，潜水员戴夫把抓鱼放进更大的冒险里，Cat Goes Fishing 则是越钓越深、鱼越来越怪。",
      ],
      links: [{ label: "类似偷偷钓个鱼的游戏", href: "/zh/similar-games/" }],
    },
  ],
  primaryCta: "▶ 免费玩钓鱼小游戏",
  primaryHref: "/zh/play/second-escape/",
  secondaryCta: "类似偷偷钓个鱼的游戏 →",
  secondaryHref: "/zh/similar-games/",
  faqTitle: "常见问题",
  faq: [
    { q: "有免费免下载的钓鱼小游戏吗？", a: "有。《钓鱼佬大逃亡》在浏览器里免费玩，电脑和手机都行；Poki 上的 Tiny Fishing 也是免费网页游戏。" },
    { q: "WEBFISHING 免费吗？", a: "不免费，WEBFISHING 是 Steam 上的付费游戏，价格以商店页为准。" },
    { q: "有类似 DREDGE 的钓鱼游戏吗？", a: "可以试试 unBAITable、Risk of Reel、潜水员戴夫和 Cat Goes Fishing。" },
    { q: "有免费的钓鱼模拟游戏吗？", a: "Fishing Planet 在 PC 和主机上免费游玩。" },
    { q: "本站和这些游戏有合作吗？", a: "没有，除了《钓鱼佬大逃亡》是我们自己的，其余版权归原作者。" },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "钓鱼小游戏", href: "/zh/fishing-games/" },
  ],
  related: [
    { label: "钓鱼小游戏在线玩", href: "/zh/play/" },
    { label: "类似偷偷钓个鱼的游戏", href: "/zh/similar-games/" },
    { label: "钓鱼佬梗是什么意思", href: "/zh/meme/fishing-guy-meme/" },
  ],
  schemaType: "CollectionPage",
  itemList: items("/zh/play/second-escape/"),
};
