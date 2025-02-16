import { onMounted, ref } from "vue";
import { SummaryInput } from "../types/summary";
import { simpleParseRead } from "../utils/page-read";
import {  useGeneralConfig } from "./general-config";

export function useWebpageContent() {
  const summaryInput = ref<SummaryInput>()
  const { getAllExtConfigs } = useGeneralConfig()
  onMounted(async () => {
    const { maxLength, spokenLanguage } = await getAllExtConfigs()

    summaryInput.value = {
      ...simpleParseRead(),
      spokenLanguage: spokenLanguage,
      maxLength: maxLength,
    }
  })
  return { summaryInput: summaryInput }
}