import { Dispatch, SetStateAction } from "react";
import { TFunction } from "i18next";

export interface ILogout {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  handleOk: () => Promise<void>;
  handleCancel: () => void;
  t: TFunction<"translation", undefined, "translation">;
}

export interface ILogoutContainer {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
