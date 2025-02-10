import { onMessage } from "@/messaging";
import { browser } from "wxt/browser";
import {defineBackground} from "wxt/sandbox";
import { registerConfigCenterMessages } from "./config-center";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  registerConfigCenterMessages()
  
});

