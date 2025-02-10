import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  imports: false,
  manifest: {
    name: 'webpage-summary-M',
    description: 'OSS web page summary , any llm api',
    permissions: ['storage'],
    icons: {
      // 16: '/icon/16.png',
      32: '/icon/32.png',
      48: '/icon/48.png',
      64: '/icon/64.png',
      128: '/icon/128.png',
    },
  }
});
