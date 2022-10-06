import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useSignUpMutation as _useSignUpMutation } from "../../generated/graphql";

export const useSignUpMutation = () => {
  return _useSignUpMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
