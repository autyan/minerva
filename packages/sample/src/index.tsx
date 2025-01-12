import React from "react";
import { createRoot } from "react-dom/client";
import "@styles/global.scss";
import "@minerva/lib-core/dist/index.css";
import "@minerva/lib-web-components";
// import { ConfigProvider } from "@minerva/lib-core";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
