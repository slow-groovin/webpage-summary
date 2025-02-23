import { defineExtensionMessaging } from '@webext-core/messaging';
import { CoreMessage } from 'ai';
interface ProtocolMap {

  /** for content/popup to open option page */
	openOptionPage(url:string): Promise<any>;

  /** for content/popup to open option page */
	openPopupPage(input:{ query:string}): Promise<any>;
  
  /** for pages beside content to send message to content to invoke summary */
  invokeSummary():void;

  

  /*
   * tests  
   */
  getStringLength(str:string): number;
  /**
   * content.js --> background streamText() test
   * @param data 
   */
  streamTextTest(input: {messages:CoreMessage[],modelName:string, connectId:string}): Promise<unknown>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
