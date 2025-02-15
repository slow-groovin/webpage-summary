import { defineExtensionMessaging } from '@webext-core/messaging';
import { CallWarning, CoreMessage, FinishReason, LanguageModel, LanguageModelUsage, streamText } from 'ai';
import models from '@/src/model-providers'
interface ProtocolMap {
  /**
   * fetch a global config from background
   * @param key 
   * @deprecated
   */
  getGlobalConfig(key:string):Promise<string|null>;
  getAllGlobalConfig():Promise<Record<string,unknown>>;
  getStringLength(str:string): number;

  /**
   * content.js --> background streamText()
   * @param data 
   */
  streamText(input: {messages:CoreMessage[],modelName:keyof typeof models, connectId:string}): Promise<unknown>;

	openOptionPage(url:string): Promise<any>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
