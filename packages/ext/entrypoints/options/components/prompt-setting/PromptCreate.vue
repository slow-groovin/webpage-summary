<!-- create prompt item -->
<script setup lang="ts">
import { toast } from '@/src/components/ui/toast';
import { usePromptConfigStorage } from '@/src/composables/prompt';
import { PromptConfigItem } from '@/src/types/config/prompt';
import { uid } from 'radash';
import { useRouter } from 'vue-router';
import PromptEditComponent from './PromptEditComponent.vue';
const { createItem } = usePromptConfigStorage()
const { push } = useRouter()
async function onSubmit(name: string, systemMessage: string, userMessage: string) {

  const newItem: PromptConfigItem = {
    id: uid(16),
    name,
    systemMessage,
    userMessage,
    at: Date.now(),
  }

  const rs = await createItem(newItem)
  if (!rs) {
    toast({
      variant: 'destructive',
      title: 'Scheduled: Catch up',
    });
  } else {
    const timer = setTimeout(() => {
      push('/prompts')

    }, 500)

    toast({
      variant: 'default',
      title: 'create success! ',
    });

  }


}
</script>
<template>
  <h1>create new template</h1>
  <div>
    <PromptEditComponent @submit="onSubmit" />
  </div>
</template>