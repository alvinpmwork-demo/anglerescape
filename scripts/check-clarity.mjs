import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

const EXPECTED_ID = 'zbynruziy0';
const EXPECTED_URL = `https://www.clarity.ms/tag/${EXPECTED_ID}`;
const POLICY_URL = 'https://privacy.microsoft.com/privacystatement';
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

function assertNoConsent(source, name) {
  const ast = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isCallExpression(node) && node.arguments.length) {
      const first = node.arguments[0];
      assert(!ts.isStringLiteralLike(first) || !/^consent(v2)?$/i.test(first.text),
        `${name}: consent signals are forbidden (no CMP)`);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

// Execute the real loader, including the minified exported client component.
// No network requests: a small DOM records script insertion and queue calls.
function assertRuntime(makeLoader, label) {
  for (const [hostname, allowed] of hosts) {
    const scripts = [];
    const window = { location: { hostname } };
    const document = {
      querySelector: (selector) => scripts.find(s => selector === `script[src="${s.src}"]`) ?? null,
      createElement: (tag) => { assert.equal(tag, 'script'); return {}; },
      head: { appendChild: script => scripts.push(script) },
    };
    const load = makeLoader({ window, document });
    load();
    load();
    assert.equal(scripts.length, allowed ? 1 : 0, `${label}: ${hostname}: script count`);
    if (allowed) {
      assert.equal(scripts[0].src, EXPECTED_URL, `${label}: script URL / project ID`);
      assert.equal(scripts[0].async, true, `${label}: async`);
      assert.equal(typeof window.clarity, 'function', `${label}: official queue`);
      assert.equal(window.clarity.q?.length ?? 0, 0, `${label}: unexpected Clarity/consent call`);
      const queue = window.clarity;
      load();
      assert.equal(window.clarity, queue, `${label}: preserve existing queue`);
      assert.equal(scripts.length, 1, `${label}: duplicate tag`);
    } else {
      assert.equal(window.clarity, undefined, `${label}: preview initializes Clarity`);
    }
  }
}

export function checkClarity(files) {
  const get = name => { assert(files.has(name), `Missing ${name}`); return files.get(name); };
  const loader = get('lib/clarity.ts');
  const compiled = transpile(loader);
  const sourceModule = moduleContext();
  vm.runInContext(compiled, sourceModule, { timeout: 1000 });
  assert.equal(sourceModule.exports.CLARITY_PROJECT_ID, EXPECTED_ID, 'Wrong Clarity project ID');
  sourceModule.exports.loadClarity(); // SSR must be safe.
  assertRuntime(globals => {
    const context = moduleContext(globals);
    vm.runInContext(compiled, context, { timeout: 1000 });
    return context.exports.loadClarity;
  }, 'source');

  for (const [name, source] of files) {
    if (/^(app|components|lib)\/.*\.(tsx?|jsx?)$/.test(name)) assertNoConsent(source, name);
  }
  const component = get('components/Clarity.tsx');
  assert.match(component, /["']use client["']/);
  assert.match(component, /useEffect/);
  assert.match(component, /loadClarity\(\)/);
  for (const locale of ['en', 'zh']) {
    const layout = get(`app/(${locale})/layout.tsx`);
    assert.match(layout, /import\s*\{\s*Clarity\s*\}\s*from\s*["']@\/components\/Clarity["']/);
    assert.match(layout, /<Clarity\s*\/>/);
  }

  const trust = moduleContext();
  vm.runInContext(transpile(get('lib/pages/trust.ts')), trust, { timeout: 1000 });
  for (const [locale, privacy] of [['en', trust.exports.privacyEn], ['zh', trust.exports.privacyZh]]) {
    const disclosure = JSON.stringify(privacy.sections);
    for (const required of ['Microsoft Clarity', POLICY_URL, 'Consent Mode', '_clck', '_clsk']) {
      assert(disclosure.includes(required), `${locale} privacy source missing ${required}`);
    }
    const html = get(`out/${locale === 'zh' ? 'zh/' : ''}privacy/index.html`);
    for (const required of ['Microsoft Clarity', POLICY_URL, 'Consent Mode', '_clck', '_clsk']) {
      assert(html.includes(required), `${locale} privacy export missing ${required}`);
    }
  }

  const bundles = [...files].filter(([name, source]) => name.startsWith('out/') && name.endsWith('.js') && source.includes('clarity.ms/tag/'));
  assert(bundles.length, 'Export missing Clarity client bundle; run npm run build first');
  for (const [name, source] of bundles) {
    assert(source.includes(EXPECTED_ID), `${name}: wrong/missing exported project ID`);
    assert(source.includes('anglerescape.com') && source.includes('www.anglerescape.com'), `${name}: missing production hosts`);
    assertNoConsent(source, name);
    assertRuntime(globals => {
      const context = moduleContext({ ...globals, self: { webpackChunk_N_E: [] } });
      vm.runInContext(source, context, { timeout: 1000 });
      const factories = context.self.webpackChunk_N_E.flatMap(chunk => Object.values(chunk[1]));
      const factory = factories.find(fn => fn.toString().includes('clarity.ms/tag/'));
      assert(factory, `${name}: Clarity module missing`);
      const exports = {};
      const require = () => ({ useEffect: callback => callback() });
      require.d = (target, getters) => {
        for (const [key, get] of Object.entries(getters)) Object.defineProperty(target, key, { get });
      };
      factory({ exports }, exports, require);
      const entry = exports.Clarity ?? exports.loadClarity;
      assert.equal(typeof entry, 'function', `${name}: Clarity entry missing`);
      return entry;
    }, name);
  }
  for (const locale of ['en', 'zh']) {
    const html = get(`out/${locale === 'zh' ? 'zh/' : ''}index.html`);
    assert(bundles.some(([name]) => html.includes(name.slice(3))), `${locale}: Clarity bundle not linked`);
  }
  for (const [name, html] of files) {
    if (name.startsWith('out/') && name.endsWith('.html')) {
      assert(!/<script\b[^>]*\bsrc=["'][^"']*clarity\.ms\/tag\//i.test(html), `${name}: unguarded remote tag in HTML`);
    }
  }
}

export async function collectFiles(root = process.cwd()) {
  const files = new Map();
  async function walk(dir) {
    for (const entry of await readdir(path.join(root, dir), { withFileTypes: true })) {
      const name = `${dir}/${entry.name}`;
      if (entry.isDirectory()) await walk(name);
      else if (/\.(tsx?|jsx?|html)$/.test(name)) files.set(name, await readFile(path.join(root, name), 'utf8'));
    }
  }
  for (const dir of ['app', 'components', 'lib', 'out']) await walk(dir);
  return files;
}

// This checks the absence of consent signals, not the project's remote settings.
// Outside EEA/UK/CH, cookies may still be set unless Consent Mode is enabled:
// reviewer must decide whether to turn OFF default cookies in Settings → Setup.
// https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    checkClarity(await collectFiles());
    console.log('Clarity checks passed: source + exported runtime hosts, async URL, deduplication, EN/ZH disclosure, no consent signals.');
    console.log('Review required: no CMP; global cookie behavior depends on Clarity Settings → Setup / Consent Mode.');
  } catch (error) {
    console.error(`Clarity check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
