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

export type ArticleSection = {
  h2: string;
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
};

export type { FaqItem, Locale };
