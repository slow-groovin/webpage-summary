<template>
  <!-- Loading Skeleton -->
  <div v-if="loading" class="h-16 w-16 animate-spin border-4 border-t-transparent border-green-500 rounded-full">

  </div>

  <!-- Image -->
  <img v-show="!loading" :src="src" :alt="alt" @load="onLoad" @error="onError" :class="imageClass" />

</template>

<script setup lang="ts">
/**
 * Prompt: 封装一个可以显示图片加载过程的组件。
 *
 * StatefulImage 组件用于显示带有加载状态的图片。
 * 它会在图片加载时显示一个加载指示器，加载成功后显示图片，加载失败时显示错误信息。
 */
import { ref, onMounted, HTMLAttributes } from 'vue';

const { class: imageClass,timeout } = defineProps<{
  src: string;
  timeout?: number,
  alt?: string;
  class?: HTMLAttributes['class'];
  errorMessage?: string;
}>();

const isError = defineModel('isError')
const loading = ref(true);
let timeoutTimer:null|number=null;
const onLoad = () => {
  loading.value = false;
  if(timeoutTimer){
    clearTimeout(timeoutTimer)
  }
};

const onError = () => {
  loading.value = false;
  isError.value = true
};

onMounted(() => {
  // 初始状态设置为加载中，避免图片过快加载导致 loading 状态闪烁
  loading.value = true;
  isError.value = false
  if(timeout){
    //@ts-ignore
    timeoutTimer=setTimeout(()=>{
      isError.value=true;
    },timeout)  
  }
});
</script>
