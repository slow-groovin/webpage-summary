import { InputContentLengthExceededStrategy } from "../types/summary";

export const allInputContentLengthExceededStrategys:Record<InputContentLengthExceededStrategy,any>={
  split:{
    name: 'split',
    desc: 'split into two parts and desert the second one to match max length'
  },
  error:{
    name: 'error',

    desc: 'throw a error '

  },
  ignore:{
    name: 'ignore',

    desc: 'ignore it and continue '

  },
}