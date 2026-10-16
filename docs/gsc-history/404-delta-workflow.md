# GSC 404 Delta 工作流（2026-10-07 起）

目标：以后每次从 Google Search Console 导出 404 数据后，用同一套归一化 + diff 逻辑，可靠回答"本次新增 / 已解决 / 仍存在哪些 404"，不再依赖截图趋势或人工猜测。

## 一、文件位置

| 角色 | 路径 |
|---|---|
| 基线脚本 | `tools/gsc/build_404_baseline.py` |
| 去重/归一化核查 | `tools/gsc/check_merge.py` |
| 2026-10-07 原始导出 | `docs/gsc-history/2026-10-07-404-raw.csv` |
| 2026-10-07 标准化 | `docs/gsc-history/2026-10-07-404-normalized.csv` |
| 2026-10-07 基线摘要 | `docs/gsc-history/404-baseline-2026-10-07.md` |
| 历史基线（2026-09，唯一可 diff 旧列表） | `tools/gsc/not-found-404-2026-09.csv` |

## 二、每次新导出怎么做

1. 在 GSC → 网页 → 未找到 (404) → 导出表格（CSV）。
2. 解压到 `tools/gsc/current-404-<日期>/`（保留 `表格.csv` 原名即可）。
3. 打开 `build_404_baseline.py`，把顶部 `CURRENT_CSV` 指向新文件；`SEP_CSV` 保持指向上一次基线（默认 2026-09）。
4. 运行：`python tools/gsc/build_404_baseline.py`
5. 脚本自动产出三份文件到 `docs/gsc-history/`，并打印：
   - NEW（当前有、上次无）
   - RESOLVED（上次有、当前无）
   - STILL PRESENT（两者都有）
6. 把新产物重命名为带日期的基线文件（如 `2026-11-07-404-*`），并把 `SEP_CSV` 更新为最新一份，供下次 diff。

## 三、归一化规则（不可变）

- 只去掉 `https://` 与域名前缀；**保留 path 原样**（大小写、`.html`、尾斜杠）。
- **query 参数不删除**，独立成 `query` 列；比较 key = path + query。
- 已知保留为两条独立记录的示例：
  - `/en/contact.html?source=factory`
  - `/en/contact.html?source=export`
- 禁止合并 `/zh/countries/South Africa` 之类含空格、引号的变体。

## 四、分类与优先级口径

| 类别 | 含义 | 处置 |
|---|---|---|
| A_LEGACY_COUNTRY_PAGE | 旧国家页 | 有等价页可评估 301，否则保持 |
| B_LEGACY_BLOG/PROJECT/PRODUCT/SOLUTION | 旧内容页 | .html→新 slug 可 301；跨语言需批准 |
| C_LEGACY_ROOT_* | 无语言前缀旧根页 | 有等价页可 301，否则保持 |
| D_MALFORMED | 畸形 URL（zh/zh/ 等） | 明确目标才 301 |
| E_SCANNER_JUNK | 扫描器/机器人噪音 | 保持 404，禁跳 |
| P0 | 站内链接仍指向该 404 | 最高优先修站内链接 |
| P1 | 上次基线已存在 + 有等价页 | 精确 301 候选 |
| P2 | 新增 + 有等价页 | 低优先 301 候选 |
| P3 | 无等价页 / 合法 404 / 噪音 | 保持 404 |

## 五、重要纪律

- **不伪造 diff**：没有 URL 级旧列表时，不声称"新增 X 条"。2026-10-07 之前唯一的 URL 级历史基线是 2026-09 的 100 条。
- **跨语言 301 需人工批准**：ZH→EN / EN→ZH 仅当同语言无等价页且明确批准才做。
- **等价页以构建产物 `dist/` 为准**（部署前需确认 dist 是当前 Production 基线构建）。
- 本轮审计不改 Production；P0/P1 修复顺序由用户确认后另行执行。
