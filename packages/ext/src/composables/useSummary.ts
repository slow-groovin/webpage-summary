// packages/ext/src/composables/useStreamSummary.ts
import { sendConnectMessage } from '@/connect-messaging';
import { CoreMessage } from 'ai';
import { computed, onMounted, reactive, ref } from 'vue';
import { toast } from '../components/ui/toast';
import { ModelConfigItem } from '../types/config/model';
import { PromptConfigItem } from '../types/config/prompt';
import { UIMessage } from '../types/message';
import { TokenUsage } from '../types/summary';
import { renderMessages } from '../utils/prompt';
import { useModelConfigStorage } from './model-config';
import { usePromptConfigStorage, usePromptDefaultPreset } from './prompt';
import { useWebpageContent } from './readability';
import { getEnableAutoBeginSummary, getSpokenLanguage, getSummaryInputExceedBehaviour } from './general-config';
import { EventEmitter } from 'eventemitter3'
import { Tiktoken } from "js-tiktoken/lite";
import base from "js-tiktoken/ranks/o200k_base";
import { handleExceededContent } from '../utils/page-read';

const enc = new Tiktoken(base);

export function useSummary() {
  onMounted(async () => {
    currentModel.value = await modelStorage.getDefaultItem()
    currentPrompt.value = await promptStorage.getDefaultItem()
    isFailed.value = !(currentModel.value && currentPrompt.value && webpageContent)
    isPreparing.value = false
    await initMessages()
    event.emit('ready')
    if (await getEnableAutoBeginSummary()) {
      append('', 'assistant')
    }
  })
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

  const inputTiktokenResult = reactive<{
    totalLength?: number,
    clipedLength?: number,
  }>({})


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

  const { webpageContent } = useWebpageContent()
  const begin = Date.now()
  const rs = enc.encode(webpageContent.textContent ?? "")
  const cost = Date.now() - begin
  console.log('[tiktoken]cost:', cost, ' len:', rs.length, 'text:', webpageContent.textContent?.length)



  const event = new EventEmitter()

  function onReady(onReadyHook: () => void) {
    event.once('ready', onReadyHook)
  }

  function onChunk(onChunkHook: (chunk: unknown) => void) {
    event.on('chunk', onChunkHook)
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

  async function initMessages() {
    if (!currentModel.value || !currentPrompt.value) {
      throw new Error("Model or Prompt is not ready")
    }
    messages.value = [
      { role: 'system', content: currentPrompt.value?.systemMessage ?? promptPreset.systemMessage },
      { role: 'user', content: currentPrompt.value?.userMessage ?? promptPreset.userMessage },
    ]
    if (webpageContent) {
      if (!webpageContent.textContent) webpageContent.textContent = ''
      const maxTokens = currentModel.value.maxTokens * 1024
      const exceedBehaviour = await getSummaryInputExceedBehaviour()

      const tokens = enc.encode(webpageContent.textContent)
      inputTiktokenResult.totalLength = tokens.length

      if (tokens.length > maxTokens) {
        const handledTokens = handleExceededContent(tokens, maxTokens, exceedBehaviour)
        inputTiktokenResult.clipedLength = tokens.length - handledTokens.length
        webpageContent.textContent = enc.decode(handledTokens)
      }




      const summaryInput = {
        ...webpageContent,
        spokenLanguage: await getSpokenLanguage()
      }
      renderMessages(messages.value, summaryInput)
    } else {
      throw new Error('webpage content is empty')
    }
  }

  function initUIMessages() {
    uiMessages.value = []
  }


  async function refreshSummary() {
    await initMessages()
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
      event.emit('chunk', c)
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

  return { status, uiMessages, webpageContent, onReady, append, refreshSummary, currentModel, currentPrompt, tokenUsage, inputTiktokenResult, onChunk }
}