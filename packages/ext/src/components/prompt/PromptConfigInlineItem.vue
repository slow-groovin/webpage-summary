<script setup lang="ts">
import { PromptConfigItem } from '@/src/types/config/prompt';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { modelProviderPresets } from '@/src/presets/model-providers';
import { inject} from 'vue';
import { IS_SELECTED_KEY } from '@/src/constants/inject-key';

const props = defineProps<{
  item: PromptConfigItem
  isSelected?: boolean //if is selected, model name will not shown
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