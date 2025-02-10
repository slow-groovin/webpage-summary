<script lang="ts" setup>
import { sendMessage } from '@/messaging';
import { simpleParseRead } from '../utils/page-read';
import { Yi34B_SiliconFlow } from '../model-providers/siliconflow-models';
import { CoreMessage } from 'ai';
import { ref } from 'vue'
import { browser, Runtime } from 'wxt/browser';
import { uid, unique } from 'radash';
const pageArtilce = simpleParseRead()
console.log('pageArtilce', pageArtilce)
const sumResult = ref('')
async function simpleSummary() {
  const messages: CoreMessage[] = [
    { role: 'system', content: '你是一个网页内容总结员' },
    { role: 'user', content: pageArtilce!.textContent },
    { role: 'user', content: '以上是提取的网页内容,请总结为400字以内' }
  ]

  const randId = uid(4)



  //todo Encaps
  const result =await sendMessage('streamText', {
    messages: messages,
    modelName: 'Yi34B_SiliconFlow',
    connectId: randId
  })
  const port = browser.runtime.connect({ name: randId })
  // console.log(result, typeof result, port, typeof port)
  const lis = (msg: unknown) => {
    // console.debug('[message]', msg)
    sumResult.value += msg
  }
  port.onMessage.addListener(lis)

  port.postMessage('begin')
}
</script>

<template>
  <div class="max-w-96 bg-gray-300">
    <div v-if="pageArtilce">
      length: {{ pageArtilce.length }}
      <button @click="simpleSummary">simpleSummary</button>
    </div>
    <div v-else>
      parse page error.
    </div>

    <div>
      {{ sumResult }}
    </div>
  </div>


</template>

<style scoped></style>
