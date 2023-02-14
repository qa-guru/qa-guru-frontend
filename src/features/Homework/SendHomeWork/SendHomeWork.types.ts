import { SendHomeWorkToCheckMutationFn } from "../../../generated/graphql";

export interface ISendHomeWork {
  sendHomeWorkToCheck: SendHomeWorkToCheckMutationFn;
  loading: boolean;
}

export interface ISendHomeWorkContent {
  content: string;
}
