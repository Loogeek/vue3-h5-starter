# node-check.sh — 供其他脚本 source 使用的 Node 版本检测公共库
# 使用方式：source "$(dirname "${BASH_SOURCE[0]}")/scripts/node-check.sh"
#           ensure_node_env "启动" 或 ensure_node_env "部署"

_read_package_node_range() {
  node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync('package.json','utf8')); process.stdout.write((p.engines && p.engines.node) ? String(p.engines.node) : '');"
}

_check_node_version_with_range() {
  local current="$1"
  local range="$2"

  node - "$current" "$range" <<'NODE'
const current = process.argv[2];
const range = (process.argv[3] || '').trim();

function parseVersion(v) {
  const m = String(v).trim().replace(/^v/, '').match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2] || 0), Number(m[3] || 0)];
}

function cmp(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }
  return 0;
}

function satisfiesToken(version, token) {
  const t = token.trim();
  if (!t || t === '*') return true;

  if (t.startsWith('^')) {
    const base = parseVersion(t.slice(1));
    if (!base) return false;
    const upper = [base[0] + 1, 0, 0];
    return cmp(version, base) >= 0 && cmp(version, upper) < 0;
  }

  if (t.startsWith('~')) {
    const base = parseVersion(t.slice(1));
    if (!base) return false;
    const upper = [base[0], base[1] + 1, 0];
    return cmp(version, base) >= 0 && cmp(version, upper) < 0;
  }

  const opMatch = t.match(/^(>=|<=|>|<|=)?\s*(.+)$/);
  if (!opMatch) return false;

  const op = opMatch[1] || '=';
  const targetRaw = opMatch[2].trim();
  const target = parseVersion(targetRaw);
  if (!target) return false;

  const majorOnly = /^\d+$/.test(targetRaw.replace(/^v/, ''));
  if (majorOnly && op === '=') {
    return version[0] === target[0];
  }

  const c = cmp(version, target);
  if (op === '>=') return c >= 0;
  if (op === '<=') return c <= 0;
  if (op === '>') return c > 0;
  if (op === '<') return c < 0;
  return c === 0;
}

function satisfiesRange(version, expr) {
  if (!expr) return true;

  const orParts = expr.split('||').map((s) => s.trim()).filter(Boolean);
  if (orParts.length === 0) return true;

  return orParts.some((part) => {
    const tokens = part.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return true;
    return tokens.every((token) => satisfiesToken(version, token));
  });
}

const version = parseVersion(current);
if (!version) process.exit(2);
process.exit(satisfiesRange(version, range) ? 0 : 1);
NODE
}

# 对外入口：ensure_node_env <场景标签>
# 例：ensure_node_env "启动" 或 ensure_node_env "部署"
# 执行完毕后，环境变量 CURRENT_NODE_VERSION 和 PACKAGE_NODE_RANGE 在调用方可用
ensure_node_env() {
  local label="${1:-执行}"

  if ! command -v node >/dev/null 2>&1; then
    echo "${label}报错：未检测到 Node.js，请先安装 Node.js。" >&2
    exit 1
  fi

  CURRENT_NODE_VERSION="$(node -v)"
  CURRENT_NODE_VERSION="${CURRENT_NODE_VERSION#v}"
  PACKAGE_NODE_RANGE="$(_read_package_node_range)"

  if [ -z "$PACKAGE_NODE_RANGE" ]; then
    echo "提示：package.json 未配置 engines.node，已跳过 Node 版本范围校验。"
  else
    if ! _check_node_version_with_range "$CURRENT_NODE_VERSION" "$PACKAGE_NODE_RANGE"; then
      echo "${label}报错：Node 版本不满足 package.json 要求。当前版本 ${CURRENT_NODE_VERSION}，要求 ${PACKAGE_NODE_RANGE}。" >&2
      exit 1
    fi
    echo "Node 版本校验通过：${CURRENT_NODE_VERSION}（满足 package.json engines.node: ${PACKAGE_NODE_RANGE}）。"
  fi

  local nvm_dir="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$nvm_dir/nvm.sh" ]; then
    echo "提示：检测到 nvm，建议使用 \`nvm use\` 切换到项目所需 Node 版本。"
  else
    echo "提示：未检测到 nvm，推荐安装 nvm 以便管理多版本 Node.js：https://github.com/nvm-sh/nvm"
  fi
}
