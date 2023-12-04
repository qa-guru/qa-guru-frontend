import ReactDOM from "react-dom/client";
import { ClickToComponent } from "click-to-react-component";
import App from "./app";
import "./i18n/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <App />
    <ClickToComponent />
  </>
);
