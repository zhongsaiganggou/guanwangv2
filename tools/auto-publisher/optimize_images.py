#!/usr/bin/env python3
"""优化图片生成逻辑，让每张段落配图根据内容有明显区别"""

with open('tools/auto-publisher/modules/image_generator.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到generate_placeholder函数并替换
old_func_start = '''    def generate_placeholder(self, keyword, output_path, context="", language="en", image_type="section"):
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
            scene = self.get_scene_for_text(context or keyword)'''

new_func_start = '''    def generate_placeholder(self, keyword, output_path, context="", language="en", image_type="section"):
        """生成占位图（使用Pillow生成带文字的工业风格图片，每张都有独特设计）"""
        try:
            from PIL import Image, ImageDraw, ImageFont, ImageFilter
            import random

            width, height = self.width, self.height
            if image_type == "section":
                # 段落配图用稍小的尺寸
                width, height = 1600, 900

            img = Image.new('RGB', (width, height))
            draw = ImageDraw.Draw(img)

            # 根据场景关键词选择颜色主题
            scene = self.get_scene_for_text(context or keyword)
            scene_lower = scene.lower()
            
            # 根据场景类型选择不同的颜色主题和装饰元素
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

if old_func_start in content:
    content = content.replace(old_func_start, new_func_start)
    print("✓ 已优化颜色主题和场景类型")
else:
    print("✗ 未找到generate_placeholder函数开始位置")

# 替换钢结构装饰部分，根据场景类型生成不同的装饰
old_decoration = '''            # 添加钢结构几何装饰
            # 横梁
            beam_y = height // 3
            draw.rectangle([50, beam_y-15, width-50, beam_y+15], fill=(180, 180, 190), outline=(100, 100, 110), width=2)
            # 立柱
            for x in [width//6, width//2, width*5//6]:
                draw.rectangle([x-12, beam_y, x+12, height-80], fill=(170, 170, 180), outline=(90, 90, 100), width=2)
            # 斜撑
            draw.line([(width//6, beam_y+30), (width//2-50, height-80)], fill=(150, 150, 160), width=8)
            draw.line([(width//2+50, height-80), (width*5//6, beam_y+30)], fill=(150, 150, 160), width=8)'''

new_decoration = '''            # 根据场景类型添加不同的几何装饰
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
                draw.line([(width//2+50, height-80), (width*5//6, beam_y+30)], fill=(150, 150, 160), width=8)'''

if old_decoration in content:
    content = content.replace(old_decoration, new_decoration)
    print("✓ 已优化场景装饰（每种场景有独特设计）")
else:
    print("✗ 未找到钢结构装饰代码块")

# 替换场景标签部分，添加段落标题
old_label = '''            # 添加场景标签
            scene_label = self.get_scene_for_text(context or keyword).split(",")[0].title()
            if len(scene_label) > 40:
                scene_label = scene_label[:37] + "..."'''

new_label = '''            # 添加场景标签和段落标题
            scene_label = self.get_scene_for_text(context or keyword).split(",")[0].title()
            if len(scene_label) > 40:
                scene_label = scene_label[:37] + "..."
            
            # 从上下文提取段落标题（如果有）
            section_title = ""
            if context:
                # 尝试提取第一行作为标题
                lines = context.strip().split("\\n")
                if lines:
                    potential_title = lines[0].strip()
                    if 5 < len(potential_title) < 80 and not potential_title.startswith("#"):
                        section_title = potential_title
                    elif len(lines) > 1:
                        potential_title = lines[1].strip()
                        if 5 < len(potential_title) < 80:
                            section_title = potential_title'''

if old_label in content:
    content = content.replace(old_label, new_label)
    print("✓ 已优化标签（添加段落标题提取）")
else:
    print("✗ 未找到场景标签代码块")

# 替换文字渲染部分，显示段落标题
old_text_render = '''            # 半透明背景框
            draw.rectangle([40, height-140, width-40, height-50], fill=(0, 0, 0, 128))
            
            # 主标题
            title_text = keyword.title() if image_type == "cover" else scene_label
            if len(title_text) > 50:
                title_text = title_text[:47] + "..."
            
            try:
                bbox = draw.textbbox((0, 0), title_text, font=font_large)
                text_w = bbox[2] - bbox[0]
                draw.text(((width - text_w) // 2, height - 120), title_text, fill=(255, 255, 255), font=font_large)
            except:
                draw.text((50, height - 120), title_text, fill=(255, 255, 255), font=font_large)
            
            # 副标题
            if image_type == "section":
                sub_text = "ZhongSai Steel Structure"
                try:
                    bbox = draw.textbbox((0, 0), sub_text, font=font_small)
                    text_w = bbox[2] - bbox[0]
                    draw.text(((width - text_w) // 2, height - 75), sub_text, fill=(200, 200, 200), font=font_small)
                except:
                    draw.text((50, height - 75), sub_text, fill=(200, 200, 200), font=font_small)'''

new_text_render = '''            # 半透明背景框
            draw.rectangle([40, height-160, width-40, height-40], fill=(0, 0, 0, 150))
            
            # 主标题：封面用关键词，段落用场景类型
            if image_type == "cover":
                title_text = keyword.title()
            else:
                title_text = scene_label
            if len(title_text) > 50:
                title_text = title_text[:47] + "..."
            
            try:
                bbox = draw.textbbox((0, 0), title_text, font=font_large)
                text_w = bbox[2] - bbox[0]
                draw.text(((width - text_w) // 2, height - 140), title_text, fill=(255, 255, 255), font=font_large)
            except:
                draw.text((50, height - 140), title_text, fill=(255, 255, 255), font=font_large)
            
            # 段落标题（如果有）
            if image_type == "section" and section_title:
                # 截断过长的标题
                display_title = section_title
                if len(display_title) > 60:
                    display_title = display_title[:57] + "..."
                try:
                    bbox = draw.textbbox((0, 0), display_title, font=font_small)
                    text_w = bbox[2] - bbox[0]
                    draw.text(((width - text_w) // 2, height - 95), display_title, fill=(220, 220, 220), font=font_small)
                except:
                    draw.text((50, height - 95), display_title, fill=(220, 220, 220), font=font_small)
            
            # 底部品牌标识
            brand_text = "ZhongSai Steel Structure"
            try:
                bbox = draw.textbbox((0, 0), brand_text, font=font_small)
                text_w = bbox[2] - bbox[0]
                draw.text(((width - text_w) // 2, height - 65), brand_text, fill=(180, 180, 180), font=font_small)
            except:
                draw.text((50, height - 65), brand_text, fill=(180, 180, 180), font=font_small)'''

if old_text_render in content:
    content = content.replace(old_text_render, new_text_render)
    print("✓ 已优化文字渲染（显示段落标题）")
else:
    print("✗ 未找到文字渲染代码块")

with open('tools/auto-publisher/modules/image_generator.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nimage_generator.py优化完成！")
print("\n优化内容：")
print("1. 8种场景类型，每种有独特的颜色主题")
print("2. 每种场景有独特的几何装饰（焊接火花、集装箱、塔吊、蓝图、喷涂、图表、对勾等）")
print("3. 显示段落标题，让每张图片内容明确")
print("4. 使用上下文哈希作为随机种子，确保同一段落生成一致的图片")
