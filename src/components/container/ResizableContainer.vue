<template>
  <div
    ref="resizableContainer"
    class="relative border"
    @mousedown.stop="startResize($event)"
  >
    <div
      v-if="enableTopResize"
      class="absolute top-0 left-0 w-full h-2 bg-transparent cursor-ns-resize"
      @mousedown.stop.prevent="startResize($event, 'top')"
    ></div>
    <div
      v-if="enableRightResize"
      class="absolute top-0 right-0 w-2 h-full bg-transparent cursor-ew-resize"
      @mousedown.stop.prevent="startResize($event, 'right')"
    ></div>
    <div
      v-if="enableBottomResize"
      class="absolute bottom-0 left-0 w-full h-2 bg-transparent cursor-ns-resize"
      @mousedown.stop.prevent="startResize($event, 'bottom')"
    ></div>
    <div
      v-if="enableLeftResize"
      class="absolute top-0 left-0 w-2 h-full bg-transparent cursor-ew-resize"
      @mousedown.stop.prevent="startResize($event, 'left')"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义props
const props = withDefaults(
  defineProps<{
    enableTopResize?: boolean;
    enableRightResize?: boolean;
    enableBottomResize?: boolean;
    enableLeftResize?: boolean;
  }>(),
  {
    enableTopResize: true,
    enableRightResize: true,
    enableBottomResize: true,
    enableLeftResize: true,
  }
);

// 定义响应式变量
const resizableContainer = ref<HTMLDivElement | null>(null);
const isResizing = ref(false);
const startX = ref(0);
const startY = ref(0);
const startWidth = ref(0);
const startHeight = ref(0);
const resizeDirection = ref<
  'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft'
>('bottomRight');

// 开始调整大小
const startResize = (event: MouseEvent, direction?: string) => {
  isResizing.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;
  startWidth.value = resizableContainer.value!.offsetWidth;
  startHeight.value = resizableContainer.value!.offsetHeight;
  resizeDirection.value = direction as 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft' || 'bottomRight';
  event.preventDefault();
};

// 调整大小
const resize = (event: MouseEvent) => {
  if (!isResizing.value) return;

  const diffX = event.clientX - startX.value;
  const diffY = event.clientY - startY.value;

  if (
    resizeDirection.value === 'right' ||
    resizeDirection.value === 'bottomRight' ||
    resizeDirection.value === 'topRight'
  ) {
    resizableContainer.value!.style.width = `${startWidth.value + diffX}px`;
  }
  if (
    resizeDirection.value === 'left' ||
    resizeDirection.value === 'bottomLeft' ||
    resizeDirection.value === 'topLeft'
  ) {
    resizableContainer.value!.style.width = `${startWidth.value - diffX}px`;
    resizableContainer.value!.style.left = `${resizableContainer.value!.offsetLeft + diffX}px`;
  }
  if (
    resizeDirection.value === 'bottom' ||
    resizeDirection.value === 'bottomRight' ||
    resizeDirection.value === 'bottomLeft'
  ) {
    resizableContainer.value!.style.height = `${startHeight.value + diffY}px`;
  }
  if (
    resizeDirection.value === 'top' ||
    resizeDirection.value === 'topRight' ||
    resizeDirection.value === 'topLeft'
  ) {
    resizableContainer.value!.style.height = `${startHeight.value - diffY}px`;
    resizableContainer.value!.style.top = `${resizableContainer.value!.offsetTop + diffY}px`;
  }
};

// 停止调整大小
const stopResize = () => {
  isResizing.value = false;
};

// 添加事件监听器
onMounted(() => {
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
});

// 移除事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
});
</script>