

export function parseVercelSDKError(e:any){
  if(e.name==="AI_APICallError"){
    const body=JSON.parse(e.responseBody as string)
    return body as {code: number, message: string, data:any}
  }
  return false
}