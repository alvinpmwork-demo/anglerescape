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

export function buildAlternates(enPath: string) {
  const enUrl = `${SITE_URL}${enPath}`;
  const zhUrl = `${SITE_URL}${enPath === "/" ? "/zh/" : `/zh${enPath}`}`;
  return {
    canonical: enUrl,
    languages: {
      en: enUrl,
      "zh-CN": zhUrl,
      "x-default": enUrl,
    },
  };
}

export function buildAlternatesFor(locale: Locale, enPath: string) {
  const enUrl = `${SITE_URL}${enPath}`;
  const zhPath = enPath === "/" ? "/zh/" : `/zh${enPath}`;
  const zhUrl = `${SITE_URL}${zhPath}`;
  const canonical = locale === "zh" ? zhUrl : enUrl;
  return {
    canonical,
    languages: {
      en: enUrl,
      "zh-CN": zhUrl,
      "x-default": enUrl,
    },
  };
}

export { SITE_URL };
