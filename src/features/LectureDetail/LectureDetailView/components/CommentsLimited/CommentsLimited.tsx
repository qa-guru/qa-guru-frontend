import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { ICommentsLimited } from "./CommentsLimited.types";
import SendComment from "../../../LectureDetailContainer/SendComment";
import CommentItem from "../CommentItem";
import CommentTotalElements from "../CommentTotalElements";

const CommentsLimited: React.FC<ICommentsLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork! || {};

  return (
    <>
      <SendComment id={id!} />
      <CommentTotalElements totalElements={totalElements} />
      <Stack mt="5px" spacing={2}>
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
      </Stack>
    </>
  );
};

export default CommentsLimited;
