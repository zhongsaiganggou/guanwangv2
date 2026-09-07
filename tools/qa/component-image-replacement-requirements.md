# V2 Components 页面图片替换素材需求

> 本文档仅列出替换需求与候选路径，**未经人工确认不要更换图片**。
> 生成日期：2026-09-07

## 1. Steel Trusses（钢桁架）

**当前图片**：
- Hero: `/images/components/steel-truss-hero.jpg`

**问题评估**：
- 需人工确认图片是否准确表现钢桁架（管桁架、屋架、桁架梁）
- 需确认是否为 AI 生成图，是否被当作中赛真实生产证据

**替换需求**：
- 图片应清晰表现：钢桁架结构、管桁架、屋架梁、桁架节点连接
- 优先使用：真实中赛工厂桁架生产照片（如有）
- 备选：高质量 AI 产品渲染图（标记为 ai-product-visual，不得冒充真实项目）

**候选路径**：
- 真实照片（待确认是否存在）：`/images/components/real/steel-truss-fabrication.jpg`
- AI 产品渲染：`/images/components/ai/steel-truss-product-illustration.webp`

---

## 2. Steel Purlins（钢檩条）

**当前图片**：
- Hero: `/images/components/steel-purlins-hero.jpg`

**问题评估**：
- 需人工确认图片是否准确表现 C 型钢檩条、Z 型钢檩条
- 需确认是否包含混合/非标准檩条剖面
- 需确认是否为 AI 生成图

**替换需求**：
- 图片应清晰表现：C 型钢檩条、Z 型钢檩条、冷弯成型、檩条堆叠
- 优先使用：真实中赛工厂檩条生产照片（如有）
- 备选：高质量 AI 产品渲染图，分别展示 C 型和 Z 型剖面

**候选路径**：
- 真实照片（待确认是否存在）：`/images/components/real/steel-purlins-production.jpg`
- AI 产品渲染：`/images/components/ai/c-z-purlin-profile-illustration.webp`

---

## 3. Roof & Wall Cladding Systems（屋面墙面围护系统）

**当前图片**：
| 位置 | 当前图片 | 问题 |
|------|----------|------|
| Hero | `/images/components/finished-steel-members-stacked.jpg` | **语义不匹配**：钢构件堆放图，不是围护系统 |
| Section 1 | `/images/components/brochure-envelope-system-overview.jpg` | 可能可用，需确认 |
| Section 2 | `/images/components/finished-coated-components.jpg` | 钢构件图，非围护板 |
| Section 3 | `/images/products/01-industrial.jpg` | 工业厂房图，非围护产品 |
| Section 4 | `/images/components/brochure-envelope-system-detail.jpg` | 可能可用，需确认 |
| Section 5 | `/images/products/04-warehouse-logistics.jpg` | 仓库物流图，非围护产品 |
| Section 6 | `/images/components/finished-steel-beams-columns.jpg` | 梁柱图，非围护板 |
| Section 7 | `/images/components/finished-coated-components.jpg` | 钢构件图，非围护板 |
| Section 8 | `/images/components/finished-steel-members-stacked.jpg` | 钢构件图，非围护板 |
| Section 9 | `/images/container-loading.jpg` | 装柜图，非围护产品 |

**核心问题**：
- Hero 图严重语义不匹配（钢构件堆放 ≠ 围护系统）
- 多个 Section 使用钢构件、厂房、仓库、装柜等不相关图片
- 缺少真实的彩钢板、夹芯板、屋面板、墙面板照片

**替换需求**：
- Hero 图应表现：现代钢结构建筑的屋面和墙面围护系统全景
- 各 Section 应分别表现：
  - 屋面板（压型钢板、彩钢板）
  - 墙面板
  - 夹芯板（明显可见芯材层截面）
  - 围护附件（收边、天沟、泛水、连接附件）
- 优先使用：真实围护系统照片（如有）
- 备选：高质量 AI 产品渲染图 + 技术示意图（截面图、节点图）

**候选路径**：
- Hero（AI 应用概念图）：`/images/components/ai/roof-wall-cladding-application-concept.webp`
- 屋面板（AI 产品渲染）：`/images/components/ai/roof-panels-product-illustration.webp`
- 墙面板（AI 产品渲染）：`/images/components/ai/wall-panels-product-illustration.webp`
- 夹芯板（AI 截面图）：`/images/components/ai/sandwich-panel-section-illustration.webp`
- 围护附件（AI 示意图）：`/images/components/ai/cladding-accessories-illustration.webp`

---

## 通用规则

1. **AI 图片标记**：所有 AI 生成图必须在 image manifest 中标记为 `ai-illustration` / `ai-product-visual` / `ai-application-concept`，不得标记为 `real-project` / `real-factory` / `real-component-photo`
2. **AI 图禁止事项**：禁止在 AI 图中生成中赛 LOGO、相似 LOGO、错误中文品牌字样；禁止 AI 图冒充真实中赛项目/工厂证据
3. **真实照片优先**：如有中赛真实生产照片，优先使用真实照片
4. **概念图标注**：如 AI 建筑效果图非常写实，页面附近应使用 "应用示意图" / "Concept Visualization" 标注
5. **Alt 文本**：描述画面实际内容，不堆砌关键词；AI 图如可能被误认为真实，Alt 可使用 "concept visualization of..." / "product illustration of..."

---

## 待人工确认事项

- [ ] Steel Trusses 当前 Hero 图是否准确？是否为 AI 生成？
- [ ] Steel Purlins 当前 Hero 图是否准确？是否包含非标准檩条剖面？
- [ ] Cladding 页面是否有真实围护系统照片可用？
- [ ] 是否允许使用 AI 产品渲染图替换上述不匹配图片？
- [ ] 替换后是否需要重新进行视觉验收？
