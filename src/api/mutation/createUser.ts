import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useCreateUserMutation as _useCreateUserMutation } from "../../generated/graphql";

export const useCreateUserMutation = () => {
  return _useCreateUserMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
