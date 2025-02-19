<script setup lang="ts">
import EditControlInput from '@/src/components/custom-ui/EditControlInput.vue'
import Button from '@/src/components/ui/button/Button.vue'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/src/components/ui/hover-card'
import { Input } from '@/src/components/ui/input'
import { modelProviderPresets } from '@/src/presets/model-providers'
import { ModelConfigItem } from '@/src/types/config/model'
import { toTypedSchema } from '@vee-validate/zod'
import { CircleAlertIcon, InfoIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { z } from 'zod'
import ModelProviderSelect from './ModelProviderSelect.vue'


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
    const isValid = !!provider.value.defaultApiBase || (v !== null && v !== undefined && v !== '')
    console.log('baseURL', v, isValid)
    return isValid

  }),
  maxContentLength: z.number().min(1),
}))
const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: typeschema,
  initialValues: {
    name: item?.name ?? provider.value.providerType,
    baseURL: item?.baseURL ?? undefined,
    apiKey: item?.apiKey ?? undefined,
    modelName: item?.modelName ?? undefined,
    maxContentLength: item?.maxContentLength ?? undefined,
  },
})
//modifying form when select different provider
watch(provider, (newProvider) => {
  if (item) {
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
    maxContentLength: values.maxContentLength,
    at: Date.now(),
  })
})


</script>
<template>
  <div class="flex flex-col space-y-4 items-stretch w-fit">
    <ModelProviderSelect v-model:provider-type="providerType">
    </ModelProviderSelect>

    <form @submit="onSubmit" class="w-fit flex flex-col gap-4">
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

      <FormField v-slot="{ componentField }" name="maxContentLength">
        <FormItem>
          <FormLabel class="flex flex-row items-center gap-2">
            Max Content Length
            <HoverCard :close-delay="1500">
              <HoverCardTrigger>
                <CircleAlertIcon class="text-gray-500 h-5 w-5" />
              </HoverCardTrigger>
              <HoverCardContent class="min-w-[50em]">
                设置0则为不限制<br>
                内容长度由String.length计算,<br/>
                
                为什么不直接使用tiktokenizer计算token数量进行限制? 因为不同模型的tokenizer差异很大, <br/>
                所以请根据您的语言的实际情况进行调整<br>(比如,中文一个length对应一个token,英文一个word的length对应一个token)<br/>
                保证最终的输出不超过模型的context 大小即可

              </HoverCardContent>
            </HoverCard>

          </FormLabel>
          <FormControl>
            <Input type="number" placeholder="8192" v-bind="componentField" class="w-20" />
          </FormControl>
          <FormDescription>
            限制提取的网页内容(发送给llm之前)的最大长度

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