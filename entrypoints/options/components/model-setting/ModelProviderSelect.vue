<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { modelProviderPresets, ProviderKey } from '@/src/presets/model-providers';
import { t } from '@/src/utils/extension';
import { ref } from 'vue';

defineEmits<{
  selectProvider: [providerType: ProviderKey]
}>()
const providerType = defineModel<ProviderKey>('providerType')
</script>
<template>


  <details open>
    <summary>providers</summary>
    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(20em,1fr))] gap-2 border rounded-lg p-2 max-w-[calc(100vw-16em)]">
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
  </details>

  <h3 class="mx-auto text-sm font-semibold flex flex-row items-center gap-4">
    <span>{{ t('Selected_Model_Provider') }}: </span>
    <div class="flex items-center gap-1 border border-neutral-500 rounded p-1">
      <img :src="modelProviderPresets[providerType!].icon" alt="Model Icon" class="w-6 h-6" />
      <div class="">{{ providerType }} </div>
    </div>

  </h3>
</template>
<style lang="postcss" scoped></style>