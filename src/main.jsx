import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/layout/App";

import global_en from "../src/components/translation/en/global.json";
import global_jp from "../src/components/translation/jp/global.json";
import global_tc from "../src/components/translation/tc/global.json";
import global_sc from "../src/components/translation/sc/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "en";

i18next.init({
  interpolation: { escapeValue: false },
  lng: savedLanguage,
  resources: {
    en: {
      global: global_en,
    },
    jp: {
      global: global_jp,
    },
    tc: {
      global: global_tc,
    },
    sc: {
      global: global_sc,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>
);
