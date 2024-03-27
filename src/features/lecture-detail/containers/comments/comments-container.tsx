import { FC, cloneElement } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { SkeletonComment } from "shared/components/skeletons";
import {
  CommentHomeWorkSortField,
  Order,
  useCommentsHomeWorkByHomeWorkQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";

import { ICommentsContainer } from "./comments-container.types";
import { QUERY_DEFAULTS } from "../../constants";

const CommentsContainer: FC<ICommentsContainer> = ({
  homeworkId,
  children,
}) => {
  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const {
    loading: loadingComments,
    data: dataCommentsHomeWorkByHomeWork,
    fetchMore,
  } = useCommentsHomeWorkByHomeWorkQuery({
    variables: {
      offset: QUERY_DEFAULTS.OFFSET,
      limit: QUERY_DEFAULTS.LIMIT,
      homeWorkId: homeworkId!,
      sort: {
        field: CommentHomeWorkSortField.CreationDate,
        order: Order.Desc,
      },
    },
  });

  if (loadingComments || loadingUserId) {
    return <SkeletonComment />;
  }

  if (!dataUserId || !dataCommentsHomeWorkByHomeWork) {
    return <NoDataErrorMessage />;
  }

  return cloneElement(children, {
    homeworkId,
    dataUserId,
    dataCommentsHomeWorkByHomeWork,
    fetchMore,
    totalElements:
      dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork?.totalElements,
  });
};

export default CommentsContainer;
