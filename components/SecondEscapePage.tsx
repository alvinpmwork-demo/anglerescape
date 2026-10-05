import Link from "next/link";
import type { SecondEscapeContent } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaRow } from "@/components/CtaRow";
import { Disclaimer } from "@/components/Disclaimer";
import { SecondEscapeGame } from "@/components/SecondEscapeGame";
import { Faq } from "@/components/Faq";
import { FaqJsonLd } from "@/components/FaqJsonLd";

type Props = { content: SecondEscapeContent };

export function SecondEscapePage({ content: c }: Props) {
  const homeHref = c.locale === "zh" ? "/zh/" : "/";
  const secondHref =
    c.locale === "zh" ? "/zh/play/second-escape/" : "/play/second-escape/";
  const fourActHref = `${homeHref}#the-four-act-loop`;

  return (
    <>
      <FaqJsonLd items={c.faq} />
      <Header
        siteName={c.siteName}
        homeHref={homeHref}
        secondHref={secondHref}
        navHome={c.navHome}
        navSecond={c.navSecond}
        langSwitchLabel={c.langSwitchLabel}
        langSwitchHref={c.langSwitchHref}
      />
      <main>
        <section className="hero">
          <div className="container">
            <h1>{c.h1}</h1>
            <p>{c.intro}</p>
            <CtaRow
              primaryLabel={c.primaryCta}
              primaryHref="#play"
              secondaryLabel={c.secondaryCta}
              secondaryHref={homeHref}
              primaryAnchor
            />
            <Disclaimer text={c.disclaimer} />
          </div>
        </section>

        <div className="container">
          <SecondEscapeGame locale={c.locale} />

          <section>
            <h2>{c.bustTitle}</h2>
            {c.bustBody.map((p, i) => (
              <p key={p.slice(0, 24)}>
                {i === 0 ? (
                  <>
                    {c.locale === "zh" ? (
                      <>
                        {p.split("第四幕")[0]}
                        <Link href={fourActHref}>第四幕</Link>
                        {p.split("第四幕")[1]}
                      </>
                    ) : (
                      <>
                        {p.split("fourth act")[0]}
                        <Link href={fourActHref}>fourth act</Link>
                        {p.split("fourth act")[1]}
                      </>
                    )}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </section>

          <section>
            <h2>{c.backFootTitle}</h2>
            <p>{c.backFootIntro}</p>
            {c.subsections.map((s) => (
              <div key={s.title} className="act-card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>{c.breakTitle}</h2>
            <p>{c.breakBody}</p>
            <h3>{c.routesTitle}</h3>
            <ul className="why-list">
              {c.routes.map((r) => (
                <li key={r.name}>
                  <strong>{r.name}</strong> {r.desc}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{c.highlightTitle}</h2>
            <p>{c.highlightBody}</p>
          </section>

          <section>
            <h2>{c.practiceTitle}</h2>
            <p>
              {c.locale === "zh" ? (
                <>
                  {c.practiceBody.split("回首页")[0]}
                  <Link href={homeHref}>回首页</Link>
                  {c.practiceBody.split("回首页")[1]}
                </>
              ) : (
                <>
                  {c.practiceBody.split("the homepage")[0]}
                  <Link href={homeHref}>the homepage</Link>
                  {c.practiceBody.split("the homepage")[1]}
                </>
              )}
            </p>
            <CtaRow
              primaryLabel={c.primaryCta}
              primaryHref="#play"
              secondaryLabel={c.secondaryCta}
              secondaryHref={homeHref}
              primaryAnchor
            />
          </section>

          <Faq title={c.faqTitle} items={c.faq} />
        </div>
      </main>
      <Footer
        siteName={c.siteName}
        homeHref={homeHref}
        howHref={`${homeHref}#how-to-play`}
        disclaimerHref="#disclaimer"
        footerHow={c.footerHow}
        footerDisclaimer={c.footerDisclaimer}
        disclaimer={c.disclaimer}
      />
    </>
  );
}
