<!--
 * @description: 用于可视化显示 tailwind.css 中定义的颜色变量的测试组件。
 * @Prompt: 请生成一个 Vue 组件，方便查看 tailwind.css 文件中定义的颜色变量。
 -->
<script setup lang="ts">
import { cn } from '@/src/utils/shadcn'
import { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const colorKeys = [
  'background',
  'foreground',
  'muted',
  'muted-foreground',
  'popover',
  'popover-foreground',
  'card',
  'card-foreground',
  'border',
  'input',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'ring',
  'sidebar-background',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
]
</script>

<template>
  <div :class="cn('flex flex-col gap-4 bg-white p-4', props.class)">
    <!-- Light Mode Colors -->
    <div>
      <h2 class="text-xl font-bold">Light Mode</h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="key in colorKeys" :key="key" class="p-4 rounded-md shadow-md">
          <div :style="{ backgroundColor: `hsl(var(--${key}))` }" class="h-12 w-full rounded-md"></div>
          <div class="mt-2">
            --{{ key }}
          </div>
        </div>
      </div>
    </div>

    <!-- Dark Mode Colors -->
    <div>
      <h2 class="text-xl font-bold">Dark Mode</h2>
      <div class="grid grid-cols-3 gap-4 dark">
        <div v-for="key in colorKeys" :key="key" class="p-4 rounded-md shadow-md">
          <div :style="{ backgroundColor: `hsl(var(--${key}))` }" class="h-12 w-full rounded-md"></div>
          <div class="mt-2">
            --{{ key }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>