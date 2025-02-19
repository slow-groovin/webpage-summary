export type ModelConfigItem= {
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
   * maximum token count of webpage content, unit: kilo
   */
  maxTokens: number,
  at: number
}