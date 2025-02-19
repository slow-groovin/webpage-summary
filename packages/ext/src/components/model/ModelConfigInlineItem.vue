<script setup lang="ts">
import { ModelConfigItem } from '@/src/types/config/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { modelProviderPresets } from '@/src/presets/model-providers';
import { inject } from 'vue';
import { IS_SELECTED_KEY } from '@/src/constants/inject-key';
import { browser, PublicPath } from 'wxt/browser';

const props = defineProps<{
  item: ModelConfigItem
  isSelected?: boolean //if is selected, model name will not shown
}>()

const calcIconUrl = (assetUrl: string) => browser.runtime.getURL(assetUrl as PublicPath)
</script>
<template>

  <div class="flex items-center gap-1">
    <img v-if="modelProviderPresets[item.providerType].icon"
      :src="calcIconUrl(modelProviderPresets[item.providerType].icon!)" alt="Model Icon" class="w-4 h-4" />


    <div class="flex flex-col text-xs max-w-32 ">
      <div class="overflow-x-hidden text-nowrap text-ellipsis" :title="item.modelName + `(${item.maxContentLength}K)`">
        {{ item.name }}
      </div>
      <div v-if="!isSelected" class="overflow-x-hidden text-nowrap text-ellipsis"
        :title="item.modelName + `(${item.maxContentLength}K)`">
        {{ item.modelName }}
      </div>

    </div>

  </div>

</template>