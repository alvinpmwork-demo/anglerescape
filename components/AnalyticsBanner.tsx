"use client";

import { useEffect, useState, useRef } from "react";
import {
  type ConsentChoice,
  CONSENT_STORAGE_KEY,
  getConsentChoice,
  setConsentChoice,
  loadGtag,
  deleteGaCookies,
} from "@/lib/analytics";

type Locale = "en" | "zh";

const copy = {
  en: {
    title: "Analytics & Cookies",
    message:
      "We use Google Analytics to understand how visitors use the site. You can allow or decline analytics tracking. See our",
    privacyLink: "Privacy Policy",
    allow: "Allow",
    decline: "Decline",
    settings: "Analytics choices",
  },
  zh: {
    title: "分析与 Cookie",
    message:
      "我们使用 Google Analytics 了解访客如何使用本站。你可以允许或拒绝分析跟踪。详见",
    privacyLink: "隐私政策",
    allow: "允许",
    decline: "拒绝",
    settings: "分析选项",
  },
} as const;

type Props = {
  locale: Locale;
};

export function AnalyticsBanner({ locale }: Props) {
  const t = copy[locale] ?? copy.en;
  const privacyPath = locale === "zh" ? "/zh/privacy/" : "/privacy/";
  const [bannerVisible, setBannerVisible] = useState(false);
  const [shouldAddPadding, setShouldAddPadding] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenedFromSettingsRef = useRef(false);
  const gtagLoadedRef = useRef(false);

  const handleChoice = (choice: ConsentChoice) => {
    setConsentChoice(choice);
    setBannerVisible(false);
    setShouldAddPadding(false);

    if (choice === "granted") {
      if (!gtagLoadedRef.current) {
        loadGtag();
        gtagLoadedRef.current = true;
      }
    } else {
      // Revoke: delete cookies and reload if gtag was loaded
      deleteGaCookies();
      if (gtagLoadedRef.current) {
        window.location.reload();
      }
    }

    // Restore focus to settings button if opened from there
    if (wasOpenedFromSettingsRef.current) {
      settingsButtonRef.current?.focus();
      wasOpenedFromSettingsRef.current = false;
    }
  };

  const openBanner = () => {
    wasOpenedFromSettingsRef.current = true;
    setBannerVisible(true);
    setShouldAddPadding(true);
    // Focus the banner title for accessibility
    setTimeout(() => {
      bannerRef.current?.querySelector("h2")?.focus();
    }, 0);
  };

  const closeBanner = () => {
    setBannerVisible(false);
    setShouldAddPadding(false);
    if (wasOpenedFromSettingsRef.current) {
      settingsButtonRef.current?.focus();
      wasOpenedFromSettingsRef.current = false;
    }
  };

  useEffect(() => {
    // Check for existing consent
    const stored = getConsentChoice();

    if (stored === "granted") {
      loadGtag();
      gtagLoadedRef.current = true;
    } else if (stored === null) {
      // No choice yet - show banner
      setBannerVisible(true);
      setShouldAddPadding(true);
    }

    // Listen for storage changes from other tabs
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return;

      const newChoice = event.newValue as ConsentChoice | null;
      if (newChoice === "granted") {
        if (!gtagLoadedRef.current) {
          loadGtag();
          gtagLoadedRef.current = true;
        }
        setBannerVisible(false);
        setShouldAddPadding(false);
      } else if (newChoice === "denied") {
        deleteGaCookies();
        if (gtagLoadedRef.current) {
          window.location.reload();
        } else {
          setBannerVisible(false);
          setShouldAddPadding(false);
        }
      } else {
        // Revoked - show banner again
        setBannerVisible(true);
        setShouldAddPadding(true);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <>
      {/* Settings button in footer - always present */}
      <button
        ref={settingsButtonRef}
        onClick={openBanner}
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 40,
          background: "white",
          border: "1px solid #ccc",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {t.settings}
      </button>

      {/* Banner */}
      {bannerVisible && (
        <div
          ref={bannerRef}
          role="dialog"
          aria-labelledby="consent-banner-title"
          aria-modal="false"
          onKeyDown={(e) => {
            if (e.key === "Escape" && wasOpenedFromSettingsRef.current) {
              closeBanner();
            }
          }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderTop: "1px solid #ccc",
            padding: "1rem",
            zIndex: 50,
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              id="consent-banner-title"
              tabIndex={-1}
              style={{
                fontSize: "1.125rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {t.title}
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              {t.message}{" "}
              <a
                href={privacyPath}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {t.privacyLink}
              </a>
              .
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleChoice("granted")}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {t.allow}
              </button>
              <button
                onClick={() => handleChoice("denied")}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {t.decline}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add bottom padding when banner is visible */}
      {shouldAddPadding && (
        <style>{`
          body {
            padding-bottom: 150px !important;
          }
        `}</style>
      )}
    </>
  );
}
