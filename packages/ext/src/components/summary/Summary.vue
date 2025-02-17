<template>
  <template class="" v-if="currentModel && currentPrompt">

    <DraggableContainer class="">
      <template #header>

        <SummaryHeader v-model:current-model="currentModel" v-model:current-prompt="currentPrompt" class=""
          :token-usage="curTokenUsage">
          <template #left-buttons>
            <Button  @click="execSummary"
            
            variant="outline" size="icon" class="w-fit px-1 gap-0 flex items-center h-8 leading-8">
              <PlayIcon/>Summary
            </Button>
          </template>
        </SummaryHeader class="">

      </template>

      <template #default>
        <SummaryDialog class="mt-[-1px] h-[50vh]">
          <div class="flex flex-col gap-4 ">
            <template v-for="(msg, index) in msgs" :key="index">
              <MessageItem :message="{ type: msg.type, content: msg.content }" />
            </template>
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

          <ChatInputBox v-show="isChatDialogOpen" @submit="submitUserInput" />

        </div>


      </template>
    </DraggableContainer>



  </template>
</template>

<script setup lang="ts">
import SummaryHeader from '@/src/components/summary/SummaryHeader.vue';
import { useModelConfigStorage } from '@/src/composables/model-config';
import { ModelConfigItem } from '@/src/types/config/model';
import { TokenUsage } from '@/src/types/summary';
import { Ref, ref } from 'vue';
import SummaryDialog from '../summary/SummaryDialog.vue';
import MessageItem from '../summary/MessageItem.vue';
import ChatInputBox from '../summary/ChatInputBox.vue';
import Button from '../ui/button/Button.vue';
import { ChevronUpIcon, MessageCirclePlusIcon } from 'lucide-vue-next';
import { usePromptConfigStorage } from '@/src/composables/prompt';
import { PromptConfigItem } from '@/src/types/config/prompt';
import DraggableContainer from '../container/DraggableContainer.vue';
import { PlayIcon } from 'lucide-vue-next';
import { useWebpageContent } from '@/src/composables/readability';
import { sendConnectMessage } from '@/connect-messaging';
import { toast } from '../ui/toast';
import { CoreMessage } from 'ai';
import { renderMessages } from '@/src/utils/prompt';

const isChatDialogOpen = ref(false)


const modelStorage = useModelConfigStorage()
const promptStorage = usePromptConfigStorage()

const currentModel = ref<ModelConfigItem | null>()
const currentPrompt = ref<PromptConfigItem | null>()

modelStorage.getDefaultItem().then(r => currentModel.value = r)
promptStorage.getDefaultItem().then(r => currentPrompt.value = r)

const  {summaryInput}=useWebpageContent()
const curTokenUsage = ref<TokenUsage>({
  inputToken: 13515,
  outputToken: 535,
  cost: 0.00515,
  unit: "$"
})

type Message={ type: 'user' | 'llm', content: Ref<string> }
const msgs = ref<Message[]>([])


async function submitUserInput(content: string) {
  msgs.value.push({ type: 'user', content: ref(content) })
}

async function  execSummary() {
console.log(summaryInput.value)

  if(!currentModel.value || !currentPrompt.value || !summaryInput.value){
    toast({title:'no config yet.', variant:'warning'})
    return 
  }
  
  const messages:CoreMessage[]=[
    { role:'system', content: currentPrompt.value.systemMessage},
    { role:'user', content: currentPrompt.value.userMessage},
  ]

  renderMessages(messages,summaryInput.value )
  const {textStream,tokenUsage}=await sendConnectMessage('beginSummary',{
    modelConfig:currentModel.value,
    messages: messages,
  })
  tokenUsage.then((_r)=>{curTokenUsage.value=_r})
  const summaryResult=ref<string>('')
  msgs.value.push({type:'llm',content: summaryResult})
  textStream.onChunk((c)=>{
    summaryResult.value+=c
  })
}
</script>

<style scoped></style>