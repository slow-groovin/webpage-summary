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
import { MoveLeftIcon } from 'lucide-vue-next';
import Textarea from '@/src/components/ui/textarea/Textarea.vue';
import { presetPrompts } from '@/src/presets/prompts';
import { usePromptConfigStorage, usePromptDefaultPreset } from '@/src/composables/prompt';
import AutoResizeTextarea from '@/src/components/custom-ui/AutoResizeTextarea.vue';
import { useRouter } from 'vue-router';
const { isNameExist } = usePromptConfigStorage()
const {back}=useRouter()
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


</script>
<template>
  <div class="flex flex-col space-y-4 items-stretch">
    <div>
      <MoveLeftIcon @click="back" class="border p-1 w-8 h-8 rounded border-primary hover:ring-2"/>
    </div>
    <div>
      <slot name="header"></slot>
    </div>
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Prompt Config Item Name</FormLabel>
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