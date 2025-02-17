// packages/ext/src/composables/useStreamSummary.ts
import { ref, computed, onUnmounted } from 'vue';
import { sendMessage } from '@/messaging';
import { browser, Runtime } from 'wxt/browser';
import { uid } from 'radash';
import markdownit from 'markdown-it';
import type { Ref } from 'vue';
import modelProviders from '../model-providers';
import { CoreMessage } from 'ai';
