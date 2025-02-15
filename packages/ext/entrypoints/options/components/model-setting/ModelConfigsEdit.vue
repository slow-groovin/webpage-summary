<script setup lang="ts">
import { ModelConfigItem } from '@/src/types/config/model';
import ModelConfigEditComponent from './ModelConfigEditComponent.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { toast } from '@/src/components/ui/toast';
import { useRoute, useRouter } from 'vue-router';
import { ArgumentsType } from '@vueuse/core';
import { uid } from 'radash';
import { onMounted, ref } from 'vue';
import ErrorComponent from '@/src/components/status/ErrorComponent.vue';

const {query:{id}}=useRoute()
const {push}=useRouter()

const { updateItem, getItem } = useModelConfigStorage()

const item = ref<ModelConfigItem>()

onMounted(async ()=>{
  item.value=await getItem(id as string)
})

async function submitEdit(value: Omit<ModelConfigItem,'id'>) {
  if(!item.value){
    toast({ title: `unexpected update on null Model Config ${id}`, variant: 'destructive'})
    return
  }
  const newModelConfig={
    ...value,
    id: item.value?.id,
  }
  const rs = await updateItem(newModelConfig)
  if (!rs.isSuc) {
    toast({ title: `update failed: ${rs.msg}`, variant: 'destructive' })
  } else {
    toast({ title: `update suc: ${rs.msg}`, variant:'success' })
    push('/models/')
  }
}
</script>

<template>
  <h2 class="text-2xl mb-4">Edit Model Config: {{ item?.name }}</h2>
  <ModelConfigEditComponent v-if="item" :item="item" @sumbit="submitEdit" />
  <ErrorComponent v-else :message="`Model Config ${id} not found`"></ErrorComponent>
</template>