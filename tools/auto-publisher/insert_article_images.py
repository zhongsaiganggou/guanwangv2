#!/usr/bin/env python3
"""在文章中插入段落配图"""

import re

# 图片URL路径前缀
img_prefix = "/images/blog/steel-structure-welding-quality-control-guide"

# 英文文章
en_file = "src/content/blog/en/steel-structure-welding-quality-control-guide.md"
with open(en_file, 'r', encoding='utf-8') as f:
    en_content = f.read()

# 在相应段落插入图片
# 1. 焊接工艺部分 - 在"Common Welding Processes in Steel Fabrication"后
en_content = en_content.replace(
    "### Common Welding Processes in Steel Fabrication",
    f"### Common Welding Processes in Steel Fabrication\n\n![Welder welding large steel beam in factory]({img_prefix}/section_01.jpg)\n"
)

# 2. 质量控制部分 - 在"Quality Control Starts Before Welding"后
en_content = en_content.replace(
    "### Quality Control Starts Before Welding",
    f"### Quality Control Starts Before Welding\n\n![Welding inspector examining steel weld with magnifying glass]({img_prefix}/section_02.jpg)\n"
)

# 3. 无损检测部分 - 在"Ultrasonic Testing (UT)"后
en_content = en_content.replace(
    "#### 4. Ultrasonic Testing (UT)",
    f"#### 4. Ultrasonic Testing (UT)\n\n![NDT technician using ultrasonic testing equipment on steel weld]({img_prefix}/section_03.jpg)\n"
)

# 4. 焊接缺陷部分 - 在"Common Welding Defects and Causes"后
en_content = en_content.replace(
    "## Part 3: Common Welding Defects and Causes",
    f"## Part 3: Common Welding Defects and Causes\n\n![Macro close-up of high quality steel weld bead]({img_prefix}/section_04.jpg)\n"
)

# 5. 出口包装部分 - 在"Related ZhongSai Capabilities"后
en_content = en_content.replace(
    "## Part 7: Related ZhongSai Capabilities",
    f"## Part 7: Related ZhongSai Capabilities\n\n![Finished steel structure components ready for packing and shipping]({img_prefix}/section_05.jpg)\n"
)

with open(en_file, 'w', encoding='utf-8') as f:
    f.write(en_content)
print("✓ 英文文章图片插入完成")

# 中文文章
zh_file = "src/content/blog/zh/steel-structure-welding-quality-control-guide.md"
with open(zh_file, 'r', encoding='utf-8') as f:
    zh_content = f.read()

# 在相应段落插入图片
# 1. 焊接工艺部分
zh_content = zh_content.replace(
    "### 钢结构制造中常见的焊接工艺",
    f"### 钢结构制造中常见的焊接工艺\n\n![焊工在工厂焊接大型钢梁]({img_prefix}/section_01.jpg)\n"
)

# 2. 质量控制部分
zh_content = zh_content.replace(
    "### 质量控制在焊接前开始",
    f"### 质量控制在焊接前开始\n\n![焊接检验员用放大镜检查焊缝]({img_prefix}/section_02.jpg)\n"
)

# 3. 无损检测部分
zh_content = zh_content.replace(
    "#### 4. 超声波检测（UT）",
    f"#### 4. 超声波检测（UT）\n\n![无损检测技术人员使用超声波检测设备检查焊缝]({img_prefix}/section_03.jpg)\n"
)

# 4. 焊接缺陷部分
zh_content = zh_content.replace(
    "## 第三部分：常见焊接缺陷及原因",
    f"## 第三部分：常见焊接缺陷及原因\n\n![高质量焊缝的微距特写]({img_prefix}/section_04.jpg)\n"
)

# 5. 出口包装部分
zh_content = zh_content.replace(
    "## 第七部分：中赛相关能力",
    f"## 第七部分：中赛相关能力\n\n![成品钢构件准备包装和发运]({img_prefix}/section_05.jpg)\n"
)

with open(zh_file, 'w', encoding='utf-8') as f:
    f.write(zh_content)
print("✓ 中文文章图片插入完成")

# 统计图片数量
en_img_count = len(re.findall(r'!\[.*?\]\(.*?section_\d+\.jpg\)', en_content))
zh_img_count = len(re.findall(r'!\[.*?\]\(.*?section_\d+\.jpg\)', zh_content))
print(f"\n英文文章段落配图数量: {en_img_count}")
print(f"中文文章段落配图数量: {zh_img_count}")
