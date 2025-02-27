import { onMessage } from "@/messaging";
import { activePageAndInvokeSummary, t } from "@/src/utils/extension";
import { browser } from "wxt/browser";



export function registerControlMessages(){
  onMessage('openOptionPage',async (msg)=>{
		console.debug('[openOptionPage]',msg.data)
		return browser.tabs.create({url:msg.data})
	})


	onMessage('openPopupPage',async (msg)=>{
		
		console.debug('[openPopupPage]',msg.data)
		const {query}=msg.data
		browser.action.setPopup({
			popup:'/popup.html?'+query,
		})
		browser.action.openPopup({
			windowId: msg.sender.tab?.windowId
			
		})
		
	})
}


export async function addContextMenus() {
  await browser.contextMenus.removeAll()
  // summrize trigger
  browser.contextMenus.create({
    id: "summarize-this-page",
    title: t('summarize_this_page') + '⚡',
    contexts: import.meta.env.FIREFOX ? ["page", "page_action"] : ["page", "action"]  // add btn to page context menu
  });

  browser.contextMenus.create({
    id: "open-setting",
    title: t('Open_Setting') + '⚙',
    contexts: import.meta.env.FIREFOX ? ["page_action"] : ["action"] // add btn to page context menu
  });

  //event handler for context memu click
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    console.debug('[contextMenu]onClicked, menuItemId:', info.menuItemId)
    if (info.menuItemId === "summarize-this-page" && tab) {
      activePageAndInvokeSummary(tab)
    }

    if (info.menuItemId === "open-setting") {
      browser.tabs.create({ url: '/options.html#/' })
    }
  });
}