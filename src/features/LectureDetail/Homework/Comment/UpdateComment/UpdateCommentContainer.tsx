import React from "react";
import UpdateComment from "./UpdateComment";
import { IUpdateCommentContainer } from "./UpdateComment.types";
import { useUpdateCommentMutation } from "../../../../../api/graphql/homeworkComment/updateComment";

const UpdateCommentContainer: React.FC<IUpdateCommentContainer> = (props) => {
  const { id, setSelectedIndex, content, setComments, comments } = props;
  const [updateComment, { loading }] = useUpdateCommentMutation({
    update(cache, { data }) {
      setComments((prevComments: any[]) =>
        prevComments.map((comment) => {
          return comment.id === data?.updateComment?.id
            ? data?.updateComment
            : comment;
        })
      );
    },
  });

  return (
    <UpdateComment
      setSelectedIndex={setSelectedIndex}
      id={id}
      updateComment={updateComment}
      loading={loading}
      content={content}
    />
  );
};

export default UpdateCommentContainer;
