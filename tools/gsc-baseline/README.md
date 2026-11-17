# GSC 搜索数据基线导入目录（PHASE 15）

本目录用于存放 Google Search Console **效果（Performance → Search results）** 的真实导出数据。
所有商业 SEO 增长判断都以这里的数据为准；没有数据的结论一律标记 DATA GAP，不靠猜。

> 本目录只放数据文件与本说明，不修改任何网页源码、URL、表单、GA4、D1。

---

## 一、需要导出的数据（共 8 个 CSV）

两个**连续、等长（各 28 天）**的统计周期 × 四个维度。

| 周期 | 用途 | 说明 |
|------|------|------|
| Period A（近 28 天） | 当前表现 | 最近一个完整 28 天窗口 |
| Period B（前 28 天） | 环比对比 | 紧接 Period A 之前的 28 天窗口 |

每个周期分别导出 4 个维度：

1. **Queries**（查询词）
2. **Pages**（页面）
3. **Countries**（国家/地区）
4. **Devices**（设备：Desktop / Mobile / Tablet）

---

## 二、导出步骤（Search Console 网页版）

1. 打开 https://search.google.com/search-console ，选择资源
   `https://zhongsai-steelstructure.com/`（域名资源或网址资源，选实际已验证的那个）。
2. 左侧菜单 **效果（Performance）→ Search results（搜索结果）**。
3. 顶部时间选择器，选 **自定义（Custom）**，手动框选 28 天区间。
   - 建议 Period A：今天往前推 28 天（含今天）。
   - Period B：Period A 开始日再往前推 28 天，与 Period A **首尾相接、不重叠**。
   - ⚠️ 两个周期的**起止日期必须记录到 `MANIFEST.csv`**，否则环比无意义。
4. 依次点顶部 4 个标签：**查询词 / 网页 / 国家/地区 / 设备**。
   每点一个标签，点右上角 **「导出 → CSV」** 下载。
5. 下载的 CSV 直接放进本目录，按下文命名规范重命名。

> 本站 28 天点击量约 78，远低于 GSC 单表 1000 行上限，**每个维度一次导出即可拿全量**，无需分页。

---

## 三、文件命名规范

```
gsc-<周期>-<维度>.csv
```

| 维度 | 文件名示例（Period A） | 文件名示例（Period B） |
|------|------------------------|------------------------|
| Queries | `gsc-A-queries.csv` | `gsc-B-queries.csv` |
| Pages | `gsc-A-pages.csv` | `gsc-B-pages.csv` |
| Countries | `gsc-A-countries.csv` | `gsc-B-countries.csv` |
| Devices | `gsc-A-devices.csv` | `gsc-B-devices.csv` |

直接使用 GSC 导出的原始列即可，不要手动删列或改列名。原始列形如：
`Top queries / Page / Country / Device, Clicks, Impressions, CTR, Position`（语言环境不同首列名可能为中文，保留原样）。

---

## 四、每批数据必须登记到 MANIFEST.csv

每放一个 CSV，在 `MANIFEST.csv` 追加一行，记录：

- 导出日期（实际下载那天）
- 统计起 / 止日期
- 周期代号（A=近28天，B=前28天）
- 维度（queries/pages/countries/devices）
- 文件名
- 数据来源（Search Console 哪个资源、哪个账号）
- 备注（如有匿名查询「—」、抽样说明等）

---

## 五、数据到位后能做什么（PHASE 15 分析清单）

数据齐全后，可输出：

- 商业关键词分类（Manufacturer / Supplier / Exporter / Workshop / Warehouse / Mining / Agricultural / Components / Informational）
- 排名 4–20 的商业词冲刺清单
- 高曝光低 CTR 页面（先查意图与排名，不直接改 Title）
- 页面环比涨跌榜
- 国家 / 设备差异
- 关键词 → 承接 URL 映射与蚕食检查
- 与 GA4 转化数据（form_start / whatsapp_click / phone_click）对账

## 六、当前状态

- [ ] gsc-A-queries.csv
- [ ] gsc-A-pages.csv
- [ ] gsc-A-countries.csv
- [ ] gsc-A-devices.csv
- [ ] gsc-B-queries.csv
- [ ] gsc-B-pages.csv
- [ ] gsc-B-countries.csv
- [ ] gsc-B-devices.csv

**当前（PHASE 15 启动时）：以上 8 个文件全部缺失，仅有用户口头提供的 28 天聚合数（点击 78 / 展示 6,339 / CTR ≈1.23%，2026-10-01～2026-10-28），以及历史 404 报告。查询词/页面/国家/设备四个维度明细均为 DATA GAP。**
