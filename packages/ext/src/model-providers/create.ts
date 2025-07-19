import { createOpenAI } from "@ai-sdk/openai";

import { createAnthropic } from "@ai-sdk/anthropic";
import { createCohere } from "@ai-sdk/cohere";
import { createDeepInfra } from "@ai-sdk/deepinfra";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import {
  createOpenAICompatible,
  type OpenAICompatibleProvider,
} from "@ai-sdk/openai-compatible";
import { createPerplexity } from "@ai-sdk/perplexity";
import { type ProviderV1 } from "@ai-sdk/provider";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { createXai } from "@ai-sdk/xai";
import {
  createOpenRouter,
  OpenRouterProvider
} from "@openrouter/ai-sdk-provider";
import { Provider } from "ai";
import { createMoonshotWebProvider } from "moonshot-web-ai-provider";
import { createOllama } from "ollama-ai-provider";
import { modelProviderPresets, ProviderKey } from "../presets/model-providers";
import { ModelConfigItem } from "../types/config/model";
type Options = {
  /**
    Base URL for the OpenAI API calls.
  */
  baseURL?: string;
  /**
  API key for authenticating requests.
  */
  apiKey?: string;
};
export const providerMap: Record<
  ProviderKey,
  (
    opts: Options
  ) => Provider | ProviderV1 | OpenRouterProvider | OpenAICompatibleProvider
> = {
  openai: createOpenAI,
  "openai-compitable": createOpenAI,
  deepseek: createDeepSeek,
  openrouter: createOpenRouter,
  anthropic: createAnthropicWrapper,
  mistral: createMistral,
  perplexity: createPerplexity,
  xAI: createXai,
  "together.ai": createTogetherAI,
  cohere: createCohere,
  deepinfra: createDeepInfra,
  "google-generative": createGoogleGenerativeAI,
  "lm-studio": createOpenAICompatibleWrapper(),
  siliconflow: createOpenAICompatibleWrapper(
    modelProviderPresets["siliconflow"].defaultApiBase
  ),
  ollama: createOllama,

  "moonshot(web)": createMoonshotWebFactory,
};

export function createVercelModel(config: ModelConfigItem) {
  const option: Options = {};

  if (config.apiKey) {
    option.apiKey = config.apiKey;
  }

  if (config.baseURL) {
    option.baseURL = config.baseURL;
  }
  const providerFactory =
    providerMap[config.providerType as keyof typeof modelProviderPresets];
  if (!providerFactory) {
    throw {
      error: `${config.providerType} is not a valid provider`,
    };
  }

  //for web ai provider
  console.log("config", config);
  if (config.use_search) {
    //@ts-ignore
    //prettier-ignore
    return providerFactory(option).languageModel(config.modelName, { use_search: config.use_search, });
  }
  return providerFactory(option).languageModel(config.modelName);
}

function createOpenAICompatibleWrapper(defaultBaseUrl?: string) {
  return (opt: Options) =>
    createOpenAICompatible({
      ...opt,
      baseURL: defaultBaseUrl ?? opt.baseURL!,
      name: "lmstudio",
    });
}

function createAnthropicWrapper(opt: Options): Provider | ProviderV1 {
  return createAnthropic({
    ...opt,
    headers: {
      "anthropic-dangerous-direct-browser-access": "true",
    },
  });
}

function createMoonshotWebFactory(opt: Options): ProviderV1 {
  return createMoonshotWebProvider();
}