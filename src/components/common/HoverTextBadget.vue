<script setup lang="ts">
import { computed, HTMLAttributes, useTemplateRef } from 'vue';
import HoverCard from '../custom-ui/HoverCard.vue';
import { cn } from '@/src/utils/shadcn';
const props = defineProps<{
  title: string,
  description: string,
  class?: HTMLAttributes['class']
}>()
const titleRef = useTemplateRef('title')
</script>
<template>
  <HoverCard>
    <template #trigger>
      <div :class="cn(' bg-neutral-400 text-white text-sm rounded px-1 cursor-pointer', props.class)" ref="title">
        {{ title }}
      </div>
    </template>
    <template #custom-content>
      <pre class="absolute mt-2 bg-background border rounded p-2 ">{{ description }}</pre>
    </template>
  </HoverCard>
</template>