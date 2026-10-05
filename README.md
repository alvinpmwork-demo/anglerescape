# Angler Escape / 钓鱼佬大逃亡

Fast-launch marketing + play shell for **Angler Escape** (EN) and **钓鱼佬大逃亡** (ZH).

Built with **Next.js 15 App Router** + **TypeScript**.

## Routes

| Locale | Path | Page |
|--------|------|------|
| EN | `/` | Homepage |
| EN | `/play/second-escape/` | Second Escape |
| ZH | `/zh/` | 首页 |
| ZH | `/zh/play/second-escape/` | 二次逃脱 |

Copy source: `/workspace/seo/钓鱼佬_首页与二次逃脱_完整正文.md` (mirrored into `lib/content.ts`).

## Local development

```bash
cd /workspace/anglerescape
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy: Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com): **Add New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` · Output: default (`.next`).
5. Root directory: repo root (this folder).
6. Deploy. Add domains under **Project → Settings → Domains**:
   - `anglerescape.com` (+ `www` if desired)
   - `diaoyulaoescape.com` (+ `www` if desired)

Vercel will give you DNS records (usually `A` / `CNAME`). Point the domains there first; redirects can be added after the site is live.

Optional `vercel.json` redirect for the Chinese domain (add when ready):

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "diaoyulaoescape.com" }],
      "destination": "https://anglerescape.com/zh/:path*",
      "permanent": false
    },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.diaoyulaoescape.com" }],
      "destination": "https://anglerescape.com/zh/:path*",
      "permanent": false
    }
  ]
}
```

Or use Vercel Domains UI → domain → Redirect to `https://anglerescape.com/zh`.

## Deploy: Cloudflare Pages

Next.js on Cloudflare Pages works best with the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare) (`@opennextjs/cloudflare`) or Cloudflare’s Next.js support.

**Simple static-export path (if you later drop server features):**

```bash
# only if you switch next.config to output: 'export'
npx wrangler pages deploy out
```

**Recommended (SSR / App Router):**

1. Install adapter when you are ready for CF production:
   ```bash
   npm install -D @opennextjs/cloudflare wrangler
   ```
2. Follow OpenNext Cloudflare docs to add `wrangler.toml` / `open-next.config.ts`.
3. In Cloudflare dashboard → **Workers & Pages** → Create → Connect git repo.
4. Build command (typical OpenNext): `npx opennextjs-cloudflare build`
5. Deploy command / output per current OpenNext Cloudflare docs.
6. Attach custom domains: `anglerescape.com`, `diaoyulaoescape.com`.

Until the adapter is wired, **Vercel is the fastest path** for this App Router site.

### Cloudflare DNS redirect (Chinese domain → `/zh`)

When `diaoyulaoescape.com` should land on Chinese pages:

1. Add both domains in Cloudflare (same Pages/Worker project or proxied DNS).
2. **Rules → Redirect Rules** (or Bulk Redirects):

   - If hostname equals `diaoyulaoescape.com`  
     → Dynamic redirect to `concat("https://anglerescape.com/zh", http.request.uri.path)`  
     (or static `https://anglerescape.com/zh/` for apex-only).
   - Same for `www.diaoyulaoescape.com`.

3. Keep `anglerescape.com` as the primary EN + shared host (`/zh/` lives on the same site).

## DNS notes (user action)

Domains to configure:

| Domain | Intended role | Next step |
|--------|---------------|-----------|
| `anglerescape.com` | Primary site (EN at `/`, ZH at `/zh/`) | Point DNS to Vercel or Cloudflare Pages; enable HTTPS |
| `www.anglerescape.com` | Optional www | CNAME to apex / platform www target; redirect www→apex or vice versa |
| `diaoyulaoescape.com` | Chinese vanity domain | Point DNS to same project; **later** redirect all traffic → `https://anglerescape.com/zh/` (and preserve path if needed) |
| `www.diaoyulaoescape.com` | Optional www | Same redirect target as apex Chinese domain |

Suggested order:

1. Deploy the app once (Vercel recommended for day one).
2. Attach `anglerescape.com` and verify `/`, `/zh/`, `/play/second-escape/`, `/sitemap.xml`, `/robots.txt`.
3. Attach `diaoyulaoescape.com` to the same deployment.
4. Add host-based redirect: `diaoyulaoescape.com` → `https://anglerescape.com/zh/` (do this after both domains resolve).
5. Submit `https://anglerescape.com/sitemap.xml` in Google Search Console / Bing Webmaster (and a ZH property if you use separate GSC properties).

## SEO included

- Per-page `title` + `meta description`
- `hreflang` via `alternates.languages` (`en`, `zh-CN`, `x-default`)
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- FAQPage JSON-LD on all four pages

## Disclaimer

Site and game copy are pure fiction casual entertainment. No real-world illegal fishing, poaching, or escape advice.
