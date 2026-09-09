#!/usr/bin/env python3
"""
GitHub发布模块
- 通过Git Data API发布文章和图片
- 路径白名单和路径穿越防护
- 自动创建commit并更新分支
"""

import base64
import json
import os
import urllib.request
import urllib.error


class GitHubPublisher:
    """GitHub发布器"""
    
    def __init__(self, config):
        self.config = config
        gh_config = config.get("github", {})
        # 优先使用环境变量中的GITHUB_TOKEN（GitHub Actions中自动提供）
        self.token = os.environ.get("GITHUB_TOKEN", gh_config.get("token", ""))
        self.repo = os.environ.get("GITHUB_REPOSITORY", gh_config.get("repo", ""))
        self.branch = gh_config.get("branch", "main")
        self.content_path_en = gh_config.get("content_path_en", "src/content/blog/en/")
        self.content_path_zh = gh_config.get("content_path_zh", "src/content/blog/zh/")
        self.image_path = gh_config.get("image_path", "public/images/blog/")
        self.api_base = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {self.token}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        }
        # 路径白名单
        self.allowed_paths = [
            self.content_path_en,
            self.content_path_zh,
            self.image_path
        ]
    
    def _api_request(self, method, endpoint, data=None):
        """执行GitHub API请求"""
        url = f"{self.api_base}{endpoint}"
        payload = json.dumps(data).encode("utf-8") if data else None
        req = urllib.request.Request(url, data=payload, headers=self.headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            error_body = e.read().decode("utf-8", errors="ignore")
            raise Exception(f"GitHub API {method} {endpoint} failed: {e.code} {error_body}")
    
    def _validate_path(self, path):
        """验证路径在白名单内，防止路径穿越"""
        # 规范化路径
        normalized = os.path.normpath(path).replace("\\", "/")
        # 检查路径穿越
        if ".." in normalized or normalized.startswith("/") or normalized.startswith("~"):
            raise ValueError(f"Path traversal detected: {path}")
        # 检查白名单
        for allowed in self.allowed_paths:
            if normalized.startswith(allowed.rstrip("/")):
                return normalized
        raise ValueError(f"Path not in allowed list: {path}. Allowed: {self.allowed_paths}")
    
    def create_blob(self, content, encoding="utf-8"):
        """创建blob"""
        if encoding == "base64":
            data = {"content": content, "encoding": "base64"}
        else:
            data = {"content": content, "encoding": "utf-8"}
        result = self._api_request("POST", f"/repos/{self.repo}/git/blobs", data)
        return result["sha"]
    
    def get_tree_sha(self):
        """获取当前分支的tree SHA"""
        ref = self._api_request("GET", f"/repos/{self.repo}/git/ref/heads/{self.branch}")
        commit_sha = ref["object"]["sha"]
        commit = self._api_request("GET", f"/repos/{self.repo}/git/commits/{commit_sha}")
        return commit["tree"]["sha"], commit_sha
    
    def create_tree(self, base_tree, tree_items):
        """创建新tree"""
        data = {"base_tree": base_tree, "tree": tree_items}
        result = self._api_request("POST", f"/repos/{self.repo}/git/trees", data)
        return result["sha"]
    
    def create_commit(self, tree, parent, message):
        """创建commit"""
        data = {"message": message, "tree": tree, "parents": [parent]}
        result = self._api_request("POST", f"/repos/{self.repo}/git/commits", data)
        return result["sha"]
    
    def update_ref(self, commit_sha):
        """更新分支引用"""
        data = {"sha": commit_sha, "force": False}
        result = self._api_request("PATCH", f"/repos/{self.repo}/git/refs/heads/{self.branch}", data)
        return result.get("object", {}).get("sha") == commit_sha
    
    def publish_articles(self, articles, images=None, commit_message=None):
        """
        发布多篇文章和图片
        articles: list of dict {path, content}
        images: list of dict {path, local_path}
        """
        if images is None:
            images = []
        
        tree_items = []
        
        # 处理图片
        for img in images:
            validated_path = self._validate_path(img["path"])
            with open(img["local_path"], "rb") as f:
                img_content = base64.b64encode(f.read()).decode("utf-8")
            blob_sha = self.create_blob(img_content, "base64")
            tree_items.append({
                "path": validated_path,
                "mode": "100644",
                "type": "blob",
                "sha": blob_sha
            })
            print(f"    图片已处理: {validated_path}")
        
        # 处理文章
        for article in articles:
            validated_path = self._validate_path(article["path"])
            blob_sha = self.create_blob(article["content"])
            tree_items.append({
                "path": validated_path,
                "mode": "100644",
                "type": "blob",
                "sha": blob_sha
            })
            print(f"    文章已处理: {validated_path}")
        
        # 创建commit
        base_tree, parent_commit = self.get_tree_sha()
        print(f"    当前HEAD: {parent_commit[:7]}")
        
        new_tree = self.create_tree(base_tree, tree_items)
        
        if not commit_message:
            titles = [a.get("title", "article") for a in articles[:2]]
            commit_message = f"Auto-publish {len(articles)} articles: {', '.join(titles)}"
        
        new_commit = self.create_commit(new_tree, parent_commit, commit_message)
        print(f"    新commit: {new_commit[:7]}")
        
        # 更新分支
        if self.update_ref(new_commit):
            print(f"    ✅ 发布成功!")
            return new_commit
        else:
            raise Exception("Failed to update branch ref")
    
    def get_published_articles(self):
        """获取已发布的文章列表（用于去重）"""
        topics = []
        for path_prefix in [self.content_path_en, self.content_path_zh]:
            try:
                contents = self._api_request("GET", f"/repos/{self.repo}/contents/{path_prefix}?ref={self.branch}")
                if isinstance(contents, list):
                    for item in contents:
                        if item["name"].endswith(".md"):
                            slug = item["name"].replace(".md", "")
                            topics.append(slug)
            except Exception as e:
                print(f"    获取已发布文章列表失败 ({path_prefix}): {e}")
        return list(set(topics))
