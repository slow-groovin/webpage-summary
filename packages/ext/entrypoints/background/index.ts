import { onMessage } from "@/messaging";
import { browser } from "wxt/browser";
import {defineBackground} from "wxt/sandbox";
import { registerConfigCenterMessages } from "./config-center";
import { registerLLMMessages } from "./llm";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  registerConfigCenterMessages()
  registerLLMMessages()
  
});

