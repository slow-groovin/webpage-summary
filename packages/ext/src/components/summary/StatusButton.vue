<script setup lang="ts">
/*
 * @description: 根据状态显示不同的按钮，并定义对应的事件
 * @Prompt: 输入一个props status, 在preparing时用效果`...左右移动`,在首次ready时呈现`<PlayButton> Summary`按钮, 在非首次ready时呈现`<Refresh Button>` 在Running时呈现 `circling rotate` 在Failed时呈现 `<Warning Style Info Inspect Button>`, 并定义对应的事件
 */
import { PlayIcon, RotateCwIcon, InfoIcon, CircleStop } from 'lucide-vue-next';
import { Button } from '../ui/button';
import { cn } from '@/src/utils/shadcn';
import { computed, ref } from 'vue';
import EllipsisAnim from '../status/EllipsisAnim.vue';
import { useEnableAutoBeginSummary } from '@/src/composables/general-config';
const props = defineProps<{
  status: 'preparing' | 'ready' | 'running' | 'failed';
}>();
const {enableAutoBeginSummary}=useEnableAutoBeginSummary()
const isFirstClickDone = ref(false)
const showRefresh=computed(()=>enableAutoBeginSummary.value || isFirstClickDone.value)
const emit = defineEmits<{
  (e: 'stop'): void;
  (e: 'refresh'): void;
  (e: 'viewFailedReason'): void;
}>();
</script>

<template>
  <!-- 准备中 -->

  <template v-if="props.status === 'preparing' ">
    <EllipsisAnim class="w-4" title="loading config" />
    
  </template>

  <template v-else-if="status === 'failed'">
    <Button variant="ghost" size="icon" class="border-0 px-1 gap-0 flex items-center"
      @click="emit('viewFailedReason')">
      <InfoIcon class="text-red-500" />
    </Button>
    <Button variant="outline" size="icon" class="ml-2 aspect-square px-1 gap-0 flex items-center h-8 leading-8"
      @click="emit('refresh')">
      <RotateCwIcon />
    </Button>

  </template>
  <template v-else-if="status === 'running'">
    <div class="w-6 h-6 border-2 border-t-2  border-t-green-800 border-solid rounded-full animate-spin"></div>
    <Button variant="outline" size="sm-icon" class="ml-2 border-2  bg-neutral-100 p-1 aspect-square rounded-full flex items-center "
      @click="emit('stop')">
      <div class="w-3 h-3 aspect-square bg-red-500"></div>
    </Button>
  </template>

  <template v-else-if="status === 'ready' && showRefresh">
    <Button variant="outline" size="icon" class="aspect-square px-1 gap-0 flex items-center h-8 leading-8"
      @click="emit('refresh')">

      <RotateCwIcon />
    </Button>


  </template>

  <template v-else-if="status === 'ready' && !showRefresh">
    <Button variant="outline" size="icon" class="w-fit px-1 gap-0 flex items-center h-8 leading-8"
      @click="()=>{isFirstClickDone=true;emit('refresh')}">
      <PlayIcon />Summary
    </Button>


  </template>


  <template v-else>
    {{ status }}

  </template>

</template>

<style scoped>

</style>