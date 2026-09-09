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
        """生成工业风格占位图（更真实的摄影风格，非卡通）"""
        try:
            from PIL import Image, ImageDraw, ImageFont, ImageFilter
            
            width, height = self.width, self.height
            if image_type == "section":
                # 段落配图用稍小的尺寸
                width, height = 1600, 900
            
            img = Image.new('RGB', (width, height))
            draw = ImageDraw.Draw(img)
            
            # 根据场景关键词选择颜色主题
            import random
            scene = self.get_scene_for_text(context or keyword)
            scene_lower = scene.lower()
            
            # 检测场景类型
            scene_type = "default"
            if any(w in scene_lower for w in ["weld", "fabrication", "manufacturing", "production", "factory", "workshop"]):
                scene_type = "fabrication"
                colors = [(40, 30, 20), (80, 60, 40), (120, 90, 60)]  # 暖色调（焊接/制造）
            elif any(w in scene_lower for w in ["coating", "corrosion", "paint", "galvanizing"]):
                scene_type = "coating"
                colors = [(20, 40, 50), (40, 80, 100), (60, 120, 140)]  # 冷色调（涂层/防腐）
            elif any(w in scene_lower for w in ["shipping", "container", "port", "export", "import", "logistics", "freight"]):
                scene_type = "shipping"
                colors = [(20, 30, 60), (40, 60, 100), (60, 90, 140)]  # 蓝色调（运输/港口）
            elif any(w in scene_lower for w in ["installation", "erection", "construction", "site"]):
                scene_type = "installation"
                colors = [(50, 40, 30), (90, 70, 50), (130, 100, 70)]  # 土色调（工地/安装）
            elif any(w in scene_lower for w in ["design", "drawing", "blueprint", "engineering"]):
                scene_type = "design"
                colors = [(20, 30, 50), (30, 50, 80), (50, 80, 120)]  # 蓝图色调（设计）
            elif any(w in scene_lower for w in ["cost", "price", "budget", "planning"]):
                scene_type = "cost"
                colors = [(30, 50, 30), (50, 80, 50), (80, 120, 80)]  # 绿色调（成本/规划）
            elif any(w in scene_lower for w in ["quality", "inspection", "certification"]):
                scene_type = "quality"
                colors = [(50, 30, 50), (80, 50, 80), (120, 80, 120)]  # 紫色调（质量/认证）
            else:
                colors = [(30, 40, 60), (50, 70, 100), (80, 110, 150)]  # 默认工业蓝
            
            # 渐变背景
            for y in range(height):
                ratio = y / height
                r = int(colors[0][0] + (colors[2][0] - colors[0][0]) * ratio)
                g = int(colors[0][1] + (colors[2][1] - colors[0][1]) * ratio)
                b = int(colors[0][2] + (colors[2][2] - colors[0][2]) * ratio)
                draw.line([(0, y), (width, y)], fill=(r, g, b))
            
            # 根据场景类型添加不同的几何装饰
            metal_color = (180, 180, 190)
            metal_outline = (100, 100, 110)
            
            if scene_type == "fabrication":
                # 制造场景：焊接火花 + 钢梁 + 设备轮廓
                beam_y = height // 2
                draw.rectangle([100, beam_y-20, width-100, beam_y+20], fill=metal_color, outline=metal_outline, width=2)
                # 焊接火花
                random.seed(hash(context) % 10000)
                for _ in range(30):
                    sx = width // 2 + random.randint(-100, 100)
                    sy = beam_y + random.randint(-50, 50)
                    sr = random.randint(2, 8)
                    draw.ellipse([sx-sr, sy-sr, sx+sr, sy+sr], fill=(255, 200, 50))
                # 设备轮廓
                draw.rectangle([150, beam_y+40, 300, height-100], fill=(100, 100, 110), outline=metal_outline, width=2)
                draw.rectangle([width-300, beam_y+40, width-150, height-100], fill=(100, 100, 110), outline=metal_outline, width=2)
                
            elif scene_type == "shipping":
                # 运输场景：集装箱 + 船轮廓 + 海浪
                # 集装箱
                container_y = height // 2 - 60
                for i, x in enumerate([150, 320, 490, 660]):
                    c_color = [(200, 80, 50), (50, 100, 180), (80, 160, 80), (220, 180, 50)][i % 4]
                    draw.rectangle([x, container_y, x+150, container_y+100], fill=c_color, outline=(50, 50, 60), width=2)
                    # 集装箱波纹
                    for cx in range(x+15, x+150, 20):
                        draw.line([(cx, container_y+10), (cx, container_y+90)], fill=(0, 0, 0, 50), width=1)
                # 海浪
                wave_y = height - 120
                for x in range(0, width, 40):
                    draw.arc([x, wave_y, x+80, wave_y+40], 0, 180, fill=(100, 150, 200), width=3)
                    
            elif scene_type == "installation":
                # 安装场景：塔吊 + 钢梁 + 工地
                # 塔吊
                tower_x = width // 4
                draw.rectangle([tower_x-15, 100, tower_x+15, height-100], fill=(200, 150, 50), outline=(150, 100, 30), width=2)
                draw.rectangle([tower_x-80, 80, tower_x+200, 110], fill=(200, 150, 50), outline=(150, 100, 30), width=2)
                draw.line([(tower_x+150, 95), (tower_x+250, 200)], fill=(150, 100, 30), width=3)
                # 吊起的钢梁
                draw.rectangle([tower_x+220, 200, tower_x+400, 230], fill=metal_color, outline=metal_outline, width=2)
                # 地基
                draw.rectangle([100, height-150, width-100, height-100], fill=(120, 100, 80), outline=(80, 60, 40), width=2)
                
            elif scene_type == "design":
                # 设计场景：蓝图网格 + 图纸 + 尺子
                # 蓝图网格
                for x in range(0, width, 50):
                    draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 30), width=1)
                for y in range(0, height, 50):
                    draw.line([(0, y), (width, y)], fill=(255, 255, 255, 30), width=1)
                # 图纸轮廓
                draw.rectangle([200, 150, width-200, height-150], fill=(255, 255, 255, 20), outline=(255, 255, 255, 100), width=2)
                # 钢结构图纸线条
                draw.line([(300, 300), (width-300, 300)], fill=(255, 255, 255, 150), width=4)
                draw.line([(350, 300), (350, height-300)], fill=(255, 255, 255, 150), width=4)
                draw.line([(width-350, 300), (width-350, height-300)], fill=(255, 255, 255, 150), width=4)
                draw.line([(350, 400), (width-350, 400)], fill=(255, 255, 255, 100), width=2)
                
            elif scene_type == "coating":
                # 涂层场景：喷涂效果 + 涂层层次
                # 喷涂效果
                random.seed(hash(context) % 10000)
                for _ in range(100):
                    sx = random.randint(0, width)
                    sy = random.randint(0, height)
                    sr = random.randint(1, 5)
                    alpha = random.randint(50, 150)
                    draw.ellipse([sx-sr, sy-sr, sx+sr, sy+sr], fill=(100, 180, 200, alpha))
                # 涂层层次
                for i, (y1, y2, c) in enumerate([
                    (100, 200, (80, 140, 160)),
                    (220, 320, (100, 160, 180)),
                    (340, 440, (120, 180, 200)),
                ]):
                    draw.rectangle([200, y1, width-200, y2], fill=c, outline=(60, 100, 120), width=2)
                    
            elif scene_type == "cost":
                # 成本场景：图表 + 硬币 + 计算器
                # 柱状图
                chart_x = 250
                chart_y = 200
                chart_w = width - 500
                chart_h = height - 400
                # 图表背景
                draw.rectangle([chart_x, chart_y, chart_x+chart_w, chart_y+chart_h], fill=(255, 255, 255, 20), outline=(255, 255, 255, 100), width=2)
                # 柱状图
                random.seed(hash(context) % 10000)
                bar_w = chart_w // 8
                for i in range(6):
                    bh = random.randint(chart_h//4, chart_h*3//4)
                    bx = chart_x + 50 + i * (bar_w + 20)
                    by = chart_y + chart_h - bh
                    draw.rectangle([bx, by, bx+bar_w, chart_y+chart_h], fill=(100, 180, 100), outline=(60, 120, 60), width=2)
                # 坐标轴
                draw.line([(chart_x, chart_y+chart_h), (chart_x+chart_w, chart_y+chart_h)], fill=(255, 255, 255, 150), width=2)
                draw.line([(chart_x, chart_y), (chart_x, chart_y+chart_h)], fill=(255, 255, 255, 150), width=2)
                
            elif scene_type == "quality":
                # 质量场景：检查标记 + 证书 + 放大镜
                # 检查标记（对勾）
                check_x = width // 2
                check_y = height // 2 - 50
                draw.line([(check_x-80, check_y), (check_x-20, check_y+60)], fill=(100, 200, 100), width=12)
                draw.line([(check_x-20, check_y+60), (check_x+100, check_y-60)], fill=(100, 200, 100), width=12)
                # 证书边框
                draw.rectangle([check_x-150, check_y-120, check_x+150, check_y+120], outline=(200, 180, 100), width=4)
                draw.rectangle([check_x-140, check_y-110, check_x+140, check_y+110], outline=(200, 180, 100), width=2)
                
            else:
                # 默认：标准钢结构框架
                beam_y = height // 3
                draw.rectangle([50, beam_y-15, width-50, beam_y+15], fill=metal_color, outline=metal_outline, width=2)
                for x in [width//6, width//2, width*5//6]:
                    draw.rectangle([x-12, beam_y, x+12, height-80], fill=(170, 170, 180), outline=(90, 90, 100), width=2)
                draw.line([(width//6, beam_y+30), (width//2-50, height-80)], fill=(150, 150, 160), width=8)
                draw.line([(width//2+50, height-80), (width*5//6, beam_y+30)], fill=(150, 150, 160), width=8)
            
            # 添加场景标签和段落标题
            scene_label = self.get_scene_for_text(context or keyword).split(",")[0].title()
            if len(scene_label) > 40:
                scene_label = scene_label[:37] + "..."
            
            # 从上下文提取段落标题（如果有）
            section_title = ""
            if context:
                # 尝试提取第一行作为标题
                lines = context.strip().split("\n")
                if lines:
                    potential_title = lines[0].strip()
                    if 5 < len(potential_title) < 80 and not potential_title.startswith("#"):
                        section_title = potential_title
                    elif len(lines) > 1:
                        potential_title = lines[1].strip()
                        if 5 < len(potential_title) < 80:
                            section_title = potential_title
            
            try:
                font_large = ImageFont.truetype("arial.ttf", 36)
                font_small = ImageFont.truetype("arial.ttf", 20)
            except:
                font_large = ImageFont.load_default()
                font_small = ImageFont.load_default()
            
            # 半透明背景框
            draw.rectangle([40, height-160, width-40, height-40], fill=(0, 0, 0, 150))
            
            # 主标题：场景类型
            display_title = scene_label
            if len(display_title) > 50:
                display_title = display_title[:47] + "..."
            bbox = draw.textbbox((0, 0), display_title, font=font_large)
            text_width = bbox[2] - bbox[0]
            draw.text(((width - text_width) // 2, height-145), display_title, fill=(255, 255, 255), font=font_large)
            
            # 段落标题（如果有）
            if section_title:
                display_section = section_title
                if len(display_section) > 60:
                    display_section = display_section[:57] + "..."
                bbox = draw.textbbox((0, 0), display_section, font=font_small)
                text_width = bbox[2] - bbox[0]
                draw.text(((width - text_width) // 2, height-100), display_section, fill=(220, 220, 220), font=font_small)
            
            # 品牌标识
            brand = "ZHONGSAI STEEL STRUCTURE" if language == "en" else "中赛钢构"
            bbox = draw.textbbox((0, 0), brand, font=font_small)
            brand_width = bbox[2] - bbox[0]
            draw.text(((width - brand_width) // 2, height-65), brand, fill=(180, 180, 180), font=font_small)
            
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
    
    def generate_article_images(self, keyword, article_body, slug, language="en", max_images=1):
        """
        为一篇文章生成图片（只生成一张封面图）
        返回: list of dict {path, local_path, alt_text, position}
        """
        images = []
        
        # 1. 封面图（优先尝试真实图片搜索）
        cover_path = os.path.join("tools/auto-publisher/drafts", f"{slug}_cover.jpg")
        
        # 尝试使用真实图片搜索
        real_image = self._try_search_real_image(keyword, cover_path)
        if real_image:
            print(f"    使用真实图片作为封面: {real_image.get('title', keyword)[:50]}")
        else:
            print(f"    真实图片搜索失败，使用工业风格占位图")
            self.generate_image(keyword, cover_path, "", language, "cover")
        
        images.append({
            "path": f"public/images/blog/{slug}/cover.jpg",
            "url_path": f"images/blog/{slug}/cover.jpg",
            "local_path": cover_path,
            "alt_text": self.generate_alt_text(keyword, "", language),
            "type": "cover",
            "position": 0
        })
        
        return images
    
    def _try_search_real_image(self, keyword, output_path):
        """尝试搜索真实图片作为封面图"""
        try:
            from modules.image_searcher import ImageSearcher
            searcher = ImageSearcher(self.config)
            
            # 生成搜索关键词
            search_keywords = [
                keyword,
                f"{keyword} industrial",
                f"{keyword} factory",
                "steel structure factory",
                "steel fabrication",
            ]
            
            for search_kw in search_keywords:
                print(f"    尝试搜索: {search_kw}")
                images = searcher.search_images(search_kw, count=3)
                if images:
                    # 随机选择一张
                    import random
                    selected = random.choice(images)
                    if searcher.download_image(selected["url"], output_path):
                        return selected
                # 短暂延迟，避免请求过快
                import time
                time.sleep(1)
            
            return None
        except Exception as e:
            print(f"    真实图片搜索异常: {e}")
            return None
    
    def insert_images_into_article(self, article_body, images, language="en"):
        """将图片插入到文章的相应位置（只插入封面图到文章开头）"""
        if not images:
            return article_body
        
        cover_image = next((img for img in images if img["type"] == "cover"), None)
        if not cover_image:
            return article_body
        
        # 在文章开头（第一段之后）插入封面图
        img_url = cover_image.get('url_path', cover_image['path'].replace('public/', ''))
        alt_text = cover_image.get('alt_text', 'cover image')
        img_markdown = f"\n![{alt_text}](/{img_url})\n\n"
        
        # 找到第一个段落（非标题、非空行）后插入
        lines = article_body.split('\n')
        insert_pos = 0
        for i, line in enumerate(lines):
            if line.strip() and not line.startswith('#') and not line.startswith('!['):
                insert_pos = i + 1
                break
        
        if insert_pos > 0:
            lines.insert(insert_pos, img_markdown)
            return '\n'.join(lines)
        
        return article_body
        
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
                # 在段落后插入图片（使用url_path，不是文件系统path）
                img_url = matching_image.get('url_path', matching_image['path'].replace('public/', ''))
                img_markdown = f"\n![{alt_text}](/{img_url})\n"
                result += img_markdown + content
            else:
                result += content
        
        return result
