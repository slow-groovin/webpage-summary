<template>
  <SummaryHeader v-if="defaultItem" v-model:current-item="defaultItem"></SummaryHeader>
  currentItem: {{ defaultItem }}
</template>

<script setup lang="ts">
import SummaryHeader from '@/src/components/summary/SummaryHeader.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { ModelConfigItem } from '@/src/types/config/model';
import { ref } from 'vue';
const {getDefaultItem}=useModelConfigStorage()
const defaultItem=ref<ModelConfigItem|null>()
getDefaultItem().then(r=>defaultItem.value=r)



</script>

<style scoped>

</style>