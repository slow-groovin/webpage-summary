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
  vite: (configEnv) => ({
    // Override config here, same as `defineConfig({ ... })`
    // inside vite.config.ts files
    build: {
      // sourcemap: true,
      rollupOptions: {
        external: (id) => {
          return (configEnv.mode === 'production' && id.includes('src/components/debug'))
        }
      }
    },
    plugins: [

    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
  }),

  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      if (wxt.config.mode === 'development') {
        // console.log('manifest',manifest)
        manifest.name = `(DEV)summary-ext (${wxt.config.browser})`;
      }
    },
  },


  manifest: {
    name: '__MSG_extStoreName__',
    description: '__MSG_extDescription__',
    // name: 'Webpage Summary',
    // description: 'Open source webpage summarize tool, via any llm api, support prompt-template/site customization.',
    default_locale: 'en',
    permissions: ['storage', 'contextMenus', 'scripting', 'activeTab'],
    icons: {
      // 16: '/icon/16.png',
      32: '/icon/32.png',
      48: '/icon/48.png',
      64: '/icon/64.png',
      128: '/icon/128.png',
    },
    commands: {
      "COMMAND_INVOKE_SUMMARY": {
        "suggested_key": {
          "default": "Alt+S",
          "mac": "Command+S"
        },
        "description": "__MSG_Commad_Open_Panel_DESC__"
      },
      "COMMAND_ADD_SELECTION": {
        "suggested_key": {
          "default": "Alt+A",
          "mac": "Command+A"
        },
        "description": "__MSG_add_selection_to_chat__"
      }
    },
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: [
          // 'content-scripts/*.map',
          'llm-icons/*'],
      },
    ],
  }
});
