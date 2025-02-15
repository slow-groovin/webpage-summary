<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import DraggableContainer from '../container/DraggableContainer.vue';
import LoadingComponent from '../status/LoadingComponent.vue';
import ErrorComponent from '../status/ErrorComponent.vue';
import DebugPanel from './DebugPanel.vue';
// let DebugPanel = defineAsyncComponent({
//   // 加载函数
//   loader: () => {
//     return import('@/src/components/debug/DebugPanel.vue')
//   },

//   // 加载异步组件时使用的组件
//   loadingComponent: LoadingComponent,
//   // 展示加载组件前的延迟时间，默认为 200ms
//   delay: 200,

//   // 加载失败后展示的组件
//   errorComponent: ErrorComponent,
//   // 如果提供了一个 timeout 时间限制，并超时了
//   // 也会显示这里配置的报错组件，默认值是：Infinity
//   timeout: 3000
// }) // 用于存储异步组件

</script>

<template>

  <DraggableContainer>
    <template #header>
      <div class=" h-8 min-w-64 bg-blue-500 flex flex-row-reverse">
      </div>
    </template>
    
      <DebugPanel />
  </DraggableContainer>


</template>

<style scoped></style>
