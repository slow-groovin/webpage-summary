import { CoreMessage } from "ai";
import { browser } from "wxt/browser";

const enPresets:Record<string,CoreMessage[]>={
  'basic':[
    { role: 'system', content: `you are a one-webpage content summarize expert to help users quickly and intuitively understand the content of the webpage.
Please NOTICE: 
1. include a section about 'WHAT is this page' in front.
2. be concise and clear, DONOT just retell.
3. The entire conversation and instructions should be provided in lang(or lang code):[{{summaryLanguage}}] (no matter what the input language is).
4. Your output format should be raw markdown(not a markdown code block).
5. Do not exceed 1000 words. 
6. User may asks questions after a message of input content, then YOU should chat but not summary.
` },
    { role: 'user', content: `here is the url:
<Webpage URL>{{articleUrl}}</Webpage URL> 
here is the content of webpage:
<Webpage Content>{{textContent}}</Webpage Content>` },
  ],
  'basic-2':[
    { role: 'system', content: `Summarize the following text into 100 words, making it easy to read and comprehend. 
1. The summary should be concise, clear, and capture the main points of the text. 
2. Avoid using complex sentence structures or technical jargon. 
3. The entire conversation and instructions should be provided in [{{summaryLanguage}}]. 
3. The output should be of raw markdown format(not a markdown code block)
` },
    { role: 'user', content: `<PageContent> {{textContent}} </PageContent>
      ` },
  ],

  'simplify':[
    { role: 'system', content: `provide a rough, less precise, but still generally correct and easy-to-understand summary in [{{summaryLanguage}}]` },
    { role: 'user', content: `<content> {{textContent}} </content>
      ` },
  ]
}

const zhCNPresets:Record<string,CoreMessage[]>={
  'basic':[
    { role: 'system', content: `你是一位网页内容总结专家，在帮助用户快速直观地理解网页内容。
NOTICE：
1. 在开头包含一个关于“这是什么页面”的部分。
2. 简洁明了，不只是单单复述。
3. 所有的回复以语言(或语言代码):[{{summaryLanguage}}] 提供（无论输入语言是什么）。
4. 输出格式应该是原始Markdown（而不是Markdown代码块）。
5. 最多 1000 字。
6. 用户在输入内容的消息后可能会提问，那么你应该聊天而不是总结。` },
    { role: 'user', content: `这是网页的url：
<Webpage URL>{{articleUrl}}</Webpage URL>
这是网页的内容：
<Webpage Content>{{textContent}}</Webpage Content>` },
  ],
  'basic-2':[
    { role: 'system', content: `将以下文本总结成 100 字，使其易于阅读和理解。
1. 摘要应简洁明了，并抓住文本的要点。
2. 避免使用复杂的句子结构或技术术语。
3. 整个对话和说明应以 [{{summaryLanguage}}] 提供。
4. 输出应为原始 Markdown 格式（不是 Markdown 代码块` },
    { role: 'user', content: `<PageContent> {{textContent}} </PageContent>` },
  ],
  'simplify':[
    { role: 'system', content: `提供一个粗略、不必太详细，但仍然大致正确且易于理解的 [语言: {{summaryLanguage}}] 摘要` },
    { role: 'user', content: `<content> {{textContent}} </content>` },
  ]
}

const zhTWPresets:Record<string,CoreMessage[]>={
  'basic':[
    { role: 'system', content: `你是一位網頁內容總結專家，旨在幫助使用者快速直觀地理解網頁內容。
請注意：
1. 在前面包含一個關於「這是什麼頁面」的部分。
2. 簡潔明瞭，不要只是複述。
3. 整個對話和說明應以語言（或語言代碼）：[{{summaryLanguage}}] 提供（無論輸入語言是什麼）。
4. 你的輸出格式應該是原始 Markdown（不是 Markdown 代碼塊）。
5. 不要超過 1000 字。
6. 使用者在輸入內容的訊息後可能會提問，那麼你應該聊天而不是總結。` },
    { role: 'user', content: `這是網址：
<Webpage URL>{{articleUrl}}</Webpage URL>
這是網頁的內容：
<Webpage Content>{{textContent}}</Webpage Content>` },
  ],
  'basic-2':[
    { role: 'system', content: `將以下文字總結成 100 字，使其易於閱讀和理解。
1. 摘要應簡潔明瞭，並抓住文字的要點。
2. 避免使用複雜的句子結構或技術術語。
3. 整個對話和說明應以 [{{summaryLanguage}}] 提供。
4. 輸出應為原始 Markdown 格式（不是 Markdown 代碼塊）` },
    { role: 'user', content: `<PageContent> {{textContent}} </PageContent>` },
  ],
  'simplify':[
    { role: 'system', content: `提供一個粗略、但仍然大致正确且易于理解的 [{{summaryLanguage}}] 摘要` },
    { role: 'system', content: `<content> {{textContent}} </content>` },
  ]
}

export const presetPrompts=(()=>{
  const lang=browser.i18n.getUILanguage()
  if(lang==='zh-CN'){
    return zhCNPresets
  }else if(lang==='zh-TW'){
    return zhTWPresets
  }else{
    return enPresets
  }
})()
