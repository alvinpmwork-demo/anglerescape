import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { checkClarity, transpile } from './check-clarity.mjs';

// In-memory fixtures need no build or network. Mutate source and export separately
// so stale build output cannot conceal regressions in either one.
function fixture() {
  const files = new Map();
  for (const name of ['lib/clarity.ts', 'components/Clarity.tsx', 'lib/pages/trust.ts', 'app/(en)/layout.tsx', 'app/(zh)/layout.tsx']) {
    files.set(name, readFileSync(new URL(`../${name}`, import.meta.url), 'utf8'));
  }
  const bundle = 'out/_next/static/chunks/clarity.js';
  files.set(bundle, `self.webpackChunk_N_E.push([[1],{1:function(module,exports){${transpile(files.get('lib/clarity.ts'))}}}]);`);
  for (const locale of ['', 'zh/']) {
    files.set(`out/${locale}index.html`, '<script src="/_next/static/chunks/clarity.js"></script>');
    files.set(`out/${locale}privacy/index.html`, 'Microsoft Clarity https://privacy.microsoft.com/privacystatement Consent Mode _clck _clsk');
  }
  return files;
}

test('valid fixture passes', () => checkClarity(fixture()));
for (const target of ['lib/clarity.ts', 'out/_next/static/chunks/clarity.js']) {
  test(`wrong ID fails in ${target}`, () => {
    const files = fixture();
    files.set(target, files.get(target).replaceAll('zbynruziy0', 'wrongid'));
    assert.throws(() => checkClarity(files), /project ID/);
  });
  test(`preview loading fails in ${target}`, () => {
    const files = fixture();
    files.set(target, files.get(target).replace('if (hostname !== "anglerescape.com"', 'if (!hostname.endsWith(".pages.dev") && hostname !== "anglerescape.com"'));
    assert.throws(() => checkClarity(files), /anglerescape\.pages\.dev: script count/);
  });
}
for (const locale of ['En', 'Zh']) {
  test(`${locale} missing source disclosure fails`, () => {
    const files = fixture();
    const source = files.get('lib/pages/trust.ts');
    const start = source.indexOf(`export const privacy${locale}`);
    files.set('lib/pages/trust.ts', source.slice(0, start) + source.slice(start).replace('Microsoft Clarity', 'Analytics'));
    assert.throws(() => checkClarity(files), /privacy source missing Microsoft Clarity/);
  });
}
for (const locale of ['', 'zh/']) {
  test(`${locale || 'en/'} missing exported disclosure fails`, () => {
    const files = fixture();
    files.set(`out/${locale}privacy/index.html`, 'No disclosure');
    assert.throws(() => checkClarity(files), /privacy export missing Microsoft Clarity/);
  });
}
for (const signal of ['window.clarity("consent", true);', 'window.clarity("consentv2", { analytics_Storage: "granted" });', 'window.clarity("consentv2", { analytics_Storage: "denied" });']) {
  test(`reject consent signal: ${signal}`, () => {
    const files = fixture();
    files.set('components/Clarity.tsx', files.get('components/Clarity.tsx') + `\n${signal}`);
    assert.throws(() => checkClarity(files), /consent signals are forbidden/);
  });
}
