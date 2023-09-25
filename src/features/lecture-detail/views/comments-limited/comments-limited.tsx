import React, { useState } from "react";
import { ICommentsLimited } from "./comments-limited.types";
import { StyledStack } from "./comments-limited.styled";
import SendComment from "../../containers/send-comment";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";

const CommentsLimited: React.FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork! || {};

  return (
    <>
      <SendComment id={id!} />
      <CommentTotalElements totalElements={totalElements} />
      <StyledStack>
        {items?.slice(0, 3).map((item, index) => {
          const editAccess = dataUserId?.user?.id === item?.creator?.id;
          return (
            <CommentItem
              key={index}
              item={item!}
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
