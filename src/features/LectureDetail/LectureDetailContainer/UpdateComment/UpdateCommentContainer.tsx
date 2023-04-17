import React from "react";
import { IUpdateCommentContainer } from "./UpdateCommentContainer.types";
import UpdateComment from "../../LectureDetailView/components/UpdateComment";
import { useUpdateCommentMutation } from "../../../../api/graphql/homeworkComment/updateComment";

const UpdateCommentContainer: React.FC<IUpdateCommentContainer> = (props) => {
  const { id, setSelectedIndex, content } = props;
  const [updateComment, { loading }] = useUpdateCommentMutation({
    update: (cache, { data }) => {
      const updateComment = data?.updateComment!;
      cache.modify({
        id: cache.identify(updateComment),
        fields: {
          content() {
            return updateComment.content;
          },
        },
      });
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
