import { Dispatch, SetStateAction } from "react";

export interface ILogout {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
