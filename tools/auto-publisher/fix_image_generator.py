#!/usr/bin/env python3
"""修复image_generator.py中的问题"""

with open('tools/auto-publisher/modules/image_generator.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 修复：添加random导入和scene_type定义
old_color_section = '''            # 根据场景关键词选择颜色主题
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
                colors = [(30, 40, 60), (50, 70, 100), (80, 110, 150)]  # 默认工业蓝'''

new_color_section = '''            # 根据场景关键词选择颜色主题
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
                colors = [(30, 40, 60), (50, 70, 100), (80, 110, 150)]  # 默认工业蓝'''

if old_color_section in content:
    content = content.replace(old_color_section, new_color_section)
    print("✓ 已修复颜色主题部分（添加scene_type和random导入）")
else:
    print("✗ 未找到颜色主题部分")

# 2. 修复：文字渲染部分显示段落标题
old_text_section = '''            # 半透明背景框
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
            draw.text(((width - brand_width) // 2, height-75), brand, fill=(200, 200, 200), font=font_small)'''

new_text_section = '''            # 半透明背景框
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
            draw.text(((width - brand_width) // 2, height-65), brand, fill=(180, 180, 180), font=font_small)'''

if old_text_section in content:
    content = content.replace(old_text_section, new_text_section)
    print("✓ 已修复文字渲染部分（显示段落标题）")
else:
    print("✗ 未找到文字渲染部分")

with open('tools/auto-publisher/modules/image_generator.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n修复完成！")
