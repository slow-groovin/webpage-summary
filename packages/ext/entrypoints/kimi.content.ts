import { defineContentScript } from "wxt/sandbox";
import { storage } from "wxt/storage";

export default defineContentScript({
  matches: ["*://*.moonshot.cn/*"],
  main() {
    // console.log("window.localStorage", window.localStorage);
    storage.setItem(
      "local:kimi-access_token",
      window.localStorage.access_token
    );
    storage.setItem(
      "local:kimi-refresh_token",
      window.localStorage.refresh_token
    );
    console.log("set moonshot token suc.");
  },
});
