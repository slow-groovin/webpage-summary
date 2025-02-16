// packages/ext/src/composables/useStreamSummary.ts
import { ref, computed, onUnmounted } from 'vue';
import { sendMessage } from '@/messaging';
import { browser, Runtime } from 'wxt/browser';
import { uid } from 'radash';
import markdownit from 'markdown-it';
import type { Ref } from 'vue';
import modelProviders from '../model-providers';
import { CoreMessage } from 'ai';

interface StreamSummaryOptions {
  messages: CoreMessage[]; // 替换为实际的消息类型
  modelName: keyof typeof modelProviders;
  onChunk?: (chunk: string) => void;
  onComplete?: () => void;
}

export function useCallLLMViaMessage() {
  const sumResult = ref('');
  const md = markdownit();
  const sumResultHtml = computed(() => md.render(sumResult.value));
  const isStreaming = ref(false);
  let port: Runtime.Port | null = null;

  const startStreamSummary = async (options: StreamSummaryOptions) => {
    isStreaming.value = true;
    const randId = uid(4);
    const { messages, modelName, onChunk, onComplete } = options;

    const result = await sendMessage('streamText', {
      messages,
      modelName,
      connectId: randId,
    });

    port = browser.runtime.connect({ name: randId });

    const listener = (msg: unknown) => {
      sumResult.value += msg;
      onChunk?.(msg as string);
    };

    port.onMessage.addListener(listener);
    port.onDisconnect.addListener(() => {
      console.log('[port][disconnect] in composable')
      port?.onMessage.removeListener(listener);
      isStreaming.value = false;
      onComplete?.();
    });

    port.postMessage('begin');
    return {port}
  };


  onUnmounted(() => {
    if(port){
      port.disconnect()
    }
  });

  return {
    sumResult,
    sumResultHtml,
    startStreamSummary,
    isStreaming
  };
}