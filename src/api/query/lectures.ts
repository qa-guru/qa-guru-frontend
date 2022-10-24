import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useLecturesQuery as _useLecturesQuery } from "../../generated/graphql";

export const useLecturesQuery = () => {
  return _useLecturesQuery({
    onError: (error) => showErrorGraphQL(error),
  });
};
