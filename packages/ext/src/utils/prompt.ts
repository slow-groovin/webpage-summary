import { CoreMessage } from 'ai';
import  Mustache from 'mustache';
import { SummaryInput, SummaryInputSchema } from '../types/summary';
import { z } from 'zod';

// const view = {
//   title: "Joe",
//   calc: () => ( 2 + 4 )
// };

// const output = Mustache.render("{{title}} spends {{calc}}", view);
// console.log(output)

export function renderMessages(messages: CoreMessage[], value:SummaryInput){
  SummaryInputSchema.parse(value)
  messages.map(m=>{
    if(typeof m.content==='string')
      m.content=Mustache.render(m.content,value)
  })
}