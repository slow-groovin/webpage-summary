<script lang="ts" setup>
import { sendMessage } from '@/messaging';
import { simpleParseRead } from '../utils/page-read';
import { Yi34B_SiliconFlow } from '../model-providers/siliconflow-models';
import { CoreMessage } from 'ai';
import { computed, ref } from 'vue'
import { browser, Runtime } from 'wxt/browser';
import { uid, unique } from 'radash';
import { presetPrompts } from '../presets/prompts';
import { renderMessages } from '../utils/prompt';
import markdownit from 'markdown-it'
const md = markdownit()

const pageArtilce = simpleParseRead()
const chatbox = ref<HTMLElement | null>()
console.log('pageArtilce', pageArtilce)
const sumResult = ref('')
const sumResultHtml = computed(() => {
  return md.render(sumResult.value);
})
async function simpleSummary() {
  if (!pageArtilce) {
    alert("no article")
    return
  }
  const { content, ...rest } = pageArtilce
  const {articleUrl,byline,dir,excerpt,lang,length,publishedTime,siteName,textContent,title}=pageArtilce
  const messages = presetPrompts['basic']
  renderMessages(messages, {
    summaryLanguage: 'Chinese',
    textContent: JSON.stringify(rest)
  })


  const randId = uid(4)



  //todo Encaps
  const result = await sendMessage('streamTextTest', {
    messages: messages,
    modelName: 'GLM48B_SiliconFlow',
    connectId: randId
  })
  const port = browser.runtime.connect({ name: randId })
  // console.log(result, typeof result, port, typeof port)
  const lis = (msg: unknown) => {
    // console.debug('[message]', msg)
    sumResult.value += msg
    setTimeout(() => {
      if (chatbox.value)
        chatbox.value.scrollTop = chatbox.value.scrollHeight;
    }, 0);
  }
  port.onMessage.addListener(lis)


  port.postMessage('begin')
}
</script>

<template>
  <div class="max-w-[150em]  bg-gray-300">
    <div v-if="pageArtilce">
      length: {{ pageArtilce.length }}
      <button @click="simpleSummary">simpleSummary</button>
    </div>
    <div v-else>
      parse page error.
    </div>

    <div ref="chatbox" class="p-1 m-2 max-w-full border rounded min-h-8 max-h-[50vh] overflow-y-auto">
      <div v-html="sumResultHtml"></div>
    </div>

    <div>
      <!-- {{ sumResult }} -->
    </div>
  </div>


</template>

<style scoped></style>
