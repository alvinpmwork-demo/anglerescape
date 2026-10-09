import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { SITE_URL } from "@/lib/content";

/** Date the current copy/SEO pass was published (used for sitemap lastmod + Article dateModified). */
export const CONTENT_UPDATED = "2026-10-06";
/** Original launch date of the Week-1 pages. */
export const CONTENT_PUBLISHED = "2026-10-05";
/** Last site-wide change to page HTML (structured data, head tags); used for sitemap lastmod. */
export const SITE_UPDATED = "2026-10-09";

export const SITE_NAME = { en: "Angler Escape", zh: "钓鱼佬大逃亡" } as const;

export const OG_IMAGE = {
  en: {
    url: "/og/angler-escape-en.png",
    alt: "Angler Escape – free stealth fishing game: a cartoon angler and the Inspector in a reflective vest",
  },
  zh: {
    url: "/og/angler-escape-zh.png",
    alt: "钓鱼佬大逃亡——被抓了还能跑的钓鱼佬小游戏：钓鱼佬与穿反光背心的巡查员",
  },
} as const;

/** EN-form path (e.g. /play/) → locale path (/zh/play/). */
export function localePath(locale: Locale, enPath: string): string {
  if (locale === "en") return enPath;
  return enPath === "/" ? "/zh/" : `/zh${enPath}`;
}

export function absUrl(locale: Locale, enPath: string): string {
  return `${SITE_URL}${localePath(locale, enPath)}`;
}

/** hreflang map shared by <head> alternates and the sitemap. */
export function hreflangMap(enPath: string): Record<string, string> {
  return {
    en: absUrl("en", enPath),
    zh: absUrl("zh", enPath),
    "x-default": absUrl("en", enPath),
  };
}

type PageMetaInput = {
  locale: Locale;
  /** EN-form path */
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogType = "website",
}: PageMetaInput): Metadata {
  const url = absUrl(locale, path);
  const image = OG_IMAGE[locale];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: hreflangMap(path),
      // Machine-readable site guide for AI agents (llmstxt.org)
      types: { "text/markdown": "/llms.txt" },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME[locale],
      type: ogType,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
