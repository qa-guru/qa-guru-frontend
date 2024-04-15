import { FC } from "react";
import { useLikeCommentMutation } from "api/graphql/generated/graphql";

import { ILikeCommentContainer } from "./like-comment-container.types";
import LikeComment from "../../views/like-comment";

const LikeCommentContainer: FC<ILikeCommentContainer> = ({
  commentId,
  likes,
  userLike,
}) => {
  const [likeComment] = useLikeCommentMutation({
    update: (cache, { data }) => {
      const likeComment = data?.likeComment;

      cache.modify({
        id: cache.identify(likeComment!),
        fields: {
          content() {
            return likeComment?.content;
          },
        },
      });
    },
  });

  return <LikeComment {...{ commentId, likeComment, likes, userLike }} />;
};

export default LikeCommentContainer;
