# TASK-02: 关键词地图与搜索意图优化

> 优先级: P1
> 状态: 待执行（已收到任务要求，排队中）
> 创建日期: 2026-09-09
> 前置任务: TASK-01 技术SEO清理

---

## 任务目标

建立一套清晰的：**关键词 → 搜索意图 → 页面 → 内容 → 内链 → 转化** 映射体系。

最终必须做到：**一个核心关键词尽量有一个明确主页面负责排名，避免多个页面互相竞争。**

**本阶段不要进行大规模视觉重构，不要批量生成文章，不要随意修改已有URL。**

---

## 一、完整扫描现有网站

### 1.1 扫描范围

读取所有可索引页面，包括：
- 首页
- Products
- 产品分类
- 具体产品页
- Solutions
- Projects
- About
- Manufacturing & Quality
- Contact
- Resources
- Blog / Guides
- 中文页面
- 英文页面

### 1.2 要求

- 不要只分析导航中的页面
- 必须包含Sitemap和所有可索引URL

---

## 二、创建全站关键词地图

### 2.1 输出文件

生成：`tools/seo-audit/KEYWORD_MAP.csv`

### 2.2 字段

- URL
- 语言
- 页面类型
- 当前Title
- 当前H1
- 当前页面主题
- Primary Keyword
- Secondary Keywords
- Search Intent
- User Stage
- Business Value
- Keyword Conflict
- Recommended Action

---

## 三、搜索意图分类

每个页面至少判断：

### 3.1 Informational（信息型）

例如：
- how steel structures are manufactured
- how to import steel structure from China
- steel warehouse design guide

### 3.2 Commercial Investigation（商业调研型）

例如：
- best steel structure manufacturer China
- steel structure supplier China
- steel warehouse supplier

### 3.3 Transactional（交易型）

例如：
- steel warehouse quotation
- steel workshop manufacturer
- steel structure factory supplier

### 3.4 Navigational / Brand（导航/品牌型）

例如：
- ZhongSai Steel Structure
- ZhongSai factory

---

## 四、建立页面层级

### 4.1 Level 1：首页

**主要承担**：
- steel structure manufacturer China
- steel structure supplier China
- prefabricated steel structure manufacturer
- steel structure export supplier

**不要**把所有具体产品关键词全部塞进首页。

**首页作用**：品牌实体 + 核心商业词 + 产品入口 + 信任 + 转化

### 4.2 Level 2：产品 / 解决方案 Hub

例如：
- Industrial & Manufacturing
- Warehousing & Logistics
- Agriculture & Livestock
- Commercial & Public
- Mining & Energy
- Transportation & Infrastructure
- Special Steel Structures

**主要承接**：行业 / 场景级关键词。

**不要**和具体建筑类型页面争词。

### 4.3 Level 3：具体产品页面

例如：
- Steel Workshop
- Steel Warehouse
- Steel Factory
- Steel Structure Platform
- Cold Storage Steel Structure
- Poultry Farm
- Hangar
- Exhibition Hall
- Mining Steel Structure

**承担**：明确产品搜索词。

**原则**：一个具体产品主关键词 → 一个核心产品页。

### 4.4 Level 4：Resource / Guide

承担问题型和知识型搜索。

例如：
- steel warehouse cost
- steel workshop cost
- steel structure shipping cost
- how to import steel structure from China
- steel structure container loading
- steel structure corrosion protection
- steel structure installation

**这些页面不能抢产品页商业关键词。**

### 4.5 Level 5：Project / Case Study

主要承担：
- 真实性
- 案例证据
- 国家经验
- 项目类型经验
- GEO信任

**案例页不是为了大量抢通用产品关键词。**

---

## 五、重点检查关键词蚕食

### 5.1 重点关键词

- steel structure manufacturer
- steel structure manufacturer China
- steel structure supplier
- steel structure supplier China
- steel workshop
- steel workshop manufacturer
- steel structure workshop
- steel warehouse
- steel warehouse manufacturer
- steel structure warehouse
- industrial steel building
- steel factory building
- prefabricated steel building
- steel building manufacturer
- steel structure fabrication
- steel structure fabrication China
- steel structure factory
- China steel structure company

---

## 六、检查 Warehouse 与 Workshop（重点）

### 6.1 找出所有包含以下词的页面

- warehouse
- workshop
- industrial building
- factory
- factory building
- steel building
- industrial steel structure

### 6.2 判断

- 哪个页面负责：Steel Warehouse
- 哪个页面负责：Steel Workshop
- 哪个页面负责：Steel Factory / Industrial Building

### 6.3 不能出现

- A页面Title在抢Steel Workshop
- B页面H1也在抢Steel Workshop
- C页面博客还在抢Steel Workshop

### 6.4 如果存在冲突

- 确定一个主页面
- 其他页面通过：修改关键词、修改Title、修改H1、调整正文、内部链接、Canonical、合并、301解决

---

## 七、分类页不能假装具体产品页

### 7.1 示例

Industrial & Manufacturing属于行业Hub，它不应该完全等同Steel Workshop。

### 7.2 理想结构

Industrial & Manufacturing作为上级主题页，下面介绍：
- Steel Workshop
- Steel Factory
- Processing Plant
- Crane Workshop
- Heavy Industrial Building
- Manufacturing Facility

然后内部链接到具体页面。

### 7.3 如果当前网站还没有条件增加Hub URL

- 不要立即更改现有URL
- 先在报告中提出建议
- 标记：P1_INFORMATION_ARCHITECTURE
- 等后续统一决策

---

## 八、Title规则

### 8.1 要求

每个核心页面必须拥有独特Title。

### 8.2 建议基本结构

`Primary Keyword | Commercial Modifier | ZhongSai Steel Structure`

但不要每个页面机械复制。

### 8.3 示例

- Steel Workshop Manufacturer in China | ZhongSai Steel Structure
- Steel Warehouse Manufacturer & Export Supplier | ZhongSai
- Steel Structure Manufacturer in China | ZhongSai Steel Structure
- China Steel Structure Fabrication & Export | ZhongSai

### 8.4 避免

页面A、B、C都是：`Steel Structure Manufacturer | ZhongSai`

---

## 九、H1规则

### 9.1 原则

- 一个页面一个H1
- H1清楚描述该页面具体是什么
- 不要关键词堆砌

### 9.2 示例

**正确**：Steel Structure Workshops for Overseas Industrial Projects

**错误**：Steel Structure Workshop Manufacturer Supplier Factory China Steel Building

---

## 十、Meta Description

### 10.1 要求

- 每页唯一
- 重点表达：是什么、服务谁、关键能力、下一步CTA

### 10.2 示例

Manufacturing and export supply of steel structure workshops for overseas industrial projects, including detailing, fabrication, packing and installation guidance.

### 10.3 禁止

大面积模板复制。

---

## 十一、建立Topic Cluster

### 11.1 示例：Steel Warehouse

**主页面**：`/en/steel-warehouse/`

**相关文章**：
- Steel Warehouse Cost
- Steel Warehouse Design Considerations
- Steel Warehouse Span Guide
- Steel Warehouse Insulation
- Steel Warehouse Shipping
- Steel Warehouse Installation

### 11.2 内链规则

- 这些文章全部内部链接到 `/en/steel-warehouse/`
- 产品页也可链接最重要的Guide
- 形成：Pillar ↔ Cluster 结构

---

## 十二、不要建立垃圾关键词页

### 12.1 新增URL前必须满足

- 有独立搜索意图
- 有独立用户价值
- 现有页面无法合理承载
- 不会造成关键词蚕食
- 有足够内容长期维护

### 12.2 禁止

为了关键词创建：
- steel-warehouse-China
- best-steel-warehouse
- cheap-steel-warehouse
- steel-warehouse-supplier
- steel-warehouse-manufacturer

五个几乎一样的页面。

---

## 十三、国家页面暂时不要批量生成

### 13.1 核心市场

- Southeast Asia
- Latin America
- Middle East
- Africa
- 以及多个重点国家

### 13.2 本阶段要求

不要一次性生成几十个：
- Steel Structure Malaysia
- Steel Structure Indonesia
- Steel Structure Brazil
- Steel Structure Mexico

### 13.3 必须先判断

- 是否存在真实项目
- 是否存在独立内容
- 是否存在当地规范差异
- 是否有当地采购问题
- 是否有案例
- 是否有真实国家搜索需求

满足条件后再建立。

### 13.4 国家页面必须Localize

不能仅替换国家名称。

---

## 十四、Resources内容审计

### 14.1 扫描所有文章，找出

- 重复主题
- 非常相似标题
- AI批量内容
- 内容过薄
- 没有独立价值
- 与产品页争词
- 过时内容
- 语言不自然

### 14.2 输出文件

生成：`tools/seo-audit/CONTENT_CANNIBALIZATION.csv`

### 14.3 字段

- URL
- Primary Keyword
- Competing URL
- Conflict Level
- Recommendation

### 14.4 处理建议

- KEEP
- UPDATE
- MERGE
- REPOSITION
- 301
- DELETE

---

## 十五、内部链接体系

### 15.1 输出文件

建立：`tools/seo-audit/INTERNAL_LINK_MAP.csv`

### 15.2 核心规则

- 首页 → 核心分类
- 分类 → 产品
- 产品 → 相关产品
- 产品 → 相关案例
- 产品 → 相关Guide
- Guide → 对应产品
- Project → 相关产品
- About → Manufacturing / Certifications
- Contact → 关键产品入口

### 15.3 Anchor Text规则

- 要自然
- 可以：steel warehouse、steel workshop manufacturing、steel structure fabrication
- 不能每个地方都机械用完全相同Anchor

---

## 十六、Breadcrumb

### 16.1 确保结构逻辑清晰

**产品页示例**：
- Home
- Products
- Industrial & Manufacturing
- Steel Workshop

**Resources示例**：
- Home
- Resources
- Steel Warehouse Cost Guide

### 16.2 Schema

使用BreadcrumbList。

---

## 十七、中文SEO不能直接翻译英文

### 17.1 中文关键词体系独立判断

**英文示例**：steel structure manufacturer China

**中文用户可能搜索**：
- 钢结构厂家
- 钢结构出口厂家
- 海外钢结构厂家
- 钢结构加工厂家
- 钢结构厂房厂家
- 中国钢结构供应商

### 17.2 禁止

只机械翻译英文关键词。

---

## 十八、GEO内容结构

### 18.1 每个核心产品页面增加AI容易理解的信息块

- What it is
- Best suited for
- Typical applications
- Typical spans
- Design inputs required
- ZhongSai supply scope
- What ZhongSai does not provide
- Manufacturing process
- Export process
- Installation support
- FAQ
- Related projects

### 18.2 要求

这些信息必须真实。

---

## 十九、不要虚构参数

### 19.1 不得自动编造

- 跨度
- 造价
- 交期
- 钢耗
- 吨位
- 认证
- 案例
- 客户
- 国家经验
- 施工周期

### 19.2 如果没有真实统一值

使用：
- depends on project design
- subject to drawings
- varies by loading and local code

等准确说明。

---

## 二十、转化意图

### 20.1 要求

核心商业页面不能只有SEO内容，必须有明确CTA。

### 20.2 建议根据用户阶段使用

- Send Your Drawings
- Request Project Review
- Get Preliminary Quotation
- Discuss Your Project
- Upload Drawings

### 20.3 禁止

每一段都写：Contact Us。

---

## 二十一、最终输出

完成分析后先不要大批量修改，先提交以下报告：

### 21.1 MASTER KEYWORD MAP

所有主要页面：URL、Primary Keyword、Search Intent、Target User、Commercial Value

### 21.2 CANNIBALIZATION REPORT

列出所有：严重、中等、轻微关键词冲突。

### 21.3 PAGE ACTION LIST

每个页面标记：
- KEEP
- OPTIMIZE
- REPOSITION
- MERGE
- 301
- DELETE
- NEW PAGE REQUIRED

### 21.4 HUB STRUCTURE

建议未来：Products → Category → Product → Guide → Case 完整结构。

### 21.5 PRIORITY

按：P0、P1、P2、P3分类。

---

## 二十二、执行优先级

### 22.1 P0（优先处理）

- 核心页面互相抢词
- 旧页面抢新版页面关键词
- 多个页面Title/H1高度重复

### 22.2 P1

- Products Hub
- Workshop
- Warehouse
- Factory / Industrial Building
- 核心制造能力页

### 22.3 P2

- Resources Topic Cluster
- Projects内链
- FAQ
- GEO信息块

### 22.4 P3

- 国家页面
- 更多长尾内容
- 对比型内容
- 高级GEO内容

---

## 最终目标

网站不能只是拥有很多页面，必须形成：

```
用户搜索一个需求
↓
Google / AI 明确知道哪个页面最相关
↓
用户进入正确页面
↓
看到中赛真实能力和项目证据
↓
上传图纸 / 留微信 / 提交项目
```

最终形成：**Keyword → Page → Authority → Trust → Lead** 的增长体系。

---

## 执行进度

- [ ] 完整扫描现有网站（所有可索引页面）
- [ ] 创建全站关键词地图 KEYWORD_MAP.csv
- [ ] 搜索意图分类（Informational / Commercial / Transactional / Navigational）
- [ ] 建立页面层级（Level 1-5）
- [ ] 重点检查关键词蚕食（20个核心关键词）
- [ ] 检查Warehouse与Workshop关键词分配
- [ ] 分类页vs具体产品页边界检查
- [ ] Title唯一性检查与优化建议
- [ ] H1规则检查
- [ ] Meta Description唯一性检查
- [ ] 建立Topic Cluster（Pillar ↔ Cluster）
- [ ] Resources内容审计 CONTENT_CANNIBALIZATION.csv
- [ ] 内部链接体系 INTERNAL_LINK_MAP.csv
- [ ] Breadcrumb结构逻辑检查
- [ ] 中文SEO关键词独立判断
- [ ] GEO内容结构建议
- [ ] 转化意图与CTA检查
- [ ] 生成MASTER KEYWORD MAP报告
- [ ] 生成CANNIBALIZATION REPORT
- [ ] 生成PAGE ACTION LIST
- [ ] 生成HUB STRUCTURE建议
- [ ] 按P0-P3分类优先级
- [ ] 提交Git
