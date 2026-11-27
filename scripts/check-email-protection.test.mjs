import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  CONTACT_EMAIL,
  REQUIRED_PAGES,
  checkEmailProtection,
  checkHtml,
  checkRequiredPage,
} from "./check-email-protection.mjs";

const protectedBlock = `<!--email_off--><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a><!--/email_off-->`;
const goodPage = `<!doctype html><html><body><p>Email: ${protectedBlock}</p><script>self.__next_f.push([1, "mailto:${CONTACT_EMAIL}"]);</script></body></html>`;

async function fixture(t, files = {}) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "check-email-protection-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const rel of REQUIRED_PAGES) {
    const dest = path.join(dir, rel);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, files[rel] ?? goodPage);
  }
  return dir;
}

test("accepts a required page with email_off, mailto, and email only in a script", () => {
  assert.doesNotThrow(() => checkRequiredPage(goodPage, "good"));
});

test("M1: rejects a paragraph email that is not wrapped", () => {
  const html = `<p>Questions about privacy: ${CONTACT_EMAIL}</p>${protectedBlock}`;
  assert.throws(() => checkHtml(html, "privacy"), /unprotected hello@anglerescape.com/);
});

test("M2: rejects HTML where email_off comments never appeared (JSX comments are stripped)", () => {
  const html = `<p>Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`;
  assert.throws(() => checkHtml(html, "contact"), /unprotected/);
});

test("M3: rejects a mailto link outside email_off", () => {
  const html = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
  assert.throws(() => checkHtml(html, "contact"), /unprotected/);
});

test("rejects a crawlable email-protection URL", () => {
  const html = `<a href="/cdn-cgi/l/email-protection#abc">[email protected]</a>${protectedBlock}`;
  assert.throws(() => checkRequiredPage(html, "contact"), /email-protection/);
});

test("rejects a required page that dropped email_off entirely", () => {
  assert.throws(() => checkRequiredPage("<p>No email here</p>", "out/contact/index.html"), /missing Cloudflare/);
});

test("checkEmailProtection accepts a complete out/ fixture", async (t) => {
  const dir = await fixture(t);
  await assert.doesNotReject(() => checkEmailProtection(dir));
});

test("checkEmailProtection rejects M1 on a privacy page", async (t) => {
  const dir = await fixture(t, {
    "out/privacy/index.html": `<p>Questions about privacy: ${CONTACT_EMAIL}</p>${protectedBlock}`,
  });
  await assert.rejects(() => checkEmailProtection(dir), /unprotected hello@anglerescape.com/);
});
