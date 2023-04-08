import React from "react";
import { ICommentsContainer } from "./CommentsContainer.types";
import { useCommentsHomeWorkByHomeWorkQuery } from "../../../../api/graphql/homeworkComment/commentsHomeWorkByHomeWork";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import SkeletonComment from "../../../../shared/Skeletons/SkeletonComment";
import {
  CommentHomeWorkSortField,
  InputMaybe,
  Order,
} from "../../../../api/graphql/generated/graphql";
import { useUserIdQuery } from "../../../../api/graphql/user/userId";

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
      offset: 0,
      limit: 3,
      homeWorkId: id,
      sort: sortOptions,
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
