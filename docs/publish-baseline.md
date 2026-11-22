# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 371 | 2026-11-22 | 本轮起手因他人提交 `84bb414` 已到 369；新建 `waste-to-energy-plant-steel-structure-guide` +2 = 371（generate-routes 370） |
| sitemap `<loc>` | 364 | 2026-11-22 | 起手 362（他人 +2）+2，dangling 0 |
| paired en/zh | 315 | 2026-11-22 | 起手 313 +2（seo:check:sitemap 实测 315） |
| benign SAME_TARGET | 2 | 2026-11-22 | 既有 `/countries`；另有 acknowledged shadow 1（`/zh/steel-building-solutions/blog`） |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-22 | 必须恒为 0 |
| blog EN 篇数 | 118 | 2026-11-22 | 含他人提交 `84bb414` 的 malaysia-indonesia 参数清单 |
| blog ZH 篇数 | 117 | 2026-11-22 | 同上 |
| 最近发布时间 | 2026-11-21（本轮 2026-11-22 为存量优化，未新增 URL） | 2026-11-22 | `waste-to-energy-plant-steel-structure-guide`（新建，EN/ZH 双语） |
| 最近部署别名 | `https://1f8fee4b.zhongsai-website-v2.pages.dev` | 2026-11-22 | 上轮 `73285b1d` |
| 最近 commit | `6da64b6`（content: improve mill test certificate 提交） | 2026-11-22 | 上轮基线 commit `8518c8a`；期间他人提交 `84bb414`/`1b1f97f`（马印参数清单 + 工厂照片） |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无确认未索引的案例） | — | — | 2026-11-22 周日回检：GSC 导出窗口止于 2026-11-02，11-02 之后发布的 15 篇（11-02～11-08）在导出中均无展现，无法据此判定未索引；不写入名单，待新导出复核 |
