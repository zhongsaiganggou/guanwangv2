# PHASE 17.2 — GSC INDEXING & SEO MONITORING REPORT

- 站点：https://zhongsai-steelstructure.com/
- 生产 SHA：fd75ff864d9a007d55dda304ce425dec1c22a6b2
- Deployment：a2cc5a99
- 本阶段：只读。未改网站、未 commit、未 push、未部署。未改动 `tools/gsc-baseline/` 原 12 文件。

---

## 1. GSC 连接与数据权限状态

| 项目 | 状态 |
|---|---|
| 数据来源 | Search Console 网页版手动导出的 CSV（域名资源 `sc-domain:zhongsai-steelstructure.com`） |
| GSC API / URL Inspection API | **未配置**。仓库内无 client_secret / service_account / refresh_token，仅有基于 CSV 的分析脚本。 |
| 能否实时查“Google 是否已收录某 URL” | **不能**。本环境无 GSC API 权限。 |
| 既有基线 Period A | 2026-10-10 ~ 2026-11-06（近 28 天，导出 2026-11-07） |
| 既有基线 Period B | 2026-09-12 ~ 2026-10-09（前 28 天，导出 2026-11-07） |

> 关键边界：Period A 止于 **2026-11-06**，而 7 篇新博客上线于 2026-11-06~11-09，MTC 内链/CTA 优化于 **2026-11-09**。因此“发布后表现”和“优化后表现”在现有 CSV 中均为 **DATA GAP**，不能用 Period A 末段冒充。

---

## 2. 16 个目标 URL 索引状态表

> 索引状态（已发现/已抓取/已收录/Google 选定 canonical/最近抓取时间）**无法从本环境取得**——需在 GSC「网址检查」逐 URL 查询。下表“技术可达性”列为本阶段实测，“Google 收录”列为待用户在 GSC 确认。

| URL | sitemap 收录 | HTTP 200(17.1) | canonical/hreflang/robots(17.1) | Google 收录 |
|---|---|---|---|---|
| /en/blog/steel-structure-mill-test-certificate-guide/ | ✅ | ✅ | ✅ 自指/index,follow | 待 GSC 确认 |
| /zh/blog/steel-structure-mill-test-certificate-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/automated-warehouse-steel-building-asrs-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/automated-warehouse-steel-building-asrs-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/cleanroom-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/cleanroom-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/crane-rail-installation-grouting-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/crane-rail-installation-grouting-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/data-center-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/data-center-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/mining-equipment-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/mining-equipment-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/multi-storey-car-park-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/multi-storey-car-park-steel-structure-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /en/blog/warehouse-loading-dock-design-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |
| /zh/blog/warehouse-loading-dock-design-guide/ | ✅ | ✅ | ✅ | 待 GSC 确认 |

- sitemap.xml（单文件，135,439 字节，298 URL）实测包含全部 8 个 slug（每个在 hreflang 组合中出现）。
- 无 noindex、无 robots 阻止、无重复 canonical（17.1 已逐项验证）。
- 注意：HTTP 200 + 在 sitemap + canonical 正常 **不等于 Google 已收录**，不得据此下“已索引”结论。

---

## 3. 7 篇新博客中英文表现（DATA GAP）

- 这 7 篇在 Period A（~11-06 止）与 Period B 的 pages 维度中**零记录**——符合预期：它们几乎刚发布，GSC 数据有 2–3 天延迟，且尚未到被展示的阶段。
- **发布几天内无点击 / 无曝光属正常，不判定为 SEO 失败。**
- 需要用户从 GSC 补导 2026-11-07 至今的 pages/queries CSV 后才能出真实表现。

---

## 4. MTC 专项（区分优化前 / 优化后）

### A. 优化前（Period A 2026-10-10~11-06，MTC 约 10-22 上线）
| 页面 | 点击 | 展示 | CTR | 平均排名 |
|---|---|---|---|---|
| /en/blog/steel-structure-mill-test-certificate-guide/ | 2 | 465 | 0.43% | 12.63 |
| /zh/blog/steel-structure-mill-test-certificate-guide/ | 1 | 11 | 9.09% | 5.45 |

- EN 已进入第 1 页尾部（排名 12.6），但 465 展示仅 2 点击，CTR 偏低。
- ZH 样本量极小（11 展示），排名 5.45，暂不具统计意义。

### B. 2026-11-09 内链/CTA 优化后表现
- **DATA GAP**：现有 CSV 截止 11-06，无优化后数据。不可把优化前数据当作优化后效果。

---

## 5. 实际搜索 Query（来自 gsc-A-queries.csv，真实数据）

MTC 主题词：
- `mill certificate for steel` 0 点击 / **57 展示** / 排名 8.72
- `ndt test for steel structure` 0 / 38 / 13.47（→ NDT 页，见下）
- `steel mill certificate` 0 / 22 / 10.95
- `mill test certificate for steel` 0 / **17** / 排名 **4.24**
- `mill test certificate` 0 / 15 / 12.13
- `mill certificate` 0 / 6 / 45.67
- `mtc certificate` 0 / 3 / 7.67；`what is mtc certificate` 0 / 1 / 8
- `en 10204 3.2 vs 3.1 exporter` 0 / 3 / 92.33
- `3.1 mtc meaning`、`mtc en 10204 type 3.1` 等长尾各 1 展示。

NDT 主题词（独立承接页 /en/blog/steel-structure-ndt-testing/）：
- `ndt test for steel structure` 38 展示 / 13.47
- `ndt testing of ferrous parts` 15 / 26.53
- `steel structure ndt` 5 / 11.8；`steel ndt testing` 2 / 9.5

---

## 6. 关键词 → URL 映射

| Query 主题 | 承接 URL | 状态 |
|---|---|---|
| mill / MTC / EN 10204 3.1/3.2 | /en/blog/steel-structure-mill-test-certificate-guide/ | 映射正确 |
| NDT / non-destructive testing | /en/blog/steel-structure-ndt-testing/ | 映射正确 |

## 7. 关键词蚕食检查

- **MTC 与 NDT 无蚕食**：MTC 词（mill/certificate/10204）全部指向 MTC 页，NDT 词全部指向 NDT 页，Query 集合互不交叉。
- 严格遵守“PMI/XRF ≠ NDT”：现有数据中未出现把 PMI/XRF 强行关联到 NDT 或 MTC 的情况，**本阶段不新增任何此类内链。**
- 7 篇新博客因无展示数据，暂无法判断是否与成熟页蚕食；待补 GSC 数据后复查。

## 8. Sitemap 与索引异常

- sitemap.xml 200、含全部新 URL；robots.txt 200（前序验收）。
- `sitemap-index.xml` 404 属正常：本站采用扁平 `sitemap.xml`，无 index 文件，非故障。
- 无意外 noindex、无错误重定向（17.1 + 线上验收）。

---

## 9. P0–P3 问题清单

- **P0：0**（无技术性索引故障证据；但“真实收录状态”因无 API 无法证伪，见第 10 节待办）。
- **P1：0**。
- **P2-1（MTC EN 高曝光低点击）**：`mill certificate for steel` 排名 8.72（第 1 页）、57 展示、0 点击；整页 465 展示 CTR 仅 0.43%。
  - 影响：错失已进入第 1 页的合格流量，可能是 Title/Description 对“买家验货场景”吸引力不足。
  - 建议（暂缓执行，待优化后数据确认）：复核 MTC EN Title/Description 是否突出“3.1/3.2 + 随货 + 出口验货”信号；**本阶段不改**。
- **P3-1**：`mill test certificate for steel` 已排到 4.24，巩固内容（加对照表/买家 FAQ）有助于稳排名。
- **P3-2**：`en 10204 3.2 vs 3.1 exporter` 排名 92，内容已覆盖但位置靠后，属长期观察项。

## 10. 需要用户从 GSC 导出的数据（当前 DATA GAP）

请在 search.google.com 导出以下，放入 `tools/gsc-baseline/`（新命名，勿覆盖原文件）：
1. 周期 C：2026-11-07 ~ 最新可用日，pages 维度（看 7 篇新博客 + MTC 优化后）。
2. 同周期 queries 维度（看新博客真实 Query）。
3. 对 16 个 URL 在「网址检查(URL Inspection)」逐一记录：是否“已编入索引”、Google 选定 canonical、最近抓取时间。
> 无以上数据前，不对 Title/内链/内容做任何修改。

## 11. 下一次监测建议日期

- **2026-11-17**（发布后约 8–10 天，GSC 延迟已覆盖），复查新博客是否开始出现在 pages/queries，以及 MTC 优化后 CTR 是否从 0.43% 抬升。

---

## 最终决策

- 无需立即处理索引技术故障（无证据）。
- 新博客需等待数据积累，**现在改 Title/内容属过度反应，暂缓**。
- MTC EN 高曝光低点击列为 P2，待周期 C 数据回来再决定是否优化 Title。
- 不修改关键词映射、不调内链、不补内容——均无证据支持。
