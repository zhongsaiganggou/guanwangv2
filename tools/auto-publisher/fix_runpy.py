#!/usr/bin/env python3
"""修改run.py，添加本地配置支持"""

with open('tools/auto-publisher/run.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 找到 'self.config = json.load(f)' 这一行，在后面插入本地配置加载代码
insert_index = -1
for i, line in enumerate(lines):
    if 'self.config = json.load(f)' in line and i > 40:
        insert_index = i + 1
        break

if insert_index > 0:
    insert_lines = [
        '\n',
        '        # 加载本地配置（如果存在，包含敏感信息，不提交到GitHub）\n',
        '        local_config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.local.json")\n',
        '        if os.path.exists(local_config_path):\n',
        '            with open(local_config_path, "r", encoding="utf-8") as f:\n',
        '                local_config = json.load(f)\n',
        '            for key, value in local_config.items():\n',
        '                if isinstance(value, dict) and key in self.config:\n',
        '                    self.config[key].update(value)\n',
        '                else:\n',
        '                    self.config[key] = value\n',
        '\n',
        '        # 从环境变量读取GitHub Token（GitHub Actions中自动提供）\n',
        '        if os.environ.get("GITHUB_TOKEN"):\n',
        '            self.config.setdefault("github", {})["token"] = os.environ["GITHUB_TOKEN"]\n',
        '        if os.environ.get("GITHUB_REPOSITORY"):\n',
        '            self.config.setdefault("github", {})["repo"] = os.environ["GITHUB_REPOSITORY"]\n',
    ]
    
    for j, line in enumerate(insert_lines):
        lines.insert(insert_index + j, line)
    
    with open('tools/auto-publisher/run.py', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print(f'run.py修改成功，在第{insert_index}行后插入了{len(insert_lines)}行代码')
else:
    print('未找到插入位置')
