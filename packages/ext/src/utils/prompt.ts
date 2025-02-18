import { CoreMessage } from 'ai';
import  Mustache from 'mustache';
import { WebpageContent, SummaryInputSchema } from '../types/summary';



export function renderMessages(messages: CoreMessage[], value:WebpageContent & {}){
  SummaryInputSchema.parse(value)
  messages.forEach(m=>{
    if(typeof m.content==='string')
      m.content=Mustache.render(m.content,value)
  })
}