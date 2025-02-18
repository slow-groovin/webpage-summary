<template>
  <div class="bg-white p-8">

    <SummaryHeader v-if="defaultItem" v-model:current-item="defaultItem" class="" :token-usage="mockTokenUsage">

    </SummaryHeader class="">
    <SummaryDialog class="mt-[-1px] h-[50vh]">
      <div class="flex flex-col gap-4 ">
        <MessageItem :message="{ type: 'system', content: mockMarkdownMsg }" />
        <MessageItem :message="{ type: 'system', content: mockSystemMsg }" />
        <MessageItem :message="{ type: 'user', content: mockUserMsg }" />
        <MessageItem :message="{ type: 'user', content: 'ok then ...' }" />
        <MessageItem :message="{ type: 'user', content: mockMarkdownMsg }" />
        <template v-for="(msg, index) in msgs" :key="index">
          <MessageItem :message="{ type: msg.type, content: msg.content }" />
        </template>

      </div>

    </SummaryDialog>
    <div class="w-full h-fit relative ">
      <div class="absolute right-0 top-0 flex flex-row gap-1 ">
        <!-- show  buttons -->
        <Button v-show="!isChatDialogOpen" @click="() => isChatDialogOpen = !isChatDialogOpen" variant="github"
          size="icon" class="rounded-none text-gray-500 text-primary">
          <MessageCirclePlusIcon />
        </Button>
      </div>

      <div class="absolute bottom-[-1rem] left-[50%] flex flex-row gap-1 ">
        <!-- hide  buttons -->
        <Button v-show="isChatDialogOpen" @click="() => isChatDialogOpen = !isChatDialogOpen" variant="github"
          size="icon" class="h-4 rounded-none text-gray-500">
          <ChevronUpIcon />
        </Button>
      </div>
      <ChatInputBox v-show="isChatDialogOpen" @submit="userInputSubmit" />

    </div>

  </div>
</template>

<script setup lang="ts">
import SummaryHeader from '@/src/components/summary/SummaryHeader.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { ModelConfigItem } from '@/src/types/config/model';
import { TokenUsage } from '@/src/types/summary';
import { ref } from 'vue';
import SummaryDialog from '../summary/SummaryDialog.vue';
import MessageItem from '../summary/MessageItem.vue';
import ChatInputBox from '../summary/ChatInputBox.vue';
import Button from '../ui/button/Button.vue';
import { ChevronUpIcon, MessageCirclePlusIcon } from 'lucide-vue-next';
const { getDefaultItem } = useModelConfigStorage()
const defaultItem = ref<ModelConfigItem | null>()
getDefaultItem().then(r => defaultItem.value = r)

const mockTokenUsage: TokenUsage = {
  inputToken: 13515,
  outputToken: 535,
  cost: 0.00515,
  unit: "$"
}
const isChatDialogOpen = ref(false)
const msgs = ref<{ type: 'user' | 'llm', content: string }[]>([])
const mockSystemMsg = 'MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools. This makes it easier for developers to build AI applications that can work with a wide range of data and tools.'
const mockUserMsg = `What the ?The user is asking about the typical indentation amount for paragraphs in English writing, specifically in the context of CSS for web design, as the original prompt was about CSS indentation.  To answer this comprehensively, I should consider: The user is asking about how to implement paragraph indentation in CSS. I should provide several CSS methods to achieve paragraph indentation, explaining each method with clear examples and code snippets in Chinese. Specifically, I should cover:
text-indent property: This is the most straightforward and semantic way for paragraph indentation. Explain its usage and how to specify the indentation size using various units like px, em, %, etc. Provide a code example and explain how it works.

padding-left for the first line (pseudo-element :first-line): Although not strictly paragraph indentation in the traditional sense, it can create a visual effect. Explain that this applies padding to the first line of the element, not necessarily indentation of the entire paragraph block from the left margin. Provide a code example and explain its differences from text-indent.

Using margin-left on the first line (pseudo-element :first-line): Similar to padding-left, but uses margin. Explain the difference between padding and margin and how margin-left affects the first line. Provide a code example and compare it with padding-left and text-indent.

Combining ::before pseudo-element with spaces: This is a less recommended method but could be considered in specific scenarios. Explain how to use ::before to insert whitespace characters (like &nb'
`

const mockMarkdownMsg = `
# Summary

## Chapters

### 1. log

\`\`\`text
2021-08-01 12:00:00 [INFO] This is a log message.
2021-08-01 12:01:00 [ERROR] This is an error message.
2021-08-01 12:02:00 [WARN] This is a warning message.
\`\`\`


### 2. syntax \`test\`

\`inline\`

> This is a blockquote.

**This is bold text.**

*This is italic text.*

[This is a link](https://www.example.com)

![This is an image](/icon/16.png)


- This is a list item.
- This is another list item.
- hello?

1. This is a numbered list item.
2. This is another numbered list item.

### 3. table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |

### 4. code block
\`\`\`javascript
console.log('Hello, world!');
\`\`\`

### 3. random
`
async function userInputSubmit(content: string) {
  msgs.value.push({ type: 'user', content: content })

}
</script>

<style scoped></style>