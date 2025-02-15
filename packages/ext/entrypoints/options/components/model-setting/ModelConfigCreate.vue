<script setup lang="ts">
import { ModelConfigItem } from '@/src/types/config/model';
import ModelConfigEditComponent from './ModelConfigEditComponent.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { toast } from '@/src/components/ui/toast';
import { useRouter } from 'vue-router';
import { ArgumentsType } from '@vueuse/core';
import { uid } from 'radash';
const { createItem, isNameExist } = useModelConfigStorage()
const {push}=useRouter()
async function submitCreate(value: Omit<ModelConfigItem,'id'>) {
  const newModelConfig={
    ...value,
    id: uid(16),
  }
  const rs = await createItem(newModelConfig)
  if (!rs) {
    toast({ title: `create failed.`, variant: 'destructive' })
  } else {
    toast({ title: `create suc.`, variant:'success' })
    push('/models/')
  }
}
</script>

<template>
  <h2 class="text-2xl mb-4">Create Model Config</h2>
  <ModelConfigEditComponent @sumbit="submitCreate" />
</template>