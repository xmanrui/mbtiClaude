---
name: mbticlaude
description: 通过分析用户在多个 AI 工具中的提示词来推测 MBTI 性格类型
version: 1.0.0
author: xmr
tags: [mbti, personality, analysis, prompts]
---

# MBTIClaude

通过分析用户在多个 AI 工具（Claude Code、Codex、Gemini、OpenCode、OpenClaw）中的提示词来推测 MBTI 性格类型。

## 功能

- 自动提取五种 AI 工具的用户提示词历史
- 分析沟通风格、信息处理方式、决策模式和生活方式
- 基于行为模式推测 MBTI 类型
- 提供详细的特征分析和建议

## 使用方法

```bash
/mbticlaude
```

## 分析维度

### 1. 沟通风格 (E vs I)
- 提示词长度和详细程度
- 社交性表达 vs 任务导向
- 背景说明的丰富程度

### 2. 信息处理 (S vs N)
- 关注具体细节 vs 抽象概念
- 实现导向 vs 概念导向
- 创造性思维的体现

### 3. 决策方式 (T vs F)
- 逻辑性 vs 情感性
- 任务导向 vs 人际关系考虑
- 技术语言 vs 情感表达

### 4. 生活方式 (J vs P)
- 计划性 vs 灵活性
- 结构化 vs 探索性
- 快速迭代 vs 系统规划

## 数据来源

- **Claude Code**: `~/.claude/history.jsonl`
- **Codex**: `~/.codex/history.jsonl`
- **Gemini**: `~/.gemini/tmp/*/chats/*.json`
- **OpenCode**: `~/.local/state/opencode/prompt-history.jsonl`
- **OpenClaw**: `~/.openclaw/agents/*/sessions/*.jsonl`

## 注意事项

⚠️ **重要提醒：**
1. 样本基于工作场景，可能不反映真实性格
2. MBTI 本身科学性存疑，仅供参考
3. 这是基于行为模式的推测，非专业心理测评
4. 需要足够的历史数据才能得出较准确的结论

## 实现

```python
#!/usr/bin/env python3
import json
import os
from pathlib import Path
from collections import Counter

def extract_claude_code_prompts(limit=100):
    """提取 Claude Code 用户提示词"""
    history_file = Path.home() / ".claude" / "history.jsonl"
    prompts = []
    
    if history_file.exists():
        with open(history_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line)
                    if data.get('display'):
                        prompts.append(data['display'])
                except:
                    continue
    
    return prompts[-limit:] if prompts else []

def extract_codex_prompts(limit=100):
    """提取 Codex 用户提示词"""
    history_file = Path.home() / ".codex" / "history.jsonl"
    prompts = []
    
    if history_file.exists():
        with open(history_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line)
                    if data.get('text'):
                        prompts.append(data['text'])
                except:
                    continue
    
    return prompts[-limit:] if prompts else []

def extract_gemini_prompts(limit=100):
    """提取 Gemini 用户提示词"""
    gemini_dir = Path.home() / ".gemini" / "tmp"
    prompts = []
    
    if gemini_dir.exists():
        for session_file in gemini_dir.rglob("session-*.json"):
            try:
                with open(session_file, 'r') as f:
                    data = json.load(f)
                    messages = data.get('messages', [])
                    for msg in messages:
                        if msg.get('role') == 'user':
                            content = msg.get('content', '')
                            if content:
                                prompts.append(content)
            except:
                continue
    
    return prompts[-limit:] if prompts else []

def extract_opencode_prompts(limit=100):
    """提取 OpenCode 用户提示词"""
    history_file = Path.home() / ".local" / "state" / "opencode" / "prompt-history.jsonl"
    prompts = []
    
    if history_file.exists():
        with open(history_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line)
                    if data.get('input'):
                        prompts.append(data['input'])
                except:
                    continue
    
    return prompts[-limit:] if prompts else []

def extract_openclaw_prompts(limit=100):
    """提取 OpenClaw 用户提示词"""
    agents_dir = Path.home() / ".openclaw" / "agents"
    prompts = []
    
    if agents_dir.exists():
        for session_file in agents_dir.rglob("*.jsonl"):
            try:
                with open(session_file, 'r') as f:
                    for line in f:
                        try:
                            data = json.loads(line)
                            if data.get('type') == 'message' and data.get('message', {}).get('role') == 'user':
                                content = data['message'].get('content', [])
                                for item in content:
                                    if item.get('type') == 'text':
                                        text = item.get('text', '')
                                        # 过滤系统消息
                                        if not any(x in text for x in ['Sender (untrusted', 'Conversation info', 
                                                                       'Health check', 'Queued', 'Continue where',
                                                                       'subagent task', 'Pre-compaction']):
                                            prompts.append(text)
                        except:
                            continue
            except:
                continue
    
    return prompts[-limit:] if prompts else []

def analyze_communication_style(prompts):
    """分析沟通风格 (E vs I)"""
    avg_length = sum(len(p) for p in prompts) / len(prompts) if prompts else 0
    short_prompts = sum(1 for p in prompts if len(p) < 20)
    
    # 简短指令占比高 -> I
    short_ratio = short_prompts / len(prompts) if prompts else 0
    
    return "I" if short_ratio > 0.3 or avg_length < 50 else "E"

def analyze_information_processing(prompts):
    """分析信息处理 (S vs N)"""
    abstract_keywords = ['概念', '系统', '架构', '方案', '思路', '含屎量', '边际', '抽象']
    concrete_keywords = ['具体', '实现', '细节', 'emoji', '间距', '颜色', '按钮']
    
    abstract_count = sum(1 for p in prompts for kw in abstract_keywords if kw in p)
    concrete_count = sum(1 for p in prompts for kw in concrete_keywords if kw in p)
    
    # 抽象概念多 -> N
    return "N" if abstract_count > concrete_count else "S"

def analyze_decision_making(prompts):
    """分析决策方式 (T vs F)"""
    logical_keywords = ['优化', '效率', '性能', '统计', '分析', '测试', '修复', '实现']
    emotional_keywords = ['感觉', '喜欢', '希望', '想要', '谢谢', '辛苦']
    
    logical_count = sum(1 for p in prompts for kw in logical_keywords if kw in p)
    emotional_count = sum(1 for p in prompts for kw in emotional_keywords if kw in p)
    
    # 逻辑性强 -> T
    return "T" if logical_count > emotional_count * 2 else "F"

def analyze_lifestyle(prompts):
    """分析生活方式 (J vs P)"""
    planning_keywords = ['计划', '方案', '设计', 'PRD', '文档', '规划']
    flexible_keywords = ['试试', '测试', '优化', '调整', '改', '换']
    
    planning_count = sum(1 for p in prompts for kw in planning_keywords if kw in p)
    flexible_count = sum(1 for p in prompts for kw in flexible_keywords if kw in p)
    
    # 灵活性强 -> P
    return "P" if flexible_count > planning_count else "J"

def analyze_mbti():
    """主函数：分析 MBTI"""
    print("🔍 正在提取用户提示词...")
    
    # 提取所有工具的提示词
    claude_prompts = extract_claude_code_prompts()
    codex_prompts = extract_codex_prompts()
    gemini_prompts = extract_gemini_prompts()
    opencode_prompts = extract_opencode_prompts()
    openclaw_prompts = extract_openclaw_prompts()
    
    # 统计
    print(f"\n📊 数据统计：")
    print(f"  Claude Code: {len(claude_prompts)} 条")
    print(f"  Codex: {len(codex_prompts)} 条")
    print(f"  Gemini: {len(gemini_prompts)} 条")
    print(f"  OpenCode: {len(opencode_prompts)} 条")
    print(f"  OpenClaw: {len(openclaw_prompts)} 条")
    
    all_prompts = claude_prompts + codex_prompts + gemini_prompts + opencode_prompts + openclaw_prompts
    total = len(all_prompts)
    
    print(f"  总计: {total} 条\n")
    
    if total < 10:
        print("⚠️  数据量太少，无法进行准确分析")
        return
    
    # 分析四个维度
    print("🧠 正在分析 MBTI 维度...\n")
    
    e_or_i = analyze_communication_style(all_prompts)
    s_or_n = analyze_information_processing(all_prompts)
    t_or_f = analyze_decision_making(all_prompts)
    j_or_p = analyze_lifestyle(all_prompts)
    
    mbti_type = f"{e_or_i}{s_or_n}{t_or_f}{j_or_p}"
    
    # 输出结果
    print("=" * 50)
    print(f"🎯 你的 MBTI 类型：{mbti_type}")
    print("=" * 50)
    
    mbti_names = {
        "INTJ": "建筑师", "INTP": "逻辑学家", "ENTJ": "指挥官", "ENTP": "辩论家",
        "INFJ": "提倡者", "INFP": "调停者", "ENFJ": "主人公", "ENFP": "竞选者",
        "ISTJ": "物流师", "ISFJ": "守卫者", "ESTJ": "总经理", "ESFJ": "执政官",
        "ISTP": "鉴赏家", "ISFP": "探险家", "ESTP": "企业家", "ESFP": "表演者"
    }
    
    print(f"\n类型名称：{mbti_names.get(mbti_type, '未知')}\n")
    
    print("📋 维度分析：")
    print(f"  {e_or_i} - {'内向' if e_or_i == 'I' else '外向'}：简洁高效沟通" if e_or_i == 'I' else f"  {e_or_i} - 外向：详细表达")
    print(f"  {s_or_n} - {'直觉' if s_or_n == 'N' else '感觉'}：{'抽象思维，系统化方案' if s_or_n == 'N' else '关注具体细节'}")
    print(f"  {t_or_f} - {'思考' if t_or_f == 'T' else '情感'}：{'纯理性，关注效率' if t_or_f == 'T' else '考虑情感因素'}")
    print(f"  {j_or_p} - {'判断' if j_or_p == 'J' else '知觉'}：{'计划性强' if j_or_p == 'J' else '灵活探索，快速迭代'}")
    
    print("\n⚠️  重要提醒：")
    print("  1. 基于工作场景的行为推测，可能不反映真实性格")
    print("  2. MBTI 本身科学性存疑，仅供参考")
    print("  3. 这是基于行为模式的推测，非专业心理测评")

if __name__ == "__main__":
    analyze_mbti()
```

## 示例输出

```
🔍 正在提取用户提示词...

📊 数据统计：
  Claude Code: 100 条
  Codex: 100 条
  Gemini: 62 条
  OpenCode: 2 条
  OpenClaw: 100 条
  总计: 364 条

🧠 正在分析 MBTI 维度...

==================================================
🎯 你的 MBTI 类型：INTP
==================================================

类型名称：逻辑学家

📋 维度分析：
  I - 内向：简洁高效沟通
  N - 直觉：抽象思维，系统化方案
  T - 思考：纯理性，关注效率
  P - 知觉：灵活探索，快速迭代

⚠️  重要提醒：
  1. 基于工作场景的行为推测，可能不反映真实性格
  2. MBTI 本身科学性存疑，仅供参考
  3. 这是基于行为模式的推测，非专业心理测评
```

## 许可证

MIT
