#!/usr/bin/env python3
"""测试图片搜索模块"""

import sys
sys.path.insert(0, 'tools/auto-publisher')
from modules.image_searcher import ImageSearcher

searcher = ImageSearcher()

# 测试搜索不同场景的图片
test_keywords = ['steel fabrication', 'steel installation', 'steel shipping', 'steel design', 'steel coating']

for kw in test_keywords:
    print(f'\n搜索: {kw}')
    images = searcher.search_images(kw, count=2)
    for img in images:
        print(f"  - {img['source']}: {img['title'][:50]}")
        print(f"    URL: {img['url'][:80]}")
