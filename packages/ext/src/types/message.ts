import { Ref } from "vue"

export type UIMessage={
  content: string,
  at: number,
  role: 'system'|'assistant'|'user',
  hide?: boolean,
}

