<!-- show all prompts and main settings -->

<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { usePromptConfigStorage } from '@/src/composables/prompt';

const {listItem,updateConfigOrder,updateDefaultConfig}=usePromptConfigStorage()

</script>
<template>
  
  <div>
    <!-- button -->
    <div>
      <RouterLink to="/prompts/create">
        <Button>create one</Button>
      </RouterLink>
    </div>
    <!-- list -->
    <div>

      
    </div>
  </div>
</template>