import { SendHomeWorkToCheckMutationFn } from "../../../../../api/graphql/generated/graphql";

export interface ISendHomeWork {
  sendHomeWorkToCheck: SendHomeWorkToCheckMutationFn;
  loading: boolean;
}

export interface ISendHomeWorkContent {
  content: string;
}
