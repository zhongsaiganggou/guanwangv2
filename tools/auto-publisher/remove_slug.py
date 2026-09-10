#!/usr/bin/env python3
"""删除文章frontmatter中的slug字段"""

import re

files = [
    "src/content/blog/en/steel-structure-welding-quality-control-guide.md",
    "src/content/blog/zh/steel-structure-welding-quality-control-guide.md"
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 删除slug行
    content = re.sub(r'^slug:\s*.*\n', '', content, flags=re.MULTILINE)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ 已删除slug字段: {file_path}")

print("\n完成！")
