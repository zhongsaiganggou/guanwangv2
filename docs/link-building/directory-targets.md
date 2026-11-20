# 外链目标清单（按「买家所在国」重组版）

> 原则：外链只落在**买家所在国**，不再做美国/欧洲的通用目录。
> 状态标注只有三种：✅ 已上线、⏳ 进行中、❌ 已验证走不通。未实测的一律写「待验证」，不预设结论。

## 一、已实测的 5 个通用目录（结论先摆着，避免重复踩坑）

| 平台 | 结论 | 详情 |
|---|---|---|
| Kompass | ❌ 收费 | 个人账号可免费用，但公司主页 USD $40/12 个月 起，免费档建不了公司页 |
| Europages | ❌ 限欧洲主体 | 用户账号可注册并邮箱验证，但公司资料「注册国家」下拉只列欧洲及欧洲属地，无 China；中国工厂无法自助建档，需联系客服（同 Kompass/Visable 体系） |
| Brownbook | ❌ 表单故障 | 填完点提交无反应，收件箱也收不到验证信；换注册页同样卡住 |
| Go4WorldBusiness | ⏳ 审核中 | Google 登录建号成功，公司资料已提交待审核；账号国家被默认成 United States，需改回 China |
| EC21 | ⏳ 卡人机验证 | 资料全填完，差 reCAPTCHA 那一下；邮件验证码机制正常 |
| TradeBoss | ❌ 表单故障 | 遗留 CGI 注册页，国家字段提交后被服务端判空（字段被表格挤出 `<form>`），无法进入第二步 |
| Cylex（南非 cylex.net.za） | ❌ 本地 IP 限制 | 自助登记仅允许目标国境内 IP；境外 IP 打开 `/register-company` 被跳付费 Bulk Upload/API，与本地黄页同一结构性门槛 |
| Dial4Trade（dial4trade.com，印度系全球 B2B） | ❌ KYC 证件卡点 | 账号已建、邮箱已验证、公司/联系资料已保存；但卖家工具与公开主页被 `verify-business.php` 拦截，强制上传护照、政府带照证件、公司注册证书、税务登记证明扫描件；公开搜索暂未列出，主页 URL 待 KYC 通过 |
| TradeFord（tradeford.com） | ❌ reCAPTCHA 卡点 | Cloudflare 自动放行；注册表单已填（Seller、China Mainland、官网字段在），卡在 v2 reCAPTCHA，后台无法过复选框/图片挑战，未提交 |
| eWorldTrade（eworldtrade.com） | ❌ 域名查封 | 注册页标题「Domain Seized by Law Enforcement」，站点不可用 |
| EC Plaza（ecplaza.net） | ❌ 连接失败 | 首页导航即连接报错，站点不可达 |
| DIYTrade（my.diytrade.com） | ❌ 点击式验证码 | 注册第一步支持 China，官网字段在注册后；卡在 RealPerson 字符矩阵点击验证码，字符未在 DOM 暴露，后台不可解 |
| Global Trade Plaza（globaltradeplaza.com） | ❌ 资料保存未持久化 | 账号已建、邮箱 OTP 已验证、Seller 可登录；条款已接受；但分 Tab 公司资料填写后点 Save 刷新仍全空（前端校验/状态卡点，无可见报错）；全站无独立官网字段，URL 只能写简介纯文本；产品未发布 |
| ExportersIndia（exportersindia.com，印度系） | ❌ IEC 证件卡点 | 账号已建、邮箱 OTP 已验证、后台可登录；官网字段与 3 条产品已存后台；但 Statutory Details 强制印度 IEC Code + IEC 证书上传，中国主体无 IEC；产品 Approved 0、公开主页 URL 待 IEC 通过，公开站暂未索引 |
| ECVV（ecvv.com） | ❌ 连接超时 | 浏览器导航与 HTTP GET 均 read timeout，站点不可达/过慢，未进入注册 |
| Hotfrog（hotfrog.com，美国免费本地目录） | ⏳ 待审核 | 用户账号已建、邮箱已验证；商家条目已提交成功（分类 Building Materials & Equipment，官网/电话/邮箱/中国地址 516100 已填后台）；后台状态 Pending，公开公司页当前 404，待审核通过后生效；归类 Hotfrog US。条目 ID AaH23WvocA-rTJhVCwPfkg，待审核链接 https://www.hotfrog.com/company/AaH23WvocA-rTJhVCwPfkg |
| Africa Business Pages（africabusinesspages.com） | ❌ 域名不可解析 | DNS getaddrinfo failed，浏览器导航与 HTTP GET 均无法解析，站点不存在/已下线 |
| gulfio.com（Gulf Industry Online） | ❌ 域名停放待售 | 打开跳 GoDaddy 待售页「gulfio.com 正在出售」，非运营站点 |
| BizVibe（bizvibe.com） | ❌ 买家侧 SaaS 不适用 | 注册为「Start Free Trial」买家情报试用（connect.bizvibe.com/signup），无供应商自助建档/官网字段；公司资料由平台 AI 抓取，不产出公开外链 |
| SteelOrbis（steelorbis.com） | ❌ 读者试用会员不适用 | 免费试用为价格/新闻/行情读者会员（`/my-account/companyApplication.do`），表单仅公司名/联系人/邮箱/密码/电话，无官网字段、无公开供应商主页；公司库为付费/精选会员 |
| tradeKorea（tradekorea.com，KITA） | ❌ 仅限韩国卖家或全球买家 | 入会类型仅「국내 셀러회원（韩国卖家，必填韩国 business registration number）」与「Global Buyer（从韩国采购）」，无海外卖家档，无法建供应商主页挂官网 |
| TradeIndia（tradeindia.com，印度 B2B） | ❌ 印度本地城市/证件卡点 | 第一步国家可切 China +86、已填姓名/邮箱/手机/公司名；但城市下拉仅印度城市（搜 Guangzhou/China 无选项），点 Continue 不发请求、前端静默拦截；后续预计同 ExportersIndia 要印度 GST/IEC。未建成账号、未发 OTP |
| yellowpages.co.za（南非） | ❌ 已转为电商商城 | 打开 301 跳 `mall.yep.co.za/home`（Yep Mall），无免费 B2B/供应商登记入口，与原黄页目录不同 |
| 其余区域域名单次探测不可达 | ❌ 死路/不可达 | indotrading.com 403；directory.my、connect.ae、kenyabusinessdirectory.co.ke DNS 不可解析；yellowpages.ph、yellowpages.ae SSL 握手超时；nigeriayellowpages.com SSL EOF |

## 二、按市场国的目标（优先级从高到低）

### 印尼（Indonetwork）

- 平台：https://www.indonetwork.co.id/ （印尼最大 B2B 目录之一，198,000+ 会员）
- 状态：⏳ 已填完「用户资料」「公司资料」两步，卡在第 3 步「Dokumen Legalitas Usaha *」（营业执照）
- 需要你：**营业执照扫描件/照片**（我拿到就继续提交）
- 备注：国家已选 China、省份 Guangdong、城市 Huizhou，官网字段在审核通过后补

### 马来西亚

- 候选：CIDB 相关名录（不对外挂链接）、Mudah.my（本地分类信息，注册要马来西亚手机号）、Yellow Pages Malaysia（基础 listing 多为付费）
- 现状：**没有可直接免费挂官网的入口**，本地分类站基本都要本地手机号做验证
- 结论：优先走「马来西亚本地行业媒体/协会的会员名录 + guest post」，而不是通用黄页

### 阿联酋

- 平台：Yellow Pages UAE（https://www.yellowpages-uae.com/pages/list-your-business）
- 状态：⏳ **已提交成功**，页面回「Thank you for your interest in listing your business」，等人工审核上线
- 提交内容：公司名、业务（钢结构制作：预制仓库/车间/屋架/管廊）、地址 Yuanzhou Town, Boluo County / Huizhou / China、官网 https://zhongsai-steelstructure.com、电话 +86 13192007378
- 备注：免费、无需邮箱验证、接受境外地址（Country 为自由文本）；审核后需回查条目页 URL

### 墨西哥 / 巴西 / 南非 / 加纳 / 埃塞俄比亚 / 阿尔巴尼亚

实测了两个，结论对整组都适用：

| 平台 | 实测结果 |
|---|---|
| Sección Amarilla（墨西哥最大黄页，seccionamarilla.com.mx/registra-tu-empresa） | ❌ 免费登记表有「Sitio web」字段，但**电话字段只接受墨西哥本地号码格式**，+86 号码被判「格式不一致」，提交不了 |
| GuiaMais（巴西最大商业指南，cadastro.guiamais.com.br） | ❌ 免费登记表只有 公司名/电话/WhatsApp/联系人/城市 五项，**没有网站字段**，做不出外链 |

同组其余国家（南非/加纳/埃塞/阿尔巴尼亚）的本地黄页基本同一套逻辑：要么只收本地号码，要么基础条目不放网站链接。

### 结论：国别本地黄页对「中国工厂」存在结构性门槛

- 本地黄页的商业模式是服务**本地商家**，电话/地址校验会卡住境外主体
- 阿联酋 Yellow Pages UAE 是已实测的例外：地址与电话都是自由文本，接受中国公司 + 中国号码
- 所以国别化外链真正能落地的只有四条路：①像 UAE 这种不校验本地的目录（逐个试，能过就提交）②目标国行业媒体/博客投稿 ③当地商会/协会会员名录 ④已成交客户与货代的互换链接

## 三、不靠目录的三条更稳的国别外链路径

1. **当地行业媒体 guest post**：马来西亚/印尼/UAE 的建筑、钢结构、工程类博客与行业站，投 1 篇原创（带作者简介 + 官网链接）
2. **当地商会/协会会员名录**：马来西亚中华总商会、UAE 华商会等，会员页通常有官网链接
3. **客户/供应商互链**：已成交的海外客户、当地安装队、货代，在 case study 里互挂链接

## 四、执行顺序建议

1. 印尼 Indonetwork（只差营业执照，最快能上线）
2. UAE Yellow Pages（已提交，等审核；上线后回查条目 URL）
3. go4WorldBusiness 审核通过后补官网字段
4. 马来/UAE 行业媒体 guest post（我来写稿）
5. 其余国别黄页按验证结果推进

## 五、Guest Post 选题（按市场定制）

1. 《Steel Structure Cost per Square Meter in Malaysia: 2026 Breakdown》—— 马来采购方搜索量最大的问题
2. 《Importing a Prefab Warehouse into Indonesia: CIDB, SNI and Customs Checklist》—— 印尼落地合规
3. 《UAE Warehouse Construction: Why Prefab Steel Beats Concrete on Timeline》—— UAE 决策层
4. 《Q235B vs Q355B: Which Steel Grade for Your Warehouse Project?》—— 通用技术权威稿
5. 《Exporting a Steel Structure Building from China: 2026 Buyer's Guide (FOB/CIF, Documentation)》—— 全市场通用

## 六、每条目固定填写信息

- 公司名：`Zhongsai Steel Structure Co., Ltd.`
- 地址：`Yuanzhou Town, Boluo County, Huizhou, Guangdong, China`
- 官网：`https://zhongsai-steelstructure.com`
- 电话/WhatsApp：`+86 13192007378`
- 邮箱：`zhongsaiganggou@gmail.com`
- 简介：`company-profile-pack.md` 里的 EN 长描述
- 分类：Fabricated Structural Metal Manufacturing；备选 Construction → Structural Steel Contractors
