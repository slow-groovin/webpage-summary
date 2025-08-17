import '@/assets/tailwind.css';
import { createShadowRootUi } from "#imports";
import { defineContentScript } from "#imports";


// 1. Import the style
// import './style.css';
import { getUserCustomStyle } from "@/src/composables/general-config";
import { injectUserSettingCssVariables } from "@/src/utils/document";
import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
  matches: [
    '<all_urls>',
  ],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // console.log('content script loaded: page.content');
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'webpage-summary',
      position: 'inline',
      anchor: 'body',
      append: "last",
      mode: 'open',  //enable document.select('webpage-summary').shadowRoot
      inheritStyles: true,


      onMount: (container, _shadow, shadowHost) => {
        // console.log(container,_shadow,shadowHost,_shadow.ownerDocument)

        shadowHost.style.visibility = 'visible'; //force visible. Prevent some websites (such as Reddit) from using selectors to force web components to be hidden.

        // applyPageHtmlFont(_shadow,  shadowHost)
        // Define how your UI will be mounted inside the container

        //inject user-custom appearance css vars
        getUserCustomStyle().then(style => {
          injectUserSettingCssVariables(style)
        })



        const app = createApp(App);
        app.config.errorHandler = (err: any) => {
          console.error('vue err', err)
          // toast({ title: 'Error', description: err.message ,variant:'destructive'}); //don't run this line, it may affect user's browsering
        }
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


/**
 * experimental: apply host's font-family
 * @param shadowRoot 
 * @param shadowHost 
 */
function applyPageHtmlFont(shadowRoot: ShadowRoot, shadowHost: HTMLElement) {
  const pageFont = window.getComputedStyle(document.body).fontFamily;

  const style = document.createElement('style');
  style.textContent = `
    html, :host {
      font-family: ${pageFont}; /* test_j4571 */
    }
  `;
  shadowRoot.querySelector('head')?.appendChild(style);
}