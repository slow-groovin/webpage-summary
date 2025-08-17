<script setup lang="ts">
import { cn } from '@/src/utils/shadcn';
import { computed, type HTMLAttributes } from 'vue';
import {Circle,CircleCheckBig} from 'lucide-vue-next'
const props = defineProps<{
  class?: HTMLAttributes['class']
  checked?: boolean;
}>()


</script>

<template>
    <div :class="cn('text-green-600 hover:ring-blue-500 active:ring-blue-800 hover:ring-1 active:ring-2 rounded-full',props.class)">
      <CircleCheckBig v-if="checked" :stroke-width="3"  />
      <Circle  v-else  :stroke-width="3"/>
    </div>
</template>

    

<style scoped>
/* Add custom styles here if needed */
</style>
