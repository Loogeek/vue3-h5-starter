# CLAUDE.md - Claude Code 专属配置

> 项目规范以 `AGENTS.md` 为准。
> 行为边界与安全规则以 `CONSTITUTION.md` 为准。
> 本文件仅保留 Claude Code 的入口说明和少量专属补充。
>
> 最后更新：2026-04

@AGENTS.md
@CONSTITUTION.md

---

## Claude Code 专属指令

### Sub-agent 调度

根据任务类型自动选择合适的 Agent（定义见 AGENTS.md）：

- 创建组件 → `component-builder`
- 修复问题 → `bug-hunter`
- 审查代码 → `code-reviewer`
- 写文档 → `doc-writer`

### 行为准则

- 优先遵循 AGENTS.md 中定义的项目规范
- 同时遵循 CONSTITUTION.md 中定义的行为边界与安全约束
- 先澄清假设与歧义，再开始实现
- 简洁优先，避免推测性功能和过早抽象
- 先定义成功标准与验证方式，再进入多步骤实现
- 不执行超出职责范围的操作
- 不确定时询问用户确认
