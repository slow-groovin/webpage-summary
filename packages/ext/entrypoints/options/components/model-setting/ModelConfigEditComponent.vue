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
import { ChevronsDownIcon, CircleAlertIcon, InfoIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { z } from 'zod'
import ModelProviderSelect from './ModelProviderSelect.vue'
import HoverBadget from '@/src/components/common/HoverTextBadget.vue'
import Collapsible from '@/src/components/ui/collapsible/Collapsible.vue'
import CollapsibleTrigger from '@/src/components/ui/collapsible/CollapsibleTrigger.vue'
import CollapsibleContent from '@/src/components/ui/collapsible/CollapsibleContent.vue'
import { Slider } from '@/src/components/ui/slider'
import HoverInfoIconBadget from '@/src/components/common/HoverInfoIconBadget.vue'


const { item } = defineProps<{
  item?: ModelConfigItem
}>()

const providerType = ref<keyof typeof modelProviderPresets>(item?.providerType ?? 'openai')
const emit = defineEmits<{
  sumbit: [Omit<ModelConfigItem, 'id'>]
}>()

const provider = computed(() => modelProviderPresets[providerType.value])

const v1 = ref([0])
/*
here, I want maxContentLength to be undefined to make it unlimited.
So the value need to be undefined when delete all number, it's a big trouble, vue Input will update the value to empty string when delete all number, 
so it will trigger the validation error, and the form will be invalid.
1. I tried z.coece.number(), but it have no effect in nowadays, z.number({coerce:true}) will work
2. onSumbit, set it to v?v:undefined, do not use v??undefined, because it will return v when v is falsy and not nullish(undefined or nullable)
 */

const typeschema = toTypedSchema(z.object({
  name: z.string().min(1),
  modelName: z.string().min(1),
  apiKey: z.string(),
  baseURL: z.string().optional().refine((v) => {
    // only when provider has defaultApiBase, baseURL can be empty
    const isValid = !!provider.value.defaultApiBase || (v !== null && v !== undefined && v !== '')
    return isValid
  }),
  maxContentLength: z.number({ coerce: true }).optional().nullish(),
  maxTokens: z.number({ coerce: true }).optional().nullish(),

  temperature: z.number({ coerce: true }).min(0).max(1).optional().nullish(),
  topK: z.number({ coerce: true }).min(0).max(1).optional().nullish(),
  topP: z.number({ coerce: true }).min(0).max(1).optional().nullish(),
  frequencyPenalty: z.number({ coerce: true }).min(-1).max(1).optional().nullish(),
  presencePenalty: z.number({ coerce: true }).min(-1).max(1).optional().nullish(),

  inputTokenPrice: z.number({ coerce: true }).min(0).optional().nullish(),
  outputTokenPrice: z.number({ coerce: true }).min(0).optional().nullish(),
  priceUnit: z.string().optional().nullish(),
}))
const { handleSubmit, setFieldValue, } = useForm({
  validationSchema: typeschema,
  initialValues: {
    name: item?.name ?? provider.value.providerType,
    baseURL: item?.baseURL ?? undefined,
    apiKey: item?.apiKey ?? undefined,
    modelName: item?.modelName ?? undefined,
    maxContentLength: item?.maxContentLength ?? undefined,
    maxTokens: item?.maxTokens ?? undefined,

    temperature: item?.temperature ?? undefined,
    topK: item?.topK ?? undefined,
    topP: item?.topP ?? undefined,
    frequencyPenalty: item?.frequencyPenalty ?? undefined,
    presencePenalty: item?.presencePenalty ?? undefined,

    inputTokenPrice: item?.inputTokenPrice ?? undefined,
    outputTokenPrice: item?.outputTokenPrice ?? undefined,
    priceUnit: item?.priceUnit ?? undefined,

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

  console.log(values, values.maxContentLength, !!values.maxContentLength)
  emit('sumbit', {
    apiKey: values.apiKey,
    name: values.name,
    modelName: values.modelName,
    providerType: providerType.value,
    baseURL: values.baseURL ?? undefined,
    maxContentLength: values.maxContentLength ? values.maxContentLength : undefined,
    maxTokens: values.maxTokens ? values.maxTokens : undefined,
    at: Date.now(),

    temperature: values.temperature ? values.temperature : undefined,
    topP: values.topP ? values.topP : undefined,
    topK: values.topK ? values.topK : undefined,
    frequencyPenalty: values.frequencyPenalty ? values.frequencyPenalty : undefined,
    presencePenalty: values.presencePenalty ? values.presencePenalty : undefined,

    inputTokenPrice: values.inputTokenPrice ?? undefined,
    outputTokenPrice: values.outputTokenPrice ?? undefined,
    priceUnit: values.priceUnit ?? undefined,

  })
})


</script>
<template>
  <div class="flex flex-col space-y-4 items-stretch w-fit">
    <ModelProviderSelect v-model:provider-type="providerType">
    </ModelProviderSelect>

    <form @submit="onSubmit" class="mx-auto  w-fit  grid grid-cols-2  gap-4  rounded p-4 border">
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
            <Input type="text" placeholder="gpt-3.5-turbo" v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, value }" name="maxContentLength" :unchecked-value="''">
        <FormItem>
          <FormLabel class="flex flex-row items-center gap-2">
            Max Content Length(input)
            <HoverCard :close-delay="1500">
              <HoverCardTrigger>
                <CircleAlertIcon class="text-gray-500 h-5 w-5" />
              </HoverCardTrigger>
              <HoverCardContent class="min-w-[50em]">
                内容长度由String.length计算<br />
                所以请根据您的语言的实际情况进行调整<br>(比如,中文一个length对应一个token,英文一个word的length对应一个token)<br />
              </HoverCardContent>
            </HoverCard>
            <HoverBadget class="text-nowrap" title="为什么不直接计算token" description="不同模型的token计算方式差异很大, 无法使用单一模型进行准确计算" />

          </FormLabel>
          <FormControl>
            <Input type="number" placeholder="leave empty to not limit" class="w-56" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            限制提取的网页内容(发送给llm之前)的最大长度

          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, value }" name="maxTokens">
        <FormItem>
          <FormLabel class="flex flex-row items-center gap-2">
            maxTokens (output)
          </FormLabel>
          <FormControl>
            <Input type="number" placeholder="leave empty to not limit" class="w-56" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            set model's maximum output tokens
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
                <HoverCardContent class="">leave blank to use DEFAULT: {{ provider.defaultApiBase }} </HoverCardContent>
              </HoverCard>
            </template>
          </FormLabel>
          <FormControl>
            <!-- normal input if no default api base -->
            <Input v-if="!provider.defaultApiBase" type="text" placeholder="https://..." v-bind="componentField" />
            <EditControlInput v-else type="text" placeholder="<default>" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, }" name="apiKey">
        <FormItem>
          <FormLabel>API KEY</FormLabel>
          <FormControl>
            <Input type="password" placeholder="..." v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <Collapsible class="col-span-2">
        <CollapsibleTrigger class="flex flex-row items-center text-blue-500 font-semibold ">
          <ChevronsDownIcon />
          Optional Settings
        </CollapsibleTrigger>
        <CollapsibleContent class="grid grid-cols-2 gap-4 p-2">


          <FormField v-slot="{ componentField }" name="inputTokenPrice">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                input token price
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="empty to unset" v-bind="componentField" :step="0.01" />
              </FormControl>
              <FormDescription> per million tokens, only to display usage </FormDescription>

              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="outputTokenPrice">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                output token price
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="empty to unset" v-bind="componentField" :step="0.01" />
              </FormControl>
              <FormDescription> per million tokens, only to display usage </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="priceUnit">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                currency unit of token price
              </FormLabel>
              <FormControl>
                <Input type="string" placeholder="'$' or '￥'..." v-bind="componentField" />
              </FormControl>
              <FormDescription> per million tokens, only to display usage </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>


          <FormField v-slot="{ componentField }" name="temperature">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                temperature
                <HoverInfoIconBadget description="0 or empty to unset" class="size-5 text-nowrap" />
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="0 or empty to unset" v-bind="componentField" :step="0.1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="topP">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                topP
                <HoverInfoIconBadget description="0 or empty to unset" class="size-5 text-nowrap" />
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="0 or empty to unset" v-bind="componentField" :step="0.1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="topK">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                topK
                <HoverInfoIconBadget description="0 or empty to unset" class="size-5 text-nowrap" />
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="0 or empty to unset" v-bind="componentField" :step="0.1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="frequencyPenalty">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                frequencyPenalty
                <HoverInfoIconBadget description="0 or empty to unset" class="size-5 text-nowrap" />
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="0 or empty to unset" v-bind="componentField" :step="0.1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="presencePenalty">
            <FormItem>
              <FormLabel class="flex flex-row items-center gap-2">
                presencePenalty
                <HoverInfoIconBadget description="0 or empty to unset" class="size-5 text-nowrap" />
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="0 or empty to unset" v-bind="componentField" :step="0.1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

        </CollapsibleContent>
      </Collapsible>

      <div class="col-span-2">
        <Button type="submit" class="">
          Submit
        </Button>
      </div>
    </form>
  </div>

</template>
<style lang="postcss" scoped></style>