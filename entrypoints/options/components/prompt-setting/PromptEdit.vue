<!-- create prompt item -->
<script setup lang="ts">
import ErrorComponent from '@/src/components/status/ErrorComponent.vue';
import { toast } from '@/src/components/ui/toast';
import { usePromptConfigStorage } from '@/src/composables/prompt';
import { PromptConfigItem } from '@/src/types/config/prompt';
import { t } from '@/src/utils/extension';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PromptEditComponent from './PromptEditComponent.vue';
const { updateItem, getItem } = usePromptConfigStorage()
const { query: { id } } = useRoute()
const { push } = useRouter()
const editedItem = ref<PromptConfigItem | null | undefined>(undefined)
onMounted(() => {
  getItem(id as string).then((item) => {
    if (!item) {
      toast({
        title: 'record not found!',
        variant: 'destructive'
      })
    }
    editedItem.value = item
  })
})

async function onSubmit(name: string, systemMessage: string, userMessage: string) {
  if (!editedItem.value) {
    alert('null update')
    return
  }
  editedItem.value.name = name
  editedItem.value.systemMessage = systemMessage
  editedItem.value.userMessage = userMessage


  const rs = await updateItem(editedItem.value)

  if (!rs.isSuc) {
    toast({
      variant: 'destructive',
      title: 'Failed',
      description: `update ${name} failed: ${rs.msg}`
    });
  } else {
    //success, toast and return to list
    setTimeout(() => {
      toast({
        variant: 'success',
        title: `update ${name} success!`,
      });

    }, 50)
    push('/prompts')

  }


}
</script>
<template>
  <div>
    <PromptEditComponent v-if="editedItem" :item="editedItem" @submit="onSubmit">
      <template #header>
        <h1>{{ t('Edit_Template') }}</h1>
      </template>

    </PromptEditComponent>
    <ErrorComponent v-else-if="editedItem === null" :message="'Not found'" />
  </div>
</template>