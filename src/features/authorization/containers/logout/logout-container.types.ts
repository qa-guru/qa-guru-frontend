import { Dispatch, SetStateAction } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface ILogoutContainer {
  setAnchorElUser: Dispatch<SetStateAction<Maybe<HTMLElement>>>;
}
