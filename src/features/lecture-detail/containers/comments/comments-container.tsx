import React from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import SkeletonComment from "shared/components/skeletons/skeleton-comment/skeleton-comment";
import {
  CommentHomeWorkSortField,
  InputMaybe,
  Order,
  useCommentsHomeWorkByHomeWorkQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import { ICommentsContainer } from "./comments-container.types";
import { QUERY_DEFAULTS } from "../../constants/constants";

const CommentsContainer: React.FC<ICommentsContainer> = ({ id, children }) => {
  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const sortOptions = {
    field: "CREATION_DATE" as InputMaybe<CommentHomeWorkSortField>,
    order: "DESC" as InputMaybe<Order>,
  };

  const {
    loading: loadingComments,
    data: dataCommentsHomeWorkByHomeWork,
    fetchMore,
  } = useCommentsHomeWorkByHomeWorkQuery({
    variables: {
      offset: QUERY_DEFAULTS.OFFSET,
      limit: QUERY_DEFAULTS.LIMIT,
      homeWorkId: id,
      sort: {
        field: CommentHomeWorkSortField.CreationDate,
        order: Order.Desc,
      },
    },
  });

  if (loadingComments || loadingUserId) {
    return <SkeletonComment />;
  }

  if (
    !dataUserId ||
    !dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork?.totalElements
  ) {
    return <NoDataErrorMessage />;
  }

  return React.cloneElement(children, {
    id,
    dataUserId,
    dataCommentsHomeWorkByHomeWork,
    fetchMore,
    totalElements:
      dataCommentsHomeWorkByHomeWork.commentsHomeWorkByHomeWork.totalElements,
  });
};

export default CommentsContainer;
