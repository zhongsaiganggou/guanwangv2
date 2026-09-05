# ZhongSai V2 SEO/AEO Architecture & Keyword Mapping

**Task**: V2-09A PRODUCTS / COMPONENTS IA + SEO/AEO KEYWORD MAPPING
**Date**: 2026-09-05
**Status**: PROVISIONAL (no GSC performance data available)

---

## 1. Excel Keyword Source Statistics

Source file: `关键词万能组合表(1).xlsx` (sheet: "拓词", 12 columns)

| Column | Keyword Type | Count |
|--------|-------------|-------|
| A | 品牌词 (Brand Terms) | 4 |
| B | 地域前缀词 (Regional Prefix) | 157 |
| C | 修饰前缀词 (Modifier Prefix) | 40 |
| D | 核心词1 (Core: 钢结构) | 1 |
| E | 核心词2 (Core: 钢构) | 1 |
| F | **产品词 (Product Terms)** | **40** |
| G | **应用领域词 (Application Terms)** | **120** |
| H | 服务行为词 (Service/Action Terms) | 13 |
| I | 供应商意图词 (Supplier/Manufacturer Intent) | 34 |
| J | 推荐排行意图词 (Recommendation/Ranking Intent) | 20 |
| K | 选择对比意图词 (Selection/Comparison Intent) | 19 |
| L | 价格词 (Price/Cost Intent) | 17 |

**Total keyword entries**: 482

---

## 2. 40 Product Terms — Final Clustering (7 Clusters)

### Cluster 1: Steel Columns (7 terms)
实腹钢柱, 阁构柱, 十字柱, 钢骨柱, 箱型柱, 钢柱, 圆管柱
- **V2 Coverage**: `/components/fabricated-steel-beams-columns/` (#steel-columns)
- **Action**: COVERED

### Cluster 2: Steel Beams (9 terms)
H型钢梁, 箱型梁, 钢梁, 航车梁, 弧形梁, 焊接H型钢, 热轧H型钢, 变截钢, 工字钢
- **V2 Coverage**: `/components/fabricated-steel-beams-columns/` (#steel-beams, #crane-beams)
- **Action**: COVERED

### Cluster 3: Trusses & Roof Frames (5 terms)
桁架梁, 管桁架, 屋架梁, 钢屋架, 钢架
- **V2 Coverage**: `/components/steel-trusses/` (NEW page V2-09A)
- **Action**: NEW PAGE CREATED

### Cluster 4: Purlins & Cladding (10 terms)
C型钢, Z型钢, 檩条, 彩钢瓦, 夹芯板, 屋面瓦, 墙面瓦, 隔热瓦, 不锈钢瓦, 水槽
- **V2 Coverage**: `/components/steel-purlins/` (NEW) + `/components/roof-wall-cladding-systems/` (#roof-panels, #wall-panels, #sandwich-panels, #cladding-accessories)
- **Action**: NEW PAGE + ANCHORS ADDED

### Cluster 5: Bracing & Connections (4 terms)
钢支撑, 预埋件, 高强螺栓, 构造柱
- **V2 Coverage**: Quote Action (no dedicated page)
- **Action**: QUOTE ACTION — P1 candidate for dedicated page

### Cluster 6: Special & Custom (4 terms)
异形结构, 双扭曲结构, 雨棚梁, 钢模板
- **V2 Coverage**: `/products/custom-engineering/` + Beams page (#box-sections)
- **Action**: COVERED via Custom Engineering

### Cluster 7: Other Materials (3 terms)
钢材, 油漆, 防火涂料
- **V2 Coverage**: Not directly (raw materials, not fabricated products)
- **Action**: P2 / NOT A PAGE — these are input materials, not ZhongSai deliverables

---

## 3. 120 Application Terms — Final Clustering (7 Application Clusters)

### Cluster 1: Industrial & Manufacturing Buildings (~15 terms)
厂房, 车间, 工厂, 工业厂房, 生产车间, 装配厂, 冶炼钢厂, 混凝土搅拌站, 加工厂, 制造车间, 工业建筑, 生产厂房, 车间厂房, 工业厂房建筑, 钢结构厂房
- **V2 Coverage**: `/steel-workshop/` (detail page)
- **Action**: COVERED — Application Card with detail link

### Cluster 2: Warehousing & Logistics (~10 terms)
仓库, 仓储, 物流仓库, 停车场, 装卸平台, 月台, 停车棚, 物流中心, 仓储建筑, 仓库厂房
- **V2 Coverage**: `/steel-warehouse/` (detail page)
- **Action**: COVERED — Application Card with detail link

### Cluster 3: Agriculture & Livestock (~7 terms)
羊圈, 养鸡场, 养牛场, 养猪场, 养殖场, 农业大棚, 畜牧建筑
- **V2 Coverage**: Quote Action (no dedicated page yet)
- **Action**: QUOTE ACTION — P1 candidate for dedicated page

### Cluster 4: Commercial & Public Buildings (~20 terms)
超市, 购物中心, 展厅, 汽车4S店, 医院, 学校, 酒店, 写字楼, 体育馆, 会展中心, 商场, 商业建筑, 公共建筑, 展览馆, 图书馆, 剧院, 食堂, 办公楼, 商业综合体, 公共设施
- **V2 Coverage**: Quote Action (no dedicated page yet)
- **Action**: QUOTE ACTION — P1 candidate for dedicated page

### Cluster 5: Transportation & Infrastructure (~25 terms)
桥梁, 飞机场, 地铁, 高铁, 隧道, 码头, 港口, 人行天桥, 跨河桥, 车站, 候车亭, 登船桥, 隔音屏, 高速公路, 铁路, 轻轨, 高架桥, 立交桥, 收费站, 加油站, 公交站, 停车场棚, 过街天桥, 铁路站台
- **V2 Coverage**: Quote Action (no dedicated page yet)
- **Action**: QUOTE ACTION — P2 (too broad, needs GSC validation before dedicated pages)

### Cluster 6: Mining, Energy & Heavy Industry (~12 terms)
电站, 设备平台, 海工平台, 石油管架, 矿山输送, 电力能源, 矿山设备, 电厂设备, 烟囱, 支承架, 矿业厂房, 能源设施
- **V2 Coverage**: `/steel-mining-factory/` (detail page, upgraded from placeholder V2-08B)
- **Action**: COVERED — Application Card with detail link

### Cluster 7: Special & Custom Steel Structures (~20 terms)
异形结构, 旋转楼梯, LED显示屏钢结构, 雨棚, 夹层, 钢平台, 建筑幕墙, 采光罩, 穹顶, 广告牌钢结构, 艺术钢结构, 雕塑钢结构, 膜结构, 张拉膜, 空间桁架, 网架结构, 采光顶, 玻璃顶, 钢结构雨棚, 钢结构楼梯
- **V2 Coverage**: `/products/custom-engineering/` (detail page)
- **Action**: COVERED — Application Card with detail link to Custom Engineering

### Low-Relevance / Deferred Terms (not in navigation)
沙井盖, 街道家具, 城市家具, 人物雕塑, 公共艺术, 剪摺铁器, 马路伸缩缝, 石屎柱铁模板, 预制件铁模, 箱形渠桶滑模车
- **Action**: NOT A PAGE — outside ZhongSai core business scope

---

## 4. Current V2 Coverage Summary

| Layer | Pages | Status |
|-------|-------|--------|
| **Applications** | Workshop, Warehouse, Mining (3 detail) + 4 Quote Action | 7 Application Cards |
| **Components** | Beams&Columns, Cladding, Trusses(NEW), Purlins(NEW) | 4 detail pages + anchors |
| **Capabilities** | Custom Engineering, Detailing, Engineering Design, Manufacturing, Export Delivery | 5 pages |
| **Knowledge/AEO** | 5 Legacy Blog (EN only) + FAQ sections on core pages | Growing |

**Total indexable URLs**: ~65 (after V2-09A: +4 new pages = 69)

---

## 5. Pages Created in V2-09A

1. `/en/components/steel-trusses/` + `/zh/components/steel-trusses/`
   - Primary keyword: structural steel trusses
   - Covers: 桁架梁, 管桁架, 屋架梁, 钢屋架, 钢架

2. `/en/components/steel-purlins/` + `/zh/components/steel-purlins/`
   - Primary keyword: steel purlins (C purlins, Z purlins)
   - Covers: C型钢, Z型钢, 檩条
   - Sections: #c-purlins, #z-purlins

3. Anchors added to existing pages:
   - Beams & Columns: #steel-beams, #steel-columns, #box-sections, #crane-beams
   - Cladding: #roof-panels, #wall-panels, #sandwich-panels, #cladding-accessories

---

## 6. P1 — Post-Launch (30 Days)

| Priority | Topic | Rationale |
|----------|-------|-----------|
| P1-1 | Agricultural Steel Buildings page | Strong commercial intent, 7 application terms, no dedicated page |
| P1-2 | Commercial & Public Steel Structures page | 20 application terms, broad search intent |
| P1-3 | Steel Bracing & Connections page | 4 product terms, currently Quote Action only |
| P1-4 | Steel Trusses page content expansion | Add pipe truss technical depth |
| P1-5 | Blog: Steel Warehouse Cost Guide update | Existing legacy page, needs refresh |

---

## 7. P2 — SEO Growth (Long-term)

| Priority | Topic | Rationale |
|----------|-------|-----------|
| P2-1 | Transportation Infrastructure Steel page | 25 terms but too broad, needs GSC validation |
| P2-2 | Country Pages (Malaysia, Indonesia, Nigeria, etc.) | Regional SEO, needs real country content |
| P2-3 | Blog system expansion | Cost guides, design guides, import guides |
| P2-4 | Steel Grades & Material Standards guide | Technical knowledge content |
| P2-5 | Foundation & Installation technical guides | AEO content for "how to" queries |

---

## 8. Terms NOT Recommended for Pages

| Category | Terms | Reason |
|----------|-------|--------|
| Raw materials | 钢材, 油漆, 防火涂料 | Input materials, not ZhongSai deliverables |
| Street furniture | 沙井盖, 街道家具, 城市家具 | Outside core business |
| Public art | 人物雕塑, 公共艺术 | Outside core business |
| Construction tools | 剪摺铁器, 马路伸缩缝, 石屎柱铁模板 | Outside core business |
| Ranking terms | 十大厂家, 排名第一, 哪家最好 | Use "How to Choose" content instead, not doorway pages |

---

## 9. Products Final Application IA (V2-09A)

**Hero**: "Steel Structure Solutions by Building Application / 按项目应用选择钢结构方案"

**7 Application Cards**:
1. Industrial & Manufacturing Buildings → `/steel-workshop/` (detail)
2. Warehousing & Logistics → `/steel-warehouse/` (detail)
3. Agriculture & Livestock → Quote Action
4. Commercial & Public Buildings → Quote Action
5. Transportation & Infrastructure → Quote Action
6. Mining, Energy & Heavy Industry → `/steel-mining-factory/` (detail)
7. Special & Custom Steel Structures → `/products/custom-engineering/` (detail)

**Custom Engineering** moved OUT of application category → standalone capability module after Application cards.

---

## 10. Components Final IA (V2-09A)

**Primary Structural Members (6 cards)**:
- Steel Beams → anchor #steel-beams
- Steel Columns → anchor #steel-columns
- Box Sections → anchor #box-sections
- Crane Beams → anchor #crane-beams
- Steel Trusses → NEW detail page
- Platforms & Bracing → Quote Action

**Secondary Structural Members (4 cards)**:
- C Purlins → NEW page anchor #c-purlins
- Z Purlins → NEW page anchor #z-purlins
- Bracing System → Quote Action
- Connection Components → Quote Action

**Cladding Systems (4 cards)**:
- Roof Panels → anchor #roof-panels
- Wall Panels → anchor #wall-panels
- Sandwich Panels → anchor #sandwich-panels
- Cladding Accessories → anchor #cladding-accessories

**Dead cards**: 0 (all 14 cards have explicit action)

---

## 11. Capabilities IA (unchanged)

- Custom Engineering & Fabrication → `/products/custom-engineering/`
- Structural Steel Detailing → `/services/structural-steel-detailing/`
- Engineering Design → `/engineering-design/`
- Manufacturing Quality → `/manufacturing-quality/`
- Export Delivery → `/export-delivery/`

---

## 12. Knowledge / AEO IA

**Existing Legacy Blog (5 EN-only pages)**:
1. How to Import Steel Structure from China — Complete Guide
2. How to Import Steel Structure from China to Africa
3. Shipping Cost Steel Structure from China
4. Steel Structure Container Loading Guide
5. Steel Warehouse Cost — Complete Guide

**AEO Question Blocks on core pages**:
- Products Hub: 4 FAQ (quotation info, component-only supply, local construction boundary, cost factors)
- Components Hub: FAQ
- Trusses page: 4 FAQ
- Purlins page: 4 FAQ
- Beams & Columns: FAQ
- Cladding: FAQ

**AEO Question Types covered**:
- What is X?
- What information is needed for quotation?
- What is the difference between A and B?
- How are products supplied from China?
- What affects cost/price?
- How to choose a manufacturer?
- What drawings are required?

---

## 13. Keyword Cannibalization Prevention

| Risk | Mitigation |
|------|------------|
| "steel structure" appears on every page | Each page has unique primary intent + H1 + title |
| Workshop vs Warehouse overlap | Distinct H1, distinct hero, distinct body focus |
| Components vs Products confusion | Products = by application, Components = by member type (clear labels added V2-07D) |
| Custom Engineering vs Detailing vs Engineering Design | 3-stage guide added V2-07D to clarify relationship |
| Trusses vs Beams overlap | Trusses page focuses on truss-specific fabrication, beams page on H/box sections |
| C Purlins vs Z Purlins | Same page with distinct #c-purlins and #z-purlins sections + comparison table |

---

## 14. Important Constraints

- **No GSC data**: All value classifications are PROVISIONAL. Need GSC performance export to validate.
- **No fixed prices**: Cost/price terms are addressed with "what affects price" content, never fixed $/m².
- **No ranking claims**: Recommendation/ranking terms mapped to "How to Choose" content, never "top 10" doorway pages.
- **No local construction claims**: All pages clarify ZhongSai = manufacturer + export supplier, local erection by customer/local team.
- **AI images labeled**: All AI-generated visuals marked as "Application Illustration / 应用示意图" or "Product Illustration", never presented as real ZhongSai project photos.

---

## 15. Files Generated

- `tools/seo-keywords/keyword-source-audit.csv` — 482 keyword entries from Excel
- `tools/seo-keywords/seo-aeo-architecture.md` — this document
- `tools/seo-keywords/seo-content-map.csv` — page-to-keyword mapping
- `tools/seo-keywords/seo-growth-backlog-keywords.csv` — P1/P2 keyword backlog
- `tools/qa/component-navigation-map.csv` — 14 component cards with action types and targets
