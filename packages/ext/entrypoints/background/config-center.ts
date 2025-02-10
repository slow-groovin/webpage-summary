import { onMessage } from "@/messaging";
import { sleep, random } from "radash";
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
  browser.runtime.onConnect.addListener(function(port) {
    if(port.name !== "knockknock"){
      return
    }
    port.onMessage.addListener(async function(_msg) {
      
      await sleep(random(500,1500))
      const msg=_msg as any
      if (msg.joke === "Knock knock")
        port.postMessage({question: "Who's there?"});
      else if (msg.answer === "Madame")
        port.postMessage({question: "Madame who?"});
      else if (msg.answer === "Madame... Bovary")
        port.postMessage({question: "I don't get it."});
    });
    
  });
}
