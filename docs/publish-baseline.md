# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 373 | 2026-11-24 | 新建轮 `cement-plant-steel-structure-guide` +2（起手 371，generate-routes 372） |
| sitemap `<loc>` | 366 | 2026-11-24 | 起手 364 +2，dangling 0 |
| paired en/zh | 317 | 2026-11-24 | 起手 315 +2（实测 317） |
| benign SAME_TARGET | 2 | 2026-11-24 | 既有 `/countries`；另有 acknowledged shadow 1（`/zh/steel-building-solutions/blog`） |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-24 | 必须恒为 0 |
| blog EN 篇数 | 119 | 2026-11-24 | 新建 cement 篇 |
| blog ZH 篇数 | 118 | 2026-11-24 | 新建 cement 篇（cms-publishing-test 无 ZH 配对） |
| 最近发布时间 | 2026-11-24 | 2026-11-24 | `cement-plant-steel-structure-guide`（新建，EN/ZH 双语） |
| 最近部署别名 | `https://2692a646.zhongsai-website-v2.pages.dev` | 2026-11-24 | 上轮 `d5e198fd`；本轮为联系邮箱统一（无新增 URL） |
| 最近 commit | `d20d617`（chore(contact): unify contact email） | 2026-11-24 | 上轮 `37ac2cb`；本轮 12 文件 18 处邮箱替换，无新增/删 URL |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无确认未索引的案例） | — | — | 2026-11-22 周日回检：GSC 导出窗口止于 2026-11-02，11-02 之后发布的 15 篇（11-02～11-08）在导出中均无展现，无法据此判定未索引；不写入名单，待新导出复核 |
