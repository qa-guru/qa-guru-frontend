import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { ICommentsPagination } from "./comments-pagination.types";
import {
  StyledBox,
  StyledInfiniteScroll,
  StyledStack,
  StyledTypography,
} from "./comments-pagination.styled";
import { SendComment } from "../../containers";
import CommentItem from "../comment-item";
import CommentTotalElements from "../comment-total-elements";
import { INITIAL_SELECTED_INDEX } from "../../constants";

const CommentsPagination: FC<ICommentsPagination> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, fetchMore, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(
    INITIAL_SELECTED_INDEX
  );
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork || {};

  const handleLoadMore = () => {
    if (fetchMore) {
      fetchMore({
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
    }
  };

  useEffect(() => {
    if (items && items?.length >= totalElements) {
      setHasMoreComments(false);
    }
  }, [items]);

  return (
    <>
      <StyledTypography variant="h5">Добавить комментарий</StyledTypography>
      <SendComment id={id} />
      <CommentTotalElements totalElements={totalElements} />
      <StyledInfiniteScroll
        dataLength={items?.length || 0}
        next={handleLoadMore}
        hasMore={hasMoreComments}
        loader={
          <StyledBox>
            <CircularProgress size={25} />
          </StyledBox>
        }
        scrollableTarget="scroll-container"
      >
        <StyledStack>
          {items?.map((item, index) => {
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
      </StyledInfiniteScroll>
    </>
  );
};

export default CommentsPagination;
