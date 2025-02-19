<script setup lang="ts">
import { ModelConfigItem } from '@/src/types/config/model';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { modelProviderPresets } from '@/src/presets/model-providers';

const props = defineProps<{
  item: ModelConfigItem
}>()
function hiddenApiKey(apiKey:string){
  if(apiKey.length>9){
    return apiKey.slice(0,3)+'****'+apiKey.slice(-3)
  }
  else{
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
      <div class="flex flex-col items-start space-y-2">

        <div class="flex items-center space-x-1">
          <img v-if="modelProviderPresets[item.providerType].icon" :src="modelProviderPresets[item.providerType].icon"
            alt="Model Icon" class="w-6 h-6 text-primary" />
          <div class="text-lg font-semibold">{{ item.providerType }}</div>

        </div>
        <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">{{ item.modelName }}</div>

        <div class="">
          <span class="">Max Tokens:</span> &nbsp;&nbsp;
          <span class="font-bold" >{{ item.maxTokens }}  K</span>
        </div>

        <div class="underline decoration-dotted" v-if="item.baseURL">{{ item.baseURL}}</div>
        <div v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>


        <div class="underline decoration-dotted" v-if="item.apiKey">API_KEY: &nbsp; {{ hiddenApiKey(item.apiKey) }}</div>

      </div>

    </CardContent>
  </Card>
</template>