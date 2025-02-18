
import { onConnectMessage } from "@/connect-messaging";
import { onMessage } from "@/messaging";
import allModels from '@/src/model-providers';
import { PortListener } from "@/src/types/browser";
import { streamText } from "ai";
import { random, sleep } from "radash";
import { browser, Runtime } from "wxt/browser";

export function registerDebugMessages() {

  /**
   * for basic test
   */
  onMessage('getStringLength', message => {
    return message.data.length;
  });

  /**
   * for connect test
   */
  browser.runtime.onConnect.addListener(function (port) {
    if (port.name !== "knockknock") {
      return
    }
    port.onMessage.addListener(async function (_msg) {

      await sleep(random(500, 1500))
      const msg = _msg as any
      if (msg.joke === "Knock knock")
        port.postMessage({ question: "Who's there?" });
      else if (msg.answer === "Madame")
        port.postMessage({ question: "Madame who?" });
      else if (msg.answer === "Madame... Bovary")
        port.postMessage({ question: "I don't get it." });
    });

  });
  /**
   * a manual streamText based on connect test
   */
  registerStreamMessageTest()


  /**
   * onConnectMessage test  refer to: ConnectMessageDebug.vue
   */
  onConnectMessage('func1', async (input, { chunk, chunkEnd, complete, markReturn, resolve }) => {
    console.log('[onConnectMessage][func1]', input)
    //trigger sendConnectMessage will return value
    markReturn([
      { type: 'raw', key: 'r1', value: 'direct return: r1' },
      { type: 'promise', key: 'r2' },
      { type: 'chunk', key: 'r3' },
    ])


    sleep(3000).then(() => resolve('r2', 'promise return: r2'))
    async function* g() {
      for (let index = 0; index < 10; index++) {
        await (sleep(1000))
        yield 'no.' + index
      }
    }
    for await (const piece of g()) {
      chunk('r3', piece)
    }

    chunkEnd('r3')
    complete()
  })

}




export function registerStreamMessageTest() {
  const portsMap: Map<string, PortListener> = new Map()

  onMessage('streamTextTest', async (message) => {
    console.debug('[streamTextTest]', message.data)
    const { messages, modelName, connectId } = message.data
    const model = allModels[modelName]
    const result = streamText({
      messages,
      model: model,
    })


    const newPortListener: PortListener = async (msg, port) => {
      console.debug('[port][receive msg]', msg, connectId)
      port.onDisconnect.addListener(() => {

      })
      for await (const chunk of result.textStream) {
        // console.debug('[chunk]',chunk)
        port.postMessage(chunk)
      }

      port.disconnect()

      console.log('[disconnect]', connectId)
      port.onMessage.removeListener(newPortListener)
      portsMap.delete(connectId)

    }

    portsMap.set(connectId, newPortListener)

    const { usage, finishReason, warnings } = result
    return {
      // usage: await usage,
      // finishReason: await finishReason,
      // warnings: await warnings
    }
  })


  //center
  const listener = (port: Runtime.Port) => {
    // console.debug('[onConnect][listener]name:', port.name, portsMap.has(port.name))
    if (!portsMap.has(port.name)) {
      return
    }
    port.onMessage.addListener(portsMap.get(port.name)!)
  };
  browser.runtime.onConnect.addListener(listener)

}