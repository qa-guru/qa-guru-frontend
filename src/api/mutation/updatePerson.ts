import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useUpdatePersonMutation as _useUpdatePersonMutation } from "../../generated/graphql";

export const useUpdatePersonMutation = () => {
  return _useUpdatePersonMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
