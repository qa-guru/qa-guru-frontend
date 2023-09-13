import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { ICommentsPagination } from "./comments-pagination.types";
import SendComment from "../../containers/send-comment";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";

const CommentsPagination: React.FC<ICommentsPagination> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, fetchMore, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const { totalElements, items, offset } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork! || {};

  const handleLoadMore = () => {
    fetchMore!({
      variables: {
        offset: items?.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          commentsHomeWorkByHomeWork: {
            ...fetchMoreResult.commentsHomeWorkByHomeWork,
            items: [
              ...prev.commentsHomeWorkByHomeWork.items,
              ...fetchMoreResult.commentsHomeWorkByHomeWork.items,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (items?.length! >= totalElements) {
      setHasMoreComments(false);
    }
  }, [items]);

  return (
    <>
      <SendComment id={id!} />
      <CommentTotalElements totalElements={totalElements} />
      <InfiniteScroll
        dataLength={items?.length!}
        next={handleLoadMore}
        hasMore={hasMoreComments}
        loader={
          <Box mt="10px" display="flex" justifyContent="center">
            <CircularProgress size={25} />
          </Box>
        }
        style={{ overflow: "visible" }}
        scrollableTarget="scroll-container"
      >
        <Stack mt="5px" spacing={2}>
          {items?.map((item, index) => {
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
      </InfiniteScroll>
    </>
  );
};

export default CommentsPagination;
