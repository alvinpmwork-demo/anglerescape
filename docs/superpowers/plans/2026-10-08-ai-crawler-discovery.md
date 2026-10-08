# AI Crawler Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a concise `/llms.txt` covering every existing English and Chinese page on anglerescape.com, and verify the pages remain machine-readable.

**Architecture:** Add one static Markdown file under `public/`, which Next.js exports to the site root. Reuse the existing sitemap, robots rules, semantic HTML, and JSON-LD because live inspection found those present on all 26 pages. Change shared page code only if generated-page verification identifies a specific defect.

**Tech Stack:** Next.js 15 static export, TypeScript, Node.js, Cloudflare Pages.

---

## File map

- Create `public/llms.txt`: bilingual, factual link index of the 26 canonical page URLs.
- Leave `app/robots.ts`, `app/sitemap.ts`, and `lib/schema.ts` unchanged unless verification identifies a missing or incorrect crawler signal.

### Task 1: Add the root content index

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Create the file** with a single H1, a short blockquote, and these grouped absolute links. Keep the link text and summaries aligned with the actual pages.

```markdown
# Angler Escape / 钓鱼佬大逃亡

> Angler Escape is a free bilingual browser game about a fictional angler, a watchful Inspector, and a second chance to escape. The English pages are at the site root; Chinese versions are under /zh/. The story is cartoon fiction, not real-world fishing or evasion advice.

This index covers the public English and Chinese pages. The complete URL list is also available in the [XML sitemap](https://anglerescape.com/sitemap.xml).

## English: game and play

- [Home](https://anglerescape.com/): Game premise, four-act loop, controls, and FAQ.
- [Play](https://anglerescape.com/play/): Browser play hub and ways to start the game.
- [Second Escape](https://anglerescape.com/play/second-escape/): Playable second-chance escape mode and its rules.

## English: guides and world

- [Escape guide](https://anglerescape.com/guides/how-to-escape-inspector/): In-game tips for avoiding the fictional Inspector.
- [Levels](https://anglerescape.com/levels/): Level overview and walkthrough links.
- [Park Pond](https://anglerescape.com/levels/01-park-pond/): First-level walkthrough.
- [Reservoir Night](https://anglerescape.com/levels/02-reservoir-night/): Second-level walkthrough.
- [City Canal](https://anglerescape.com/levels/03-city-canal/): Third-level walkthrough.
- [Characters](https://anglerescape.com/characters/): Angler and Inspector character profiles.

## English: context

- [Fishing guy meme](https://anglerescape.com/meme/fishing-guy-meme/): Explanation of the game's fishing-guy meme.
- [Similar games](https://anglerescape.com/similar-games/): Related casual and stealth games.
- [Angler Escape vs unBAITable](https://anglerescape.com/vs/unbaitable/): Comparison of two fishing-themed games.
- [Fishing rules disclaimer](https://anglerescape.com/about/fishing-rules-disclaimer/): Fictional-game context and real-world fishing reminder.

## 中文：游戏与试玩

- [首页](https://anglerescape.com/zh/): 游戏设定、四幕循环、操作与常见问题。
- [开始玩](https://anglerescape.com/zh/play/): 浏览器试玩入口与玩法说明。
- [二次逃脱](https://anglerescape.com/zh/play/second-escape/): 可玩的二次逃脱模式与规则。

## 中文：攻略与世界观

- [甩掉巡查员攻略](https://anglerescape.com/zh/guides/how-to-escape-inspector/): 虚构游戏内的躲避技巧。
- [关卡总览](https://anglerescape.com/zh/levels/): 关卡介绍与攻略入口。
- [公园池塘](https://anglerescape.com/zh/levels/01-park-pond/): 第一关攻略。
- [水库夜钓](https://anglerescape.com/zh/levels/02-reservoir-night/): 第二关攻略。
- [城市河道](https://anglerescape.com/zh/levels/03-city-canal/): 第三关攻略。
- [角色介绍](https://anglerescape.com/zh/characters/): 钓鱼佬与巡查员角色设定。

## 中文：背景信息

- [钓鱼佬梗](https://anglerescape.com/zh/meme/fishing-guy-meme/): 游戏中钓鱼佬梗的解释。
- [类似游戏](https://anglerescape.com/zh/similar-games/): 相关休闲与潜行游戏。
- [钓鱼佬大逃亡与 unBAITable 对比](https://anglerescape.com/zh/vs/unbaitable/): 两款钓鱼主题游戏的比较。
- [免责声明与钓鱼规定](https://anglerescape.com/zh/about/fishing-rules-disclaimer/): 虚构游戏声明与现实钓鱼提醒。
```

- [ ] **Step 2: Check the link count.** Run `rg -c '^- \[[^]]+\]\(https://anglerescape\.com/[^)]*\):' public/llms.txt`. Expect `26`.
- [ ] **Step 3: Commit** with `git add public/llms.txt && git commit -m "feat: add bilingual llms index"`. Expect a commit changing only `public/llms.txt`.

### Task 2: Verify export and public access

**Files:**
- Inspect: `out/llms.txt`, generated page HTML, `/robots.txt`, `/sitemap.xml`

- [ ] **Step 1: Run** `npm ci`, `npm run lint`, `npm run build`, and `test -f out/llms.txt`. Expect all to exit successfully.
- [ ] **Step 2: Compare URL sets** using this read-only command. Expect `26 URLs match`.

```bash
node <<'NODE'
const fs = require('node:fs');
const index = fs.readFileSync('out/llms.txt', 'utf8');
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
const links = [...index.matchAll(/^- \[[^\]]+\]\((https:\/\/anglerescape\.com\/[^)]+)\):/gm)].map(x => x[1]);
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
if (links.length !== 26 || new Set(links).size !== 26 || JSON.stringify([...links].sort()) !== JSON.stringify([...urls].sort())) process.exit(1);
console.log('26 URLs match');
NODE
```

- [ ] **Step 3: Inspect every generated page**. For each `<loc>` URL in `out/sitemap.xml`, map the URL pathname to `out/<pathname>/index.html` (homepage: `out/index.html`), then check for a title, H1, matching canonical, visible `<main>` content, and JSON-parseable `application/ld+json` scripts. Confirm `out/robots.txt` has `Allow: /` and points at the sitemap. Expect 26 passing pages and no crawler restriction. Any failure calls for a targeted fix and rerun of the build.
- [ ] **Step 4: Publish the verified GitHub change** by pushing the branch, opening a PR, and merging it after checks pass. Confirm the public `/llms.txt` returns 200 with the expected Markdown content.
- [ ] **Step 5: Probe representative English and Chinese pages** with ordinary, GPTBot, OAI-SearchBot, ClaudeBot, and Claude-SearchBot user agents. Expect 200 and meaningful initial HTML. Do not report provider indexing or actual crawler visits without provider logs or webmaster-tool evidence.

## Review checklist

- [ ] Every `llms.txt` link resolves to a real canonical page and no sitemap page is omitted.
- [ ] No inaccurate new game claims, duplicate schema, or unrelated code edits.
- [ ] Git diff contains only the approved index and planning documents unless a concrete verification defect required a targeted fix.
