#!/usr/bin/env python3
"""
封面图生成模块
- 支持AI图片生成API
- 支持本地占位图生成（后备方案）
- 自动生成与文章主题相关的封面图
"""

import os
import urllib.request
import json
from datetime import datetime


class CoverImageGenerator:
    """封面图生成器"""
    
    def __init__(self, config):
        self.config = config
        img_config = config.get("image_gen", {})
        self.provider = img_config.get("provider", "seedream")
        self.api_key = img_config.get("api_key", "")
        self.width = img_config.get("width", 2048)
        self.height = img_config.get("height", 1365)
        self.style = img_config.get("style", "professional industrial photography")
    
    def has_api(self):
        """检查是否配置了图片生成API"""
        return bool(self.api_key)
    
    def generate_prompt(self, keyword, language="en"):
        """根据关键词生成图片提示词"""
        # 钢结构相关的场景关键词映射
        scene_keywords = {
            "cost": "steel structure warehouse building, modern industrial facility",
            "price": "steel structure factory, industrial building exterior",
            "import": "container shipping port, steel structure components loading",
            "shipping": "cargo ship with steel structure containers, port logistics",
            "container": "container loading of steel beams, industrial port",
            "fabrication": "steel structure factory workshop, welding and fabrication",
            "manufacturing": "modern steel manufacturing facility, CNC cutting machine",
            "quality": "quality inspection of steel structure, engineer measuring",
            "welding": "professional welding of steel beams, industrial workshop",
            "coating": "steel structure coating application, spray painting",
            "corrosion": "steel structure corrosion protection, galvanized steel",
            "installation": "steel structure installation on construction site, crane lifting",
            "erection": "steel building erection, construction site with crane",
            "design": "engineer reviewing steel structure blueprints, technical drawing",
            "drawing": "structural steel drawings on workbench, engineering office",
            "supplier": "steel structure factory exterior, industrial manufacturing facility",
            "warehouse": "large steel structure warehouse, modern industrial building",
            "workshop": "steel structure factory workshop, industrial manufacturing",
            "truss": "steel roof truss structure, industrial building framework",
            "beam": "steel I-beam structure, industrial construction",
            "column": "steel column structure, industrial building framework",
            "foundation": "steel structure foundation, concrete base with anchor bolts",
            "galvanizing": "hot dip galvanizing of steel components, industrial process",
            "maintenance": "steel structure maintenance, inspection and repair",
            "lifespan": "modern steel structure building, durable industrial facility",
            "durability": "steel structure durability, weather resistant industrial building",
            "guide": "steel structure building, modern industrial facility",
            "mistakes": "steel structure quality inspection, engineer checking components",
            "tips": "modern steel structure factory, professional manufacturing",
            "checklist": "steel structure quality control, inspection checklist",
            "process": "steel structure manufacturing process, factory production line",
            "steps": "steel structure fabrication steps, industrial workshop",
            "requirements": "steel structure specification review, engineering documentation",
            "documents": "steel structure project documents, technical drawings",
            "specification": "steel structure specification, technical standards",
            "standard": "steel structure quality standard, industrial certification",
            "certification": "steel structure quality certification, ISO standard",
            "material": "steel material components, raw steel beams",
            "component": "steel structure components, fabricated steel parts",
            "connection": "steel structure connection detail, bolted joint",
            "load": "steel structure load testing, structural engineering",
            "wind": "steel structure wind load, building in windy environment",
            "seismic": "earthquake resistant steel structure, building engineering",
            "logistics": "steel structure logistics, shipping and transportation",
            "customs": "steel structure export documentation, customs clearance",
            "export": "steel structure export, container shipping port",
            "delivery": "steel structure delivery, truck transportation",
        }
        
        # 匹配关键词
        keyword_lower = keyword.lower()
        matched_scene = "modern steel structure factory, industrial manufacturing facility"
        for key, scene in scene_keywords.items():
            if key in keyword_lower:
                matched_scene = scene
                break
        
        if language == "en":
            prompt = f"{self.style}: {matched_scene}. High quality, detailed, professional lighting, industrial setting, no text, no watermark, 16:9 aspect ratio"
        else:
            prompt = f"{self.style}: {matched_scene}. 高质量，细节丰富，专业灯光，工业环境，无文字，无水印，16:9比例"
        
        return prompt
    
    def generate_with_api(self, keyword, output_path, language="en"):
        """使用AI API生成封面图"""
        if not self.has_api():
            return None
        
        prompt = self.generate_prompt(keyword, language)
        
        try:
            # 这里需要根据具体的API提供商实现
            # 预留接口，用户配置API后可启用
            print(f"    使用API生成封面图: {keyword}")
            # TODO: 实现具体的API调用
            return None
        except Exception as e:
            print(f"    API生成封面图失败: {e}")
            return None
    
    def generate_placeholder(self, keyword, output_path, language="en"):
        """生成占位封面图（使用简单的渐变背景）"""
        try:
            # 使用Pillow生成简单的占位图
            from PIL import Image, ImageDraw, ImageFont
            
            # 创建渐变背景
            width, height = self.width, self.height
            img = Image.new('RGB', (width, height))
            draw = ImageDraw.Draw(img)
            
            # 蓝色渐变背景（工业风格）
            for y in range(height):
                r = int(30 + (y / height) * 40)
                g = int(60 + (y / height) * 60)
                b = int(120 + (y / height) * 80)
                draw.line([(0, y), (width, y)], fill=(r, g, b))
            
            # 添加装饰性几何图形（钢结构风格）
            draw.rectangle([50, 50, width-50, height-50], outline=(255, 255, 255), width=3)
            draw.line([(100, 100), (width-100, 100)], fill=(200, 200, 200), width=2)
            draw.line([(100, height-100), (width-100, height-100)], fill=(200, 200, 200), width=2)
            
            # 添加标题文字
            try:
                font_size = 48
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
            
            # 简化标题
            title = keyword.title() if language == "en" else keyword
            if len(title) > 40:
                title = title[:37] + "..."
            
            # 居中绘制标题
            bbox = draw.textbbox((0, 0), title, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            x = (width - text_width) // 2
            y = (height - text_height) // 2
            draw.text((x, y), title, fill=(255, 255, 255), font=font)
            
            # 添加副标题
            subtitle = "ZhongSai Steel Structure" if language == "en" else "中赛钢构"
            try:
                subtitle_font = ImageFont.truetype("arial.ttf", 28)
            except:
                subtitle_font = ImageFont.load_default()
            
            bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
            sub_width = bbox[2] - bbox[0]
            sub_x = (width - sub_width) // 2
            sub_y = y + text_height + 30
            draw.text((sub_x, sub_y), subtitle, fill=(200, 200, 200), font=subtitle_font)
            
            # 保存
            img.save(output_path, "JPEG", quality=85)
            print(f"    占位封面图已生成: {output_path}")
            return output_path
            
        except ImportError:
            # 如果没有Pillow，创建一个简单的1x1像素图片
            print("    Pillow未安装，生成最小占位图")
            with open(output_path, 'wb') as f:
                # 最小的JPEG文件（1x1白色像素）
                f.write(b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.\' ",#\x1c\x1c(7),01444\x1f\'9=82<.342\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xc4\x00\xb5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00\x01}\x01\x02\x03\x00\x04\x11\x05\x12!1A\x06\x13Qa\x07"q\x142\x81\x91\xa1\x08#B\xb1\xc1\x15R\xd1\xf0$3br\x82\t\n\x16\x17\x18\x19\x1a%&\'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz\x83\x84\x85\x86\x87\x88\x89\x8a\x92\x93\x94\x95\x96\x97\x98\x99\x9a\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xff\xda\x00\x08\x01\x01\x00\x00?\x00\xfb\xff\xd9')
            return output_path
        except Exception as e:
            print(f"    生成占位图失败: {e}")
            return None
    
    def generate(self, keyword, output_path, language="en"):
        """生成封面图（优先API，后备占位图）"""
        # 优先使用API
        if self.has_api():
            result = self.generate_with_api(keyword, output_path, language)
            if result:
                return result
        
        # 后备：生成占位图
        return self.generate_placeholder(keyword, output_path, language)
