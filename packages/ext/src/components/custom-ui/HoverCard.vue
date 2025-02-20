<script setup lang="ts">
/*
 * Prompt: 请参考Select.vue实现一个HoverCard.vue
 * 简介: HoverCard组件在鼠标悬停在触发元素上时显示内容。
 */
import { ref, HTMLAttributes } from 'vue';
import { cn } from '@/src/utils/shadcn';

interface HoverCardProps {
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<HoverCardProps>(), {
});

const isOpen = ref(false);

const toggleOpen = (open: boolean) => {
  isOpen.value = open;
};

</script>

<template>
  <div :class="cn('relative', props.class)">
    <!-- use #trigger or #default are both ok -->
    <div @mouseenter="toggleOpen(true)" @mouseleave="toggleOpen(false)">
      <slot name="trigger" />
    </div>

    <div @mouseenter="toggleOpen(true)" @mouseleave="toggleOpen(false)">
      <slot name="default" />
    </div>

    <!--  -->
    <div v-show="isOpen" class="absolute  text-nowrap rounded-md border bg-popover text-popover-foreground shadow-md">
      <slot name="content" />
    </div>
    <!-- #custom-content is for custom positon -->
    <slot name="custom-content" v-if="isOpen" />
  </div>
</template>

<style scoped></style>