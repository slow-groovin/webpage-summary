<div align="center ">
 <img src="./packages/ext/assets/16.png"/>
 <h2>Webpage Summary</h2>
 <p align="center">Browser extension for summarizing webpage text content with AI (LLM)</p>
</div>

[![wakatime](https://wakatime.com/badge/user/6476bd96-6b6e-4943-b20d-e7f34889cb5a/project/34d281d5-2656-4ac2-a17c-4141f46d06f7.svg)](https://wakatime.com/badge/user/6476bd96-6b6e-4943-b20d-e7f34889cb5a/project/34d281d5-2656-4ac2-a17c-4141f46d06f7)

<p align="center">
  <span>English</span>
  <a href="./docs/README_zh.md">简体中文</a>
</p>


![summary](/docs/img/summary-anim.webp)


- [1. Features](#1-features)
- [2. Install](#2-install)
- [3. Usage](#3-usage)
  - [3.1. Quick Start](#31-quick-start)
  - [3.2. Trigger](#32-trigger)
  - [3.3. Error Inspect](#33-error-inspect)
  - [3.4. Proxy for LLM Requests](#34-proxy-for-llm-requests)
- [4. Inspiration](#4-inspiration)
- [5. Feedback\&Suggestions](#5-feedbacksuggestions)
- [6. Contribution](#6-contribution)
- [7. Update History](#7-update-history)

## 1. Features

1.  Custom AI (LLM) provider configuration, use any provider you like
2.  Custom prompt templates
3.  Switch between different models or prompts on the page
4.  Input context length adjustment/limit & token usage view
5.  Multiple triggers for opening the panel: `Auto Open` / `Floating Ball` / `Context Menu` / `Keyboard Shortcut` / `Action Click`
6.  Auto begin summary: `Enable/Disable`
7.  Works with different site access permissions in the browser; can be started from the contextMenu without current tab's permission
8.  Privacy without concerns, no telemetry/data collection/unrelated feature requests
9.  (Future) Summary in popup / in-page side panel / side panel
10. (Future) Site customization (glob, selector, trigger, whitelist, blacklist)
11. (Future) Cross-site LLM request (using session requests from LLM websites)

## 2. Install

<div align="">
<a href="https://chromewebstore.google.com/detail/dhdnamkkepndgjimbpacmibkblndangk?utm_source=item-share-cp/">
  <img src="https://fonts.gstatic.com/s/i/productlogos/chrome_store/v8/192px.svg" height="40" style="margin-right:1em;padding-top:2px"/ >
</a>
<a href="https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png">
  <img src="https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png" height="30"/ >
</a>
<a href="https://addons.mozilla.org/zh-CN/firefox/addon/webpage-summary/">
  <img src="https://addons.mozilla.org/static-frontend/459ebe418a9783cd0b80bdd8b98e5faa.svg" height="30"/ >
</a>
</div>

or download from [Github Releases](https://github.com/slow-groovin/webpage-summary/releases) and manually install

## 3. Usage

### 3.1. Quick Start

1.  Configure a model
![create model](/docs/img/create-model-anim.webp?width=500&height=300)
2.  Open a page, click summary
![summary](/docs/img/summary-anim.webp)
3.  Continue to chat, or try modifying configurations

### 3.2. Trigger

By default, the summary panel does not open automatically. You can open it in the following four ways:

1.  Click the floating ball in the lower right corner of the page (configurable: `Yes (default) / No` display)
2.  Click the action (popup) button, then click the "Summarize" button on the page (configurable: clicking the action (popup) button can `Open the panel directly / Open the popup page (default)`)
3.  Click "⚡ Summarize This Page" in the page's context menu
4.  (Manual configuration required) Configure a keyboard shortcut through the browser extension settings (not the plugin's options page). You can configure a shortcut trigger (recommended `Alt+S`)

> You can also configure `Auto open summary panel on new tab`

<br>

By default, the summary does not start automatically after opening the panel. You need to click the "Sum" button in the panel to start summarizing.

> You can configure `Auto begin summary` to automatically start summarizing when the panel is opened.

<br>

By default, the plugin has access to all sites.

> You can change the plugin's access permission to `On Click` in the browser settings:
> - Some browsers (such as Edge) can directly run the plugin's functionality on the page with one click of the action icon.
> - Other browsers (such as Chrome) acquire page permissions after clicking the action icon, but need to refresh the page to run the plugin's functionality on the page. However, it doesn't matter, you can one step run by the `Summarize This Page ⚡` button in the right-click menu (like `Immersive Translate` extension).

### 3.3. Error Inspect

Some errors may not be displayed through the UI. You can view the errors of the summary panel through the developer console of the current webpage.

View the logs of the plugin background through the developer console of the background (options) page.

Requests sent to the LLM API can also be viewed in the developer console of the background page.

### 3.4. Proxy for LLM Requests

This plugin does not provide proxy functionality itself. It can be used with other browser proxy plugins (similar to ProxySwitchOmega) to implement proxying of specified URL traffic.

## 4. Inspiration

Copying webpage content into a llm website, then entering prompts and viewing the results is a common workflow for many people today. A browser plugin is needed to replace this process.

Currently, the following provide this functionality:

- Some small company products such as sider.ai, briefy.ai, require a considerable subscription price.
- Some large model vendors provide free plugin ends, such as Doubao plugin, Kimi browser plugin. They are completely free. The user experience of Doubao plugin even far exceeds sider.ai with a subscription fee of $8/m, but it completely takes over your page and is somewhat laggy in terms of performance. It cannot even be put on the browser's extension store. If you don't care about privacy at all, Doubao plugin is the best choice.
- A large number of AI application plugins from individual developers in the browser store simply encapsulate an LLM API, and none of them are open source.
- [chatGPTBox](https://github.com/josStorer/chatGPTBox): The only open-source webpage summary plugin I found, it supports multiple model configurations and has made specific website customizations. The interface design of this project is inspired by it.

[chatGPTBox](https://github.com/josStorer/chatGPTBox) is a nice project, but it lacks prompt customization features. In addition, its technology stack (React) is different from mine, so I decided to develop a new webpage summary browser plugin with my own technology stack (Vue, [wxt](https://github.com/wxt-dev/wxt), [vercel-ai-sdk](https://sdk.vercel.ai/)).

## 5. Feedback&Suggestions

🙌 Welcome any feedback or suggestions

If you have any suggestions for features, interface suggestions, bugs, questions, usage feedback, or any ideas, please submit them in the issue.

## 6. Contribution

Welcome to contribute to documentation, i18n support, UI, and features. Please refer to [CONTRIBUTING.md](CONTRIBUTING.md)

## 7. Update History

Please refer to [CHANGELOG](/CHANGELOG.md)
