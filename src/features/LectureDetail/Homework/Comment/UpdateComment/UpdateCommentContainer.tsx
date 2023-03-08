import React from "react";
import UpdateComment from "./UpdateComment";
import { IUpdateCommentContainer } from "./UpdateComment.types";
import { useUpdateCommentMutation } from "../../../../../api/graphql/homeworkComment/updateComment";

const UpdateCommentContainer: React.FC<IUpdateCommentContainer> = (props) => {
  const { id, setSelectedIndex, content, setComments } = props;
  const [updateComment, { loading }] = useUpdateCommentMutation({
    update(cache, { data }) {
      const updatedComment = data?.updateComment;
      setComments((prevComments) =>
        prevComments.map((comment) => {
          return comment.id === updatedComment?.id ? updatedComment : comment;
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
