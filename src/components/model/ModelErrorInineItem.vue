<script setup lang="ts">
import { sendMessage } from '@/messaging';
import { modelProviderPresets } from '@/src/presets/model-providers';
import { TriangleAlertIcon } from 'lucide-vue-next';
import { browser, PublicPath } from 'wxt/browser';

const props = defineProps<{
}>()

function openModelConfig(){
  sendMessage('openOptionPage','/options.html#/models')
}
</script>
<template>

  <div class="flex items-center gap-1" @click="openModelConfig" title="click to Go to config">
    <TriangleAlertIcon class="text-red-500 w-4 h-4"/>
    No Model
  </div>

</template>