<template>
  <div class="flex items-center justify-between px-1 py-1  border-b border">
    <div class="flex items-center space-x-4">
      <div class="flex items-center ">
        <img :src="iconUrl" alt="Extension Icon" class="w-4 h-4 rounded" />
        <div> {{ name }}</div>
      </div>

      <!-- model select -->
      <div class="rounded" v-if="currentModelConfig">
        <Select :default-value="currentModelConfig?.id" @update:model-value="selectCurrentModel">
          <!-- Select Trigger has bug in headless, so use style to force setting it  -->
          <SelectTrigger class="h-fit" style="background-color: transparent;color:var(--primary)">
            <SelectValue placeholder="Select a model">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <template v-for="configItem in modelConfigs" :key="configItem.id">
              <SelectItem :value="configItem.id">
                <ModelConfigInlineItem :item="configItem" :is-selected="currentModelConfig?.id === configItem.id" />
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>

      <!-- prompt select -->
      <div class="rounded" v-if="currentPromptConfig">
        <Select :default-value="currentPromptConfig?.id" @update:model-value="selectCurrentPrompt">
          <!-- Select Trigger has bug in headless, so use style to force setting it  -->
          <SelectTrigger class="h-fit" style="background-color: transparent;color:var(--primary)">
            <SelectValue placeholder="Select a model">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <template v-for="configItem in promptConfigs" :key="configItem.id">
              <SelectItem :value="configItem.id">
                <PromptConfigInlineItem :item="configItem" :is-selected="currentPromptConfig?.id === configItem.id" />
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>


      <div class="flex items-center gap-1 border rounded p-1 bg-gray-200" title="Token Usage">
        Tokens:
        <TokenUsageItem v-if="tokenUsage" :usage="tokenUsage" />
      </div>

    </div>

    <!-- right button area -->
    <div class="flex items-center space-x-2">
      <slot name="buttons"></slot>
      <!-- <div>[Pin Icon]</div> -->
       <Button variant="github" size="icon" @click="openExtSettingPage()">
         <SettingsIcon class="" />
       </Button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useExtInfo } from '@/src/composables/extension';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { ModelConfigItem } from '@/src/types/config/model';
import { onMounted, ref } from 'vue';
import { SettingsIcon } from 'lucide-vue-next';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/src/components/ui/select'
import ModelConfigInlineItem from '../model/ModelConfigInlineItem.vue';
import { usePromptConfigStorage } from '@/src/composables/prompt';
import { PromptConfigItem } from '@/src/types/config/prompt';
import PromptConfigInlineItem from '../prompt/PromptConfigInlineItem.vue';
import { TokenUsage } from '@/src/types/summary';
import TokenUsageItem from './TokenUsageItem.vue';
import Button from '../ui/button/Button.vue';
import { sendMessage } from '@/messaging';

defineProps<{
  tokenUsage?: TokenUsage
}>()

const { iconUrl, name } = useExtInfo()
const { listItem, getDefaultItem } = useModelConfigStorage()
const { listItem: listPrompt, getDefaultItem: getDefaultPrompt } = usePromptConfigStorage()

const modelConfigs = ref<ModelConfigItem[]>([])
const currentModelConfig = defineModel<ModelConfigItem | null>('current-model')

const promptConfigs = ref<PromptConfigItem[]>([])
const currentPromptConfig = defineModel<PromptConfigItem | null>('current-prompt')



async function selectCurrentModel(id: string) {
  currentModelConfig.value = modelConfigs.value.find(i => i.id === id)
}

async function selectCurrentPrompt(id: string) {
  currentPromptConfig.value = promptConfigs.value.find(i => i.id === id)
}

function openExtSettingPage(){
  sendMessage('openOptionPage','/')
}

onMounted(async () => {
  modelConfigs.value = await listItem()
  if (!currentModelConfig.value)
    currentModelConfig.value = await getDefaultItem()

  promptConfigs.value = await listPrompt()
  if (!currentPromptConfig.value)
    currentPromptConfig.value = await getDefaultPrompt()

})
</script>

<style scoped></style>