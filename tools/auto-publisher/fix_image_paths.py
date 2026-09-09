#!/usr/bin/env python3
"""修复image_generator.py中的图片路径问题"""

with open('tools/auto-publisher/modules/image_generator.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 在封面图部分添加url_path
old_cover = '''        images.append({
            "path": f"public/images/blog/{slug}/cover.jpg",
            "local_path": cover_path,
            "alt_text": self.generate_alt_text(keyword, "", language),
            "type": "cover",
            "position": 0
        })'''

new_cover = '''        images.append({
            "path": f"public/images/blog/{slug}/cover.jpg",
            "url_path": f"images/blog/{slug}/cover.jpg",
            "local_path": cover_path,
            "alt_text": self.generate_alt_text(keyword, "", language),
            "type": "cover",
            "position": 0
        })'''

if old_cover in content:
    content = content.replace(old_cover, new_cover)
    print("✓ 封面图url_path已添加")
else:
    print("✗ 未找到封面图代码块")

# 2. 在段落配图部分添加url_path
old_section = '''                    section_images.append({
                        "path": f"public/images/blog/{slug}/{img_filename}",
                        "local_path": img_path,
                        "alt_text": self.generate_alt_text(keyword, section_title, language),
                        "type": "section",
                        "section_title": section_title,
                        "position": i
                    })'''

new_section = '''                    section_images.append({
                        "path": f"public/images/blog/{slug}/{img_filename}",
                        "url_path": f"images/blog/{slug}/{img_filename}",
                        "local_path": img_path,
                        "alt_text": self.generate_alt_text(keyword, section_title, language),
                        "type": "section",
                        "section_title": section_title,
                        "position": i
                    })'''

if old_section in content:
    content = content.replace(old_section, new_section)
    print("✓ 段落配图url_path已添加")
else:
    print("✗ 未找到段落配图代码块")

# 3. 修改insert_images_into_article函数，使用url_path
old_insert = '''                # 在段落后插入图片
                img_markdown = f"\\n![{alt_text}](/{matching_image['path']})\\n"'''

new_insert = '''                # 在段落后插入图片（使用url_path，不是文件系统path）
                img_url = matching_image.get('url_path', matching_image['path'].replace('public/', ''))
                img_markdown = f"\\n![{alt_text}](/{img_url})\\n"'''

if old_insert in content:
    content = content.replace(old_insert, new_insert)
    print("✓ insert函数已修改为使用url_path")
else:
    print("✗ 未找到insert函数代码块")
    # 尝试查找类似的代码
    import re
    matches = re.findall(r"matching_image\['path'\]", content)
    print(f"  找到 {len(matches)} 处 matching_image['path'] 引用")

with open('tools/auto-publisher/modules/image_generator.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nimage_generator.py修复完成！")
