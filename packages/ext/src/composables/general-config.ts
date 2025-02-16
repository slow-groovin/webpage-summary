import { storage } from "wxt/storage";
import { MAX_LENGTH_KEY, SPOKEN_LANG_KEY } from "../constants/storage-key";
import useWxtStorage from "./useWxtStorage";

/**
 * get all general configs value
 * @returns 
 */
async function getAllExtConfigs() {
  const result = await storage.getItems([
    { key: SPOKEN_LANG_KEY, fallback: 'en' },
    { key: MAX_LENGTH_KEY, fallback: 8192 }
  ]);

  return {
    spokenLanguage: result[0].value as string,
    maxLength: result[1].value as number
  }
}
export function useGeneralConfig(){
  return {getAllExtConfigs}
}