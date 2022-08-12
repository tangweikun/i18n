import "./App.css";
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

export default App;
