import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import React from "react";

export const withModal = (component: () => React.ReactNode) => () =>
  <ModalProvider rootComponent={TransitionGroup}>{component()}</ModalProvider>;
