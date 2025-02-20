<template>
  <template class="" v-if="currentModel && currentPrompt">


    <DraggableContainer
      class="w-[var(--webpage-summary-user-float-window-width)] h-fit bg-white rounded-t-xl rounded-b-xl">
      <template #header>

        <SummaryHeader v-model:current-model="currentModel" v-model:current-prompt="currentPrompt" class="rounded-t-xl"
          :token-usage="tokenUsage">
          <template #left-buttons>
            <StatusButton :status="status" @view-failed-reason="viewFailedReason" @refresh="refreshSummary"
              @stop="stop" />
          </template>
          <template #right-buttons>
            <div v-if="enableTokenUsageView && tokenUsage.inputToken"
              class="flex items-center gap-1 border rounded p-1 bg-gray-200" title="Token Usage">
              <TokenUsageItem v-if="tokenUsage && tokenUsage.inputToken" :usage="tokenUsage" />
            </div>

            <!-- minimize button -->
            <Button @click="$emit('minimizePanel')" variant="github" size="icon" title="minimize"
              class="border-none p-0 [&_svg]:size-6">
              <SquareMinusIcon/>
            </Button>
          </template>
        </SummaryHeader>

      </template>

      <template #default>

        <SummaryDialog class="mt-[-1px]   min-h-16 overflow-y-auto max-h-[50vh]" style="overflow-anchor: auto;"
          ref="summaryDialog">
          <div class="flex flex-col gap-4">
            <InputTiktokenResultItem class="p-0.5 text-sm border-none"
              v-if="inputContentLengthInfo.totalLength && inputContentLengthInfo.clipedLength !== undefined"
              :result="inputContentLengthInfo" />
            <template v-for="(msg, index) in uiMessages" :key="index">
              <MessageItem :message="{ type: msg.role, content: msg.content }" />
            </template>
            <div id="dialog-bottom-anchor"></div>
          </div>
        </SummaryDialog>

        <div class="w-full h-fit relative ">
          <div class="absolute right-0 top-0 flex flex-row gap-1 ">
            <!-- enable ChaptInputBox  buttons -->
            <Button v-show="!isChatDialogOpen" @click="() => isChatDialogOpen = !isChatDialogOpen" variant="github"
              size="icon" class="rounded-none text-gray-500 text-primary">
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
import { useSummary } from '@/src/composables/useSummary';
import { getShadowRootAsync, injectUserSettingCssVariables, scrollToId } from '@/src/utils/document';
import { ChevronUpIcon, MessageCirclePlusIcon, SquareMinusIcon } from 'lucide-vue-next';
import { onMounted, ref, useHost, useShadowRoot, useTemplateRef } from 'vue';
import DraggableContainer from '../container/DraggableContainer.vue';
import ChatInputBox from '../summary/ChatInputBox.vue';
import MessageItem from '../summary/MessageItem.vue';
import SummaryDialog from '../summary/SummaryDialog.vue';
import Button from '../ui/button/Button.vue';
import PageWordCount from './InputTiktokenResultItem.vue';
import TokenUsageItem from './TokenUsageItem.vue';
import { useEnableAutoBeginSummary, useEnableTokenUsageView, useEnableUserChatDefault, useGeneralConfig } from '@/src/composables/general-config'
import { sleep } from 'radash';
import InputTiktokenResultItem from './InputTiktokenResultItem.vue';
import { toast } from '../ui/toast';
const isChatDialogOpen = ref(false)


//todo define Expose to parent to control hide/show panel
defineEmits<{
  minimizePanel: []
}>()

const { append, currentModel, currentPrompt, status, uiMessages, refreshSummary, onReady, stop, inputContentLengthInfo, tokenUsage, onChunk, error } = useSummary()
const { enableTokenUsageView } = useEnableTokenUsageView()
const { enableUserChatDefault, then: enableUserChatDefaultThen } = useEnableUserChatDefault()

enableUserChatDefaultThen(() => {
  isChatDialogOpen.value = enableUserChatDefault.value
})

// onChunk(() => {
//   scrollToId('dialog-bottom-anchor')
// })


const summaryDialog = useTemplateRef<InstanceType<typeof SummaryDialog>>('summaryDialog')

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