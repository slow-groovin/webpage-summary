<script setup lang="ts">
import { PromptConfigItem } from '@/src/types/config/prompt';

const props = defineProps<{
  item: PromptConfigItem
}>()
</script>
<template>

  <div class="flex items-center gap-1">
    
    <div class="flex flex-col text-xs max-w-32 ">
      <div class="overflow-x-hidden text-nowrap text-ellipsis" :title="item.systemMessage">
        {{ item.name }}
      </div>

    </div>

  </div>

</template>