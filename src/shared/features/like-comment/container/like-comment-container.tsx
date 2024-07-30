import { FC } from "react";

import { useLikeCommentMutation } from "api/graphql/generated/graphql";

import { ILikeCommentContainer } from "./like-comment-container.types";
import LikeComment from "../view";

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

  return (
    <LikeComment
      commentId={commentId}
      likeComment={likeComment}
      likes={likes}
      userLike={userLike}
    />
  );
};

export default LikeCommentContainer;
