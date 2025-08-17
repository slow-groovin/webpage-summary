<script setup lang="ts">
import { ref, computed } from 'vue';
import Input from '@/src/components/ui/input/Input.vue';

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
  (e: 'edit'): void;
}>();

const isEditing = ref(false);
const internalValue = ref(props.modelValue || props.defaultValue || '');

const toggleEditing = () => {
  isEditing.value = !isEditing.value;
  emit('edit')
};

const confirmEdit = () => {
  emit('update:modelValue', internalValue.value);
  isEditing.value = false;
};

const inputClass = computed(() => {
  return isEditing.value ? '' : 'cursor-not-allowed';
});
</script>

<template>
  <div class="flex items-center">
    <Input
      v-bind="$attrs"
      :model-value="internalValue"
      :class="inputClass"
      :disabled="!isEditing"
      @update:model-value="internalValue = $event"
    />

    <button v-if="!isEditing" @click="toggleEditing" class="ml-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
      Edit
    </button>
    <button v-else @click="confirmEdit" class="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
      ✓
    </button>
  </div>
</template>
