import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useDeleteUserMutation as _useDeleteUserMutation } from "../../generated/graphql";

export const useDeleteUserMutation = () => {
  return _useDeleteUserMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
