export type ModelConfigItem = {
  /**
   * 16-bit uuid
   */
  id: string,
  /**
   * name of this config
   */
  name: string,
  /**
   * 
   */
  providerType: string,
  /**
   * model name
   */
  modelName: string,

  apiKey: string,
  baseURL?: string,

  /**
   * maximum content length webpage content, undefined means no limit
   */
  maxContentLength?: number,
  /**
   * limit max output tokens
   */
  maxTokens?:number,
  temperature?: number,
  topP?: number,
  topK?: number,
  presencePenalty?: number,
  frequencyPenalty?: number,


  inputTokenPrice?:number,
  outputTokenPrice?:number,
  priceUnit?: string,
  at: number
}