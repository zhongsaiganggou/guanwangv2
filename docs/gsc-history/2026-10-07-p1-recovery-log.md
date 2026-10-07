# GSC 404 P1 Recovery Log — 2026-10-07

> 对应基线：`404-baseline-2026-10-07.md`（266 条，P1=7 / P2=42 / P3=217）
> 本轮目标：恢复高价值历史信号，保持语言/意图，避免批量 301。
> 状态：PREVIEW READY（未部署 Production）

## 执行摘要

实测当前 Production 后确认：P1 7 条中 **6 条已由既有规则正确承接**（Lead Stop-Loss / SEO Growth Sprint / `_routes.js` 归一化已覆盖），**本轮实际新增 2 条精确规则**（middleware EXACT Map），解决 1 条泛化回退 + 1 条裸 404。

## 新增规则（functions/_middleware.js）

| Old URL | Action | Target | Reason |
|---|---|---|---|
| /blog/how-to-choose-steel-structure-manufacturer-china.html（含无尾斜杠变体） | 精确 301 | /en/blog/how-to-choose-steel-structure-manufacturer-china/ | 无语言前缀旧博客 → EN 同 slug 文章（官方 legacy，语言默认 EN）；此前被 `_redirects` `/blog/*.html → /en/resources/` 泛化承接，非精确 |
| /solutions | 精确 301 | /en/solutions/ | 无语言前缀旧根页 → EN 等价页（ROUTES 真实路由）；此前 404 |

Historical signal：两条均来自 GSC 2026-10-07 404 导出（last_crawled 2026-08-29 ~ 10-05）；/blog/how-to-choose-steel-structure-manufacturer-china 为 2026-09 基线即存在的 P1 项（STILL）。

## P1 7 条最终映射（实测 Production）

| # | Old URL | 实测状态 | Target | Intent | Language | 处理 |
|---|---|---|---|---|---|---|
| 1 | /en/blog/steel-workshop-cost-factory-building-price.html | 301 ✅ | /en/blog/steel-workshop-cost-factory-building-price/ | 同页 .html 归一化 | EN→EN | 既有（ROUTES 归一化），无需新增 |
| 2 | /blog/how-to-choose-steel-structure-manufacturer-china.html | 301（泛化）→ **本轮改为精确** | /en/blog/how-to-choose-steel-structure-manufacturer-china/ | 供应商选择 | 无前缀→EN | **本轮新增 EXACT** |
| 3 | /zh/blog/steel-structure-vs-concrete-comparison | 301 ✅ | /zh/resources/ | 跨语言 HOLD | ZH→EN 需批准 | 保持现状，不动 |
| 4 | /zh/blog/how-to-import-steel-structure-from-china-to-africa | 301 ✅ | /zh/resources/ | 跨语言 HOLD | ZH→EN 需批准 | 保持现状，不动 |
| 5 | /services/structural-steel-detailing.html | 301 ✅ | /en/services/structural-steel-detailing/ | 服务页同语义 | EN→EN | 既有 EXACT，无需新增 |
| 6 | /en/zh/products.html | 301 ✅ | /en/products/ | 畸形折叠去 zh | EN→EN | 既有（ROUTES/PATTERNS），无需新增 |
| 7 | /en/zh/projects.html | 301 ✅ | /en/projects/ | 畸形折叠去 zh | EN→EN | 既有，无需新增 |

## Cost URL override（明确批准）

/zh/blog/steel-workshop-cost-factory-building-price
→ **已由 EXACT 规则承接**：/zh/blog/gangjiegou-changfang-zaojia-zhinan/
（ZH→ZH，实测 301 ✅，尾斜杠/.html 变体经 norm 后同 key 命中，无需重复添加）

## Prefixless root verdict

| URL | 判定 | 结果 |
|---|---|---|
| /about | official legacy + exact equivalent | 既有 301 → /en/about/ ✅ |
| /contact | official legacy + exact equivalent | 既有 301 → /en/contact/ ✅ |
| /projects | official legacy + exact equivalent | 既有 301 → /en/projects/ ✅ |
| /solutions | official legacy + exact equivalent | **本轮新增 301 → /en/solutions/** |
| /faq | official legacy + exact equivalent | 既有 301 → /en/faq/ ✅ |
| /terms | official legacy + exact equivalent | 既有 301 → /en/terms/ ✅ |

## Redirect ownership

- 权威规则：`functions/_middleware.js` EXACT Map（middleware 先于 `_redirects` 执行）
- 本轮全部新增/修改均落在 middleware EXACT，单一 ownership
- 无 duplicate / conflict / chain / loop；SHADOWED_WRONG_TARGET = 0

## Query parameter handling

- middleware 以 `url.pathname` 匹配，query 不参与规则 key
- /en/contact.html?source=factory 与 ?source=export 由同一 /en/contact.html 规则承接（实测均 301 → /en/contact/），未建重复规则

## 验证

- `npm run build`：PASS（196 pages / 195 routes）
- `npm run seo:check`：PASS（sitemap 168 loc，dangling alternates=0，SHADOWED_WRONG_TARGET=0）
- HTTP QA：新增 2 条规则待 Preview 复测（见部署后 curl 结果）

## 保持现状 / 不做

- 跨语言 ZH→EN（/zh/blog/steel-structure-vs-concrete-comparison、/zh/blog/how-to-import-steel-structure-from-china-to-africa、/zh/markets/saudi-arabia/ 等）：HOLD
- P2 42 条：仅报告，不执行
- P3 217 条：保持 404
