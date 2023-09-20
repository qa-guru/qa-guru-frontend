import compose from "compose-function";
import { withStyledEngine } from "./with-styled-engine";
import { withModal } from "./with-modal";
import { withSnackBar } from "./with-snack-bar";
import { withMui } from "./with-mui";
import { withRouter } from "./with-router";
import { withApollo } from "./with-apollo";

export const withProviders = compose(
  withApollo,
  withRouter,
  withStyledEngine,
  withMui,
  withModal,
  withSnackBar,
);
