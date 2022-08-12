# 国际化

![](./i18n.jpg)

## 什么是国际化

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

## 样式国际化

## 参考资料

https://medium.com/@danduan/translating-react-apps-using-i18next-d2f78bc87314#673f
