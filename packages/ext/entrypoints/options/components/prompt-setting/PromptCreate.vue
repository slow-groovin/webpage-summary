<!-- create prompt item -->
<script setup lang="ts">
import { usePromptConfigStorage } from '@/src/composables/prompt';
import PromptEditComponent from './PromptEditComponent.vue';
import { PromptConfigItem } from '@/src/types/config/prompt';
import { uid } from 'radash';
import { toast, ToastAction } from '@/src/components/ui/toast';
import { useRouter } from 'vue-router';
import { h } from 'vue'
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

    }, 2500)

    toast({
      variant: 'default',
      title: 'success! Will go to list page in 3 sencords',
      action: h(ToastAction, {
        altText: 'Cancel',
        onClick: () => { clearTimeout(timer) }
      }, {
        default: () => 'Cancel',
      }),

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