// packages/ext/src/composables/useStreamSummary.ts
import { sendConnectMessage } from '@/connect-messaging';
import { CoreMessage } from 'ai';
import { computed, onMounted, ref } from 'vue';
import { toast } from '../components/ui/toast';
import { ModelConfigItem } from '../types/config/model';
import { PromptConfigItem } from '../types/config/prompt';
import { UIMessage } from '../types/message';
import { TokenUsage } from '../types/summary';
import { renderMessages } from '../utils/prompt';
import { useModelConfigStorage } from './model-config';
import { usePromptConfigStorage, usePromptDefaultPreset } from './prompt';
import { useWebpageContent } from './readability';
import { useSpokenLanguage } from './general-config';


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

  const { webpageContent } = useWebpageContent()

  let onReadyResolve: ((u?: unknown) => void) | null = null
  let onReadyReject: (() => void) | null = null
  let onReadyPromise = new Promise((resolve, reject) => {
    onReadyResolve = resolve
    onReadyReject = reject
  })
  let chunkHooks: ((c: unknown) => void)[] = []

  function onChunkHook(func: typeof chunkHooks[0]) {
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

  async function initMessages() {
    messages.value = [
      { role: 'system', content: currentPrompt.value?.systemMessage ?? promptPreset.systemMessage },
      { role: 'user', content: currentPrompt.value?.userMessage ?? promptPreset.userMessage },
    ]
    const { spokenLanguage, then } = useSpokenLanguage()
    await then

    if (webpageContent) {
      const summaryInput = {
        ...webpageContent,
        spokenLanguage: spokenLanguage.value
      }
      renderMessages(messages.value, summaryInput)
    } else {
      throw new Error('webpage content is empty')
    }
  }

  function initUIMessages() {
    uiMessages.value = []

  }
  console.log('onMounted')
  onMounted(async () => {
    currentModel.value = await modelStorage.getDefaultItem()
    currentPrompt.value = await promptStorage.getDefaultItem()
    isFailed.value = !(currentModel.value && currentPrompt.value && webpageContent)
    isPreparing.value = false
    await initMessages()
    onReadyResolve!()
  })
  console.log('onMounted .')

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
      chunkHooks.forEach(hookFunc => hookFunc(c))
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

  return { status, uiMessages, webpageContent, onReady: onReadyPromise, append, refreshSummary, currentModel, currentPrompt, tokenUsage, onChunkHook }
}