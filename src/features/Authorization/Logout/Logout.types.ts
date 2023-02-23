import React from "react";

export interface ILogout {
  logout: () => Promise<void>;
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
