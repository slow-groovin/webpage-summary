import { Readability } from "@mozilla/readability";
import { omit } from "radash";


/**
 * use `@mozilla/readability` to get page content
 * @returns u
 */

export function simpleParseRead() {
  const documentClone = document.cloneNode(true);
  const _article = new Readability(documentClone as Document, {}).parse();
  if (!_article) {
    console.warn("article is null.")
    return
  }
  _article.textContent=cleanString(_article.textContent)
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


/**
 * 将连续的\n ' '替换为单个
 * @param input 
 * @returns 
 */
export function cleanString(input: string): string {
  return input.replace(/(\n+\s+\n)|(\s{2,})/g, match => {
    if (match.includes('\n')) {
      return '\n';
    }
    return ' ';
  });
}