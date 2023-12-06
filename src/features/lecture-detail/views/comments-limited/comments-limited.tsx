import { FC, useState } from "react";
import { ICommentsLimited } from "./comments-limited.types";
import { StyledStack, StyledTypography } from "./comments-limited.styled";
import { SendComment } from "../../containers";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";
import {
  COMMENTS_DISPLAY_LIMIT,
  INITIAL_SELECTED_INDEX,
} from "../../constants";

const CommentsLimited: FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(
    INITIAL_SELECTED_INDEX
  );
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork || {};

  return (
    <>
      <StyledTypography variant="h5">Добавить комментарий</StyledTypography>
      <SendComment id={id} />
      <CommentTotalElements totalElements={totalElements} />
      <StyledStack>
        {items?.slice(0, COMMENTS_DISPLAY_LIMIT).map((item, index) => {
          const editAccess = dataUserId?.user?.id === item?.creator?.id;
          return (
            <CommentItem
              key={index}
              item={item}
              editAccess={editAccess}
              isSelected={selectedIndex === index}
              setSelectedIndex={setSelectedIndex}
              index={index}
            />
          );
        })}
      </StyledStack>
    </>
  );
};

export default CommentsLimited;
