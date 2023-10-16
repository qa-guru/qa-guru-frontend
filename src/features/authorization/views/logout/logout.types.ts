import { Dispatch, SetStateAction } from "react";

export interface ILogout {
  logout: () => Promise<void>;
  setAnchorElUser: Dispatch<SetStateAction<HTMLElement | null>>;
}
