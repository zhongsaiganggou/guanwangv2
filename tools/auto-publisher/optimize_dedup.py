#!/usr/bin/env python3
"""优化去重逻辑和文章内容质量"""

import re

# ============================================
# 1. 优化 keyword_research.py 中的去重逻辑
# ============================================

with open('tools/auto-publisher/modules/keyword_research.py', 'r', encoding='utf-8') as f:
    kr_content = f.read()

# 添加slug转换工具函数
old_class_start = '''class KeywordResearcher:
    """热搜词搜集器"""'''

new_class_start = '''def to_slug(text):
    """将文本转换为slug格式（小写，连字符分隔）"""
    # 转换为小写
    text = text.lower().strip()
    # 替换空格和特殊字符为连字符
    text = re.sub(r'[\\s_]+', '-', text)
    # 移除非字母数字字符（保留连字符）
    text = re.sub(r'[^a-z0-9\\-]', '', text)
    # 移除连续连字符
    text = re.sub(r'-+', '-', text)
    # 移除首尾连字符
    text = text.strip('-')
    return text


class KeywordResearcher:
    """热搜词搜集器"""'''

if old_class_start in kr_content:
    kr_content = kr_content.replace(old_class_start, new_class_start)
    print("✓ 已添加to_slug工具函数")
else:
    print("✗ 未找到KeywordResearcher类开始位置")

# 优化去重逻辑
old_dedup = '''        # 已发布主题去重（大幅减分）
        for topic in published_topics:
            topic_lower = topic.lower()
            # 计算相似度
            keyword_words = set(keyword_lower.split())
            topic_words = set(topic_lower.split())
            if keyword_words and topic_words:
                similarity = len(keyword_words & topic_words) / len(keyword_words | topic_words)
                if similarity > 0.5:
                    score -= 100  # 高度重复，排除'''

new_dedup = '''        # 已发布主题去重（大幅减分）
        keyword_slug = to_slug(keyword)
        for topic in published_topics:
            topic_slug = to_slug(topic)
            # 精确匹配：slug完全相同，直接排除
            if keyword_slug == topic_slug:
                score -= 500
                continue
            # 包含关系：一个slug包含另一个，高度相关
            if keyword_slug in topic_slug or topic_slug in keyword_slug:
                score -= 200
                continue
            # 计算词集相似度（使用slug的词）
            keyword_words = set(keyword_slug.split('-'))
            topic_words = set(topic_slug.split('-'))
            if keyword_words and topic_words:
                similarity = len(keyword_words & topic_words) / len(keyword_words | topic_words)
                if similarity > 0.6:
                    score -= 150  # 高度重复，排除
                elif similarity > 0.4:
                    score -= 50   # 中度重复，减分'''

if old_dedup in kr_content:
    kr_content = kr_content.replace(old_dedup, new_dedup)
    print("✓ 已优化去重逻辑")
else:
    print("✗ 未找到去重逻辑代码块")

with open('tools/auto-publisher/modules/keyword_research.py', 'w', encoding='utf-8') as f:
    f.write(kr_content)

print("\nkeyword_research.py优化完成！")

# ============================================
# 2. 优化 run.py 中的主题保存逻辑
# ============================================

with open('tools/auto-publisher/run.py', 'r', encoding='utf-8') as f:
    run_content = f.read()

# 在save_published_topics方法中添加slug统一处理
old_save = '''    def save_published_topics(self, topics):
        """保存已发布主题列表"""
        with open(self.published_topics_file, "w", encoding="utf-8") as f:
            json.dump(topics, f, ensure_ascii=False, indent=2)'''

new_save = '''    def save_published_topics(self, topics):
        """保存已发布主题列表（统一为slug格式，去重）"""
        # 统一转换为slug格式并去重
        from modules.keyword_research import to_slug
        unique_topics = []
        seen = set()
        for topic in topics:
            slug = to_slug(topic)
            if slug and slug not in seen:
                seen.add(slug)
                unique_topics.append(slug)
        with open(self.published_topics_file, "w", encoding="utf-8") as f:
            json.dump(unique_topics, f, ensure_ascii=False, indent=2)'''

if old_save in run_content:
    run_content = run_content.replace(old_save, new_save)
    print("✓ 已优化主题保存逻辑（统一slug格式，去重）")
else:
    print("✗ 未找到save_published_topics方法")

with open('tools/auto-publisher/run.py', 'w', encoding='utf-8') as f:
    f.write(run_content)

print("\nrun.py优化完成！")

# ============================================
# 3. 清理已发布主题记录中的重复条目
# ============================================

import json
import os

published_file = 'tools/auto-publisher/data/published_topics.json'
if os.path.exists(published_file):
    with open(published_file, 'r', encoding='utf-8') as f:
        topics = json.load(f)
    
    print(f"\n清理前已发布主题数量: {len(topics)}")
    print("清理前主题:")
    for t in topics:
        print(f"  - {t}")
    
    # 统一转换为slug格式并去重
    def to_slug(text):
        text = text.lower().strip()
        text = re.sub(r'[\s_]+', '-', text)
        text = re.sub(r'[^a-z0-9\-]', '', text)
        text = re.sub(r'-+', '-', text)
        text = text.strip('-')
        return text
    
    unique_topics = []
    seen = set()
    for topic in topics:
        slug = to_slug(topic)
        if slug and slug not in seen:
            seen.add(slug)
            unique_topics.append(slug)
    
    with open(published_file, 'w', encoding='utf-8') as f:
        json.dump(unique_topics, f, ensure_ascii=False, indent=2)
    
    print(f"\n清理后已发布主题数量: {len(unique_topics)}")
    print("清理后主题:")
    for t in unique_topics:
        print(f"  - {t}")
else:
    print("\n未找到已发布主题记录文件")

print("\n去重逻辑优化完成！")
