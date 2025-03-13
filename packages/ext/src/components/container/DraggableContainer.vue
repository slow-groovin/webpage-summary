<script lang="ts" setup>
import { ref, onMounted, HTMLAttributes } from 'vue';
import { cn } from '@/src/utils/shadcn';

const { class: clazz } = defineProps<{
  class?: HTMLAttributes['class']
}>()

const isDragging = ref(false);
const initialMousePosition = ref({ x: 0, y: 0 });
const elementWidth = ref(0);
const elementHeight = ref(0);
const windowWidth = ref(0);
const windowHeight = ref(0);
const THRESHOLD = 10

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  initialMousePosition.value = { x: event.clientX, y: event.clientY };
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
};


const drag = (event: MouseEvent) => {
  if (isDragging.value && dragContainer.value) {
    let newX = dragContainer.value.offsetLeft + (event.clientX - initialMousePosition.value.x);
    let newY = dragContainer.value.offsetTop + (event.clientY - initialMousePosition.value.y);

    // Keep within bounds
    if (newX < 0) {
      newX = 0;
    } else if (newX + elementWidth.value + THRESHOLD > windowWidth.value) {
      newX = windowWidth.value - elementWidth.value - THRESHOLD;
    }

    if (newY < 0) {
      newY = 0;
    } else if (newY + THRESHOLD > windowHeight.value) {
      newY = windowHeight.value - THRESHOLD;
    }

    dragContainer.value.style.left = (100 * newX / window.innerWidth) + '%'
    dragContainer.value.style.top = (100 * newY / window.innerHeight) + '%'

    initialMousePosition.value = { x: event.clientX, y: event.clientY };
  }
};
/*
 *  There is a rarely bug in dragging, when window length is too small, dragging of horizontal axis will not work normally, the reason is still unknown
 */

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);
};

const dragContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  // Get element width and height
  if (dragContainer.value) {
    elementWidth.value = dragContainer.value.clientWidth;
    elementHeight.value = dragContainer.value.clientHeight;
  }
});

//
</script>

<template>
  <div ref="dragContainer" :class="cn('fixed top-0 right-0 w-fit', clazz)">
    <div class="" :class="{ 'hover:cursor-move': !isDragging, 'cursor-grabbing hover:cursor-grabbing': isDragging }"
      @mousedown="startDrag">
      <slot name="header">
        <div class="h-8 bg-gray-500 w-full rounded">
        </div>
      </slot>
    </div>


    <slot></slot>
  </div>
</template>

<style scoped></style>
