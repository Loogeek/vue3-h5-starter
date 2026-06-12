import { SOURCE } from '@/utils/data';

export function isValidSource(source: string | null | undefined): boolean {
  if (!source)
    return false;
  for (const key in SOURCE) {
    if (source === SOURCE[key as keyof typeof SOURCE]) {
      return true;
    }
  }
  return false;
}

/**
 * 动态加载外部脚本（阻塞式）
 */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`脚本加载失败: ${src}`));
    document.head.appendChild(script);
  });
}
