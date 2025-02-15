<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { modelProviderPresets } from '@/src/presets/model-providers';
import { ref } from 'vue';

defineEmits<{
  selectProvider: [providerType: string]
}>()
const providerType = defineModel<string>('providerType')
</script>
<template>


  
  <div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-8 border rounded-lg p-2 min-w-[80vw]">
    <template v-for="m in modelProviderPresets">
      <Button @click="providerType = m.providerType"
        :class="{ 'bg-green-600 shadow-green-500 shadow text-white': providerType === m.providerType }"
        class="flex flex-row justify-start p-2 border border-neutral-800 rounded min-w-fit" variant="ghost">
        <div v-if="m.icon">
          <img :src="m.icon" alt="Model Icon" class="w-6 h-6" />
        </div>
        <div>{{ m.providerType }}</div>

      </Button>
    </template>
  </div>
  <h3 class=" text-sm font-semibold flex flex-col items-start gap-4">
    <span>Model Provider: </span>
    <div class="flex items-center gap-2 border border-neutral-500 rounded p-1">
      <img :src="modelProviderPresets[providerType as string].icon" alt="Model Icon" class="w-6 h-6" />
      <div class="  text-green-700">{{ providerType }} </div>
    </div>

  </h3>
</template>
<style lang="postcss" scoped></style>