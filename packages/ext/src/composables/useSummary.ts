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
import { getEnableAutoBeginSummary, getSummaryLanguage, getSummaryInputExceedBehaviour } from './general-config';
import { EventEmitter } from 'eventemitter3'
import { handleExceedContent } from '../utils/page-read';
import { handleConnectError } from '../utils/error-parse';



export function useSummary() {
  onMounted(async () => {
    try {
      currentModel.value = await modelStorage.getDefaultItem()
      currentPrompt.value = await promptStorage.getDefaultItem()
      isFailed.value = !(currentModel.value && currentPrompt.value && webpageContent)
      isPreparing.value = false
      await initMessages()
      event.emit('prepare-done')
      if (await getEnableAutoBeginSummary()) {
        append('', 'assistant')
      }
    } catch (e) {
      error.value=(e)
      event.emit('prepare-done')
      // toast({ title: 'Error', description: handleConnectError(e), variant: 'destructive' })
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
    if (isRunning.value) {
      return 'running'
    }

    if (isFailed.value) {
      return 'failed'
    }

    if (isPreparing.value) {
      return 'preparing'
    }

    return 'ready'
  })
  const error = ref<any>()
  let stopFunction: CallableFunction | null = null
  const inputContentLengthInfo = reactive<{
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



  const event = new EventEmitter()

  function onPrepareDone(onReadyHook: () => void) {
    event.once('prepare-done', onReadyHook)
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
    } else if (status.value === 'running') {
      return false
    }
    return true
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

      const maxContentLength = currentModel.value.maxContentLength
      inputContentLengthInfo.totalLength = webpageContent.textContent.length
      if (maxContentLength) {
        const exceedBehaviour = await getSummaryInputExceedBehaviour()
        if (webpageContent.textContent.length > maxContentLength) {
          webpageContent.textContent = handleExceedContent(webpageContent.textContent, maxContentLength, exceedBehaviour)
        }
        inputContentLengthInfo.clipedLength = inputContentLengthInfo.totalLength - webpageContent.textContent.length
      }

      const summaryInput = {
        ...webpageContent,
        summaryLanguage: await getSummaryLanguage()
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

  async function copyMessages() {
    await navigator.clipboard.writeText(uiMessages.value.map(m=>m.content).join('\n\n'))
    toast({ title: "copied to clipboard success!", variant: 'blockquote-success' })
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
    const { textStream, tokenUsage: newTokenUsage, stop } = await sendConnectMessage(
      'streamTextViaConnect',
      {
        modelConfig: currentModel.value!,
        messages: messages.value,
      },
      {
        onError: (e) => {
          isRunning.value = false
          isPreparing.value = false
          isFailed.value = true

          error.value = handleConnectError(e)
        }
      }
    )
    stopFunction = stop
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

  async function stop() {
    if (!stopFunction) {
      console.error("stop function is not defined")
      return
    }
    stopFunction()
    isRunning.value = false
  }

  return {
    status,
    error,
    uiMessages,
    webpageContent,
    onChunk,
    onPrepareDone: onPrepareDone,
    append,
    stop,
    refreshSummary,
    currentModel,
    currentPrompt,
    tokenUsage,
    inputContentLengthInfo,
    copyMessages
  }
}