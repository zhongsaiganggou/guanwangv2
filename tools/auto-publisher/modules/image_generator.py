#!/usr/bin/env python3
"""
图片生成模块（升级版）
- 支持封面图生成
- 支持多张段落配图生成
- 根据段落内容自动生成匹配的图片提示词
- 支持AI图片生成API + 占位图后备
- 自动生成alt text
"""

import os
import re
import json
from datetime import datetime


class ImageGenerator:
    """图片生成器（支持多图）"""
    
    def __init__(self, config):
        self.config = config
        img_config = config.get("image_gen", {})
        self.provider = img_config.get("provider", "seedream")
        self.api_key = img_config.get("api_key", "")
        self.width = img_config.get("width", 2048)
        self.height = img_config.get("height", 1365)
        self.style = img_config.get("style", "professional industrial photography")
        
        # 钢结构场景关键词映射（用于段落配图）
        self.scene_keywords = {
            "cost": "steel structure warehouse building, modern industrial facility, cost effective construction",
            "price": "steel structure factory, industrial building exterior, budget planning",
            "budget": "steel structure project planning, cost estimation, industrial building",
            "import": "container shipping port, steel structure components loading, international trade",
            "shipping": "cargo ship with steel structure containers, port logistics, ocean freight",
            "container": "container loading of steel beams, industrial port, shipping logistics",
            "freight": "cargo ship loading steel structure, port operations, freight transportation",
            "logistics": "steel structure logistics warehouse, shipping and transportation, supply chain",
            "customs": "steel structure export documentation, customs clearance, international shipping",
            "export": "steel structure export, container shipping port, global trade",
            "delivery": "steel structure delivery, truck transportation, industrial logistics",
            "fabrication": "steel structure factory workshop, welding and fabrication, CNC cutting",
            "manufacturing": "modern steel manufacturing facility, production line, industrial equipment",
            "production": "steel structure production line, factory manufacturing, industrial process",
            "quality": "quality inspection of steel structure, engineer measuring components, quality control",
            "inspection": "steel structure quality inspection, engineer testing components, quality assurance",
            "welding": "professional welding of steel beams, industrial workshop, welding sparks",
            "coating": "steel structure coating application, spray painting, corrosion protection",
            "corrosion": "steel structure corrosion protection, galvanized steel, rust prevention",
            "galvanizing": "hot dip galvanizing of steel components, industrial process, zinc coating",
            "paint": "steel structure paint application, spray coating, industrial finishing",
            "installation": "steel structure installation on construction site, crane lifting beams",
            "erection": "steel building erection, construction site with crane, structural assembly",
            "assembly": "steel structure assembly, construction site, bolted connections",
            "construction": "steel structure construction site, building erection, industrial project",
            "design": "engineer reviewing steel structure blueprints, technical drawing, engineering office",
            "drawing": "structural steel drawings on workbench, engineering documentation, blueprints",
            "blueprint": "steel structure blueprints, engineering drawings, technical documentation",
            "engineering": "structural engineer working on steel design, technical office, calculations",
            "supplier": "steel structure factory exterior, industrial manufacturing facility, supplier",
            "manufacturer": "steel manufacturing factory, industrial facility, production plant",
            "factory": "modern steel structure factory, industrial building, manufacturing facility",
            "warehouse": "large steel structure warehouse, modern industrial building, storage facility",
            "workshop": "steel structure factory workshop, industrial manufacturing, production area",
            "truss": "steel roof truss structure, industrial building framework, structural steel",
            "beam": "steel I-beam structure, industrial construction, structural steel",
            "column": "steel column structure, industrial building framework, structural support",
            "purlin": "steel purlin structure, roof framing, secondary steel components",
            "cladding": "steel roof and wall cladding, building envelope, metal panels",
            "panel": "steel sandwich panels, wall cladding installation, building envelope",
            "connection": "steel structure connection detail, bolted joint, structural connection",
            "bolt": "steel structure bolting, high strength bolts, connection details",
            "foundation": "steel structure foundation, concrete base with anchor bolts, construction",
            "base": "steel column base plate, anchor bolts, concrete foundation",
            "load": "steel structure load testing, structural engineering, load calculation",
            "wind": "steel structure wind load, building in windy environment, structural design",
            "snow": "steel structure snow load, winter building, roof load design",
            "seismic": "earthquake resistant steel structure, building engineering, seismic design",
            "maintenance": "steel structure maintenance, inspection and repair, building upkeep",
            "lifespan": "modern steel structure building, durable industrial facility, long lasting",
            "durability": "steel structure durability, weather resistant industrial building, long life",
            "guide": "steel structure building, modern industrial facility, professional guide",
            "mistakes": "steel structure quality inspection, engineer checking components, avoiding errors",
            "tips": "modern steel structure factory, professional manufacturing, expert tips",
            "checklist": "steel structure quality control, inspection checklist, quality assurance",
            "process": "steel structure manufacturing process, factory production line, industrial workflow",
            "steps": "steel structure fabrication steps, industrial workshop, step by step process",
            "requirements": "steel structure specification review, engineering documentation, project requirements",
            "documents": "steel structure project documents, technical drawings, paperwork",
            "specification": "steel structure specification, technical standards, engineering requirements",
            "standard": "steel structure quality standard, industrial certification, quality control",
            "certification": "steel structure quality certification, ISO standard, quality assurance",
            "material": "steel material components, raw steel beams, material storage",
            "component": "steel structure components, fabricated steel parts, component storage",
            "packing": "steel structure packing, components bundled for shipping, packaging",
            "marking": "steel structure component marking, identification labels, part numbering",
            "loading": "container loading of steel structure, port operations, cargo loading",
            "safety": "steel structure safety, construction safety, protective equipment",
            "risk": "steel structure risk assessment, safety inspection, hazard identification",
            "comparison": "steel structure comparison, different building types, material comparison",
            "vs": "steel structure vs concrete, building material comparison, construction types",
            "benefits": "steel structure benefits, advantages of metal building, industrial construction",
            "advantages": "steel structure advantages, benefits of prefab building, industrial solutions",
            "disadvantages": "steel structure considerations, building limitations, challenges",
            "planning": "steel structure project planning, site preparation, construction schedule",
            "project": "steel structure project, industrial building construction, engineering project",
            "site": "steel structure construction site, building location, site preparation",
            "equipment": "steel structure manufacturing equipment, CNC machines, industrial tools",
            "cnc": "CNC steel cutting machine, automated fabrication, precision manufacturing",
            "drilling": "steel structure drilling, hole making, beam processing",
            "cutting": "steel plate cutting, plasma cutting, metal fabrication",
            "surface": "steel surface preparation, shot blasting, abrasive cleaning",
            "blast": "shot blasting of steel components, surface preparation, abrasive blasting",
        }
    
    def has_api(self):
        """检查是否配置了图片生成API"""
        return bool(self.api_key)
    
    def get_scene_for_text(self, text):
        """根据段落文本匹配场景关键词"""
        text_lower = text.lower()
        best_match = None
        best_score = 0
        
        for keyword, scene in self.scene_keywords.items():
            if keyword in text_lower:
                score = len(keyword)  # 更长的关键词匹配更精确
                if score > best_score:
                    best_score = score
                    best_match = scene
        
        if best_match:
            return best_match
        return "modern steel structure factory, industrial manufacturing facility"
    
    def generate_prompt(self, keyword, context="", language="en", image_type="section"):
        """根据关键词和上下文生成图片提示词"""
        if context:
            scene = self.get_scene_for_text(context)
        else:
            scene = self.get_scene_for_text(keyword)
        
        if image_type == "cover":
            prompt = f"{self.style}: {scene}. High quality, detailed, professional lighting, wide angle composition, industrial setting, no text, no watermark, cinematic composition"
        else:
            prompt = f"{self.style}: {scene}. High quality, detailed, professional lighting, industrial setting, no text, no watermark, natural composition"
        
        return prompt
    
    def generate_alt_text(self, keyword, context="", language="en"):
        """生成图片alt text"""
        if language == "zh":
            if context:
                # 从上下文提取关键词
                words = re.findall(r'[\u4e00-\u9fa5a-zA-Z]{2,}', context)
                relevant = [w for w in words if w.lower() in self.scene_keywords or any(k in w.lower() for k in self.scene_keywords)]
                if relevant:
                    return f"钢结构{relevant[0]}示意图"
            return f"钢结构{keyword}相关图片"
        else:
            if context:
                words = re.findall(r'[a-zA-Z]{4,}', context.lower())
                relevant = [w for w in words if w in self.scene_keywords]
                if relevant:
                    return f"Steel structure {relevant[0]} illustration"
            return f"Steel structure {keyword} related image"
    
    def generate_with_api(self, prompt, output_path):
        """使用AI API生成图片"""
        if not self.has_api():
            return None
        
        try:
            # 预留API接口
            # TODO: 根据具体API提供商实现
            return None
        except Exception as e:
            print(f"    API生成图片失败: {e}")
            return None
    
    def generate_placeholder(self, keyword, output_path, context="", language="en", image_type="section"):
        """生成占位图（使用Pillow生成带文字的工业风格图片）"""
        try:
            from PIL import Image, ImageDraw, ImageFont, ImageFilter
            
            width, height = self.width, self.height
            if image_type == "section":
                # 段落配图用稍小的尺寸
                width, height = 1600, 900
            
            img = Image.new('RGB', (width, height))
            draw = ImageDraw.Draw(img)
            
            # 根据场景关键词选择颜色主题
            scene = self.get_scene_for_text(context or keyword)
            if any(w in scene.lower() for w in ["weld", "fabrication", "manufacturing", "production", "factory", "workshop"]):
                colors = [(40, 30, 20), (80, 60, 40), (120, 90, 60)]  # 暖色调（焊接/制造）
            elif any(w in scene.lower() for w in ["coating", "corrosion", "paint", "galvanizing"]):
                colors = [(20, 40, 50), (40, 80, 100), (60, 120, 140)]  # 冷色调（涂层/防腐）
            elif any(w in scene.lower() for w in ["shipping", "container", "port", "export", "import", "logistics"]):
                colors = [(20, 30, 60), (40, 60, 100), (60, 90, 140)]  # 蓝色调（运输/港口）
            elif any(w in scene.lower() for w in ["installation", "erection", "construction", "site"]):
                colors = [(50, 40, 30), (90, 70, 50), (130, 100, 70)]  # 土色调（工地/安装）
            elif any(w in scene.lower() for w in ["design", "drawing", "blueprint", "engineering"]):
                colors = [(20, 30, 50), (30, 50, 80), (50, 80, 120)]  # 蓝图色调（设计）
            else:
                colors = [(30, 40, 60), (50, 70, 100), (80, 110, 150)]  # 默认工业蓝
            
            # 渐变背景
            for y in range(height):
                ratio = y / height
                r = int(colors[0][0] + (colors[2][0] - colors[0][0]) * ratio)
                g = int(colors[0][1] + (colors[2][1] - colors[0][1]) * ratio)
                b = int(colors[0][2] + (colors[2][2] - colors[0][2]) * ratio)
                draw.line([(0, y), (width, y)], fill=(r, g, b))
            
            # 添加钢结构几何装饰
            # 横梁
            beam_y = height // 3
            draw.rectangle([50, beam_y-15, width-50, beam_y+15], fill=(180, 180, 190), outline=(100, 100, 110), width=2)
            # 立柱
            for x in [width//6, width//2, width*5//6]:
                draw.rectangle([x-12, beam_y, x+12, height-80], fill=(170, 170, 180), outline=(90, 90, 100), width=2)
            # 斜撑
            draw.line([(width//6, beam_y+30), (width//2-50, height-80)], fill=(150, 150, 160), width=8)
            draw.line([(width//2+50, height-80), (width*5//6, beam_y+30)], fill=(150, 150, 160), width=8)
            
            # 添加场景标签
            scene_label = self.get_scene_for_text(context or keyword).split(",")[0].title()
            if len(scene_label) > 40:
                scene_label = scene_label[:37] + "..."
            
            try:
                font_large = ImageFont.truetype("arial.ttf", 36)
                font_small = ImageFont.truetype("arial.ttf", 20)
            except:
                font_large = ImageFont.load_default()
                font_small = ImageFont.load_default()
            
            # 半透明背景框
            draw.rectangle([40, height-140, width-40, height-50], fill=(0, 0, 0, 128))
            draw.rectangle([40, height-140, width-40, height-50], outline=(255, 255, 255), width=1)
            
            # 标签文字
            bbox = draw.textbbox((0, 0), scene_label, font=font_large)
            text_width = bbox[2] - bbox[0]
            draw.text(((width - text_width) // 2, height-125), scene_label, fill=(255, 255, 255), font=font_large)
            
            # 品牌标识
            brand = "ZHONGSAI STEEL STRUCTURE" if language == "en" else "中赛钢构"
            bbox = draw.textbbox((0, 0), brand, font=font_small)
            brand_width = bbox[2] - bbox[0]
            draw.text(((width - brand_width) // 2, height-75), brand, fill=(200, 200, 200), font=font_small)
            
            # 保存
            img.save(output_path, "JPEG", quality=85)
            return output_path
            
        except ImportError:
            # 没有Pillow，生成最小占位图
            with open(output_path, 'wb') as f:
                f.write(b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.\' ",#\x1c\x1c(7),01444\x1f\'9=82<.342\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xc4\x00\xb5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00\x01}\x01\x02\x03\x00\x04\x11\x05\x12!1A\x06\x13Qa\x07"q\x142\x81\x91\xa1\x08#B\xb1\xc1\x15R\xd1\xf0$3br\x82\t\n\x16\x17\x18\x19\x1a%&\'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz\x83\x84\x85\x86\x87\x88\x89\x8a\x92\x93\x94\x95\x96\x97\x98\x99\x9a\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xff\xda\x00\x08\x01\x01\x00\x00?\x00\xfb\xff\xd9')
            return output_path
        except Exception as e:
            print(f"    生成占位图失败: {e}")
            return None
    
    def generate_image(self, keyword, output_path, context="", language="en", image_type="section"):
        """生成单张图片（优先API，后备占位图）"""
        if self.has_api():
            prompt = self.generate_prompt(keyword, context, language, image_type)
            result = self.generate_with_api(prompt, output_path)
            if result:
                return result
        
        return self.generate_placeholder(keyword, output_path, context, language, image_type)
    
    def generate_article_images(self, keyword, article_body, slug, language="en", max_images=5):
        """
        为一篇文章生成多张图片
        返回: list of dict {path, local_path, alt_text, position}
        """
        images = []
        
        # 1. 封面图
        cover_path = os.path.join("tools/auto-publisher/drafts", f"{slug}_cover.jpg")
        self.generate_image(keyword, cover_path, "", language, "cover")
        images.append({
            "path": f"public/images/blog/{slug}/cover.jpg",
            "local_path": cover_path,
            "alt_text": self.generate_alt_text(keyword, "", language),
            "type": "cover",
            "position": 0
        })
        
        # 2. 段落配图 - 根据H2标题分段
        sections = re.split(r'\n## ', article_body)
        section_images = []
        
        for i, section in enumerate(sections[1:], 1):  # 跳过第一段（H1之后的引言）
            # 提取H2标题
            title_match = re.match(r'(.+?)\n', section)
            if title_match:
                section_title = title_match.group(1).strip()
                # 检查这个部分是否适合配图（包含场景关键词）
                section_lower = section.lower()
                has_relevant_content = any(kw in section_lower for kw in self.scene_keywords.keys())
                
                if has_relevant_content and len(section_images) < max_images - 1:
                    img_filename = f"section_{i:02d}.jpg"
                    img_path = os.path.join("tools/auto-publisher/drafts", f"{slug}_{img_filename}")
                    self.generate_image(keyword, img_path, section_title + " " + section[:200], language, "section")
                    
                    section_images.append({
                        "path": f"public/images/blog/{slug}/{img_filename}",
                        "local_path": img_path,
                        "alt_text": self.generate_alt_text(keyword, section_title, language),
                        "type": "section",
                        "section_title": section_title,
                        "position": i
                    })
        
        images.extend(section_images)
        return images
    
    def insert_images_into_article(self, article_body, images, language="en"):
        """将图片插入到文章的相应位置"""
        if not images:
            return article_body
        
        section_images = [img for img in images if img["type"] == "section"]
        if not section_images:
            return article_body
        
        # 按H2分段，在每个匹配的段落后插入图片
        sections = re.split(r'(\n## .+?\n)', article_body)
        
        result = sections[0]  # 引言部分
        
        for i in range(1, len(sections), 2):
            header = sections[i]
            content = sections[i + 1] if i + 1 < len(sections) else ""
            
            result += header
            
            # 检查这个section是否有对应的图片
            section_title = re.sub(r'^## ', '', header.strip())
            matching_image = None
            for img in section_images:
                if img.get("section_title", "").lower() in section_title.lower() or section_title.lower() in img.get("section_title", "").lower():
                    matching_image = img
                    break
            
            if matching_image:
                # 根据文章语言重新生成alt text（确保语言正确）
                alt_text = self.generate_alt_text(
                    keyword=matching_image.get("section_title", ""),
                    context=section_title,
                    language=language
                )
                # 在段落后插入图片
                img_markdown = f"\n![{alt_text}](/{matching_image['path']})\n"
                result += img_markdown + content
            else:
                result += content
        
        return result
