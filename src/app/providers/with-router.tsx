import { ComponentType, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Spinner from "shared/components/spinner";

export const withRouter = (Component: ComponentType) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Component />
      </Suspense>
    </BrowserRouter>
  );
