import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useUpdateLectureMutation as _useUpdateLectureMutation } from "../../generated/graphql";

export const useUpdateLectureMutation = () => {
  return _useUpdateLectureMutation({
    onError: (error) => showErrorGraphQL(error),
  });
};
