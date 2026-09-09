#!/usr/bin/env python3
"""检查已发布主题"""

import json

with open('tools/auto-publisher/data/published_topics.json', 'r', encoding='utf-8') as f:
    topics = json.load(f)

print(f'已发布 {len(topics)} 个主题:')
for i, t in enumerate(topics, 1):
    topic = t.get('topic', t.get('slug', 'unknown'))
    print(f'  {i}. {topic}')
