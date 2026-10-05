import Link from "next/link";
import type { ArticleContent } from "@/lib/pages";
import { getChrome, langSwitch } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaRow } from "@/components/CtaRow";
import { Disclaimer } from "@/components/Disclaimer";
import { Faq } from "@/components/Faq";
import { FaqJsonLd } from "@/components/FaqJsonLd";

type Props = { content: ArticleContent };

export function ArticlePage({ content: c }: Props) {
  const chrome = getChrome(c.locale);
  const switcher = langSwitch(c.locale, c.path);

  return (
    <>
      <FaqJsonLd items={c.faq} />
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
            {c.breadcrumbs && c.breadcrumbs.length > 0 ? (
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                  {c.breadcrumbs.map((crumb, i) => (
                    <li key={crumb.href}>
                      {i < c.breadcrumbs!.length - 1 ? (
                        <Link href={crumb.href}>{crumb.label}</Link>
                      ) : (
                        <span aria-current="page">{crumb.label}</span>
                      )}
                      {i < c.breadcrumbs!.length - 1 ? (
                        <span className="bc-sep" aria-hidden>
                          /
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
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
      />
    </>
  );
}
