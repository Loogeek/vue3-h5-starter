import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    keepAlive?: boolean;
    noCache?: boolean;
    hideTabbar?: boolean;
  }
}
