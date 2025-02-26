import { onConnectMessage } from "@/connect-messaging";
import { createVercelModel } from "@/src/model-providers/create";
import { TokenUsage } from "@/src/types/summary";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export function registerLLMMessages() {
  onConnectMessage('streamTextViaConnect', async ({ messages, modelConfig }, { chunk, chunkEnd, complete, error, markReturn, resolve }) => {
    const options: { temperature?: number, topP?: number, topK?: number, frequencyPenalty?: number, presencePenalty?: number, maxTokens?: number } = {}
    if (modelConfig.temperature) {
      options.temperature = modelConfig.temperature
    }
    if (modelConfig.topP) {
      options.topP = modelConfig.topP
    }
    if (modelConfig.topK) {
      options.topK = modelConfig.topK
    }
    if (modelConfig.frequencyPenalty) {
      options.frequencyPenalty = modelConfig.frequencyPenalty
    }
    if (modelConfig.presencePenalty) {
      options.presencePenalty = modelConfig.presencePenalty
    }
    if (modelConfig.maxTokens) {
      options.maxTokens = modelConfig.maxTokens
    }
    try {
      const { usage, textStream } = streamText({
        ...options,
        messages: messages,
        model: createVercelModel(modelConfig),
        onError(e: any) {
          console.error('[streamTextViaConnect]streamText.onError:', e)
          error(unpackStreamTextError(e))
        }
      })
      markReturn([
        { key: 'textStream', type: 'chunk' },
        { key: 'tokenUsage', type: 'promise' }
      ])

      usage.then(u => {

        resolve('tokenUsage', {
          inputToken: u.promptTokens,
          outputToken: u.completionTokens,
        } as TokenUsage)
      })

      for await (const element of textStream) {
        // console.log('element',element)
        chunk('textStream', element)
      }
      chunkEnd('textStream')

    } catch (e: any) {
      console.error('[streamTextViaConnect]catch error:', e)
      error(unpackStreamTextError(e))
    }
    console.debug('[streamTextViaConnect]complete')

  })
}


function unpackStreamTextError(e: any) {
  /*
    * for  @ai-sdk/anthropic, it's a {error:Error} object
  */
  if (Object.keys(e).length === 1 && e.hasOwnProperty('error')) {
    e = e.error
  }
  if (e instanceof TypeError) {
    e = { name: e.name, message: e.message }
    return
  }

  return e;
}