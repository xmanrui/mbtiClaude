#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_FILE = 'SKILL.md';
const CLAUDE_SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');

function installSkill() {
  console.log('🔍 正在安装 MBTIClaude skill...\n');

  // 检查 Claude skills 目录是否存在
  if (!fs.existsSync(CLAUDE_SKILLS_DIR)) {
    console.log('📁 创建 Claude skills 目录...');
    fs.mkdirSync(CLAUDE_SKILLS_DIR, { recursive: true });
  }

  // 源文件路径
  const sourceFile = path.join(__dirname, SKILL_FILE);
  const targetFile = path.join(CLAUDE_SKILLS_DIR, SKILL_FILE);

  // 检查源文件是否存在
  if (!fs.existsSync(sourceFile)) {
    console.error('❌ 错误：找不到 skill 文件');
    process.exit(1);
  }

  // 复制文件
  try {
    fs.copyFileSync(sourceFile, targetFile);
    console.log('✅ MBTIClaude skill 安装成功！\n');
    console.log(`📍 安装位置：${targetFile}\n`);
    console.log('🚀 使用方法：');
    console.log('   在 Claude Code 中运行：/mbticlaude\n');
    console.log('📖 更多信息：https://github.com/xmanrui/mbtiClaude');
  } catch (error) {
    console.error('❌ 安装失败：', error.message);
    process.exit(1);
  }
}

// 只在 postinstall 时执行
if (require.main === module) {
  installSkill();
}

module.exports = { installSkill };
