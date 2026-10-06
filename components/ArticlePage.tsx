import Link from "next/link";
import type { ArticleContent } from "@/lib/pages";
import { getChrome, langSwitch } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaRow } from "@/components/CtaRow";
import { Disclaimer } from "@/components/Disclaimer";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { article, faqPage, videoGame } from "@/lib/schema";

type Props = { content: ArticleContent };

export function ArticlePage({ content: c }: Props) {
  const chrome = getChrome(c.locale);
  const switcher = langSwitch(c.locale, c.path);
  const schemaType = c.schemaType ?? "Article";
  const mainSchema =
    schemaType === "VideoGame"
      ? videoGame({ locale: c.locale, path: c.path, description: c.description })
      : article({
          locale: c.locale,
          path: c.path,
          headline: c.h1,
          description: c.description,
          type: schemaType,
        });
  const schemas: object[] = [mainSchema];
  if (c.faq.length > 0 && c.faqSchema !== false) schemas.push(faqPage(c.faq));

  return (
    <>
      <JsonLd data={schemas} />
      <Header
        siteName={chrome.siteName}
        homeHref={chrome.homeHref}
        links={chrome.links}
        langSwitchLabel={switcher.label}
        langSwitchHref={switcher.href}
      />
      <main>
        <section className="hero">
          <div className="container">
            {c.breadcrumbs ? <Breadcrumbs items={c.breadcrumbs} /> : null}
            <h1>{c.h1}</h1>
            {c.topNote ? <Disclaimer text={`※ ${c.topNote.replace(/^※\s*/, "")}`} /> : null}
            {c.intro?.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <CtaRow
              primaryLabel={c.primaryCta}
              primaryHref={c.primaryHref}
              secondaryLabel={c.secondaryCta}
              secondaryHref={c.secondaryHref}
            />
            <Disclaimer text={chrome.disclaimer} />
          </div>
        </section>

        <div className="container article-body">
          {c.sections.map((section) => (
            <section key={section.h2}>
              <h2>{section.h2}</h2>
              {section.images ? (
                <div className="figure-row">
                  {section.images.map((img) => (
                    <figure key={img.src} className="content-figure">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                      />
                      {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              ) : null}
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              {section.subsections?.map((sub) => (
                <div key={sub.title} className="act-card">
                  <h3>{sub.title}</h3>
                  <p>{sub.body}</p>
                </div>
              ))}
              {section.list ? (
                <ul className="why-list">
                  {section.list.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong> {item.body}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.cards ? (
                <div className="card-grid">
                  {section.cards.map((card) => {
                    const inner = (
                      <>
                        <h3>{card.title}</h3>
                        {card.meta ? <p className="card-meta">{card.meta}</p> : null}
                        <p>{card.body}</p>
                      </>
                    );
                    return card.href ? (
                      <Link key={card.title} href={card.href} className="content-card">
                        {inner}
                      </Link>
                    ) : (
                      <div key={card.title} className="content-card">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {section.table ? (
                <div className="table-wrap">
                  <table className="compare-table">
                    <thead>
                      <tr>
                        {section.table.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")}>
                          {row.map((cell, i) => (
                            <td key={`${row[0]}-${i}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {section.links ? (
                <ul className="inline-links">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {c.related && c.related.length > 0 ? (
            <section className="related" aria-labelledby="related-pages">
              <h2 id="related-pages">
                {c.relatedTitle ?? (c.locale === "zh" ? "相关页面" : "Related Pages")}
              </h2>
              <ul className="related-list">
                {c.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>{r.label}</Link>
                    {r.note ? <span className="related-note"> — {r.note}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <CtaRow
            primaryLabel={c.primaryCta}
            primaryHref={c.primaryHref}
            secondaryLabel={c.secondaryCta}
            secondaryHref={c.secondaryHref}
          />

          <Faq title={c.faqTitle} items={c.faq} />
        </div>
      </main>
      <Footer
        siteName={chrome.siteName}
        homeHref={chrome.homeHref}
        howHref={chrome.howHref}
        disclaimerHref={chrome.disclaimerHref}
        footerHow={chrome.footerHow}
        footerDisclaimer={chrome.footerDisclaimer}
        disclaimer={chrome.disclaimer}
        links={chrome.footerLinks}
        navLabel={chrome.locale === "zh" ? "站点导航" : "Site pages"}
      />
    </>
  );
}
