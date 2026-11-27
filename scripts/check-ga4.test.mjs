import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { checkGA4, transpile } from './check-ga4.mjs';

// In-memory fixtures need no build or network
function fixture() {
  const files = new Map();
  const srcFiles = [
    'lib/analytics.ts',
    'lib/pages/trust.ts',
    'components/Analytics.tsx',
    'components/AnalyticsBanner.tsx',
    'components/SecondEscapeGame.tsx',
    'app/(en)/layout.tsx',
    'app/(zh)/layout.tsx',
  ];

  for (const name of srcFiles) {
    files.set(name, readFileSync(new URL(`../${name}`, import.meta.url), 'utf8'));
  }

  // Minimal privacy HTML exports
  for (const locale of ['', 'zh/']) {
    files.set(`out/${locale}privacy/index.html`,
      'Google Analytics G-LSSVCD4DEC _ga https://policies.google.com/privacy consent 同意');
  }

  // Sample HTML files to verify no gtag in output
  for (const locale of ['', 'zh/']) {
    files.set(`out/${locale}index.html`, '<html><body>No analytics script here</body></html>');
  }

  // Mock JS chunk with correct gtag stub pattern
  files.set('out/_next/static/chunks/app-layout-mock.js',
    'window.dataLayer=window.dataLayer||[],window.gtag=window.gtag||function(){window.dataLayer.push(arguments)},window.gtag("consent","default",{ad_storage:"denied"}),src="https://www.googletagmanager.com/gtag/js?id=G-LSSVCD4DEC"');

  return files;
}

test('valid fixture passes', () => checkGA4(fixture()));

test('wrong measurement ID fails', () => {
  const files = fixture();
  files.set('lib/analytics.ts',
    files.get('lib/analytics.ts').replaceAll('G-LSSVCD4DEC', 'G-WRONGID'));
  assert.throws(() => checkGA4(files), /measurement ID/);
});

test('gtag script in HTML fails', () => {
  const files = fixture();
  files.set('out/index.html',
    '<script src="https://www.googletagmanager.com/gtag/js?id=G-LSSVCD4DEC"></script>');
  assert.throws(() => checkGA4(files), /gtag script in HTML/);
});

test('preconnect to googletagmanager fails', () => {
  const files = fixture();
  files.set('app/(en)/layout.tsx',
    files.get('app/(en)/layout.tsx') + '\n// <link rel="preconnect" href="https://www.googletagmanager.com">');
  assert.throws(() => checkGA4(files), /must not preconnect/);
});

test('missing Analytics import in layout fails', () => {
  const files = fixture();
  files.set('app/(en)/layout.tsx',
    files.get('app/(en)/layout.tsx').replace(/import\s*\{[^}]*Analytics[^}]*\}[^;]*;/, ''));
  assert.throws(() => checkGA4(files), /missing Analytics import/);
});

test('missing Analytics component in layout fails', () => {
  const files = fixture();
  files.set('app/(zh)/layout.tsx',
    files.get('app/(zh)/layout.tsx').replace(/<Analytics[^>]*\/>/, ''));
  assert.throws(() => checkGA4(files), /missing Analytics component/);
});

test('privacy not updated to 2026-11-27 fails', () => {
  const files = fixture();
  files.set('lib/pages/trust.ts',
    files.get('lib/pages/trust.ts').replace('2026-11-27', '2026-11-11'));
  assert.throws(() => checkGA4(files), /not updated to 2026-11-27/);
});

test('missing GA4 disclosure in privacy source fails', () => {
  const files = fixture();
  files.set('lib/pages/trust.ts',
    files.get('lib/pages/trust.ts').replace(/Google Analytics/g, 'Analytics Tool'));
  assert.throws(() => checkGA4(files), /missing Google Analytics disclosure/);
});

test('missing measurement ID in privacy source fails', () => {
  const files = fixture();
  files.set('lib/pages/trust.ts',
    files.get('lib/pages/trust.ts').replace(/G-LSSVCD4DEC/g, ''));
  assert.throws(() => checkGA4(files), /missing measurement ID/);
});

test('missing Google privacy policy link fails', () => {
  const files = fixture();
  files.set('lib/pages/trust.ts',
    files.get('lib/pages/trust.ts').replace(/https:\/\/policies\.google\.com\/privacy/g, ''));
  assert.throws(() => checkGA4(files), /missing Google privacy policy link/);
});

test('missing game_start event fails', () => {
  const files = fixture();
  files.set('components/SecondEscapeGame.tsx',
    files.get('components/SecondEscapeGame.tsx').replace(/game_start/g, 'game_begin'));
  assert.throws(() => checkGA4(files), /missing game_start event/);
});

test('missing level_complete event fails', () => {
  const files = fixture();
  files.set('components/SecondEscapeGame.tsx',
    files.get('components/SecondEscapeGame.tsx').replace(/level_complete/g, 'level_win'));
  assert.throws(() => checkGA4(files), /missing level_complete event/);
});

test('missing game_over event with lose_reason fails', () => {
  const files = fixture();
  files.set('components/SecondEscapeGame.tsx',
    files.get('components/SecondEscapeGame.tsx').replace(/lose_reason/g, 'reason'));
  assert.throws(() => checkGA4(files), /missing game_over event with lose_reason/);
});

test('missing outbound_itch tracking fails', () => {
  const files = fixture();
  files.set('components/Analytics.tsx',
    files.get('components/Analytics.tsx').replace(/outbound_itch/g, 'click_link'));
  assert.throws(() => checkGA4(files), /missing outbound_itch event/);
});
