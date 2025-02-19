import { Readability } from "@mozilla/readability";
import { InputContentLengthExceededStrategy } from "../types/summary";



export function simpleParseRead() {
  const documentClone = document.cloneNode(true);
  const _article = new Readability(documentClone as Document, {}).parse();

  if (!_article) {
    console.warn("article is null.")
    return
  }
  const articleUrl = window.location.href;
  return {
    ..._article,
    articleUrl
  }
  // const author = _article.byline ?? "";
  // const authorLink = getMetaContentByProperty("article:author");
  // const domain = window.location.hostname;
  // console.log(articleUrl, author, authorLink, domain)
  // console.log(_article.title)
  // console.log(_article.content)
  // let showText=''
  
}

export function handleExceedContent(content: string, maxContentLength:number, strategy: InputContentLengthExceededStrategy):string {
  if(strategy==='split'){
    return content.slice(0, maxContentLength)
  }else if(strategy==='error'){
    throw new Error(`The length count of webpage summary input is ${content.length}, which exceeds the model setting's max length ${maxContentLength}`)
  }else if(strategy==='ignore'){
    return content
  }
  return content
}
