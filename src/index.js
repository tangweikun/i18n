import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import "./index.css";
import App from "./App";
import "./i18nextInit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
