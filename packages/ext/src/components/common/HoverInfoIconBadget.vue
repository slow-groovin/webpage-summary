<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next';
import { HTMLAttributes } from 'vue';
import HoverCard from '../custom-ui/HoverCard.vue';
import { Button } from '../ui/button';
import { cn } from '@/src/utils/shadcn';
const props = defineProps<{
  description: string,
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <HoverCard :class="cn('size-4 rounded-full hover:bg-neutral-200', props.class)">
    <template #trigger>
      <InfoIcon :class="cn('size-4 text-neutral-400 rounded-full hover:bg-neutral-200', props.class)" />
    </template>
    <template #custom-content>
      <div class="absolute  bg-background border rounded p-2 shadow-xl  ">
        {{ description }}
      </div>
    </template>
  </HoverCard>
</template>