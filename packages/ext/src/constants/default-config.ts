import { browser } from "wxt/browser";
import { ENABLE_FLOATING_BALL } from "./storage-key";
export const DefaultConfig = {
  SPOKEN_LANG: browser.i18n.getUILanguage(),
  MAX_LENGTH: 8192,
  USER_CUSTOM_STYLE: '',
  ENABLE_TOKAN_USAGE_VIEW: true,
  ENABLE_USER_CHAT_DEFAULT: false,
  ENABLE_AUTO_BEGIN_SUMMARY: false,
  ENABLE_SUMMARY_WINDOW_DEFAULT: true,
  ENABLE_FLOATING_BALL: true,
  ENABLE_POPUP_CLICK_TRIGGER: false,
  SUMMARY_INPUT_EXCEED_BEHAVIOUR: 'split', //'clip' 
} as const