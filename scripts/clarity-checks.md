# Clarity checks and review notes

Run in the same order as CI:

```sh
npm ci
npm run build
npm run check:clarity
npm run test:check-clarity
```

`check:clarity` requires `out/`. It executes both the TypeScript loader and the
exported, minified webpack client module against a simulated browser DOM. This
checks the complete resolved URL `https://www.clarity.ms/tag/zbynruziy0` even when
the bundler represents it as concatenated strings. It also checks async loading,
deduplication, exact production hosts, both layouts' inclusion, both exported
homepages' bundle references, and EN/ZH source and exported privacy disclosures.
The host cases include localhost, 127.0.0.1, IPv6 loopback, nested *.pages.dev
previews, unrelated domains, and lookalikes. Source and Clarity bundles are
checked for consent API calls; initialization must leave the queue empty.

`test:check-clarity` uses in-memory fixtures, without a build or network. It must
reject incorrect IDs and preview loading in both source and exported code,
missing EN/ZH disclosures in source and HTML, and consent signals (including a
fabricated denied signal). The DOM simulation does not fetch Microsoft's script
or establish what the remote service actually collects.

## Consent review

There is no consent banner/CMP. The integration loads Clarity without sending
consent grants or denied signals. This is the requested default no-cookie /
no-consent integration, **not a guarantee of cookie-free operation globally**.
Microsoft documents that Consent Mode defaults on for EEA/UK/CH; elsewhere,
cookies may still be set if the project has not enabled Consent Mode.

Claude Code / the reviewer must decide whether to turn OFF default cookies in
Clarity **Settings → Setup** (enable Consent Mode). No dashboard, Cloudflare, or
domain settings were changed. The checker cannot inspect the Clarity dashboard.

- [Microsoft Consent Mode documentation](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode)
- [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement)

## Actual fault-injection record (2026-11-11)

The real `lib/clarity.ts` was temporarily edited, and `npm run check:clarity` was
run against each change, with existing build output left in place:

1. Replaced project ID `zbynruziy0` with `wrongid`: exit **1**, reported
   `Clarity check failed: Wrong Clarity project ID`.
2. Changed the hostname guard to let `hostname.endsWith(".pages.dev")` pass:
   exit **1**, reported
   `Clarity check failed: source: anglerescape.pages.dev: script count` (`1 !== 0`).

Each edit was restored immediately; restoration was verified against the
original source. The fault-injection driver used `finally` to restore the file
also on unexpected failure. The final build and both checks were then rerun.

Local environment: Node 24.22.1 / npm 11.21.1. CI explicitly uses Node 20, matching
the README Cloudflare `NODE_VERSION=20` setting. `npm ci` reported 8 dependency
vulnerabilities (6 moderate, 1 high, 1 critical); no dependency versions were
changed in this scoped integration. The build reports an existing
`react-hooks/exhaustive-deps` warning in `components/SecondEscapeGame.tsx`.
