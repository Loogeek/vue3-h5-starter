#!/usr/bin/env node

const userAgent = process.env.npm_config_user_agent ?? '';
const userAgentPackageManager = userAgent.split(' ')[0]?.split('/')[0] ?? '';
const execPath = process.env.npm_execpath ?? '';
const execPathLower = execPath.toLowerCase();
const execPathPackageManager = execPathLower.includes('pnpm')
  ? 'pnpm'
  : execPathLower.includes('yarn')
    ? 'yarn'
    : execPathLower.includes('npm')
      ? 'npm'
      : '';
const packageManager = userAgentPackageManager || execPathPackageManager;

if (packageManager === 'pnpm') {
  process.exit(0);
}

console.error('\n当前项目只允许使用 pnpm。');
console.error('请不要使用 npm 或 yarn。\n');
console.error('请改用：');
console.error('  pnpm install');
console.error('  pnpm add <包名>\n');

process.exit(1);
