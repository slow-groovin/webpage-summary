<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { modelProviderPresets } from '@/src/presets/model-providers';
import { onMounted, ref } from 'vue';
import { storage } from 'wxt/storage';


const modelConfigs = storage.defineItem<ModelConfigItem[]>(
  'local:modelConfigs',
  {
    fallback: [],
  },
);
const configs=ref<ModelConfigItem[]>([])
onMounted(async ()=>{
  configs.value=await modelConfigs.getValue()

})

async function deleteModel(id:string){
  configs.value=configs.value.filter(c=>c.id!==id)
  modelConfigs.setValue(configs.value)
}
</script>
<template>

  <div class="flex flex-col  space-y-4 items-stretch w-fit">
    <template v-for="{providerType,name,id,apiKey,baseURL,at,modelName} in configs">
      <div class="flex flex-row space-x-2 justify-start p-2 border rounded shadow">
        <div v-if="modelProviderPresets[providerType].icon">
          <img :src="modelProviderPresets[providerType].icon" alt="Model Icon" class="w-6 h-6 bg-gray-100" />
        </div>
        <div>{{ providerType }}</div>
        <!-- <div>{{ id }}</div> -->

        <div>{{ name }}</div>
        <div class="text-primary">{{ modelName }}</div>
        <!-- <div class="border">{{ apiKey }}</div> -->
        <div class="underline decoration-dotted">{{ baseURL }}</div>
        <div> createdAt: {{ new Date(at).toLocaleString() }}</div>
        
        <Button @click="deleteModel(id)">delete</Button>
      </div>
    </template>
  </div>
</template>
<style lang="postcss" scoped></style>