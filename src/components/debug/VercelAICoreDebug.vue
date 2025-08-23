<script lang="ts" setup>
import { ref } from 'vue';
import { generateText, streamText } from 'ai';
import { createOpenAI, openai, OpenAIProvider } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set
import { Readability } from '@mozilla/readability';
import { createAnthropic } from '@ai-sdk/anthropic';
import { sendConnectMessage } from '@/connect-messaging';

const platform = ['OPENROUTER', 'SILICONFLOW', 'DEEPSEEK', 'API2D', 'OPENAI']
const result = ref(new Map<string, string>());
const textStreamResult = ref<string>('')

function createModel(platform: string) {
  if (platform === 'OPENAI') {
    return createOpenAI({
      apiKey: 'sk-1211111111111111111111',

    }).languageModel('gpt-4o-mini')

  }
  const baseURL = import.meta.env[`VITE_${platform}_BASE_URL`]
  const apiKey = import.meta.env[`VITE_${platform}_API_KEY`]
  const modelName = import.meta.env[`VITE_${platform}_MODEL_NAME`]
  if (!baseURL) {
    alert("baseURL is undefined..")
  }
  if (!apiKey) {
    alert("apiKey is undefined.")
  }
  if (!modelName) {
    alert("modelName is undefined.")
  }
  return createOpenAI({
    baseURL: baseURL,
    apiKey: apiKey,

  }).languageModel(modelName)
}
async function summaryByGenerateText(model: ReturnType<typeof createModel>) {
  const documentClone = document.cloneNode(true);
  const _article = new Readability(documentClone as Document, {}).parse();
  const content = _article?.textContent.slice(0, 1000) ?? 'no page content';

  const { text } = await generateText({
    model: model,

    system: 'You are a webpage summary assistant!',
    prompt: 'Please summerize the webpage for user, here is the text content:' + content,
  });
  return text
}


async function summaryByStreamText(model: ReturnType<typeof createModel>) {
  const documentClone = document.cloneNode(true);
  const _article = new Readability(documentClone as Document, {}).parse();
  const content = _article?.textContent.slice(0, 1000) ?? 'no page content';

  const { textStream } = await streamText({
    model: model,

    system: 'You are a webpage summary assistant!',
    prompt: 'Please summerize the webpage for user in pure text, here is the text content:' + content,
  });
  return textStream;
}

async function runGenerateText(platform: string) {
  const model = createModel(platform)
  const text = await summaryByGenerateText(model)
  return text
}

async function runStreamText(platform: string) {
  textStreamResult.value = `[by ${platform}]`
  const model = createModel(platform)
  const textStream = await summaryByStreamText(model)
  for await (const textPart of textStream) {
    textStreamResult.value += textPart
  }
}

async function testAnthropic() {
  try {
    const { text } = await generateText({
      model: createAnthropic({
        apiKey: 'ff',
        headers: {
          "anthropic-dangerous-direct-browser-access": "true",
        },
      }).languageModel('claude-3-5-haiku-20241022'),
      prompt: "hello? who are you?"

    })
    console.log('text', text)

  } catch (e) {
    console.error(1, e)
  }


  try {
    console.log('begin streamText')
    const { text } = streamText({
      model: createAnthropic({
        apiKey: 'ff',
        headers: {
          "anthropic-dangerous-direct-browser-access": "true",
        },
      }).languageModel('claude-3-5-haiku-20241022'),
      prompt: "hello? who are youx?",
      onError(e) {
        console.error('onError:', e)
      },

    })
    console.log('text', await text)

  } catch (e) {
    console.error(2, e)
  }
}



async function testStreamTextError() {
  try {
    console.log('begin streamText')
    const { text,warnings,textStream,finishReason } = streamText({
      
      model: createOpenAI({
        apiKey: 'ff',
        headers: {
          "anthropic-dangerous-direct-browser-access": "true",
        },
      }).languageModel('claude-3-5-haiku-20241022'),
      prompt: "hello? who are youx?",
      onError(e) {
        console.error('onError:', e)  // it can only be catched here
      },

    })
    for await(const c of textStream){
      console.log('c',c)
    }
    console.log('text', await text)
    console.log('warnings',await warnings)
    console.log('finishReason',await finishReason)

  } catch (e) {
    console.error(2, e)
  }
  console.log('')
}

async function testSendMessageCallLLM() {
  const { textStream } = await sendConnectMessage('streamTextViaConnect', {
    messages: [
      { role: 'user', content: 'hellO?' }
    ],
    modelConfig: {
      apiKey: '3241',
      modelName: 'claude-3-5-sonnet-20240620',
      providerType: 'anthropic',
      id: 'j4lj',
      name: "myconfig",
      at: 0,
    }
  }, {
    onError(e) {
      console.error(e)
    }

  })

}
</script>

<template>
  <div>
    <h1>vercel ai core x2</h1>
  </div>

  <details>
    <summary>openai</summary>
    <div>
      <div>
        <template v-for="p in platform">
          <button @click="runGenerateText(p)">{{ p.toLocaleLowerCase() }}</button>
          <button @click="runStreamText(p)">{{ p.toLocaleLowerCase() }} (stream)</button>
        </template>
      </div>
      <div>
        <template v-for="p in platform">
          <div>{{ p }}:</div>
          <div>{{ result.get(p) }}</div>
        </template>
        <div>
          <div>stream result:</div>
          <div>{{ textStreamResult }}</div>
        </div>
      </div>
    </div>
  </details>

  <details open>
    <summary>useChat</summary>
    <div>

    </div>


  </details>
  <details open>
    <summary>anthropic</summary>
    <button @click="testAnthropic">anthropic</button>
    <button @click="testStreamTextError">testStreamTextError</button>
    <button @click="testSendMessageCallLLM">sendMessageCallLLM</button>
  </details>

</template>

<style scoped></style>
