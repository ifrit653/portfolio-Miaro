import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/plus-jakarta-sans";
import "./index.css";
import I18nProvider from "./i18n/I18nProvider";
import App from "./App";
import ContactProvider from "./components/layout/ContactProvider";
import "lenis/dist/lenis.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <I18nProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </I18nProvider>
    </StrictMode>
  </BrowserRouter>
);
