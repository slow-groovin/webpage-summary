import { onMessage } from "@/messaging";
import { browser } from "wxt/browser";
import { storage } from "wxt/storage";

export function registerConfigCenterMessages(){
  registerDebugMessages()
  onMessage('getGlobalConfig', async (message)=>{
    const key=message.data
    return await storage.getItem<string>(`local:${key}`)
  })

  onMessage('getAllGlobalConfig', async ()=>{
    const items=await browser.storage.local.get(null);
    return items;
  })
}

function registerDebugMessages(){
  onMessage('getStringLength', message => {
    return message.data.length;
  });
}
