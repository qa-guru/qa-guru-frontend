import type { ApolloCache, FetchResult } from "@apollo/client";

import {
  CommentsHomeWorkByHomeWorkDocument,
  CommentsHomeWorkByHomeWorkQuery,
  Maybe,
  SendCommentMutation,
} from "api/graphql/generated/graphql";
import {
  INDEX_OFFSET,
  PARSE_INT_RADIX,
  QUERY_DEFAULTS,
} from "shared/constants";

const COMMENTS_QUERY_VARIABLES = (homeworkId?: Maybe<string>) => ({
  offset: QUERY_DEFAULTS.OFFSET,
  limit: QUERY_DEFAULTS.LIMIT,
  sort: {
    field: "CREATION_DATE",
    order: "DESC",
  },
  homeWorkId: homeworkId,
});

export const updateCommentsCache =
  (homeworkId?: Maybe<string>) =>
  (cache: ApolloCache<unknown>, { data }: FetchResult<SendCommentMutation>) => {
    const newComment = data?.sendComment;
    if (!newComment) return;

    const existingComments = cache.readQuery<CommentsHomeWorkByHomeWorkQuery>({
      query: CommentsHomeWorkByHomeWorkDocument,
      variables: COMMENTS_QUERY_VARIABLES(homeworkId),
    });

    if (!existingComments?.commentsHomeWorkByHomeWork) return;

    cache.writeQuery({
      query: CommentsHomeWorkByHomeWorkDocument,
      variables: COMMENTS_QUERY_VARIABLES(homeworkId),
      data: {
        commentsHomeWorkByHomeWork: {
          ...existingComments.commentsHomeWorkByHomeWork,
          items: [
            newComment,
            ...(existingComments.commentsHomeWorkByHomeWork.items || []),
          ],
          totalElements:
            parseInt(
              existingComments.commentsHomeWorkByHomeWork.totalElements,
              PARSE_INT_RADIX
            ) + INDEX_OFFSET,
        },
      },
    });
  };
