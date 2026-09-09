#!/usr/bin/env python3
"""
热搜词搜集模块
- Google搜索建议（免费，无需API）
- 竞品网站分析
- 种子关键词扩展
"""

import json
import os
import re
import time
import random
import urllib.request
import urllib.parse
from html.parser import HTMLParser


class GoogleSuggestFetcher:
    """Google搜索建议获取器（免费接口）"""
    
    def __init__(self, language="en", country="us", proxy=None):
        self.language = language
        self.country = country
        self.base_url = "https://suggestqueries.google.com/complete/search"
        self.proxy = proxy
        # 创建带代理的opener
        if self.proxy:
            proxy_handler = urllib.request.ProxyHandler({
                'http': self.proxy,
                'https': self.proxy
            })
            self.opener = urllib.request.build_opener(proxy_handler)
        else:
            self.opener = urllib.request.build_opener()
    
    def get_suggestions(self, keyword, max_retries=3):
        """获取Google搜索建议"""
        params = {
            "client": "firefox",
            "q": keyword,
            "hl": self.language,
            "gl": self.country
        }
        url = f"{self.base_url}?{urllib.parse.urlencode(params)}"
        
        for attempt in range(max_retries):
            try:
                req = urllib.request.Request(url, headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                })
                with self.opener.open(req, timeout=15) as response:
                    data = json.loads(response.read().decode("utf-8"))
                    if len(data) > 1:
                        return data[1]
                    return []
            except Exception as e:
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                else:
                    print(f"  获取搜索建议失败 ({keyword}): {e}")
                    return []
        return []
    
    def get_related_questions(self, keyword):
        """获取相关问题（People Also Ask风格）"""
        question_prefixes = [
            f"how to {keyword}",
            f"what is {keyword}",
            f"why {keyword}",
            f"best {keyword}",
            f"{keyword} cost",
            f"{keyword} price",
            f"{keyword} vs",
            f"{keyword} guide",
            f"{keyword} tips",
            f"{keyword} mistakes",
            f"{keyword} checklist",
            f"{keyword} requirements",
            f"{keyword} process",
            f"{keyword} installation",
            f"{keyword} design",
            f"{keyword} specification",
            f"{keyword} quality",
            f"{keyword} supplier",
            f"{keyword} manufacturer",
            f"import {keyword} from china",
            f"{keyword} shipping",
            f"{keyword} container",
            f"{keyword} coating",
            f"{keyword} corrosion",
            f"{keyword} maintenance",
            f"{keyword} lifespan",
            f"{keyword} durability",
            f"{keyword} welding",
            f"{keyword} drawing",
            f"{keyword} foundation",
            f"{keyword} load",
            f"{keyword} standard",
            f"{keyword} certification"
        ]
        return question_prefixes


class CompetitorAnalyzer:
    """竞品网站分析器"""
    
    def __init__(self, competitors=None, proxy=None):
        self.competitors = competitors or []
        self.proxy = proxy
        if self.proxy:
            proxy_handler = urllib.request.ProxyHandler({
                'http': self.proxy,
                'https': self.proxy
            })
            self.opener = urllib.request.build_opener(proxy_handler)
        else:
            self.opener = urllib.request.build_opener()
    
    def extract_keywords_from_url(self, url):
        """从URL中提取关键词"""
        try:
            path = urllib.parse.urlparse(url).path
            keywords = re.findall(r'[a-z]{4,}', path.lower())
            return [k for k in keywords if len(k) > 3]
        except:
            return []
    
    def analyze(self, max_pages=5):
        """分析竞品网站（简化版，只提取URL关键词）"""
        all_keywords = []
        for competitor in self.competitors[:3]:
            try:
                req = urllib.request.Request(competitor, headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                })
                with self.opener.open(req, timeout=15) as response:
                    html = response.read().decode("utf-8", errors="ignore")
                    # 提取标题和H1
                    titles = re.findall(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
                    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
                    for text in titles + h1s:
                        clean = re.sub(r'<[^>]+>', '', text).strip()
                        words = re.findall(r'[a-zA-Z]{4,}', clean.lower())
                        all_keywords.extend(words)
            except Exception as e:
                print(f"  竞品分析失败 ({competitor}): {e}")
                continue
        return list(set(all_keywords))


def to_slug(text):
    """将文本转换为slug格式（小写，连字符分隔）"""
    text = text.lower().strip()
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'[^a-z0-9\-]', '', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text


class KeywordResearcher:
    """热搜词研究主类"""
    
    def __init__(self, config):
        self.config = config
        kr_config = config.get("keyword_research", {})
        # 在GitHub Actions环境中禁用代理（运行在国外服务器）
        if os.environ.get("GITHUB_ACTIONS") == "true":
            proxy = None
        else:
            proxy = config.get("system", {}).get("proxy", None)
        self.google_suggest = GoogleSuggestFetcher(
            language=kr_config.get("google_suggest", {}).get("language", "en"),
            country=kr_config.get("google_suggest", {}).get("country", "us"),
            proxy=proxy
        )
        self.competitor_analyzer = CompetitorAnalyzer(
            competitors=kr_config.get("competitor_analysis", {}).get("competitors", []),
            proxy=proxy
        )
        self.seed_keywords = kr_config.get("seed_keywords", [])
        self.business_keywords = kr_config.get("business_relevant_keywords", [])
    
    def is_business_relevant(self, keyword):
        """判断关键词是否与业务相关"""
        keyword_lower = keyword.lower()
        for bw in self.business_keywords:
            if bw in keyword_lower:
                return True
        return False
    
    def research(self, max_keywords=50):
        """执行完整的热搜词研究"""
        print("\n[1/4] 开始热搜词研究...")
        all_keywords = set()
        
        # 1. 从种子关键词获取Google搜索建议
        print(f"  从 {len(self.seed_keywords)} 个种子关键词获取搜索建议...")
        for i, seed in enumerate(self.seed_keywords[:15]):  # 限制数量避免请求过多
            suggestions = self.google_suggest.get_suggestions(seed)
            for s in suggestions:
                if self.is_business_relevant(s) and len(s.split()) >= 3:
                    all_keywords.add(s.lower().strip())
            time.sleep(random.uniform(0.5, 1.5))
            if (i + 1) % 5 == 0:
                print(f"    已处理 {i+1}/{min(15, len(self.seed_keywords))} 个种子词")
        
        # 2. 生成相关问题
        print("  生成相关问题关键词...")
        for seed in self.seed_keywords[:10]:
            questions = self.google_suggest.get_related_questions(seed)
            for q in questions:
                if self.is_business_relevant(q):
                    all_keywords.add(q.lower().strip())
        
        # 3. 竞品分析
        if self.config.get("keyword_research", {}).get("competitor_analysis", {}).get("enabled", False):
            print("  分析竞品网站...")
            competitor_keywords = self.competitor_analyzer.analyze()
            for kw in competitor_keywords:
                if kw in self.business_keywords:
                    all_keywords.add(f"steel structure {kw}")
        
        print(f"  共收集到 {len(all_keywords)} 个候选关键词")
        return sorted(list(all_keywords))[:max_keywords]
    
    def score_keyword(self, keyword, published_topics):
        """给关键词打分，用于选题排序"""
        score = 0
        keyword_lower = keyword.lower()
        
        # 业务相关性
        business_terms = ["steel", "structure", "building", "fabrication", "import", "china", "cost", "design", "installation", "coating", "quality", "supplier", "shipping", "container"]
        for term in business_terms:
            if term in keyword_lower:
                score += 10
        
        # 搜索意图类型加分
        intent_bonus = {
            "how to": 15,
            "what is": 12,
            "guide": 15,
            "cost": 18,
            "price": 15,
            "vs": 12,
            "mistakes": 18,
            "tips": 12,
            "checklist": 15,
            "import": 15,
            "from china": 15,
            "design": 10,
            "installation": 12,
            "coating": 10,
            "corrosion": 12,
            "welding": 10,
            "drawing": 12,
            "specification": 10,
            "quality": 10,
            "supplier": 12,
            "manufacturer": 10,
            "shipping": 10,
            "container": 10,
            "lifespan": 12,
            "durability": 12,
            "maintenance": 10,
            "foundation": 10,
            "load": 8,
            "standard": 8,
            "certification": 10
        }
        for intent, bonus in intent_bonus.items():
            if intent in keyword_lower:
                score += bonus
        
        # 长尾词加分（更具体，竞争更小）
        word_count = len(keyword.split())
        if word_count >= 5:
            score += 15
        elif word_count >= 4:
            score += 10
        elif word_count >= 3:
            score += 5
        
        # 已发布主题去重（大幅减分）
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
                    score -= 50   # 中度重复，减分
        
        return score
