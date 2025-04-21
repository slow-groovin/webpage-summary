import { onConnectMessage } from "@/connect-messaging";
import { createVercelModel } from "@/src/model-providers/create";
import { TokenUsage } from "@/src/types/summary";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { assign, pick } from "radash";

export function registerLLMMessages() {
  onConnectMessage(
    "streamTextViaConnect",
    async (
      { messages, modelConfig },
      { chunk, chunkEnd, complete, error, markReturn, resolve }
    ) => {
      let options: {
        temperature?: number;
        topP?: number;
        topK?: number;
        frequencyPenalty?: number;
        presencePenalty?: number;
        maxTokens?: number;
        use_serach?: boolean;
      } = {};

      const optionKeys = Object.keys(options) as (keyof typeof options)[];
      options = assign(options, modelConfig);
      options = pick(options, optionKeys);

      try {
        const model = createVercelModel(modelConfig);
        const { usage, textStream } = streamText({
          ...options,
          messages: messages,
          model: model,
          onError(e: any) {
            console.error("[streamTextViaConnect]streamText.onError:", e);
            error(unpackStreamTextError(e));
          },
        });
        markReturn([
          { key: "textStream", type: "chunk" },
          { key: "tokenUsage", type: "promise" },
        ]);

        usage.then((u) => {
          resolve("tokenUsage", {
            inputToken: u.promptTokens,
            outputToken: u.completionTokens,
          } as TokenUsage);
        });

        for await (const element of textStream) {
          // console.log('element',element)
          chunk("textStream", element);
        }
        chunkEnd("textStream");
      } catch (e: any) {
        console.error("[streamTextViaConnect]catch error:", e);
        error(unpackStreamTextError(e));
      }
      console.debug("[streamTextViaConnect]complete");
    }
  );
}

function unpackStreamTextError(e: any) {
  if (e instanceof TypeError) {
    e = { name: e.name, message: e.message };
    return e;
  }
  /*
   * for  @ai-sdk/anthropic, it's a {error:Error} object
   */
  if (Object.keys(e).length === 1 && e.hasOwnProperty("error")) {
    e = e.error;
    e["_message"] = e.message;
  }

  return e;
}
