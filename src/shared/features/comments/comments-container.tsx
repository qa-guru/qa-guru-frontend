import { FC, cloneElement } from "react";

import NoDataErrorMessage from "shared/components/no-data-error-message";
import { SkeletonComment } from "shared/components/skeletons";
import {
  CommentHomeWorkSortField,
  Order,
  useCommentsHomeWorkByHomeWorkQuery,
} from "api/graphql/generated/graphql";
import { QUERY_DEFAULTS } from "shared/constants";

import { ICommentsContainer } from "./comments-container.types";

const CommentsContainer: FC<ICommentsContainer> = ({
  homeworkId,
  children,
}) => {
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

  if (loadingComments) {
    return <SkeletonComment />;
  }

  if (!dataCommentsHomeWorkByHomeWork) {
    return <NoDataErrorMessage />;
  }

  return cloneElement(children, {
    homeworkId,
    dataCommentsHomeWorkByHomeWork,
    fetchMore,
    totalElements:
      dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork?.totalElements,
  });
};

export default CommentsContainer;
