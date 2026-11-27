import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

const EXPECTED_ID = 'G-LSSVCD4DEC';
const EXPECTED_URL = `https://www.googletagmanager.com/gtag/js?id=${EXPECTED_ID}`;
const GOOGLE_POLICY_URL = 'https://policies.google.com/privacy';
const CONSENT_KEY = 'anglerescape:analytics-consent:v1';
const hosts = [
  ['anglerescape.com', true], ['www.anglerescape.com', true],
  ['localhost', false], ['127.0.0.1', false], ['::1', false],
  ['pages.dev', false], ['anglerescape.pages.dev', false],
  ['branch.anglerescape.pages.dev', false], ['example.com', false],
  ['anglerescape.com.example.com', false], ['evilanglerescape.com', false],
];

export function transpile(source) {
  return ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
}

function moduleContext(extra = {}) {
  const exports = {};
  return vm.createContext({ exports, module: { exports }, ...extra });
}

function assertNoPreconnect(source, name) {
  const forbidden = ['googletagmanager', 'google-analytics', 'gtag/js'];
  for (const pattern of forbidden) {
    assert(!source.includes(pattern) || source.includes(EXPECTED_ID),
      `${name}: must not preconnect/prefetch to ${pattern} before consent`);
  }
}

function assertNoGtagInHTML(htmlFiles) {
  for (const [name, html] of htmlFiles) {
    assert(!html.includes('googletagmanager.com'), `${name}: gtag script in HTML`);
    assert(!html.includes('gtag/js'), `${name}: gtag script in HTML`);
    // Measurement ID can appear in JS bundles, but not in script tags in HTML
    const scriptSrcMatch = html.match(/<script[^>]*src=[^>]*>/gi);
    if (scriptSrcMatch) {
      for (const tag of scriptSrcMatch) {
        assert(!tag.includes(EXPECTED_ID), `${name}: GA4 ID in script src tag in HTML`);
      }
    }
  }
}

// Execute the real loader and consent logic
function assertRuntime(makeLoader, makeConsent, label) {
  for (const [hostname, allowed] of hosts) {
    // Test: no consent - should not load
    {
      const scripts = [];
      const storage = new Map();
      const localStorage = {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
      };
      const window = {
        location: { hostname },
        dataLayer: [],
        gtag: undefined,
        localStorage,
      };
      const document = {
        cookie: '',
        querySelector: (selector) => scripts.find(s => selector === `script[src="${s.src}"]`) ?? null,
        createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
        head: { appendChild: script => scripts.push(script) },
      };

      const load = makeLoader({ window, document, localStorage });
      load(); // No consent yet
      assert.equal(scripts.length, 0, `${label}: ${hostname}: no consent should not load script`);
      assert.equal(typeof window.gtag, 'undefined', `${label}: ${hostname}: no consent should not init gtag`);
    }

    // Test: granted consent
    {
      const scripts = [];
      const storage = new Map([['anglerescape:analytics-consent:v1', 'granted']]);
      const localStorage = {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
      };
      const window = {
        location: { hostname },
        dataLayer: [],
        gtag: undefined,
        localStorage,
      };
      const document = {
        cookie: '',
        querySelector: (selector) => scripts.find(s => selector === `script[src="${s.src}"]`) ?? null,
        createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
        head: { appendChild: script => scripts.push(script) },
      };

      const load = makeLoader({ window, document, localStorage });
      load();

      if (allowed) {
        assert.equal(scripts.length, 1, `${label}: ${hostname}: granted consent should load script`);
        assert.equal(scripts[0].src, EXPECTED_URL, `${label}: ${hostname}: script URL / measurement ID`);
        assert.equal(scripts[0].async, true, `${label}: ${hostname}: async`);
        assert.equal(typeof window.gtag, 'function', `${label}: ${hostname}: gtag function`);

        // CRITICAL: dataLayer entries must be Arguments objects, not plain arrays
        assert(window.dataLayer.length > 0, `${label}: ${hostname}: dataLayer should have entries`);
        for (let i = 0; i < window.dataLayer.length; i++) {
          const entry = window.dataLayer[i];
          const isArguments = Object.prototype.toString.call(entry) === '[object Arguments]';
          assert(isArguments,
            `${label}: ${hostname}: dataLayer[${i}] must be Arguments object, got ${Object.prototype.toString.call(entry)}. ` +
            `This happens when gtag uses rest parameters (...args) instead of the official pattern: function gtag() { dataLayer.push(arguments); }`);
        }

        // Verify at least 'consent' and 'js' and 'config' commands are present
        const commands = window.dataLayer.map(entry => entry[0]);
        assert(commands.includes('consent'), `${label}: ${hostname}: dataLayer missing 'consent' command`);
        assert(commands.includes('js'), `${label}: ${hostname}: dataLayer missing 'js' command`);
        assert(commands.includes('config'), `${label}: ${hostname}: dataLayer missing 'config' command`);

        load(); // Duplicate call should not add another script
        assert.equal(scripts.length, 1, `${label}: ${hostname}: duplicate script`);
      } else {
        assert.equal(scripts.length, 0, `${label}: ${hostname}: preview should not load on non-production host`);
        assert.equal(typeof window.gtag, 'undefined', `${label}: ${hostname}: preview initializes gtag`);
      }
    }

    // Test: denied consent
    {
      const scripts = [];
      const storage = new Map([['anglerescape:analytics-consent:v1', 'denied']]);
      const localStorage = {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
      };
      const window = {
        location: { hostname },
        dataLayer: [],
        gtag: undefined,
        localStorage,
      };
      const document = {
        cookie: '',
        querySelector: (selector) => scripts.find(s => selector === `script[src="${s.src}"]`) ?? null,
        createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
        head: { appendChild: script => scripts.push(script) },
      };

      const load = makeLoader({ window, document, localStorage });
      load();
      assert.equal(scripts.length, 0, `${label}: ${hostname}: denied consent should not load script`);
    }
  }
}

function assertEventTracking(files) {
  const game = files.get('components/SecondEscapeGame.tsx');
  assert(game, 'Missing SecondEscapeGame.tsx');

  // Check for trackEvent import
  assert.match(game, /import\s*\{[^}]*trackEvent[^}]*\}\s*from\s*["']@\/lib\/analytics["']/,
    'SecondEscapeGame.tsx: missing trackEvent import');

  // Check for game_start event
  assert.match(game, /trackEvent\(\s*["']game_start["']/,
    'SecondEscapeGame.tsx: missing game_start event');

  // Check for level_complete event
  assert.match(game, /trackEvent\(\s*["']level_complete["']/,
    'SecondEscapeGame.tsx: missing level_complete event');

  // Check for game_over event with lose_reason
  assert.match(game, /trackEvent\(\s*["']game_over["'][^)]*lose_reason/,
    'SecondEscapeGame.tsx: missing game_over event with lose_reason');

  // Check for outbound_itch tracking in Analytics
  const analytics = files.get('components/Analytics.tsx');
  assert(analytics, 'Missing Analytics.tsx');
  assert.match(analytics, /outbound_itch/,
    'Analytics.tsx: missing outbound_itch event tracking');
  assert.match(analytics, /itch\.io/,
    'Analytics.tsx: missing itch.io link detection');
}

export function checkGA4(files) {
  const get = name => { assert(files.has(name), `Missing ${name}`); return files.get(name); };

  // Check measurement ID in source
  const loader = get('lib/analytics.ts');
  assert.match(loader, /G-LSSVCD4DEC/, 'Wrong or missing GA4 measurement ID');
  assert.match(loader, /CONSENT_STORAGE_KEY\s*=\s*["']anglerescape:analytics-consent:v1["']/,
    'Wrong consent storage key');

  // Check no preconnect in source files
  for (const [name, source] of files) {
    if (/^(app|components|lib)\/.*\.(tsx?|jsx?)$/.test(name)) {
      assertNoPreconnect(source, name);
    }
  }

  // Check HTML output has no gtag
  const htmlFiles = [...files].filter(([name]) => name.startsWith('out/') && name.endsWith('.html'));
  assertNoGtagInHTML(htmlFiles);

  // Check runtime behavior
  const compiled = transpile(loader);
  const sourceModule = moduleContext();
  vm.runInContext(compiled, sourceModule, { timeout: 1000 });
  assert.equal(sourceModule.exports.GA4_MEASUREMENT_ID, EXPECTED_ID, 'Wrong GA4 measurement ID in export');
  sourceModule.exports.loadGtag(); // SSR must be safe

  assertRuntime(globals => {
    const context = moduleContext(globals);
    vm.runInContext(compiled, context, { timeout: 1000 });
    return context.exports.loadGtag;
  }, null, 'source');

  // Check layouts include Analytics
  for (const locale of ['en', 'zh']) {
    const layout = get(`app/(${locale})/layout.tsx`);
    assert.match(layout, /import\s*\{[^}]*Analytics[^}]*\}\s*from\s*["']@\/components\/Analytics["']/,
      `${locale} layout: missing Analytics import`);
    const analyticsRegex = new RegExp(`<Analytics\\s+locale=["']${locale}["']\\s*\\/>`);
    assert.match(layout, analyticsRegex,
      `${locale} layout: missing Analytics component`);
  }

  // Check privacy policy disclosure
  const trust = get('lib/pages/trust.ts');
  assert.match(trust, /PRIVACY_UPDATED\s*=\s*["']2026-11-27["']/,
    'Privacy policy not updated to 2026-11-27');

  for (const locale of ['En', 'Zh']) {
    const privacyVar = `privacy${locale}`;
    const start = trust.indexOf(`export const ${privacyVar}`);
    assert(start >= 0, `Missing ${privacyVar}`);
    const content = trust.slice(start);

    // Check for GA4 disclosure
    assert.match(content, /Google Analytics/i,
      `privacy${locale} source missing Google Analytics disclosure`);
    assert.match(content, /G-LSSVCD4DEC/,
      `privacy${locale} source missing measurement ID`);
    assert.match(content, /_ga/,
      `privacy${locale} source missing _ga cookie disclosure`);

    // Check for consent banner mention
    assert.match(content, /consent|同意/i,
      `privacy${locale} source missing consent banner mention`);

    // Check for Google privacy policy link
    assert.match(content, /https:\/\/policies\.google\.com\/privacy/,
      `privacy${locale} source missing Google privacy policy link`);

    // Check for revoke instructions
    assert.match(content, /revoke|撤回|Analytics choices|分析选项/i,
      `privacy${locale} source missing revoke instructions`);
  }

  // Check exported privacy pages include disclosures
  for (const locale of ['', 'zh/']) {
    const html = get(`out/${locale}privacy/index.html`);
    assert.match(html, /Google Analytics/i,
      `privacy export ${locale || 'en/'} missing Google Analytics`);
    assert.match(html, /G-LSSVCD4DEC/,
      `privacy export ${locale || 'en/'} missing measurement ID`);
    assert.match(html, /https:\/\/policies\.google\.com\/privacy/,
      `privacy export ${locale || 'en/'} missing Google privacy policy link`);
  }

  // Check event tracking
  assertEventTracking(files);

  // Check build artifacts: scan out/_next/static/chunks for gtag queue implementation
  const chunks = [...files].filter(([name]) =>
    name.startsWith('out/_next/static/chunks/') &&
    name.endsWith('.js') &&
    files.get(name).includes('googletagmanager')
  );

  if (chunks.length === 0) {
    throw new Error('Build artifact check: no JS chunks contain googletagmanager. Run `npm run build` first.');
  }

  for (const [name, source] of chunks) {
    // CRITICAL: gtag stub must push `arguments`, not a plain array
    // Look for the dataLayer.push pattern
    if (!source.includes('dataLayer')) continue;

    // Required: must contain 'arguments' in the same chunk that has dataLayer.push
    // This is the primary check that the official pattern is present
    if (source.includes('dataLayer.push') && !source.includes('arguments')) {
      throw new Error(
        `${name}: chunk contains dataLayer.push but not 'arguments'. ` +
        `The gtag queue stub must use: function gtag() { dataLayer.push(arguments); }. ` +
        `Without 'arguments', gtag commands (js/config/event) will not work.`
      );
    }

    // Positive check: verify the correct pattern exists
    // Look for: dataLayer.push(arguments)
    if (!source.includes('dataLayer.push(arguments)')) {
      // Extract snippet for error message
      const match = source.match(/(.{0,100}dataLayer\.push.{0,100})/);
      const snippet = match ? match[0] : '';
      throw new Error(
        `${name}: gtag stub does not use the official pattern 'dataLayer.push(arguments)'. ` +
        `Snippet: ${snippet.substring(0, 200)}... ` +
        `The official pattern is: window.gtag = function gtag() { window.dataLayer.push(arguments); }. ` +
        `Rest parameters (...args) and arrow functions break gtag.js command processing.`
      );
    }
  }
}

// CLI mode: check the actual build
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outDir = new URL('../out/', import.meta.url).pathname;
  const srcFiles = ['lib/analytics.ts', 'lib/pages/trust.ts', 'components/Analytics.tsx',
                    'components/AnalyticsBanner.tsx', 'components/SecondEscapeGame.tsx',
                    'app/(en)/layout.tsx', 'app/(zh)/layout.tsx'];

  try {
    await readdir(outDir);
  } catch {
    console.error('Error: out/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const files = new Map();

  // Read source files
  for (const name of srcFiles) {
    const p = new URL(`../${name}`, import.meta.url).pathname;
    files.set(name, await readFile(p, 'utf8'));
  }

  // Read privacy HTML exports
  for (const locale of ['', 'zh/']) {
    const p = path.join(outDir, locale, 'privacy/index.html');
    files.set(`out/${locale}privacy/index.html`, await readFile(p, 'utf8'));
  }

  // Read all HTML files to check for gtag, and JS chunks for build artifact checks
  async function walkOutput(dir, base = '') {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const rel = path.join(base, ent.name);
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        await walkOutput(full, rel);
      } else if (ent.name.endsWith('.html')) {
        files.set(`out/${rel}`, await readFile(full, 'utf8'));
      } else if (ent.name.endsWith('.js') && rel.includes('_next/static/chunks')) {
        // Collect JS chunks for build artifact analysis
        files.set(`out/${rel}`, await readFile(full, 'utf8'));
      }
    }
  }
  await walkOutput(outDir);

  checkGA4(files);
  console.log('✓ GA4 checks passed');
}
