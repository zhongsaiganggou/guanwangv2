# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 375 | 2026-11-25 | 新建轮 `textile-mill-steel-structure-guide` +2（起手 373，generate-routes 374） |
| sitemap `<loc>` | 368 | 2026-11-25 | 起手 366 +2，dangling 0 |
| paired en/zh | 319 | 2026-11-25 | 起手 317 +2（实测 319） |
| benign SAME_TARGET | 2 | 2026-11-25 | 既有 `/countries`；另有 acknowledged shadow 1（`/zh/steel-building-solutions/blog`） |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-25 | 必须恒为 0 |
| blog EN 篇数 | 120 | 2026-11-25 | 新建 textile 篇 |
| blog ZH 篇数 | 119 | 2026-11-25 | 新建 textile 篇（cms-publishing-test 无 ZH 配对） |
| 最近发布时间 | 2026-11-25 | 2026-11-25 | `textile-mill-steel-structure-guide`（新建，EN/ZH 双语） |
| 最近部署别名 | `https://07b1f34d.zhongsai-website-v2.pages.dev` | 2026-11-25 | 上轮 `2692a646`；**该次部署的 dist 包含工作区中 24 个未提交的 WhatsApp 换号改动，见下方风险** |
| 最近 commit | `43073c7`（content: add textile-mill EN/ZH） | 2026-11-25 | 上轮 `5fdcf94`；工作区另有 24 个未提交文件（WhatsApp 8613192007378 → 8613113270408），本轮未提交、未纳入 commit |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无确认未索引的案例） | — | — | 2026-11-22 周日回检：GSC 导出窗口止于 2026-11-02，11-02 之后发布的 15 篇（11-02～11-08）在导出中均无展现，无法据此判定未索引；不写入名单，待新导出复核 |

## 已知风险与待决

- 2026-11-25 轮：工作区存在 24 个**未提交**文件把 WhatsApp 号从 `8613192007378` 改为 `8613113270408`（Footer、contact、markets、privacy/terms/thank-you 等）。本轮 build/部署的 dist 已包含该改动并已上线；本轮 commit 未包含这些文件。若该号码未经确认，需回退并重新部署；若确认有效，应由提交人单独 commit。
