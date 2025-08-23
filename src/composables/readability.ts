import { WebpageContent } from "../types/summary";
import { simpleParseRead } from "../utils/page-read";


/**
 * @deprecated since SPA needs to retry parsing content, webpageContent is needed to be managed in `useSummary()` as a ref value.
 */
export function useWebpageContent() {
  const webpageContent:WebpageContent = {
    ...simpleParseRead(),
  }
  return { webpageContent: webpageContent }
}