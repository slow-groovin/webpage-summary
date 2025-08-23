import { sendMessage } from "@/messaging"
import { sleep } from "radash"
import { browser, Tabs } from "wxt/browser"

export async function activePageAndInvokeSummary(tab:Tabs.Tab) {
  if(!tab.id) return
  //1. query if shadow-root exists.
  let shadowRootExist=false
  for(let i=0;i<5;i++){
    await sleep(100)
    const result = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      args: [tab.id],
      func: () => {
        console.log('[webpage-summary][trigger invoke summary]examine if shadowRoot exists.', !!document.querySelector('webpage-summary')?.shadowRoot)
        return !!document.querySelector('webpage-summary')?.shadowRoot
      }
    })
    shadowRootExist=result[0].result as boolean
    
    if(shadowRootExist){
      break
    }
  }
  
  //2. inject content.js if not exist
  /**
   * this will lead to a double page.js injected only in productin mode.
   * In developing mode, there is no activeTab action (with same browser), it will work ok and only inject once
   */
  // if (isExist[0].result === false) {
  //   await browser.scripting.executeScript({
  //     files: [ "content-scripts/page.js"],
  //     target: { tabId: tab.id },
  //   })
  // }

  //3.
  if(shadowRootExist){
    sendMessage('invokeSummary', undefined, { tabId: tab.id! })
  }else{
    console.error("cannot find shadowRoot, please check if the extension is enabled on this page")
  }
}

export function t(messageName:Parameters<typeof browser.i18n.getMessage>[0]){
  return browser.i18n.getMessage(messageName)
}