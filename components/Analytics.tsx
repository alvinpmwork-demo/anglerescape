"use client";

import { useEffect } from "react";
import { AnalyticsBanner } from "./AnalyticsBanner";
import { trackEvent } from "@/lib/analytics";

type Props = {
  locale: "en" | "zh";
};

/**
 * Analytics component that handles consent and GA4 loading.
 * Place in layout alongside Clarity.
 */
export function Analytics({ locale }: Props) {
  useEffect(() => {
    // Track outbound itch.io links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>("a[href*='itch.io']");
      if (!link) return;

      const url = link.href;
      trackEvent("outbound_itch", {
        link_url: url,
        hostname: new URL(url).hostname,
        locale,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [locale]);

  return <AnalyticsBanner locale={locale} />;
}
