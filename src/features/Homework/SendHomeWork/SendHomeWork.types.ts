import { SendHomeWorkToCheckMutationFn } from "../../../generated/graphql";

export interface ISendHomeWorkToCheck {
  sendHomeWorkToCheck: SendHomeWorkToCheckMutationFn;
  loading: boolean;
}

export interface ISendHomeWorkContent {
  content: string;
}
