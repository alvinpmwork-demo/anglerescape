import Link from "next/link";
import type { HomeContent } from "@/lib/content";
import { getChrome, langSwitch } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaRow } from "@/components/CtaRow";
import { Disclaimer } from "@/components/Disclaimer";
import { PlayPlaceholder } from "@/components/PlayPlaceholder";
import { Faq } from "@/components/Faq";
import { FaqJsonLd } from "@/components/FaqJsonLd";

type Props = { content: HomeContent };

export function HomePage({ content: c }: Props) {
  const chrome = getChrome(c.locale);
  const homeHref = chrome.homeHref;
  const secondHref =
    c.locale === "zh" ? "/zh/play/second-escape/" : "/play/second-escape/";
  const switcher = langSwitch(c.locale, "/");

  return (
    <>
      <FaqJsonLd items={c.faq} />
      <Header
        siteName={chrome.siteName}
        homeHref={homeHref}
        links={chrome.links}
        langSwitchLabel={switcher.label}
        langSwitchHref={switcher.href}
      />
      <main>
        <section className="hero">
          <div className="container">
            <h1>{c.h1}</h1>
            {c.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <CtaRow
              primaryLabel={c.primaryCta}
              primaryHref="#play"
              secondaryLabel={c.secondaryCta}
              secondaryHref={secondHref}
              primaryAnchor
            />
            <Disclaimer text={c.disclaimer} />
          </div>
        </section>

        <div className="container">
          <PlayPlaceholder title={c.playPlaceholder} hint={c.playPlaceholderHint} />

          <section>
            <h2>{c.sectionStealthTitle}</h2>
            {c.sectionStealthBody.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>

          <section id="the-four-act-loop">
            <h2>{c.sectionLoopTitle}</h2>
            <p>{c.sectionLoopIntro}</p>
            {c.acts.map((act, i) => (
              <div key={act.title} className="act-card">
                <h3>{act.title}</h3>
                <p>
                  {i === 3 ? (
                    <>
                      {act.body.split(c.locale === "zh" ? "二次逃脱" : "Second Escape")[0]}
                      <Link href={secondHref}>
                        {c.locale === "zh" ? "二次逃脱" : "Second Escape"}
                      </Link>
                      {act.body.split(c.locale === "zh" ? "二次逃脱" : "Second Escape")[1]}
                    </>
                  ) : (
                    act.body
                  )}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2>{c.whyTitle}</h2>
            <ul className="why-list">
              {c.whyItems.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section id="how-to-play">
            <h2>{c.howTitle}</h2>
            <p>{c.howIntro}</p>
            <ol className="how-steps">
              {c.howSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>{c.howOutro}</p>
            <CtaRow
              primaryLabel={c.primaryCta}
              primaryHref="#play"
              secondaryLabel={c.secondaryCta}
              secondaryHref={secondHref}
              primaryAnchor
            />
          </section>

          <Faq title={c.faqTitle} items={c.faq} />
        </div>
      </main>
      <Footer
        siteName={chrome.siteName}
        homeHref={homeHref}
        howHref={chrome.howHref}
        disclaimerHref={chrome.disclaimerHref}
        footerHow={chrome.footerHow}
        footerDisclaimer={chrome.footerDisclaimer}
        disclaimer={chrome.disclaimer}
      />
    </>
  );
}
