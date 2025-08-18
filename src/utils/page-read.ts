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
  _article.textContent = cleanString(_article.textContent)
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
 * get page content from selectors
 * @param selectors - CSS选择器字符串数组
 * @returns 所有去重文本用句号连接的字符串
 */
export function textsBySelectors(selectors: string[]) {
  if (!selectors.length) return '';

  const processedElements = new Set<Element>();
  const uniqueTexts: string[] = [];

  for (const selector of selectors) {
    try {
      const elements = document.querySelectorAll(selector);

      elements.forEach(el => {
        if (!processedElements.has(el)) {
          processedElements.add(el);
          const text = el.textContent?.trim();
          if (text && text.length > 0) {
            uniqueTexts.push(text);
          }
        }
      });
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
    }
  }

  const textContent = uniqueTexts.map(t => `<p>${cleanString(t)}</p>`).join('\n');
  const content = textContent;
  const articleUrl = window.location.href;
  const title = document.title || '';
  const length = textContent.length;
  const excerpt = '';
  const byline = '';
  const dir = document.dir || '';
  const siteName = (document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement)?.content || window.location.hostname;
  const lang = document.documentElement.lang || '';
  const publishedTime =
    (document.querySelector('meta[property="article:published_time"]') as HTMLMetaElement)?.content || '';

  return {
    articleUrl,
    title,
    content,
    textContent,
    length,
    excerpt,
    byline,
    dir,
    siteName,
    lang,
    publishedTime,
  };
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