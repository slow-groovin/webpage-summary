<script lang="ts" setup>
import { ref } from 'vue';
import { generateText } from 'ai';
import { createOpenAI, openai } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set
import { Readability } from '@mozilla/readability';

const platform = ['OPENROUTER', 'SILICONFLOW', 'DEEPSEEK', 'API2D']
const result = ref(new Map<string, string>());
async function openAI(platform: string) {
  const documentClone = document.cloneNode(true);
  const _article = new Readability(documentClone as Document, {}).parse();
  const content = _article?.textContent.slice(0, 1000) ?? 'no page content';
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
  const { text } = await generateText({
    model: createOpenAI({
      baseURL: baseURL,
      apiKey: apiKey,

    }).languageModel(modelName),

    system: 'You are a webpage summary assistant!',
    prompt: 'Please summerize the webpage for user, here is the text content:' + content,
  });
  result.value.set(platform, text)
}

</script>

<template>
  <div>
    <h1>vercel ai core x</h1>
  </div>

  <details>
    <summary>openai</summary>
    <div>
      <div>
        <template v-for="p in platform">
          <button @click="openAI(p)">{{ p.toLocaleLowerCase() }}</button>
        </template>
      </div>
      <div>
        <template v-for="p in platform">
          <div>{{ p }}:</div>
          <div>{{ result.get(p) }}</div>
        </template>
      </div>
    </div>
  </details>

  <details open>
    <summary>useChat</summary>
    <div>

    </div>
    

  </details>


</template>

<style scoped></style>
