/**
 * 码上办事的 source 常量
 */
export const SOURCE = {
  app: 'hnymt',
  alipay: 'hnymt-alipay',
  wechat: 'hnymt-wechat'
} as const;

/**
 * Source 类型
 */
export type SourceType = (typeof SOURCE)[keyof typeof SOURCE];
