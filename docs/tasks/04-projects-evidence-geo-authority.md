# TASK-04: Projects 案例体系 + 第一方证据 + GEO 权威性建设

> 优先级: P1
> 状态: 待执行（已收到任务要求，排队中）
> 创建日期: 2026-09-09
> 前置任务: TASK-01 技术SEO、TASK-02 关键词地图、TASK-03 核心页面优化
> 部署规则: 完成后部署到Preview，不部署Production，等用户允许上线

---

## 任务目标

把中赛网站从"自我介绍型官网"升级成"有证据、可验证、AI更愿意引用、客户更容易信任"的网站。

建立完整的：**案例证据体系 + 第一方经验体系 + 第一方数据体系 + 项目实体体系 + AI可引用内容体系**

---

## 核心原则

不要把GEO理解成"多写FAQ"、"多加Schema"、"文章写得像AI答案"。

真正有效的GEO核心是：**真实公司 + 真实业务 + 真实项目 + 真实数据 + 真实图片 + 真实经验 + 清晰结构 + 可验证证据**

### 本阶段禁止
- 虚构案例
- 虚构客户
- 虚构项目国家
- 虚构吨位
- 虚构金额
- 虚构合作范围
- 虚构认证
- 虚构媒体报道
- 虚构客户评价
- 虚构排名
- 虚构奖项

---

## 一、审计现有所有Projects

扫描 `/en/projects/`、`/zh/projects/` 以及所有Project Detail相关URL。

生成：`PROJECT_AUDIT.csv`

字段：
- URL
- 语言
- Project Name
- Country / Region
- Project Type
- Year
- Steel Tonnage
- Client
- ZhongSai Scope
- 是否有真实图片
- 是否有生产图片
- 是否有发货图片
- 是否有安装图片
- 是否有图纸
- 是否有数据
- 证据完整度
- 真实性风险
- 当前SEO Value
- 当前GEO Value
- 建议动作（KEEP / UPDATE / EXPAND / MERGE / ARCHIVE / REMOVE / VERIFY_FIRST）

---

## 二、案例真实性分级

### Level A：强证据案例
至少拥有多项：项目名称、国家/地区、年份、项目类型、钢结构吨位、图纸、生产照片、装柜照片、现场照片、交付照片、项目文件、中赛参与范围。

这类案例优先制作完整Case Study。

### Level B：中等证据案例
例如只有项目名称、地点、类型、部分照片、参与范围，但缺少部分数据。

可以保留，不得补编不存在的数据。

### Level C：弱证据案例
只有项目名、效果图、少量描述，无法确认中赛参与范围。

不要包装成核心案例，必须VERIFY_FIRST或只作为历史项目记录。

---

## 三、明确ZhongSai Scope

每个项目必须回答：中赛到底负责了什么？

可选范围根据真实情况填写：
- Structural Design Coordination
- Shop Drawing Detailing
- Steel Fabrication
- Steel Component Manufacturing
- Secondary Steel Supply
- Roof / Wall System Supply
- Surface Treatment
- Quality Inspection
- Packing
- Container Loading
- Export Documentation
- Shipping Coordination
- Installation Technical Guidance

严禁笼统写"ZhongSai completed the project"，如果实际上只是钢结构制造+供货。

---

## 四、项目角色必须区分

### 情况A：中赛当前公司直接承接供货
可以表述：ZhongSai Scope

### 情况B：中赛团队过往项目经验
必须明确：Project experience completed by members of the current ZhongSai technical / manufacturing team before the establishment of the current export company.

### 情况C：关联工厂历史项目
必须明确：Manufacturing project completed by the associated production entity / manufacturing team.

不能让客户误认为深圳市中赛钢结构进出口有限公司直接签署并完成了整个项目。

---

## 五、Projects总页重构

Projects总页不能只是图片墙。

建议结构：
- H1: Steel Structure Project Experience
- Intro：说明案例涵盖Industrial、Warehouse、Commercial、Infrastructure、Mining、Energy、Agriculture、Special Structures
- 增加筛选：By Industry、By Country / Region、By Structure Type、By Project Scope
- 每个项目卡片显示：Project Name、Country、Project Type、ZhongSai Scope、Year、可选Steel Tonnage
- CTA：View Project Details、View Similar Projects、Discuss Your Project

---

## 六、案例详情页标准模板

每个重点案例使用以下结构：
1. Project Overview（项目名称、地点、年份、结构类型、建筑用途、钢结构吨位、项目状态）
2. Client Requirement（客户需要解决什么问题，不要写空话）
3. Project Challenges（真实项目难点）
4. ZhongSai Scope（单独设置模块，明确列出）
5. Engineering / Detailing（如果有真实资料，展示GA Drawing、Shop Drawing等，必须处理客户敏感信息）
6. Manufacturing Process Evidence（Raw Material、Cutting、Assembly、Welding、Shot Blasting、Painting、Inspection、Packing、Loading）
7. Shipping Evidence（Number of Containers、Container Type、Loading Method、Packaging Method、Port of Loading、Destination Country）
8. Installation Technical Guidance（Remote Guidance、On-site Technical Guidance、Installation Drawing、Video Support，不得表达成中赛承接当地施工）
9. Final Result
10. Project Data（Location、Building Type、Steel Tonnage、Span、Building Area、Year、Steel Grade、Surface Treatment、Export Destination、ZhongSai Scope）
11. Related Solutions
12. CTA

---

## 七、第一方证据库

建立统一的证据分类：
- Factory
- Manufacturing
- Quality Inspection
- Certification
- Packing
- Container Loading
- Drawings
- Projects
- Installation Guidance
- Export Documentation

---

## 八、图片资产建立Metadata

建立：`IMAGE_ASSET_DATABASE.csv`

字段：
- File Name
- Project
- Country
- Year
- Category
- Description
- Can Publish
- Third-party Logo
- Need Crop
- Need Blur
- Alt Text
- Caption
- Source

以后网站禁止不知道图片来自哪里就随便用。

---

## 九、品牌与第三方Logo处理

网站公开页面不得出现其他公司的品牌Logo。

如果原图包含客户Logo、施工方Logo、供应商Logo、第三方公司名称：
- 允许对网页副本裁剪、遮挡、局部处理
- 原始证据文件保持不动
- 不得篡改项目主体

---

## 十、第一方数据建设

建立可以持续积累的数据类型：
- Annual Capacity
- Factory Area
- Employees
- Countries Served
- Projects Delivered
- Steel Tonnage
- Containers Shipped
- Average Project Size
- Typical Production Cycle
- Inspection Records
- Export Destinations

注意：不是所有数据都必须公开，但公开数据必须真实、有来源、有更新日期。

---

## 十一、建立Statistics Source

建议建立内部：`COMPANY_FACTS.json`

网站所有页面调用统一数据源，不要出现首页15年、About 20年、广告18年这种口径不一致。

---

## 十二、建立Company Entity Page

About页面继续强化为公司实体中心，需要清楚写：
- Company Legal Name
- Brand
- Business Type
- Headquarters
- Manufacturing Base
- Business Scope
- Markets
- Main Products
- Certifications
- Contact Method

避免AI无法判断中赛是施工公司、贸易公司、工厂、设计院还是总包。必须明确：Steel Structure Manufacturer & Export Supplier

---

## 十三、实体关系

明确中赛与Manufacturing Base、Associated Factory、Engineering Team、Export Company之间关系。

如果存在多个法律主体，必须准确说明，不要为了品牌简单而掩盖实际主体关系。

---

## 十四、作者体系

Resources重要文章建议增加作者信息，作者必须是真实：
- ZhongSai Engineering Team
- ZhongSai Export Team
- 或具体人员

不要编造专家名字。如果使用团队作者，增加Author / Reviewed by。

---

## 十五、建立GEO引用型内容

优先制作：定义、流程、对比、成本因素、设计参数、采购流程、运输流程、案例数据。

而不是泛文章。例如：
- What Information Is Required for a Steel Structure Quotation?

内容可以直接回答：Location、Building Size、Span、Height、Design Code、Wind Load、Snow Load、Seismic Requirement、Crane、Roof / Wall、Drawings、Surface Treatment、Destination Port

---

## 十六、建立"采购决策内容"

优先：
- How to Choose a Steel Structure Manufacturer in China
- How to Verify a Steel Structure Factory
- What Documents Should a Steel Structure Supplier Provide
- How Steel Structures Are Packed for Export
- Steel Structure Container Loading Guide
- Steel Structure Inspection Checklist
- Steel Structure Shop Drawing Process

这些比"Top 10 Benefits of Steel Structures"价值高得多。

---

## 十七、第一方照片优先级

网站图片使用优先级：
1. 真实项目照片
2. 真实工厂照片
3. 真实生产照片
4. 真实发货照片
5. 真实图纸
6. 真实效果图
7. AI辅助示意图

AI图不能冒充实际项目、实际工厂、实际客户案例。

---

## 十八、AI图标识

如果某张图片明显是AI Concept、Rendering、Concept Design，建议适当标识：Concept rendering、Illustrative rendering。不要让客户误认为实拍案例。

---

## 十九、FAQ从真实销售问题提炼

建立：`SALES_FAQ_DATABASE.csv`

来源：Meta Leads、WhatsApp、WeChat、Email、Sales Team、Website Forms

分类：Design、Pricing、Manufacturing、Quality、Shipping、Customs、Installation、Payment、Project Timeline、Certification

不能公开客户隐私：姓名、电话、微信、WhatsApp、邮箱、项目详细地址、合同金额、未公开图纸、客户公司敏感信息。

---

## 二十、Schema强化

- Projects页面：BreadcrumbList、ItemList
- Project Detail：Article或CreativeWork
- Resource：Article
- Organization：统一实体信息

不得通过Schema声明网页上不存在的信息。

---

## 二十一、Organization Schema

统一：name、alternateName、url、logo、description、sameAs、contactPoint、areaServed、foundingDate、certification。

sameAs只加入官方账号：Facebook、Instagram、YouTube、LinkedIn、TikTok、其他真实官方账号。禁止链接非官方页面。

---

## 二十二、案例与产品内链

每个项目必须链接到相关产品：
- Warehouse Case → Steel Warehouse
- Industrial Plant → Steel Workshop / Industrial Manufacturing
- Mining Project → Mining Steel Structure

产品页也要Related Projects，形成双向关系。

---

## 二十三、案例与Resource内链

例如：
- 某海外装柜案例 → Container Loading Guide
- 大型厂房案例 → Steel Workshop Design Guide

形成Product ↔ Project ↔ Guide三层实体关系。

---

## 二十四、增加"Factory Verification"

建立或强化Factory Verification模块，回答海外客户常问：
- Can I visit your factory?
- Can you provide factory videos?
- Can you provide production records?
- Can we arrange third-party inspection?
- Can you provide material certificates?

只保留真实可以提供的服务。

---

## 二十五、第三方验厂

如果真实支持SGS、BV、TÜV、客户指定第三方，可以写：Third-party inspection can be coordinated based on project requirements.

但不能写SGS Certified Factory，除非真的有该认证。

---

## 二十六、证书详情页

重要认证可以建立Certification / Qualification页面，包含：
- Certificate Name
- Certificate Holder
- Certificate Number
- Scope
- Validity
- Issuer
- Certificate Image

并说明具体适用范围。

---

## 二十七、最终建立以下数据库

本阶段结束至少形成：
- PROJECT_DATABASE.csv
- PROJECT_COUNTRY_DATABASE.csv
- IMAGE_ASSET_DATABASE.csv
- COMPANY_FACTS.json
- SALES_FAQ_DATABASE.csv
- CERTIFICATION_DATABASE.csv

不要把这些数据库全部公开，主要用于保持网站事实统一、后续自动生成页面、内容更新、广告素材、销售资料、GEO。

---

## 二十八、优先执行案例

不要一次整理全部项目，第一批选择5-10个最强案例。

优先标准：证据多、图片好、项目类型重要、目标市场重要、客户决策价值高、能够体现中赛能力。

最好覆盖：Industrial Workshop、Warehouse、Mining / Energy、Commercial / Public、Special Structure、海外出口项目。

案例质量优先于数量：宁可10个非常完整案例，也不要100个只有一张图片和三句话的页面。

---

## 二十九、GEO核心页面优先级

### P0
- About
- Manufacturing & Quality
- Projects
- 5-10个核心Case Study

### P1
- 核心产品页
- Certification
- Factory Verification
- Packing & Loading

### P2
- Resource专业Guide
- FAQ
- Comparison
- Technical Guide

### P3
- 国家页
- 行业专题页
- 长期数据内容

---

## 三十、真实页面验收

每一个案例页面必须检查：
- Desktop
- Mobile
- Title
- H1
- Project Data
- 图片
- Caption
- Alt
- 内链
- CTA
- Schema
- Breadcrumb
- 语言版本
- 第三方Logo
- 隐私信息
- 真实性声明

---

## 三十一、最终输出GEO Authority Report

完成后生成：`GEO_AUTHORITY_REPORT.md`

包含：
- Company Entity：公司实体完整度
- Project Evidence：案例证据完整度
- First-party Data：当前拥有的数据
- Certifications：认证完整度
- Manufacturing Evidence：制造证据
- Export Evidence：出口证据
- Content Authority：专业内容
- AI Citation Readiness：哪些页面最适合被AI引用
- Missing Evidence：当前最缺什么

---

## 三十二、最终判断标准

完成本阶段后，一个第一次访问网站的人应该能明确确认：
- 中赛是谁
- 公司做什么
- 服务哪些市场
- 有哪些真实生产能力
- 做过哪些项目
- 每个项目中负责什么
- 如何生产
- 如何检测
- 如何出口
- 如何装柜
- 是否提供安装技术指导
- 有哪些认证
- 如何提交项目

AI搜索也应该能够准确总结：ZhongSai Steel Structure is a China-based steel structure manufacturer and export supplier supporting overseas projects with engineering coordination, detailing, fabrication, quality inspection, packing, export documentation and installation technical guidance.

---

## 最终目标

把网站从"我们说自己很专业"升级成"网站有足够的真实证据证明我们专业"。

最终形成：**Brand Entity + First-party Evidence + Project Experience + Manufacturing Evidence + Technical Knowledge + Structured Data + Internal Linking**

让Google更信任、AI更容易理解和引用、客户更容易完成供应商尽调、销售更容易成交。

---

## 执行进度

- [ ] 审计现有所有Projects（PROJECT_AUDIT.csv）
- [ ] 案例真实性分级（Level A/B/C）
- [ ] 明确每个项目的ZhongSai Scope
- [ ] 项目角色区分（当前公司/团队过往/关联工厂）
- [ ] Projects总页重构
- [ ] 选择5-10个最强案例制作完整Case Study
- [ ] 建立第一方证据库分类
- [ ] 建立IMAGE_ASSET_DATABASE.csv
- [ ] 品牌与第三方Logo处理
- [ ] 建立COMPANY_FACTS.json
- [ ] About页面强化为公司实体中心
- [ ] 实体关系明确化
- [ ] 作者体系建立
- [ ] Factory Verification模块
- [ ] 证书详情页
- [ ] 案例与产品内链
- [ ] 案例与Resource内链
- [ ] Schema强化
- [ ] 建立PROJECT_DATABASE.csv、PROJECT_COUNTRY_DATABASE.csv、SALES_FAQ_DATABASE.csv、CERTIFICATION_DATABASE.csv
- [ ] 生成GEO_AUTHORITY_REPORT.md
- [ ] 桌面端验收
- [ ] 移动端验收
- [ ] 部署到Preview
- [ ] 等待用户允许上线
