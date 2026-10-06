# ZhongSai Website Lead Drop — Full-Funnel Audit

- 日期：2026-10-06
- 范围：https://zhongsai-steelstructure.com （Production 实测 + GSC 官方导出 + D1 生产库实测 + 表单 E2E）
- 性质：**AUDIT ONLY**。本轮未改动 Production。
- Production 安全基线：部署 `b08feea0` / commit `ad6d08f`，**185 页 / sitemap 156 loc**。

---

## 1. Executive Conclusion

"过去约 1 个月几乎没有网站线索"**不是某一个 P0 故障（表单没坏、投递没断、核心页没 noindex/404）**，而是一个"冷启动 + 漏损"的组合：

1. **主因 — 漏斗顶端缺水**：新站自 2026-08-22 上线约 6 周，累计仅 **52 次点击 / 4340 次曝光，平均排名 19.8（Google 第二页）**。绝大多数关键词在第 13–25 位，第二页几乎不产生点击，自然流量基数极小（日均约 1.2 次点击）。
2. **放大因素 A（P1）— 表单前后端必填不一致**：前端电话/WhatsApp 可选，后端强制 `calling_code + phone`。"只填微信、不填电话"的用户（多为华人）提交后被后端 **422 VALIDATION_ERROR** 拒绝，前端只笼统提示"请检查必填字段"。
3. **放大因素 B（P1）— 旧 URL 漏损**：本已稀少的点击中，**22% 直接落到 404、9% 被重定向到宽泛列表页**（约 31% 未顺畅到达精准内容）。

线索通知链路（D1 / webhook / 企业微信群）经实测**正常**，不存在"线索提交了但销售收不到"的 P0。

---

## 2. Is the Lead Drop Real? — 是，但"流量"并未暴跌

- D1 生产库 `leads` 共 **21 条**，其中约 12–13 条为"中国 / 中文"内部测试或低质记录，**真正可信海外潜客极少（英文仅 1 条）**。"几乎没有有效线索"属实。
- 但自然搜索点击**并未在最近下滑，反而在缓慢增长**（见 §3）。问题是"基数一直太小"，不是"从有变无"。

---

## 3. GSC 28d vs Previous 28d（官方导出，按日现算）

| 指标 | 最近 28 天 (09-06–10-03) | 之前 (08-09–09-05，实际 15 天有数据) | 变化（日均） |
|---|---|---|---|
| 点击 | 37（日均 1.32） | 15（日均 1.00） | **+32%** |
| 曝光 | 2,719（日均 97.1） | 1,621（日均 108.1） | **−10%** |

- 结论：**无暴跌**。点击日均 +32%（缓慢爬升），曝光平稳略降（新站新鲜度效应消退后的正常波动）。
- 6 周累计（GSC 汇总口径）：**52 clicks / 4,340 impr / CTR 1.2% / avg position 19.8**。

---

## 4. Organic Traffic Trend

- 按日：上线第 1 周（8/25–9/4）出现一个曝光小高峰（日均 100–296），随后回落到日均 60–150 的平稳低位；点击始终零星（多数日子 0–3 次）。
- 属于典型新站"Google 先给一波测试性曝光 → 观察用户反应 → 回落到与权威性匹配的低位"，**需要持续内容 + 时间 + EEAT 才能把排名/流量稳定推上去**。

---

## 5. Ranking / Query Trend

- **查询级点击被 GSC 匿名化**：导出"查询数.csv"共 178 个查询，**点击列全部为 0**（新站/低频查询的隐私聚合，Google 不报告具体是哪个词带来点击）。因此无法用"词"归因，只能用"页面"反推。
- 高曝光、零点击、排名靠后的代表性查询：
  - `steel frame building foundations`（80 impr，pos 42）
  - `general manager dongguan whatsapp`（44）
  - `structural detailing services`（37）
  - `sandwich steel wall panel hong kong`（34）
  - `中国钢结构出口厂家排名`（pos 3.6，品牌/信息类）
  - `astm a572 grade 50 supplier philippines`（pos 7.7）
  - `steel structure shipping china to mexico`（pos 15）
- 高商业价值词普遍落在第二页（pos 13–25），是当前"有曝光、没点击"的直接原因。

---

## 6. Country Trend（按曝光/点击）

| 国家/地区 | 点击 | 曝光 | CTR | 平均排名 | 备注 |
|---|---|---|---|---|---|
| 中国 | 12 | 567 | 2.1% | 7.6 | 多为内部/华人/测试 |
| 美国 | 10 | **1,280** | 0.78% | 24.0 | 曝光最多但非核心市场、排名靠后 |
| **马来西亚** | 6 | 88 | **6.8%** | 核心市场，排上去后 CTR 高 |
| **印尼** | 4 | 74 | **5.4%** | 核心市场，CTR 高 |
| 香港 | 2 | 125 | | | |
| 尼日利亚 | 2 | 48 | | | |
| 新加坡 | 1 | 183 | | | 高曝光低点击 |
| 印度 | 1 | 176 | | | |

- **大量核心目标市场"有曝光、0 点击、排名第二页"**：越南 127、菲律宾 96、UAE 77、巴西 61、日本 46、沙特 44、孟加拉 43、澳大利亚 42、阿根廷 38、南非 30，以及阿曼/柬埔寨/智利/伊拉克/缅甸/哈萨克/埃及/秘鲁/埃塞俄比亚等。
- 关键信号：**马来西亚 / 印尼一旦排上，CTR 达 5–7%**。说明需求真实存在，瓶颈是排名，而非市场不需要。
- 设备：桌面 41 clicks / 3,795 impr（pos 20.6）、移动 9 / 530（pos 13.6）、平板 2。**B2B 采购桌面主导，符合预期**。

---

## 7. Indexation Impact（GSC 覆盖率，2026-10-06）

| 状态 | 数量 | 是否影响当前高价值官方 URL |
|---|---|---|
| 未找到 (404) | 212 | 绝大多数为旧站/扫描垃圾；**少数是有曝光/点击的旧博客与旧国家 URL（见 §8）** |
| 网页会自动重定向 | 184 | 旧 URL，已/将被重定向 |
| 备用网页（有适当规范标记） | 99 | 正常（带正确 canonical 的重复版本） |
| 已发现 - 尚未编入索引 | ~90 | 多为新 URL，等待抓取 |
| 已抓取 - 尚未编入索引 | ~21 | 需提升内容质量/EEAT |
| 被 noindex 排除 | 3 | 非核心 |
| 重复，用户未选规范网页 | 2 | 量小，观察 |
| Google 选择的规范网页与用户指定不同 | 5 | 量小，观察 |
| 已编入索引 | ~206 | — |

- **没有任何当前核心官方 URL（首页 / Contact / Solutions / Projects / Markets / 核心指南）掉入 404 / noindex / 错误 canonical。**
- 8 类问题的"验证修复"均"已开始 9/23"，Google 持续重抓，**无需重复提交**。

---

## 8. Historical URL Impact（有点击页面的生产实测）

对 GSC 中 **39 个带来点击的页面**逐一在 Production 实测（页面明细加总 55 次点击；与 GSC 汇总 52 的差异为去重/时区口径，不影响结论）：

| 生产状态 | 点击 | 占比 | 含义 |
|---|---|---|---|
| **200 有效** | 27 | 49% | 正常到达 |
| **308 尾斜杠规范化**（最终 200） | 6 | 11% | 健康 |
| **301 到精确页 (EXACT)** | 5 | 9% | 健康（如 thailand→markets/thailand、roof-systems→components/roof-wall） |
| **301 到宽泛列表页 (LIST)** | 5 | 9% | 软稀释（如 countries/indonesia→markets 列表而非 markets/indonesia） |
| **404** | **12** | **22%** | 点击直接浪费 |

- 合计：**健康到达 38（69%）/ 软稀释 5（9%）/ 直接 404 12（22%）——约 31% 点击未顺畅到达精准内容。**
- 12 个 404（含高曝光）：中文"每平米成本"(110 impr)、英文防腐指南(51)、英文设计标准(40)、坦桑尼亚项目(30)、中文防腐(24)、英文工厂成本(22)、中文设计标准(21)、尼日利亚指南(13)、fasteners(12)、医院(10)、中文印尼指南(9)、中文印尼矿业(2)。
- 其中 **9–10 个在新站有语义对应页面，只是旧 slug 缺精确 301**（见 §19）。

---

## 9. GA4 Funnel — 数据限制

- 本轮以 **GSC（流量端）+ D1（转化端）** 构成完整闭环证据，结论不依赖 GA4。
- GA4 行为/事件明细本轮**未拉取**，不编造 GA4 数字。已知代码层面：**微信点击（wechat_click）没有独立事件监听**（WhatsApp/email 点击有）。列为 P3 核对。

---

## 10. CTA Funnel

- CTA 与入口齐全：首页/各解决方案/市场页有"提交项目需求"，Contact 有完整表单 + 成功页，WhatsApp / 微信 / Facebook 入口存在。
- 摩擦点：
  1. 后端错误时前端**只显示全局"请检查必填字段"，不回填具体是哪个字段**（用户不知道要补电话）→ P2 CRO。
  2. 表单字段总数较多（20+，但绝大多数可选），必填仅 3 个，尚可。
- 高流量博客文末尾 CTA 均指向 Contact，结构正常。

---

## 11. Form End-to-End（Production 实测，2026-10-06）

| 场景 | 填写 | 结果 |
|---|---|---|
| **A. 含电话**（模拟海外/WhatsApp 客户） | 姓名 + 微信 + 国家 + 区号(+86) + 电话 | **HTTP 201，`submission_status=complete`，显示成功页** |
| **B. 只填微信，不填电话** | 姓名 + 微信 + 国家 | 前端校验通过并提交 → **后端 VALIDATION_ERROR，前端提示"请检查必填字段"（复现 422）** |

- Turnstile 两种场景均**自动通过**（真实浏览器 token 自动生成，816 字符），不挡正常用户。
- 两次测试均被后端正确标记 `test_record=true`（名字含 "v2 qa test"），FB CAPI 对测试记录自动跳过。

---

## 12. Event Tracking

- 代码确认的 GA4 事件：`project_form_start`、`project_form_submit`、`generate_lead`（201 成功后触发、带 lead_id 去重）、`drawing_upload`、`whatsapp_click`、`email_click`。
- Meta Pixel `1268080202055777`：前端 PageView/Lead + 服务端 CAPI（非 test 才发）。
- 缺口：**`wechat_click` 无独立监听**（P3）。

---

## 13. Lead Delivery（后端完整链路，已实测/代码核对）

表单提交后：honeypot 静默过滤 → Turnstile 服务端校验 → `validateLead` → **D1（LEADS_DB）INSERT leads → R2（LEAD_FILES）存附件 → 返回 201** → `waitUntil` 异步：**LEAD_WEBHOOK（带 X-Webhook-Secret）+ 企业微信群机器人 markdown + Meta 服务端 CAPI**。

- D1 21 条记录中绝大多数 `webhook_status=success`（仅 2 条历史 FAILED），**投递链路正常，无 P0**。
- 附件：单文件 ≤25MB、总计 ≤75MB，扩展名 pdf/dwg/dxf/jpg/jpeg/png/xls/xlsx。

---

## 14. Mobile

- 当前可测宽度（870px）下 `scrollWidth < innerWidth`，**无横向溢出**。
- 精确 390px 模拟因 CDP session 未成功（环境限制）。网站每个页面/文章均按项目硬性要求（双语 + 移动端）做过响应式 QA，CSS 媒体查询完整。
- 建议：上线前用真机 + PageSpeed 抽测（P3）。移动端**不是本次"没线索"的主因**（且移动端排名 13.6 反而优于桌面）。

---

## 15. Performance / CWV

- YouTube 已采用 click-to-load：首页初始 **0 个 iframe**，点击后才加载 1 个；缩略图尺寸固定以避免 CLS。
- 本轮未跑 Lab CWV（P3 PageSpeed）。无证据表明加载慢是"没线索"主因：B2B 流量桌面主导，GSC 曝光/抓取正常。

---

## 16. Trust / Evidence

信任要素齐全且可访问：真实项目（Projects）、工程设计（drawings/Tekla）、制造与 QC、包装/装柜、**发货视频（YouTube 官方播放列表 + 官网 Shipment 页）**、About、Contact。
- 客户可确认"中赛做什么 / 不做什么（当地负责 permits、土建、实际安装）"。
- 未发现"证据缺失导致不信任"的硬伤；个别证据入口较深，属 IA/CRO 优化（P2）。

---

## 17. Root Cause Matrix

| 类别 | 问题 | 证据 | 影响 | 置信度 | 优先级 |
|---|---|---|---|---|---|
| **SEO / 流量** | 新站冷启动、关键词普遍第二页(pos 13–25)、流量基数极小 | 6 周 52 clicks、pos 19.8、核心市场 0 点击高曝光 | 漏斗顶端缺水，**主因** | 高 | P2（长期） |
| **FORM** | 前后端电话必填不一致，只填微信→422 | E2E 复现 + 代码 L76–80 | 完全阻断华人/微信客户 | 高 | **P1** |
| **INDEXATION / 旧 URL** | 22% 点击 404、9% 宽泛重定向 | 39 页生产实测 | 浪费约 31% 稀少点击 | 高 | **P1** |
| CRO | 后端错误不回填具体字段 | 代码 L856 | 用户困惑放弃 | 中 | P2 |
| 内容缺口 | ZH 缺 saudi 市场页；无 nigeria 等 | 页面清单 | 承接不了部分流量 | 中 | P2 |
| TRACKING | wechat_click 无事件 | 代码 | 漏统计微信转化 | 高 | P3 |
| MOBILE / CWV | 未做 Lab/390 实测 | — | 未知，非主因 | 低 | P3 |
| LEAD DELIVERY | 无 | 21 条、webhook success | — | 高 | 无 P0 |

---

## 18. P0–P3 Issues

- **P0：无。** 表单正常路径通、核心页 200、无生产 noindex、线索投递链路通。
- **P1（尽快，直接救转化）**
  1. 修复"只填微信→422"：统一前后端必填逻辑（见 §19-①）。
  2. 部署 gsc-redirects 止住 404，但**先补约 10 条精确映射 + 修 3 条回退**（见 §19-②），避免软稀释。
- **P2（增长）**
  3. 持续 SEO：把核心市场关键词从第二页推到第一页（高质量内容 + EEAT + 时间 + 内链）。
  4. 补建缺口页：ZH saudi-arabia；评估 nigeria / 越南 / 菲律宾市场页。
  5. CRO：后端 422 时前端回填具体字段错误。
- **P3（长期）**
  6. GA4 补 `wechat_click`、核对 `generate_lead`；真机 + PageSpeed 抽测；重复 canonical 观察。

---

## 19. Exact Fix Plan（先报告，批准后再改）

### ① 修复 422（P1，小改动）
- 后端 `validateLead`：把 `calling_code + phone` 从"无条件必填"改为**与 wechat 联动**——`wechat` 与 `phone` **至少填一个**；只有填了 `phone` 才要求 `calling_code`（区号）。
- 这样与前端"电话可选、微信必填"对齐，海外（填 WhatsApp）与华人（只填微信）都能提交。**不删除任何字段。**

### ② gsc-redirects 补精确映射（P1，middleware EXACT）
| 旧 URL | 应精确重定向到 |
|---|---|
| `/{lang}/blog/steel-structure-corrosion-protection-guide` | `/{lang}/blog/steel-structure-corrosion-protection-coating-guide` |
| `/{lang}/blog/steel-structure-design-standards-guide` | `/{lang}/blog/steel-structure-design-codes-comparison` |
| `/en/blog/prefab-steel-factory-building-cost-guide` | `/en/blog/steel-warehouse-cost-guide` |
| `/zh/blog/steel-structure-cost-per-square-meter` | `/zh/blog/gangjiegou-changfang-zaojia-zhinan`（Preview 已正确） |
| `/zh/blog/steel-structure-supplier-indonesia-guide` | `/zh/markets/indonesia` |
| `/en/countries/indonesia` | `/en/markets/indonesia` |
| `/en/projects/tanzania-grain-storage-warehouse` | `/en/markets/tanzania` |
| `/en/steel-hospital-building` | `/en/commercial-public-steel-buildings` |
| `/en/products/materials/fasteners` | `/en/components` |
| `/zh/projects/indonesia-mining-steel-structure` | `/zh/steel-mining-factory`（Preview 已正确） |

- **修 3 条"精确→宽泛"回退**（Preview 当前不如 Production）：
  - roof-systems-comparison → `/en/components/roof-wall-cladding-systems`（现误到 resources）
  - thailand-guide → `/en/markets/thailand`（现误到 resources）
  - steel-warehouse-logistics.html → `/en/steel-warehouse`（现误到 solutions）
- 无对应页面（nigeria、kazakhstan、ZH saudi、products.html）维持 markets/resources 列表 fallback（合理）。
- 改后重新 Preview 全量复测（目标：404=0、宽泛 fallback 仅保留"确实无对应页"的），用户批准后才部署 Production + 推送 GitHub。

---

## 20. Old URL Verdict（STEP 22）

**PARTLY CONTRIBUTING — 不是主因（NOT THE PRIMARY CAUSE）。**

- 旧 URL/404 确实浪费了约 22% 的本已稀少点击、另有 9% 被软稀释，是真实的转化漏损，gsc-redirects（补精确映射后）值得做。
- 但它**无法解释"总流量/询盘本来就极少"**：即使把所有 404 完美修复，按当前每月约 50 点击、1.2% CTR、第二页排名，新增询盘仍只是个位数。**主因是新站流量基数太小 + 排名靠后；旧 URL 是在极小基数上再放血。**

---

## 21. What NOT to Fix

- **不要**因 GSC 有 212 个 404 就 mass-redirect 全部——绝大多数是扫描垃圾/无流量，只修"有曝光/有点击"的约 30 条。
- **不要**把页面改全宽 / 重构架构（与"没线索"无关；XWIDE 已被否）。
- **不要**为 YouTube 国内可访问做复杂改造（已评估并放弃，海外已不跳登录）。
- **不要**为"凑数"批量发低质文章（新 URL 限速 0–2 个/高质量/天，质量优先）。
- **不要**改现有 URL / Title / canonical / GA4 / DNS（URL Freeze）。
- **不要**靠删除表单字段来"解决"422（应统一必填校验逻辑）。

---

## 22. Recommended Next Action

建议按以下顺序，**确认后我才动手**：

1. **先修 P1-①（422）**——改动最小、直接救回"只填微信"的华人客户。
2. **再补 gsc-redirects 精确映射（P1-②）**→ 重新 build + Preview 全量复测 → 你批准后部署 Production 并推送 GitHub。
3. **并行推进 P2 SEO/内容**——这是解决"没线索"的根本，但现实预期是**数周到数月**才能看到核心市场排名进入第一页、询盘稳定增长。

> 在你确认修复顺序前，保持 Production 现状（安全基线 `b08feea0`），不做改动。
> 另：本次 E2E 在 D1 产生 2 条 `test_record=true` 记录，是否需要我清理，请一并告知。

---

**ZHONGSAI LEAD DROP AUDIT = COMPLETE — 等待确认修复顺序。**
