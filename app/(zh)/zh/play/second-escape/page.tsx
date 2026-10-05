import type { Metadata } from "next";
import { SecondEscapePage } from "@/components/SecondEscapePage";
import { secondZh, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: secondZh.title,
  description: secondZh.description,
  alternates: {
    canonical: `${SITE_URL}/zh/play/second-escape/`,
    languages: {
      en: `${SITE_URL}/play/second-escape/`,
      "zh-CN": `${SITE_URL}/zh/play/second-escape/`,
      "x-default": `${SITE_URL}/play/second-escape/`,
    },
  },
  openGraph: {
    title: secondZh.title,
    description: secondZh.description,
    url: `${SITE_URL}/zh/play/second-escape/`,
    locale: "zh_CN",
  },
};

export default function Page() {
  return <SecondEscapePage content={secondZh} />;
}
