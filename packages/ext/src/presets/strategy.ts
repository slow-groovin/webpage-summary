import { InputContentLengthExceededStrategy } from "../types/summary";

export const contentLengthExceededStrategys:Record<InputContentLengthExceededStrategy,any>={
  "cut-preserve-front":{
    name: 'cut-preserve-front',
    desc: 'Split the content, keeping the first half with the maximum length.'
  },
  "cut-preserve-end":{
    name: 'cut-preserve-end',

    desc: 'Split the content, keeping the second half with the maximum length. '

  },
  "cut-preserve-middle":{
    name: 'cut-preserve-end',
    desc: 'Split the content into 3 parts, with the middle part of maximum length beging preserved, front and end sides are equally divided.'

  },
  "nothing":{
    name: 'nothing',
    desc: 'do nothing '
  },
}