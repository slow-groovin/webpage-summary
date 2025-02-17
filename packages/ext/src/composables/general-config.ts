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

  // console.log(result)
  return {
    spokenLanguage: result[0].value ??'cn',  //.getItems(...) has bugs: setting fallback has no effect
    
    maxLength: result[1].value ??4096  
  }
}
export function useGeneralConfig(){
  return {getAllExtConfigs}
}