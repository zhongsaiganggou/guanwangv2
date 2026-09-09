#!/usr/bin/env python3
"""重新生成文章图片"""

import sys
sys.path.insert(0, 'tools/auto-publisher')
from modules.image_generator import ImageGenerator
import os
import shutil

# 初始化生成器
config = {'image': {'width': 1200, 'height': 630, 'style': 'industrial'}}
gen = ImageGenerator(config)

slug = 'import-steel-from-china-cost'
keyword = 'import steel from china cost'

for lang in ['en', 'zh']:
    print(f'\n=== 处理{lang.upper()}文章 ===')
    
    # 读取文章
    filepath = f'src/content/blog/{lang}/{slug}.md'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取正文（去掉frontmatter）
    parts = content.split('---', 2)
    article_body = parts[2] if len(parts) >= 3 else content
    
    # 生成图片
    print('生成文章图片...')
    images = gen.generate_article_images(keyword, article_body, slug, lang, max_images=6)
    
    print(f'生成了 {len(images)} 张图片:')
    for img in images:
        size = os.path.getsize(img['local_path'])
        print(f'  - {img["type"]}: {img["path"]} ({size} bytes)')
    
    # 复制图片到public目录
    os.makedirs(f'public/images/blog/{slug}', exist_ok=True)
    for img in images:
        dest = img['path']
        shutil.copy2(img['local_path'], dest)
    
    # 将图片插入文章
    new_body = gen.insert_images_into_article(article_body, images, lang)
    
    # 重新组合文章
    new_content = '---' + parts[1] + '---' + new_body
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f'{lang.upper()}文章图片已更新！')

print('\n所有文章图片重新生成完成！')
