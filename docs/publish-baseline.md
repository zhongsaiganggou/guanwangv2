# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 371 | 2026-11-21 | 本轮起手因他人提交 `84bb414` 已到 369；新建 `waste-to-energy-plant-steel-structure-guide` +2 = 371（generate-routes 370） |
| sitemap `<loc>` | 364 | 2026-11-21 | 起手 362（他人 +2）+2，dangling 0 |
| paired en/zh | 315 | 2026-11-21 | 起手 313 +2（seo:check:sitemap 实测 315） |
| benign SAME_TARGET | 2 | 2026-11-21 | 既有 `/countries`；另有 acknowledged shadow 1（`/zh/steel-building-solutions/blog`） |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-21 | 必须恒为 0 |
| blog EN 篇数 | 118 | 2026-11-21 | 含他人提交 `84bb414` 的 malaysia-indonesia 参数清单 |
| blog ZH 篇数 | 117 | 2026-11-21 | 同上 |
| 最近发布时间 | 2026-11-21 | 2026-11-21 | `waste-to-energy-plant-steel-structure-guide`（新建，EN/ZH 双语） |
| 最近部署别名 | `https://73285b1d.zhongsai-website-v2.pages.dev` | 2026-11-21 | 上轮 `3eda3af3` |
| 最近 commit | 见 `git log -1`（本轮 content: add waste-to-energy 提交） | 2026-11-21 | 上轮基线 commit `8518c8a`；期间他人提交 `84bb414`/`1b1f97f`（马印参数清单 + 工厂照片） |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无记录） | — | — | — |
