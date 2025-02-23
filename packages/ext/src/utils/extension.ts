import { sendMessage } from "@/messaging"
import { browser, Tabs } from "wxt/browser"

export async function activePageAndInvokeSummary(tab:Tabs.Tab) {
  if(!tab.id) return
  //1. query if shadow-root exists.
  const isExist = await browser.scripting.executeScript({
    target: { tabId: tab.id },
    args: [tab.id],
    func: () => {
      console.log('[webpage-summary][mannual trigger activeTab]', !!document.querySelector('webpage-summary')?.shadowRoot)
      return !!document.querySelector('webpage-summary')?.shadowRoot
    }
  })
  //2. inject content.js if not exist
  if (isExist[0].result === false) {
    await browser.scripting.executeScript({
      files: [ "content-scripts/page.js"],
      target: { tabId: tab.id },
    })
  }

  //3.
  sendMessage('invokeSummary', undefined, { tabId: tab.id! })
}

export function t(messageName:Parameters<typeof browser.i18n.getMessage>[0]){
  return browser.i18n.getMessage(messageName)
}