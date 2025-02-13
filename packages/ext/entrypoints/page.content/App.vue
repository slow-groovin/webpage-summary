<!-- content entry, as a router -->
<script lang="ts" setup>
import DraggableContainer from '@/src/components/container/DraggableContainer.vue'
import ContentDebugPanelEntry from '@/src/components/debug/ContentDebugPanelEntry.vue'
import ErrorComponent from '@/src/components/status/ErrorComponent.vue'
import LoadingComponent from '@/src/components/status/LoadingComponent.vue'
import Summary from '@/src/pages/Summary.vue'
import {  defineAsyncComponent, ref } from 'vue'
const open=ref(false)
async function openDebugPanel() {
  open.value=!open.value
}
</script>

<template>
  <DraggableContainer class="z-[9999]">
    <template #header>
      <div class=" h-8 min-w-64 bg-gray-200 flex flex-row-reverse">
        <button @click="openDebugPanel">debug panel: {{ open }}</button>

      </div>
    </template>
    <div>
      <Summary></Summary>
    </div>

  </DraggableContainer>
  <div>
    <ContentDebugPanelEntry v-if="open"></ContentDebugPanelEntry>
  </div>
</template>

<style scoped>
</style>
