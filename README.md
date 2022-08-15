# 国际化

![](./i18n.jpg)

## 什么是国际化

国际化是一种产品、应用程序或文档的设计和开发，使其适用于或易于适应来不同文化、地区或语言的用户。

“国际化”一词通常缩写为 `i18n`。 这是广泛使用的缩写，源于“i”和“n”之间有 18 个字母的事实。

## 在项目中实现国际化

### Step1: 技术方案选型

从易用性、依赖包大小、功能全面性和可信赖性等几个方面来考量，我们选用了 `i18next` 来作为国际化方案，它易于设置和使用，几乎涵盖了所有情况，维护成本低。

搭配 `react-i18next` 能够在 `react` 项目中更流畅的进行国际化开发

可以使用的开源仓库

- [Format.js ](https://github.com/formatjs/formatjs) — Library with extensive but relatively young ecosystem that does almost everything. Unfortunately, it has many quirks and unresolved edge cases with how the tools work together

- [Globalize.js](https://github.com/globalizejs/globalize) — Comprehensive library that covers every possible formatting need very well, leverages Unicode CLDR, but has very limited React integration and other tools

- [i18next](https://www.i18next.com/) — Good ecosystem of plugins and third party tooling, works with React well, supported from early jQuery days with minimal API changes

- [Polyglot.js](https://airbnb.io/polyglot.js/) — Lightweight but extremely limited library, does not support any standardized formats

### Step2: 安装 `i18next`, `react-i18next`

```bash
# npm
$ npm install i18next react-i18next --save

# yarn
$ yarn add i18next react-i18next
```

### Step3: 初始化 `i18next`

在 `src/index.js` 中根据 [官方文档](https://react.i18next.com/latest/using-with-hooks#configure-i-18-next) 进行初始化

- 3.1 在 `src/` 下创建文件 `i18nextInit.js`，在 `src/index.js` 中 `import` 进来，在项目启动的时候 `i18nextInit` 中的相关代码就会被执行

```js
// src/i18nextInit.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Hello World": "Hello World",
        },
      },
      zh: {
        translation: {
          "Hello World": "你好，世界",
        },
      },
    },
    lng: "zh", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
```

```js
// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18nextInit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step4: 对内容进行国际化，将国际化内容抽离到 json 文件

- 不要直接使用 `i18next` 的 `t()` 进行国际化
  `i18next` 的 `t()` 不在 `react-i18next` 和 `React` 的生命周期中，如果在加载异步翻译前调用的内容将不会被翻译，并且如果语言更改了，国际化内容也不会更新

- 使用 `useTranslation` 或者 `Trans` 进行国际化

```jsx
import { useTranslation, Trans } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <h2>{t("Hello World")}</h2>
      <h2>
        <Trans i18nKey="Hello World" />
      </h2>
    </div>
  );
}
```

```json
// src/locales/en.json

{
  "Hello World": "Hello World"
}
```

```json
// src/locales/zh.json

{
  "Hello World": "你好，世界"
}
```

### Step5: 切换当前语言

```jsx
// src/App.js

function switchLanguage(e) {
  i18n.changeLanguage(e.target.value);
}
```

## 图片国际化

在不同语言环境下某些图片资源内容可能是不一样的，将同一内容区块的图片命名以当前语言环境为后缀，确保代码中无需进行额外的逻辑判断

`pathSuffix` 的值在这里是 `en` 和 `zh`，已经在 `locales` 下进行定义，所有需要进行国际化处理的图片资源命名统一为 `${imgName}-${pathSuffix}.jpg`

```jsx
<img src={require(`./assets/flag-${t("pathSuffix")}.jpg`)} alt="" />
```

## 样式国际化

不同语言表达相同的意思，需要的文本量不同，这就导致文案长度不固定。这就要求我们在视觉设计和开发时就要进行考虑。

CSS 中有一个伪类 `:lang()`，根据元素使用的语言进行匹配。元素使用的语言则根据元素的 `lang` 属性来指定，一般情况下我们只需要在 `html` 元素上设置 `lang` 属性，然后其他元素从这里继承。

```jsx
// src/App.js

import { Helmet } from "react-helmet";

<Helmet>
  <html lang={i18n.language} />
</Helmet>;
```

我们可以根据不同的语言环境对指定内容进行不同的样式设置

```jsx
// src/App.js

<div className="my-16">
  <span className="highlight">样式国际化：</span>
  <span className="i18-style">{t("Hello World")}</span>
</div>
```

```css
.i18-style:lang(zh) {
  color: blue;
  font-size: 12px;
}

.i18-style:lang(en) {
  color: green;
  font-size: 24px;
  font-weight: 600;
}
```

### 需要注意的点

- 考虑可能会换行的情况；
- 尽量不要使用固定宽度；
- 尽量不要使用固定高度；

### `:lang()` 伪类选择器

## 国际化内容维护

理论上我们需要将不同的语言放到不同的 JSON 文件里，比如 `zh.json` 和 `en.json`。它们都会有相同的 `key`，然后 `value` 是不同的。我们在代码中可以通过 `t('Hello World')` 拿到文案 `你好，世界` 或是 `Hello World`。

- 方案 1：开发手动增删修改 JSON 文件的字段

  提交代码时很容易出现冲突问题，产品也无法直接对文案进行配置，需要开发帮忙，就会造成一些沟通成本。

- 方案 2：使用在线协作表格，维护一个含有不同国家标志符字段的表格，让开发和产品在上面配置国际化内容

- 方案 3：文案配置平台

常见问题：

1. 一些废弃的文案没有删除

   主要是不敢删，怕出问题。有个方案是扫描项目代码，移除没用到的文案，但前提是我们用的 key 不能是动态的，这样才能不出现遗漏

1. 复用还是语义化

   一些文案可能会在多个模块中重复出现，理论上可以都用同一个文案 id，以减少文件大小。但是可能过了一阵子，某个模块的文案做了修改，导致其他模块不需要改的文案也跟着变动了。可以让不同的模块分别用各自的 key，但带来的是文件数据的冗余。复用还是语义化，这是要考虑的问题。

1. 不好管理

   谁不小心删了某一行、某个字段，我们是较难发现的。

## 参考资料

- [Translating React Apps with i18next](https://medium.com/@danduan/translating-react-apps-using-i18next-d2f78bc87314#673f)

- [为什么产品国际化看似简单，实际落地却困难重重？](https://juejin.cn/post/7059008963144056862)
