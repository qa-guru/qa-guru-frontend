import { UserCreateInput } from "../../../generated/graphql";

export interface ISignUp {
  signup: (data: UserCreateInput) => void;
  isLoading: boolean;
}
