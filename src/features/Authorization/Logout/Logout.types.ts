import React from "react";

export interface ILogout {
  logout: () => Promise<void>;
  isLoading: boolean;
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
