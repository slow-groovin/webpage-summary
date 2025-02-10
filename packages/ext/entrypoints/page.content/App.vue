<!-- content entry, as a router -->
<script lang="ts" setup>
import DraggableContainer from '@/src/components/container/DraggableContainer.vue'
import Summary from '@/src/pages/Summary.vue'
import { Component, defineAsyncComponent, ref } from 'vue'
let ContentDebugPanel:Component|null = null // 用于存储异步组件
const isDebugPanelComponentLoaded=ref(false)
async function openDebugPanel() {
  if (!ContentDebugPanel) {
    // 异步导入组件
    ContentDebugPanel =defineAsyncComponent(() => import('@/src/components/debug/ContentDebugPanel.vue'))
    isDebugPanelComponentLoaded.value = true // 设置组件加载状态
  }else{
    isDebugPanelComponentLoaded.value=!isDebugPanelComponentLoaded.value
  }
}
</script>

<template>
  <DraggableContainer class="z-[9999]">
    <template #header>
      <div class=" h-8 min-w-64 bg-gray-200 flex flex-row-reverse">
        <button @click="openDebugPanel">debug panel</button>

      </div>
    </template>
    <div>
      <Summary></Summary>
    </div>

  </DraggableContainer>
  <div>
    <ContentDebugPanel v-if="isDebugPanelComponentLoaded"/>
  </div>
</template>

<style scoped>
</style>
