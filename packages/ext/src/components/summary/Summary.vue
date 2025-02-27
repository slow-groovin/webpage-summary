<template>
  <template v-if="true">
    <DraggableContainer class="w-[var(--webpage-summary-panel-width)]  bg-[--webpage-summary-panel-background] 
       rounded-t-xl rounded-b-xl shadow-2xl">
      <template #header>

        <SummaryHeader v-model:current-model="currentModel" v-model:current-prompt="currentPrompt" class="rounded-t-xl"
          :token-usage="tokenUsage">
          <template #left-buttons>
            <StatusButton :status="status" @view-failed-reason="viewFailedReason" @refresh="refreshSummary"
              @stop="stop" />
          </template>
          <template #right-buttons>


            <!-- minimize button -->
            <Button @click="$emit('minimizePanel')" variant="github" size="icon" title="minimize"
              class="border-none p-0 [&_svg]:size-6 text-foreground/50">
              <SquareMinusIcon />
            </Button>
          </template>
        </SummaryHeader>

      </template>

      <template #default>

        <SummaryDialog class="mt-[-1px]   min-h-16 overflow-y-auto max-h-[--webpage-summary-panel-dialog-max-height]"
          style="overflow-anchor: auto;" ref="summaryDialog">
          <template #top-right-buttons>

            <!-- length view&manage -->
            <InputInspect v-if="webpageContent && currentModel && textContentTrimmer" :content-trimmer="textContentTrimmer"
              :webpag-content="webpageContent" :max-content-length="currentModel?.maxContentLength"
              class="ml-2" />

            <!-- token usage -->
            <div v-if="enableTokenUsageView && tokenUsage.inputToken"
              class="flex items-center gap-1 border rounded p-1 bg-gray-200" title="Token Usage">
              <TokenUsageItem :usage="tokenUsage" />
            </div>
            <!-- 👆push to left -->
            <div class="grow" />
          </template>

          <!-- markdown render messages  -->
          <div class="flex flex-col gap-4">
            <template v-for="(msg, index) in uiMessages" :key="index">
              <MessageItem v-if="!msg.hide" :message="msg" />
            </template>
            <div id="dialog-bottom-anchor"></div>
          </div>
        </SummaryDialog>

        <div class="w-full h-fit relative ">
          <div class="absolute right-0 top-0 flex flex-row gap-1 ">
            <!-- enable ChaptInputBox  buttons -->
            <Button v-show="!isChatDialogOpen" @click="() => isChatDialogOpen = !isChatDialogOpen" variant="github"
              size="icon" class="rounded-none text-neutral-400 text-primary/50" title="continue chat">
              <MessageCirclePlusIcon />
            </Button>
          </div>

          <div class="absolute bottom-[-1rem] left-[50%] flex flex-row gap-1 ">
            <!-- hide  buttons -->
            <Button v-show="isChatDialogOpen" @click="() => isChatDialogOpen = !isChatDialogOpen" variant="github"
              size="icon" class="h-4 rounded-none text-gray-500">
              <ChevronUpIcon />
            </Button>
          </div>


          <ChatInputBox v-show="isChatDialogOpen" @submit="submitUserInput" :disabled="status !== 'ready'"
            class="rounded-b-xl" />
        </div>



      </template>
    </DraggableContainer>



  </template>
</template>

<script setup lang="ts">
import StatusButton from '@/src/components/summary/StatusButton.vue';
import SummaryHeader from '@/src/components/summary/SummaryHeader.vue';
import { useEnableTokenUsageView, useEnableUserChatDefault } from '@/src/composables/general-config';
import { useSummary } from '@/src/composables/useSummary';
import { scrollToId } from '@/src/utils/document';
import { ChevronUpIcon, MessageCirclePlusIcon, SquareMinusIcon } from 'lucide-vue-next';
import { onMounted, provide, ref, useTemplateRef } from 'vue';
import DraggableContainer from '../container/DraggableContainer.vue';
import ChatInputBox from '../summary/ChatInputBox.vue';
import MessageItem from '../summary/MessageItem.vue';
import SummaryDialog from '../summary/SummaryDialog.vue';
import Button from '../ui/button/Button.vue';
import { toast } from '../ui/toast';
import InputInspect from './InputInspect.vue';
import TokenUsageItem from './TokenUsageItem.vue';
import EventEmitter from 'eventemitter3';
const isChatDialogOpen = ref(false)

const emit = defineEmits<{
  minimizePanel: []
}>()



const { append, stop, error, status,
  currentModel, currentPrompt, uiMessages,
  refreshSummary, onPrepareDone, onChunk,
  textContentTrimmer, tokenUsage, copyMessages,
  webpageContent
} = useSummary()
const { enableTokenUsageView } = useEnableTokenUsageView()
const { enableUserChatDefault, then: enableUserChatDefaultThen } = useEnableUserChatDefault()
const summaryDialog = useTemplateRef<InstanceType<typeof SummaryDialog>>('summaryDialog')

/*provide funcs to SummaryDialog.vue */
provide('copy-func', copyMessages)
provide('scroll-bottom', () => scrollToId('dialog-bottom-anchor'))

const event=new EventEmitter()
/*expose funcs */
defineExpose({
  status: ()=>status.value,
  refreshSummary,
  on: (name:string,fn:Parameters<typeof event.on>[1])=>event.on(name,fn),
})

enableUserChatDefaultThen(() => {
  isChatDialogOpen.value = enableUserChatDefault.value
})

onPrepareDone(() => {
  if (!currentModel.value) {
    toast({ variant: 'destructive', description: 'no model configed, please create a model config first!', open: true, duration: 10000 })
  }
  if (!currentPrompt.value) {
    toast({ variant: 'destructive', description: 'no prompt configed, please create a prompt config first!', open: true, duration: 10000 })
  }
  event.emit('onPrepareDone')
})
// onChunk(() => {
//   scrollToId('dialog-bottom-anchor')
// })



async function submitUserInput(content: string, onSuc: () => void) {
  if (!content || status.value !== 'ready') return
  append(content, 'user')
  scrollToId('dialog-bottom-anchor')
  onSuc()

}

async function viewFailedReason() {
  toast({ title: "ERROR", description: error.value, variant: "destructive" })
}

onMounted(() => {

})


</script>


<style scoped></style>