#!/usr/bin/env node

const { installSkill } = require('../install.js');

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
MBTIClaude - MBTI 性格分析工具

用法：
  npx mbticlaude              安装 skill 到 Claude Code
  npx mbticlaude --help       显示帮助信息
  npx mbticlaude --version    显示版本信息

安装后使用：
  在 Claude Code 中运行：/mbticlaude

更多信息：
  https://github.com/xmanrui/mbtiClaude
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = require('../package.json');
  console.log(`mbticlaude v${pkg.version}`);
  process.exit(0);
}

// 默认执行安装
installSkill();
