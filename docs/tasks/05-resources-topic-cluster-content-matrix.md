# TASK-05: Resources 内容中心 + Topic Cluster + SEO/GEO 内容矩阵建设

> 优先级: P2
> 状态: 待执行（已收到任务要求，排队中）
> 创建日期: 2026-09-09
> 前置任务: TASK-01~04
> 部署规则: 完成后部署到Preview，不部署Production，等用户允许上线

---

## 任务目标

这一阶段才开始系统规划"写什么内容"，但重点不是堆博客数量，而是围绕核心产品和客户决策路径建立内容资产。

建立：**核心商业页面 ↓ 专业Guide ↓ 客户问题 ↓ 案例 ↓ FAQ ↓ 内部链接 ↓ 询盘**

形成真正能够长期积累权重的内容体系。

---

## 核心原则

- 不是每周随便发几篇博客
- 不是批量生成几十篇AI文章
- 不是为了收录制造大量关键词页面

每一篇新内容必须至少服务一个目标：SEO、GEO、AEO、客户教育、供应商尽调、采购决策、销售转化、产品页支持、案例支持、品牌权威。

如果一篇内容没有明确作用，不要创建。

---

## 一、先审计现有全部Resources / Blog

扫描所有 `/en/resources/`、`/zh/resources/`、Blog、Guide、Article、FAQ、Knowledge、Technical Article、Import Guide、Cost Guide、Installation Guide相关页面。

生成：`RESOURCE_AUDIT.csv`

字段：
- URL、Language、Title、H1
- Primary Keyword、Secondary Keywords、Search Intent
- Content Type、Target Audience、Target Product
- Word Count、Content Quality
- Original Evidence、First-party Data
- Internal Links、External Sources、CTA
- Traffic Potential、Commercial Value、GEO Value
- Cannibalization Risk、Freshness
- Recommended Action（KEEP / UPDATE / EXPAND / MERGE / REPOSITION / 301 / DELETE / NEW VERSION）

---

## 二、先清理旧内容，再新增

本阶段不能马上新增文章，优先找出：
- 语法不自然
- 明显AI批量内容
- 重复主题
- 多个文章争同一关键词
- 薄内容
- 没有用户价值
- 内容过时
- 标题很奇怪
- 没有真实信息
- 完全没有内链
- 没有CTA

例如："How To Steel Structure Cost"这类标题必须处理。

---

## 三、建立内容类型体系

Resources不要所有内容都叫Blog，建议分为：
- **Guides**：深度指南（Steel Structure Buyer's Guide）
- **Cost Guides**：成本与报价因素
- **Design Guides**：设计参数
- **Import & Shipping**：进口、装柜、运输
- **Installation**：安装与技术指导
- **Quality & Inspection**：生产与质量
- **Comparison**：对比类内容
- **FAQs**：客户常见问题
- **Case Insights**：从真实项目提炼的经验

---

## 四、建立核心Pillar Pages

优先建立少量高质量Pillar，建议第一批：
1. Steel Structure Buyer's Guide
2. Steel Warehouse Guide
3. Steel Workshop Guide
4. Import Steel Structure from China Guide
5. Steel Structure Manufacturing & Quality Guide
6. Steel Structure Shipping & Container Loading Guide
7. Steel Structure Installation Guide
8. How to Choose a Steel Structure Manufacturer in China

Pillar Page必须是：长期维护、内容完整、内链中心、权威页面，而不是普通800字文章。

---

## 五、建立Topic Cluster

### Cluster 1：Steel Warehouse
- Pillar：Steel Warehouse Guide
- 支持内容：Steel Warehouse Cost、Span、Height、Insulation、Roof Options、Design Loads、Foundation Requirements、Installation、Shipping、vs Concrete Warehouse、Quotation Requirements
- 所有内容最终支持：`/en/steel-warehouse/`

### Cluster 2：Steel Workshop
- Pillar：Steel Workshop Guide
- 支持内容：Steel Workshop Cost、Workshop Span Guide、Workshop with Crane、Industrial Workshop Design、Workshop Ventilation、Workshop Roof & Wall Systems、Workshop Fire Protection Considerations、Workshop Installation、Workshop Shipping、Steel Workshop vs Concrete Factory
- 最终支持：`/en/steel-workshop/`

### Cluster 3：China Supplier
- 核心商业主题：China Steel Structure Manufacturer
- 支持内容：How to Choose a Steel Structure Manufacturer in China、How to Verify a Steel Structure Factory、Steel Structure Factory Audit Checklist、What Certificates Should a Steel Structure Supplier Provide、Manufacturer vs Trading Company、What Documents Should You Request Before Ordering、How Steel Structure Quality Is Inspected、How to Check Welding Quality、How to Review Shop Drawings
- 最终支持：Homepage、About、Manufacturing & Quality

### Cluster 4：Import
- 建立：Import Steel Structure from China
- 支持内容：Import Process、Shipping Documents、Container Loading、Packing、HS Code、Customs Documents、Destination Port、Incoterms、Sea Freight Factors、How Many Containers Are Required、Import Mistakes、Installation After Delivery
- 注意：涉及海关、税率、法律、进口政策必须注明具体要求因国家和时间而变化，不得把易变化信息写成永久事实。

### Cluster 5：Cost
- 高搜索需求方向，但禁止写虚假$30/m² $50/m² $80/m²作为万能价格
- 建立：Steel Structure Cost Guide
- 解释：Building Size、Span、Height、Steel Grade、Design Load、Wind Load、Snow Load、Seismic Load、Crane、Roof System、Wall System、Insulation、Surface Treatment、Fireproofing、Shipping、Installation Conditions
- 目标：让客户理解为什么必须提供项目参数才能报价，同时引导Send Your Drawings / Get Preliminary Quotation

### Cluster 6：Quotation
- 重点做高商业价值内容：
  - What Information Is Needed for a Steel Structure Quotation?
  - How Steel Structure Quotations Are Calculated
  - What Should Be Included in a Steel Structure Supplier Quote?
  - How to Compare Steel Structure Quotations
  - Why Two Steel Structure Quotes Can Be Very Different
- 这类内容SEO价值高、GEO价值高、销售价值高

### Cluster 7：Design
- 建立：Steel Structure Design Inputs
- 内容：Wind Load、Snow Load、Seismic Design、Building Codes、Span、Column Spacing、Crane Load、Mezzanine Load、Roof Load、Foundation Interface、Connection Design、Shop Drawings
- 不要把内容写成结构工程设计教程，中赛网站目标是帮助采购方理解需要提供哪些条件。

### Cluster 8：Manufacturing
- 内容：Steel Structure Fabrication Process、Steel Cutting、H-beam Fabrication、Welding、Assembly、Shot Blasting、Painting、Galvanizing、Dimensional Inspection、Weld Inspection、Material Traceability、Packing
- 必须尽量配真实工厂图片、真实流程、真实检测记录，而不是纯文字。

### Cluster 9：Quality
- 建议：Steel Structure Quality Inspection Checklist、How to Inspect Steel Structure Welding、What Is a Mill Test Certificate?、What Is Material Traceability?、Steel Structure Surface Treatment Guide、Steel Structure Painting vs Galvanizing、How to Inspect Steel Components Before Shipping、Third-party Inspection for Steel Structure Projects
- 这类非常适合AI引用、采购决策、供应商尽调。

### Cluster 10：Shipping
- 建立：How Steel Structures Are Packed for Export、Steel Structure Container Loading Guide、40HQ vs 40GP for Steel Structure Shipping、How Steel Components Are Numbered、How to Prevent Damage During Shipping、How Many Containers Does a Steel Structure Project Need?、What Export Documents Are Required?
- 优先加入真实装柜照片、真实包装照片、编号方式、实际项目经验。

### Cluster 11：Installation
- 内容：Steel Structure Installation Process、What Drawings Are Needed for Installation、Installation Sequence、Bolt Installation、Column Erection、Beam Installation、Bracing、Roof Panels、Wall Panels、Quality Checks、Common Installation Mistakes
- 明确：ZhongSai提供安装技术指导，不要写成ZhongSai承接当地安装施工。

---

## 六、Comparison内容

Comparison是重要SEO + GEO类型，优先：
- Steel Structure vs Reinforced Concrete
- Steel Warehouse vs Concrete Warehouse
- Steel Workshop vs Concrete Factory
- Welded Connection vs Bolted Connection
- Galvanizing vs Painting
- PU Sandwich Panel vs Rock Wool Panel
- Portal Frame vs Truss Structure
- China Manufacturer vs Local Steel Supplier

必须保持客观，不能为了卖产品故意贬低另一方案。

---

## 七、FAQ内容库

建立独立：`FAQ_DATABASE.csv`

来源：销售、网站表单、微信、WhatsApp、Meta Leads、客户会议、项目沟通

字段：
- Question、Category、Customer Stage、Answer、Related Product、Related Guide、Related Case、Language、Last Reviewed、Technical Reviewer

---

## 八、Search Intent分类

所有内容必须标注：
- Informational（"What is a steel warehouse?"）
- Commercial Investigation（"How to choose steel structure supplier China?"）
- Transactional Support（"What information is needed for quotation?"）
- Post-purchase（"How to install steel structure columns?"）

---

## 九、客户决策阶段分类

建立：Awareness、Research、Comparison、Supplier Verification、Quotation、Purchase、Shipping、Installation

内容矩阵不能只覆盖Awareness，重点覆盖Supplier Verification、Quotation、Purchase、Shipping这些离询盘更近的阶段。

---

## 十、优先商业价值，不只看搜索量

内容优先级评分：Traffic Potential × Commercial Value × GEO Value × First-party Evidence ÷ Difficulty

不要看到高搜索量就优先做。

---

## 十一、建立CONTENT_MASTER_PLAN.csv

字段：
- Topic、Primary Keyword、Secondary Keywords、Language、Intent、Customer Stage
- Content Type、Pillar、Target Product、Related Project
- Business Value、SEO Opportunity、GEO Opportunity、Evidence Available
- Priority、Status、Target URL

---

## 十二、优先级规则

- **P0**：高商业价值 + 直接支持核心产品 + 客户真实常问
- **P1**：中高搜索潜力 + 有专业经验
- **P2**：长尾知识内容
- **P3**：品牌教育和行业拓展

---

## 十三、第一批不要超过15个主题

禁止一次生成100篇内容，第一批建议只选10-15个。写完、发布、收录、观察后再继续。

### 第一批建议主题
1. How to Choose a Steel Structure Manufacturer in China
2. What Information Is Needed for a Steel Structure Quotation?
3. Steel Warehouse Cost: Key Factors That Affect Pricing
4. Steel Workshop Cost: What Buyers Need to Know
5. How Steel Structures Are Packed for Export
6. Steel Structure Container Loading Guide
7. How to Verify a Steel Structure Factory in China
8. Steel Structure Quality Inspection Checklist
9. What Documents Should a Steel Structure Supplier Provide?
10. Steel Structure Installation Process
11. Steel Structure Painting vs Galvanizing
12. Steel Warehouse vs Concrete Warehouse
13. How to Import Steel Structures from China
14. Common Mistakes When Buying Steel Structures from China
15. How to Compare Steel Structure Supplier Quotations

最终以Keyword Map和现有内容为准，如果现有页面已经覆盖，不能重复创建。

---

## 十四、内容标准结构

每篇Guide建议：
- H1
- Quick Answer
- Introduction
- 核心问题
- 步骤 / 因素
- 表格
- 真实经验
- 项目示例
- 常见错误
- FAQ
- Related Products
- Related Projects
- CTA

不要所有文章机械套同一模板。

---

## 十五、Quick Answer

GEO / AEO内容建议开头给明确回答。

例如："What information is needed for a steel structure quotation?"

直接回答：至少需要Project location、Building dimensions、Span、Height、Design code、Wind load、Snow load、Seismic requirement、Crane requirements、Roof / wall specification、Drawings if available、Destination port，然后再详细解释。

---

## 十六、事实优先

每篇内容应尽可能包含：数据、流程、表格、真实照片、案例、技术参数、检查表、实际项目经验。

减少：excellent、professional、high quality、world-class、best choice、leading supplier这类无证据词。

---

## 十七、第一方经验

优先加入：
- From ZhongSai project experience
- From our manufacturing process
- Based on our export packing practice
- Based on project drawings we commonly receive

但必须是真实经验。

---

## 十八、引用外部权威来源

必要时引用：ISO、EN、AISC、AWS、ASTM、当地政府、海关、港口、官方标准机构。

不要引用低质量SEO网站、竞争对手文章、AI生成内容作为核心权威来源。

涉及法规、税率、标准、进口政策、认证、海运，必须检查发布日期，内容必须标注Last Updated。

---

## 十九、作者与技术审核

重要技术内容：
- Prepared by: ZhongSai Steel Structure Content / Engineering Team
- Technical Review: ZhongSai Engineering Team

根据真实组织设置，禁止虚构工程师身份。

---

## 二十、Article Schema

Resource页面使用：Article、BreadcrumbList，必要时FAQPage。

Article Schema包含：headline、description、image、author、publisher、datePublished、dateModified、mainEntityOfPage，必须与页面真实内容一致。

FAQPage只用于页面实际显示的FAQ，不能页面没有FAQ但后台Schema塞几十个问题。

---

## 二十一、内容与产品内链

每篇内容必须明确它支持哪个商业页面：
- Steel Warehouse Cost → /en/steel-warehouse/
- How to Choose Manufacturer → Homepage + About + Manufacturing & Quality

商业页面反向链接Resources：例如Steel Warehouse页面Related Guides：Steel Warehouse Cost、Warehouse Design Inputs、Warehouse Installation，形成Product ↔ Guide。

Guide与Project连接：Guide中加入Real Project Example链接真实案例，案例中Related Technical Guide链接相关Resources，形成Product ↔ Guide ↔ Project。

---

## 二十二、避免关键词蚕食

创建内容前必须搜索site.com + keyword，确认是否已有页面。如果已有，判断Update existing还是New page，禁止自动认为新文章一定更好。

---

## 二十三、标题标准

标题必须自然，避免Ultimate、Best、Complete Ultimate Guide、Top 10、2026 Best过度使用。

可以使用：
- Steel Warehouse Cost: Key Factors Buyers Should Consider
- How to Choose a Steel Structure Manufacturer in China
- Steel Structure Container Loading: A Practical Guide for Overseas Buyers

---

## 二十四、URL

英文：简洁、小写、短、不要日期，例如 `/en/resources/steel-warehouse-cost/`，不要 `/en/resources/2026-best-complete-ultimate-steel-warehouse-cost-guide-china/`

中文URL：不要继续大量使用拼音，如果现有架构允许，使用统一英文slug，例如 `/zh/resources/steel-warehouse-cost/`，由语言目录区分。但不要因为本阶段优化批量修改已有有流量URL，已有URL改动必须经过迁移评估。

---

## 二十五、中文内容必须本地化

中文目标用户重点是：海外华人企业主、海外中资企业、承包商、包工头、工程负责人。

内容可以直接使用他们习惯表达：海外建厂、钢结构厂房、中国采购、装柜出口、海运、图纸深化、报价、安装指导，不要只是英文文章机器翻译。

---

## 二十六、CTA与内容阶段匹配

- Informational：View Related Guide、Explore Steel Warehouse Solutions
- Commercial：Send Your Drawings、Request Project Review
- Quotation：Get Preliminary Quotation
- Supplier Verification：View Factory、View Certifications、View Projects

不要所有文章强卖，Resources首要是帮助用户解决问题，如果每三段Contact Us / Request Quote会降低内容可信度。CTA保持自然、相关、不过度。

---

## 二十七、内容更新机制

建立：`CONTENT_UPDATE_LOG.csv`

字段：URL、Published Date、Last Updated、Reason、Changes、Traffic Before、Traffic After、Ranking Before、Ranking After

避免文章发完永远不管。

定期检查：排名下降、曝光下降、CTR下降、信息过时、竞争页面增强、内容数据过时，建议更新、扩展、合并、重新内部链接。

---

## 二十八、AEO优化

重点问题型内容：What、Why、How、How much、Which、Difference between、What information、What documents、What standards，答案开头明确，不要绕几百字才回答。

AI引用友好结构：优先使用Definition、Quick Answer、Key Takeaways、Steps、Checklist、Table、Comparison、FAQ、Project Example、Sources、Last Updated。

---

## 二十九、内容唯一性

Warehouse和Workshop不能只是替换产品名称：
- Warehouse更关注：Storage、Rack layout、Clear height、Loading doors、Insulation、Logistics
- Workshop更关注：Production lines、Cranes、Equipment layout、Ventilation、Industrial workflow

---

## 三十、严禁程序化垃圾内容

不能自动创建每个跨度一个页面（30m steel warehouse、40m steel warehouse、50m steel warehouse），不能每个国家+每个产品批量组合（Steel Warehouse Malaysia、Steel Warehouse Indonesia、Steel Warehouse Thailand）如果没有独立价值。

国家内容单独进入下一阶段（第六阶段：多语言国际SEO + 国家/地区页面 + Localization体系），本阶段只规划，不大规模执行Country Pages。

---

## 三十一、每篇内容发布前验收

检查：Search Intent、Primary Keyword、Title、Meta、H1、Structure、Unique Value、Facts、Sources、Images、Alt、Caption、Internal Links、CTA、FAQ、Schema、Canonical、hreflang、Desktop、Mobile

发布后验收：200、Canonical、Sitemap、Indexability、Internal Link、Schema、Mobile Rendering、Page Speed，并记录发布日期。

---

## 三十二、本阶段交付文件

最终输出：
- RESOURCE_AUDIT.csv
- CONTENT_MASTER_PLAN.csv
- FAQ_DATABASE.csv
- TOPIC_CLUSTER_MAP.csv
- CONTENT_UPDATE_LOG.csv

TOPIC_CLUSTER_MAP字段：Pillar、Cluster Article、Primary Keyword、Search Intent、Target Product、Related Project、Internal Link To、Internal Link From、Priority、Status

---

## 三十三、第一阶段内容执行数量

不要一次完成全部，先选5个最有价值主题，完成写作、页面制作、Schema、内链、桌面、移动真实验收后，再做下一批。

内容质量优先：目标不是100篇文章，而是30篇真正有采购价值和专业价值的内容，长期可能比300篇普通AI博客更有价值。

---

## 三十四、本阶段最终网站结构

最终形成：
```
Homepage
↓
Products
↓
Steel Workshop  Steel Warehouse  Other Core Products
↓
Guides
↓
Projects
↓
Contact
```

同时Guide ↔ Product ↔ Project ↔ FAQ互相形成主题网络。

---

## 三十五、最终验收标准

本阶段完成后：
- 每个核心产品拥有清晰Topic Cluster
- Resources不再是随机博客集合
- 每篇文章有明确搜索意图
- 每篇文章有明确商业关联
- 没有明显关键词蚕食
- 内容有第一方经验
- 内容有事实和证据
- AI能直接提取明确答案
- 用户可以从知识内容自然进入产品页
- 最终可以进入图纸提交 + 项目评估 + 询盘

---

## 最终目标

把Resources从"为了SEO更新文章"升级成：**搜索流量入口 + AI引用知识库 + 客户教育中心 + 供应商尽调资料库 + 销售辅助工具 + 核心产品权重支持系统**

最终形成：**Search → Answer → Authority → Product → Proof → Lead**

再下一条进入第六阶段：多语言国际SEO + 国家/地区页面 + Localization体系，专门解决马来西亚、印尼、巴西、墨西哥、沙特、尼日利亚等目标市场应该怎么做，而不是简单复制"国家名 + Steel Structure"。

---

## 执行进度

- [ ] 审计现有全部Resources / Blog（RESOURCE_AUDIT.csv）
- [ ] 清理旧内容（语法不自然、AI批量、重复、薄内容、过时）
- [ ] 建立内容类型体系（Guides / Cost / Design / Import / Installation / Quality / Comparison / FAQ / Case Insights）
- [ ] 建立核心Pillar Pages（8个）
- [ ] 建立Topic Cluster（11个Cluster）
- [ ] 建立FAQ_DATABASE.csv
- [ ] 建立CONTENT_MASTER_PLAN.csv
- [ ] 建立TOPIC_CLUSTER_MAP.csv
- [ ] 建立CONTENT_UPDATE_LOG.csv
- [ ] 选择第一批5个最有价值主题
- [ ] 完成5篇内容写作、页面制作、Schema、内链
- [ ] 桌面端验收
- [ ] 移动端验收
- [ ] 部署到Preview
- [ ] 等待用户允许上线
