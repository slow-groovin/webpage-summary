<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { ModelPreset, modelProviderPresets } from '@/src/presets/model-providers';
import { provide, ref } from 'vue';
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Input } from '@/src/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import { z } from 'zod';
import EditControlInput from '@/src/components/custom-ui/EditControlInput.vue';
import { storage } from 'wxt/storage';
import { uid } from 'radash';
import { MODEL_CONFIG_KEY } from '@/src/constants/storage-key';
const { providerType } = defineProps<{
  providerType: string,
}>()
const emit = defineEmits<{
  created: []
}>()

const provider = modelProviderPresets[providerType]

const formSchema = toTypedSchema(z.object({
  name: z.string().min(1),
  modelName: z.string().min(1),
  baseURL: z.string().regex(/^https?:\/\//).default(provider.defaultApiBase ?? ''),
  apiKey: z.string().min(1),
  // modelName:
}))


const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  console.log('Form submitted!', values)

  /* createNewModelConfig
   */
  const newModelConfig:ModelConfigItem = {
    id: uid(16),
    name: values.name,
    providerType: provider.providerType,
    modelName: values.modelName,
    apiKey: values.apiKey,
    baseURL: values.baseURL,
    at: Date.now()
  }
  const modelConfigs = storage.defineItem<ModelConfigItem[]>(
    MODEL_CONFIG_KEY,
    {
      fallback: [],
    },
  );
  const value=(await modelConfigs.getValue())
  value.push(newModelConfig)

  await modelConfigs.setValue(value)
  console.log('[submit][done]')

  emit('created')
})


</script>
<template>

  <div class="flex flex-col space-y-4 items-stretch w-fit">
    {{ providerType }}
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Config Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="modelName">
        <FormItem>
          <FormLabel>Model</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, }" name="baseURL">
        <FormItem>
          <FormLabel>baseURL</FormLabel>
          <FormControl>
            <Input v-if="!provider.defaultApiBase" type="text" placeholder="shadcn" v-bind="componentField" />
            <EditControlInput v-else type="text" placeholder="shadcn" v-bind="componentField"></EditControlInput>
          </FormControl>

          <FormDescription>
            This is your baseURL.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, }" name="apiKey">
        <FormItem>
          <FormLabel>apiKey</FormLabel>
          <FormDescription>
            This is your api key.
          </FormDescription>
          <FormControl>
            <Input type="password" placeholder="shadcn" v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Submit
      </Button>
    </form>
  </div>

</template>
<style lang="postcss" scoped></style>