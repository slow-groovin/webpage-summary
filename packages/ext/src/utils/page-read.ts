import { Readability } from "@mozilla/readability";
import { ContentTokensExceedStrategy } from "../types/summary";



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

export function handleExceededContent(tokens: number[], maxTokens:number, strategy: ContentTokensExceedStrategy):number[] {
  if(strategy==='clip'){
    return tokens.slice(0,maxTokens)
  }else if(strategy==='exit'){
    throw new Error(`The tokens count of webpage summary input is ${tokens.length}, which exceeds the model setting's max count ${maxTokens}`)
  }
  return tokens
}