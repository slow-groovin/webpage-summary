import { usePromptConfigStorage } from "@/src/composables/prompt";
import { presetPrompts } from "@/src/presets/prompts";
import { Runtime } from "wxt/browser";

export function onInstallHook(detail:Runtime.OnInstalledDetailsType){
  addDefaultPrompt()
}


async function addDefaultPrompt() {
  const {createItem,listItem}=usePromptConfigStorage()
  listItem().then((res)=>{
    if(res.length===0){
      const [sys,user]=presetPrompts['basic']
      createItem({
        id: '',
        name: "Sample",
        systemMessage: sys.content as string,
        userMessage: user.content as string,
        at: Date.now()
      })
    }
  })
  
}