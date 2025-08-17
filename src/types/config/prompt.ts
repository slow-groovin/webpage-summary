import { CoreMessage } from "ai"

export type PromptConfigItem={
  /**
   * uuid
   */
  id:string;
  /**
   * name of this config
   */
  name: string,
  systemMessage:string,
  userMessage: string,
  at: number
}