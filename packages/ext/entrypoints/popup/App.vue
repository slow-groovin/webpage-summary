<script lang="ts" setup>
import { sendMessage } from '@/messaging';
import { Button } from '@/src/components/ui/button';
import { useExtInfo } from '@/src/composables/extension';
import { getEnablePopupClickTrigger } from '@/src/composables/general-config';
import { useTitle } from '@vueuse/core';
import { BookOpenTextIcon, SettingsIcon } from 'lucide-vue-next';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { browser } from 'wxt/browser';
import { activePageAndInvokeSummary, t } from '../../src/utils/extension';

const { iconUrl, name, version } = useExtInfo()

async function invokeCurrentTabSummary() {
  const tab = (await browser.tabs.query({ active: true, currentWindow: true }))[0]
  if (!tab.id) {
    alert('No tab found')
    return
  }
  activePageAndInvokeSummary(tab)
}

onMounted(async () => {
  const enablePopupClickTrigger = await getEnablePopupClickTrigger()
  if (enablePopupClickTrigger) {
    invokeCurrentTabSummary()
    window.close()
  }

})
</script>

<template>
  <!-- default: summary and setting button -->
  <div class="flex flex-col gap-2 h-fit p-2">
    <div class="flex flex-row flex-nowrap text-nowrap items-center gap-1  pr-8">
      <img :src="iconUrl" class="size-4" />
      <div class="self-start">{{ name }}</div>
      <div class="text-xs font-extralight self-end"> {{ version }}</div>

    </div>

    <Button variant="topic" class="" @click="invokeCurrentTabSummary">
      <BookOpenTextIcon />
      {{ t('summarize') }}
    </Button>

    <Button @click="sendMessage('openOptionPage', '/options.html#/')" variant="secondary">
      <SettingsIcon />
      {{ t('Open_Setting') }}

    </Button>



  </div>
</template>

<style scoped></style>
