/**
 * Builds /llms-full.txt (clean Markdown of every indexable page) from the same
 * content sources the pages render from, so it never drifts from the site.
 */
import type { FaqItem, HomeContent, Locale, SecondEscapeContent } from "@/lib/content";
import { DISCLAIMER_EN, DISCLAIMER_ZH, homeEn, homeZh, secondEn, secondZh, SITE_URL } from "@/lib/content";
import { allArticles, type ArticleContent } from "@/lib/pages";
import { absUrl, CONTENT_UPDATED } from "@/lib/seo";

const abs = (href: string) => (href.startsWith("http") ? href : `${SITE_URL}${href}`);

function faqMd(title: string, faq: FaqItem[]): string[] {
  if (!faq.length) return [];
  return [`### ${title}`, "", ...faq.flatMap((f) => [`**${f.q}**`, "", f.a, ""])];
}

function relatedMd(title: string, items: { label: string; href: string; note?: string }[] | undefined): string[] {
  if (!items?.length) return [];
  return [`### ${title}`, "", ...items.map((r) => `- [${r.label}](${abs(r.href)})${r.note ? `: ${r.note}` : ""}`), ""];
}

function header(title: string, url: string, description: string): string[] {
  return [`## ${title}`, "", `URL: ${url}`, "", `> ${description}`, ""];
}

function homeMd(c: HomeContent): string {
  return [
    ...header(c.h1, absUrl(c.locale, "/"), c.description),
    c.subhead,
    "",
    `${c.trustLabels.join(" · ")}`,
    "",
    ...c.intro.flatMap((p) => [p, ""]),
    `**${c.nextTitle}** ${c.nextBody}`,
    "",
    `### ${c.sectionStealthTitle}`,
    "",
    ...c.sectionStealthBody.flatMap((p) => [p, ""]),
    `### ${c.sectionLoopTitle}`,
    "",
    c.sectionLoopIntro,
    "",
    ...c.acts.map((a) => `- **${a.title}** ${a.body}`),
    "",
    `### ${c.whyTitle}`,
    "",
    ...c.whyItems.map((w) => `- **${w.title}** ${w.body}`),
    "",
    `### ${c.howTitle}`,
    "",
    c.howIntro,
    "",
    ...c.howSteps.map((s, i) => `${i + 1}. ${s}`),
    "",
    `**${c.howFutureTitle}**`,
    "",
    ...c.howFutureSteps.map((s) => `- ${s}`),
    "",
    c.howOutro,
    "",
    ...faqMd(c.faqTitle, c.faq),
    ...relatedMd(c.relatedTitle, c.related),
  ].join("\n");
}

function secondMd(c: SecondEscapeContent): string {
  return [
    ...header(c.h1, absUrl(c.locale, "/play/second-escape/"), c.description),
    c.intro,
    "",
    `### ${c.howTitle}`,
    "",
    ...c.howSteps.map((s) => `- ${s}`),
    "",
    `### ${c.bustTitle}`,
    "",
    ...c.bustBody.flatMap((p) => [p, ""]),
    `### ${c.backFootTitle}`,
    "",
    c.backFootIntro,
    "",
    ...c.subsections.flatMap((s) => [`#### ${s.title}`, "", s.body, ""]),
    `### ${c.breakTitle}`,
    "",
    c.breakBody,
    "",
    `### ${c.routesTitle}`,
    "",
    ...c.routes.map((r) => `- **${r.name}**: ${r.desc}`),
    "",
    `### ${c.highlightTitle}`,
    "",
    c.highlightBody,
    "",
    `### ${c.practiceTitle}`,
    "",
    c.practiceBody,
    "",
    ...faqMd(c.faqTitle, c.faq),
    ...relatedMd(c.relatedTitle, c.related),
  ].join("\n");
}

function tableMd(t: { headers: string[]; rows: string[][] }): string[] {
  const esc = (s: string) => s.replace(/\|/g, "\\|");
  return [
    `| ${t.headers.map(esc).join(" | ")} |`,
    `| ${t.headers.map(() => "---").join(" | ")} |`,
    ...t.rows.map((r) => `| ${r.map(esc).join(" | ")} |`),
    "",
  ];
}

function articleMd(c: ArticleContent): string {
  const out: string[] = [...header(c.h1, absUrl(c.locale, c.path), c.description)];
  if (c.devNotice) out.push(`**${c.locale === "zh" ? "开发中：" : "In development:"}** ${c.devNotice}`, "");
  if (c.topNote) out.push(`*${c.topNote.replace(/^※\s*/, "")}*`, "");
  c.intro?.forEach((p) => out.push(p, ""));
  for (const s of c.sections) {
    out.push(`### ${s.h2}`, "");
    s.paragraphs?.forEach((p) => out.push(p, ""));
    s.subsections?.forEach((sub) => out.push(`#### ${sub.title}`, "", sub.body, ""));
    if (s.cards?.length) {
      s.cards.forEach((card) =>
        out.push(`- **${card.href ? `[${card.title}](${abs(card.href)})` : card.title}**${card.meta ? ` (${card.meta})` : ""}: ${card.body}`),
      );
      out.push("");
    }
    if (s.table) out.push(...tableMd(s.table));
    if (s.list?.length) {
      s.list.forEach((li) => out.push(`- **${li.title}** ${li.body}`));
      out.push("");
    }
    if (s.links?.length) {
      s.links.forEach((l) => out.push(`- [${l.label}](${abs(l.href)})`));
      out.push("");
    }
  }
  out.push(...faqMd(c.faqTitle, c.faq));
  if (c.bottomNote) out.push(`*${c.bottomNote.replace(/^※\s*/, "")}*`, "");
  out.push(...relatedMd(c.relatedTitle ?? (c.locale === "zh" ? "相关页面" : "Related pages"), c.related));
  return out.join("\n");
}

function localeBlock(locale: Locale): string {
  const home = locale === "zh" ? homeZh : homeEn;
  const second = locale === "zh" ? secondZh : secondEn;
  const articles = allArticles.filter((a) => a.locale === locale);
  return [homeMd(home), secondMd(second), ...articles.map(articleMd)].join("\n\n---\n\n");
}

export function buildLlmsFull(): string {
  return [
    "# Angler Escape / 钓鱼佬大逃亡 — full site content",
    "",
    "> Full text of every public page on https://anglerescape.com in Markdown, generated from the site's content sources at build time. Angler Escape is a free, bilingual, cartoon-fiction browser stealth game about a fictional angler and an Inspector. It is not real-world fishing, poaching, or evasion advice.",
    "",
    `Last updated: ${CONTENT_UPDATED}. Short index: ${SITE_URL}/llms.txt. Sitemap: ${SITE_URL}/sitemap.xml.`,
    "",
    `Disclaimer (EN): ${DISCLAIMER_EN.replace(/^※\s*/, "")}`,
    "",
    `免责声明（中文）：${DISCLAIMER_ZH.replace(/^※\s*/, "")}`,
    "",
    "# English pages",
    "",
    localeBlock("en"),
    "",
    "# 中文页面 (zh-Hans, /zh/)",
    "",
    localeBlock("zh"),
    "",
  ].join("\n");
}
