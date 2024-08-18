import { FC, useEffect } from "react";

import SendComment from "shared/features/send-comment/container";
import CommentTotalElements from "shared/components/comment-total-elements";

import { ICommentsLimited } from "./comments-limited.types";
import { StyledStack, StyledTypography } from "./comments-limited.styled";
import CommentItem from "../comment-item";

const CommentsLimited: FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, homeworkId, setTotalElements } =
    props;
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork || {};

  useEffect(() => {
    if (setTotalElements) {
      setTotalElements(totalElements);
    }
  }, [totalElements, setTotalElements]);

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
              homeworkId={homeworkId}
            />
          );
        })}
      </StyledStack>
    </>
  );
};

export default CommentsLimited;
