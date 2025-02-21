import { createOpenAI } from "@ai-sdk/openai"

import { createOpenRouter, openrouter } from "@openrouter/ai-sdk-provider"
import { ModelConfigItem } from "../types/config/model"
import { createDeepSeek } from "@ai-sdk/deepseek"
export function createVercelModel(config: ModelConfigItem) {
  const option: { apiKey?: string; baseURL?: string } = {}

  if (config.apiKey) {
    option.apiKey = config.apiKey
  }

  if (config.baseURL) {
    option.baseURL = config.baseURL
  }

  switch (config.providerType) {
    case "openai":
    case "openai-compitable":
      return createOpenAI(option).languageModel(config.modelName)
    case "deepseek":
      return createDeepSeek(option).languageModel(config.modelName)
    case "openrouter":
      return createOpenRouter(option).languageModel(config.modelName)
  }

  return createOpenAI({
    ...option,
    
  }).languageModel(config.modelName)

}
