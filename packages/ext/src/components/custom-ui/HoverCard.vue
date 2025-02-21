<script setup lang="ts">
/*
 * Prompt: 请参考Select.vue实现一个HoverCard.vue
 * 简介: HoverCard组件在鼠标悬停在触发元素上时显示内容。
 */
import { ref, HTMLAttributes } from 'vue';
import { cn } from '@/src/utils/shadcn';

interface HoverCardProps {
  class?: HTMLAttributes['class'];
  openDelay?: number;
  closeDelay?: number;
}

const { class: clazz, closeDelay: closeDelay = 100, openDelay: openDelay = 100 } = withDefaults(defineProps<HoverCardProps>(), {
});

const isOpen = ref(false);
let timer: any = null;
function setOpen() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    isOpen.value = true;
  }, openDelay)

}

function setClose() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    isOpen.value = false;
  }, closeDelay)
}


</script>

<template>
  <div :class="cn('relative', clazz)" @mouseenter="setOpen()" @mouseleave="setClose()">
    <!-- use #trigger or #default are both ok -->
    <slot name="trigger" />
    <slot name="default" />


    <!--  -->
    <div v-show="isOpen" class="absolute  text-nowrap rounded-md border bg-popover text-popover-foreground shadow-md">
      <slot name="content" />
    </div>
    <!-- #custom-content is for custom positon -->
    <slot name="custom-content" v-if="isOpen" />
  </div>
</template>

<style scoped></style>