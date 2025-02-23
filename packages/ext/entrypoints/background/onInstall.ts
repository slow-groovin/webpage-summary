import { usePromptConfigStorage } from "@/src/composables/prompt";
import { presetPrompts } from "@/src/presets/prompts";
import { activePageAndInvokeSummary, t } from "@/src/utils/extension";
import { browser, Runtime } from "wxt/browser";

export function onInstallHook(detail:Runtime.OnInstalledDetailsType){
  addDefaultPrompt()
  addContextMenus()
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

async function addContextMenus() {
  // summrize trigger
  browser.contextMenus.create({
    id: "summarize-this-page",
    title: t('summarize_this_page')+'⚡',
    contexts: ["page", "action"] // add btn to page context menu
  });

  browser.contextMenus.create({
    id: "open-setting",
    title: t('Open_Setting')+'⚙',
    contexts: [ "action"] // add btn to page context menu
  });

  //event handler for context memu click
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    console.debug('[contextMenu]onClicked, menuItemId:',info.menuItemId)
    if (info.menuItemId === "summarize-this-page" && tab) {
      activePageAndInvokeSummary(tab)
    }

    if (info.menuItemId === "open-setting" && tab) {
      browser.tabs.create({url:'/options.html#/'})
    }
  });
}