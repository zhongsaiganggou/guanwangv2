# ZhongSai V2 CMS Architecture Plan

## 1. 目标

为中赛钢构V2官网提供轻量级内容管理系统，使非技术人员可以：
- 新建、修改、发布技术文章/Blog
- 管理Technical Resources内容
- 无需每次修改代码或联系开发

## 2. 第一版范围（MVP）

### 管理内容类型
- Technical Articles / Blog
- Technical Resources Hub内容
- FAQ（未来扩展）

### 不管理（第一版）
- Homepage
- Header / Footer / Navigation
- Products IA / Components IA
- Projects（真实案例需严格审核）
- Technical SEO核心配置
- Canonical / Hreflang / Sitemap
- QuoteForm后端配置

## 3. 推荐技术方案

### 方案A：Decap CMS（原Netlify CMS）+ Git-based
- **优点**：开源免费、与Astro集成好、Git版本控制、Markdown编辑
- **缺点**：需要Git授权、构建触发部署
- **推荐度**：★★★★★

### 方案B：Cloudflare D1 + 自定义Admin
- **优点**：与现有Cloudflare生态一致、API驱动
- **缺点**：需要开发Admin界面、工作量大
- **推荐度**：★★★

### 方案C：Strapi / Headless CMS
- **优点**：功能完整、API丰富
- **缺点**：需要额外服务器、成本高、过度设计
- **推荐度**：★★

### 最终推荐：Decap CMS（方案A）

## 4. Decap CMS架构

`
Admin/CMS (Decap CMS)
    ↓ 编辑Markdown
Git Repository (GitHub)
    ↓ Webhook触发
Cloudflare Pages Build
    ↓ 静态HTML生成
Production Deployment
`

### 关键特性
- 基于Git的内容版本控制
- Markdown + Frontmatter编辑
- 图片上传到GitHub或Cloudflare R2
- 草稿/发布工作流
- 多语言支持（EN/ZH）
- SEO字段管理

## 5. 内容模型

### Blog Post
`yaml
fields:
  - name: title
    label: 标题
    widget: string
    required: true
  - name: slug
    label: URL Slug
    widget: string
    required: true
  - name: language
    label: 语言
    widget: select
    options: [en, zh]
    required: true
  - name: seo_title
    label: SEO Title
    widget: string
    required: false
  - name: description
    label: Meta Description
    widget: text
    required: true
  - name: h1
    label: H1标题
    widget: string
    required: true
  - name: excerpt
    label: 摘要
    widget: text
    required: false
  - name: category
    label: 分类
    widget: select
    options: [Cost Guide, Import Guide, Shipping, Installation, Engineering, Materials, Supplier Selection, FAQ]
  - name: cover_image
    label: 封面图
    widget: image
    required: false
  - name: body
    label: 正文
    widget: markdown
    required: true
  - name: author
    label: 作者
    widget: string
    default: ZhongSai Engineering Team
  - name: published_date
    label: 发布日期
    widget: datetime
  - name: updated_date
    label: 更新日期
    widget: datetime
  - name: related_products
    label: 相关产品
    widget: list
    field: { name: url, widget: string }
  - name: related_components
    label: 相关构件
    widget: list
    field: { name: url, widget: string }
  - name: cta
    label: CTA类型
    widget: select
    options: [quote, contact, products]
    default: quote
  - name: draft
    label: 草稿
    widget: boolean
    default: true
`

### 自动生成（不允许手动输入）
- Canonical URL（根据slug和language自动生成）
- Hreflang（根据语言配对自动生成）
- Sitemap entry（发布后自动加入）

## 6. SEO/AEO助手功能

### 编辑时提示
- **Primary Search Intent**：根据标题和分类提示主要搜索意图
- **Potential Cannibalization**：检测是否与现有页面关键词重叠
- **Existing Similar Page**：列出可能相关的现有页面
- **Suggested Internal Links**：推荐相关产品/构件页面内链
- **AEO Questions**：根据主题推荐可回答的问题
- **Fact Safety Warning**：检测固定价格、虚假承诺等风险内容

### 不自动发布
- AI内容仅作为建议，需人工审核后发布
- 禁止自动批量生成垃圾内容

## 7. 发布流程

1. **编辑**：在Decap CMS中编辑Markdown
2. **保存草稿**：保存到Git分支或草稿状态
3. **预览**：Cloudflare Pages Preview部署预览
4. **审核**：人工审核内容准确性和事实安全
5. **发布**：合并到main分支，触发Production部署
6. **验证**：检查页面渲染、Canonical、Sitemap

## 8. 图片管理

### 方案
- 图片上传到GitHub仓库（public/images/blog/）
- 或上传到Cloudflare R2（需要配置）
- AI生成图片需标记：i-illustration / i-application-concept

### 图片规则
- 禁止AI图片冒充真实中赛项目/工厂
- AI建筑效果图需标注"Concept Visualization"
- 禁止自行生成中赛LOGO
- 文件名描述实际内容，禁止关键词堆砌

## 9. 多语言管理

### EN/ZH配对
- 同一篇文章的EN和ZH版本通过slug关联
- Hreflang自动生成互指
- 中文文章如无对应英文版，使用single-language规则

### 翻译工作流
- 先写英文主版本
- 中文翻译作为关联版本
- 禁止机器翻译直接发布，需人工审核

## 10. 实施路线图

### Phase 1：基础CMS（2-3天）
- 安装Decap CMS
- 配置Blog内容模型
- 配置Git Gateway或OAuth
- 测试新建/编辑/发布流程

### Phase 2：SEO助手（1-2天）
- 配置SEO字段
- 添加内容审核提示
- 配置Canonical/Hreflang自动生成

### Phase 3：图片管理（1天）
- 配置图片上传
- 配置AI图片标记规则
- 图片优化流程

### Phase 4：扩展内容类型（未来）
- FAQ管理
- Resources Hub内容管理
- 项目案例管理（需严格审核流程）

## 11. 安全与权限

### 用户角色
- **Admin**：全部权限，包括发布
- **Editor**：编辑内容，不能发布
- **Viewer**：只读

### 安全规则
- 所有操作通过Git版本控制
- 发布需要人工审核
- 禁止直接修改生产环境
- 定期备份Git仓库

## 12. 与现有系统集成

### Cloudflare Pages
- Git push触发自动构建
- Preview分支自动生成预览URL
- Production分支自动部署

### D1数据库
- CMS不直接操作D1（Lead数据）
- Blog内容存储在Git，不是D1

### GA4
- 新页面发布后自动加入Sitemap
- GA4事件跟踪保持现有实现

## 13. 成本估算

### Decap CMS
- 开源免费
- Git Gateway：免费（Netlify提供）
- 或使用GitHub OAuth：免费

### Cloudflare Pages
- 构建分钟数：免费额度内
- 带宽：免费额度内

### 总成本
- **第一版：/月**（使用免费额度）

## 14. 风险与注意事项

### 内容质量风险
- CMS降低发布门槛，可能导致低质量内容
- 必须保持人工审核流程
- 禁止AI自动批量发布

### SEO风险
- 新页面可能与现有页面关键词蚕食
- CMS需提供蚕食检测提示
- 发布前需检查Canonical和Hreflang

### 事实安全风险
- 非技术人员可能写入固定价格、虚假承诺
- CMS需提供事实安全警告
- 重要内容需工程团队审核

### 技术风险
- Decap CMS配置复杂
- Git授权可能有问题
- 图片上传可能需要额外配置

## 15. 下一步

1. 用户确认采用Decap CMS方案
2. 配置GitHub OAuth或Git Gateway
3. 安装Decap CMS到项目
4. 配置Blog内容模型
5. 测试完整发布流程
6. 培训内容编辑人员
