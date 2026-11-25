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
| 最近部署别名 | `https://bd3d1928.zhongsai-website-v2.pages.dev` | 2026-11-25 | 上轮 `07b1f34d`；本批 dist 含 WhatsApp 换号 + Meta 域名验证 meta |
| 最近 commit | `8976842`（feat(contact): WhatsApp 换号 + Meta 域名验证） | 2026-11-25 | 上轮 `43073c7`；工作区已干净 |

## 未索引观察名单（v3 §7A）

规则：最近 14 天发布的文章，发布满 14 天仍未被 GSC 索引 → 记入本表，并在后续 2 个选题轮避开同类主题；累计 ≥3 篇时在简报中建议降频，由用户决定。

| slug | 发布日期 | 观察天数 | 判定 |
|---|---|---|---|
| （暂无确认未索引的案例） | — | — | 2026-11-22 周日回检：GSC 导出窗口止于 2026-11-02，11-02 之后发布的 15 篇（11-02～11-08）在导出中均无展现，无法据此判定未索引；不写入名单，待新导出复核 |

## 已知风险与待决

- 2026-11-25：WhatsApp 换号 24 文件已随 `8976842` 提交并部署 Production（`bd3d1928`）；WhatsApp 统一为 `+86 131 1327 0408`，电话接听保留 `+86 131 9200 7378`。风险关闭。
- 2026-11-25：`src/components/SEOHead.astro` 已加入 Meta 域名验证 meta（`wojphitbtsg2idw1pp1hq7e7f706lb`），主域名 `/` 301→`/en/` 后 HTML 可见，待 Meta Business 后台点“验证网域”。
