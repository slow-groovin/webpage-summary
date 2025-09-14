import { CoreMessage } from 'ai';
import Mustache from 'mustache';
import { SummaryInputSchema, SummaryInput } from '../types/summary';



export function renderMessages(messages: CoreMessage[], value: SummaryInput) {
  SummaryInputSchema.parse(value)
  messages.forEach(m => {
    if (typeof m.content === 'string')
      m.content = Mustache.render(m.content, value)
  })
}