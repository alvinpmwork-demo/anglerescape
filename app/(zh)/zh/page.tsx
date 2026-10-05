import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { homeZh, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: homeZh.title,
  description: homeZh.description,
  alternates: {
    canonical: `${SITE_URL}/zh/`,
    languages: {
      en: `${SITE_URL}/`,
      "zh-CN": `${SITE_URL}/zh/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    title: homeZh.title,
    description: homeZh.description,
    url: `${SITE_URL}/zh/`,
    locale: "zh_CN",
  },
};

export default function Page() {
  return <HomePage content={homeZh} />;
}
