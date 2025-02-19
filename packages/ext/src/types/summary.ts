import { z } from 'zod'
export type WebpageContent = {
  /**
   * text Content
   */
  textContent?: string,


  /**
   * webpage URL
   */
  articleUrl?: string,

  /**
   * @mozilla/readability parsed field: byline
   */
  byline?: string,
  /**
   * @mozilla/readability parsed field: dir
   */
  dir?: string,
  /**
   * @mozilla/readability parsed field: excerpt
   */
  excerpt?: string,
  /**
   * @mozilla/readability parsed field: lang
   */
  lang?: string,
  /**
   * @mozilla/readability parsed field: length
   */
  length?: number,
  /**
   * @mozilla/readability parsed field: publishedTime
   */
  publishedTime?: string,
  /**
   * @mozilla/readability parsed field: siteName
   */
  siteName?: string,

  /**
   * @mozilla/readability parsed field: title
   */
  title?: string
}

export type SummaryInput = WebpageContent & { spokenLanguage: string }
export const SummaryInputSchema: z.ZodType<SummaryInput> = z.object({
  textContent: z.string(),
  spokenLanguage: z.string().min(2)
})

export type TokenUsage = {
  inputToken: number,
  outputToken: number,
  cost?: number,
  unit?: string
}

export type ContentTokensExceedStrategy='clip'|'exit'
