#!/usr/bin/env python3
"""
真实图片搜索模块（使用requests库）
支持多种免费图片来源：Wikimedia Commons, Unsplash, Pexels
用于替换Pillow生成的卡通占位图
"""

import os
import re
import json
import time
import random

try:
    import requests
    from requests.packages.urllib3.exceptions import InsecureRequestWarning
    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False


class ImageSearcher:
    """真实图片搜索器"""
    
    def __init__(self, config=None):
        self.config = config or {}
        self.proxy = self.config.get("system", {}).get("proxy", None)
        self.unsplash_access_key = self.config.get("image_search", {}).get("unsplash_access_key", "")
        self.pexels_api_key = self.config.get("image_search", {}).get("pexels_api_key", "")
        
        # 设置requests会话
        if HAS_REQUESTS:
            self.session = requests.Session()
            if self.proxy:
                self.session.proxies = {
                    'http': self.proxy,
                    'https': self.proxy
                }
            self.session.verify = False
            self.session.headers.update({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
        else:
            self.session = None
    
    def _make_request(self, url, timeout=15, headers=None):
        """发送HTTP请求"""
        if not HAS_REQUESTS:
            print("    requests库未安装")
            return None
        
        try:
            if headers:
                response = self.session.get(url, timeout=timeout, headers=headers)
            else:
                response = self.session.get(url, timeout=timeout)
            if response.status_code == 200:
                return response.content
            else:
                print(f"    HTTP状态码: {response.status_code}")
                return None
        except Exception as e:
            print(f"    请求失败: {e}")
            return None
    
    def search_wikimedia(self, keyword, count=5):
        """
        从Wikimedia Commons搜索图片
        免费，不需要API密钥
        """
        try:
            import urllib.parse
            search_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(keyword)}&gsrnamespace=6&gsrlimit={count}&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1200&format=json"
            
            data = self._make_request(search_url)
            if not data:
                return []
            
            result = json.loads(data)
            pages = result.get("query", {}).get("pages", {})
            
            images = []
            for page_id, page in pages.items():
                imageinfo = page.get("imageinfo", [{}])[0]
                url = imageinfo.get("thumburl") or imageinfo.get("url", "")
                mime = imageinfo.get("mime", "")
                
                # 只接受图片格式，排除SVG
                if url and mime.startswith("image/") and mime != "image/svg+xml":
                    title = page.get("title", "").replace("File:", "").replace("_", " ")
                    images.append({
                        "url": url,
                        "title": title,
                        "source": "wikimedia",
                        "width": imageinfo.get("thumbwidth", 1200),
                        "height": imageinfo.get("thumbheight", 800)
                    })
            
            return images[:count]
        except Exception as e:
            print(f"    Wikimedia搜索失败: {e}")
            return []
    
    def search_unsplash(self, keyword, count=5):
        """
        从Unsplash搜索图片
        需要API密钥（免费版每小时50次请求）
        """
        if not self.unsplash_access_key:
            return []
        
        try:
            import urllib.parse
            search_url = f"https://api.unsplash.com/search/photos?query={urllib.parse.quote(keyword)}&per_page={count}&orientation=landscape&client_id={self.unsplash_access_key}"
            
            data = self._make_request(search_url)
            if not data:
                return []
            
            result = json.loads(data)
            images = []
            
            for photo in result.get("results", []):
                images.append({
                    "url": photo["urls"]["regular"],
                    "title": photo.get("alt_description", keyword),
                    "source": "unsplash",
                    "width": photo.get("width", 1200),
                    "height": photo.get("height", 800),
                    "author": photo.get("user", {}).get("name", "")
                })
            
            return images[:count]
        except Exception as e:
            print(f"    Unsplash搜索失败: {e}")
            return []
    
    def search_pexels(self, keyword, count=5):
        """
        从Pexels搜索图片
        需要API密钥（免费版每小时200次请求）
        """
        if not self.pexels_api_key:
            return []
        
        try:
            import urllib.parse
            search_url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(keyword)}&per_page={count}&orientation=landscape"
            
            data = self._make_request(search_url, headers={'Authorization': self.pexels_api_key})
            if not data:
                return []
            
            result = json.loads(data)
            images = []
            
            for photo in result.get("photos", []):
                images.append({
                    "url": photo["src"]["large"],
                    "title": photo.get("alt", keyword),
                    "source": "pexels",
                    "width": photo.get("width", 1200),
                    "height": photo.get("height", 800),
                    "author": photo.get("photographer", "")
                })
            
            return images[:count]
        except Exception as e:
            print(f"    Pexels搜索失败: {e}")
            return []
    
    def search_images(self, keyword, count=5, prefer_sources=None):
        """
        综合搜索图片（按优先级尝试不同来源）
        """
        if prefer_sources is None:
            prefer_sources = ["unsplash", "pexels", "wikimedia"]
        
        all_images = []
        
        for source in prefer_sources:
            if source == "unsplash":
                images = self.search_unsplash(keyword, count)
            elif source == "pexels":
                images = self.search_pexels(keyword, count)
            elif source == "wikimedia":
                images = self.search_wikimedia(keyword, count)
            else:
                images = []
            
            if images:
                all_images.extend(images)
                print(f"    从{source}找到 {len(images)} 张图片")
                if len(all_images) >= count:
                    break
            
            time.sleep(0.5)
        
        # 去重（按URL）
        seen_urls = set()
        unique_images = []
        for img in all_images:
            if img["url"] not in seen_urls:
                seen_urls.add(img["url"])
                unique_images.append(img)
        
        return unique_images[:count]
    
    def download_image(self, url, output_path):
        """下载图片到本地"""
        if not HAS_REQUESTS:
            return False
        
        try:
            response = self.session.get(url, timeout=30)
            if response.status_code == 200:
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                with open(output_path, 'wb') as f:
                    f.write(response.content)
                return True
        except Exception as e:
            print(f"    下载失败: {e}")
        return False
    
    def generate_search_keywords(self, section_title, article_keyword=""):
        """
        根据段落标题生成搜索关键词
        确保不同段落搜索不同的图片
        """
        # 场景关键词映射
        scene_mapping = {
            "cost": ["steel structure cost", "steel building price", "construction budget"],
            "price": ["steel structure pricing", "steel building cost", "construction estimate"],
            "budget": ["construction budget", "steel structure cost planning", "project estimation"],
            "design": ["steel structure design", "structural engineering", "blueprint design"],
            "drawing": ["steel structure drawings", "structural blueprints", "engineering drawings"],
            "fabrication": ["steel fabrication", "steel manufacturing", "factory production"],
            "manufacturing": ["steel manufacturing facility", "factory production line", "industrial plant"],
            "welding": ["steel welding", "welding workshop", "industrial welding"],
            "quality": ["quality inspection", "steel quality control", "factory inspection"],
            "inspection": ["steel inspection", "quality control", "factory audit"],
            "coating": ["steel coating", "paint application", "corrosion protection"],
            "corrosion": ["corrosion protection", "galvanized steel", "rust prevention"],
            "installation": ["steel installation", "construction site", "building erection"],
            "erection": ["steel erection", "construction site", "crane lifting"],
            "shipping": ["steel shipping", "container loading", "port logistics"],
            "container": ["container loading", "steel transport", "shipping port"],
            "export": ["steel export", "international shipping", "cargo port"],
            "import": ["steel import", "container port", "international trade"],
            "logistics": ["steel logistics", "supply chain", "warehouse"],
            "warehouse": ["steel warehouse", "industrial building", "storage facility"],
            "workshop": ["steel workshop", "factory building", "industrial plant"],
            "factory": ["steel factory", "manufacturing plant", "industrial facility"],
            "supplier": ["steel supplier", "manufacturing facility", "factory exterior"],
            "manufacturer": ["steel manufacturer", "factory production", "industrial plant"],
            "mistakes": ["construction mistakes", "steel structure errors", "quality issues"],
            "guide": ["steel structure guide", "construction process", "industrial building"],
            "tips": ["steel construction tips", "building advice", "industrial tips"],
            "checklist": ["construction checklist", "project planning", "site inspection"],
            "comparison": ["steel comparison", "building materials", "construction options"],
            "benefits": ["steel benefits", "advantages of steel", "industrial building"],
            "process": ["steel construction process", "manufacturing steps", "production flow"],
            "requirements": ["steel requirements", "project specifications", "building standards"],
            "documents": ["steel documents", "construction paperwork", "project files"],
            "certification": ["steel certification", "ISO certificate", "quality standards"],
            "standards": ["steel standards", "building codes", "engineering norms"],
            "foundation": ["steel foundation", "concrete base", "construction site"],
            "truss": ["steel truss", "roof structure", "industrial roof"],
            "beam": ["steel beam", "structural steel", "industrial construction"],
            "column": ["steel column", "structural support", "building frame"],
            "purlin": ["steel purlin", "roof structure", "industrial building"],
            "cladding": ["steel cladding", "wall panels", "building exterior"],
            "summary": ["steel structure summary", "industrial building", "construction overview"],
            "conclusion": ["steel construction", "industrial building", "project summary"],
        }
        
        # 将标题转为小写，匹配关键词
        title_lower = section_title.lower()
        
        # 尝试匹配场景关键词
        for keyword, search_terms in scene_mapping.items():
            if keyword in title_lower:
                return random.choice(search_terms)
        
        # 如果没有匹配到，使用文章关键词
        words = re.findall(r'[a-zA-Z]+', section_title)
        if len(words) >= 2:
            search_term = " ".join(words[:3]) + " steel structure"
        else:
            search_term = article_keyword or "steel structure industrial"
        
        return search_term


# 测试
if __name__ == "__main__":
    searcher = ImageSearcher()
    
    print("测试搜索 'steel fabrication':")
    images = searcher.search_images("steel fabrication", count=3)
    for img in images:
        print(f"  - {img['source']}: {img['title'][:50]}")
        print(f"    URL: {img['url'][:80]}")
