import "./App.css";
import { useTranslation, Trans } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  function switchLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="App" onClick={switchLanguage}>
      <div>
        <span>{t("current language")}</span>
        <select onChange={switchLanguage} value={i18n.language}>
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>

      <img src={require(`./assets/flag-${t("pathSuffix")}.jpg`)} alt="" />

      <h2>{t("Hello World")}</h2>
      <h2>
        <Trans i18nKey="Hello World" />
      </h2>
    </div>
  );
}

export default App;
