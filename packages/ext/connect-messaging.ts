/*
 * Encapsulate connect API of browser extension.
 */

import { CoreMessage } from "ai";
import { browser } from "wxt/browser";
import { ModelConfigItem } from "./src/types/config/model";
import { PromptConfigItem } from "./src/types/config/prompt";
import { TokenUsage } from "./src/types/summary";

/**
 * Define messages.
 * This interface defines the structure of messages that can be exchanged between different parts of the extension.
 * Each key represents a different message type, and the corresponding value is a function that defines the input and output types for that message.
 */
interface ProtocolMap {
  streamTextViaConnect(input: {
    messages: CoreMessage[],
    modelConfig: ModelConfigItem,
  }): {
    tokenUsage: Promise<TokenUsage>,
    textStream: ChunkConsumer,

  }

  /**for test */
  func1(input: { p1: string, p2: number, p3: boolean }): { r1: string, r2: Promise<string>, r3: ChunkConsumer };
}

export const { onConnectMessage, sendConnectMessage } = defineConnectMessage();


/*
IMPLEMETION OF defineConnectMessage 👇👇
 */

// Define the input type, which can be a record or any type.
type InputType = Record<string, any> | any;

// Define the result type, which can be a record containing any type, Promise, or ChunkConsumer.
type ResultType = Record<string, any | Promise<any> | ChunkConsumer>;

// Define the message type, which takes input and returns a result.
type MessageType<I extends InputType, O extends ResultType> = (input: I) => O;

// Get the first parameter type of a function.
type FirstParameter<T extends (args: any) => any> = T extends (args: infer P) => any ? P : never;

// Define the ChunkConsumer type, which includes onChunk and onComplete callbacks.
// This type is used for handling streaming data, where onChunk is called for each chunk of data, and onComplete is called when the stream is finished.
type ChunkConsumer = {
  onChunk: (callback: (v: unknown) => void) => void;
  onChunkComplete: (callback: () => void) => void;
};

// Define the OnMessage type, which is used to register message handlers in background.js.
// This type represents a function that registers a callback function (func) to be executed when a message with a specific key is received.
type OnMessage = <T extends keyof ProtocolMap>(
  key: T,
  func: (
    input: FirstParameter<ProtocolMap[T]>,
    opt: {
      // Callback to mark the return value types.  This allows the sender to know what types to expect for each field in the response.
      markReturn: (param: MarkReturnValue<ReturnType<ProtocolMap[T]>>) => void;
      // Callback to indicate the completion of the message handling.  This signals that the handler has finished processing.
      complete: () => void;
      // Callback to resolve a promise in the return value.  This is used for asynchronous responses.
      resolve: <K extends keyof ReturnType<ProtocolMap[T]>>(key: K, value: unknown) => void;
      // Callback to send a chunk of data. This is used for streaming responses.
      chunk: <K extends keyof ReturnType<ProtocolMap[T]>>(key: K, value: unknown) => void;
      // Callback to indicate the end of a chunked data stream.  This signals the end of a streaming response.
      chunkEnd: <K extends keyof ReturnType<ProtocolMap[T]>>(key: K) => void;
      error: (error: Error) => void;
    }
  ) => void,
) => void;

// Define the SendMessage type, which is used to send messages.
// This type represents a function that sends a message with a specific key and input, and returns a promise that resolves to the response.
type SendMessage = <T extends keyof ProtocolMap>(
  key: T,
  input: FirstParameter<ProtocolMap[T]>,
  opts?: {
    onError?: (e: any) => void
  }
) => Promise<ReturnType<ProtocolMap[T]> & {stop:CallableFunction}>;

// Define the ConnectMessage type for .postMessage()
// This type represents the structure of messages exchanged internally between the sender and receiver.
type ConnectMessage = {
  type: 'markReturn' | 'resolve' | 'chunk' | 'chunkEnd' | 'error' | 'stop';
  key: string;
  value: unknown;
};



// Define the MarkReturnValue type to specify the type of each return value.
// This type is used to indicate whether a field in the response is a raw value, a promise, or a chunked stream.
type MarkReturnValue<T extends Record<string, any> = Record<string, any>, K extends keyof T = keyof T> = {
  type: 'raw' | 'promise' | 'chunk';
  key: K;
  value?: T[K];
}[];

/**
 * Defines the connect message functions.
 * @returns An object containing onConnectMessage and sendConnectMessage functions.
 */
function defineConnectMessage(): {
  onConnectMessage: OnMessage;
  sendConnectMessage: SendMessage;
} {
  return {
    /**
     * Registers a message handler for a specific key.
     * @param key - The message key.  This is the name of the message that the handler will respond to.
     * @param callbackFunc - The callback function to handle the message. This function will be executed when a message with the specified key is received.
     */
    onConnectMessage: (key, callbackFunc) => {
      const NAME_KEY = `onConnectMessage:${key}`;
      let input = {} as any;
      browser.runtime.onConnect.addListener((port) => {
        // Filter by NAME_KEY.  Only process connections with the correct name.
        if (port.name !== NAME_KEY) return;

        const onMessageListener = (_msg: any) => {
          // First message is the input parameter.
          input = _msg;

          /**
           * Marks the return value types.
           * @param retVal - The return value types.  This array describes the expected types of the response fields.
           */
          const markReturn: Parameters<typeof callbackFunc>[1]['markReturn'] = (retVal) => {
            port.postMessage({ type: 'markReturn', value: retVal });
          };

          /**
           * Indicates the completion of the message handling.
           */
          const complete: Parameters<typeof callbackFunc>[1]['complete'] = () => {
            port.disconnect();
            // No need to removeListener for port, it's being closed.
          };

          /**
           * Sends a chunk of data.
           * @param key - The key of the chunked data.  This identifies which field the chunk belongs to.
           * @param val - The chunk data.  This is the actual data being sent.
           */
          const chunk: Parameters<typeof callbackFunc>[1]['chunk'] = (key, val) => {
            port.postMessage({ type: 'chunk', key: key, value: val });
          };

          /**
           * Indicates the end of a chunked data stream.
           * @param key - The key of the chunked data. This identifies which stream is ending.
           */
          const chunkEnd: Parameters<typeof callbackFunc>[1]['chunkEnd'] = (key) => {
            port.postMessage({ type: 'chunkEnd', key: key });
          };

          /**
           * Resolves a promise in the return value.
           * @param key - The key of the promise. This identifies which promise to resolve.
           * @param val - The resolved value.  This is the value the promise will resolve with.
           */
          const resolve: Parameters<typeof callbackFunc>[1]['resolve'] = (key, val) => {
            port.postMessage({ type: 'resolve', key: key, value: val });
          };

          const error = (e: Error) => {
            port.postMessage({ type: 'error', key: 'error', value: e })
          }
          callbackFunc(input, { markReturn, complete, chunk, chunkEnd, resolve, error });
        };
        port.onMessage.addListener(onMessageListener);
      });
    },

    /**
     * Sends a connect message.
     * @param key - The message key. This is the name of the message to send.
     * @param input - The input data.  This is the data to send with the message.
     * @returns A promise that resolves to the return value of the message handler.
     */
    sendConnectMessage: (key, input, opt) => {
      const NAME_KEY = `onConnectMessage:${key}`;
      const connectPort = browser.runtime.connect({ name: NAME_KEY });
      /*
       * Create some state containers.
       * These variables are used to store callbacks and data related to the response.
       */
      let markReturnResolve: (v: any) => void; // Callback to resolve the main promise with the marked return values.
      let returnValuePromiseMap: Record<string, (v: any) => void> = {}; // Map of promise keys to their resolve functions.
      let returnValueChunkFuncMap: Record<string, (v: any) => void> = {}; // Map of chunk keys to their chunk functions.
      let returnValueChunkCompleteFuncMap: Record<string, (v: any) => void> = {}; // Map of chunk keys to their completion functions.
      let onErrorHook = opt?.onError
      const result = new Promise<any>((resolve, reject) => {
        markReturnResolve = resolve; // Assign the resolve function to markReturnResolve.
      });

      connectPort.onMessage.addListener((_msg: any,port) => {
        const msg = _msg as ConnectMessage;
        if (msg.type === 'markReturn') {
          // Handle the 'markReturn' message, which indicates the structure of the response.
          const markReturnValue = msg.value as MarkReturnValue;
          const returnValue = {} as any;
          // Iterate through the marked return values and construct the response object.
          for (const v of markReturnValue) {
            if (v.type === 'raw') {
              // If the type is 'raw', directly assign the value to the corresponding key.
              returnValue[v.key] = v.value;
            } else if (v.type === 'promise') {
              // If the type is 'promise', create a new promise and store its resolve function.
              const newPromise = new Promise<typeof v.value>((resolve, reject) => {
                returnValuePromiseMap[v.key] = resolve;
              });
              returnValue[v.key] = newPromise;
            } else if (v.type === 'chunk') {
              // If the type is 'chunk', create a chunk processor and store its functions.
              const { onChunk, chunk, onChunkComplete, chunkComplete } = createChunkProcessor();
              returnValueChunkFuncMap[v.key] = chunk;
              returnValueChunkCompleteFuncMap[v.key] = chunkComplete;
              returnValue[v.key] = { onChunk, onChunkComplete };
            }
          }
          // Resolve the main promise with the constructed return value object.
          markReturnResolve({
            ...returnValue,
            stop: ()=>{
              console.log('mannual stop port.',port.name)
              port.disconnect()
            }
          });
        } else if (msg.type === 'resolve') {
          // Handle the 'resolve' message, which resolves a promise in the response.
          returnValuePromiseMap[msg.key]!(msg.value);
        } else if (msg.type === 'chunk') {
          // Handle the 'chunk' message, which sends a chunk of data for a streaming response.
          returnValueChunkFuncMap[msg.key]!(msg.value);
        } else if (msg.type === 'chunkEnd') {
          // Handle the 'chunkEnd' message, which signals the end of a chunked stream.
          returnValueChunkCompleteFuncMap[msg.key]!(msg.value);
        } else if (msg.type === 'error') {
          console.log('onError', msg)
          if(onErrorHook){
            onErrorHook(msg.value)
          }else{
            throw msg.value
          }
        } else {
          throw new Error("Unexpected msg.type:" + msg.type);
        }
      });

      // Send initial message.  This sends the input data to the message handler.
      connectPort.postMessage(input);

      return result; // Return the promise that will be resolved with the response.
    },
  };
}

/**
 * Creates a chunk processor.
 * This function encapsulates the logic for handling chunked data streams.
 * @returns An object containing onChunk, chunk, onChunkComplete, and chunkComplete functions.
 */
function createChunkProcessor() {
  let chunkCallback: (c: any) => void = () => { };
  let chunkCompleteCallback: () => void = () => { };
  let isCompleted = false;

  // Producer uses this to set the callback function.  The producer is the sender of the chunks.
  const onChunk = (callbackfunc: (c: any) => void) => {
    chunkCallback = callbackfunc;
  };

  // Producer uses this to add chunks and trigger the callback.
  const chunk = (data: any) => {
    if (!isCompleted) {
      chunkCallback(data);
    }
  };

  // Consumer uses this to set the callback when each chunk is processed. The consumer is the receiver of the chunks.
  const onChunkComplete = (callbackfunc: () => void) => {
    chunkCompleteCallback = callbackfunc;
  };

  // Mark consumption as complete.
  const chunkComplete = () => {
    isCompleted = true;
    chunkCompleteCallback();
  };

  return {
    onChunk,
    chunk,
    onChunkComplete,
    chunkComplete
  };
}