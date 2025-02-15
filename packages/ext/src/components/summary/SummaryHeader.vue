<template>
  <div class="flex items-center justify-between px-1 py-1  border-b border">
    <div class="flex items-center space-x-4">
      <div class="flex items-center ">
        <img :src="iconUrl" alt="Extension Icon" class="w-4 h-4 rounded" />
        <div> {{ name }}</div>
      </div>

      <!-- model select -->
      <div class="rounded">
        <Select :default-value="currentItem?.id" @update:model-value="selectCurrentConfig">
          <!-- Select Trigger has bug in headless, so use style to force setting it  -->
          <SelectTrigger class="h-fit" style="background-color: transparent;color:var(--primary)">
            <SelectValue placeholder="Select a model">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <template v-for="configItem in items" :key="configItem.id">
              <SelectItem :value="configItem.id" >
                <ModelConfigInlineItem :item="configItem" :is-selected="currentItem?.id===configItem.id" />
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>

      <!-- prompt select -->
      <div class="rounded">
        <Select :default-value="currentItem?.id" @update:model-value="selectCurrentConfig">
          <!-- Select Trigger has bug in headless, so use style to force setting it  -->
          <SelectTrigger class="h-fit" style="background-color: transparent;color:var(--primary)">
            <SelectValue placeholder="Select a model">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <template v-for="configItem in items" :key="configItem.id">
              <SelectItem :value="configItem.id" >
                <ModelConfigInlineItem :item="configItem" :is-selected="currentItem?.id===configItem.id" />
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>


      <div>[Usage Icon]</div>
      <div class="px-2 py-1 rounded bg-gray-200">12345 TOKENS</div>
      <div class="px-2 py-1 rounded bg-gray-200">PROMPT</div>
    </div>
    <div class="flex items-center space-x-2">
      <div>[Pin Icon]</div>
      <div>[Setting Icon]</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExtInfo } from '@/src/composables/extension';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { ModelConfigItem } from '@/src/types/config/model';
import { ref } from 'vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/src/components/ui/select'
import ModelConfigInlineItem from '../model/ModelConfigInlineItem.vue';

const { iconUrl, name } = useExtInfo()
const { listItem, getDefaultItem } = useModelConfigStorage()


const items = ref<ModelConfigItem[]>([])
const currentItem=defineModel<ModelConfigItem|null>('current-item')
if(currentItem.value===null){
  getDefaultItem().then(i=>currentItem.value=i)
}

listItem().then(_items => items.value = _items)

async function selectCurrentConfig(id:string) {
  currentItem.value=items.value.find(i=>i.id===id)
}
</script>

<style scoped></style>