import { h } from "vue"
import { toast } from "../components/ui/toast"
import ToastAction from "../components/ui/toast/ToastAction.vue"
import SummaryErrorBox from "../components/summary/SummaryErrorBox.vue"



export function handleConnectError(e: any): any {
  // case: AI_APICallError
  if (e.name === "AI_APICallError") {
    aiApiCallErrorToast(e)
    return e.responseBody
  } else if (e.message === 'Failed to fetch') {
    networkErrorToast(e.message)
    return e.message
  } else if (e.name === 'AI_TypeValidationError') {
    if (e.value.error.message === 'Provider returned error') {
      toast({
        title: e.name,
        description: e.value.error.metadata.raw,
        variant: 'destructive',
      })
    }else{
      toast({
        title: e.name,
        description: e.value,
        variant: 'destructive',
      })
    }
    return e.value.error.metadata.raw

  } else {


    toast({
      title: e.name,
      description: 'please check the devtool console of this page and extension page',
      variant: 'destructive',
    })
    return e.message
  }
}

function aiApiCallErrorToast(e: any) {
  toast({
    title: `${e.name} ${e.url} ${e.statusCode} `,
    description: e.responseBody,
    variant: 'destructive',
  })
}
function networkErrorToast(message: string) {
  toast({
    title: `network error,cause: ${message},`,
    description: 'network error happens when connect llm api, please examine the devtool in extension\'s options page',
    variant: 'destructive',
  })
}
