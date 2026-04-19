# MBTIClaude

通过分析用户在多个 AI 工具（Claude Code、Codex、Gemini、OpenCode、OpenClaw） 的提示词来推测 MBTI 性格类型。

## 简介

MBTIClaude 是一个创新的 MBTI 性格分析工具，它不依赖传统的问卷测试，而是通过分析你在日常使用 AI 工具时的提示词模式来推测你的 MBTI 性格类型。

## 特性

- 🔍 **多工具支持**：支持分析 Claude Code、Codex、Gemini、OpenCode、OpenClaw 五种 AI 工具的历史数据
- 🧠 **智能分析**：基于四个 MBTI 维度进行深度行为模式分析
- 📊 **详细报告**：提供完整的数据统计和维度分析结果
- 🚀 **即开即用**：无需配置，自动提取本地历史数据

## 支持的 AI 工具

| 工具 | 数据路径 | 说明 |
|------|---------|------|
| Claude Code | `~/.claude/history.jsonl` | Claude 官方 CLI 工具 |
| Codex | `~/.codex/history.jsonl` | OpenAI Codex CLI |
| Gemini | `~/.gemini/tmp/*/chats/*.json` | Google Gemini CLI |
| OpenCode | `~/.local/state/opencode/prompt-history.jsonl` | OpenCode 工具 |
| OpenClaw | `~/.openclaw/agents/*/sessions/*.jsonl` | OpenClaw 多 agent 系统 |

## 安装

### 方法一：使用 npx（推荐）

```bash
# 一键安装
npx mbticlaude

# 查看帮助
npx mbticlaude --help

# 查看版本
npx mbticlaude --version
```

### 方法二：从 GitHub 安装

```bash
# 使用 curl
curl -fsSL https://raw.githubusercontent.com/xmanrui/mbtiClaude/main/mbticlaude.md -o ~/.claude/skills/mbticlaude.md

# 或使用 git clone
git clone https://github.com/xmanrui/mbtiClaude.git /tmp/mbtiClaude
cp /tmp/mbtiClaude/mbticlaude.md ~/.claude/skills/
rm -rf /tmp/mbtiClaude
```

### 方法三：手动安装

```bash
# 复制 skill 文件到 Claude Code skills 目录
cp mbticlaude.md ~/.claude/skills/

# 或者创建符号链接
ln -s $(pwd)/mbticlaude.md ~/.claude/skills/mbticlaude.md
```

## 使用方法

### 在 Claude Code 中使用

```bash
/mbticlaude
```

### 直接运行

```bash
python3 mbti_analyzer.py
```

## 分析维度

MBTIClaude 基于以下四个维度分析你的 MBTI 类型：

### 1. 沟通风格 (E vs I)
- **E (外向)**：提示词详细、包含背景说明、倾向于长篇表达
- **I (内向)**：提示词简洁、任务导向、直接指令

**分析指标：**
- 平均提示词长度
- 简短指令（<20字符）占比
- 社交性表达频率

### 2. 信息处理 (S vs N)
- **S (感觉)**：关注具体细节、实现步骤、可见的结果
- **N (直觉)**：关注抽象概念、系统架构、创新思路

**分析指标：**
- 抽象概念关键词频率（概念、系统、架构、方案）
- 具体细节关键词频率（具体、实现、细节、按钮）

### 3. 决策方式 (T vs F)
- **T (思考)**：逻辑导向、关注效率、技术语言
- **F (情感)**：情感导向、考虑人际关系、情感表达

**分析指标：**
- 逻辑性关键词频率（优化、效率、性能、分析）
- 情感性关键词频率（感觉、喜欢、希望、谢谢）

### 4. 生活方式 (J vs P)
- **J (判断)**：计划性强、结构化、系统规划
- **P (知觉)**：灵活性强、探索性、快速迭代

**分析指标：**
- 计划性关键词频率（计划、方案、设计、PRD）
- 灵活性关键词频率（试试、测试、优化、调整）

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

## MBTI 类型说明

| 类型 | 名称 | 特征 |
|------|------|------|
| INTJ | 建筑师 | 战略思维、独立、追求完美 |
| INTP | 逻辑学家 | 创新思维、理性分析、灵活探索 |
| ENTJ | 指挥官 | 领导力强、果断、目标导向 |
| ENTP | 辩论家 | 善于辩论、创新、挑战传统 |
| INFJ | 提倡者 | 理想主义、洞察力强、关心他人 |
| INFP | 调停者 | 价值观驱动、创造力、同理心 |
| ENFJ | 主人公 | 魅力领袖、善于激励、关注成长 |
| ENFP | 竞选者 | 热情洋溢、创造力、社交能力强 |
| ISTJ | 物流师 | 可靠、务实、注重细节 |
| ISFJ | 守卫者 | 忠诚、细心、乐于助人 |
| ESTJ | 总经理 | 组织能力强、务实、传统 |
| ESFJ | 执政官 | 热心、合作、关注和谐 |
| ISTP | 鉴赏家 | 实践能力强、灵活、冷静 |
| ISFP | 探险家 | 艺术气质、灵活、温和 |
| ESTP | 企业家 | 行动派、适应力强、善于应变 |
| ESFP | 表演者 | 活力四射、享受当下、社交达人 |

## 工作原理

1. **数据提取**：从本地 AI 工具的历史记录中提取用户提示词
2. **数据清洗**：过滤系统消息、元数据等非用户输入内容
3. **特征分析**：基于关键词频率、提示词长度等指标分析行为模式
4. **类型推测**：根据四个维度的分析结果推测 MBTI 类型
5. **结果展示**：生成详细的分析报告

## 注意事项

⚠️ **重要提醒：**

1. **场景局限性**：分析基于工作场景下的 AI 工具使用行为，可能不完全反映真实性格
2. **科学性争议**：MBTI 本身在心理学界存在争议，结果仅供参考
3. **非专业测评**：这是基于行为模式的推测，不能替代专业心理测评
4. **数据要求**：需要足够的历史数据（建议至少 50 条提示词）才能得出较准确的结论
5. **隐私保护**：所有分析在本地进行，不会上传任何数据

## 技术栈

- Python 3.x
- JSON 数据处理
- 自然语言分析
- 行为模式识别

## 贡献

欢迎提交 Issue 和 Pull Request！

### 改进方向

- [ ] 支持更多 AI 工具
- [ ] 优化分析算法
- [ ] 增加更多分析维度
- [ ] 提供可视化报告
- [ ] 支持多语言分析

## 许可证

MIT License

## 致谢

感谢所有 AI 工具开发者为我们提供了强大的工具，让这个项目成为可能。

---

**Made with ❤️ by xmr**
