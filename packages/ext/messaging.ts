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



	openOptionPage(url:string): Promise<any>;

  /**
   * for onConnectMessage and sendConnectMessage
   * @param key
   */
  _connectEstablish(key:string):string;

  /*
   * tests  
   */
  getStringLength(str:string): number;
  /**
   * content.js --> background streamText() test
   * @param data 
   */
  streamTextTest(input: {messages:CoreMessage[],modelName:keyof typeof models, connectId:string}): Promise<unknown>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
