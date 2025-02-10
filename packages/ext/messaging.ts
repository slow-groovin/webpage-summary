import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  /**
   * fetch a global config from background
   * @param key 
   */
  getGlobalConfig(key:string):Promise<string|null>;
  getAllGlobalConfig():Promise<Record<string,unknown>>;
  getStringLength(data: string): number;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
