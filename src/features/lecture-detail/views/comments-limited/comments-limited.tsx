import { FC } from "react";

import { ICommentsLimited } from "./comments-limited.types";
import { StyledStack, StyledTypography } from "./comments-limited.styled";
import { SendComment } from "../../containers";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";

const CommentsLimited: FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, homeworkId } = props;
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork || {};

  return (
    <>
      <StyledTypography variant="h5">Добавить комментарий</StyledTypography>
      <SendComment homeworkId={homeworkId} />
      <CommentTotalElements totalElements={totalElements} />
      <StyledStack>
        {items?.map((item, index) => {
          const { id } = item!;

          return (
            <CommentItem
              key={`${id}-${index}`}
              item={item}
              commentId={id}
              currentUserID={dataUserId?.user?.id}
              homeworkId={homeworkId}
            />
          );
        })}
      </StyledStack>
    </>
  );
};

export default CommentsLimited;
