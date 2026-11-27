export const GA4_MEASUREMENT_ID = "G-LSSVCD4DEC";

export const CONSENT_STORAGE_KEY = "anglerescape:analytics-consent:v1";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Load Google Analytics 4 script.
 * Only loads if consent is granted and on production domains.
 */
export function loadGtag(): void {
  if (typeof window === "undefined") return;

  // Only load if consent is granted
  const consent = getConsentChoice();
  if (consent !== "granted") return;

  // Check at runtime: the same static export is served on production and previews.
  // An exact allowlist excludes localhost, 127.0.0.1 and all *.pages.dev hosts.
  const hostname = window.location.hostname;
  if (hostname !== "anglerescape.com" && hostname !== "www.anglerescape.com") return;

  const src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  if (document.querySelector(`script[src="${src}"]`)) return;

  // Initialize dataLayer and gtag queue
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  // Load the gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);

  // Configure GA4
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, {
    // Ad-related storage must remain denied
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    // Analytics storage is granted (we only load after consent)
    analytics_storage: "granted",
  });
}

/**
 * Read consent choice from localStorage.
 */
export function getConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Storage unavailable
  }
  return null;
}

/**
 * Save consent choice to localStorage.
 */
export function setConsentChoice(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage unavailable - choice still applies to current session
  }
}

/**
 * Delete GA cookies (used when revoking consent).
 */
export function deleteGaCookies(): void {
  if (typeof document === "undefined") return;

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;

    // Delete for current path and domain
    document.cookie = `${name}=; Max-Age=0; Path=/`;
    // Also try with domain
    const hostname = window.location.hostname;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${hostname}`;
  }
}

/**
 * Track a custom event (only if gtag is loaded and consent granted).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  const choice = getConsentChoice();
  if (choice !== "granted") return;

  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
}
