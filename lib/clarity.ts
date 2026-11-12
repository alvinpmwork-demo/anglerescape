export const CLARITY_PROJECT_ID = "zbynruziy0";

type ClarityQueue = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityQueue;
  }
}

export function loadClarity(): void {
  if (typeof window === "undefined") return;

  // Check at runtime: the same static export is served on production and previews.
  // An exact allowlist excludes localhost, 127.0.0.1 and all *.pages.dev hosts.
  const hostname = window.location.hostname;
  if (hostname !== "anglerescape.com" && hostname !== "www.anglerescape.com") return;

  const src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  if (document.querySelector(`script[src="${src}"]`)) return;

  // Official queue + async tag. There is no consent banner/CMP on this site.
  // Send no consent signals (neither granted nor a fabricated denied signal).
  // No-consent integration does NOT guarantee cookie-free operation worldwide:
  // outside EEA/UK/CH, cookies may be set unless Consent Mode is enabled in
  // Clarity Settings → Setup (turn OFF default cookies). This is for review.
  // https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode
  window.clarity = window.clarity || function (...args: unknown[]) {
    (window.clarity!.q = window.clarity!.q || []).push(args);
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}
