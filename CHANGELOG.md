# Changelog

## [0.2.2] - 2025-03-25

1. fix `--webpage-summary-panel-top` not working
2. add video tutorial in welcome page

## [0.2.1] - 2025-03-12

1. feature: a context menu item and a command for adding selection to chat input.
2. feature: add clear/reset for clearing all the messages in panel's dialog.
3. feature: support creating multiple panels (for comparing summary of different models or prompts)
4. add adaptation to SPA (Single Page Application), input page content will change when SPA change route.
5. fix: now chatting directly without first summarizing will send messages with page context.
6. fix: draggable functionality using `px` causing it out of view in screen adjustment situations such as changing from vertical to horizontal.
7. fix: write to clipboar failed in page of http protocol
8. optimize prompt item view, add prompt preset view for creating prompt with, add another two prompt presets, and with langs of `zh-CN` and `zh-TW`.

## [0.1.5] - 2025-02-27

1. input length calculation now does not include continuous '\n', ' '

## [0.1.4] - 2025-02-27

1. fix: double panel appears when trigger by action/contentMenu under `on click` permission mode
2. add language:zh for chrome store
3. toaster background color: transparent -> white(80%)
4. fix: error hint not show when call llm failed.( streamText() feature changes when updating @ai-sdk version)
5. fix: openai-compatible default baseURL has no effect.

## [0.1.3] - 2025-02-26

1. adaption to firefox
2. new feature: export/import settings

## [0.1.2] - 2025-02-25

1. add multiple llm providers.
2. fix `open setting` context button not work outside page
3. fix page problems: model config list page: add i18n, use full width, model edit: query problems

## [0.1.1] - 2025-02-24

1. change shortcut of user chatbox: `Shift+Enter : Submit` -> `Shift+Enter: newline` and `Enter: Submit`
2. welcome page on first install
3. improve browser extension declaration(fix permission lacks problem in Edge)
4. clean up some unused codes

## [0.1.0] - 2025-02-23

### The first fully functional version
