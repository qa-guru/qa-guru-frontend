import { FC, useState } from "react";

import { ICommentsLimited } from "./comments-limited.types";
import { StyledStack, StyledTypography } from "./comments-limited.styled";
import { SendComment } from "../../containers";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";
import { COMMENTS_DISPLAY_LIMIT } from "../../constants";

const CommentsLimited: FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, id } = props;
  const [selectedComment, setSelectedComment] = useState<
    string | null | undefined
  >(null);
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork || {};

  return (
    <>
      <StyledTypography variant="h5">Добавить комментарий</StyledTypography>
      <SendComment id={id} />
      <CommentTotalElements totalElements={totalElements} />
      <StyledStack>
        {items?.slice(0, COMMENTS_DISPLAY_LIMIT).map((item) => {
          const editAccess = dataUserId?.user?.id === item?.creator?.id;
          const { id } = item!;

          return (
            <CommentItem
              key={id}
              item={item}
              editAccess={editAccess}
              isSelected={selectedComment === id}
              setSelectedComment={setSelectedComment}
              commentId={id}
            />
          );
        })}
      </StyledStack>
    </>
  );
};

export default CommentsLimited;
