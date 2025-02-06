import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  imports: false, 
  manifest: {
    name: 'webpage-summary-M',
    description: 'OSS web page summary , any llm api',
    icons: {
			16: '/icon/16.png',
			24: '/icon/24.png',
			48: '/icon/48.png',
			96: '/icon/96.png',
			128: '/icon/128.png',
		},
  }
});
