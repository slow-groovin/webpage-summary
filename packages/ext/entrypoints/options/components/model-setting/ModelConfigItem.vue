<script setup lang="ts">
import { ModelConfigItem } from '@/src/types/config/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { modelProviderPresets, ProviderKey } from '@/src/presets/model-providers';
import { isNumber } from 'radash';

const props = defineProps<{
  item: ModelConfigItem
}>()
function hiddenApiKey(apiKey: string) {
  if (apiKey.length > 9) {
    return apiKey.slice(0, 3) + '****' + apiKey.slice(-3)
  }
  else {
    return "*".repeat(apiKey.length)
  }

}
</script>
<template>
  <Card>
    <CardHeader class="pl-2 pt-2 flex flex-row pb-1 justify-around">
      <div class=" flex items-center w-full justify-between space-x-1 text-2xl">

        <div class="text-lg font-bold pl-4">
          {{ item.name }}
        </div>


      </div>
    </CardHeader>
    <hr>
    <CardContent class=" space-y-4 py-4">
      <div class="flex flex-col items-start space-y-1">

        <div class="flex items-center space-x-1">
          <img v-if="modelProviderPresets[item.providerType as ProviderKey]?.icon"
            :src="modelProviderPresets[item.providerType as ProviderKey].icon" alt="Model Icon"
            class="w-6 h-6 text-primary" />
          <div class="text-lg font-semibold">{{ item.providerType }}</div>

        </div>
        <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">{{
          item.modelName }}</div>



        <div class="underline decoration-dotted" v-if="item.baseURL">{{ item.baseURL }}</div>
        <div v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>



        <div class="flex flex-row gap-1 text-xs font-light">
          <div class="font-light" v-if="item.maxContentLength">
            <span class="font-extralight italic">max input: </span>
            <span class="">{{ item.maxContentLength }} </span>
          </div>
          <div class="font-light" v-if="item.maxTokens">
            <span class="font-extralight italic">max output: </span>
            <span class="">{{ item.maxTokens }} </span>
          </div>
        </div>

        <div class="flex flex-row gap-1 text-xs font-light">
          <div v-if="isNumber(item.inputTokenPrice)">{{ item.priceUnit }} {{ item.inputTokenPrice }}/M input tokens
          </div>
          <div class="border-l border-muted-foreground w-[1px]"
            v-if="isNumber(item.inputTokenPrice) && isNumber(item.outputTokenPrice)"></div>
          <div v-if="isNumber(item.outputTokenPrice)">{{ item.priceUnit }} {{ item.outputTokenPrice }}/M output tokens
          </div>

        </div>

      </div>

    </CardContent>
  </Card>
</template>