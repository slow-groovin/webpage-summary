<template>
  <ResizablePanelGroup id="vertical-demo-group-1" direction="vertical" class="min-h-[200px] max-w-md rounded-lg border">
    <ResizablePanel id="vertical-demo-panel-1" :default-size="25">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Header</span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="vertical-demo-handle-1" />
    <ResizablePanel id="vertical-demo-panel-2" :default-size="75">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Content</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>

  <!-- manual impl resize -->
  <div ref="resizableDiv" class="overflow-auto relative w-32 h-32 border" @mousedown="startResize">

    <div class="absolute bottom-0 left-0 w-full h-2 bg-gray-400 cursor-ns-resize"
      @mousedown.stop.prevent="startResize($event, 'vertical')"></div>
    <div class="absolute top-0 right-0 w-2 h-full bg-gray-400 cursor-ew-resize"
      @mousedown.stop.prevent="startResize($event, 'horizontal')"></div>
  </div>

  <!-- encapsulate container -->
  <ResizableContainer>
    <div class="w-full h-full min-w-32 min-h-32 bg-red-500"></div>
  </ResizableContainer>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, onMounted } from 'vue';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import ResizableContainer from '../container/ResizableContainer.vue';

const resizableDiv = ref<HTMLDivElement | null>(null);
const isResizing = ref(false);
const startX = ref(0);
const startY = ref(0);
const startWidth = ref(0);
const startHeight = ref(0);
const resizeDirection = ref<'horizontal' | 'vertical' | 'both'>('both');

const startResize = (
  event: MouseEvent,
  direction: 'horizontal' | 'vertical' | 'both' = 'both'
) => {
  isResizing.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;
  startWidth.value = resizableDiv.value!.offsetWidth;
  startHeight.value = resizableDiv.value!.offsetHeight;
  resizeDirection.value = direction;
  event.preventDefault();
  // event.stopPropagation(); // 阻止事件冒泡
};

const resize = (event: MouseEvent) => {
  if (!isResizing.value) return;

  const diffX = event.clientX - startX.value;
  const diffY = event.clientY - startY.value;

  if (
    resizeDirection.value === 'horizontal' ||
    resizeDirection.value === 'both'
  ) {
    resizableDiv.value!.style.width = `${startWidth.value + diffX}px`;
  }
  if (
    resizeDirection.value === 'vertical' ||
    resizeDirection.value === 'both'
  ) {
    resizableDiv.value!.style.height = `${startHeight.value + diffY}px`;
  }
};

const stopResize = () => {
  isResizing.value = false;
};

onMounted(() => {
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
});
</script>

<style scoped>
/* 改变滚动条的整体宽度 */
::-webkit-scrollbar {
  width: 12px;
  /* 水平滚动条的高度可以设置 height */
  height: 12px;
  /* 垂直滚动条的宽度可以设置 width */
}
</style>