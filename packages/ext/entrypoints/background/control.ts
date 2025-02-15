import { onMessage } from "@/messaging";
import { sleep, random } from "radash";
import { browser } from "wxt/browser";
import { storage } from "wxt/storage";



export function registerControlMessages(){
  onMessage('openOptionPage',async (msg)=>{
		console.debug('[openOptionPage]',msg.data)
		return browser.tabs.create({url:msg.data})
	})
}
