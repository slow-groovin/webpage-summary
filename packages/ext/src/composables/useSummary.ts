// packages/ext/src/composables/useStreamSummary.ts
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { sendMessage } from '@/messaging';
import { browser, Runtime } from 'wxt/browser';
import { uid } from 'radash';
import markdownit from 'markdown-it';
import type { Ref } from 'vue';
import modelProviders from '../model-providers';
import { CoreMessage } from 'ai';
import { sendConnectMessage } from '@/connect-messaging';
import { ModelConfigItem } from '../types/config/model';
import { PromptConfigItem } from '../types/config/prompt';
import { useModelConfigStorage } from './model-config';
import { usePromptConfigStorage, usePromptDefaultPreset } from './prompt';
import { toast } from '../components/ui/toast';
import { TokenUsage } from '../types/summary';
import { useWebpageContent } from './readability';
import { renderMessages } from '../utils/prompt';
import { assert, watchOnce } from '@vueuse/core';
import { UIMessage } from '../types/message';


export function useSummary() {
  const uiMessages = ref<UIMessage[]>([])
  const messages = ref<CoreMessage[]>([])

  // const status = ref<'preparing' | 'failed' | 'ready' | 'running'>('preparing')
  // 使用以下flag和计算属性status替代上面的status
  const isRunning = ref(false)
  const isFailed = ref(false)
  const isPreparing = ref(true)

  const status = computed<'preparing' | 'failed' | 'ready' | 'running'>(() => {
    if (isFailed.value) {
      return 'failed'
    }
    if (isRunning.value) {
      return 'running'
    }
    if (isPreparing.value) {
      return 'preparing'
    }

    return 'ready'
  })


  const modelStorage = useModelConfigStorage()
  const promptStorage = usePromptConfigStorage()

  const currentModel = ref<ModelConfigItem | null>()
  const currentPrompt = ref<PromptConfigItem | null>()


  const promptPreset = usePromptDefaultPreset()
  const tokenUsage = ref<TokenUsage>({
    inputToken: 0,
    outputToken: 0,
    cost: 0,
    unit: '$',
  })

  const { summaryInput } = useWebpageContent()

  let chunkHooks:((c:unknown)=>void)[]=[]
  function onChunkHook(func: typeof chunkHooks[0]){
    chunkHooks.push(func)
  }
  function verfiyReady() {
    if (status.value === 'ready') {
      return true
    }
    if (status.value === 'preparing') {
      toast({ title: "Please wait for the config-reading to be ready", variant: 'warning' })
    } else if (status.value === 'failed') {
      toast({ title: "Config is not valid, please check the config", variant: 'warning' })
    } else if (status.value === 'running') {
    }
    return false
  }

  function initMessages() {
    messages.value = [
      { role: 'system', content: currentPrompt.value?.systemMessage ?? promptPreset.systemMessage },
      { role: 'user', content: currentPrompt.value?.userMessage ?? promptPreset.userMessage },
    ]
    if (summaryInput.value) {
      renderMessages(messages.value, summaryInput.value)
    } else {
      throw new Error('summary input value is null')
    }
  }

  function initUIMessages(){
    uiMessages.value=[]

  }
  onMounted(async () => {
    currentModel.value = await modelStorage.getDefaultItem()
    currentPrompt.value = await promptStorage.getDefaultItem()

    const onSummaryInputAssigned = () => {
      isFailed.value = !(currentModel.value && currentPrompt.value && summaryInput.value)
      initMessages()
      isPreparing.value = false
    }
    if (summaryInput.value) {
      onSummaryInputAssigned()
    } else {
      watchOnce(summaryInput, (value) => {
        if (!value) {
          throw new Error('summary input value is null')
        }
        onSummaryInputAssigned()
      })
    }

  })

  async function refreshSummary() {
    initMessages()
    initUIMessages()
    append('', 'assistant')
  }

  async function append(content: string, role: 'user' | 'assistant') {
    if (!verfiyReady()) {
      return
    }

    messages.value.push({
      role: role, content: content
    })

    //show user input message
    if (role === 'user') {
      uiMessages.value.push({ role: 'user', content: content, at: Date.now() })
    }
    //show latest assitant message
    uiMessages.value.push({ role: 'assistant', content: '', at: Date.now() })

    isRunning.value = true
    const { textStream, tokenUsage: newTokenUsage } = await sendConnectMessage('streamTextViaConnect', {
      modelConfig: currentModel.value!,
      messages: messages.value,
    })
    // console.log(textStream)
    textStream.onChunk((c) => {
      uiMessages.value[uiMessages.value.length - 1].content += c
      chunkHooks.forEach(hookFunc=>hookFunc(c))
    })
    textStream.onChunkComplete(async () => {
      isRunning.value = false
      const { inputToken, outputToken, cost, unit } = await newTokenUsage
      tokenUsage.value = {
        inputToken: tokenUsage.value.inputToken + inputToken,
        outputToken: tokenUsage.value.outputToken + outputToken,
        cost: (tokenUsage.value.cost ?? 0) + (cost ?? 0),
        unit: unit
      }
    })
  }

  return { status, uiMessages, summaryInput, append, refreshSummary, currentModel, currentPrompt, tokenUsage, onChunkHook }
}