import { useSignUpMutation as _useSignUpMutation } from "../../generated/graphql";

export const useSignUpMutation = () => {
  return _useSignUpMutation({ onError: (error: Error) => alert("error") });
};
