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


