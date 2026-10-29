# Angler Escape / 钓鱼佬大逃亡交接

更新时间：2026-10-29。工作区在编写本文前为干净状态，无需 WIP 分支。

## 项目概况

- 目标：用可直接试玩的“钓鱼佬大逃亡”轻量游戏和双语内容获取自然流量，并为后续完整游戏/Steam 产品验证需求。
- 目标用户：喜欢短局潜行喜剧、钓鱼梗、网页小游戏的中英文玩家。
- 仓库地址：https://github.com/alvinpmwork-demo/anglerescape （公开，默认分支 `main`）。
- 线上地址：https://anglerescape.com；中文入口 `/zh/`。
- 技术栈：Next.js 15 App Router、React 19、TypeScript、Tailwind CSS 4、静态导出；Cloudflare Pages。

## 当前状态

- 首页和独立页均可玩 Second Escape，支持键盘、WASD 和移动端方向键；完整四幕玩法的第 4 幕可用。
- 已有中英首页、玩法、关卡、角色、梗、相似游戏、钓鱼游戏聚合、隐私/联系/免责声明等 43 个静态路由。
- 已配置 title/description、hreflang、JSON-LD、sitemap、robots、`llms.txt` 与 AI 抓取说明。
- 最近一次改动为增加 AdSense 所有权验证（`f7d00af`）；此前增加 `/fishing-games/` 和中英 SEO 内容。
- 2026-10-29 复验：`npm run lint` 无错误、1 个 Hook 警告；`npm run build` 成功导出全部 43 页，正式站可访问。

## 未完成任务

1. **P0：完成四幕核心游戏。** 目前仅 Second Escape（第 4 幕）可玩，第 1–3 幕仍是页面文案。剩余潜入、钓鱼、暴露、第一次逃跑及与第 4 幕的状态衔接。验收：桌面/移动端均可从开局跑完整回合，失败/重试/分享可用，页面不再把未实现玩法写成已上线。
2. **P1：完成 AdSense 商业化验证。** 所有权和 `ads.txt` 已配置并提交审核，但后台曾仍为“正在准备”、自动广告关闭、无展示/收入。验收：后台明确批准，隐私与布局合规，生产出现可控广告位并有非零测试展示；付款资料完整。
3. **P2：配置中文独立域名与数据闭环。** README 中 `diaoyulaoescape.com` 仍是待配置方案。验收：域名与 `www` 正确跳转到 `/zh/` 并保留路径，HTTPS、canonical、sitemap 和 Search Console 属性一致；记录基本试玩完成率/分享率。

## 已知问题

- `components/SecondEscapeGame.tsx:346` 报 `react-hooks/exhaustive-deps`：`useCallback` 的 `spritesReady` 依赖不必要；构建不失败，尚未修改以免误改游戏初始化时序。
- 首页明确写着完整 heist 的 Acts 1–3 “in development”；不要把现有试玩描述成完整游戏。
- AdSense 验证/审核提交不等于广告已投放或可收款；历史报告为 0 流量、0 展示、0 收入。
- 静态构建成功不能替代真实手机触控、低性能设备、键盘焦点和游戏完成率测试。

## 关键决策

- 先把可玩的 Second Escape 放首屏，用真实试玩验证需求；未完成内容保持“开发中”标记。
- 游戏和文案均明确为虚构喜剧，不提供现实非法捕鱼、逃避检查或偷猎建议。
- 采用静态导出和 Cloudflare Pages，放弃依赖常驻 Next.js 服务端能力，降低运维成本。
- 英文主域 + `/zh/` 中文路径，独立中文域仅作跳转；canonical 仍以主域为准。
- 内容与游戏同站，SEO 页必须内链回真实试玩，避免纯内容农场式扩张。

## 运行与部署

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
# 静态部署（已配置 Wrangler 时）
npx wrangler pages deploy out
```

Cloudflare Pages：构建命令 `npm run build`，输出目录 `out`，根目录 `/`；可选环境变量名 `NODE_VERSION`。当前应用代码无必需运行时密钥。

## 外部依赖

- Cloudflare Pages/DNS：静态站与自定义域名，配置在 Workers & Pages 项目及 DNS/Redirect Rules。
- Google AdSense：公开 meta/`ads.txt` 在仓库，审核、自动广告和付款资料在 AdSense 后台。
- Google Search Console / Bing Webmaster：提交 sitemap 和检查索引，配置不在仓库。
- GitHub `alvinpmwork-demo`：源码远端；推送时需使用该账号的写权限。

## 下一步

先从 `components/SecondEscapeGame.tsx` 和 `lib/content.ts` 画出当前第 4 幕状态机，再在独立 feature 分支实现第 1 幕“潜入”最小可玩切片；执行 `npm run lint && npm run build`，并用手机触控与桌面键盘各完成一局后再扩展第 2–3 幕。
