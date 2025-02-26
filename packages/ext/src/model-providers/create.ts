import { createOpenAI } from "@ai-sdk/openai"

import { createOpenRouter, openrouter, OpenRouterProvider } from "@openrouter/ai-sdk-provider"
import { ModelConfigItem } from "../types/config/model"
import { createDeepSeek, deepseek } from "@ai-sdk/deepseek"
import { Provider } from "ai"
import { type ProviderV1 } from '@ai-sdk/provider'
import { modelProviderPresets, ProviderKey } from "../presets/model-providers"
import { createAnthropic } from '@ai-sdk/anthropic'
import { createCohere } from '@ai-sdk/cohere'
import { createDeepInfra } from '@ai-sdk/deepinfra'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createMistral } from '@ai-sdk/mistral'
import { createPerplexity } from '@ai-sdk/perplexity'
import { createTogetherAI } from '@ai-sdk/togetherai'
import { createXai } from '@ai-sdk/xai'
import { createOpenAICompatible, type OpenAICompatibleProvider } from '@ai-sdk/openai-compatible'
import { createOllama } from 'ollama-ai-provider';

type Options = {
  /**
    Base URL for the OpenAI API calls.
  */
  baseURL?: string;
  /**
  API key for authenticating requests.
  */
  apiKey?: string;
}
const providerMap: Record<ProviderKey, (opts: Options) => Provider | ProviderV1 | OpenRouterProvider | OpenAICompatibleProvider> = {
  'openai': createOpenAI,
  'openai-compitable': createOpenAI,
  'deepseek': createDeepSeek,
  'openrouter': createOpenRouter,
  'anthropic': createAnthropicWrapper,
  'mistral': createMistral,
  'perplexity': createPerplexity,
  'xAI': createXai,
  'together.ai': createTogetherAI,
  'cohere': createCohere,
  'deepinfra': createDeepInfra,
  'google-generative': createGoogleGenerativeAI,
  'lm-studio': createOpenAICompatibleWrapper(),
  'siliconflow': createOpenAICompatibleWrapper(modelProviderPresets['siliconflow'].defaultApiBase),
  'ollama': createOllama,
}

export function createVercelModel(config: ModelConfigItem) {
  const option: Options = {}

  if (config.apiKey) {
    option.apiKey = config.apiKey
  }

  if (config.baseURL) {
    option.baseURL = config.baseURL
  }
  return providerMap[config.providerType as keyof typeof modelProviderPresets](option).languageModel(config.modelName)
}


function createOpenAICompatibleWrapper(defaultBaseUrl?: string) {
  return (opt: Options) => createOpenAICompatible(
    {
      ...opt,
      baseURL: defaultBaseUrl ?? opt.baseURL!,
      name: 'lmstudio'
    }
  )
}

function createAnthropicWrapper(opt: Options): Provider | ProviderV1 {
  return createAnthropic({
    ...opt,
    headers: {
      "anthropic-dangerous-direct-browser-access": "true",
    }
  })

}