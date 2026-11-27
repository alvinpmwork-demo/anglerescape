#!/usr/bin/env node
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const CONTACT_EMAIL = "hello@anglerescape.com";
export const REQUIRED_PAGES = [
  "out/contact/index.html",
  "out/zh/contact/index.html",
  "out/privacy/index.html",
  "out/zh/privacy/index.html",
];

export function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

export function withoutProtectedRegions(html) {
  return stripScripts(html).replace(/<!--email_off-->[\s\S]*?<!--\/email_off-->/g, "");
}

export function checkHtml(html, name) {
  assert(!html.includes("/cdn-cgi/l/email-protection"), `${name} contains a crawlable /cdn-cgi/l/email-protection link`);
  const exposed = withoutProtectedRegions(html);
  const emails = exposed.match(new RegExp(CONTACT_EMAIL.replace(".", "\\."), "g")) ?? [];
  const mailtos = exposed.match(/mailto:/gi) ?? [];
  assert.equal(emails.length, 0, `${name} has unprotected ${CONTACT_EMAIL} outside <!--email_off-->`);
  assert.equal(mailtos.length, 0, `${name} has an unprotected mailto outside <!--email_off-->`);
}

export function checkRequiredPage(html, name) {
  checkHtml(html, name);
  assert(html.includes("<!--email_off-->") && html.includes("<!--/email_off-->"), `${name} is missing Cloudflare <!--email_off--> comments`);
  assert(html.includes(`href="mailto:${CONTACT_EMAIL}"`), `${name} is missing a usable mailto:${CONTACT_EMAIL}`);
}

async function walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkHtml(name));
    else if (entry.name.endsWith(".html")) files.push(name);
  }
  return files;
}

export async function checkEmailProtection(root) {
  const outDir = path.join(root, "out");
  try {
    assert((await stat(outDir)).isDirectory());
  } catch {
    throw new Error("Missing out/. Run npm run build before check:email-protection.");
  }

  for (const rel of REQUIRED_PAGES) {
    checkRequiredPage(await readFile(path.join(root, rel), "utf8"), rel);
  }

  let checked = REQUIRED_PAGES.length;
  for (const file of await walkHtml(outDir)) {
    const rel = path.relative(root, file);
    if (REQUIRED_PAGES.includes(rel)) continue;
    checkHtml(await readFile(file, "utf8"), rel);
    checked += 1;
  }
  console.log(`PASS email protection: ${checked} HTML pages; required contact/privacy pages have email_off + mailto; no unprotected ${CONTACT_EMAIL} or /cdn-cgi/l/email-protection.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await checkEmailProtection(path.resolve(import.meta.dirname, ".."));
}
