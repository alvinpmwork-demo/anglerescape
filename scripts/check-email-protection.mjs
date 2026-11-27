#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const CONTACT_EMAIL = "hello@anglerescape.com";
export const COMPONENT = "components/ProtectedEmail.tsx";
export const ARTICLE_PAGE = "components/ArticlePage.tsx";

export async function checkEmailProtection(root) {
  const component = await readFile(path.join(root, COMPONENT), "utf8");
  assert(component.includes("<!--email_off-->"), `${COMPONENT} must emit Cloudflare <!--email_off-->`);
  assert(component.includes("<!--/email_off-->"), `${COMPONENT} must emit Cloudflare <!--/email_off-->`);
  assert(component.includes("mailto:${CONTACT_EMAIL}") || component.includes(`mailto:${CONTACT_EMAIL}`),
    `${COMPONENT} must keep a usable mailto link`);
  assert(component.includes("withProtectedEmail"), `${COMPONENT} must export withProtectedEmail`);

  const article = await readFile(path.join(root, ARTICLE_PAGE), "utf8");
  assert(article.includes("withProtectedEmail"), `${ARTICLE_PAGE} must wrap text through withProtectedEmail`);
  assert(article.includes("ProtectedEmail"), `${ARTICLE_PAGE} must render ProtectedEmail for mail links`);
  assert(article.includes("isMailtoHref"), `${ARTICLE_PAGE} must treat mailto hrefs as protected emails`);
  assert(!article.includes("<Link href={link.href}>{link.label}</Link>") || article.includes("isMailtoHref(link.href)"),
    `${ARTICLE_PAGE} must not render mailto hrefs with Next Link`);

  const trust = await readFile(path.join(root, "lib/pages/trust.ts"), "utf8");
  assert(trust.includes(`export const CONTACT_EMAIL = "${CONTACT_EMAIL}"`), "CONTACT_EMAIL must stay the real inbox");

  console.log("PASS contact/privacy email markup is wrapped so Cloudflare cannot emit crawlable /cdn-cgi/l/email-protection links.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await checkEmailProtection(path.resolve(import.meta.dirname, ".."));
}
