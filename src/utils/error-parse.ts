import { toast } from "../components/ui/toast";

/**
 * handle the error, give a hint based on error type.
 * Notice: error serialize/unserialize behave different on chrome/firefox, so use `e._message??e.message??JSON.stringify(e)` to adapt.
 *
 * @param e
 * @returns
 */
export function handleConnectError(e: any): any {
  console.error(e);

  if (e.name === "AI_APICallError") {
    // case: AI_APICallError

    aiApiCallErrorToast(e);
    return e.responseBody;
  } else if (e.message === "Failed to fetch") {
    networkErrorToast(e.message);
    return e.message;
  } else if (e.name === "AI_TypeValidationError") {
    if (e.value.error.message === "Provider returned error") {
      toast({
        title: e.name,
        description: e.value.error.metadata.raw,
        variant: "destructive",
      });
    } else {
      toast({
        title: e.name,
        description: e.value,
        variant: "destructive",
      });
    }
    return e.value.error.metadata.raw;
  } else {
    toast({
      title: e.name,
      description: e._message ?? e.message ?? JSON.stringify(e),
      variant: "destructive",
    });
    return e.message;
  }
}

function aiApiCallErrorToast(e: any) {
  console.log(e, e.message, e.stack);
  toast({
    title: `${e.name} ${e.url} ${e.statusCode} `,
    description: e._message ?? e.message ?? e.responseBody ?? "see console",

    variant: "destructive",
  });
}
function networkErrorToast(message: string) {
  toast({
    title: `network error,cause: ${message},`,
    description:
      "network error happens when connect llm api, please examine the devtool in extension's options page",
    variant: "destructive",
  });
}
