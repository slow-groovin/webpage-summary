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
  getShadowRootAsync().then(root => {
    const style = document.createElement('style');
    style.innerHTML = `
html, :host {
  ${validText}
}
    `;
    root.querySelector('head')?.append(style)
  })
}

export function filterValidCssVariableText(cssVariableText: string) {
  return cssVariableText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith(USER_CUSTOM_CSS_VAR_PREFIX) && line.endsWith(';'))
    .join('\n')
}


