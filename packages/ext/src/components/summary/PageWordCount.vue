<template>
  <!--
    Prompt: Display the number of words on the current page in the form of a dialog card, with the text appearing word by word.
    Introduction: A component used to display the number of words on the current page, with a dialog card style and word-by-word display effect.
  -->
  <div :class="cn('py-1  px-2 w-fit rounded-lg border', props.class ?? '')">
    <!-- Word count -->
    <span class="text-gray-700"> {{ displayedText }}</span>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/src/utils/shadcn";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { HTMLAttributes } from 'vue';
import { WebpageContent } from "@/src/types/summary";

defineOptions({
  inheritAttrs: false
})
const props = defineProps<{
  webpageContent: WebpageContent,
  class?: HTMLAttributes['class']
}>()

// Get page content

const displayedText = ref("");
let currentIndex = 0;
let timer: number | NodeJS.Timeout | undefined;

// Calculate the text displayed word by word
const fullText = computed(() =>
  ("Word count of page summary context: " + props.webpageContent.textContent?.length.toString() || "0")
);

// Word-by-word display effect
const animateText = () => {
  const words = fullText.value.split(" ");
  if (currentIndex < words.length) {
    displayedText.value += words[currentIndex] + " ";
    currentIndex++;
    timer = setTimeout(animateText, 60); // Control display speed
  }
};

onMounted(() => {
  animateText();
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>