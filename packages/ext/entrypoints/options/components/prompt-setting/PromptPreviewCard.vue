<script setup lang="ts">
import { Card, CardContent } from '@/src/components/ui/card';
import { CoreMessage } from "ai";

const props = defineProps<{
  item: CoreMessage[],
}>()
const renderMessage = (message: string) => {
  if (typeof message !== 'string') return ''
  message = message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
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


// write a sort bubble



</script>
<template>
  <Card>
    <CardContent class="bg-amber-200/30 w-fit max-w-[80vw] space-y-4 p-2">
      <div class="flex items-center space-x-2" :class="{'border-b pb-4':index!==item.length-1}" v-for="(message,index) in item">
        <div class="w-16  shrink-0">
          <div class="font-medium rounded-md border px-2 py-1  ">{{ message.role }}</div>
        </div>
        <div class="text-sm text-muted-foreground break-words whitespace-pre" v-html="renderMessage(message.content as string)"></div>
      </div>
    </CardContent>
  </Card>
</template>