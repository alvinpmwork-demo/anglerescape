import type { FaqItem, Locale } from "@/lib/content";
import { SITE_URL } from "@/lib/content";
import { absUrl, CONTENT_PUBLISHED, CONTENT_UPDATED, OG_IMAGE, SITE_NAME } from "@/lib/seo";

type Crumb = { label: string; href: string };

const LANG = { en: "en", zh: "zh-Hans" } as const;

function abs(href: string): string {
  return href.startsWith("http") ? href : `${SITE_URL}${href}`;
}

export function organization() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Angler Escape",
    alternateName: "钓鱼佬大逃亡",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}${OG_IMAGE.en.url}`,
  };
}

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  };
}

export function faqPage(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function videoGame(opts: {
  locale: Locale;
  path: string;
  name?: string;
  description: string;
}) {
  const { locale, path, description } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": `${absUrl(locale, path)}#game`,
    name: opts.name ?? SITE_NAME[locale],
    alternateName: locale === "zh" ? "Angler Escape" : "钓鱼佬大逃亡",
    url: absUrl(locale, path),
    description,
    image: `${SITE_URL}${OG_IMAGE[locale].url}`,
    inLanguage: LANG[locale],
    genre: ["Stealth", "Casual", "Comedy", "Fishing"],
    gamePlatform: ["Web browser", "Desktop", "Mobile"],
    applicationCategory: "Game",
    operatingSystem: "Any (web browser)",
    playMode: "SinglePlayer",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: organization(),
  };
}

export function website(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absUrl(locale, "/")}#website`,
    name: SITE_NAME[locale],
    alternateName: locale === "zh" ? "Angler Escape" : "钓鱼佬大逃亡",
    url: absUrl(locale, "/"),
    inLanguage: LANG[locale],
    publisher: organization(),
  };
}

export function article(opts: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
  type?: "Article" | "WebPage" | "CollectionPage";
}) {
  const { locale, path, headline, description, type = "Article" } = opts;
  const url = absUrl(locale, path);
  const base = {
    "@context": "https://schema.org",
    "@type": type,
    headline: headline.slice(0, 110),
    name: headline,
    description,
    inLanguage: LANG[locale],
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}${OG_IMAGE[locale].url}`,
    datePublished: CONTENT_PUBLISHED,
    dateModified: CONTENT_UPDATED,
    isPartOf: { "@id": `${absUrl(locale, "/")}#website` },
  };
  if (type === "Article") {
    return { ...base, author: organization(), publisher: organization() };
  }
  return base;
}
