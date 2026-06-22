import { defineExtensionMessaging } from '@webext-core/messaging';

export interface ProtocolMap {
  /** Opens the options page at the specified hash/path */
  openOptionPage(url: string): Promise<void>;

  /** Triggers options or popup page opening */
  openPopupPage(input: { query: string }): Promise<void>;
  
  /** Instructs the content script summary panel to toggle or begin summarizing */
  invokeSummary(payload?: { beginSummary?: boolean }): void;

  /** Passes text selection from a context menu action to the content chat input */
  addContentToChatDialog(content: string): void;

  /** Token counting and truncation */
  countInputTokens(input: { text: string }): number;
  countInputTokensWithTiming(input: { text: string }): import('./token-count').InputTokenCountResult;
  truncateByTokens(input: { text: string; maxTokens: number }): string;
  truncateByTokensWithTiming(input: { text: string; maxTokens: number }): import('./token-count').TruncateByTokensResult;
  splitTokensWithTiming(input: { text: string }): import('./token-count').SplitTokensResult;

  /** Pings the content script to check if it's active */
  ping(): Promise<{ ok: boolean; title: string; url: string; textLength: number }>;

  /** Extracts text content from the current page */
  extractText(): Promise<{ ok: boolean; title?: string; url?: string; text?: string; error?: string }>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
