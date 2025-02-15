<script setup lang="ts">
import ErrorComponent from '@/src/components/status/ErrorComponent.vue'
import LoadingComponent from '@/src/components/status/LoadingComponent.vue'
import { Component, ref, defineAsyncComponent, onMounted } from 'vue'
import DebugPanel from '@/src/components/debug/DebugPanel.vue'

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
//   timeout: 30000
// }) // 用于存储异步组件

// </script>
<template>
  <h1>debug page</h1>
  <DebugPanel></DebugPanel>



</template>