<script setup lang="ts">
import { HTMLAttributes, inject, Ref } from 'vue';
import { cn } from '@/src/utils/shadcn';
import { CheckIcon } from 'lucide-vue-next';

interface Props {
  value: any;
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'select', value: any): void;
}>();

const handleSelect = inject('select')
const selectedValue=inject<Ref<any>>('selected-value')
const handleClick = () => {
  // emit('select', props.value); // 不需要emit事件了
  if(handleSelect && typeof handleSelect === 'function'){
    handleSelect(props.value)
  }
};

</script>

<template>
  <li
    :class="cn('flex flex-row flex-nowrap items-center px-4 py-2 hover:bg-gray-100 cursor-pointer', props.class)"
    role="menuitem"
    @click="handleClick"
  >
    <CheckIcon v-if="selectedValue===value" :class="{'ml-[-1rem] w-4 h-4':selectedValue===value}"/>
    <slot />
  </li>
</template>