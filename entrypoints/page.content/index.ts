import { defineContentScript } from "wxt/sandbox";
import { ContentScriptContext, createShadowRootUi } from "wxt/client";
import '@/assets/tailwind.css'


// 1. Import the style
// import './style.css';
import { createApp } from 'vue';
import App from '@/src/components/debug/ContentDebugPanel.vue';

export default defineContentScript({
  matches: [
    '*://*.example.com/*',
    '*://*.baidu.com/*',
  ],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    console.log('content script loaded: page.content');
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'webpage-summary',
      position: 'inline',
      anchor: 'body',
  		append: "last",

      onMount: (container, _shadow, shadowHost) => {
        // console.log(container,_shadow,shadowHost)
        // Define how your UI will be mounted inside the container
        const app = createApp(App);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});