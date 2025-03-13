// packages/ext/src/composables/useStreamSummary.ts
import { sendConnectMessage } from '@/connect-messaging';
import { CoreMessage } from 'ai';
import { EventEmitter } from 'eventemitter3';
import { computed, onMounted, onUnmounted, Ref, ref, toRaw } from 'vue';
import { toast } from '../components/ui/toast';
import { ModelConfigItem } from '../types/config/model';
import { PromptConfigItem } from '../types/config/prompt';
import { UIMessage } from '../types/message';
import { TokenUsage, WebpageContent } from '../types/summary';
import { handleConnectError } from '../utils/error-parse';
import { renderMessages } from '../utils/prompt';
import { getEnableAutoBeginSummary, getSummaryLanguage } from './general-config';
import { useModelConfigStorage } from './model-config';
import { usePromptConfigStorage, usePromptDefaultPreset } from './prompt';
import { useWebpageContent } from './readability';
import { onSpaRouteChange } from '../utils/document';
import { simpleParseRead } from '../utils/page-read';



export function useSummary() {
  let disconnectOnSPARouteChange: Function
  onMounted(async () => {
    /*listen SPA change, update webpageContent
    */
    disconnectOnSPARouteChange = onSpaRouteChange(() => {
      webpageContent.value = simpleParseRead()
      stop();
      messages.value=[] //reset messages
      uiMessages.value=[] //reset ui messages

    }).disconnect
    try {
      currentModel.value = await modelStorage.getDefaultItem()
      currentPrompt.value = await promptStorage.getDefaultItem()
      isFailed.value = !(currentModel.value && currentPrompt.value && webpageContent.value)
      isPreparing.value = false
      event.emit('prepare-done')
      if (await getEnableAutoBeginSummary()) {
        refreshSummary()
      }
    } catch (e) {
      error.value = (e)
      event.emit('prepare-done')
    }
  })
  onUnmounted(() => {
    disconnectOnSPARouteChange?.()
  })

  const uiMessages = ref<UIMessage[]>([])
  const messages = ref<CoreMessage[]>([])


  const isRunning = ref(false)
  const isFailed = ref(false)
  const isPreparing = ref(true)

  const status = computed<'preparing' | 'failed' | 'ready' | 'running'>(() => {

    if (isRunning.value) {
      return 'running'
    }

    if (isFailed.value || error.value) {
      return 'failed'
    }

    if (isPreparing.value) {
      return 'preparing'
    }

    return 'ready'
  })
  const error = ref<any>()
  let stopFunction: CallableFunction | null = null

  /**
   * Ref<Function> for dealing with textContent, expose to component to reactivly assign, default is a directly return function
   */
  const textContentTrimmer = ref<{ trim: (s: string) => string }>({ trim: (content: string): string => content })
  // const inputContentLengthInfo = reactive<{
  //   totalLength?: number,
  //   clipedLength?: number,
  // }>({})


  const modelStorage = useModelConfigStorage()
  const promptStorage = usePromptConfigStorage()

  const currentModel = ref<ModelConfigItem | null>()
  const currentPrompt = ref<PromptConfigItem | null>()


  const promptPreset = usePromptDefaultPreset()
  const tokenUsage = ref<TokenUsage>({
    inputToken: 0,
    outputToken: 0,
  })

  let webpageContent: Ref<WebpageContent | undefined> = ref(simpleParseRead())




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
    /*
     * render and deal with content length exceed
     */
    if (webpageContent.value) {
      if (!webpageContent.value.textContent) webpageContent.value.textContent = ''

      if (textContentTrimmer.value) {
        webpageContent.value.textContent = textContentTrimmer.value.trim(webpageContent.value.textContent)
      }
      const summaryInput = {
        ...webpageContent.value,
        summaryLanguage: await getSummaryLanguage()
      }
      renderMessages(messages.value, summaryInput)
    } else {
      throw new Error('webpage content is empty')
    }

    //init ui messages with first two message hidden
    uiMessages.value = messages.value.map(m => ({
      at: Date.now(),
      content: m.content as string,
      role: m.role as 'system' | 'user',
      hide: true
    }))
  }


  async function refreshSummary() {
    try {
      chat('', 'assistant')

    } catch (e) {
      console.error(e)
      error.value = handleConnectError(e)
    }

  }

  async function copyMessages() {
    await navigator.clipboard.writeText(uiMessages.value.map(m => m.role + ':  ' + m.content).join('\n' + '-'.repeat(50) + '\n'))
    toast({ title: "copied to clipboard success!", variant: 'success' })
  }

  
  async function chat(content: string, role: 'user' | 'assistant') {
    if (!verfiyReady()) {
      return
    }
    if (messages.value.length == 0) {
      await initMessages()
    }
    /*content can be '', for reusing this function to trigger initial summary with the first two messages.    */
    if (content) {
      messages.value.push({
        role: role, content: content
      })

      //show user input message
      if (role === 'user') {
        uiMessages.value.push({ role: 'user', content: content, at: Date.now() })
      }
    }

    //show latest assitant message
    uiMessages.value.push({ role: 'assistant', content: '', at: Date.now() })


    isRunning.value = true
    const { textStream, tokenUsage: newTokenUsage, stop } = await sendConnectMessage(
      'streamTextViaConnect',
      {
        modelConfig: toRaw(currentModel.value!), //firefox will throw if it is a proxy object
        messages: toRaw(messages.value),
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

      /*push to messages */
      messages.value.push({ role: 'assistant', content: uiMessages.value[uiMessages.value.length - 1].content })

      /*calc token usage */
      const { inputToken, outputToken } = await newTokenUsage
      const cost = (currentModel.value?.inputTokenPrice ?? 0) * inputToken / 100_0000 + (currentModel.value?.outputTokenPrice ?? 0) * outputToken / 100_0000

      tokenUsage.value = {
        inputToken: tokenUsage.value.inputToken + inputToken,
        outputToken: tokenUsage.value.outputToken + outputToken,
        cost: cost,
        unit: currentModel.value?.priceUnit
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

  async function resetMessages() {
    await initMessages()
    toast({title:'reset summary.', variant:'success'})
    
  }

  return {
    status,
    error,
    uiMessages,
    webpageContent,
    onChunk,
    onPrepareDone: onPrepareDone,
    chat,
    stop,
    refreshSummary,
    currentModel,
    currentPrompt,
    tokenUsage,
    textContentTrimmer,
    copyMessages,
    resetMessages
  }
}