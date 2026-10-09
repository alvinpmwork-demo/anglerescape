import type { Locale } from "@/lib/content";
import { DISCLAIMER_EN, DISCLAIMER_ZH, SITE_URL } from "@/lib/content";

export type NavLink = { label: string; href: string };

export type SiteChrome = {
  locale: Locale;
  siteName: string;
  homeHref: string;
  playHref: string;
  howHref: string;
  disclaimerHref: string;
  disclaimer: string;
  footerHow: string;
  footerDisclaimer: string;
  links: NavLink[];
  /** Footer link list: every indexable page within one click, keyword-rich anchors */
  footerLinks: NavLink[];
};

export function prefixPath(locale: Locale, path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  if (locale === "zh") {
    if (path === "/") return "/zh/";
    return path.startsWith("/zh/") ? path : `/zh${path}`;
  }
  return path.startsWith("/zh/") ? path.slice(3) || "/" : path;
}

export function twinPath(locale: Locale, path: string): string {
  // path is always the EN-form path
  if (locale === "zh") return `/zh${path === "/" ? "/" : path}`;
  return path;
}

export function getChrome(locale: Locale): SiteChrome {
  if (locale === "zh") {
    return {
      locale,
      siteName: "钓鱼佬大逃亡",
      homeHref: "/zh/",
      playHref: "/zh/play/",
      howHref: "/zh/guides/how-to-escape-inspector/",
      disclaimerHref: "/zh/about/fishing-rules-disclaimer/",
      disclaimer: DISCLAIMER_ZH,
      footerHow: "游戏攻略",
      footerDisclaimer: "免责声明",
      links: [
        { label: "首页", href: "/zh/" },
        { label: "开始玩", href: "/zh/play/" },
        { label: "攻略", href: "/zh/guides/how-to-escape-inspector/" },
        { label: "关卡", href: "/zh/levels/" },
        { label: "角色", href: "/zh/characters/" },
        { label: "钓鱼佬梗", href: "/zh/meme/fishing-guy-meme/" },
      ],
      footerLinks: [
        { label: "钓鱼佬游戏首页", href: "/zh/" },
        { label: "钓鱼小游戏在线玩", href: "/zh/play/" },
        { label: "二次逃脱小游戏", href: "/zh/play/second-escape/" },
        { label: "甩掉巡查员攻略", href: "/zh/guides/how-to-escape-inspector/" },
        { label: "关卡攻略大全", href: "/zh/levels/" },
        { label: "第1关 公园池塘攻略", href: "/zh/levels/01-park-pond/" },
        { label: "第2关 水库夜钓攻略", href: "/zh/levels/02-reservoir-night/" },
        { label: "第3关 城市河道攻略", href: "/zh/levels/03-city-canal/" },
        { label: "钓鱼佬与巡查队长角色", href: "/zh/characters/" },
        { label: "钓鱼佬梗是什么意思", href: "/zh/meme/fishing-guy-meme/" },
        { label: "路亚跑毒是什么意思", href: "/zh/meme/luya-paodu/" },
        { label: "类似偷偷钓个鱼的游戏", href: "/zh/similar-games/" },
        { label: "钓鱼佬大逃亡 vs unBAITable", href: "/zh/vs/unbaitable/" },
        { label: "免责声明与钓鱼规定", href: "/zh/about/fishing-rules-disclaimer/" },
      ],
    };
  }
  return {
    locale,
    siteName: "Angler Escape",
    homeHref: "/",
    playHref: "/play/",
    howHref: "/guides/how-to-escape-inspector/",
    disclaimerHref: "/about/fishing-rules-disclaimer/",
    disclaimer: DISCLAIMER_EN,
    footerHow: "Escape Guide",
    footerDisclaimer: "Disclaimer",
    links: [
      { label: "Home", href: "/" },
      { label: "Play", href: "/play/" },
      { label: "Guides", href: "/guides/how-to-escape-inspector/" },
      { label: "Levels", href: "/levels/" },
      { label: "Characters", href: "/characters/" },
      { label: "Meme", href: "/meme/fishing-guy-meme/" },
    ],
    footerLinks: [
      { label: "Stealth fishing game", href: "/" },
      { label: "Free fishing game online", href: "/play/" },
      { label: "Second Escape stealth escape game", href: "/play/second-escape/" },
      { label: "How to escape the Inspector", href: "/guides/how-to-escape-inspector/" },
      { label: "All levels & walkthroughs", href: "/levels/" },
      { label: "Park Pond walkthrough", href: "/levels/01-park-pond/" },
      { label: "Reservoir Night walkthrough", href: "/levels/02-reservoir-night/" },
      { label: "City Canal walkthrough", href: "/levels/03-city-canal/" },
      { label: "Characters: angler & Inspector", href: "/characters/" },
      { label: "Chinese fishing guy meme explained", href: "/meme/fishing-guy-meme/" },
      { label: "Games like unBAITable", href: "/similar-games/" },
      { label: "Angler Escape vs unBAITable", href: "/vs/unbaitable/" },
      { label: "Disclaimer & fishing rules", href: "/about/fishing-rules-disclaimer/" },
    ],
  };
}

export function langSwitch(locale: Locale, enPath: string): {
  label: string;
  href: string;
} {
  if (locale === "zh") {
    return { label: "English", href: enPath };
  }
  return {
    label: "中文",
    href: enPath === "/" ? "/zh/" : `/zh${enPath}`,
  };
}

export { SITE_URL };
