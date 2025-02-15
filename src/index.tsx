import ReactDOM from "react-dom/client";

import App from "./app";
import "./i18n/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
