# GitHub Copilot 项目指引

> 项目规范定义在根目录 `AGENTS.md` 中，请以 `AGENTS.md` 为准。
> 行为边界与安全规则定义在根目录 `CONSTITUTION.md` 中，请一并遵循。
> 本文件作为 GitHub Copilot 的入口指引。
>
> 最后更新：2026-04

## 规范来源

所有项目规范（技术栈、目录结构、编码规范、Agent 定义等）统一维护在 `AGENTS.md` 中。
行为约束、安全红线、需确认操作统一维护在 `CONSTITUTION.md` 中。

请在开始任何任务前，先阅读根目录的 `AGENTS.md` 和 `CONSTITUTION.md` 获取完整的项目上下文。

## 关键提示

- 必须使用 `<script setup lang="ts">` + Composition API
- 优先使用 Tailwind CSS 原子类
- 必须使用 pnpm 作为包管理器
- Vue / VueUse / Pinia / TanStack Query / Vant 等 API 已配置自动导入
- 文件路由：新页面放在 `src/views/` 对应目录下
- 先澄清假设与歧义，再开始编码
- 简洁优先，避免推测性功能和过早抽象
- 先定义成功标准与验证方式，再进入多步骤实现
- 使用中文沟通
