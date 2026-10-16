# GSC / GA4 人工导出步骤（ZhongSai）— 2026-10-12

> 用途：补齐 `docs/seo-geo-data/SEO_GEO_DATA_BASELINE_PRODUCTION.md` 中标记为 **DATA NOT AVAILABLE** 的真实绩效数据。
> 需要操作者具备 Search Console 与 GA4 的**已登录浏览器**。导出完成后按本文命名放入 `docs/gsc-history/`，并把结果告知 AI 以继续 Query×Page join 与机会排序。

---

## A. GSC 90 天完整导出（优先，最重要）

1. 打开 https://search.google.com/search-console → 选择资源 `sc-domain: zhongsai-steelstructure.com`。
2. 左侧进入 **效果 / Performance**。
3. 右上角日期范围：选择 **最近 90 天**（自定义：2026-07-14 – 2026-10-12）。
4. 不要应用任何过滤（类型=网页搜索，含 Discover/News 可选；保持一致即可）。
5. **Queries**：下方标签切到「查询 / Queries」→ 右上「导出 / Export」→ 下载 **CSV**（不是 Google Sheets）。
   - 若只有 Top 1000，GSC 网页导出默认包含全部可导出行（一般足以覆盖全量 clicks>0 的 query）。
6. **Pages**：切到「网页 / Pages」→ 导出 CSV。
7. **Countries**：切到「国家或地区 / Countries」→ 导出 CSV。
8. **Devices**：切到「设备 / Devices」→ 导出 CSV。
9. **Search Appearance**：切到「搜索类型 / Search appearance」→ 展开「Google 网页搜索」下的 **AI Overviews**（若可见）→ 导出 CSV。若界面无此入口：记录该限制，不强行。
10. 文件命名并放入仓库：
    - `docs/gsc-history/2026-10-12-90d-queries.csv`
    - `docs/gsc-history/2026-10-12-90d-pages.csv`
    - `docs/gsc-history/2026-10-12-90d-countries.csv`
    - `docs/gsc-history/2026-10-12-90d-devices.csv`
    - `docs/gsc-history/2026-10-12-90d-searchappearance.csv`（如可得）

字段最低要求：Query/Page、Clicks、Impressions、CTR、Position。GSC 导出 CSV 自带这些列，无需转换。

## B. GSC 28 天对比（第二次导出）

重复 A 的步骤，但日期范围两次：
1. 最近 28 天：2026-09-15 – 2026-10-12 → `2026-10-12-28d-queries.csv` / `2026-10-12-28d-pages.csv`
2. 前 28 天：2026-08-18 – 2026-09-14 → `2026-10-12-prev28d-queries.csv` / `2026-10-12-prev28d-pages.csv`
（比对口径：同一 query/URL 的 Current vs Previous → Delta。不要把单一窗口波动直接判为内容衰退。）

## C. GSC AI Exposure 最新 Top

在 B1 窗口（最近 28 天）下：
1. 「搜索类型 / Search appearance」→ **AI Overviews**（如可用）→ 导出 `docs/gsc-history/2026-10-12-ai-exposure.csv`。
2. 若入口不可用：改在「效果」页把「Google 网页搜索」展开，查看是否有 AI Overviews 行；仍不可用则记录限制，沿用线索登记（UNVERIFIED）。

## D. GA4 最新 28 天渠道与事件（需登录 GA4）

1. 打开 GA4 → 报告「获取用户 / Acquisition」→「流量获取 / Traffic acquisition」→ 日期范围 **最近 28 天**。
2. 导出「Default Channel Group / Session default channel group」视图为 CSV（含 Sessions / Users / Engaged sessions / Engagement rate / Avg. engagement time）。
3. 事件导出：探索 / Explore → 自由形式 → 维度 `Event name`，指标 `Event count / Total users`，日期同 28 天 → 导出 CSV（用于核对 generate_lead / whatsapp_click / project_form_start 等最新计数）。
4. 文件命名：`docs/gsc-history/2026-10-12-ga4-28d-traffic.csv`、`docs/gsc-history/2026-10-12-ga4-28d-events.csv`。

## E. GA4 后台配置（与导出无冲突，建议一并完成；纯后台，不改代码）

1. Admin → Key Events → New key event → 条件 `event_name` 等于 `generate_lead` → 保存（解锁 Key Events 面板，对新数据生效）。
2. Admin → 数据流 → 配置内部流量过滤（内部 IP）+ 数据中心/机器人流量过滤（清理 Direct 污染）。
3. Admin → 数据流 → 可选配置「AI Assistant」为自定义渠道组（如需长期单独观察 AI 流量）。

---

## 完成标准

- 上述文件全部落入 `docs/gsc-history/` 后，AI 才能执行：
  - Query × Page join（Position 4–10 / 11–20 / 高曝光低 CTR / 多 URL 同 query / 商业 query）
  - SEO × GEO master opportunity 表（GSC + AI + GA4 合并）
  - 最终机会排序（仅真实数据标 CONFIRMED）
- 在文件落地前，一切机会排序保持 **UNCONFIRMED**，禁止伪造缺失 query。
