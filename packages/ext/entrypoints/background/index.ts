import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";
import { registerControlMessages } from "./control";
import { registerDebugMessages } from "./debug";
import { registerLLMMessages } from './llm';
import { sendMessage } from "@/messaging";
import { onInstallHook } from "./onInstall";
import { getShadowRootAsync } from "@/src/utils/document";
import { sleep } from "radash";
import { activePageAndInvokeSummary } from "../../src/utils/extension";
export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  registerControlMessages()


  registerDebugMessages()

  registerLLMMessages()

  // command
  browser.commands.onCommand.addListener((command, tab) => {
    if (command === 'COMMAND_INVOKE_SUMMARY' && tab?.id) {
      sendMessage('invokeSummary', undefined, { tabId: tab.id })
      return
    }
    console.log('[unhandle command]', command)
  })

  //onInstall
  browser.runtime.onInstalled.addListener((d) => {
    console.log('[onInstall]')
    onInstallHook(d)
  })

  browser.contextMenus.remove('summarize-this-page')


  browser.contextMenus.create({

    id: "summarize-this-page",
    title: "Summarize this page",
    contexts: ["page", "action"] // add btn to page context menu
  });


  //event handler for context memu click
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "summarize-this-page" && tab) {
      activePageAndInvokeSummary(tab)
    }
  });
});