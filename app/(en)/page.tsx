import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { homeEn, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: homeEn.title,
  description: homeEn.description,
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      "zh-CN": `${SITE_URL}/zh/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    title: homeEn.title,
    description: homeEn.description,
    url: `${SITE_URL}/`,
    locale: "en_US",
  },
};

export default function Page() {
  return <HomePage content={homeEn} />;
}
