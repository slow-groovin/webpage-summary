<script setup lang="ts">
import { ModelConfigItem } from '@/src/types/config/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { modelProviderPresets, ProviderKey } from '@/src/presets/model-providers';
import { inject } from 'vue';
import { IS_SELECTED_KEY } from '@/src/constants/inject-key';
import { browser, PublicPath } from 'wxt/browser';

const props = defineProps<{
  item: ModelConfigItem
  isSelected?: boolean //if is selected, model name will not shown
}>()

const calcIconUrl = (assetUrl: string) => browser.runtime.getURL(assetUrl as PublicPath)
const maxContentLengthSnippet = (maxLen?: number) => maxLen ? `(${maxLen})` : ''
</script>
<template>

  <div class="flex items-center gap-1">
    <img v-if="modelProviderPresets[item.providerType as ProviderKey]?.icon"
      :src="calcIconUrl(modelProviderPresets[item.providerType as ProviderKey].icon!)" alt="Model Icon"
      class="w-4 h-4" />


    <div class="flex flex-col text-xs  ">
      <div class="overflow-x-hidden text-nowrap text-ellipsis max-w-16"
        :title="item.modelName + maxContentLengthSnippet(item.maxContentLength)">
        {{ item.name }}
      </div>
      <div v-if="!isSelected" class="overflow-x-hidden text-nowrap text-ellipsis"
        :title="item.modelName + maxContentLengthSnippet(item.maxContentLength)">
        {{ item.modelName }}
      </div>

    </div>

  </div>

</template>