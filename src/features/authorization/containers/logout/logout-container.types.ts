import { Dispatch, SetStateAction } from "react";

export interface ILogoutContainer {
  setAnchorElUser: Dispatch<SetStateAction<HTMLElement | null>>;
}
