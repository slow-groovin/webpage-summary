<template>
  <div class="bg-white p-8">

    <SummaryHeader v-if="defaultItem" v-model:current-item="defaultItem" :token-usage="mockTokenUsage"></SummaryHeader>
  </div>
</template>

<script setup lang="ts">
import SummaryHeader from '@/src/components/summary/SummaryHeader.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { ModelConfigItem } from '@/src/types/config/model';
import { TokenUsage } from '@/src/types/summary';
import { ref } from 'vue';
const { getDefaultItem } = useModelConfigStorage()
const defaultItem = ref<ModelConfigItem | null>()
getDefaultItem().then(r => defaultItem.value = r)

const mockTokenUsage: TokenUsage = {
  inputToken: 13515,
  outputToken: 535,
  cost: 0.00515,
  unit: "$"
}



</script>

<style scoped></style>