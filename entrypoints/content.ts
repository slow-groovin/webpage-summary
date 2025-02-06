import {defineContentScript} from "wxt/sandbox";


export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Hello content.!'+new Date().toLocaleString());
  },
});
