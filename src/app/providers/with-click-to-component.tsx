import { ComponentType } from "react";
import { ClickToComponent } from "click-to-react-component";

export const withClickToCompoment = (Component: ComponentType) => () =>
  (
    <>
      <Component />
      {import.meta.env.MODE === "development" && <ClickToComponent />}
    </>
  );
