import showErrorGraphQL from "../../error/showErrorGraphQL";
import { useUsersQuery as _useUsersQuery } from "../../generated/graphql";

export const useUsersQuery = () => {
  return _useUsersQuery({
    onError: (error) => showErrorGraphQL(error),
  });
};
