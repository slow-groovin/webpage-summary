import { storage } from "wxt/storage";
import { SPOKEN_LANG_KEY as SUMMARY_LANG_KEY, USER_CUSTOM_STYLE_KEY, ENABLE_TOKAN_USAGE_VIEW, ENABLE_USER_CHAT_DEFAULT, ENABLE_AUTO_BEGIN_SUMMARY, ENABLE_SUMMARY_WINDOW_DEFAULT, SUMMARY_INPUT_EXCEED_BEHAVIOUR, POPUP_CLICK_TRIGGER as ENABLE_POPUP_CLICK_TRIGGER, ENABLE_FLOATING_BALL, ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER, ENABLE_CREATE_NEW_PANEL_BUTTON } from "../constants/storage-key";
import useWxtStorage from "./useWxtStorage";
import { DefaultConfig } from "../constants/default-config";
import { InputContentLengthExceededStrategy } from "../types/summary";

/**
 * get all general configs value
 * @returns 
 */
async function getAllExtConfigs() {
  const result = await storage.getItems([
    { key: SUMMARY_LANG_KEY, fallback: DefaultConfig.SUMMARY_LANG },
    { key: USER_CUSTOM_STYLE_KEY, fallback: DefaultConfig.USER_CUSTOM_STYLE },
    { key: ENABLE_TOKAN_USAGE_VIEW, fallback: DefaultConfig.ENABLE_TOKAN_USAGE_VIEW },
    { key: ENABLE_USER_CHAT_DEFAULT, fallback: DefaultConfig.ENABLE_USER_CHAT_DEFAULT },
    { key: ENABLE_AUTO_BEGIN_SUMMARY, fallback: DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY },
    { key: ENABLE_SUMMARY_WINDOW_DEFAULT, fallback: DefaultConfig.ENABLE_SUMMARY_WINDOW_DEFAULT },
    { key: SUMMARY_INPUT_EXCEED_BEHAVIOUR, fallback: DefaultConfig.SUMMARY_INPUT_EXCEED_BEHAVIOUR },
    { key: ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER, fallback: DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER },

  ]);

  return {
    summaryLanguage: result[0].value as string ?? DefaultConfig.SUMMARY_LANG,  //.getItems(...) has bugs: setting fallback has no effect
    userCustomStyle: result[2].value as string ?? DefaultConfig.USER_CUSTOM_STYLE,
    enableTokanUsageView: result[3].value as boolean ?? DefaultConfig.ENABLE_TOKAN_USAGE_VIEW,
    enableUserChatDefault: result[4].value as boolean ?? DefaultConfig.ENABLE_USER_CHAT_DEFAULT,
    enableAutoBeginSummary: result[5].value as boolean ?? DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY,
    enableSummaryWindowDefault: result[6].value as boolean ?? DefaultConfig.ENABLE_SUMMARY_WINDOW_DEFAULT,
    summaryInputExceedBehaviour: result[7].value as string ?? DefaultConfig.SUMMARY_INPUT_EXCEED_BEHAVIOUR,
    enableAutoBeginSummaryByActionOrContextTrigger: result[8].value as boolean ?? DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER,
  }
}
export function useGeneralConfig() {
  return { getAllExtConfigs }
}

/**
 * Reactive summary language config.
 */
export function useSummaryLanguage() {
  const { state: summaryLanguage, ...other } = useWxtStorage(SUMMARY_LANG_KEY, DefaultConfig.SUMMARY_LANG)
  return { summaryLanguage, ...other }
}
export async function getSummaryLanguage() {
  return (await storage.getItem(SUMMARY_LANG_KEY, { fallback: DefaultConfig.SUMMARY_LANG })) || DefaultConfig.SUMMARY_LANG
}


/**
 * Reactive user custom style config.
 */
export function useUserCustomStyle() {
  const { state: userCustomStyle, ...other } = useWxtStorage<string>(USER_CUSTOM_STYLE_KEY, DefaultConfig.USER_CUSTOM_STYLE)
  return { userCustomStyle, ...other }
}
export async function getUserCustomStyle() {
  return await storage.getItem(USER_CUSTOM_STYLE_KEY, { fallback: DefaultConfig.USER_CUSTOM_STYLE })
}



/**
 * Reactive enable token usage view config.
 */
export function useEnableTokenUsageView() {
  const { state: enableTokenUsageView, ...other } = useWxtStorage(ENABLE_TOKAN_USAGE_VIEW, DefaultConfig.ENABLE_TOKAN_USAGE_VIEW)
  return { enableTokenUsageView, ...other }
}

/**
 * Reactive enable user chat default config.
 */
export function useEnableUserChatDefault() {
  const { state: enableUserChatDefault, ...other } = useWxtStorage(ENABLE_USER_CHAT_DEFAULT, DefaultConfig.ENABLE_USER_CHAT_DEFAULT)
  return { enableUserChatDefault, ...other }
}

/**
 * Reactive enable auto begin summary config.
 */
export function useEnableAutoBeginSummary() {
  const { state: enableAutoBeginSummary, ...other } = useWxtStorage(ENABLE_AUTO_BEGIN_SUMMARY, DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY)
  return { enableAutoBeginSummary, ...other }
}
export async function getEnableAutoBeginSummary() {
  return await storage.getItem(ENABLE_AUTO_BEGIN_SUMMARY, { fallback: DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY })
}

/**
 * Reactive enable summary window default config.
 */
export function useEnableSummaryWindowDefault() {
  const { state: enableSummaryWindowDefault, ...other } = useWxtStorage(ENABLE_SUMMARY_WINDOW_DEFAULT, DefaultConfig.ENABLE_SUMMARY_WINDOW_DEFAULT)
  return { enableSummaryWindowDefault, ...other }
}

export async function getEnableSummaryWindowDefault() {
  return await storage.getItem(ENABLE_SUMMARY_WINDOW_DEFAULT, { fallback: DefaultConfig.ENABLE_SUMMARY_WINDOW_DEFAULT })
}

/**
 * enable floating ball
 */
export function useEnableFloatingBall() {
  const { state: enableFloatingBall, ...other } = useWxtStorage(ENABLE_FLOATING_BALL, DefaultConfig.ENABLE_FLOATING_BALL)
  return { enableFloatingBall, ...other }
}

/**
  popup as a begin summarize trigger
 */

export function useEnablePopupClickTrigger() {
  const { state: enablePopupClickTrigger, ...other } = useWxtStorage(ENABLE_POPUP_CLICK_TRIGGER, DefaultConfig.ENABLE_POPUP_CLICK_TRIGGER)
  return { enablePopupClickTrigger, ...other }
}

export async function getEnablePopupClickTrigger() {
  return await storage.getItem(ENABLE_POPUP_CLICK_TRIGGER, { fallback: DefaultConfig.ENABLE_POPUP_CLICK_TRIGGER })
}

/**
 * Reactive summary input exceed behaviour config.
 */
export function useSummaryInputExceedBehaviour() {
  const { state: summaryInputExceedBehaviour, ...other } = useWxtStorage<InputContentLengthExceededStrategy>(SUMMARY_INPUT_EXCEED_BEHAVIOUR, DefaultConfig.SUMMARY_INPUT_EXCEED_BEHAVIOUR)
  return { summaryInputExceedBehaviour, ...other }
}

export async function getSummaryInputExceedBehaviour() {
  return await storage.getItem<InputContentLengthExceededStrategy>(SUMMARY_INPUT_EXCEED_BEHAVIOUR, { fallback: DefaultConfig.SUMMARY_INPUT_EXCEED_BEHAVIOUR })
}

/**
 * Reactive enable auto begin summary by action or context trigger config.
 */
export function useEnableAutoBeginSummaryByActionOrContextTrigger() {
  const { state: enableAutoBeginSummaryByActionOrContextTrigger, ...other } = useWxtStorage(ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER, DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER)
  return { enableAutoBeginSummaryByActionOrContextTrigger, ...other }
}
export async function getEnableAutoBeginSummaryByActionOrContextTrigger() {
  return await storage.getItem(ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER, { fallback: DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER })
}




export function useEnableCreateNewPanelButton() {
  const { state: enbaleCreateNewPanelButton, ...other } = useWxtStorage(ENABLE_CREATE_NEW_PANEL_BUTTON, DefaultConfig.ENABLE_CREATE_NEW_PANEL_BUTTON)
  return { enbaleCreateNewPanelButton, ...other }
}
export async function getEnableCreateNewPanelButton() {
  return await storage.getItem(ENABLE_CREATE_NEW_PANEL_BUTTON, { fallback: DefaultConfig.ENABLE_CREATE_NEW_PANEL_BUTTON })
}


