import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";
import { registerControlMessages } from "./control";
import { registerDebugMessages } from "./debug";
import { registerLLMMessages } from './llm';
import { sendMessage } from "@/messaging";
export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  registerControlMessages()
  

  registerDebugMessages()

  registerLLMMessages()
  

  browser.commands.onCommand.addListener((command,tab)=>{
    if(command==='COMMAND_INVOKE_SUMMARY' && tab?.id){
      sendMessage('invokeSummary',undefined,{tabId:tab.id})
      return 
    }
    console.log('[unhandle command]',command)
  })
  
});

