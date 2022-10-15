import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useUpdateTrainingMutation as _useUpdateTrainingMutation } from "../../generated/graphql";

export const useUpdateTrainingMutation = () => {
  return _useUpdateTrainingMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
