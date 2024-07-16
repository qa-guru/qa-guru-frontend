import { Dispatch, SetStateAction } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface ILogout {
  logout: () => Promise<void>;
  setAnchorElUser: Dispatch<SetStateAction<Maybe<HTMLElement>>>;
}
