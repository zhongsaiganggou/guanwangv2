# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 367 | 2026-11-20 | 新建轮 `biomass-power-plant-steel-structure-guide` +2 页（generate-routes 366，基线 364 +2） |
| sitemap `<loc>` | 360 | 2026-11-20 | 新建轮 +2，dangling 0 |
| paired en/zh | 311 | 2026-11-20 | 新建轮 +2（seo:check:sitemap 实测 311） |
| benign SAME_TARGET | 2 | 2026-11-20 | 既有 `/countries`；另有 acknowledged shadow 1（`/zh/steel-building-solutions/blog`） |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-20 | 必须恒为 0 |
| blog EN 篇数 | 116 | 2026-11-20 | |
| blog ZH 篇数 | 115 | 2026-11-20 | |
| 最近发布时间 | 2026-11-20 | 2026-11-20 | `biomass-power-plant-steel-structure-guide`（新建，EN/ZH 双语） |
| 最近部署别名 | `https://3eda3af3.zhongsai-website-v2.pages.dev` | 2026-11-20 | 首轮 `8444e713`，修正中文 CTA 文案后重部署 |
| 最近 commit | `f51890f`（content + CTA 对齐两次提交） | 2026-11-20 | 上轮基线 commit `dc9e0fb`；期间他人提交 `5d260a6`（quote form GA4 修复） |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无记录） | — | — | — |
