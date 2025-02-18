<template>
  <div class="flex items-center justify-between flex-nowrap px-1 py-1  border-b border" ref="headerRef">
    <div class="flex items-center flex-nowrap space-x-4">
      <div class="flex items-center text-nowrap">
        <img :src="icon" alt="Extension Icon" class="w-6 h-6 rounded mr-2 select-none" draggable="false" />
        <!-- <div> {{ name }}</div> -->
        <slot name="left-buttons"></slot>
      </div>

      <!-- model select -->
      <div class="rounded" v-if="currentModelConfig">
        <Select @update:model-value="selectCurrentModel" :model-value="currentModelConfig.id">
          <!-- Select Trigger has bug in headless, so use style to force setting it  -->
          <template #trigger class="h-fit">
            <ModelConfigInlineItem :item="currentModelConfig" :is-selected="true" />
          </template>

          <template #content>
            <template v-for="configItem in modelConfigs" :key="configItem.id">
              <SelectItem :value="configItem.id">
                <ModelConfigInlineItem :item="configItem" :is-selected="false" />
              </SelectItem>
            </template>
          </template>

        </Select>
      </div>

      <!-- prompt select -->
      <div class="rounded" v-if="currentPromptConfig">
        <Select @update:model-value="selectCurrentPrompt" :model-value="currentPromptConfig.id">
          <!-- Select Trigger has bug in headless, so use style to force setting it -->
          <template #trigger class="h-fit" style="background-color: transparent;color:var(--primary)">
            <PromptConfigInlineItem :item="currentPromptConfig!" />
          </template>

          <template #content="value">
            <template v-for="configItem in promptConfigs" :key="configItem.id">
              <SelectItem :value="configItem.id">
                <PromptConfigInlineItem :item="configItem" />
              </SelectItem>
            </template>
          </template>
        </Select>
      </div>





    </div>

    <!-- right button area -->
    <div class="flex items-center space-x-2 ml-3">
      <slot name="right-buttons"></slot>
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
import { Select, SelectItem } from '@/src/components/custom-ui/select'
import ModelConfigInlineItem from '../model/ModelConfigInlineItem.vue';
import { usePromptConfigStorage } from '@/src/composables/prompt';
import { PromptConfigItem } from '@/src/types/config/prompt';
import PromptConfigInlineItem from '../prompt/PromptConfigInlineItem.vue';
import { TokenUsage } from '@/src/types/summary';
import TokenUsageItem from './TokenUsageItem.vue';
import Button from '../ui/button/Button.vue';
import { sendMessage } from '@/messaging';
import icon from '~/assets/16.png';


defineProps<{
}>()

const { iconUrl, name } = useExtInfo()
const { listItem, getDefaultItem } = useModelConfigStorage()
const { listItem: listPrompt, getDefaultItem: getDefaultPrompt } = usePromptConfigStorage()

const modelConfigs = ref<ModelConfigItem[]>([])
const currentModelConfig = defineModel<ModelConfigItem | null>('current-model')

const promptConfigs = ref<PromptConfigItem[]>([])
const currentPromptConfig = defineModel<PromptConfigItem | null>('current-prompt')



async function selectCurrentModel(id?: string) {
  if (!id) return
  currentModelConfig.value = modelConfigs.value.find(i => i.id === id)
}

async function selectCurrentPrompt(id?: string) {
  if (!id) return
  currentPromptConfig.value = promptConfigs.value.find(i => i.id === id)
}

function openExtSettingPage() {
  sendMessage('openOptionPage', '/options.html#/')
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