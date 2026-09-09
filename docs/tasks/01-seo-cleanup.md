# TASK-01: 技术SEO清理与优化

> 优先级: P0
> 状态: 进行中
> 创建日期: 2026-09-09

---

## 任务目标

清理新旧页面并存问题，统一URL规范，修复301/Canonical/Sitemap/hreflang，清理旧产品URL体系，检查中英文页面对应关系，避免关键词蚕食，优化表单转化，完成桌面端+移动端真实页面验收。

**不是重新设计网站，也不是大规模新增页面。保持现有新版页面视觉和内容框架。**

---

## 一、P0：URL与旧页面清理

### 1.1 全站URL统一

- 所有正式页面使用尾部 `/`
- `/en/products` 必须301到 `/en/products/`
- 不能两个URL都返回200
- 不能使用JavaScript跳转或302
- 不能仅靠Canonical处理
- 不能保留两个不同版本页面

### 1.2 重点检查URL

- `/en/products` vs `/en/products/`
- `/en/contact` vs `/en/contact/`
- `/en/manufacturing-quality` vs `/en/manufacturing-quality/`
- `/zh/products` vs `/zh/products/`
- `/zh/contact` vs `/zh/contact/`
- 以及其他全站URL

### 1.3 输出

- `tools/seo-audit/URL_AUDIT.csv`
- 字段：旧URL、当前状态码、当前Title、当前H1、是否在Sitemap、Canonical、目标新URL、处理方式、备注
- 处理方式：KEEP / 301 / MERGE / DELETE / NOINDEX

---

## 二、旧产品URL体系清理

### 2.1 重点搜索旧URL

- `/en/products/industrial`
- `/en/products/steel-workshop`
- `/en/products/steel-warehouse`
- 全部 `/en/products/*` 和 `/zh/products/*`

### 2.2 处理规则

- 如果新版已存在对应页面，旧页面301到最相关新版页面
- 不能全部跳首页
- 不能全部跳 `/products/`
- 必须做到：旧页面主题 → 最接近的新页面
- 示例：
  - `/en/products/steel-workshop` → `/en/steel-workshop/`
  - `/en/products/steel-warehouse` → `/en/steel-warehouse/`
- 中文同步处理

---

## 三、根域名与语言目录

### 3.1 正式结构

- 英文：`/en/`
- 中文：`/zh/`

### 3.2 根域名处理

- 如果根域作为语言入口不存在独立内容，统一301到 `/en/`
- 不要让 `/` 和 `/en/` 同时返回两份近似首页内容

---

## 四、Canonical

### 4.1 要求

- 每个可索引正式页面必须存在self-referencing canonical
- 示例：页面 `https://zhongsai-steelstructure.com/en/steel-workshop/`，Canonical也是 `https://zhongsai-steelstructure.com/en/steel-workshop/`

### 4.2 检查项

- Canonical不得指向旧URL
- Canonical不得指向无斜杠版本
- 中文不能Canonical到英文
- 产品页不能全部Canonical到产品中心
- Pagination/参数URL单独检查

### 4.3 输出

- `tools/seo-audit/CANONICAL_AUDIT.csv`

---

## 五、hreflang

### 5.1 要求

- 中英文对应页面建立hreflang
- 必须互相引用：hreflang="en"、hreflang="zh"
- 主页增加x-default
- 如果某个英文页面没有真正对应中文页面，不要虚构hreflang

### 5.2 检查项

- URL必须返回200
- hreflang必须双向
- 不得指向301
- 不得指向noindex
- 不得指向Canonical不一致页面

### 5.3 输出

- `tools/seo-audit/HREFLANG_AUDIT.csv`

---

## 六、XML Sitemap

### 6.1 要求

- Sitemap中只允许：200页面、Canonical正式URL、可索引页面
- 不得出现：301、302、404、noindex、旧产品URL、重复URL、参数页面、测试页面

### 6.2 确认

- `/sitemap.xml` 能够正常访问

---

## 七、robots.txt

### 7.1 检查

- 没有误封 `/en/`、`/zh/`、`/products/`、`/projects/`、`/resources/`
- 允许Google抓取CSS/JS/图片资源
- robots.txt中加入正确Sitemap地址
- 不得用robots.txt代替noindex

---

## 八、内部链接全部指向正式URL

### 8.1 扫描范围

- 导航、Footer、Breadcrumb、CTA、正文链接、产品推荐、Related Resources、项目推荐、语言切换

### 8.2 要求

- 不得继续链接到旧 `/products/...`
- 不得链接到无斜杠版本
- 不得链接到301页面
- 不得链接到404页面
- 原则：内部链接直接指最终200 URL，不要让用户和Google A→301→B

---

## 九、404与Redirect Chain

### 9.1 扫描

- 404、软404、Redirect Chain、Redirect Loop

### 9.2 要求

- 所有有效旧页面：旧URL → 一次301 → 最终200
- 禁止：旧URL → 301 → 301 → 301 → 新页面

---

## 十、产品与栏目结构

### 10.1 保留新版主体系

- Industrial & Manufacturing
- Warehousing & Logistics
- Agriculture & Livestock
- Commercial & Public
- Transportation & Infrastructure
- Mining / Energy / Heavy Industry
- Special Steel Structures

### 10.2 关键词边界检查

- 尤其：Industrial & Manufacturing 不要与 Steel Workshop、Steel Factory、Industrial Building 争抢同一关键词
- 如果目前Industrial & Manufacturing直接指向Steel Workshop页面，先不要贸然改URL，记录为P1信息架构问题
- 后续可考虑 `/en/industrial-manufacturing/` 作为Hub Page，下面链接 `/en/steel-workshop/`、`/en/steel-factory/`、`/en/crane-workshop/` 等
- 本轮不能因为优化结构就随意改掉已有重要URL

---

## 十一、Title / Meta / H1

### 11.1 检查页面

- Homepage、Products、Product Category、Product Detail、Projects、About、Manufacturing & Quality、Resources、Contact

### 11.2 要求

- 每页1个H1
- Title唯一
- Meta Description唯一
- 不能出现6个产品分类Title完全一样
- 避免多个页面主打steel structure manufacturer、steel structure workshop、steel structure warehouse却内容高度重叠

### 11.3 输出

- `tools/seo-audit/SEO_METADATA_AUDIT.csv`
- 字段：URL、Title、Meta、H1、主关键词、问题、建议

---

## 十二、Projects案例页面

### 12.1 要求

- 案例页必须避免让用户误认为ZhongSai承建整个项目
- 每个案例尽量增加字段：Project Name、Location、Year、Project Type、ZhongSai Scope、Steel Tonnage、Services Provided、Manufacturing Scope、Export / Delivery Scope
- 如果实际参与范围只是Steel Fabrication、Component Supply、Detailing、Export Supply，必须明确写出来
- 不得虚构客户、吨位、合同金额、项目角色、施工范围、认证、合作关系
- 如果资料不确定，保留现有内容，不自行编造

---

## 十三、About / Certification

### 13.1 检查所有证书

- 如果证书公司主体不是Shenzhen ZhongSai Steel Structure Import and Export Co., Ltd.，需要在证书附近保留真实主体说明
- 例如：Certificate holder: XXX Manufacturing entity / production base associated with ZhongSai Steel Structure.
- 不能让客户误认为证书主体一定就是中赛进出口公司
- 不得修改证书图片上的真实信息

---

## 十四、Contact表单CRO优化

### 14.1 目标客户

- 主要目标客户是海外华人
- 网站默认优先微信沟通

### 14.2 建议字段

- 姓名：必填
- 项目国家/地区：必填
- 微信ID：必填
- WhatsApp/电话：选填
- 邮箱：选填
- 项目类型：建议必填
- 项目预计时间：建议选填或单选
- 图纸上传：选填
- 项目描述：选填

### 14.3 硬规则

- 不要同时强制微信+WhatsApp+电话+邮箱，否则会降低提交率
- 如果系统因为销售流程必须保留电话字段，可以保留，但不要强制

---

## 十五、隐藏Honeypot

### 15.1 要求

- 如果表单中存在Website作为反垃圾字段Honeypot
- 前端必须对真实用户完全不可见
- 同时不能影响屏幕阅读器、自动填充、移动端布局

---

## 十六、Schema

### 16.1 检查并补充

- Homepage：Organization、WebSite
- 产品页：Product或Service
- 项目页：Article或适合的Project/CreativeWork结构
- 博客/Resource：Article
- FAQ页面：FAQPage
- 所有内页：BreadcrumbList

### 16.2 硬规则

- Schema中内容必须与页面实际可见内容一致
- 禁止虚构Reviews、AggregateRating、Awards、Clients、Certifications、价格、库存
- 使用Google Rich Results Test格式标准验证

---

## 十七、GEO / AEO

### 17.1 保持并强化

- 中赛是谁、做什么、不做什么、服务哪些客户、制造能力、出口能力、技术指导、工厂信息、认证、项目证据、FAQ、第一方数据、第一方流程

### 17.2 页面尽量使用

- 明确结论、定义、流程、表格、FAQ、项目数据、真实案例、技术参数

### 17.3 减少

- leading、world-class、best、top、manufacturer、excellent、quality这类没有证据的营销词

---

## 十八、Resources内容清理

### 18.1 要求

- 暂时不要批量生成新文章
- 先扫描现有全部Resource/Blog
- 输出CONTENT_AUDIT.csv

### 18.2 字段

- URL、Title、主题、搜索意图、目标关键词、是否重复、质量、是否有流量价值、建议动作

### 18.3 动作

- KEEP / UPDATE / MERGE / 301 / DELETE

### 18.4 重点检查

- AI痕迹明显标题、语法错误、薄内容、重复内容、多个页面抢同一关键词、过时内容
- 例如："How To Steel Structure Cost"这种不自然标题需要重写

---

## 十九、页面速度

### 19.1 检查

- 桌面端+移动端：LCP、INP、CLS
- 重点：Hero背景图、产品图片、项目图片、视频、第三方脚本、字体、JS Bundle

### 19.2 要求

- 图片：WebP/AVIF、正确尺寸、懒加载、首屏关键图不要lazy-load、设置width/height避免布局偏移
- 不要为了跑分破坏现有视觉

---

## 二十、移动端

### 20.1 必须真实检查

- 375px、390px、430px

### 20.2 至少检查

- 首页、Products、Workshop、Warehouse、Projects、About、Contact、Resource、Article

### 20.3 重点

- 导航、字体、按钮、表格、图片、FAQ、Sticky CTA、表单、上传文件、语言切换、Footer

### 20.4 硬规则

- 不能只缩放浏览器窗口

---

## 二十一、品牌规则

### 21.1 全站只允许出现

- 中赛钢结构、中赛钢构、ZhongSai Steel Structure

### 21.2 不得出现

- 其他公司Logo或品牌

### 21.3 如果图片中存在第三方Logo

- 允许：裁剪、遮挡、使用处理后的网页副本
- 但不得修改原始文件
- 如无法自然处理，停止使用该图片

---

## 二十二、不要做的事情

### 22.1 本次禁止

- 批量删除页面
- 大范围修改正式URL
- 改域名
- 改语言目录
- 删除已有排名页面而不做301
- 批量生成AI博客
- 重做整体UI
- 替换中赛Logo
- 虚构认证/案例/项目
- 修改Analytics ID
- 修改表单提交接口而不测试
- 修改DNS
- 改robots后不检查抓取
- Sitemap中保留301页面

---

## 二十三、上线前备份

### 23.1 任何修改前

- Git commit
- 建议创建technical-seo-cleanup分支
- 保留：当前线上版本、旧URL列表、301映射表、Sitemap备份
- 涉及批量URL修改必须可以回滚

---

## 二十四、验收

### 24.1 代码改完不代表完成

- 必须真实访问并检查Desktop、Mobile
- 验证：200、301、404、Canonical、hreflang、robots、Sitemap、Schema、导航、Footer、语言切换、表单、按钮、上传文件、CTA、图片、Breadcrumb、Analytics

### 24.2 抽查至少

- 20个英文URL
- 20个中文URL
- 全部主要栏目页

---

## 二十五、最终交付报告

### 25.1 必须输出

1. 修改文件：列出所有修改文件
2. 301映射：旧URL → 新URL
3. 删除/合并页面：说明原因
4. Canonical修复：列出核心变化
5. Sitemap：给出最终Sitemap地址和页面数量
6. hreflang：说明中英文匹配逻辑
7. 404：列出仍存在的异常URL
8. SEO Metadata：列出修复页面
9. Schema：列出新增/修改Schema
10. 表单：说明字段变化及测试结果
11. 移动端：列出测试设备尺寸
12. 未解决问题：按照P0/P1/P2/P3分类

---

## 二十六、最终验收标准

### 26.1 完成后必须满足

- 一个内容只有一个正式URL
- 旧URL正确301
- 无Redirect Chain
- Sitemap不包含旧URL
- Canonical全部统一
- hreflang双向正确
- 导航不指向301
- 无重要404
- 中英文结构对应
- Title/H1无大面积重复
- 表单可正常提交
- 微信字段正确
- 手机端布局正常
- Schema无严重报错
- 不损害现有页面SEO
- 不改变中赛商业定位

### 26.2 最终目标

不是单纯"修代码"，而是把网站变成一个：
- 搜索引擎容易抓取和排名
- AI搜索容易理解和引用
- 海外客户容易判断中赛能力
- 广告流量进入后容易提交询盘
的完整B2B钢结构出口网站。

---

## 执行进度

- [x] 确认Git基线（HEAD: fb0f21e）
- [x] 读取sitemap.xml（110个URL，全部带斜杠）
- [x] 创建URL审计脚本
- [x] 运行URL审计（252个URL）
- [ ] 分析URL审计结果
- [ ] 修复non-slash 200问题
- [ ] 清理旧产品URL体系
- [ ] 检查Canonical
- [ ] 检查hreflang
- [ ] 检查Sitemap
- [ ] 检查robots.txt
- [ ] 扫描内部链接
- [ ] 检查404和Redirect Chain
- [ ] 检查Title/Meta/H1
- [ ] 检查Schema
- [ ] 优化Contact表单
- [ ] 检查移动端
- [ ] 构建部署
- [ ] 验收
- [ ] 生成最终报告
