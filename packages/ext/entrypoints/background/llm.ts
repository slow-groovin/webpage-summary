import { onMessage } from "@/messaging";
import { PortListener } from "@/src/types/browser";
import { streamText } from "ai";
import { random, sleep } from "radash";
import { browser, Runtime } from "wxt/browser";
import allModels from '@/src/model-providers'


const queue: Map<string,PortListener>=new Map()
export function registerLLMMessages(){
  
  onMessage('streamText',async (message)=>{
    console.debug('[streamText]', message.data)
    const {messages,modelName,connectId}=message.data
    const model=allModels[modelName]
    const result=streamText({
      messages,
      model: model,
    })

    const newPortListener:PortListener=async (msg,port)=>{
      console.debug('[port][receive msg]',msg,connectId)
      port.onDisconnect.addListener(()=>{
        
      })
      for await (const chunk of result.textStream) {
        // console.debug('[chunk]',chunk)
        port.postMessage(chunk)
      }

      port.disconnect()

      console.log('[disconnect]',connectId)
      port.onMessage.removeListener(newPortListener)
      queue.delete(connectId)

    }

    queue.set(connectId,newPortListener)

    const {usage,finishReason,warnings}=result
    return {
      // usage: await usage,
      // finishReason: await finishReason,
      // warnings: await warnings
    }
  })


  //center
  const listener = (port:Runtime.Port) => {
    console.debug('[onConnect][listener]name:',port.name,queue.has(port.name))
    if(!queue.has(port.name)){
      return
    }
    port.onMessage.addListener(queue.get(port.name)!)
  };
  browser.runtime.onConnect.addListener(listener)
  
}