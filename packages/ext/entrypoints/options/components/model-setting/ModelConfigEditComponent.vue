<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue'
import { modelProviderPresets } from '@/src/presets/model-providers'
import { computed, ref, watch } from 'vue'
import { Input } from '@/src/components/ui/input'
import { InfoIcon } from 'lucide-vue-next'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import EditControlInput from '@/src/components/custom-ui/EditControlInput.vue'
import { useModelConfigStorage } from '@/src/composables/model-config'
import { ModelConfigItem } from '@/src/types/config/model'
import { uid } from 'radash'
import { toast, ToastAction } from '@/src/components/ui/toast'
import { useRouter } from 'vue-router'
import { h } from 'vue'
import ModelProviderSelect from './ModelProviderSelect.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { HoverCardRoot } from 'radix-vue'
import HoverCard from '@/src/components/ui/hover-card/HoverCard.vue'
import HoverCardTrigger from '@/src/components/ui/hover-card/HoverCardTrigger.vue'
import HoverCardContent from '@/src/components/ui/hover-card/HoverCardContent.vue'
import ModelConfigItemComponent from './ModelConfigItem.vue'


const { item } = defineProps<{
  item?: ModelConfigItem
}>()

const providerType = ref<keyof typeof modelProviderPresets>(item?.providerType ?? 'openai')
const emit = defineEmits<{
  sumbit: [Omit<ModelConfigItem, 'id'>]
}>()

const provider = computed(() => modelProviderPresets[providerType.value])

const typeschema = toTypedSchema(z.object({
  name: z.string().min(1),
  modelName: z.string().min(1),
  apiKey: z.string(),
  baseURL: z.string().nullable().optional().refine((v) => {
    // only when provider has defaultApiBase, baseURL can be empty
    const isValid = !!provider.value.defaultApiBase || (v !== null && v !== undefined && v === '')
    console.log('baseURL', v, isValid)
    return isValid

  }),
}))
const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: typeschema,
  initialValues: {
    name: item?.name ?? provider.value.providerType,
    baseURL: item?.baseURL ?? undefined,
    apiKey: item?.apiKey ?? undefined,
    modelName: item?.modelName ?? undefined
  },
})
//modifying form when select different provider
watch(provider, (newProvider) => {
  if(item){
    return
  }
  // console.log(newProvider)
  if (newProvider.defaultApiBase)
    setFieldValue('baseURL', '')
  setFieldValue('name', newProvider.providerType)
})


const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  emit('sumbit', {
    apiKey: values.apiKey,
    name: values.name,
    modelName: values.modelName,
    providerType: providerType.value,
    baseURL: values.baseURL ?? undefined,
    at: Date.now(),
  })
})


</script>
<template>
  <div class="flex flex-col space-y-4 items-stretch w-fit">
    <ModelProviderSelect v-model:provider-type="providerType">
    </ModelProviderSelect>

    <form @submit="onSubmit" class="w-fit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Config Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="My Config" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="modelName">
        <FormItem>
          <FormLabel>Model</FormLabel>
          <FormControl>
            <Input type="text" placeholder="gpt-3.5-turbo" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            Model name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, }" name="baseURL">
        <FormItem>
          <FormLabel class="flex flex-row items-center gap-2">
            baseURL
            <template v-if="provider.defaultApiBase">
              <HoverCard :open-delay="50">
                <HoverCardTrigger>
                  <InfoIcon class="text-neutral-600 hover:text-neutral-800 h-4 w-4" />
                </HoverCardTrigger>
                <HoverCardContent>default: {{ provider.defaultApiBase }}</HoverCardContent>
              </HoverCard>
            </template>

          </FormLabel>
          <FormControl>
            <!-- normal input if no default api base -->
            <Input v-if="!provider.defaultApiBase" type="text" placeholder="https://..." v-bind="componentField" />
            <EditControlInput v-else type="text" placeholder="<default>" v-bind="componentField" />
          </FormControl>

          <FormDescription>
            Base URL.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, }" name="apiKey">
        <FormItem>
          <FormLabel>API KEY</FormLabel>
          <FormDescription>
            API key.
          </FormDescription>
          <FormControl>
            <Input type="password" placeholder="..." v-bind="componentField" />
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