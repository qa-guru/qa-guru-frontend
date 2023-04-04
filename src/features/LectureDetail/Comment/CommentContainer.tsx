import React, { useState } from "react";
import Comment from "./Comment";
import { ICommentContainer } from "./Comment.types";
import { useCommentsHomeWorkByHomeWorkQuery } from "../../../api/graphql/homeworkComment/commentsHomeWorkByHomeWork";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";
import SkeletonComment from "../../../shared/Skeletons/SkeletonComment";
import {
  CommentHomeWorkSortField,
  InputMaybe,
  Order,
} from "../../../api/graphql/generated/graphql";
import { useUserIdQuery } from "../../../api/graphql/user/userId";

const CommentContainer: React.FC<ICommentContainer> = (props) => {
  const { id, children } = props;

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
  const fieldSortComments =
    "CREATION_DATE" as InputMaybe<CommentHomeWorkSortField>;
  const fieldOrderComments = "DESC" as InputMaybe<Order>;

  const {
    loading: loadingCommentsHomeWorkByHomeWork,
    data: dataCommentsHomeWorkByHomeWork,
    fetchMore,
  } = useCommentsHomeWorkByHomeWorkQuery({
    variables: {
      offset: 0,
      limit: 3,
      homeWorkId: id,
      sort: {
        field: fieldSortComments,
        order: fieldOrderComments,
      },
    },
  });

  if (loadingCommentsHomeWorkByHomeWork || loadingUserId)
    return <SkeletonComment />;

  if (!dataUserId || !dataCommentsHomeWorkByHomeWork)
    return <NoDataErrorMessage />;

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        id,
        dataUserId,
        dataCommentsHomeWorkByHomeWork,
        fetchMore,
      })}
    </>
  );
};

export default CommentContainer;
