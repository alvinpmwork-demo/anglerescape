import type { FaqItem, Locale } from "@/lib/content";

export type ArticleSubsection = { title: string; body: string };

export type ArticleCard = {
  title: string;
  body: string;
  href?: string;
  meta?: string;
};

export type ArticleTable = {
  headers: string[];
  rows: string[][];
};

export type ArticleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ArticleSection = {
  h2: string;
  images?: ArticleImage[];
  paragraphs?: string[];
  subsections?: ArticleSubsection[];
  cards?: ArticleCard[];
  table?: ArticleTable;
  list?: { title: string; body: string }[];
  links?: { label: string; href: string }[];
};

export type Breadcrumb = { label: string; href: string };

export type ArticleContent = {
  locale: Locale;
  /** EN path without locale prefix, e.g. /guides/how-to-escape-inspector/ */
  path: string;
  title: string;
  description: string;
  h1: string;
  /** Extra above-the-fold disclaimer (guide/levels) */
  topNote?: string;
  intro?: string[];
  sections: ArticleSection[];
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  faqTitle: string;
  faq: FaqItem[];
  breadcrumbs?: Breadcrumb[];
  /** JSON-LD main type for this page */
  schemaType?: "Article" | "VideoGame" | "CollectionPage" | "WebPage";
  /** Emit FAQPage JSON-LD for the visible FAQ block */
  faqSchema?: boolean;
  /** Cross-links rendered as a "related pages" block (keyword-rich anchors) */
  relatedTitle?: string;
  related?: { label: string; href: string; note?: string }[];
};

export type { FaqItem, Locale };
