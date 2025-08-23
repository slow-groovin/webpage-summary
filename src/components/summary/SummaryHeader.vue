<template>
  <div class="flex items-center justify-start flex-wrap px-1 py-1 gap-1 border-b" ref="headerRef">
    <slot name="before-icon-buttons"></slot>

    <img :src="icon" alt="Extension Icon" class="w-6 h-6 rounded select-none" draggable="false" />
    <slot name="left-buttons"></slot>

    <div class="grow" />

    <!-- model select -->
    <div class="rounded">
      <Select @update:model-value="selectCurrentModel" :model-value="currentModelConfig?.id ?? ''">
        <!-- Select Trigger has bug in headless, so use style to force setting it  -->
        <template #trigger class="h-fit">
          <ModelConfigInlineItem v-if="currentModelConfig" :item="currentModelConfig" :is-selected="true" />
          <ModelErrorInineItem v-else />

        </template>

        <template #content>
          <template v-if="modelConfigs" v-for="configItem in modelConfigs" :key="configItem.id">
            <SelectItem :value="configItem.id">
              <ModelConfigInlineItem :item="configItem" :is-selected="false" />
            </SelectItem>
          </template>
        </template>

      </Select>
    </div>


    <!-- prompt select -->
    <div class="rounded">
      <Select @update:model-value="selectCurrentPrompt" :model-value="currentPromptConfig?.id ?? '0'">
        <!-- Select Trigger has bug in headless, so use style to force setting it -->
        <template #trigger class="h-fit" style="background-color: transparent;color:var(--primary)">
          <PromptConfigInlineItem v-if="currentPromptConfig" :item="currentPromptConfig" />
          <PromptErrorInineItem v-else />
        </template>

        <template #content>
          <template v-if="promptConfigs" v-for="configItem in promptConfigs" :key="configItem.id">
            <SelectItem :value="configItem.id">
              <PromptConfigInlineItem :item="configItem" />
            </SelectItem>
          </template>
        </template>
      </Select>
    </div>




    <div class="grow" />

    <!-- right button area -->
    <slot name="right-buttons"></slot>
    <Button variant="github" size="sm-icon" @click="openExtSettingPage()">
      <SettingsIcon class="" />
    </Button>

  </div>
</template>

<script setup lang="ts">
import { sendMessage } from '@/messaging';
import { Select, SelectItem } from '@/src/components/custom-ui/select';
import { useExtInfo } from '@/src/composables/extension';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { usePromptConfigStorage } from '@/src/composables/prompt';
import { ModelConfigItem } from '@/src/types/config/model';
import { PromptConfigItem } from '@/src/types/config/prompt';
import { SettingsIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { t } from '@/src/utils/extension';
import icon from '~/assets/16.png';
import ModelConfigInlineItem from '../model/ModelConfigInlineItem.vue';
import ModelErrorInineItem from '../model/ModelErrorInineItem.vue';
import PromptConfigInlineItem from '../prompt/PromptConfigInlineItem.vue';
import PromptErrorInineItem from '../prompt/PromptErrorInineItem.vue';
import Button from '../ui/button/Button.vue';


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