<script setup lang="ts">
import { ref } from 'vue';
import ModelProviderSelect from '../components/model-setting/ModelProviderSelect.vue';
import InputConfigAndSubmitModel from '../components/model-setting/InputConfigAndSubmitModel.vue';
import Button from '@/src/components/ui/button/Button.vue';
import ConfigsList from '../components/model-setting/ConfigsList.vue';

const isSelecting = ref(false)
const isConfiging = ref(false)
const selectProviderType = ref('')
function onSelectProviderType(modelName: string) {
  isSelecting.value = false
  isConfiging.value = true
  selectProviderType.value = modelName
}

async function onNewModelConfigCreated() {
  isSelecting.value = false

  isConfiging.value = false
}
</script>
<template>
  <h1 class="text-2xl p-2 ">ModelProviderSetting</h1>

  <Button @click="() => { isSelecting = true; isConfiging = false }">create a provider config</Button>
  <div class="border rounded p-4">
    <ModelProviderSelect v-if="isSelecting" @select-provider="(providerType) => onSelectProviderType(providerType)">
    </ModelProviderSelect>
    <InputConfigAndSubmitModel v-if="isConfiging" @created="onNewModelConfigCreated()"
      :provider-type="selectProviderType"></InputConfigAndSubmitModel>
    <div v-if="!isConfiging && !isSelecting">
      <ConfigsList />
    </div>
  </div>
</template>
<style lang="postcss" scoped></style>