<!-- content entry, as a router -->
<script lang="ts" setup>
import DraggableContainer from '@/src/components/container/DraggableContainer.vue'
import SeparationComponentInContentDebug from '@/src/components/debug/SeparationComponentInContentDebug.vue'
// import ContentDebugPanelEntry from '@/src/components/debug/ContentDebugPanelEntry.vue'
import ErrorComponent from '@/src/components/status/ErrorComponent.vue'
import LoadingComponent from '@/src/components/status/LoadingComponent.vue'
import Summary from '@/src/components/summary/Summary.vue'
import Toaster from '@/src/components/ui/toast/Toaster.vue'
import { defineAsyncComponent, ref } from 'vue'
const open = ref(false)
async function openDebugPanel() {
  open.value = !open.value
}
</script>

<template>
  <div class="relative z-[9999] user-setting-style">
    <Toaster />
    <!-- <DraggableContainer v-if="false" >
      <template #header>
        <div class=" h-8 min-w-64 bg-gray-200 flex flex-row-reverse">
          <button @click="openDebugPanel">debug panel: {{ open }}</button>

        </div>
      </template>
<div>
  <Summary></Summary>
</div>

</DraggableContainer> -->
      <Summary class="top-16 right-16" />

    <!-- <div class="fixed top-[50vh] right-[50vw] bg-white min-h-96 min-w-96 border rounded">
      <SeparationComponentInContentDebug/>
    </div> -->
  </div>
</template>

<style scoped></style>
