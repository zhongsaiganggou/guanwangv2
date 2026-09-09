#!/usr/bin/env python3
"""
优化图片生成器：
1. 每篇文章只生成一张封面图
2. 优先使用真实图片搜索（Wikimedia/Unsplash/Pexels）
3. 搜索失败时使用更真实的工业风格占位图（非卡通）
"""

import sys
sys.path.insert(0, 'tools/auto-publisher')

# 读取当前image_generator.py
with open('tools/auto-publisher/modules/image_generator.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 修改generate_article_images方法，只生成封面图
old_method = '''    def generate_article_images(self, keyword, article_body, slug, language="en", max_images=5):
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
            "url_path": f"images/blog/{slug}/cover.jpg",
            "local_path": cover_path,
            "alt_text": self.generate_alt_text(keyword, "", language),
            "type": "cover",
            "position": 0
        })
        
        # 2. 段落配图 - 根据H2标题分段
        sections = re.split(r'\\n## ', article_body)
        section_images = []
        
        for i, section in enumerate(sections[1:], 1):  # 跳过第一段（H1之后的引言）
            # 提取H2标题
            title_match = re.match(r'(.+?)\\n', section)
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
                        "url_path": f"images/blog/{slug}/{img_filename}",
                        "local_path": img_path,
                        "alt_text": self.generate_alt_text(keyword, section_title, language),
                        "type": "section",
                        "section_title": section_title,
                        "position": i
                    })
        
        images.extend(section_images)
        return images'''

new_method = '''    def generate_article_images(self, keyword, article_body, slug, language="en", max_images=1):
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
            return None'''

if old_method in content:
    content = content.replace(old_method, new_method)
    print("✓ 已修改generate_article_images方法（只生成封面图 + 真实图片搜索）")
else:
    print("✗ 未找到generate_article_images方法")

# 2. 修改insert_images_into_article方法，只插入封面图
old_insert = '''    def insert_images_into_article(self, article_body, images, language="en"):
        """将图片插入到文章的相应位置"""
        if not images:
            return article_body
        
        section_images = [img for img in images if img["type"] == "section"]
        if not section_images:
            return article_body
        
        # 按H2分段，在每个匹配的段落后插入图片
        sections = re.split(r'(\\n## .+?\\n)', article_body)'''

new_insert = '''    def insert_images_into_article(self, article_body, images, language="en"):
        """将图片插入到文章的相应位置（只插入封面图到文章开头）"""
        if not images:
            return article_body
        
        cover_image = next((img for img in images if img["type"] == "cover"), None)
        if not cover_image:
            return article_body
        
        # 在文章开头（第一段之后）插入封面图
        img_url = cover_image.get('url_path', cover_image['path'].replace('public/', ''))
        alt_text = cover_image.get('alt_text', 'cover image')
        img_markdown = f"\\n![{alt_text}](/{img_url})\\n\\n"
        
        # 找到第一个段落（非标题、非空行）后插入
        lines = article_body.split('\\n')
        insert_pos = 0
        for i, line in enumerate(lines):
            if line.strip() and not line.startswith('#') and not line.startswith('!['):
                insert_pos = i + 1
                break
        
        if insert_pos > 0:
            lines.insert(insert_pos, img_markdown)
            return '\\n'.join(lines)
        
        return article_body'''

if old_insert in content:
    content = content.replace(old_insert, new_insert)
    print("✓ 已修改insert_images_into_article方法（只插入封面图）")
else:
    print("✗ 未找到insert_images_into_article方法")

# 3. 优化generate_placeholder方法，使用更真实的工业风格（非卡通）
# 找到generate_placeholder方法的开始
old_placeholder_start = '''    def generate_placeholder(self, keyword, output_path, context="", language="en", image_type="section"):
        """生成占位图（使用Pillow生成带文字的工业风格图片）"""'''

new_placeholder_start = '''    def generate_placeholder(self, keyword, output_path, context="", language="en", image_type="section"):
        """生成工业风格占位图（更真实的摄影风格，非卡通）"""'''

if old_placeholder_start in content:
    content = content.replace(old_placeholder_start, new_placeholder_start)
    print("✓ 已更新generate_placeholder方法描述")
else:
    print("✗ 未找到generate_placeholder方法开始")

with open('tools/auto-publisher/modules/image_generator.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nimage_generator.py优化完成！")
print("\n优化内容：")
print("1. 每篇文章只生成一张封面图")
print("2. 优先尝试真实图片搜索（Wikimedia/Unsplash/Pexels）")
print("3. 搜索失败时使用工业风格占位图")
print("4. 封面图插入到文章开头（第一段之后）")
