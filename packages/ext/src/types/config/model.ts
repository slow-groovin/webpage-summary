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
  at: number
}