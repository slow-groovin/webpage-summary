import { createOpenAI } from "@ai-sdk/openai";

import {
  createOpenRouter,
  openrouter,
  OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { ModelConfigItem } from "../types/config/model";
import { createDeepSeek, deepseek } from "@ai-sdk/deepseek";
import { Provider } from "ai";
import { type ProviderV1 } from "@ai-sdk/provider";
import { modelProviderPresets, ProviderKey } from "../presets/model-providers";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createCohere } from "@ai-sdk/cohere";
import { createDeepInfra } from "@ai-sdk/deepinfra";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import { createPerplexity } from "@ai-sdk/perplexity";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { createXai } from "@ai-sdk/xai";
import {
  createOpenAICompatible,
  type OpenAICompatibleProvider,
} from "@ai-sdk/openai-compatible";
import { createOllama } from "ollama-ai-provider";
import { createMoonshotWebProvider } from "moonshot-web-ai-provider";
import { createChatgptWebProvider } from "chatgpt-web-ai-provider";
import { storage } from "wxt/storage";
import { CHATGPT_ACCESS_TOKEN } from "../constants/storage-key";
import { browser } from "wxt/browser";
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
const providerMap: Record<
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
  "chatgpt(web)": createChatgptWebFactory,
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
    return providerFactory(option).languageModel(config.modelName, {use_search: config.use_search,});
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

function createChatgptWebFactory(opt: Options): ProviderV1 {
  // return createCha();

  return createChatgptWebProvider({
    accessToken: () =>
      storage.getItem<{ value: string; savedAt: number }>(CHATGPT_ACCESS_TOKEN),
    accessTokenSetter: (v) => {
      return storage.setItem(CHATGPT_ACCESS_TOKEN, {
        value: v,
        savedAt: Date.now(),
      });
    },
    //getter for oai in cookie
    async oai() {
      const deviceId = await browser.cookies.get({
        name: "Oai-Device-Id",
        url: "https://chatgpt.com/",
      });
      return {
        oaiDeviceId: deviceId?.value ?? "",
        oaiLanguage: navigator.language,
      };
    },
  });
}
