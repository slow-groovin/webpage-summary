export type ModelPreset={
  providerType:string,
  icon?:string,
  defaultApiBase?:string,
  defaultModelNames?:string[]
}
export const modelProviderPresets: Record<string, ModelPreset> = {
  'openai-compitable': { providerType: 'openai-compitable', icon: '/llm-icons/openai.svg' },
  'openai': { providerType: 'openai', defaultApiBase:'https://openai.ai/api/v1', defaultModelNames: ['gpt-4o-mini', 'gpt-3.5-turbo'], icon: '/llm-icons/openai.svg' },
  'openrouter': { providerType: 'openrouter', defaultApiBase: '', icon: '/llm-icons/openrouter.svg' },
  'siliconflow': { providerType: 'siliconflow', defaultApiBase: '', icon: '/llm-icons/siliconflow.svg' },
  'deepseek': { providerType: 'deepseek', defaultApiBase: 'https://api.deepseek.com/v1/', icon: '/llm-icons/deepseek.svg' },
};
