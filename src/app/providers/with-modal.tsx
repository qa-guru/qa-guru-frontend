import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import { ReactNode } from "react";

export const withModal = (component: () => ReactNode) => () =>
  <ModalProvider rootComponent={TransitionGroup}>{component()}</ModalProvider>;
