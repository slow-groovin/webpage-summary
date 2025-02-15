<script setup lang="ts">
/*
 * Prompt: 请生成这个显示token usage的 vue3组件
 * 组件简介: 用于显示 API 调用的 token 使用情况。
 */
import type { TokenUsage } from '../../types/summary';
import { cn } from "@/src/utils/shadcn";
import type { HTMLAttributes } from 'vue';

defineProps<{
  usage: TokenUsage;
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <!-- 显示 token 使用情况的容器 -->
  <div :class="cn('flex items-center gap-2 font-xs', $props.class)">
    
    <!-- 显示 Tokens 使用情况 -->
    <span class="flex items-center">
      <span class=" font-extrabold">↑</span>
      {{ usage.inputToken }}
    </span>
    <span class="flex items-center">
      <span class="">↓</span>
      {{ usage.outputToken }}
    </span>
    <!-- 如果有 cost，显示 API Cost -->
    <div v-if="usage.cost">
      {{ usage.unit ?? '$' }}{{ usage.cost.toFixed(5) }}
    </div>
  </div>
</template>