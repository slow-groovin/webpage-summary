<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { modelProviderPresets } from '@/src/presets/model-providers';
import { ref } from 'vue';

defineEmits<{
  selectProvider: [providerType:string]
}>()

</script>
<template>

  <div class="flex flex-col space-y-4 items-stretch w-fit">
    <template v-for="m in modelProviderPresets">
      <Button @click="$emit('selectProvider', m.providerType)" class="flex flex-row justify-start p-2 border rounded shadow" variant="ghost">
        <div v-if="m.icon">
          <img :src="m.icon" alt="Model Icon" class="w-6 h-6" />
        </div>
        <div>{{ m.providerType }}</div>
        
      </Button>
    </template>
  </div>
</template>
<style lang="postcss" scoped></style>