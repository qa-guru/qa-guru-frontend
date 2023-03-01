import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { ICommentContainer } from "./Comment.types";
import { useCommentsHomeWorkByHomeWorkQuery } from "../../../../api/graphql/homeworkComment/commentsHomeWorkByHomeWork";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import SkeletonComment from "../../../../shared/Skeletons/SkeletonComment";

const CommentContainer: React.FC<ICommentContainer> = (props) => {
  const { size, id, field, order, setTotalElements } = props;

  const { data, loading } = useCommentsHomeWorkByHomeWorkQuery({
    variables: {
      page: 0,
      size: size!,
      homeWorkId: id,
      sort: {
        field: field!,
        order: order!,
      },
    },
  });

  if (loading) return <SkeletonComment />;
  if (!data) return <NoDataErrorMessage />;

  return <Comment setTotalElements={setTotalElements} data={data} />;
};

export default CommentContainer;
