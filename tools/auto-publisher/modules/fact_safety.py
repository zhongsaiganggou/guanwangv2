#!/usr/bin/env python3
"""
事实安全检查模块
- 检查禁止的内容模式
- 检查未经确认的公司事实
- 检查固定价格、虚假承诺等
- 生成检查报告
"""

import re
import json


class FactSafetyChecker:
    """事实安全检查器"""
    
    def __init__(self, config):
        self.config = config
        safety_config = config.get("fact_safety", {})
        self.forbidden_patterns = safety_config.get("forbidden_patterns", [])
        self.allowed_company_facts = safety_config.get("allowed_company_facts", [])
        self.required_disclaimers = safety_config.get("required_disclaimers", [])
        self.compiled_patterns = [re.compile(p, re.IGNORECASE) for p in self.forbidden_patterns]
    
    def check(self, article_content, language="en"):
        """执行完整的事实安全检查"""
        results = {
            "passed": True,
            "errors": [],
            "warnings": [],
            "info": []
        }
        
        # 1. 检查禁止模式
        for pattern in self.compiled_patterns:
            matches = pattern.findall(article_content)
            if matches:
                results["errors"].append({
                    "type": "forbidden_pattern",
                    "pattern": pattern.pattern,
                    "matches": list(set(matches)),
                    "count": len(matches),
                    "severity": "high"
                })
                results["passed"] = False
        
        # 2. 检查公司事实（只允许已确认的事实）
        company_fact_patterns = [
            (r'(\d+\+?\s*years?\s*(?:of\s+)?(?:export|experience|industry))', "years_experience"),
            (r'(\d{1,3}(?:,\d{3})*\s*m²?\s*(?:production\s+base|factory|facility))', "production_base"),
            (r'(\d{1,3}(?:,\d{3})*\s*tonnes?\s*(?:annual\s+)?capacity)', "annual_capacity"),
            (r'(\d+\+?\s*(?:frontline\s+)?workers?|employees?|staff)', "workers"),
            (r'(ISO\s*\d{4})', "certification"),
            (r'(\d+\+?\s*countries?)', "countries"),
            (r'(\d+\+?\s*containers?)', "containers"),
        ]
        
        for pattern, fact_type in company_fact_patterns:
            matches = re.findall(pattern, article_content, re.IGNORECASE)
            if matches:
                # 检查是否在允许列表中
                match_text = matches[0] if isinstance(matches[0], str) else matches[0][0]
                is_allowed = any(
                    match_text.lower().replace(" ", "") in fact.lower().replace(" ", "") 
                    for fact in self.allowed_company_facts
                )
                if not is_allowed and fact_type in ["countries", "containers"]:
                    results["errors"].append({
                        "type": "unverified_company_fact",
                        "fact_type": fact_type,
                        "matches": list(set(matches)),
                        "severity": "high"
                    })
                    results["passed"] = False
                elif not is_allowed:
                    results["warnings"].append({
                        "type": "company_fact_needs_verification",
                        "fact_type": fact_type,
                        "matches": list(set(matches)),
                        "severity": "medium"
                    })
        
        # 3. 检查必要的免责声明
        for disclaimer in self.required_disclaimers:
            if disclaimer.lower() not in article_content.lower():
                results["warnings"].append({
                    "type": "missing_disclaimer",
                    "disclaimer": disclaimer[:50] + "...",
                    "severity": "low"
                })
        
        # 4. 检查虚假紧迫感
        urgency_patterns = [
            r'limited\s+time',
            r'act\s+now',
            r'hurry',
            r'don\'?t\s+miss',
            r'last\s+chance',
            r'only\s+\d+\s+(?:left|remaining|slots)',
            r'book\s+now',
            r'urgent'
        ]
        for pattern in urgency_patterns:
            if re.search(pattern, article_content, re.IGNORECASE):
                results["warnings"].append({
                    "type": "false_urgency",
                    "pattern": pattern,
                    "severity": "medium"
                })
        
        # 5. 检查绝对化用语
        absolute_patterns = [
            r'100%\s+(?:guarantee|safe|secure)',
            r'absolutely\s+(?:no|never|always)',
            r'never\s+(?:fail|rust|corrode)',
            r'best\s+in\s+the\s+(?:world|industry)',
            r'number\s+one',
            r'no\.?\s*1'
        ]
        for pattern in absolute_patterns:
            if re.search(pattern, article_content, re.IGNORECASE):
                results["errors"].append({
                    "type": "absolute_claim",
                    "pattern": pattern,
                    "severity": "high"
                })
                results["passed"] = False
        
        # 6. 检查文章长度
        word_count = len(article_content.split())
        min_words = 1500 if language == "en" else 1500
        if word_count < min_words:
            results["warnings"].append({
                "type": "short_article",
                "word_count": word_count,
                "minimum": min_words,
                "severity": "low"
            })
        
        return results
    
    def generate_report(self, results):
        """生成检查报告"""
        report = []
        report.append("=" * 60)
        report.append("事实安全检查报告")
        report.append("=" * 60)
        
        if results["passed"]:
            report.append("\n✅ 检查通过")
        else:
            report.append("\n❌ 检查未通过")
        
        if results["errors"]:
            report.append(f"\n❌ 错误 ({len(results['errors'])}):")
            for err in results["errors"]:
                report.append(f"  - [{err['severity'].upper()}] {err['type']}: {err.get('pattern', err.get('fact_type', ''))}")
                if err.get("matches"):
                    report.append(f"    匹配: {', '.join(err['matches'][:3])}")
        
        if results["warnings"]:
            report.append(f"\n⚠️  警告 ({len(results['warnings'])}):")
            for warn in results["warnings"]:
                report.append(f"  - [{warn['severity'].upper()}] {warn['type']}")
                if warn.get("matches"):
                    report.append(f"    匹配: {', '.join(warn['matches'][:3])}")
        
        if results["info"]:
            report.append(f"\nℹ️  信息 ({len(results['info'])}):")
            for info in results["info"]:
                report.append(f"  - {info}")
        
        report.append("\n" + "=" * 60)
        return "\n".join(report)
