#!/usr/bin/env python3
"""
中赛钢构自动发文系统 - 主控制脚本
功能：
1. 搜集同行热搜词
2. 筛选适合中赛业务的主题
3. 检查是否已发布（去重）
4. AI生成文章内容（中英文双版本）
5. 生成封面图
6. 事实安全检查
7. 发布到GitHub
8. 触发Cloudflare部署
9. 记录日志和发布报告

用法：
  python tools/auto-publisher/run.py              # 正常运行（发布1篇）
  python tools/auto-publisher/run.py --dry-run    # 试运行（不发布）
  python tools/auto-publisher/run.py --keyword "xxx"  # 指定关键词
"""

import sys
import os
import json
import time
import traceback
from datetime import datetime

# 添加模块路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from modules.keyword_research import KeywordResearcher
from modules.article_generator import ArticleGenerator
from modules.image_generator import ImageGenerator
from modules.fact_safety import FactSafetyChecker
from modules.github_publisher import GitHubPublisher


class AutoPublisher:
    """自动发文系统主类"""
    
    def __init__(self, config_path=None):
        # 加载配置
        if config_path is None:
            config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.json")
        
        with open(config_path, "r", encoding="utf-8") as f:
            self.config = json.load(f)

        # 加载本地配置（如果存在，包含敏感信息，不提交到GitHub）
        local_config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.local.json")
        if os.path.exists(local_config_path):
            with open(local_config_path, "r", encoding="utf-8") as f:
                local_config = json.load(f)
            for key, value in local_config.items():
                if isinstance(value, dict) and key in self.config:
                    self.config[key].update(value)
                else:
                    self.config[key] = value

        # 从环境变量读取GitHub Token（GitHub Actions中自动提供）
        if os.environ.get("GITHUB_TOKEN"):
            self.config.setdefault("github", {})["token"] = os.environ["GITHUB_TOKEN"]
        if os.environ.get("GITHUB_REPOSITORY"):
            self.config.setdefault("github", {})["repo"] = os.environ["GITHUB_REPOSITORY"]
        
        # 初始化模块
        self.keyword_researcher = KeywordResearcher(self.config)
        self.article_generator = ArticleGenerator(self.config)
        self.image_generator = ImageGenerator(self.config)
        self.fact_safety_checker = FactSafetyChecker(self.config)
        self.github_publisher = GitHubPublisher(self.config)
        
        # 日志目录
        self.log_dir = self.config.get("logging", {}).get("log_dir", "tools/auto-publisher/logs/")
        self.data_dir = self.config.get("logging", {}).get("data_dir", "tools/auto-publisher/data/")
        self.drafts_dir = self.config.get("logging", {}).get("drafts_dir", "tools/auto-publisher/drafts/")
        self.published_topics_file = self.config.get("logging", {}).get("published_topics_file", "tools/auto-publisher/data/published_topics.json")
        
        # 确保目录存在
        for d in [self.log_dir, self.data_dir, self.drafts_dir]:
            os.makedirs(d, exist_ok=True)
        
        # 运行ID
        self.run_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.log_file = os.path.join(self.log_dir, f"run_{self.run_id}.log")
        
        # 结果
        self.results = {
            "run_id": self.run_id,
            "start_time": datetime.now().isoformat(),
            "status": "running",
            "keyword": None,
            "articles": [],
            "errors": [],
            "warnings": []
        }
    
    def log(self, message):
        """记录日志"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_message = f"[{timestamp}] {message}"
        print(log_message)
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(log_message + "\n")
    
    def load_published_topics(self):
        """加载已发布主题列表"""
        if os.path.exists(self.published_topics_file):
            with open(self.published_topics_file, "r", encoding="utf-8") as f:
                return json.load(f)
        return []
    
    def save_published_topics(self, topics):
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
            json.dump(unique_topics, f, ensure_ascii=False, indent=2)
    
    def select_keyword(self, keywords, published_topics):
        """选择最佳关键词"""
        self.log("  评估关键词并排序...")
        
        scored = []
        for kw in keywords:
            score = self.keyword_researcher.score_keyword(kw, published_topics)
            scored.append((kw, score))
        
        # 按分数排序
        scored.sort(key=lambda x: x[1], reverse=True)
        
        # 输出前10名
        self.log("  前10个候选关键词:")
        for i, (kw, score) in enumerate(scored[:10]):
            self.log(f"    {i+1}. {kw} (score: {score})")
        
        # 选择最高分的
        if scored and scored[0][1] > 0:
            return scored[0][0]
        return None
    
    def generate_articles(self, keyword):
        """生成中英文文章"""
        articles = []
        
        # 生成英文版
        self.log("  生成英文版文章...")
        en_article = self.article_generator.generate(keyword, "en")
        if en_article:
            articles.append(("en", en_article))
            self.log(f"    英文版生成成功，字数: {len(en_article['body'].split())}")
        else:
            self.log("    ❌ 英文版生成失败")
        
        # 生成中文版
        self.log("  生成中文版文章...")
        zh_article = self.article_generator.generate(keyword, "zh")
        if zh_article:
            articles.append(("zh", zh_article))
            self.log(f"    中文版生成成功，字数: {len(zh_article['body'].split())}")
        else:
            self.log("    ❌ 中文版生成失败")
        
        return articles
    
    def generate_article_images(self, keyword, articles, slug):
        """
        为文章生成多张图片（封面图 + 段落配图）
        并将图片插入到文章中
        返回: (images, updated_articles)
        """
        all_images = []
        updated_articles = []
        
        for lang, article in articles:
            self.log(f"  为{('英文' if lang == 'en' else '中文')}版生成配图...")
            
            # 生成文章图片（封面 + 段落配图）
            images = self.image_generator.generate_article_images(
                keyword=keyword,
                article_body=article["body"],
                slug=slug,
                language=lang,
                max_images=5
            )
            
            # 将图片插入到文章中
            updated_body = self.image_generator.insert_images_into_article(
                article["body"], images, lang
            )
            
            article["body"] = updated_body
            updated_articles.append((lang, article))
            all_images.extend(images)
            
            section_count = len([img for img in images if img["type"] == "section"])
            self.log(f"    生成 {len(images)} 张图片（1张封面 + {section_count}张段落配图）")
        
        # 去重（中英文可能生成相同的图片路径）
        unique_images = []
        seen_paths = set()
        for img in all_images:
            if img["path"] not in seen_paths:
                seen_paths.add(img["path"])
                unique_images.append(img)
        
        return unique_images, updated_articles
    
    def fact_safety_check(self, articles):
        """事实安全检查"""
        self.log("  执行事实安全检查...")
        all_passed = True
        
        for lang, article in articles:
            content = article["body"]
            results = self.fact_safety_checker.check(content, lang)
            
            if not results["passed"]:
                all_passed = False
                self.log(f"    ❌ {lang.upper()}版事实安全检查未通过")
                for err in results["errors"]:
                    self.log(f"      错误: {err['type']} - {err.get('pattern', '')}")
            else:
                self.log(f"    ✅ {lang.upper()}版事实安全检查通过")
            
            if results["warnings"]:
                for warn in results["warnings"]:
                    self.log(f"      ⚠️  警告: {warn['type']}")
        
        return all_passed
    
    def build_markdown_files(self, articles, slug):
        """构建Markdown文件"""
        markdown_files = []
        cover_image_path = f"/images/blog/{slug}/cover.jpg"
        
        for lang, article in articles:
            content = self.article_generator.build_markdown(article, slug, cover_image_path)
            path = f"src/content/blog/{lang}/{slug}.md"
            markdown_files.append({
                "path": path,
                "content": content,
                "title": article["title"],
                "language": lang
            })
            self.log(f"    Markdown文件已构建: {path}")
        
        return markdown_files
    
    def publish(self, markdown_files, images, keyword):
        """发布到GitHub"""
        self.log("  发布到GitHub...")
        
        commit_message = f"Auto-publish: {keyword} (EN/ZH)"
        
        try:
            commit_sha = self.github_publisher.publish_articles(
                articles=markdown_files,
                images=images,
                commit_message=commit_message
            )
            self.log(f"    ✅ 发布成功! Commit: {commit_sha[:7]}")
            return commit_sha
        except Exception as e:
            self.log(f"    ❌ 发布失败: {e}")
            self.results["errors"].append(f"GitHub publish failed: {str(e)}")
            return None
    
    def trigger_deployment(self):
        """触发Cloudflare部署（通过GitHub commit自动触发）"""
        self.log("  Cloudflare Pages将通过GitHub webhook自动触发部署...")
        self.log("  等待部署完成（约2-3分钟）...")
        # Cloudflare Pages会自动监听GitHub push并部署
        # 这里只需要等待，不需要额外操作
        time.sleep(10)  # 短暂等待，让部署开始
        self.log("    ✅ 部署已触发，Cloudflare Pages正在构建...")
    
    def run(self, specified_keyword=None, dry_run=False):
        """运行完整的自动发文流程"""
        self.log("=" * 60)
        self.log("中赛钢构自动发文系统启动")
        self.log(f"运行ID: {self.run_id}")
        self.log(f"试运行模式: {dry_run}")
        self.log("=" * 60)
        
        try:
            # Step 1: 加载已发布主题
            self.log("\n[Step 1/8] 加载已发布主题列表...")
            published_topics = self.load_published_topics()
            # 同时从GitHub获取已发布文章
            try:
                github_topics = self.github_publisher.get_published_articles()
                published_topics = list(set(published_topics + github_topics))
                self.log(f"  已发布主题: {len(published_topics)} 个")
            except Exception as e:
                self.log(f"  从GitHub获取已发布文章失败: {e}")
                self.log(f"  使用本地已发布主题: {len(published_topics)} 个")
            
            # Step 2: 热搜词研究
            self.log("\n[Step 2/8] 搜集同行热搜词...")
            if specified_keyword:
                keywords = [specified_keyword]
                self.log(f"  使用指定关键词: {specified_keyword}")
            else:
                keywords = self.keyword_researcher.research(max_keywords=50)
                self.log(f"  收集到 {len(keywords)} 个候选关键词")
            
            # Step 3: 选题和去重
            self.log("\n[Step 3/8] 选题和去重...")
            selected_keyword = self.select_keyword(keywords, published_topics)
            if not selected_keyword:
                self.log("  ❌ 没有找到合适的关键词")
                self.results["status"] = "failed"
                self.results["errors"].append("No suitable keyword found")
                return self.results
            
            self.log(f"  选定关键词: {selected_keyword}")
            self.results["keyword"] = selected_keyword
            
            # Step 4: 生成文章
            self.log("\n[Step 4/8] 生成文章内容（中英文双版本）...")
            articles = self.generate_articles(selected_keyword)
            if len(articles) < 2:
                self.log("  ⚠️  文章生成不完整，至少需要中英文两版")
                self.results["warnings"].append("Article generation incomplete")
            
            if not articles:
                self.log("  ❌ 文章生成失败")
                self.results["status"] = "failed"
                self.results["errors"].append("Article generation failed")
                return self.results
            
            # 生成slug
            slug = self.article_generator.generate_slug(selected_keyword, "en")
            self.log(f"  文章Slug: {slug}")
            
            # Step 5: 生成文章配图（封面图 + 段落配图）
            self.log("\n[Step 5/8] 生成文章配图（封面 + 段落配图）...")
            images, articles = self.generate_article_images(selected_keyword, articles, slug)
            self.log(f"  共生成 {len(images)} 张图片")
            
            # Step 6: 事实安全检查
            self.log("\n[Step 6/8] 事实安全检查...")
            safety_passed = self.fact_safety_check(articles)
            if not safety_passed:
                self.log("  ⚠️  事实安全检查发现问题，但继续发布（可配置为阻断）")
                self.results["warnings"].append("Fact safety check found issues")
            
            # Step 7: 构建Markdown文件
            self.log("\n[Step 7/8] 构建Markdown文件...")
            markdown_files = self.build_markdown_files(articles, slug)
            
            # 保存草稿（用于审核）
            for mf in markdown_files:
                draft_path = os.path.join(self.drafts_dir, os.path.basename(mf["path"]))
                with open(draft_path, "w", encoding="utf-8") as f:
                    f.write(mf["content"])
            self.log(f"  草稿已保存到: {self.drafts_dir}")
            
            # Step 8: 发布
            self.log("\n[Step 8/8] 发布到GitHub并触发部署...")
            if dry_run:
                self.log("  ⚠️  试运行模式，跳过发布")
                self.results["status"] = "dry_run_complete"
            else:
                commit_sha = self.publish(markdown_files, images, selected_keyword)
                if commit_sha:
                    self.results["commit_sha"] = commit_sha
                    self.trigger_deployment()
                    
                    # 更新已发布主题列表
                    published_topics.append(selected_keyword)
                    published_topics.append(slug)
                    self.save_published_topics(published_topics)
                    
                    self.results["status"] = "success"
                else:
                    self.results["status"] = "failed"
            
            # 记录文章信息
            for lang, article in articles:
                self.results["articles"].append({
                    "language": lang,
                    "title": article["title"],
                    "category": article["category"],
                    "word_count": len(article["body"].split()),
                    "url": f"https://zhongsai-steelstructure.com/{lang}/blog/{slug}/"
                })
            
        except Exception as e:
            self.log(f"\n❌ 运行出错: {e}")
            self.log(traceback.format_exc())
            self.results["status"] = "error"
            self.results["errors"].append(str(e))
        
        # 完成
        self.results["end_time"] = datetime.now().isoformat()
        self.results["duration"] = (datetime.fromisoformat(self.results["end_time"]) - datetime.fromisoformat(self.results["start_time"])).total_seconds()
        
        self.log("\n" + "=" * 60)
        self.log(f"运行完成! 状态: {self.results['status']}")
        self.log(f"耗时: {self.results['duration']:.1f}秒")
        if self.results.get("keyword"):
            self.log(f"关键词: {self.results['keyword']}")
        if self.results.get("commit_sha"):
            self.log(f"Commit: {self.results['commit_sha'][:7]}")
        self.log("=" * 60)
        
        # 保存结果
        result_file = os.path.join(self.log_dir, f"result_{self.run_id}.json")
        with open(result_file, "w", encoding="utf-8") as f:
            json.dump(self.results, f, ensure_ascii=False, indent=2)
        self.log(f"结果已保存: {result_file}")
        
        return self.results


def main():
    """主函数"""
    # 解析命令行参数
    dry_run = "--dry-run" in sys.argv
    specified_keyword = None
    
    for i, arg in enumerate(sys.argv):
        if arg == "--keyword" and i + 1 < len(sys.argv):
            specified_keyword = sys.argv[i + 1]
    
    # 创建并运行
    publisher = AutoPublisher()
    results = publisher.run(specified_keyword=specified_keyword, dry_run=dry_run)
    
    # 返回退出码
    if results["status"] in ["success", "dry_run_complete"]:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
