import compose from "compose-function";

import { withStyledEngine } from "./with-styled-engine";
import { withModal } from "./with-modal";
import { withSnackBar } from "./with-snack-bar";
import { withMui } from "./with-mui";
import { withRouter } from "./with-router";
import { withApollo } from "./with-apollo";
import { withAuth } from "./with-auth";
import { withClickToCompoment } from "./with-click-to-component";

export const withProviders = compose(
  withApollo,
  withMui,
  withRouter,
  withStyledEngine,
  withModal,
  withSnackBar,
  withAuth,
  withClickToCompoment
);
