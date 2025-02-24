export type ModelPreset = {
  providerType: ProviderKey,
  icon?: string,
  defaultApiBase?: string,
  sampleModelNames?: string[] //for placeholder view
}

export type ProviderKey="openai-compitable" | "openai" | "anthropic" | "deepseek" | "google-generative" | "mistral" | "xAI" | "perplexity" | "openrouter" | "siliconflow" | "together.ai" | "cohere" | "deepinfra" | "ollama" | "lm-studio"

export const modelProviderPresets: Record<ProviderKey,ModelPreset> = {
  'openai-compitable': {
    providerType: 'openai-compitable',
    icon: '/llm-icons/openai-comp.svg'
  },
  'openai': {
    providerType: 'openai',
    defaultApiBase: 'https://openai.ai/api/v1',
    sampleModelNames: ['gpt-4o-mini', 'gpt-3.5-turbo'],
    icon: '/llm-icons/openai.svg'
  },
  'anthropic': {
    providerType: 'anthropic',
    defaultApiBase: 'https://api.anthropic.com/v1',
    sampleModelNames: ['claude-3-haiku', 'claude-3-sonnet'],
    icon: '/llm-icons/anthropic.svg'
  },
  'deepseek': {
    providerType: 'deepseek',
    defaultApiBase: 'https://api.deepseek.com/v1/',
    icon: '/llm-icons/deepseek.svg'
  },
  'google-generative': {
    providerType: 'google-generative',
    defaultApiBase: 'https://generativelanguage.googleapis.com/v1beta',
    sampleModelNames: ['gemini-1.5-pro-latest', 'gemini-2.0-flash-latest'],
    icon: '/llm-icons/google.svg'
  },
  'mistral': {
    providerType: 'mistral',
    defaultApiBase: 'https://api.mistral.ai/v1',
    sampleModelNames: ['ministral-8b-latest'],
    icon: '/llm-icons/mistral.svg'
  },
  'xAI': {
    providerType: 'xAI',
    defaultApiBase: 'https://api.x.ai/v1',
    sampleModelNames: ['grok-2-1212'],
    icon: '/llm-icons/xAI.svg'
  },

  'perplexity': {
    providerType: 'perplexity',
    defaultApiBase: 'https://api.perplexity.ai',
    icon: '/llm-icons/perplexity.svg'
  },
  'openrouter': {
    providerType: 'openrouter',
    defaultApiBase: 'https://openrouter.ai/api/v1',
    icon: '/llm-icons/openrouter.svg'
  },
  'siliconflow': {
    providerType: 'siliconflow',
    defaultApiBase: 'https://api.siliconflow.cn/v1/',
    icon: '/llm-icons/siliconflow.svg'
  },
  'together.ai': {
    providerType: 'together.ai',
    defaultApiBase: 'https://api.together.xyz/v1',
    icon: '/llm-icons/together.svg'
  },
  'cohere': {
    providerType: 'cohere',
    defaultApiBase: 'https://api.cohere.com/v2',
    icon: '/llm-icons/cohere.svg'
  },
  'deepinfra': {
    providerType: 'deepinfra',
    defaultApiBase: 'https://api.deepinfra.com/v1/openai',
    icon: '/llm-icons/deepinfra.svg'
  },
  'ollama': {
    providerType: 'ollama',
    defaultApiBase: 'http://localhost:11434/api',
    icon: '/llm-icons/ollama.svg',
    sampleModelNames: ['deepseek-r1:14b', 'qwen2.5', 'phi3']
  },
  'lm-studio': {
    providerType: 'lm-studio',
    defaultApiBase: '',
    icon: '/llm-icons/lmstudio.svg',
    sampleModelNames: ['llama-3.2-1b']
  },
} as const
