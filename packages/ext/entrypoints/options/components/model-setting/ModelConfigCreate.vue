<script setup lang="ts">
import { t } from '@/src/utils/extension';
import { ModelConfigItem } from '@/src/types/config/model';
import ModelConfigEditComponent from './ModelConfigEditComponent.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { toast } from '@/src/components/ui/toast';
import { useRoute, useRouter } from 'vue-router';
import { ArgumentsType } from '@vueuse/core';
import { uid } from 'radash';
import { ref, onMounted } from 'vue';

const { createItem, getItem } = useModelConfigStorage()
const {query:{copy}}=useRoute()
const {push}=useRouter()

const toCopyItem = ref<ModelConfigItem>()

onMounted(async ()=>{
  if(copy){
    toCopyItem.value=await getItem(copy as string)
    if(!toCopyItem.value){
    toast({ title: `copy  null Model Config:  ${copy}`, variant: 'destructive'})
    return
  }
  }
})


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
  <h2 class="text-2xl mb-4">{{ t('Create_Model_Config') }}</h2>
  <ModelConfigEditComponent v-if="!copy || (copy && toCopyItem)" :item="toCopyItem" @sumbit="submitCreate" />
</template>