import React from "react";
import Comment from "./Comment";
import { ICommentContainer } from "./Comment.types";
import { useCommentsHomeWorkByHomeWorkQuery } from "../../../../api/graphql/homeworkComment/commentsHomeWorkByHomeWork";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import SkeletonComment from "../../../../shared/Skeletons/SkeletonComment";
import { useUserQuery } from "../../../../api/graphql/user/user";
import {
  CommentHomeWorkSortField,
  InputMaybe,
  Order,
} from "../../../../api/graphql/generated/graphql";

const CommentContainer: React.FC<ICommentContainer> = (props) => {
  const { id } = props;
  const { data: dataUser, loading: loadingUser } = useUserQuery();
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

  if (loadingCommentsHomeWorkByHomeWork || loadingUser)
    return <SkeletonComment />;
  if (!dataUser || !dataCommentsHomeWorkByHomeWork)
    return <NoDataErrorMessage />;

  return (
    <Comment
      id={id}
      dataUser={dataUser}
      dataCommentsHomeWorkByHomeWork={dataCommentsHomeWorkByHomeWork}
      fetchMore={fetchMore}
    />
  );
};

export default CommentContainer;
