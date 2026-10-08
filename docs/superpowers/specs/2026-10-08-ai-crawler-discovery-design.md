# AI crawler discovery for Angler Escape

## Goal and scope

Make the existing English and Chinese pages on `https://anglerescape.com` easier for AI agents to discover and understand. Cover the 26 indexable URLs already listed in `/sitemap.xml` (13 English routes and their `/zh/` counterparts). This work does not change page copy, navigation, game behavior, or hosting configuration.

## Existing baseline

- `/robots.txt` currently contains `User-Agent: *` and `Allow: /`, plus the sitemap URL.
- `/sitemap.xml` returns valid XML with all 26 localized URLs.
- All 26 sampled live URLs return 200 and have a title, H1, main content, canonical link, and JSON-LD in the initial HTML. The shared templates already emit `WebSite`, `VideoGame`, `Article`/`CollectionPage`/`WebPage`, `BreadcrumbList`, and visible FAQ data as applicable.
- `/llms.txt` currently returns 404.

## Design

1. Add a root `/llms.txt` Markdown index with a short factual description of the fictional browser game. Group concise links to all 13 English pages and all 13 Chinese pages by purpose. Use absolute canonical URLs and explain that `/zh/` is the Chinese version. Include the sitemap link for the full machine-readable URL inventory.
2. Use the existing static export path for the file, so the build produces `out/llms.txt` without a new runtime service or dependency.
3. Audit the generated HTML for every sitemap URL. If a page lacks a meaningful title, H1, canonical, initial body text, or applicable JSON-LD, repair that specific gap in the existing shared template or page data. Do not add duplicate schema merely to increase schema count.
4. Keep the current wildcard crawler rule unless verification finds a restriction. `llms.txt` is a content guide, not a crawler permission mechanism.

## Verification

- Run lint and production build; confirm `out/llms.txt` is present and contains exactly the 26 canonical page links, with no missing or broken page URLs.
- Inspect the generated HTML for each sitemap URL for title, H1, canonical, visible main content, and parseable JSON-LD.
- After the GitHub change is deployed, request `/llms.txt`, `/robots.txt`, `/sitemap.xml`, and representative English and Chinese pages with ordinary, GPTBot, OAI-SearchBot, ClaudeBot, and Claude-SearchBot user agents. Confirm successful responses and useful initial HTML. This verifies public access, not that a provider has crawled or indexed the site.

## Boundaries

The site owner has asked to allow the named bots. Their actual visits, indexing, and inclusion in AI answers depend on each provider and are not guaranteed by these files. No Search Console, analytics, or provider crawl logs are available in this task to prove those later outcomes.
