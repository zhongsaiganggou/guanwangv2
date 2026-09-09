#!/usr/bin/env python3
"""
文章生成模块
- 支持AI API生成（豆包/OpenAI）
- 支持模板化后备生成
- 中英文双版本
- frontmatter自动生成
"""

import json
import re
import os
from datetime import datetime


class ArticleGenerator:
    """文章生成器"""
    
    def __init__(self, config):
        self.config = config
        ai_config = config.get("ai", {})
        self.provider = ai_config.get("provider", "doubao")
        self.api_key = ai_config.get("api_key", "")
        self.api_base = ai_config.get("api_base", "")
        self.model = ai_config.get("model", "doubao-pro-32k")
        self.temperature = ai_config.get("temperature", 0.7)
        self.max_tokens = ai_config.get("max_tokens", 4000)
        self.categories = config.get("categories", [])
        self.cta_types = config.get("cta_types", [])
        self.system_config = config.get("system", {})
    
    def has_ai_api(self):
        """检查是否配置了AI API"""
        return bool(self.api_key and self.api_base)
    
    def call_ai_api(self, prompt, system_prompt=""):
        """调用AI API"""
        if not self.has_ai_api():
            return None
        
        try:
            import urllib.request
            url = f"{self.api_base}/chat/completions"
            payload = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                "temperature": self.temperature,
                "max_tokens": self.max_tokens
            }
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            })
            with urllib.request.urlopen(req, timeout=120) as response:
                result = json.loads(response.read().decode("utf-8"))
                return result["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"  AI API调用失败: {e}")
            return None
    
    def generate_slug(self, title, language="en"):
        """从标题生成slug"""
        if language == "zh":
            # 中文标题用拼音或英文翻译，这里简化为用关键词
            slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
            if not slug or len(slug) < 5:
                # 中文标题生成通用slug
                slug = f"steel-structure-guide-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        else:
            slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        # 限制长度
        if len(slug) > 80:
            slug = slug[:80].rstrip('-')
        return slug
    
    def determine_category(self, keyword):
        """根据关键词确定分类"""
        keyword_lower = keyword.lower()
        category_map = {
            "Cost & Planning": ["cost", "price", "budget", "planning", "how much", "expense"],
            "Import & Shipping": ["import", "shipping", "freight", "container", "logistics", "customs", "export", "from china", "delivery"],
            "Manufacturing & Quality": ["fabrication", "manufacturing", "quality", "welding", "coating", "corrosion", "galvanizing", "paint", "inspection", "certification", "standard", "material", "steel grade"],
            "Installation & Technical": ["installation", "erection", "assembly", "foundation", "design", "drawing", "specification", "load", "structural", "technical", "guide", "how to"],
            "Supplier Selection": ["supplier", "manufacturer", "choose", "select", "find", "verify", "audit", "factory", "company"],
            "Materials & Components": ["beam", "column", "truss", "purlin", "cladding", "panel", "bolt", "connection", "component", "material"]
        }
        for category, keywords in category_map.items():
            for kw in keywords:
                if kw in keyword_lower:
                    return category
        return "Manufacturing & Quality"
    
    def determine_cta(self, keyword):
        """根据关键词确定CTA类型"""
        keyword_lower = keyword.lower()
        if any(w in keyword_lower for w in ["drawing", "design", "specification", "fabrication", "shop drawing"]):
            return "send-drawings"
        elif any(w in keyword_lower for w in ["cost", "price", "budget", "planning", "project"]):
            return "send-project-requirements"
        elif any(w in keyword_lower for w in ["import", "shipping", "container", "export", "logistics"]):
            return "view-export-process"
        elif any(w in keyword_lower for w in ["manufacturing", "quality", "welding", "coating", "factory"]):
            return "view-manufacturing"
        elif any(w in keyword_lower for w in ["supplier", "manufacturer", "choose", "select"]):
            return "discuss-your-project"
        else:
            return "send-project-requirements"
    
    def generate_with_template(self, keyword, language="en"):
        """模板化文章生成（后备方案）"""
        category = self.determine_category(keyword)
        cta = self.determine_cta(keyword)
        
        if language == "en":
            title = f"{keyword.title()}: Complete Guide for Buyers"
            seo_title = f"{keyword.title()} | Complete Guide | ZhongSai Steel Structure"
            meta_desc = f"Complete guide to {keyword}. Learn everything buyers need to know about {keyword}, including key factors, best practices, and expert tips."
            h1 = title
            excerpt = f"A comprehensive guide to {keyword} for overseas buyers, covering key considerations, best practices, common mistakes, and expert recommendations."
            
            body = f"""# {title}

When sourcing steel structures for your project, understanding {keyword} is essential for making informed decisions. This guide covers everything you need to know, from key considerations to best practices and common pitfalls to avoid.

## Direct Answer: What You Need to Know

{keyword} is one of the most important considerations when planning a steel structure project. The key factors that determine success include proper planning, clear specifications, quality manufacturing, and effective communication with your supplier.

**Key takeaways:**
- Proper planning and clear specifications prevent costly mistakes
- Quality manufacturing directly impacts your building's lifespan
- Effective communication with your supplier ensures smooth execution
- Understanding the process helps you evaluate quotes accurately

---

## Part 1: Understanding the Fundamentals

### What Is {keyword.title()}?

{keyword.title()} involves the planning, manufacturing, and delivery of steel structure components. It encompasses everything from initial design and material selection to fabrication, quality control, and logistics.

### Why It Matters

The quality of {keyword} directly affects:
- **Structural safety**: Proper design and manufacturing ensure your building meets safety standards
- **Project lifespan**: Quality materials and fabrication extend your building's usable life
- **Cost efficiency**: Understanding the process helps you avoid unnecessary expenses
- **Timely delivery**: Clear specifications and communication prevent delays

### Key Components

{keyword.title()} typically involves:
1. **Design and engineering**: Structural calculations, member sizing, connection design
2. **Material selection**: Steel grades, coatings, fasteners, cladding materials
3. **Fabrication**: Cutting, welding, drilling, surface preparation, coating
4. **Quality control**: Inspection, testing, documentation
5. **Logistics**: Packing, marking, container loading, shipping

---

## Part 2: Key Factors to Consider

### 1. Design Requirements

Before fabrication begins, you need clear design requirements:
- Building dimensions and layout
- Design loads (wind, snow, seismic, live loads)
- Applicable design standards (GB, AISC, EN, BS, AS/NZS)
- Connection types and specifications
- Crane requirements (if applicable)

### 2. Material Specifications

Material quality is critical:
- **Steel grades**: Q235, Q355, A36, A572, S235, S355, etc.
- **Coating systems**: Surface preparation, primer, intermediate, topcoat, total DFT
- **Fasteners**: Bolt grades (8.8, 10.9), types, surface finishes
- **Cladding**: Panel types, insulation, thickness, accessories

### 3. Manufacturing Quality

Evaluate your supplier's manufacturing capabilities:
- Factory size and equipment
- Quality control processes
- Welding qualifications and inspection
- Coating application and verification
- Inspection and testing capabilities

### 4. Project Management

Effective project management ensures smooth execution:
- Clear communication channels
- Production scheduling and tracking
- Quality documentation
- Shipping and logistics coordination
- Installation support

---

## Part 3: Common Mistakes to Avoid

### Mistake 1: Incomplete Specifications

Providing incomplete or unclear specifications leads to inaccurate quotes and potential fabrication errors. Always provide complete design information, including loads, standards, and material specifications.

### Mistake 2: Choosing Based Only on Price

The lowest quote may not represent the best value. Consider quality, experience, and total cost of ownership, not just the initial price.

### Mistake 3: Skipping Quality Verification

Don't assume your supplier is maintaining quality. Arrange inspections, request documentation, and verify that materials and workmanship meet your specifications.

### Mistake 4: Ignoring Logistics Planning

Shipping and logistics can cause significant delays if not planned properly. Consider packing, marking, container loading, and shipping schedules early in the project.

### Mistake 5: Poor Communication

Maintain regular communication with your supplier throughout the project. Clear communication prevents misunderstandings and ensures issues are resolved quickly.

---

## Part 4: Best Practices

### Before Ordering

1. **Prepare complete documentation**: Drawings, specifications, BOQ, design criteria
2. **Research suppliers**: Verify factory, capabilities, quality systems, references
3. **Get multiple quotes**: Compare on equal scope, not just price
4. **Clarify all requirements**: Loads, standards, materials, coating, delivery terms
5. **Establish communication**: Identify key contacts and communication channels

### During Manufacturing

1. **Request progress updates**: Regular production status reports
2. **Arrange inspections**: Pre-shipment inspection, or during-production inspection
3. **Review documentation**: Material certificates, coating reports, inspection records
4. **Approve shop drawings**: Review and approve fabrication drawings before production
5. **Monitor schedule**: Track production progress against agreed timeline

### During Shipping and Installation

1. **Verify packing**: Ensure components are properly packed and marked
2. **Review shipping documents**: Commercial invoice, packing list, bill of lading
3. **Plan receiving**: Coordinate unloading, storage, and inventory
4. **Follow installation guidelines**: Use proper lifting equipment and procedures
5. **Maintain supplier contact**: Have technical support available during installation

---

## Part 5: Questions to Ask Your Supplier

### General Questions
1. What is your factory size and annual production capacity?
2. What quality certifications do you hold?
3. What design standards do you work with?
4. Can you provide references from similar projects?
5. What is your typical project timeline?

### Technical Questions
1. What steel grades do you typically use?
2. What coating systems do you offer?
3. What welding standards do you follow?
4. What quality inspection processes do you have?
5. Can you provide material test reports?

### Commercial Questions
1. What is included in your quotation?
2. What are your payment terms?
3. What delivery terms do you offer?
4. What is your warranty policy?
5. What after-sales support do you provide?

---

## Part 6: Evaluation Checklist

Use this checklist to evaluate your {keyword} process:

### Planning Phase
- [ ] Complete design documentation prepared
- [ ] Design loads and standards specified
- [ ] Material requirements clearly defined
- [ ] Project timeline established
- [ ] Budget and payment terms agreed

### Supplier Selection
- [ ] Multiple suppliers evaluated
- [ ] Factory capabilities verified
- [ ] Quality systems checked
- [ ] References contacted
- [ ] Quotes compared on equal scope

### Manufacturing Phase
- [ ] Shop drawings approved
- [ ] Material certificates verified
- [ ] Production progress monitored
- [ ] Quality inspections arranged
- [ ] Coating specifications verified

### Shipping Phase
- [ ] Packing and marking verified
- [ ] Container loading supervised (if possible)
- [ ] Shipping documents reviewed
- [ ] Customs clearance prepared
- [ ] Receiving and storage planned

### Installation Phase
- [ ] Installation team qualified
- [ ] Proper lifting equipment available
- [ ] Assembly sequence understood
- [ ] Technical support available
- [ ] Safety procedures in place

---

## Conclusion

{keyword.title()} is a critical aspect of any steel structure project. By understanding the fundamentals, avoiding common mistakes, following best practices, and maintaining clear communication with your supplier, you can ensure your project is delivered on time, on budget, and to the quality you expect.

Remember: the time and effort you invest in planning and verification upfront will save you significant time, money, and frustration during execution and throughout your building's lifespan.

Final structural design should be based on project location, applicable codes, loads and project-specific engineering requirements.

---

**Have a steel structure project?** Send your drawings, specifications, or project requirements. ZhongSai can review your project and provide professional guidance on {keyword}, from design and fabrication to shipping and installation support.
"""
            
        else:  # Chinese
            title = f"{keyword}：采购商完整指南"
            seo_title = f"{keyword}完整指南 | 中赛钢构"
            meta_desc = f"{keyword}完整指南。了解采购商需要知道的一切，包括关键因素、最佳实践和专家建议。"
            h1 = title
            excerpt = f"面向海外采购商的{keyword}综合指南，涵盖关键考虑因素、最佳实践、常见错误和专家建议。"
            
            body = f"""# {title}

在为您的项目采购钢结构时，了解{keyword}对于做出明智决策至关重要。本指南涵盖您需要知道的一切，从关键考虑因素到最佳实践，以及需要避免的常见陷阱。

## 直接回答：您需要知道什么

{keyword}是规划钢结构项目时最重要的考虑因素之一。决定成功的关键因素包括合理的规划、清晰的规格、高质量的制造以及与供应商的有效沟通。

**关键要点：**
- 合理的规划和清晰的规格可以避免代价高昂的错误
- 高质量的制造直接影响您建筑的使用寿命
- 与供应商的有效沟通确保顺利执行
- 了解流程有助于您准确评估报价

---

## 第一部分：了解基础知识

### 什么是{keyword}？

{keyword}涉及钢结构构件的规划、制造和交付。它涵盖从最初设计和材料选择到制造、质量控制和物流的一切。

### 为什么重要

{keyword}的质量直接影响：
- **结构安全**：合理的设计和制造确保您的建筑满足安全标准
- **项目寿命**：优质材料和制造延长建筑的使用寿命
- **成本效率**：了解流程帮助您避免不必要的费用
- **及时交付**：清晰的规格和沟通防止延误

### 关键组成部分

{keyword}通常涉及：
1. **设计与工程**：结构计算、构件选型、节点设计
2. **材料选择**：钢材牌号、涂层、紧固件、围护材料
3. **制造**：切割、焊接、钻孔、表面处理、涂层
4. **质量控制**：检验、测试、文件记录
5. **物流**：包装、标识、装柜、运输

---

## 第二部分：需要考虑的关键因素

### 1. 设计要求

在制造开始前，您需要清晰的设计要求：
- 建筑尺寸和布局
- 设计荷载（风、雪、抗震、活荷载）
- 适用设计标准（GB、AISC、EN、BS、AS/NZS）
- 连接类型和规格
- 吊车要求（如适用）

### 2. 材料规格

材料质量至关重要：
- **钢材牌号**：Q235、Q355、A36、A572、S235、S355等
- **涂层系统**：表面处理、底漆、中间漆、面漆、总DFT
- **紧固件**：螺栓等级（8.8、10.9）、类型、表面处理
- **围护系统**：板材类型、保温、厚度、配件

### 3. 制造质量

评估供应商的制造能力：
- 工厂规模和设备
- 质量控制流程
- 焊接资格和检验
- 涂层施工和验证
- 检验测试能力

### 4. 项目管理

有效的项目管理确保顺利执行：
- 清晰的沟通渠道
- 生产排程和跟踪
- 质量文件
- 运输物流协调
- 安装支持

---

## 第三部分：需要避免的常见错误

### 错误1：规格不完整

提供不完整或不清晰的规格会导致报价不准确和潜在的制造错误。始终提供完整的设计信息，包括荷载、标准和材料规格。

### 错误2：仅根据价格选择

最低报价可能不代表最佳价值。考虑质量、经验和全生命周期成本，而不仅仅是初始价格。

### 错误3：跳过质量验证

不要假设您的供应商在维持质量。安排检验、要求文件、验证材料和工艺符合您的规格。

### 错误4：忽视物流规划

如果规划不当，运输和物流可能导致重大延误。在项目早期考虑包装、标识、装柜和运输计划。

### 错误5：沟通不畅

在整个项目过程中与供应商保持定期沟通。清晰的沟通防止误解，确保问题快速解决。

---

## 第四部分：最佳实践

### 下单前

1. **准备完整文件**：图纸、规格、BOQ、设计标准
2. **研究供应商**：验证工厂、能力、质量体系、参考案例
3. **获取多个报价**：在同等范围基础上比较，而不仅仅是价格
4. **明确所有要求**：荷载、标准、材料、涂层、交货条款
5. **建立沟通机制**：确定关键联系人和沟通渠道

### 制造期间

1. **要求进度更新**：定期生产状态报告
2. **安排检验**：装运前检验，或生产中检验
3. **审核文件**：材质证书、涂层报告、检验记录
4. **审批加工图**：生产前审核并批准加工图纸
5. **监控进度**：按照约定的时间表跟踪生产进度

### 运输和安装期间

1. **验证包装**：确保构件正确包装和标识
2. **审核运输文件**：商业发票、装箱单、提单
3. **计划收货**：协调卸货、存储和清点
4. **遵循安装指南**：使用适当的吊装设备和程序
5. **保持供应商联系**：安装期间有技术支持可用

---

## 第五部分：向供应商询问的问题

### 一般问题
1. 贵工厂规模和年产能是多少？
2. 贵公司持有哪些质量认证？
3. 贵公司使用哪些设计标准？
4. 能否提供类似项目的参考案例？
5. 典型项目周期是多长？

### 技术问题
1. 通常使用什么钢材牌号？
2. 提供哪些涂层系统？
3. 遵循什么焊接标准？
4. 有哪些质量检验流程？
5. 能否提供材质测试报告？

### 商务问题
1. 报价中包含什么？
2. 付款条件是什么？
3. 提供哪些交货条款？
4. 保修政策是什么？
5. 提供哪些售后支持？

---

## 第六部分：评估清单

使用此清单评估您的{keyword}流程：

### 规划阶段
- [ ] 完整的设计文件已准备
- [ ] 设计荷载和标准已指定
- [ ] 材料要求已明确定义
- [ ] 项目时间表已建立
- [ ] 预算和付款条款已商定

### 供应商选择
- [ ] 多个供应商已评估
- [ ] 工厂能力已验证
- [ ] 质量体系已检查
- [ ] 参考案例已联系
- [ ] 报价在同等范围基础上比较

### 制造阶段
- [ ] 加工图已批准
- [ ] 材质证书已验证
- [ ] 生产进度已监控
- [ ] 质量检验已安排
- [ ] 涂层规格已验证

### 运输阶段
- [ ] 包装和标识已验证
- [ ] 装柜已监督（如可能）
- [ ] 运输文件已审核
- [ ] 清关已准备
- [ ] 收货和存储已计划

### 安装阶段
- [ ] 安装团队有资质
- [ ] 适当的吊装设备可用
- [ ] 组装顺序已理解
- [ ] 技术支持可用
- [ ] 安全程序已到位

---

## 总结

{keyword}是任何钢结构项目的关键方面。通过了解基础知识、避免常见错误、遵循最佳实践并与供应商保持清晰沟通，您可以确保项目按时、按预算、按预期质量交付。

请记住：您在前期规划和验证上投入的时间和精力，将在执行过程中和建筑整个使用寿命期间为您节省大量时间、金钱和困扰。

最终结构设计应基于项目位置、适用规范、荷载和项目特定的工程要求。

---

**有钢结构项目？** 发送您的图纸、规格或项目需求。中赛可以审核您的项目，并在{keyword}方面提供专业指导，从设计和制造到运输和安装支持。
"""
        
        return {
            "title": title,
            "seo_title": seo_title,
            "meta_description": meta_desc,
            "h1": h1,
            "excerpt": excerpt,
            "body": body,
            "category": category,
            "cta_type": cta,
            "language": language
        }
    
    def generate(self, keyword, language="en"):
        """生成文章（优先AI API，后备模板）"""
        print(f"\n  生成{('英文' if language == 'en' else '中文')}文章: {keyword}")
        
        # 优先使用AI API
        if self.has_ai_api():
            print("    使用AI API生成...")
            article = self._generate_with_ai(keyword, language)
            if article:
                return article
            print("    AI API生成失败，使用模板后备...")
        
        # 模板后备
        print("    使用模板生成...")
        return self.generate_with_template(keyword, language)
    
    def _generate_with_ai(self, keyword, language="en"):
        """使用AI API生成文章"""
        category = self.determine_category(keyword)
        cta = self.determine_cta(keyword)
        
        if language == "en":
            system_prompt = """You are an expert technical writer for a steel structure export company. Write comprehensive, buyer-focused articles that help overseas buyers make informed decisions. Follow these rules:
1. Write in clear, professional English
2. Use AEO (Answer Engine Optimization) structure: direct answer first, then detailed explanation
3. Include practical tables, checklists, and step-by-step guides
4. Focus on buyer concerns: cost, quality, risk, process, supplier selection
5. No fixed prices, no guaranteed delivery, no free design, no false promises
6. Include disclaimer: "Final structural design should be based on project location, applicable codes, loads and project-specific engineering requirements."
7. Target 2000-3000 words
8. Use markdown formatting with H2, H3, bullet lists, tables
9. End with a CTA encouraging the buyer to send drawings or project requirements"""
            
            prompt = f"""Write a comprehensive guide article about: "{keyword}"

The article should be for overseas buyers sourcing steel structures from China. Include:
- A direct answer section at the beginning
- Key factors buyers need to consider
- Common mistakes to avoid
- Best practices and step-by-step guides
- Practical tables and checklists
- Questions to ask suppliers
- A conclusion summarizing key points

Category: {category}
CTA type: {cta}

Write the article body only (markdown format, starting with H1 title). Do not include frontmatter."""
        else:
            system_prompt = """你是一家钢结构出口公司的专业技术写作专家。撰写全面的、以买家为中心的文章，帮助海外采购商做出明智决策。遵循以下规则：
1. 使用清晰、专业的中文
2. 使用AEO（答案引擎优化）结构：先直接回答，然后详细解释
3. 包含实用的表格、清单和分步指南
4. 关注买家关心的问题：成本、质量、风险、流程、供应商选择
5. 不写固定价格、不保证交付、不免费设计、不做虚假承诺
6. 包含免责声明："最终结构设计应基于项目位置、适用规范、荷载和项目特定的工程要求。"
7. 目标2000-3000字
8. 使用markdown格式，包含H2、H3、项目符号列表、表格
9. 结尾以CTA鼓励买家发送图纸或项目需求"""
            
            prompt = f"""撰写一篇关于"{keyword}"的综合指南文章。

文章面向从中国采购钢结构的海外买家。包含：
- 开头的直接回答部分
- 买家需要考虑的关键因素
- 需要避免的常见错误
- 最佳实践和分步指南
- 实用的表格和清单
- 向供应商询问的问题
- 总结要点的结论

分类：{category}
CTA类型：{cta}

只写文章正文（markdown格式，以H1标题开头）。不要包含frontmatter。"""
        
        content = self.call_ai_api(prompt, system_prompt)
        if not content:
            return None
        
        # 从内容中提取标题
        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if title_match:
            title = title_match.group(1).strip()
            # 移除H1标题，因为frontmatter中会有
            body = re.sub(r'^#\s+.+\n+', '', content, count=1)
        else:
            title = f"{keyword.title()}: Complete Guide" if language == "en" else f"{keyword}：完整指南"
            body = content
        
        slug = self.generate_slug(keyword, language)
        seo_title = f"{title} | ZhongSai Steel Structure" if language == "en" else f"{title} | 中赛钢构"
        meta_desc = f"Complete guide to {keyword} for overseas buyers." if language == "en" else f"面向海外采购商的{keyword}完整指南。"
        
        return {
            "title": title,
            "slug": slug,
            "seo_title": seo_title,
            "meta_description": meta_desc,
            "h1": title,
            "excerpt": meta_desc,
            "body": body,
            "category": category,
            "cta_type": cta,
            "language": language
        }
    
    def build_markdown(self, article, slug, cover_image_path=""):
        """构建完整的Markdown文件（含frontmatter）"""
        today = datetime.now().strftime("%Y-%m-%d")
        frontmatter = f"""---
title: "{article['title'].replace('"', "'")}"
language: "{article['language']}"
category: "{article['category']}"
status: "published"
seoTitle: "{article['seo_title'].replace('"', "'")}"
metaDescription: "{article['meta_description'].replace('"', "'")}"
h1: "{article['h1'].replace('"', "'")}"
excerpt: "{article['excerpt'].replace('"', "'")}"
coverImage: "{cover_image_path}"
publishedAt: "{today}"
updatedAt: "{today}"
ctaType: "{article['cta_type']}"
noindex: false
author: "ZhongSai Steel Structure Editorial Team"
---

{article['body']}
"""
        return frontmatter
