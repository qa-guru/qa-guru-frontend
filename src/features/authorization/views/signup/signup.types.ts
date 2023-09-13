import { UserCreateInput } from "../../../../api/graphql/generated/graphql";

export interface ISignUp {
  signup: (data: UserCreateInput) => void;
  isLoading: boolean;
}
