import { Maybe } from "api/graphql/generated/graphql";

export interface ITrainingUpload {
  picture?: Maybe<string>;
  edit?: boolean;
}
