<template>
  <form @submit="onSubmit" class="mx-auto  w-fit  grid grid-cols-2  gap-4  rounded p-4 border">
    <div class="col-span-2 text-sm text-muted-foreground whitespace-pre-line">
      {{ t('web_model_desc') }}
    </div>

    <FormField v-slot="{ componentField, meta }" name="name">
      <FormItem>
        <FormLabel>Config Name {{ meta.required ? "*" : '' }}</FormLabel>
        <FormControl>
          <Input type="text" placeholder="My Config" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="modelName">
      <FormItem>
        <FormLabel>Model Name </FormLabel>
        <FormControl>
          <div class="flex items-center gap-4">
            <Input type="text" :placeholder="'eg:  ' + draw(provider.sampleModelNames ?? [''])"
              v-bind="componentField" />
            <Dialog>
              <DialogTrigger>
                <EyeIcon class="size-8 stroke-gray-500 border rounded p-1" />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  models for {{ providerKey }}
                </DialogTitle>
                <DialogDescription @vue:before-mount="getModels">
                  <div v-if="isModelLoading"
                    class="rounded-full animate-spin border border-t-0 size-6 border-green-600">

                  </div>
                  <span v-for="model in modelNames" class="text-green-800 text-xl font-bold mr-4">
                    {{ model }}
                  </span>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>

        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="maxContentLength" :unchecked-value="''">
      <FormItem>
        <FormLabel class="flex flex-row items-center gap-2">
          Max Content Length(input)
          <HoverBadget title="?" :description="t('max_content_length_CALC_INFO')" />

          <HoverBadget class="text-nowrap" :title="t('max_content_length_TOKENIZER_TITLE')"
            :description="t('max_content_length_TOKENIZER_INFO')" />

        </FormLabel>
        <FormControl>
          <Input type="number" :placeholder="t('leave_empty_to_not_limit')" class="w-56" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          {{ t('max_content_length_DESC') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="use_search">
      <FormItem>
        <FormLabel>use_search </FormLabel>
        <br>
        <FormControl>
          <Checkbox v-bind:checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormDescription>
          use search or not
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="col-span-2">
      <Button type="submit" class="">
        {{ t('Submit') }}
      </Button>
    </div>
  </form>

</template>
<script setup lang="ts">
import HoverBadget from '@/src/components/common/HoverTextBadget.vue';
import { Input } from '@/src/components/ui/input';
import { ProviderKey } from '@/src/presets/model-providers';
import { ModelConfigItem } from '@/src/types/config/model';
import { t } from '@/src/utils/extension';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import Button from '@/src/components/ui/button/Button.vue';
import Checkbox from '@/src/components/ui/checkbox/Checkbox.vue';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form';
import { ModelPreset } from '@/src/presets/model-providers';
import { draw } from 'radash';
import { useForm } from 'vee-validate';
import { providerMap } from '../../../../src/model-providers/create';
import { EyeIcon } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/src/components/ui/dialog';
import DialogTrigger from '@/src/components/ui/dialog/DialogTrigger.vue';
import { ref } from 'vue';
const { item, provider, providerKey } = defineProps<{
  item?: ModelConfigItem,
  providerKey: ProviderKey,
  provider: ModelPreset
}>()
const emit = defineEmits<{
  sumbit: [Omit<ModelConfigItem, 'id'>]
}>()


const typeschema = toTypedSchema(z.object({
  name: z.string().min(1),
  modelName: z.string().min(1),
  maxContentLength: z.number({ coerce: true }).optional().nullish(),
  use_search: z.boolean().optional(),
}))

const { handleSubmit, setFieldValue, } = useForm({
  validationSchema: typeschema,
  initialValues: {
    name: item?.name ?? provider.providerType,
    modelName: item?.modelName ?? undefined,
    maxContentLength: item?.maxContentLength ?? undefined,
    use_search: item?.use_search ?? false,
  },
})
const onSubmit = handleSubmit(async (values) => {

  emit('sumbit', {
    name: values.name,
    modelName: values.modelName,
    providerType: providerKey,
    maxContentLength: values.maxContentLength ? values.maxContentLength : undefined,
    use_search: values.use_search ?? false,
    at: Date.now(),
  })
})

const modelNames = ref<string[]>()
const isModelLoading = ref(false)

async function getModels() {
  isModelLoading.value = true
  modelNames.value = []
  const func = (providerMap[providerKey]({}) as any)['getModels']
  if (func) {
    modelNames.value = await func() as string[]
  }
  isModelLoading.value = false

}
</script>