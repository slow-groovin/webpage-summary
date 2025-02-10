import { createDeepSeek } from "@ai-sdk/deepseek";
import { createOpenAI } from "@ai-sdk/openai";
type DeepSeekChatModelId = 'deepseek-chat' | 'deepseek-reasoner' | (string & {});


export const deepseekR1Free_SiliconFlow=createDeepSeek({
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY,
  baseURL: import.meta.env.VITE_SILICONFLOW_BASE_URL,
}).languageModel('deepseek-ai/DeepSeek-R1-Distill-Qwen-32B'as DeepSeekChatModelId);

export const GLM48B_SiliconFlow=createOpenAI({
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY,
  baseURL: import.meta.env.VITE_SILICONFLOW_BASE_URL,
}).languageModel('THUDM/glm-4-9b-chat'as DeepSeekChatModelId);

export const Yi34B_SiliconFlow=createOpenAI({
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY,
  baseURL: import.meta.env.VITE_SILICONFLOW_BASE_URL,
}).languageModel('01-ai/Yi-1.5-34B-Chat-16K'as DeepSeekChatModelId);

