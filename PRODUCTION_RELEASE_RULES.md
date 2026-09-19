# 中赛钢构官网 — 生产发布安全规则（PRODUCTION RELEASE RULES）

适用仓库：`D:\zhongsai-website-v2`（Astro 静态站，部署到 Cloudflare Pages `zhongsai-website-v2`）。
本文件是**强制发布纪律**，目的是杜绝“脏工作树整包 build + 手工裁剪 dist”把未批准内容夹带上线。

---

## 1. 核心禁令

1. **禁止从 dirty worktree 直接做生产部署。**
2. **禁止 `git add .` / `git commit -a` 无差别提交。** 只允许按路径精确暂存（explicit pathspec）。
3. **禁止把“build 完再手工删/改 dist 文件”作为长期发布手段。** dist 必须由干净源码自然构建得到；如曾临时裁剪 dist，必须回溯到源码层修正，再做一次干净构建。
4. **禁止把未批准的 WIP（图片、文案、SEO、实验页）放进会进入构建的路径（`src/`、`public/`、`functions/`）后直接构建生产包。**
5. 未明确要求时**不推送 GitHub**；Cloudflare Pages 为默认发布目标。任何生产部署仍需用户明确授权。

## 2. 发布前必须满足的条件

每次生产部署前，先在仓库根目录执行并核对：

```powershell
git status --short
git diff --stat
git diff --name-only
```

只有满足以下之一才允许构建生产包：

- **Clean Worktree**：`git status` 干净，源码处于已确认的 release commit；或
- **明确的 Release Commit / Release Branch**：本次要上线的改动已在一个命名清晰的提交/分支上，且已逐文件确认范围。

构建前必须能回答：本次构建里每一处源码改动属于“已批准上线”，未批准内容已隔离到 WIP 分支/目录。

## 3. 标准发布流程

```powershell
# 1) 范围门禁：只应包含本次批准的改动
git status --short
# 2) 干净构建（环境变量按需设置；不要手改 dist）
$env:PUBLIC_GA_MEASUREMENT_ID="G-KHMJM1QRCT"
$env:PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAAEqsUE0gIcgV1fbT"
if (Test-Path dist) { Remove-Item -Recurse -Force dist }
npm run build
npm run seo:check
# 3) Preview / 本地核对（页面、sitemap、redirect、无未批准素材）
# 4) 经用户明确授权后才部署生产
npx wrangler pages deploy dist --project-name=zhongsai-website-v2 --branch=main
# 5) 上线后做生产域 HTTP / canonical / hreflang / 关键事件抽查
```

`npm run seo:check` 基线（2026-09-18）：165 pages、sitemap 136 `<loc>`、94 en/zh 对、9 single-language、dangling alternates = 0、redirects 71（static 57 + dynamic 14）、`SHADOWED_WRONG_TARGET = 0`。明显偏离时**停止发布并排查**。

## 4. 未完成改动（WIP）隔离规则

- 未批准的实验性改动（如换图、新模板、文案试验）一律放到**独立 WIP 分支**或**不进入构建的目录**，不得留在 `main` 工作树的构建路径里“等以后再说”。
- 隔离必须**完整保存**：源码改动、新增素材（图片等）、引用关系、说明，缺一不可。
- WIP 经审核批准后，单独发布；不与其他任务混装。

---

## 5. 当前在隔离中的 WIP：特种定制页换图（NOT APPROVED FOR PRODUCTION）

- **WIP 分支**：`wip/custom-page-image-replacement`
- **WIP 提交**：`95c2b22` — “WIP: custom page image replacement - NOT APPROVED FOR PRODUCTION”
- **基线**：从 `main`（`f6eaaff`）切出，仅含 9 个文件：
  - `src/pages/en/special-custom-steel-structures/index.astro`
  - `src/pages/zh/special-custom-steel-structures/index.astro`
  - `src/pages/en/products/index.astro`
  - `src/pages/zh/products/index.astro`
  - `public/images/products/special-large-twisted-structure-hero.jpg`
  - `public/images/products/special-complex-curved-fabrication.jpg`
  - `public/images/products/special-large-spiral-staircase.jpg`
  - `public/images/products/special-steel-platform-mezzanine.jpg`
  - `public/images/products/special-led-screen-steel-frame.jpg`
- **内容**：把中英 special 详情页 5 个图位、中英 products hub 第 07 张卡片换成“大型异形结构”新渲染图。仅图片 `src`/`alt` 变更，无正文/SEO/结构改动。
- **main 现状**：上述 4 个源码文件已回到原始旧图引用，5 张新 jpg 不在 main 工作树/构建产物中（安全保存在 WIP 分支）。

### 如何取回继续编辑（恢复方法）

方式 A（在 WIP 分支上继续，推荐）：

```powershell
git checkout wip/custom-page-image-replacement
# 继续改；新图与引用都在该分支
# 审核通过后，再决定如何合并/发布
```

方式 B（只把换图改动取回到 main 工作树审阅，不提交）：

```powershell
# 在 main 上，把该 WIP 提交的 4 个源码文件 + 5 张图取出到工作树（不提交、不构建生产包）
git checkout wip/custom-page-image-replacement -- `
  src/pages/en/special-custom-steel-structures/index.astro `
  src/pages/zh/special-custom-steel-structures/index.astro `
  src/pages/en/products/index.astro `
  src/pages/zh/products/index.astro `
  public/images/products/special-large-twisted-structure-hero.jpg `
  public/images/products/special-complex-curved-fabrication.jpg `
  public/images/products/special-large-spiral-staircase.jpg `
  public/images/products/special-steel-platform-mezzanine.jpg `
  public/images/products/special-led-screen-steel-frame.jpg
# 审阅完成若不批准，用 `git checkout -- <4 个源码文件>` 还原，并删除 5 张新 jpg
```

> 注意：WIP 提交基于较早的 `f6eaaff`，取回 4 个源码文件会覆盖这些文件在 main 上的当前版本；恢复前先确认这些文件在 main 上没有新的已批准改动（本次清理时它们的唯一差异就是换图）。

---

## 6. 不进入生产构建的文件（可留在工作树，但不得误提交/误部署）

以下根目录/非构建路径文件不参与 Astro 构建，发布时**不得**打包或提交进 release：

- `dist.zip`（历史构建压缩包）
- `migrations/`（D1 SQL，仅数据库用）
- `新Google表格脚本.js`、`表头.csv`、`表头32列.csv`（表格对接杂项）
- `tools/seo-audit/`、`seo-redirects/`（治理/审计脚本与记录，非站点产物；可单独版本化）

Astro 仅构建 `src/pages`、`src/content` 与 `public/` 静态资源、`functions/`；仓库根的 `.md`/杂项不会进入站点产物。

## 7. 已知生产偏差（待一次干净部署对齐）

此前为排除未批准换图，曾对**构建产物 dist 做过一次性手工回退**，导致生产 special 详情页两个图位引用了源码中并不存在的图片：

- `/images/products/detail-complex-fabrication.jpg`（生产 404）
- `/images/products/detail-truss-roof-fabrication.jpg`（生产 404）

干净源码构建引用的是真实存在的原始图：`03-commercial-public.jpg`、`detail-spiral-staircase.jpg`、`06-custom-engineering.jpg`、`app-special-custom.jpg`。
**下一次经授权的干净生产部署会自然修复这两个 404 图位并与源码对齐**，无需也不应再手改 dist。
