const EXTERNAL_URL_RE = /^(?:https?:|mailto:|tel:)/;

/**
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path: string) {
  return EXTERNAL_URL_RE.test(path);
}
