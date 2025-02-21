<template>
  <div class="flex flex-col items-stretch w-full text-base markdown">
    <!-- LLM message -->
    <div v-if="message.role === 'system' || message.role === 'assistant'" class="w-full text-left ">
      <div v-html="renderedContent"></div>
    </div>

    <!-- User input -->
    <div v-else-if="message.role === 'user'" class="self-end max-w-[80%] space-x-2 ">
      <!-- Use border to create a pointed corner -->
      <div class="flex-1 rounded-3xl rounded-tr-none border px-4 py-4">
        <div v-html="renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<!--
In SummaryDialog, the message item occupies 100% width, height adjusts with content, divided into two styles:
Style 1 LLM message: occupies the entire row width, like normal text,
Style 2 User input: similar to user messages in chatgpt chat box, with an avatar on the right, using border style to create a pointed corner pointing to the user's avatar, the dialog box does not occupy the entire row width but leaves some width on the left side
-->
<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue';
import '~/assets/markdown.css'
//import { cn } from "@/src/utils/shadcn";
import markdownit from 'markdown-it'
import { UIMessage } from '@/src/types/message';
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})



interface Props {
  message: UIMessage;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
const renderedContent = computed(() => md.render(props.message.content))
</script>