import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import { Helmet } from "react-helmet";

function App() {
  const { t, i18n } = useTranslation();

  function switchLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
      </Helmet>
      <div className="App" onClick={switchLanguage}>
        <div className="my-16">
          <span className="highlight">切换语言：</span>
          <select onChange={switchLanguage} value={i18n.language}>
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="my-16">
          <span className="highlight">文本国际化：</span>
          <span>{t("Hello World")}</span>
          <span>
            <Trans i18nKey="Hello World" />
          </span>
        </div>

        <div className="my-16">
          <span className="highlight" style={{ verticalAlign: "top" }}>
            图片国际化：
          </span>
          <img src={require(`./assets/flag-${t("pathSuffix")}.jpg`)} alt="" />
        </div>

        <div className="my-16">
          <span className="highlight">样式国际化：</span>
          <span className="i18-style">{t("Hello World")}</span>
        </div>
      </div>
    </>
  );
}

export default App;
