import showErrorGraphQL from "../../error/showErrorGraphQL";
import { usePersonQuery as _usePersonQuery } from "../../generated/graphql";

export const usePersonQuery = () => {
  return _usePersonQuery({
    onError: (error) => showErrorGraphQL(error),
  });
};
