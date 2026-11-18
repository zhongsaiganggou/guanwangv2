# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 363 | 2026-11-18 | 新建轮 `mezzanine-in-existing-steel-building-guide` +2 页，符合 v3 相对值校验 |
| sitemap `<loc>` | 356 | 2026-11-18 | 新建轮 +2，dangling 0 |
| paired en/zh | 307 | 2026-11-18 | 新建轮 +2 |
| benign SAME_TARGET | 2 | 2026-11-18 | 既有 `/countries`，允许存在 |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-18 | 必须恒为 0 |
| blog EN 篇数 | 114 | 2026-11-18 | |
| blog ZH 篇数 | 113 | 2026-11-18 | |
| 最近发布时间 | 2026-11-18 | 2026-11-18 | `mezzanine-in-existing-steel-building-guide`（新建，EN/ZH 双语） |
| 最近部署别名 | `https://250ecd01.zhongsai-website-v2.pages.dev` | 2026-11-18 | |
| 最近 commit | 见 `git log -1`（本轮 content: add mezzanine 提交） | 2026-11-18 | 上一轮基线 commit `9d1231b` |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无记录） | — | — | — |
