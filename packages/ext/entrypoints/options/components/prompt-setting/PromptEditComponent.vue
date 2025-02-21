<!-- the component to modify prompt config item fields, child of PromptCreate.vue,PromptEdit.vue -->
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
import { z, ZodEffects } from 'zod';
import EditControlInput from '@/src/components/custom-ui/EditControlInput.vue';
import { storage } from 'wxt/storage';
import { uid } from 'radash';
import { MODEL_CONFIG_KEY } from '@/src/constants/storage-key';
import { PromptConfigItem } from '@/src/types/config/prompt';
import { ChevronDownIcon, ChevronsDown, ChevronsUp, ChevronUp, MoveLeftIcon } from 'lucide-vue-next';
import Textarea from '@/src/components/ui/textarea/Textarea.vue';
import { presetPrompts } from '@/src/presets/prompts';
import { usePromptConfigStorage, usePromptDefaultPreset } from '@/src/composables/prompt';
import AutoResizeTextarea from '@/src/components/custom-ui/AutoResizeTextarea.vue';
import { useRouter } from 'vue-router';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/src/components/ui/collapsible';
const { isNameExist } = usePromptConfigStorage()
const { back } = useRouter()
const isCollapseOpen = ref(true)
const { item } = defineProps<{
  item?: PromptConfigItem,
  isDisable?: boolean
}>()
const emits = defineEmits<{
  submit: [string, string, string]
}>()


const formSchema = toTypedSchema(z.object({
  name: z.string().min(1).refine(async (name) => {
    return !(await isNameExist(name))
  }, { message: 'Name already exists' }),
  systemMessage: z.string().min(1),
  userMessage: z.string().min(1),
}))
const defaultPrompt = usePromptDefaultPreset()

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: item?.name ?? 'My prompt',
    systemMessage: item?.systemMessage ?? defaultPrompt.systemMessage,
    userMessage: item?.userMessage ?? defaultPrompt.userMessage,
  }
})


const onSubmit = handleSubmit(async (values) => {
  console.log('Form submitted!', values)

  /* createNewModelConfig
   */
  console.log('[submit][done]')

  emits('submit', values.name, values.systemMessage, values.userMessage)
})

const templatVariables = [
  { key: 'summaryLanguage', description: 'language of output summary' },
  { key: 'articleUrl', description: 'url of page' },
  { key: 'textContent', description: 'main content of page' },
]
</script>
<template>
  <div class="flex flex-col my-4 space-y-4 items-stretch">
    <!-- template variables -->
    <Collapsible v-model:open="isCollapseOpen">
      <CollapsibleContent
        class="shadow-lime-500 shadow rounded-lg p-2 w-fit self-start bg-gradient-to-r from-lime-100 to-blue-200 text-black">
        <h1 class="font-semibold">Template Variables</h1>
        <hr class="border-t-black">
        <div class="grid grid-cols-[auto,1fr] mt-2 space-y-2 items-baseline">
          <template v-for="variable in templatVariables" :key="variable.key">
            <span class="font-mono">&#123;&#123;{{ variable.key }}&#125;&#125; </span>
            <span class="ml-4 text-sm text-gray-800">{{ variable.description }}</span>
          </template>
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
        <div v-if="isCollapseOpen" class="flex items-center space-x-2 cursor-pointer">
          <ChevronsUp class="w-4 h-4" />
          <div class="font-semibold">Hide Template Variables</div>
        </div>

        <div v-else class="flex items-center space-x-2 cursor-pointer">
          <ChevronsDown class="w-4 h-4" />
          <div class="font-semibold">Show Template Variables</div>
        </div>
      </CollapsibleTrigger>

    </Collapsible>



    <form @submit="onSubmit" class="flex flex-col gap-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="my prompt 1" v-bind="componentField" :disable="isDisable" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="systemMessage">
        <FormItem>
          <FormLabel>System Message</FormLabel>
          <FormControl>
            <AutoResizeTextarea type="text" placeholder="system message" class="text-lg" spellcheck="false"
              v-bind="componentField" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, }" name="userMessage">
        <FormItem>
          <FormLabel>User Message</FormLabel>
          <FormControl>
            <AutoResizeTextarea type="text" placeholder="user message" class=" text-lg" spellcheck="false"
              v-bind="componentField" />
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