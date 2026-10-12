import type { ArticleContent } from "./types";

/**
 * Contact inbox shown on /contact/, /privacy/ and the disclaimer page.
 * TODO(owner): anglerescape.com has no MX record yet, so this address does not receive mail.
 * Set up Cloudflare Email Routing (hello@ → your real inbox) or replace this address.
 */
export const CONTACT_EMAIL = "hello@anglerescape.com";

const TRUST_UPDATED = "2026-10-09";

const base = {
  datePublished: TRUST_UPDATED,
  dateModified: TRUST_UPDATED,
  schemaType: "WebPage" as const,
  faqSchema: false,
  faq: [],
};

export const aboutEn: ArticleContent = {
  ...base,
  locale: "en",
  path: "/about/",
  title: "About Angler Escape: A Solo Indie Browser Game",
  description:
    "About Angler Escape (钓鱼佬大逃亡): a free, bilingual browser stealth-comedy game made by a solo indie developer. What's playable now, what's in development, and how it's made.",
  h1: "About Angler Escape",
  intro: [
    "Angler Escape (钓鱼佬大逃亡) is a free browser game about a cartoon angler, a watchful park Inspector, and getting caught, then escaping again. It riffs on the Chinese internet's 钓鱼佬 (\"fishing guy\") meme. Everything in it is fiction.",
  ],
  sections: [
    {
      h2: "Who makes it",
      paragraphs: [
        "Angler Escape is made by a solo indie developer, who writes the code and designs the game. The character art is made with AI assistance.",
      ],
    },
    {
      h2: "What you can play today",
      paragraphs: [
        "Second Escape is playable now, free, in any modern browser on phone or desktop: dodge the Inspector's flashlight, hide behind rocks, and reach the exit. A round takes about 30 seconds.",
        "The full heist (sneak in, hook the fish, get spotted, run) and the three planned levels are in development. Pages that describe those features are clearly marked \"In development\".",
      ],
      links: [
        { label: "Play Second Escape", href: "/play/second-escape/" },
        { label: "Disclaimer & fishing rules", href: "/about/fishing-rules-disclaimer/" },
      ],
    },
    {
      h2: "Why a fishing guy game?",
      paragraphs: [
        "The fishing guy meme (钓鱼佬) is one of the Chinese internet's favourite running jokes: the angler who sits by the water all day, comes home with nothing (\"goes Air Force\", 空军), and still swears the next cast is the one. In Taiwan and Hong Kong you will see the same joke written 釣魚 空軍. Angler Escape turns that stubborn optimism into a stealth comedy: the angler only wants one more cast, and a cartoon park Inspector only wants him gone.",
      ],
      links: [{ label: "Fishing guy meme explained", href: "/meme/fishing-guy-meme/" }],
    },
    {
      h2: "How Second Escape plays",
      paragraphs: [
        "Second Escape is the playable slice of the game. You control Ah Diao after he has already been spotted: slip between rocks, keep out of the flashlight cone, and reach the exit before the chase meter fills. It runs on keyboard or touch, needs no download, and saves nothing about you.",
      ],
      links: [
        { label: "Meet the characters", href: "/characters/" },
        { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/" },
      ],
    },
    {
      h2: "Two languages, one game",
      paragraphs: [
        "Every page exists in English and Simplified Chinese, written separately rather than machine-translated, because most of the jokes only land in the language they came from. Switch with the language toggle at the top of any page.",
      ],
    },
    {
      h2: "What this site is not",
      paragraphs: [
        "There's no real-world fishing, poaching, or escape advice anywhere on this site, no ads, no accounts, and nothing to buy. In real life, fish only where it's allowed and follow local rules.",
      ],
    },
  ],
  primaryCta: "▶ Play Second Escape",
  primaryHref: "/play/second-escape/",
  secondaryCta: "Contact →",
  secondaryHref: "/contact/",
  faqTitle: "FAQ",
  dateModified: "2026-10-12",
  faqSchema: true,
  faq: [
    { q: "Is Angler Escape free?", a: "Yes. Second Escape is free to play in the browser, with no ads, no account and nothing to buy." },
    { q: "What does \"Air Force\" (空军) mean for a fishing guy?", a: "It is slang for coming home with zero fish. The fishing guy meme is built on anglers who go Air Force and keep casting anyway." },
    { q: "Who is behind Angler Escape?", a: "A solo indie developer. Character art is made with AI assistance; code and game design are hand-made." },
  ],
  related: [
    { label: "Play Second Escape free", href: "/play/second-escape/" },
    { label: "Angler Escape characters", href: "/characters/" },
    { label: "Fishing guy meme explained", href: "/meme/fishing-guy-meme/" },
    { label: "Games like Angler Escape", href: "/similar-games/" },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
  ],
};

export const aboutZh: ArticleContent = {
  ...base,
  locale: "zh",
  path: "/about/",
  title: "关于钓鱼佬大逃亡：独立开发的网页小游戏",
  description:
    "关于《钓鱼佬大逃亡》（Angler Escape）：一位独立开发者做的免费双语网页潜行喜剧小游戏。现在能玩什么、哪些还在开发、游戏是怎么做的。",
  h1: "关于钓鱼佬大逃亡",
  intro: [
    "《钓鱼佬大逃亡》（Angler Escape）是一款免费的网页小游戏：卡通钓鱼佬、盯得很紧的公园巡查员，以及被抓之后再逃一次。灵感来自网上的「钓鱼佬」梗，所有内容都是虚构的。",
  ],
  sections: [
    {
      h2: "谁在做",
      paragraphs: [
        "《钓鱼佬大逃亡》由一位独立开发者制作：代码和玩法设计都是自己做的，角色美术使用了 AI 辅助。",
      ],
    },
    {
      h2: "现在能玩什么",
      paragraphs: [
        "「二次逃脱」现在就能玩，免费，手机电脑浏览器都行：躲开巡查员的手电光，借石头藏身，冲进出口。一局大约 30 秒。",
        "完整版（潜入、钓鱼、被发现、逃跑）和规划中的三个关卡还在开发中。介绍这些内容的页面都标了「开发中」。",
      ],
      links: [
        { label: "开玩二次逃脱", href: "/zh/play/second-escape/" },
        { label: "免责声明与钓鱼规定", href: "/zh/about/fishing-rules-disclaimer/" },
      ],
    },
    {
      h2: "为什么做一款钓鱼佬游戏",
      paragraphs: [
        "钓鱼佬是网上经久不衰的梗：在水边坐一整天，一条没钓到（空军），回家还说下一竿必中。港台网友也常写成「釣魚 空軍」。《钓鱼佬大逃亡》把这种死不服输的乐观做成了潜行喜剧：钓鱼佬只想再来一竿，卡通巡查员只想把他请走。",
      ],
      links: [{ label: "钓鱼佬梗是什么意思", href: "/zh/meme/fishing-guy-meme/" }],
    },
    {
      h2: "二次逃脱怎么玩",
      paragraphs: [
        "「二次逃脱」是目前能玩的部分：阿钓已经被发现，你要在石头之间穿行、避开手电光，在追击条满之前冲到出口。键盘和触屏都能操作，不用下载，也不收集任何个人信息。",
      ],
      links: [
        { label: "钓鱼佬大逃亡角色介绍", href: "/zh/characters/" },
        { label: "甩掉巡查员攻略", href: "/zh/guides/how-to-escape-inspector/" },
      ],
    },
    {
      h2: "中英双语",
      paragraphs: [
        "每个页面都有英文版和简体中文版，分别撰写而不是机翻，因为很多梗只有在原来的语言里才好笑。页面顶部可以切换语言。",
      ],
    },
    {
      h2: "本站不是什么",
      paragraphs: [
        "本站不含任何现实钓鱼、偷钓或逃脱建议，没有广告、不用注册，也没有任何付费内容。现实钓鱼请只在允许垂钓的水域，遵守当地规定。",
      ],
    },
  ],
  primaryCta: "▶ 马上开逃",
  primaryHref: "/zh/play/second-escape/",
  secondaryCta: "联系我们 →",
  secondaryHref: "/zh/contact/",
  faqTitle: "常见问题（FAQ）",
  dateModified: "2026-10-12",
  faqSchema: true,
  faq: [
    { q: "钓鱼佬大逃亡免费吗？", a: "免费。二次逃脱直接在浏览器里玩，没有广告、不用注册、没有付费内容。" },
    { q: "钓鱼佬说的「空军」是什么意思？", a: "空军指钓了一天一条鱼都没有，繁体也写作「釣魚 空軍」。钓鱼佬梗的核心就是空军了还要接着甩竿。" },
    { q: "游戏是谁做的？", a: "一位独立开发者。角色美术用了 AI 辅助，代码和玩法设计是自己做的。" },
  ],
  related: [
    { label: "二次逃脱在线玩", href: "/zh/play/second-escape/" },
    { label: "钓鱼佬大逃亡角色介绍", href: "/zh/characters/" },
    { label: "钓鱼佬梗是什么意思", href: "/zh/meme/fishing-guy-meme/" },
    { label: "类似钓鱼佬大逃亡的游戏", href: "/zh/similar-games/" },
  ],
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "关于", href: "/zh/about/" },
  ],
};

export const contactEn: ArticleContent = {
  ...base,
  locale: "en",
  path: "/contact/",
  title: "Contact Angler Escape",
  description:
    "How to contact the developer of Angler Escape: bug reports, feedback, content corrections, and copyright questions.",
  h1: "Contact",
  intro: [
    `Angler Escape is made by one person, so the quickest way to reach me is email: ${CONTACT_EMAIL}`,
  ],
  sections: [
    {
      h2: "Email",
      links: [{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }],
    },
    {
      h2: "Good reasons to write",
      list: [
        { title: "Bug reports:", body: "tell me your device and browser and what happened. A screenshot helps." },
        { title: "Feedback and ideas:", body: "what was fun, what was confusing, what you'd like in the full heist." },
        { title: "Corrections and copyright:", body: "if something on the site is wrong or uses something it shouldn't, let me know and I'll fix it." },
      ],
    },
  ],
  primaryCta: "▶ Play Second Escape",
  primaryHref: "/play/second-escape/",
  secondaryCta: "About the game →",
  secondaryHref: "/about/",
  faqTitle: "FAQ",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact/" },
  ],
};

export const contactZh: ArticleContent = {
  ...base,
  locale: "zh",
  path: "/contact/",
  title: "联系钓鱼佬大逃亡",
  description: "联系《钓鱼佬大逃亡》开发者：反馈 bug、提建议、内容纠错和版权问题。",
  h1: "联系我们",
  intro: [`《钓鱼佬大逃亡》是一个人做的，最快的联系方式是发邮件：${CONTACT_EMAIL}`],
  sections: [
    {
      h2: "邮箱",
      links: [{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }],
    },
    {
      h2: "可以聊这些",
      list: [
        { title: "反馈 bug：", body: "写上你的设备、浏览器和遇到的情况，附张截图更好。" },
        { title: "建议和想法：", body: "哪里好玩、哪里看不懂、完整版里想看到什么。" },
        { title: "纠错和版权：", body: "站上有写错的地方，或者用了不该用的东西，告诉我，我会尽快改。" },
      ],
    },
  ],
  primaryCta: "▶ 马上开逃",
  primaryHref: "/zh/play/second-escape/",
  secondaryCta: "关于游戏 →",
  secondaryHref: "/zh/about/",
  faqTitle: "常见问题（FAQ）",
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "联系我们", href: "/zh/contact/" },
  ],
};

export const privacyEn: ArticleContent = {
  ...base,
  locale: "en",
  path: "/privacy/",
  title: "Privacy Policy | Angler Escape",
  description:
    "Angler Escape privacy policy: no accounts, no ads, no cookies set by the game. What hosting and analytics may record, and how to contact us.",
  h1: "Privacy Policy",
  intro: [`Last updated: ${TRUST_UPDATED}. Short version: you can play without an account, the game doesn't set cookies, and there are no ads.`],
  sections: [
    {
      h2: "What we collect",
      list: [
        { title: "No accounts.", body: "There is no sign-up and no login." },
        { title: "The game runs in your browser.", body: "Your moves and results stay on your device; the game doesn't send them anywhere and doesn't store anything in cookies or local storage." },
        { title: "Sharing is up to you.", body: "The Share button uses your device's share sheet or copies a link to your clipboard. We don't see what you share or with whom." },
      ],
    },
    {
      h2: "Hosting and analytics",
      paragraphs: [
        "The site is hosted on Cloudflare. Like any web host, Cloudflare processes technical request data (such as IP address, browser type, and the page requested) to deliver the site and protect it from abuse.",
        "We may use Cloudflare Web Analytics to count visits. It doesn't use cookies and only gives us aggregated numbers, such as page views, countries, and referring websites.",
      ],
    },
    {
      h2: "Ads and third parties",
      paragraphs: [
        "There are no ads on the site right now. If that changes, this policy will be updated first. Links to other websites (for example itch.io or sources we cite) are governed by those sites' own policies.",
      ],
    },
    {
      h2: "Children",
      paragraphs: [
        "The game is a cartoon comedy suitable for general audiences, and we don't knowingly collect personal information from anyone, including children.",
      ],
    },
    {
      h2: "Contact",
      paragraphs: [`Questions about privacy: ${CONTACT_EMAIL}`],
    },
  ],
  primaryCta: "▶ Play Second Escape",
  primaryHref: "/play/second-escape/",
  secondaryCta: "Contact →",
  secondaryHref: "/contact/",
  faqTitle: "FAQ",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy/" },
  ],
};

export const privacyZh: ArticleContent = {
  ...base,
  locale: "zh",
  path: "/privacy/",
  title: "隐私政策｜钓鱼佬大逃亡",
  description: "《钓鱼佬大逃亡》隐私政策：不用注册、没有广告，游戏不设置 Cookie。说明托管和统计可能记录的信息，以及联系方式。",
  h1: "隐私政策",
  intro: [`最后更新：${TRUST_UPDATED}。简单说：不用注册就能玩，游戏不设置 Cookie，也没有广告。`],
  sections: [
    {
      h2: "我们收集什么",
      list: [
        { title: "没有账号。", body: "不需要注册，也没有登录。" },
        { title: "游戏在你的浏览器里运行。", body: "你的操作和成绩只留在你的设备上，游戏不会上传，也不会写入 Cookie 或本地存储。" },
        { title: "分享由你决定。", body: "「分享」按钮调用的是你设备自带的分享面板，或者把链接复制到剪贴板。我们看不到你分享了什么、分享给了谁。" },
      ],
    },
    {
      h2: "托管和统计",
      paragraphs: [
        "本站托管在 Cloudflare。和所有网站托管一样，Cloudflare 会处理访问时的技术数据（例如 IP 地址、浏览器类型、访问的页面），用于提供网站服务和防止滥用。",
        "我们可能使用 Cloudflare Web Analytics 统计访问量。它不使用 Cookie，我们只能看到汇总数据，例如页面访问量、国家和来源网站。",
      ],
    },
    {
      h2: "广告和第三方",
      paragraphs: [
        "本站目前没有广告；如果以后加广告，会先更新本政策。站内指向其他网站的链接（例如 itch.io 或我们引用的资料）适用对方网站自己的政策。",
      ],
    },
    {
      h2: "未成年人",
      paragraphs: ["游戏是适合大众的卡通喜剧，我们不会主动收集任何人（包括未成年人）的个人信息。"],
    },
    {
      h2: "联系",
      paragraphs: [`隐私相关问题请发邮件至：${CONTACT_EMAIL}`],
    },
  ],
  primaryCta: "▶ 马上开逃",
  primaryHref: "/zh/play/second-escape/",
  secondaryCta: "联系我们 →",
  secondaryHref: "/zh/contact/",
  faqTitle: "常见问题（FAQ）",
  breadcrumbs: [
    { label: "首页", href: "/zh/" },
    { label: "隐私政策", href: "/zh/privacy/" },
  ],
};
