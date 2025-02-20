<!--
Prompt: 创建一个悬浮球组件:
一直吸附于最右侧, 可以移动, 但是松开鼠标后会自动移动到最右端.
hover时出现说明.
有一个关闭按钮

简介: 这是一个可拖动的悬浮球组件，始终吸附在屏幕右侧，并在鼠标悬停时显示说明。
-->
<script lang="ts" setup>
import { cn } from '@/src/utils/shadcn';
import { CircleXIcon } from 'lucide-vue-next';
import { HTMLAttributes, computed, onMounted, ref } from 'vue';
import HoverCard from '../custom-ui/HoverCard.vue';
import Button from '../ui/button/Button.vue';
import { sleep } from 'radash';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  initClosedBtnHidden?: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>()


const isCloseBtnHidden = ref(!!props.initClosedBtnHidden)
const isClose=ref(false)

/*
 * drag control:
 */

const isDragging = ref(false);
const initialMousePosition = ref({ x: 0, y: 0 });
const elementWidth = ref(0);
const elementHeight = ref(0);
const windowWidth = ref(0);
const windowHeight = ref(0);
const THRESHOLD = 10;

const floatingBall = ref<HTMLElement | null>(null);
// 计算吸附位置
const containerStyle = computed(() => {
  if (isDragging.value) {
    return {};
  }
  return {
    right: `${THRESHOLD}px`, // 吸附右侧
  };
});

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  initialMousePosition.value = { x: event.clientX, y: event.clientY };
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
};

const drag = (event: MouseEvent) => {
  if (isDragging.value && floatingBall.value) {
    let newX = floatingBall.value.offsetLeft + (event.clientX - initialMousePosition.value.x);
    let newY = floatingBall.value.offsetTop + (event.clientY - initialMousePosition.value.y);

    // 边界控制
    if (newX < 0) {
      newX = 0;
    } else if (newX + elementWidth.value + THRESHOLD > windowWidth.value) {
      newX = windowWidth.value - elementWidth.value - THRESHOLD;
    }

    if (newY < 0) {
      newY = 0;
    } else if (newY + elementHeight.value + THRESHOLD > windowHeight.value) {
      newY = windowHeight.value - elementHeight.value - THRESHOLD;
    }

    floatingBall.value.style.left = newX + 'px';
    floatingBall.value.style.top = newY + 'px';

    initialMousePosition.value = { x: event.clientX, y: event.clientY };
  }
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);

  // 松开鼠标后自动吸附到右侧
  if (floatingBall.value) {
    floatingBall.value.style.removeProperty('left')
    floatingBall.value.style.right = '0px'; // 清除x轴位置
  }
};

async function delayHiddenCloseBtn(){
  await sleep(100)
  isCloseBtnHidden.value=false
}

onMounted(() => {
  if (floatingBall.value) {
    elementWidth.value = floatingBall.value.clientWidth;
    elementHeight.value = floatingBall.value.clientHeight;
  }
});

// 关闭
function close() {
  isClose.value=true
  emit('close')
}
</script>

<template>
  <div v-if="!isClose" ref="floatingBall"
    :class="cn('fixed top-1/2  right-0  z-50 rounded-full p-2 aspect-square', containerStyle, props.class)"
    :style="{ cursor: isDragging ? 'grabbing' : 'pointer' }" @mousedown="startDrag" @mouseover="delayHiddenCloseBtn"
    @mouseout="isCloseBtnHidden = true">
    <!-- 关闭按钮 -->
    <Button variant="ghost" size="sm-icon" @click.stop="close"
      class=" absolute p-0 w-4 h-4 top-0 left-0 rounded-full text-white bg-neutral-400/80 hover:bg-neutral-500 hover:text-white" :class="{ 'hidden': isCloseBtnHidden }">
      <CircleXIcon class="h-4 w-4" />
    </Button>
    <slot>
      <!-- 默认内容 -->
      <div class="h-full w-full rounded-full bg-primary flex items-center justify-center">
        <!-- 这里可以放一个图标 -->
      </div>
    </slot>

  </div>
  
</template>

<style scoped></style>