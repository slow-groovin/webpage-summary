<template>
  <!--
    Prompt: Display the number of words on the current page in the form of a dialog card, with the text appearing word by word.
    Introduction: A component used to display the number of words on the current page, with a dialog card style and word-by-word display effect.
  -->
  <div :class="cn('py-1  px-2 w-fit rounded-lg border', props.class ?? '')">
    <!-- Word count -->
    <span class="text-gray-700"> {{ displayText }}</span>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/src/utils/shadcn";
import { random, sleep } from "radash";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { HTMLAttributes } from 'vue';

defineOptions({
  inheritAttrs: false
})
const props = defineProps<{
  result: {
    totalLength?: number,
    clipedLength?: number,
  },
  class?: HTMLAttributes['class']
}>()
const displayText = ref('')
// Get page content
let text = `Total tokens: ${props.result.totalLength}`
if (props.result.clipedLength)
  text += `, Final tokens of input content: ${(props.result.totalLength ?? 0) - (props.result!.clipedLength ?? 0)},   ${props.result.clipedLength} tokens are clipped,`
async function* generateText(text: string) {
  const words = text.split(' ')
  for (const word of words) {
    await sleep(random(60, 100))
    yield word
  }
}


onMounted(async () => {
  for await (const element of generateText(text)) {
    displayText.value += element + ' '

  }
});

</script>