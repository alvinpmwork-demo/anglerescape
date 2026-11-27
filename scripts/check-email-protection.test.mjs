import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { ARTICLE_PAGE, COMPONENT, checkEmailProtection } from "./check-email-protection.mjs";

const root = path.resolve(import.meta.dirname, "..");

async function fixture(t) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "check-email-protection-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const file of [COMPONENT, ARTICLE_PAGE, "lib/pages/trust.ts"]) {
    const dest = path.join(dir, file);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, await readFile(path.join(root, file)));
  }
  return {
    dir,
    async change(file, before, after) {
      const target = path.join(dir, file);
      const text = await readFile(target, "utf8");
      assert(text.includes(before), `Mutation must match: ${before}`);
      await writeFile(target, text.replaceAll(before, after));
    },
  };
}

test("accepts the real source", async () => {
  await assert.doesNotReject(() => checkEmailProtection(root));
});

test("accepts a copied fixture", async (t) => {
  const f = await fixture(t);
  await assert.doesNotReject(() => checkEmailProtection(f.dir));
});

test("rejects missing email_off comments", async (t) => {
  const f = await fixture(t);
  await f.change(COMPONENT, "<!--email_off-->", "");
  await assert.rejects(() => checkEmailProtection(f.dir), /email_off/);
});

test("rejects ArticlePage that stops wrapping body text", async (t) => {
  const f = await fixture(t);
  await f.change(ARTICLE_PAGE, "withProtectedEmail", "identity");
  await assert.rejects(() => checkEmailProtection(f.dir), /withProtectedEmail/);
});
