import { onMounted } from "vue"
import { USER_CUSTOM_CSS_VAR_PREFIX } from "../constants/inject-key"

/**
 * scroll to by id
 * @param id
 */
export function scrollToId(id: string) {
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } else {
    const shadowElement = document.querySelector('webpage-summary')?.shadowRoot?.getElementById(id)
    if (shadowElement)
      shadowElement.scrollIntoView({ behavior: 'smooth' })
  }
}

export function getLineHeightOfElement(e: HTMLElement): number {
  // 获取字体样式
  const style = window.getComputedStyle(e);

  // 获取字体大小和行高
  const fontSize = parseFloat(style.fontSize);
  const lineHeight = parseFloat(style.lineHeight);

  // 如果行高没有明确设置，通常会等于字体大小
  const effectiveLineHeight = lineHeight ? lineHeight : fontSize;
  return effectiveLineHeight
}

export async function getShadowRootAsync(): Promise<ShadowRoot> {
  const root = document.querySelector('webpage-summary')?.shadowRoot
  if (root) {
    return Promise.resolve(root)
  }
  return new Promise((resolve, reject) => {
    onMounted(() => {
      const root = document.querySelector('webpage-summary')?.shadowRoot
      if (root) {
        resolve(root)
      } else {
        reject('cannot get shadow root, \'document.querySelector(\'webpage-summary\')?.shadowRoot\` returns null ')
      }
    })
  })
}

export function injectUserSettingCssVariables(cssVariableText: string) {
  const validText = filterValidCssVariableText(cssVariableText)
  injectCssIntoShadowRoot(`
html, :host {
  ${validText}
}`)
}

export function injectCssIntoShadowRoot(css: string) {
  getShadowRootAsync().then(root => {
    const style = document.createElement('style');
    style.innerHTML =css;
    root.querySelector('head')?.append(style)
  })
}

/**
 * for filter user-custom css variables text, filter out line without valid prefix
 * @param cssVariableText 
 * @returns 
 */
export function filterValidCssVariableText(cssVariableText: string) {
  return cssVariableText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith(USER_CUSTOM_CSS_VAR_PREFIX) && line.endsWith(';'))
    .join('\n')
}

/**
 * listener for SPA route change
 * set a delay of 1000ms to trigger callback, because that on pathname changed, documents may have not been rendered completely, 
 * 1000ms as a threshold will not 100% solve the problem, the complete time depends on Framework and network, 
 * because there is noway to perfectly listen the SPA rerendere done, this is a compromise solution.
 * @param callback 
 */
export function onSpaRouteChange(callback: Function) {
  let pathname = window.location.pathname

  function detectChange() {
    let curPathname = window.location.pathname
    if (curPathname !== pathname) {
      pathname = curPathname
      callback()
    }
  }


  // // 监听 DOM 变化
  const observer = new MutationObserver(() => {
    /**
     * 
     */
    setTimeout(() => {
      detectChange()
    }, 1000)
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return { disconnect: () => observer.disconnect() }
}


export async  function writeTextToClipboard(text: string) {
  if(navigator.clipboard)
    await navigator.clipboard.writeText(text)
  else{
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}