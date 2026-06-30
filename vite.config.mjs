/**
 * 文件说明：Vite 构建配置，将 Lit 首页应用构建到 public 目录，保留后台静态页面
 * 作者：Codex
 * 创建时间：2026-06-30
 */
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'app',
  publicDir: false,
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      // 本地开发时把 API 请求转发给 Wrangler，前端体验接近线上部署。
      '/api': 'http://127.0.0.1:8799'
    }
  },
  build: {
    outDir: '../public',
    emptyOutDir: false,
    rollupOptions: {
      input: 'app/index.html'
    }
  }
});
