import { usePromptConfigStorage } from "@/src/composables/prompt";
import { presetPrompts } from "@/src/presets/prompts";
import { browser, Browser } from "wxt/browser";
import { storage } from "#imports";

export function onInstallHook(detail: Browser.runtime.InstalledDetails) {
  addDefaultPrompt()
  openWelcomeOnFirstInstall()
}


async function addDefaultPrompt() {
  const { createItem, listItem } = usePromptConfigStorage()
  listItem().then((res) => {
    if (res.length === 0) {
      const [sys, user] = presetPrompts['basic']
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


async function openWelcomeOnFirstInstall() {
  const isFirstInstall = !(await storage.getItem('local:is-first-install'))
  if (isFirstInstall) {
    storage.setItem('local:is-first-install', true)
    browser.tabs.create({ url: '/options.html#/welcome' })
  }


}