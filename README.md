# vue3-h5-starter

English / [简体中文](./README.zh-CN.md)

A Vue 3 mobile H5 starter template for mobile web apps, WeChat pages, and hybrid app WebViews.

[![license](https://img.shields.io/github/license/Loogeek/vue3-h5-starter)](./LICENSE)
[![version](https://img.shields.io/github/package-json/v/Loogeek/vue3-h5-starter)](./package.json)
[![repo size](https://img.shields.io/github/repo-size/Loogeek/vue3-h5-starter)](https://github.com/Loogeek/vue3-h5-starter)
[![issues](https://img.shields.io/github/issues/Loogeek/vue3-h5-starter)](https://github.com/Loogeek/vue3-h5-starter/issues)

[Preview](https://vue3-h5-starter.netlify.app) / [Repository](https://github.com/Loogeek/vue3-h5-starter)

## Project Overview

`vue3-h5-starter` is a practical starter for building mobile H5 applications with Vue 3. It packages the usual foundation of a mobile project: routing, state management, server-state requests, mock APIs, mobile UI components, viewport adaptation, development debugging tools, and project conventions for AI-assisted coding.

The root route is also a project homepage. It can be deployed directly as a public site, while the built-in examples show common flows such as request caching, dynamic routes, scroll restoration, dark mode, icons, and development tools.

Recommended GitHub description:

> A Vue 3 mobile H5 starter template with Vite 8, Tailwind CSS v4, Vant 4, Pinia, TanStack Query, built-in examples, and AI-ready conventions.

## Features

- Vue 3.5, Vite 8, TypeScript, and pnpm
- File-based routing powered by `unplugin-vue-router`
- APIs and components auto importing
- Vant 4 mobile UI components
- Tailwind CSS v4 with `px` to `vmin` viewport adaptation
- Pinia for client state and TanStack Query for server state
- Axios wrapper, request examples, and mock API support
- Dark mode, local SVG icons, and Iconify icons
- VConsole, Vue DevTools, and Code Inspector for development
- Vitest, Vue Test Utils, and happy-dom test setup
- AI collaboration entry files for Codex, Claude Code, Cursor, and GitHub Copilot
- Homepage-style project site with built-in example entries

## Website

The homepage lives at `/` and is built from the same app source. It introduces the template, lists the stack, links to the GitHub repository, and opens the bundled examples.

Preview: <https://vue3-h5-starter.netlify.app>

The project includes `netlify.toml`, so Netlify can build it with `pnpm build` and publish `dist/`.

## Pre-packed

### UI Frameworks

- [Vant](https://vant-ui.github.io/vant/) - mobile Vue UI components
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS
- [Iconify](https://iconify.design/) - icon components
- Local SVG icon support via `vite-plugin-svg-icons`

### Plugins

- [Vue Router](https://router.vuejs.org/) with file-based routing
- [Pinia](https://pinia.vuejs.org/) for state management
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview) for server state
- [VueUse](https://vueuse.org/) composition utilities
- [vite-plugin-mock-dev-server](https://vite-plugin-mock-dev-server.netlify.app/) for local mock APIs
- `vite-plugin-vconsole`, `vite-plugin-vue-devtools`, `vite-plugin-compression`, and `@vitejs/plugin-legacy`

### Coding Style

- Vue 3 Composition API with `<script setup lang="ts">`
- ESLint auto-fix workflow
- pnpm-only install guard
- Commit hooks with Husky and Commitlint

### AI Workflow

- `AGENTS.md` - project conventions
- `CONSTITUTION.md` - safety and behavior boundaries
- `CLAUDE.md`, `.cursor/rules/project.mdc`, and `.github/copilot-instructions.md` - tool-specific entry files
- `.agents/skills` - local Vue, Router, Pinia, and Testing skills

## Try it now

> Requires Node.js 22.21.1+ and pnpm.

```bash
git clone https://github.com/Loogeek/vue3-h5-starter.git
cd vue3-h5-starter
nvm use
npm install -g pnpm
pnpm install
pnpm dev
```

## Usage

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

The build output is a static site in `dist/`. A minimal `netlify.toml` is included, so it can be deployed to Netlify as a single-page app.

### Preview

```bash
pnpm preview
```

## Built-in Examples

- `/query` - TanStack Query list/detail/create flow
- `/routes` - file-based routes and dynamic route params
- `/scroll-cache` - keep-alive list scroll restoration
- `/tools` - icons, dark mode, AI workflow, and development tools

### Checks

```bash
pnpm lint
pnpm type-check
pnpm test:run
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_PUBLIC_PATH` | Base public path for deployment |
| `VITE_BASE_API` | Default API prefix |
| `VITE_PROXY_TARGET` | Optional development proxy target for `/dev-api` |
| `VITE_CDN_DEPS` | Toggle CDN acceleration through `vite-plugin-cdn2` |

## Directory Overview

```text
src/
├── api/          # API definitions
├── components/   # Shared components
├── composables/  # Reusable composables and TanStack Query hooks
├── hooks/        # Custom hooks
├── plugins/      # App plugin setup
├── router/       # Router entry
├── store/        # Pinia stores
├── styles/       # Global styles
├── utils/        # Utilities
└── views/        # File-based route views
```

## Checklist

When using this template for a new project, update the project information first:

- Change `name`, `version`, and `description` in `package.json`
- Change the title and app metadata in `index.html`
- Update favicon and visual assets in `public/` and `src/assets/`
- Update environment variables and proxy settings
- Remove sample routes, mock data, or docs that are not needed
- Update the author information in `LICENSE`

## Notes

- Tailwind CSS v4 is designed for modern browsers. If you must support older embedded WebViews, evaluate Tailwind CSS v3 before starting.
- The mock server only runs in development mode.
- CDN acceleration is disabled by default and controlled by `VITE_CDN_DEPS`.

## License

[MIT](./LICENSE) License
