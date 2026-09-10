# 中赛钢构V2 - 任务队列

> 最后更新：2026-09-10
> 当前执行：TASK-06 已完成
> 部署规则：长任务完成后部署到Preview，不部署Production，等用户允许上线

---

## 任务状态说明

- 🟡 **进行中**：当前正在执行
- ⬜ **待执行**：排队等待
- ✅ **已完成**：已提交并部署
- ⏸️ **暂停**：等待用户输入或外部条件

---

## 任务队列总览

| 编号 | 任务名称 | 优先级 | 状态 | 文档 |
|------|---------|--------|------|------|
| TASK-00 | GSC索引清理 + 结构化数据验证 | P0 | ✅ 已完成 | - |
| TASK-01 | 技术SEO清理与优化 | P0 | ✅ 已完成 | `docs/tasks/01-seo-cleanup.md` |
| TASK-02 | 关键词地图与搜索意图优化 | P1 | ✅ 已完成 | `docs/tasks/02-keyword-mapping.md` |
| TASK-03 | 核心赚钱页面 SEO+GEO+CRO 深度优化 | P0 | ✅ 已完成 | `docs/tasks/03-core-pages-seo-geo-cro.md` |
| TASK-04 | Projects案例体系 + 第一方证据 + GEO权威性建设 | P1 | ✅ 已完成 | `docs/tasks/04-projects-evidence-geo-authority.md` |
| TASK-05 | Resources内容中心 + Topic Cluster + SEO/GEO内容矩阵 | P2 | ✅ 已完成 | `docs/tasks/05-resources-topic-cluster-content-matrix.md` |
| TASK-06 | 多语言国际SEO + 国家/地区页面 + Localization体系 | P3 | ✅ 已完成 | - |

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

## 进行中任务

### 🟡 TASK-01: 技术SEO清理与优化
- **优先级**: P0
- **状态**: 进行中
- **文档**: `docs/tasks/01-seo-cleanup.md`
- **目标**: 清理新旧页面并存、统一URL规范、修复301/Canonical/Sitemap/hreflang、清理旧产品URL体系、检查中英文对应关系、优化表单转化、完成桌面端+移动端真实验收
- **关键产出**: URL_AUDIT.csv、CANONICAL_AUDIT.csv、HREFLANG_AUDIT.csv、SEO_METADATA_AUDIT.csv、CONTENT_AUDIT.csv
- **当前进度**:
  - ✅ 确认Git基线（HEAD: fb0f21e → 7e5333e）
  - ✅ 读取sitemap.xml（110个URL，全部带斜杠）
  - ✅ 创建URL审计脚本
  - ✅ 运行URL审计（252个URL）
  - ✅ 分析URL审计结果
  - ⬜ 修复non-slash问题（确认是308，无需修复）
  - ⬜ 清理旧产品URL体系
  - ⬜ 检查Canonical
  - ⬜ 检查hreflang
  - ⬜ 检查Sitemap
  - ⬜ 检查robots.txt
  - ⬜ 扫描内部链接
  - ⬜ 检查404和Redirect Chain
  - ⬜ 检查Title/Meta/H1
  - ⬜ 检查Schema
  - ⬜ 优化Contact表单
  - ⬜ 检查移动端
  - ⬜ 构建部署到Preview
  - ⬜ 等待用户允许上线

---

## 待执行任务

### ⬜ TASK-02: 关键词地图与搜索意图优化
- **优先级**: P1
- **状态**: 待执行（已收到任务要求）
- **文档**: `docs/tasks/02-keyword-mapping.md`
- **前置任务**: TASK-01
- **目标**: 建立关键词 → 搜索意图 → 页面 → 内容 → 内链 → 转化映射体系，避免关键词蚕食
- **关键产出**: KEYWORD_MAP.csv、CONTENT_CANNIBALIZATION.csv、INTERNAL_LINK_MAP.csv、MASTER KEYWORD MAP报告、CANNIBALIZATION REPORT、PAGE ACTION LIST、HUB STRUCTURE建议

---

### ⬜ TASK-03: 核心赚钱页面 SEO+GEO+CRO 深度优化
- **优先级**: P0
- **状态**: 待执行（已收到任务要求）
- **文档**: `docs/tasks/03-core-pages-seo-geo-cro.md`
- **前置任务**: TASK-01、TASK-02
- **目标**: 把最重要、最有商业价值的页面优化成能排名 + AI容易理解 + 用户容易信任 + 广告流量能承接 + 最终促进询盘
- **P0页面（先做6个）**: 英文首页、中文首页、Products总入口、Steel Workshop、Steel Warehouse、Contact
- **P1页面**: About、Manufacturing & Quality、Projects、Resources首页、重点产品分类页
- **关键产出**: 每个页面的PAGE_BRIEF、优化后的页面、验收报告

---

### ⬜ TASK-04: Projects案例体系 + 第一方证据 + GEO权威性建设
- **优先级**: P1
- **状态**: 待执行（已收到任务要求）
- **文档**: `docs/tasks/04-projects-evidence-geo-authority.md`
- **前置任务**: TASK-01~03
- **目标**: 把网站从"自我介绍型官网"升级成"有证据、可验证、AI更愿意引用、客户更容易信任"的网站
- **核心原则**: 真实公司 + 真实业务 + 真实项目 + 真实数据 + 真实图片 + 真实经验 + 清晰结构 + 可验证证据
- **禁止**: 虚构案例、客户、项目国家、吨位、金额、合作范围、认证、媒体报道、客户评价、排名、奖项
- **关键产出**: PROJECT_AUDIT.csv、PROJECT_DATABASE.csv、PROJECT_COUNTRY_DATABASE.csv、IMAGE_ASSET_DATABASE.csv、COMPANY_FACTS.json、SALES_FAQ_DATABASE.csv、CERTIFICATION_DATABASE.csv、GEO_AUTHORITY_REPORT.md

---

### ⬜ TASK-05: Resources内容中心 + Topic Cluster + SEO/GEO内容矩阵建设
- **优先级**: P2
- **状态**: 待执行（已收到任务要求）
- **文档**: `docs/tasks/05-resources-topic-cluster-content-matrix.md`
- **前置任务**: TASK-01~04
- **目标**: 围绕核心产品和客户决策路径建立内容资产，不是堆博客数量
- **核心原则**: 每篇新内容必须至少服务一个目标（SEO/GEO/AEO/客户教育/供应商尽调/采购决策/销售转化/产品页支持/案例支持/品牌权威）
- **关键产出**: RESOURCE_AUDIT.csv、CONTENT_MASTER_PLAN.csv、FAQ_DATABASE.csv、TOPIC_CLUSTER_MAP.csv、CONTENT_UPDATE_LOG.csv
- **第一批主题**: 10-15个，先选5个最有价值的执行

---

### ⏳ TASK-06: 多语言国际SEO + 国家/地区页面 + Localization体系
- **优先级**: P3
- **状态**: 待规划（TASK-05完成后进入）
- **目标**: 专门解决马来西亚、印尼、巴西、墨西哥、沙特、尼日利亚等目标市场应该怎么做，而不是简单复制"国家名 + Steel Structure"
- **前置任务**: TASK-01~05

---

## 执行规则

1. **每次只执行一个任务**：完成当前任务后，用户说"继续下一个任务"再开始下一个
2. **任务文档优先**：每个任务的详细要求在 `docs/tasks/XX-task-name.md` 中
3. **状态实时更新**：任务开始、暂停、完成时，更新此文档的状态
4. **Git提交规范**：每个任务完成后单独提交，commit message包含任务编号
5. **用户确认**：涉及高风险操作（删除页面、修改URL、修改公司定位）前，必须用户确认
6. **不跨任务**：执行TASK-01时，不主动做TASK-02的内容，除非用户明确要求
7. **部署规则**：长任务完成后部署到Preview，不部署Production，等用户允许上线
8. **预览验证**：不上线但要可以预览，完成代码修改后部署到Cloudflare Pages Preview

---

## 如何使用

- **"执行 TASK-02"** → 我读取 `docs/tasks/02-keyword-mapping.md`，开始执行
- **"继续下一个任务"** → 我读取队列，找到下一个待执行任务
- **"任务进度"** → 我更新此文档，显示当前状态和已完成情况
- **"暂停当前任务"** → 我保存当前进度，标记为暂停
- **"添加任务"** → 我在此文档中添加新任务条目
- **"允许上线"** → 我把当前Preview部署到Production
