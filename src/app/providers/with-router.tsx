import { ComponentType, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppSpinner from "shared/components/spinners/app-spinner";

export const withRouter = (Component: ComponentType) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<AppSpinner />}>
        <Component />
      </Suspense>
    </BrowserRouter>
  );
