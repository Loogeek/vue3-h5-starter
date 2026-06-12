#!/usr/bin/env bash

set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# shellcheck disable=SC1091
. "$SCRIPT_DIR/scripts/node-check.sh"

ensure_node_env "启动"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "未检测到 pnpm，开始全局安装 pnpm..."

  if ! command -v npm >/dev/null 2>&1; then
    echo "未检测到 npm，请先安装 Node.js。" >&2
    exit 1
  fi

  npm install -g pnpm
fi

echo "执行 pnpm install..."
pnpm install

echo "执行 pnpm run dev..."
pnpm run dev
