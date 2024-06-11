import { Dispatch, SetStateAction } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface IUpdateHomeworkContainer {
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  answer?: Maybe<string>;
  id?: Maybe<string>;
}
