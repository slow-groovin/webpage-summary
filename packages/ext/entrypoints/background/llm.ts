import { onConnectMessage } from "@/connect-messaging";
import { TokenUsage } from "@/src/types/summary";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export function registerLLMMessages() {
  onConnectMessage('streamTextViaConnect',async  ({messages,modelConfig}, { chunk, chunkEnd, complete, markReturn, resolve }) => {
    const {usage,textStream}=streamText({
      messages: messages,
      model: createOpenAI({
        apiKey: modelConfig.apiKey,
        baseURL: modelConfig.baseURL,
      }).languageModel(modelConfig.modelName),
    })
    markReturn([
      {key:'textStream',type:'chunk'},
      {key: 'tokenUsage', type: 'promise'}
    ])

    usage.then(u=>{
      
      resolve('tokenUsage',{
        inputToken: u.promptTokens,
        outputToken: u.completionTokens,
        cost: u.promptTokens*(0.3/100_0000)+u.completionTokens*(0.9/100_0000),
        unit: "$"
      } as TokenUsage)
    })

    for await (const element of textStream) {
      chunk('textStream',element)
    }
    chunkEnd('textStream')
  })
}