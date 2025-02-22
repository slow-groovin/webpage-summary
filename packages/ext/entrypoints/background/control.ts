import { onMessage } from "@/messaging";
import { sleep, random } from "radash";
import { browser } from "wxt/browser";
import { storage } from "wxt/storage";



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

