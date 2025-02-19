import { browser } from "wxt/browser";
export const DefaultConfig = {
  SPOKEN_LANG: browser.i18n.getUILanguage(),
  MAX_LENGTH: 8192,
  USER_CUSTOM_STYLE: '',
  ENABLE_TOKAN_USAGE_VIEW: true,
  ENABLE_USER_CHAT_DEFAULT: false,
  ENABLE_AUTO_BEGIN_SUMMARY: false,
  ENABLE_SUMMARY_WINDOW_DEFAULT: true,
  SUMMARY_INPUT_EXCEED_BEHAVIOUR: 'split', //'clip' 
} as const