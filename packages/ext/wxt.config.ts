import { defineConfig } from 'wxt';
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { fileURLToPath, URL } from 'node:url'
// See https://wxt.dev/api/config.html
// console.log(`fileURLToPath(new URL('./', import.meta.url))`,fileURLToPath(new URL('./', import.meta.url)))
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  imports: false,
  vite: () => ({
    // Override config here, same as `defineConfig({ ... })`
    // inside vite.config.ts files
    plugins: [
    
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    },
    css: {
      postcss:{
        plugins:[tailwind(), autoprefixer()]
      }
    },
  }),
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
