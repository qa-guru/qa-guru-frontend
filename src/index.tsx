import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n/config";
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<App />);
