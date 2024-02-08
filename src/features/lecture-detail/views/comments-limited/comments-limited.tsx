import { FC } from "react";

import { ICommentsLimited } from "./comments-limited.types";
import { StyledStack, StyledTypography } from "./comments-limited.styled";
import { SendComment } from "../../containers";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";
import { COMMENTS_DISPLAY_LIMIT } from "../../constants";

const CommentsLimited: FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, id } = props;
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork || {};

  return (
    <>
      <StyledTypography variant="h5">Добавить комментарий</StyledTypography>
      <SendComment id={id} />
      <CommentTotalElements totalElements={totalElements} />
      <StyledStack>
        {items?.slice(0, COMMENTS_DISPLAY_LIMIT).map((item) => {
          const { id } = item!;

          return (
            <CommentItem
              key={id}
              item={item}
              commentId={id}
              currentUserID={dataUserId?.user?.id}
            />
          );
        })}
      </StyledStack>
    </>
  );
};

export default CommentsLimited;
