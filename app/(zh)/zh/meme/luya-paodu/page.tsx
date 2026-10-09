import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { luyaZh } from "@/lib/pages";
import { buildPageMetadata } from "@/lib/seo";

const content = luyaZh;

export const metadata: Metadata = buildPageMetadata({
  locale: content.locale,
  path: content.path,
  title: content.title,
  description: content.description,
  ogType: content.schemaType === "Article" ? "article" : "website",
  singleLocale: content.singleLocale,
});

export default function Page() {
  return <ArticlePage content={content} />;
}
