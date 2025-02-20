<script lang="ts" setup>
import HelloWorld from '@/src/components/HelloWorld.vue';
import { useExtInfo } from '@/src/composables/extension';
import SampleApp from '@/src/pages/SampleApp.vue';
import { Button } from '@/src/components/ui/button';
import { sendMessage } from '@/messaging';
import { BookOpenTextIcon, SettingsIcon } from 'lucide-vue-next';
import { browser } from 'wxt/browser';
const { iconUrl, name, version } = useExtInfo()

async function invokeCurrentTabSummary() {
  const tab = (await browser.tabs.query({ active: true, currentWindow: true }))[0]
  if (!tab.id) {
    alert('No tab found')
    return
  }
  sendMessage('invokeSummary', undefined, { tabId: tab.id })
}
</script>

<template>
  <!-- default: summary and setting button -->
  <div class="flex flex-col gap-2 h-fit p-2">
    <div class="flex flex-row flex-nowrap text-nowrap items-center gap-1  pr-8">
      <img :src="iconUrl" class="size-4" />
      <div class="self-start">{{ name }}</div>
      <div class="text-xs font-extralight self-end"> {{ version }}</div>

    </div>

    <Button variant="default" @click="invokeCurrentTabSummary">
      <BookOpenTextIcon />
      Summarize
    </Button>

    <Button @click="sendMessage('openOptionPage', '/options.html#/')" variant="secondary">
      <SettingsIcon />
      Open Settings
    </Button>



  </div>
</template>

<style scoped></style>
