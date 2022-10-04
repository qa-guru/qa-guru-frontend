import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useUpdateRoleMutation as _useUpdateRoleMutation } from "../../generated/graphql";

export const useUpdateRoleMutation = () => {
  return _useUpdateRoleMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
