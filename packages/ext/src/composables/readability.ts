import { onMounted, ref } from "vue";
import { WebpageContent } from "../types/summary";
import { simpleParseRead } from "../utils/page-read";
import {  useGeneralConfig } from "./general-config";

export function useWebpageContent() {
  const webpageContent:WebpageContent = {
    ...simpleParseRead(),
  }
  return { webpageContent: webpageContent }
}