<script setup lang="ts">
import { PromptConfigItem } from '@/src/types/config/prompt';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { computed } from 'vue';
import CardFooter from '@/src/components/ui/card/CardFooter.vue';

const props = defineProps<{
  item: PromptConfigItem
}>()
const renderMessage = (message: string) => {
  if (typeof message !== 'string') return ''
  const parts = message.split(/(\{\{[^}]*\}\})/)
  // console.log(parts)
  return parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return `<span key=${index} class="font-bold">${part}</span>`
    } else {
      return `${part}`
    }
  }).join('')
}

const renderedSystemMessage = renderMessage(props.item.systemMessage)
const renderedUserMessage = renderMessage(props.item.userMessage)
// write a sort bubble



</script>
<template>
  <Card>
    <CardHeader class="flex flex-row pb-1 justify-between">
      <CardTitle>name: {{ item.name }}</CardTitle>
      <div class="text-sm text-muted-foreground">created at:{{ new Date(item.at).toLocaleString() }}</div>
    </CardHeader>
    <CardContent class="space-y-4 py-4">
      <div class="flex items-center space-x-2">
        <div class="w-16  shrink-0">
          <div class="font-medium rounded-md border px-2 py-1  ">System</div>
        </div>
        <div class="text-sm text-muted-foreground break-words" v-html="renderedSystemMessage"></div>
      </div>
      <hr>
      <div class="flex items-center space-x-2">
        <div class="w-16  shrink-0">
          <div class="font-medium rounded-md border px-2 py-1 ">User</div>
        </div>
        <div class="text-sm text-muted-foreground break-words" v-html="renderedUserMessage"></div>
      </div>
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>
</template>