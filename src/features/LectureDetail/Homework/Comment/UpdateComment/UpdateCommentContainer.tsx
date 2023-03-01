import React from "react";
import UpdateComment from "./UpdateComment";
import { IUpdateCommentContainer } from "./UpdateComment.types";
import { useUpdateCommentMutation } from "../../../../../api/graphql/homeworkComment/updateComment";

const UpdateCommentContainer: React.FC<IUpdateCommentContainer> = (props) => {
  const { id, setSelectedIndex, content } = props;
  const [updateComment, { loading }] = useUpdateCommentMutation();

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
