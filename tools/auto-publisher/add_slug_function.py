#!/usr/bin/env python3
"""添加to_slug函数到keyword_research.py"""

with open('tools/auto-publisher/modules/keyword_research.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 检查是否已经有to_slug函数
if 'def to_slug(' in content:
    print('to_slug函数已存在')
else:
    # 在KeywordResearcher类之前添加to_slug函数
    old_text = 'class KeywordResearcher:'
    
    new_text = '''def to_slug(text):
    """将文本转换为slug格式（小写，连字符分隔）"""
    text = text.lower().strip()
    text = re.sub(r'[\\s_]+', '-', text)
    text = re.sub(r'[^a-z0-9\\-]', '', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text


class KeywordResearcher:'''
    
    if old_text in content:
        content = content.replace(old_text, new_text, 1)
        with open('tools/auto-publisher/modules/keyword_research.py', 'w', encoding='utf-8') as f:
            f.write(content)
        print('to_slug函数已添加')
    else:
        print('未找到KeywordResearcher类')

# 验证
with open('tools/auto-publisher/modules/keyword_research.py', 'r', encoding='utf-8') as f:
    content = f.read()
if 'def to_slug(' in content:
    print('✓ 验证成功：to_slug函数已存在')
else:
    print('✗ 验证失败：to_slug函数不存在')
