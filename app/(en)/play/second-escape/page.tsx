import type { Metadata } from "next";
import { SecondEscapePage } from "@/components/SecondEscapePage";
import { secondEn, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: secondEn.title,
  description: secondEn.description,
  alternates: {
    canonical: `${SITE_URL}/play/second-escape/`,
    languages: {
      en: `${SITE_URL}/play/second-escape/`,
      "zh-CN": `${SITE_URL}/zh/play/second-escape/`,
      "x-default": `${SITE_URL}/play/second-escape/`,
    },
  },
  openGraph: {
    title: secondEn.title,
    description: secondEn.description,
    url: `${SITE_URL}/play/second-escape/`,
    locale: "en_US",
  },
};

export default function Page() {
  return <SecondEscapePage content={secondEn} />;
}
