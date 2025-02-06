# webpage-summary

A browser extension for summarizing webpage text content via LLM api


# functionality

## multi triggers
1. keyboard shortcut
2. option menu
3. in-page button
4. context menu

## multi scratch methods
1. @mozilla/readability
2. in-page user pick
3. predefined xpath selector

## multi LLM api
1. origin api
2. third-party api such as OpenRouter
3. local LLM model such as ollama
4. third-party oss api such as together-ai, silicon-flow
5. cross Website request(?)

## customization
1. prompt-template
2. webpage xpath selector

## network
1. proxy
2. endpoint

## inspect
1. prompt-template view
2. token-usage view
3. page text content view
4. LLM response view

## advanced
1. two-round summary: low-price rough summary + high-price summary

## other
1. export as chat history
2. store and manage history in indexedDB
3. switch model and refresh