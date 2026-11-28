# 发布基线（build 页数 / sitemap / 未索引观察名单）

> v3 任务用它做**相对值**校验，禁止在指令里写死绝对数字。每轮成功部署后由当轮任务更新本文件。

## 当前基线

| 项 | 值 | 更新时间 | 备注 |
|---|---|---|---|
| build 页数 | 379 | 2026-11-28 | 存量优化轮 `steel-structure-ndt-testing`，三项与基线持平（不新增 URL，generate-routes 378） |
| sitemap `<loc>` | 372 | 2026-11-28 | 存量优化轮持平，dangling 0 |
| paired en/zh | 323 | 2026-11-28 | 存量优化轮持平（实测 323） |
| benign SAME_TARGET | 2 | 2026-11-27 | 既有 `/countries`；另有 acknowledged shadow 1（`/zh/steel-building-solutions/blog`） |
| SHADOWED_WRONG_TARGET | 0 | 2026-11-27 | 必须恒为 0 |
| blog EN 篇数 | 122 | 2026-11-27 | 新建 school 篇 |
| blog ZH 篇数 | 121 | 2026-11-27 | 新建 school 篇（cms-publishing-test 无 ZH 配对） |
| 最近活动 | 2026-11-28 | 2026-11-28 | 存量优化 `steel-structure-ndt-testing`（重写 Direct Answer、补 2 个 GEO 块、加 3 条内链）；最近新建仍为 2026-11-27 school 篇 |
| 最近部署别名 | `https://89da2deb.zhongsai-website-v2.pages.dev` | 2026-11-28 | 上轮 `d6280ae6`；起手 pull 另带入 `1f2899e` 外链登记与 `724ed48` 制造证据/工厂表述修正两个他人提交，均未新增路由页 |
| 最近 commit | `f94039a`（content: improve NDT EN/ZH）+ `3e4fa7c`（baseline） | 2026-11-28 | 存量轮：只含 NDT 两篇 md + weekly-log，无新增图片/路由 |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无确认未索引的案例） | — | — | 2026-11-22 周日回检：GSC 导出窗口止于 2026-11-02，11-02 之后发布的 15 篇（11-02～11-08）在导出中均无展现，无法据此判定未索引；不写入名单，待新导出复核 |

## 已知风险与待决

- 2026-11-25：WhatsApp 换号 24 文件已随 `8976842` 提交并部署 Production（`bd3d1928`）；WhatsApp 统一为 `+86 131 1327 0408`，电话接听保留 `+86 131 9200 7378`。风险关闭。
- 2026-11-25：`src/components/SEOHead.astro` 已加入 Meta 域名验证 meta（`wojphitbtsg2idw1pp1hq7e7f706lb`），主域名 `/` 301→`/en/` 后 HTML 可见，待 Meta Business 后台点“验证网域”。
- 2026-11-26：本轮 build/部署的 dist 只含本篇新增内容与已提交的站点代码，工作区起手即干净（`git status` 0 项），无「dist 含未提交改动」风险。
- 2026-11-27：起手 pull 带进 5 个他人提交（`5e5a381` 悬浮层改版与 301、`f0f8977` 恢复 4 入口、`4a31272` WhatsApp/Email 轮流分配、`10bc03d` 移动端隐藏悬浮层，另含认证图片高清替换与 `docs/link-building` 新增文档）。均未新增路由页，build 页数基线仍按 377→379 相对校验；本轮 dist 已包含这些已提交改动。
- 2026-11-28：存量优化轮，未新增 URL；起手 pull 带入 `1f2899e`（外链登记 11-27 目录复核）与 `724ed48`（制造证据表述修正、纠正工厂类表述）两个他人提交，均未新增路由页；build 379 / loc 372 / paired 323 与基线持平。NDT 页 dist 中 rt.jpg 为早期版本遗留未引用图片，本轮未删除（资产冻结）。
