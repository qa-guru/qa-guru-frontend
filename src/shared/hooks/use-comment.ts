import { useReactiveVar } from "@apollo/client";

import { commentVar } from "cache";
import { Maybe } from "api/graphql/generated/graphql";

export const useComment = () => {
  const selectedComment = useReactiveVar(commentVar);

  const setSelectedComment = (comment: Maybe<string | undefined>) => {
    commentVar(comment);
  };

  return { selectedComment, setSelectedComment };
};
