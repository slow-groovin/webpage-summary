<script lang="ts" setup>
import { Readability } from '@mozilla/readability';
import { ref } from 'vue';

const reRenderElem = ref<HTMLElement | null>(null)
const article=ref< {
    title: string;
    content: string;
    textContent: string;
    length: number;
    excerpt: string;
    byline: string;
    dir: string;
    siteName: string;
    lang: string;
    publishedTime: string;
}>()
const documentHtmlLen=document.body.innerHTML.length
const documentTextLen=document.body.innerText.length
const documentOuterHtmlLen=document.body.outerHTML.length
const documentOuterTextLen=document.body.outerText.length




const getMetaContentByProperty = (metaProperty: string) => {
  const metas = document.getElementsByTagName("meta");

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("property") === metaProperty) {
      return metas[i].getAttribute("content");
    }
  }

  return "";
};

function readParse() {
  const documentClone = document.cloneNode(true);
  const _article = new Readability(documentClone as Document, {}).parse();
  article.value=_article??undefined
  if (!_article) {
    console.warn("article is null.")
    return
  }
  const articleUrl = window.location.href;
  const author = _article.byline ?? "";
  const authorLink = getMetaContentByProperty("article:author");
  const domain = window.location.hostname;
  console.log(articleUrl, author, authorLink, domain)
  console.log(_article.title)
  console.log(_article.content)
  reRenderElem.value!.innerHTML=_article.content

}

// readParse()
function printDocumentInnerText() {
  console.log('document.body.innerText',document.body.innerText)
}

function printDocumentTree(){
  console.log(document.childElementCount,document.children)
  console.log(document.firstChild)
}
printDocumentTree()
</script>

<template>
  <div>
    <h1> @mozilla/readability</h1>
    <button @click="readParse">readParse</button>
    <button @click="printDocumentInnerText">print(document.body.innerText)</button>
    <div v-if="article" class="p-2 border">
      <div>article.content.length:{{ article.content.length }}</div>
      <div>article.textContent.length:{{ article.textContent.length }}</div>
      <div>article.length:{{ article.length }}</div>
      <div>document.body.innerHtml.length:{{ documentHtmlLen }}</div>
      <div>document.body.innerText.length:{{ documentTextLen }}</div>
      <div>document.body.outerHtml.length:{{ documentOuterHtmlLen }}</div>
      <div>document.body.outerText.length:{{ documentOuterTextLen }}</div>
    </div>
    <div ref="reRenderElem" class="max-h-[50vh] max-w-[50vw] overflow-auto">

    </div>
  </div>
</template>

<style scoped></style>
