#!/usr/bin/env python3
"""修复中文文章的category字段"""

import re

zh_file = "src/content/blog/zh/steel-structure-welding-quality-control-guide.md"

with open(zh_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 替换category
content = content.replace('category: "制造与质量"', 'category: "Manufacturing & Quality"')

with open(zh_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ 已修复中文文章category字段为: Manufacturing & Quality")
