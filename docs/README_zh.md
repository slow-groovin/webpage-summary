
<div align="center ">
 <img src="../packages/ext/assets/16.png"/>
 <h2>网页总结 Webpage Summary</h2>
 <p align="center">使用AI对网页内容进行总结的浏览器插件</p>
</div>


[![wakatime](https://wakatime.com/badge/user/6476bd96-6b6e-4943-b20d-e7f34889cb5a/project/34d281d5-2656-4ac2-a17c-4141f46d06f7.svg)](https://wakatime.com/badge/user/6476bd96-6b6e-4943-b20d-e7f34889cb5a/project/34d281d5-2656-4ac2-a17c-4141f46d06f7)

<p align="center">
  <a href="/README.md">English</a>
  <span>简体中文</span>
</p>

- [1. Features](#1-features)
- [2. Install](#2-install)
- [3. Usage](#3-usage)
  - [3.1. quick start](#31-quick-start)
  - [3.2. trigger](#32-trigger)
  - [3.3. error inspect](#33-error-inspect)
  - [3.4. 让llm请求走proxy](#34-让llm请求走proxy)
- [4. 启发](#4-启发)
- [5. 反馈和建议](#5-反馈和建议)
- [6. 贡献](#6-贡献)
- [7. 更新历史](#7-更新历史)


## 1. Features

1. 配置任何 AI(llm)
2. 自定义 prompt 模板
3. 在页面中即时切换不同的模型/prompt
4. 输入上下文长度调整/限制 & token 使用情况查看
5. 多种触发方式打开面板：`自动打开` / `悬浮球` / `右键菜单` / `键盘快捷键` / `图标点击`
6. 自动开始总结：`启用/禁用`
7. 支持在浏览器不同`站点访问权限`下工作，可以在设置为`单击时`一步启动
8. 隐私无顾虑, 没有任何遥测/数据收集/无关功能的请求
9. (Future) 在 popup/in-page side面板/side面板中总结
10. (Future) 站点自定义（glob, selector, trigger, whitelist, blacklist）
11. (Future) 通过 llm网站的session请求


##  2. Install
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

或者手动安装 [Github Relases](https://github.com/slow-groovin/webpage-summary/releases)

## 3. Usage
### 3.1. quick start
1. 配置一个模型
![create model](/docs/img/create-model-anim.webp?width=500&height=300)
2. 打开一个页面, 点击总结
![summary](/docs/img/summary-anim.webp)
3. 继续聊天, 或者尝试调整配置




### 3.2. trigger
默认情况下, 总结面板不会自动打开, 可以用以下4种方式打开总结面板:
1. 点击页面右侧下方悬浮球 (可配置`是(默认)/否`显示)
2. 点击action(popup)按钮, 然后点击页面内的`总结当前页`按钮 (可配置点击action(popup)按钮`直接打开面板/打开popup页面(默认)`)
3. 在页面右键菜单中点击 `"总结此页⚡"`
4. (需手动配置) 通过浏览器扩展快捷键配置(非插件后台配置), 您可以配置一个快捷键 trigger (推荐`Alt+S`)

> 您也可以配置 `新页面自动打开总结面板`

<br>

默认情况下, 打开面板后不会自动开始总结, 需要点击面板中的 `"总结"` 按钮开始总结
> 您可以配置 `自动开始总结`, 在面板打开时自动开始总结

<br>

默认情况下, 插件具有所有站点的访问权限

您可以在浏览器配置中将插件访问权限改为 `单击时`:
- 某些浏览器(如Edge), 可以通过一次点击插件按钮, 使插件的功能直接在页面上运行
- 其它的浏览器(如Chrome), 点击插件按钮之后获取了页面权限, 但是需要刷新之后才能在页面上运行插件功能, 但是没关系, 您可以通过右键菜单里的`总结此页⚡`按钮直接在页面上运行插件功能(从`沉浸式翻译`那里学的)




### 3.3. error inspect
某些报错可能没有通过 UI 显示, 可以通过当前网页的开发者控制台查看总结面板的报错.

通过后台 (options) 页面的开发者控制台查看插件后台的日志

发送向 llm api 的请求也在后台页面的开发者控制台中查看

### 3.4. 让llm请求走proxy
这个插件本身不提供 proxy 功能, 可以搭配其它浏览器 proxy 插件 (类似于 ProxySwitchOmega), 实现指定 url 流量通过代理


## 4. 启发
把网页内容复制进大模型网站, 然后输入提示词并查看结果, 这是无数人今天日常要做的事情, 需要一个浏览器插件让这个过程简化一点

目前提供这个功能的有:
- 一些小型公司的产品如 sider.ai, briefy.ai, 需要不菲的订阅价格
- 一些大模型厂商提供的免费插件端, 如豆包插件,Kimi浏览器插件, 它们完全免费, 豆包插件的使用体验甚至远超 59 元订阅费的 sider.ai, 但是它完全接管了你的页面, 而且在性能方面有些卡顿, 它甚至无法上架浏览器的应用商店, 如果你完全不在乎隐私的话, 豆包插件是一个最好的选择.
- 浏览器商店中的大量个人开发者的 ai 应用插件, 简单的封装了个 llm api, 功能能不能用先不说, 都不是开源
- [chatGPTBox](https://github.com/josStorer/chatGPTBox): 我找到的唯一一款的开源的网页总结插件, 支持多种模型配置并做了特定网站的定制, 本项目的界面设计受其启发

[chatGPTBox](https://github.com/josStorer/chatGPTBox) 是一个很棒的项目, 但是它缺少 prompt 定制功能, 加上它的技术栈 (React) 与我不同, 因此我决定用自己的技术栈 (vue, [wxt](https://github.com/wxt-dev/wxt), [vercel-ai-sdk](https://sdk.vercel.ai/)) 开发一个新的网页总结浏览器插件



## 5. 反馈和建议
🙌欢迎任何反馈或建议

如果有任何关于功能建议, 界面建议, Bug, 疑惑, 使用反馈, 任何想法点子, 请在 issue 中提出


## 6. 贡献
欢迎在文档, 多语言, 界面, 功能上进行贡献, 请参考[CONTRIBUTING.md](CONTRIBUTING.md)

## 7. 更新历史
请参考 [CHANGELOG](/CHANGELOG.md)
