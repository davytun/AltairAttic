import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { SmoothScroll } from "./components/layout/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
