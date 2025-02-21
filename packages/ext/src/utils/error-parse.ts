import { h } from "vue"
import { toast } from "../components/ui/toast"
import ToastAction from "../components/ui/toast/ToastAction.vue"
import SummaryErrorBox from "../components/summary/SummaryErrorBox.vue"



export function handleConnectError(e: any): any {
  // case: AI_APICallError
  if (e.name === "AI_APICallError") {
    // 404
    if (e.statusCode === '404') {
      networkErrorToase(e.responseBody)
      return e.responseBody
    }
    // llm error
    let body: { code: number, message: string, data: any } = { code: 0, message: '', data: null }
    try {
      body = JSON.parse(e.responseBody as string) as { code: number, message: string, data: any }
    } catch (parseError) {
      return e.responseBody as string
    }
    console.log(body.code)
    if (body.code === 20015) {
      toast({
        title: `Input token length exceeds maximum limit of model`,
        description: `Please reduce the Max Cotent Length of model config. API return message: ${body.message}`,
        variant: 'destructive',
      })
    } else {

    }
    return body.code + " : " + body.message


  } else if (e.message === 'Failed to fetch') {
    networkErrorToase(e.message)
    return e.message
  } else if (e.name === 'AI_TypeValidationError') {
    if (e.value.error.message === 'Provider returned error') {
      toast({
        title: e.name,
        description: e.value.error.metadata.raw,
        variant: 'destructive',
      })
    }

  } else {


    toast({
      title: e.name,
      description: 'please check the devtool console of this page and extension page',
      variant: 'destructive',
    })
    return e.message
  }
}

function networkErrorToase(message: string) {
  toast({
    title: `network error,cause: ${message},`,
    description: 'network error happens when connect llm api, please check if model api is correct, or examine the devtool',
    variant: 'destructive',
  })

}
