# GA4 Check Fault Injection Tests

This document records the fault injection tests performed to verify that `check:ga4` and `test:check-ga4` correctly detect GA4 integration errors.

## Test Methodology

Each test temporarily modifies source files or fixtures to introduce a specific fault, runs the check script, and verifies it exits with a non-zero code and the expected error message. The file is restored immediately after the test.

## Fault Injection Tests Performed

### 1. Wrong Measurement ID

**What**: Changed `G-LSSVCD4DEC` to `G-WRONGID` in `lib/analytics.ts`

**Expected**: Check fails with "measurement ID" error

**Result**: ✓ Test correctly detects wrong measurement ID

**Command**:
```bash
npm run test:check-ga4
```

### 2. gtag Script in HTML Output

**What**: Added `<script src="https://www.googletagmanager.com/gtag/js?id=G-LSSVCD4DEC">` to `out/index.html` fixture

**Expected**: Check fails with "gtag script in HTML" error

**Result**: ✓ Test correctly detects gtag in HTML output

### 3. Preconnect to googletagmanager Before Consent

**What**: Added preconnect comment to layout file

**Expected**: Check fails with "must not preconnect" error

**Result**: ✓ Test correctly detects unauthorized preconnect

### 4. Missing Analytics Import in Layout

**What**: Removed Analytics import from `app/(en)/layout.tsx`

**Expected**: Check fails with "missing Analytics import" error

**Result**: ✓ Test correctly detects missing import

### 5. Missing Analytics Component in Layout

**What**: Removed `<Analytics />` component from `app/(zh)/layout.tsx`

**Expected**: Check fails with "missing Analytics component" error

**Result**: ✓ Test correctly detects missing component

### 6. Privacy Policy Date Not Updated

**What**: Changed `PRIVACY_UPDATED` from `2026-11-27` to `2026-11-11`

**Expected**: Check fails with "not updated to 2026-11-27" error

**Result**: ✓ Test correctly detects outdated privacy date

### 7. Missing GA4 Disclosure in Privacy Policy

**What**: Changed "Google Analytics" to "Analytics Tool" in privacy source

**Expected**: Check fails with "missing Google Analytics disclosure" error

**Result**: ✓ Test correctly detects missing GA4 disclosure

### 8. Missing Measurement ID in Privacy Policy

**What**: Removed `G-LSSVCD4DEC` from privacy source

**Expected**: Check fails with "missing measurement ID" error

**Result**: ✓ Test correctly detects missing measurement ID

### 9. Missing Google Privacy Policy Link

**What**: Removed `https://policies.google.com/privacy` link

**Expected**: Check fails with "missing Google privacy policy link" error

**Result**: ✓ Test correctly detects missing policy link

### 10. Missing game_start Event

**What**: Changed `game_start` to `game_begin` in SecondEscapeGame.tsx

**Expected**: Check fails with "missing game_start event" error

**Result**: ✓ Test correctly detects missing game_start event

### 11. Missing level_complete Event

**What**: Changed `level_complete` to `level_win` in SecondEscapeGame.tsx

**Expected**: Check fails with "missing level_complete event" error

**Result**: ✓ Test correctly detects missing level_complete event

### 12. Missing game_over Event with lose_reason

**What**: Changed `lose_reason` parameter to `reason`

**Expected**: Check fails with "missing game_over event with lose_reason" error

**Result**: ✓ Test correctly detects missing lose_reason parameter

### 13. Missing outbound_itch Tracking

**What**: Changed `outbound_itch` to `click_link` in Analytics.tsx

**Expected**: Check fails with "missing outbound_itch event" error

**Result**: ✓ Test correctly detects missing itch.io tracking

## Runtime Behavior Tests

The check script also verifies runtime behavior using vm contexts:

1. **No Consent**: Verifies no gtag script is loaded when consent is not granted
2. **Granted Consent on Production**: Verifies gtag loads only on anglerescape.com and www.anglerescape.com
3. **Granted Consent on Preview**: Verifies gtag does NOT load on localhost, *.pages.dev, etc.
4. **Denied Consent**: Verifies no gtag script is loaded when consent is explicitly denied
5. **Duplicate Calls**: Verifies loadGtag() doesn't add duplicate scripts

### 14. gtag Stub Using Rest Parameters Instead of Arguments (2026-11-27)

**What**: Modified `lib/analytics.ts` to use rest parameters:
```typescript
window.gtag = window.gtag || function (...args: unknown[]) {
  window.dataLayer!.push(args);  // WRONG: pushes Array, not Arguments
};
```

**Why This is a Critical Bug**: gtag.js only processes commands when they are Arguments objects. When rest parameters are used, `args` becomes a plain Array, and gtag.js silently ignores all commands (`js`, `config`, `event`, `consent`). This breaks all GA4 tracking.

**Expected**: Check fails with runtime error about Arguments object

**Result**: ✓ Runtime check correctly detects the issue:
```
AssertionError: source: anglerescape.com: dataLayer[0] must be Arguments object, got [object Array]. 
This happens when gtag uses rest parameters (...args) instead of the official pattern: 
function gtag() { dataLayer.push(arguments); }
```

**Build Artifact Check**: Also added check for `out/_next/static/chunks/*.js` to verify compiled code contains `dataLayer.push(arguments)`, preventing minifiers from breaking the pattern.

**Command**:
```bash
# Inject fault
sed -i.bak 's/function gtag()/function (...args: unknown[])/; s/push(arguments)/push(args)/' lib/analytics.ts
npm run build
npm run check:ga4  # Fails with Arguments object error

# Restore
mv lib/analytics.ts.bak lib/analytics.ts
npm run build
npm run check:ga4  # Passes
```

**ESLint Configuration**: Added exception to `eslint.config.mjs` to allow `arguments` in `lib/analytics.ts` despite `prefer-rest-params` rule, with inline comment explaining why the official gtag pattern requires it.

## Conclusion

All fault injection tests pass, confirming that the GA4 checks correctly detect:
- Configuration errors (wrong IDs, preconnects)
- Integration errors (missing components, imports)
- Disclosure errors (privacy policy content)
- Event tracking errors (missing or incorrectly named events)
- Runtime errors (loading on wrong hosts, loading without consent)
- **Critical gtag queue implementation errors (rest parameters vs Arguments object)**

The checks provide comprehensive coverage of the GA4 consent-based integration requirements, including the subtle but critical requirement that gtag must use `arguments` (not rest parameters) to create a proper command queue.
