<script setup lang="ts">
import { sendMessage } from '@/messaging';
import { TriangleAlertIcon } from 'lucide-vue-next';

const props = defineProps<{
}>()

function openModelConfig(){
  sendMessage('openOptionPage','/options.html#/prompts')
}
</script>
<template>

  <div class="flex items-center gap-1" @click="openModelConfig" title="click to Go to config">
    <TriangleAlertIcon class="text-red-500 w-4 h-4"/>
    No Prompt
  </div>

</template>