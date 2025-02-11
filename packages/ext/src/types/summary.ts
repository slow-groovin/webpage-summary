import {z} from 'zod'
export type SummaryInput = {
  /**
   * user language
   */
  spokenLanguage: string,
  /**
   * user expected max summary result length
   */
  maxLength: number,

  /**
   * mix of @mozilla/readability parsed all fields(except `content`)
   */
  article: string,


  /**
   * @mozilla/readability parsed field: articleUrl
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
   * @mozilla/readability parsed field: textContent
   */
  textContent?: string,
  /**
   * @mozilla/readability parsed field: title
   */
  title?: string
}
export const SummaryInputSchema:z.ZodType<Pick<Partial<SummaryInput>,'spokenLanguage'|'maxLength'|'article'>>=z.object({
  spokenLanguage:z.string().default('english'),
  maxLength: z.number().default(1000),
  article: z.string(),
})