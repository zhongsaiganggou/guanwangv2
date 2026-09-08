# 中赛钢构官网 CMS 用户指南

## 概述

中赛钢构官网使用 **Sveltia CMS** 作为内容管理后台，用于发布和管理技术文章（Blog / Technical Resources）。

- **后台地址**: https://zhongsai-steelstructure.com/admin/
- **认证方式**: GitHub OAuth 登录
- **内容存储**: GitHub 仓库（Markdown 文件）
- **部署方式**: 发布后自动触发 Cloudflare Pages 构建部署

---

## 一、首次登录配置

### 1.1 创建 GitHub OAuth App

在使用 CMS 之前，需要创建 GitHub OAuth App 用于登录认证：

1. 登录 GitHub，进入 **Settings → Developer settings → OAuth Apps → New OAuth App**
2. 填写以下信息：
   - **Application name**: `ZhongSai Website CMS`
   - **Homepage URL**: `https://zhongsai-steelstructure.com`
   - **Authorization callback URL**: `https://zhongsai-steelstructure.com/api/cms-auth`
3. 点击 **Register application**
4. 记录生成的 **Client ID**
5. 点击 **Generate a new client secret**，记录生成的 **Client Secret**（只显示一次）

### 1.2 配置 Cloudflare 环境变量

1. 登录 Cloudflare Dashboard，进入 **Pages → zhongsai-website-v2 → Settings → Environment variables**
2. 在 **Production** 环境添加以下变量：
   - `GITHUB_CLIENT_ID`: 上一步记录的 Client ID
   - `GITHUB_CLIENT_SECRET`: 上一步记录的 Client Secret（勾选 **Encrypt**）
3. 保存后需要重新部署一次才能生效

### 1.3 登录后台

1. 访问 https://zhongsai-steelstructure.com/admin/
2. 点击 **Login with GitHub**
3. 授权 GitHub 访问仓库
4. 登录成功后进入 CMS 管理界面

---

## 二、新建文章

### 2.1 开始新建

1. 在左侧菜单选择 **Blog (English)** 或 **Blog (中文)**
2. 点击右上角 **New Blog (English)** 或 **New Blog (中文)**

### 2.2 填写基本信息

| 字段 | 说明 | 必填 |
|------|------|------|
| **Title / 标题** | 文章标题，也是默认 H1 | ✅ |
| **SEO Title / SEO标题** | 浏览器标签页显示的标题，留空则自动生成 | ❌ |
| **Meta Description / Meta描述** | 搜索结果摘要，建议120-160字符 | ❌ |
| **H1 / H1标题** | 页面主标题，留空则使用 Title | ❌ |
| **Excerpt / 摘要** | 文章列表页显示的简短描述 | ❌ |
| **Category / 分类** | 选择文章所属分类 | ✅ |

### 2.3 分类说明

- **Cost & Planning / 成本与规划**: 造价、成本、项目规划
- **Import & Shipping / 进口与运输**: 进口流程、运输费用、装柜
- **Manufacturing & Quality / 制造与质量**: 制造流程、质量控制、焊接
- **Installation & Technical / 安装与技术**: 安装指南、技术参数、基础
- **Supplier Selection / 供应商选择**: 如何选择供应商、验厂
- **Materials & Components / 材料与构件**: 钢材牌号、构件类型、防腐

### 2.4 上传封面图片

1. 在 **Cover Image / 封面图片** 字段点击 **Choose File**
2. 选择本地图片上传
3. 在 **Cover Image Alt** 填写图片描述（不要关键词堆砌）

> **图片命名建议**: 使用有意义的文件名，如 `steel-structure-container-loading.jpg`，不要用 `IMG_1234.jpg`

### 2.5 编辑正文

在 **Body / 正文** 字段使用 Markdown 格式编辑文章内容。

支持的格式：
- `## 二级标题` / `### 三级标题`
- **粗体** / *斜体*
- - 无序列表 / 1. 有序列表
- `[链接文字](URL)`
- `![图片描述](图片URL)`
- `> 引用文字`
- 表格

### 2.6 设置发布状态

- **Draft / 草稿**: 不会出现在网站上，仅后台可见
- **Published / 已发布**: 发布后会出现在网站和 Resources 页面

> 新文章默认是 **Draft** 状态，确认内容无误后再改为 **Published**

### 2.7 其他字段

| 字段 | 说明 |
|------|------|
| **Published Date / 发布日期** | 文章发布日期 |
| **Updated Date / 更新日期** | 文章最后更新日期 |
| **Translation Key / 翻译关联Key** | 中英文对应文章填写相同的Key，建立语言关联 |
| **CTA Type / CTA类型** | 文章底部的行动按钮类型 |
| **No Index / 不被索引** | 测试页或草稿页勾选，不被Google索引 |

---

## 三、保存草稿与预览

### 3.1 保存草稿

1. 编辑完成后，点击右上角 **Save**
2. 文章会保存为 Draft 状态，不会出现在网站上

### 3.2 预览文章

由于 CMS 使用 Git-based 架构，预览需要通过以下方式：

1. 将文章状态改为 **Published** 并保存
2. 等待 Cloudflare Pages 自动构建（通常2-3分钟）
3. 访问 `https://zhongsai-steelstructure.com/en/blog/文章slug/` 查看效果
4. 如果需要修改，回到后台编辑，再次保存会触发重新部署

> **临时预览方案**: 如果不想立即发布，可以先保存为 Draft，然后让技术人员在本地构建预览

---

## 四、发布文章

### 4.1 发布流程

1. 确认文章内容无误
2. 将 **Status / 状态** 改为 **Published / 已发布**
3. 填写 **Published Date / 发布日期**
4. 点击右上角 **Publish**（或 Save）
5. CMS 会自动将文章提交到 GitHub
6. Cloudflare Pages 检测到 GitHub 更新后自动构建部署
7. 约2-3分钟后，文章正式上线

### 4.2 发布后检查

发布后请检查：
- ✅ 文章页面可以正常访问
- ✅ 出现在 Resources 页面对应分类下
- ✅ 出现在 sitemap.xml 中
- ✅ 页面标题、描述正确
- ✅ 图片显示正常
- ✅ 内部链接有效

---

## 五、修改已有文章

1. 在左侧菜单选择 **Blog (English)** 或 **Blog (中文)**
2. 点击要修改的文章标题
3. 编辑内容
4. 更新 **Updated Date / 更新日期**
5. 点击 **Save** 保存
6. 等待自动部署完成

---

## 六、撤回 / 删除文章

### 6.1 撤回已发布文章

1. 打开文章
2. 将 **Status / 状态** 改为 **Draft / 草稿**
3. 点击 **Save**
4. 文章会从网站上移除，但文件仍保留在 GitHub 中

> **注意**: 已被 Google 索引的文章，撤回后可能需要一段时间才会从搜索结果中消失。建议设置 301 重定向到相关页面。

### 6.2 永久删除文章

1. 在文章列表中，鼠标悬停在文章上
2. 点击 **Delete**
3. 确认删除

> **警告**: 删除已发布且被索引的文章会导致 404 错误，影响 SEO。删除前请确认是否需要设置 301 重定向。

---

## 七、图片管理

### 7.1 上传图片

1. 在文章编辑器中，点击图片上传按钮
2. 选择本地图片
3. 图片会自动上传到 `public/images/blog/` 目录
4. 复制生成的图片URL到正文中使用

### 7.2 图片规范

- **格式**: 推荐 WebP 或 JPEG
- **尺寸**: 封面图建议 1200x630px，正文图建议宽度不超过 1600px
- **大小**: 单张图片不超过 500KB
- **命名**: 使用有意义的英文文件名，用连字符分隔单词
- **Alt Text**: 每张图片都要填写描述性的 Alt Text

### 7.3 图片优化

上传前建议使用工具压缩图片：
- https://tinypng.com/ （在线压缩）
- https://squoosh.app/ （在线格式转换和压缩）

---

## 八、SEO 字段填写指南

### 8.1 SEO Title

- 格式: `文章标题 | ZhongSai Steel Structure`（英文）或 `文章标题 | 中赛钢结构`（中文）
- 长度: 建议50-60字符
- 不要关键词堆砌
- 包含核心关键词

### 8.2 Meta Description

- 长度: 建议120-160字符
- 概括文章核心内容
- 包含核心关键词
- 吸引用户点击

### 8.3 H1

- 每页只能有一个 H1
- 默认使用文章标题
- 包含核心关键词
- 清晰表达文章主题

### 8.4 内部链接

文章中应自然地链接到网站其他相关页面：
- 产品页面: `/en/steel-workshop/`, `/en/steel-warehouse/`
- 构件页面: `/en/components/steel-trusses/`
- 能力页面: `/en/manufacturing/`, `/en/export-delivery/`
- 其他文章: `/en/blog/其他文章slug/`

> 不要每篇文章都链接所有页面，只链接真正相关的内容。

---

## 九、事实安全检查清单

发布前请确认文章中**没有**以下内容：

- [ ] 未经确认的公司数据（如 60+ countries, 700+ containers, 20+ years）
- [ ] 固定价格或固定运费（如 $XX/m², 固定运输费用）
- [ ] 虚假承诺（如 Guaranteed delivery, Free design, 24-hour quotation）
- [ ] 未经确认的认证声明（如 我们拥有 CE 证书，除非已确认）
- [ ] 虚假海外项目案例
- [ ] 虚构客户名称或客户评价
- [ ] 节省比例承诺（如 Save 30%-50%）

如果文章包含以上内容，请修改或删除后再发布。

---

## 十、常见问题

### Q1: 发布后网站没有更新？

A: Cloudflare Pages 构建需要2-3分钟。可以在 Cloudflare Dashboard → Pages 查看构建状态。如果构建失败，检查文章内容是否有格式错误。

### Q2: 文章没有出现在 Resources 页面？

A: 确认文章状态是 **Published**，并且选择了正确的 **Category**。Resources 页面会自动按分类显示已发布文章。

### Q3: 可以修改已发布文章的 Slug 吗？

A: 不建议修改。已发布文章的 URL 已经被 Google 索引，修改 Slug 会导致 404 错误，需要设置 301 重定向。如果必须修改，请联系技术人员处理。

### Q4: 如何让中英文文章互相关联？

A: 在中英文版本的 **Translation Key** 字段填写相同的值（如 `supplier-selection-guide`），系统会自动建立 hreflang 语言关联。

### Q5: 忘记 GitHub 密码怎么办？

A: CMS 使用 GitHub OAuth 登录，不需要在 CMS 中保存密码。如果 GitHub 账号无法登录，请通过 GitHub 官网找回账号。

### Q6: 可以多人同时编辑吗？

A: 可以，但同时编辑同一篇文章可能会产生冲突。建议编辑前确认没有其他人在修改同一篇文章。

### Q7: 发布失败怎么办？

A: 检查以下几点：
1. 必填字段是否都已填写（Title, Category）
2. Markdown 格式是否正确
3. 图片URL是否有效
4. GitHub 仓库是否可访问
5. Cloudflare Pages 构建日志是否有错误信息

---

## 十一、联系技术支持

如果遇到以下问题，请联系技术人员：
- CMS 无法登录
- 发布后构建失败
- 需要设置 301 重定向
- 需要修改网站核心结构（首页、产品页、导航等）
- 需要批量迁移旧文章
- GitHub OAuth 配置问题

> **CMS 只能管理技术文章内容**，不能修改首页、产品页、导航、Footer、项目案例等核心页面。这些页面需要通过代码修改。

---

*最后更新: 2026-09-08*
