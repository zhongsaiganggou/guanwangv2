# 中赛钢构V2 - 任务队列

> 最后更新：2026-09-09
> 当前执行：TASK-01

---

## 任务状态说明

- 🟡 **进行中**：当前正在执行
- ⬜ **待执行**：排队等待
- ✅ **已完成**：已提交并部署
- ⏸️ **暂停**：等待用户输入或外部条件

---

## 任务队列

### 🟡 TASK-01: 技术SEO清理与优化
- **优先级**: P0
- **状态**: 进行中
- **文档**: `docs/tasks/01-seo-cleanup.md`
- **目标**: 清理新旧页面并存、统一URL规范、修复301/Canonical/Sitemap/hreflang、清理旧产品URL体系、检查中英文对应关系、优化表单转化、完成桌面端+移动端真实验收
- **关键产出**: URL_AUDIT.csv、CANONICAL_AUDIT.csv、HREFLANG_AUDIT.csv、SEO_METADATA_AUDIT.csv、CONTENT_AUDIT.csv
- **预计Commit**: 待完成

---

### ⬜ TASK-02: 内容增长 - 第三批技术文章
- **优先级**: P1
- **状态**: 待执行
- **文档**: `docs/tasks/02-content-batch3.md`
- **目标**: 基于GSC热搜词和竞品分析，创作5-8篇高质量技术文章，中英文双版本同时发布
- **关键要求**:
  - 每篇文章2000-3000字
  - 中英文双版本（同一slug，不同语言目录）
  - 每篇文章根据段落内容生成多张不同的AI真实工业图片（不要卡通图）
  - 自动进入Sitemap和Resources Hub
  - 自然内链到相关产品/能力页面
- **候选主题**:
  - Steel Structure Installation Guide（安装指南）
  - Corrosion Protection Guide（防腐指南）
  - Steel Grades Explained（钢材等级详解，已完成）
  - Surface Treatment & Coating（表面处理，已完成）
  - Steel vs Concrete（钢 vs 混凝土）
  - Foundation / Design Inputs Guide（基础/设计输入指南）
  - Project Timeline / Procurement Process（项目时间线/采购流程）
  - Packing & Marking Guide（包装与标记指南）
  - Structural Steel Detailing Guide（钢结构详图指南）
  - Fabrication Tolerance / Quality Guidance（制造公差/质量指南）
- **预计Commit**: 待完成

---

### ⬜ TASK-03: 公司主体定位与证书归属梳理
- **优先级**: P2
- **状态**: 待执行（用户明确要求"以后单独处理"）
- **文档**: `docs/tasks/03-entity-positioning.md`
- **目标**: 统一全站对ZhongSai的实体描述，明确证书主体归属，避免误导客户
- **关键问题**:
  - manufacturer vs trading company vs export supplier 的表述统一
  - "our factory" / "our certification" / "our workers" 的使用边界
  - 证书图片主体与中赛进出口公司的关系说明
  - 合作工厂/生产基地的表述规范
- **硬规则**:
  - 不得虚构认证、案例、项目
  - 不得修改证书图片上的真实信息
  - 如证书主体不是中赛进出口公司，需保留真实主体说明
- **预计Commit**: 待完成

---

### ⬜ TASK-04: Projects案例页面真实性梳理
- **优先级**: P2
- **状态**: 待执行
- **文档**: `docs/tasks/04-projects-authenticity.md`
- **目标**: 区分"旧生成海外项目"和"新验证真实项目"，明确每个项目的ZhongSai Scope
- **关键工作**:
  - 逐个审计当前12个国内项目 + 9个恢复的新加坡/澳门项目
  - 区分：OLD GENERATED PROJECT（410）vs NEW VERIFIED PROJECT（200）
  - 每个项目增加字段：Project Name、Location、Year、Project Type、ZhongSai Scope、Steel Tonnage、Services Provided
  - 如实际参与范围只是Steel Fabrication/Component Supply/Detailing/Export Supply，必须明确写出
  - 不得虚构客户、吨位、合同金额、项目角色、施工范围
- **预计Commit**: 待完成

---

### ⬜ TASK-05: 移动端深度优化
- **优先级**: P2
- **状态**: 待执行
- **文档**: `docs/tasks/05-mobile-optimization.md`
- **目标**: 在375px、390px、430px真实设备尺寸下完成全站移动端体验优化
- **测试页面**: 首页、Products、Workshop、Warehouse、Projects、About、Contact、Resource、Article
- **重点检查**: 导航、字体、按钮、表格、图片、FAQ、Sticky CTA、表单、上传文件、语言切换、Footer
- **硬规则**: 不能只缩放浏览器窗口，必须真实检查
- **预计Commit**: 待完成

---

### ⬜ TASK-06: 页面速度优化
- **优先级**: P3
- **状态**: 待执行
- **文档**: `docs/tasks/06-performance-optimization.md`
- **目标**: 优化桌面端+移动端的LCP、INP、CLS指标
- **重点优化**:
  - Hero背景图、产品图片、项目图片
  - 视频、第三方脚本、字体、JS Bundle
  - 图片：WebP/AVIF、正确尺寸、懒加载、首屏关键图不要lazy-load、设置width/height避免布局偏移
- **硬规则**: 不要为了跑分破坏现有视觉
- **预计Commit**: 待完成

---

### ⬜ TASK-07: GEO/AEO内容增强
- **优先级**: P2
- **状态**: 待执行
- **文档**: `docs/tasks/07-geo-aeo-enhancement.md`
- **目标**: 提升AI搜索（Google AI Overview、ChatGPT、Perplexity等）的可引用性
- **关键工作**:
  - 核心商业页面增加Direct Answer Blocks
  - 增加FAQ（Question → 2-5句直接答案 → Evidence/Details → Next Step）
  - 明确结论、定义、流程、表格、项目数据、真实案例、技术参数
  - 减少"leading world-class best top manufacturer excellent quality"等无证据营销词
  - 保持并强化：中赛是谁、做什么、不做什么、服务哪些客户、制造能力、出口能力、技术指导
- **预计Commit**: 待完成

---

### ⬜ TASK-08: Resources内容清理与优化
- **优先级**: P3
- **状态**: 待执行
- **文档**: `docs/tasks/08-resources-content-cleanup.md`
- **目标**: 扫描现有全部Resource/Blog，评估质量，合并重复内容，重写不自然标题
- **关键工作**:
  - 输出CONTENT_AUDIT.csv
  - 字段：URL、Title、主题、搜索意图、目标关键词、是否重复、质量、是否有流量价值、建议动作
  - 动作：KEEP / UPDATE / MERGE / 301 / DELETE
  - 重点检查：AI痕迹明显标题、语法错误、薄内容、重复内容、多个页面抢同一关键词、过时内容
  - 例如："How To Steel Structure Cost"这种不自然标题需要重写
- **硬规则**: 暂时不要批量生成新文章，先清理现有内容
- **预计Commit**: 待完成

---

### ⬜ TASK-09: 内部链接策略优化
- **优先级**: P3
- **状态**: 待执行
- **文档**: `docs/tasks/09-internal-linking-strategy.md`
- **目标**: 建立Hub/Spoke内部链接结构，避免关键词蚕食，提升主题权威度
- **关键工作**:
  - 关键词聚类分析
  - Hub页面（Products、Components、Resources、Manufacturing、Export Delivery）
  - Spoke页面（具体产品、具体文章）
  - Related内容推荐优化
  - 面包屑导航优化
  - 确保所有内部链接直接指向最终200 URL（不经过301）
- **预计Commit**: 待完成

---

### ⬜ TASK-10: Contact表单CRO持续优化
- **优先级**: P3
- **状态**: 待执行
- **文档**: `docs/tasks/10-contact-form-cro.md`
- **目标**: 提升询盘提交率，优化海外华人客户体验
- **关键工作**:
  - 微信优先（微信ID必填，WhatsApp/电话/邮箱选填）
  - 字段优化：姓名、项目国家/地区、微信ID、项目类型、项目预计时间、图纸上传、项目描述
  - 不要同时强制微信+WhatsApp+电话+邮箱
  - Honeypot字段（Website）对真实用户完全不可见
  - 表单提交测试
  - 提交成功页优化
- **预计Commit**: 待完成

---

## 已完成任务

### ✅ TASK-00: GSC索引清理 + 结构化数据验证
- **完成日期**: 2026-09-09
- **Commit**: `fb0f21e`
- **关键成果**:
  - GSC URL全部分类（404: 100个旧站URL、Duplicate: 4个、Canonical冲突: 7个等）
  - Breadcrumb Schema修复（普通页面 + CMS文章）
  - CMS文章canonical URL bug修复
  - Product Schema确认是旧缓存误报（2个URL已404）
  - 构建部署成功，Production验证通过

---

## 执行规则

1. **每次只执行一个任务**：完成当前任务后，用户说"继续下一个任务"再开始下一个
2. **任务文档优先**：每个任务的详细要求在 `docs/tasks/XX-task-name.md` 中
3. **状态实时更新**：任务开始、暂停、完成时，更新此文档的状态
4. **Git提交规范**：每个任务完成后单独提交，commit message包含任务编号
5. **用户确认**：涉及高风险操作（删除页面、修改URL、修改公司定位）前，必须用户确认
6. **不跨任务**：执行TASK-01时，不主动做TASK-02的内容，除非用户明确要求

---

## 如何使用

- **"执行 TASK-02"** → 我读取 `docs/tasks/02-content-batch3.md`，开始执行
- **"继续下一个任务"** → 我读取队列，找到下一个待执行任务
- **"任务进度"** → 我更新此文档，显示当前状态和已完成情况
- **"暂停当前任务"** → 我保存当前进度，标记为暂停
- **"添加任务"** → 我在此文档中添加新任务条目
