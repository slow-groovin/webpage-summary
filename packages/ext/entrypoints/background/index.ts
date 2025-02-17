import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";
import { registerConfigCenterMessages } from "./config-center";
import { registerControlMessages } from "./control";
import { registerDebugMessages } from "./debug";
import { registerLLMMessages } from './llm';
export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  registerControlMessages()
  registerConfigCenterMessages()
  

  registerDebugMessages()

  registerLLMMessages()
  
});

