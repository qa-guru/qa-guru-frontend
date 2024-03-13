import { FC } from "react";
import {
  useLikeCommentMutation,
  useUserByIdQuery,
} from "api/graphql/generated/graphql";

import { ILikeCommentContainer } from "./like-comment-container.types";
import LikeComment from "../../views/like-comment";

const LikeCommentContainer: FC<ILikeCommentContainer> = ({ id, likes }) => {
  const [likeComment] = useLikeCommentMutation();
  const { data: userId } = useUserByIdQuery();

  return <LikeComment id={id} likeComment={likeComment} likes={likes} />;
};

export default LikeCommentContainer;
