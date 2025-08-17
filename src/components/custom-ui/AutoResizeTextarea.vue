<script setup lang="ts">
import { onMounted, ref, type HTMLAttributes } from 'vue'
import { cn } from '@/src/utils/shadcn'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
const textarea=ref<HTMLElement|null>()
function autoResize() {
  if(!textarea.value) return
  textarea.value.style.height = "auto"; // 先重置高度，防止高度不减少
  textarea.value.style.height = textarea.value.scrollHeight + "px"; // 根据内容设置高度
}

onMounted(()=>{
  autoResize()
})
</script>

<template>
  <textarea v-model="modelValue" ref="textarea"
    @input="autoResize"
    :class="cn('flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)" />
</template>
