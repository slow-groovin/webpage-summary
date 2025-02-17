import { onMessage } from "@/messaging";
import { sleep, random } from "radash";
import { browser } from "wxt/browser";
import { storage } from "wxt/storage";

export function registerConfigCenterMessages() {
  onMessage('getGlobalConfig', async (message) => {
    const key = message.data
    return await storage.getItem<string>(`local:${key}`)
  })


}

