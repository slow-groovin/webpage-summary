import { Ref } from "vue"

export type UIMessage={
  content: Ref<string>,
  at: number,
  role: 'system'|'assistant'|'user'
}

