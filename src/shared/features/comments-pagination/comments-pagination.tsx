import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import SendComment from "shared/features/send-comment/container";

import { ICommentsPagination } from "./comments-pagination.types";
import {
  StyledBox,
  StyledInfiniteScroll,
  StyledStack,
  StyledTypography,
} from "./comments-pagination.styled";
import CommentItem from "../comment-item";
import CommentTotalElements from "../../components/comment-total-elements";

const CommentsPagination: FC<ICommentsPagination> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, fetchMore, homeworkId } =
    props;
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
      <SendComment homeworkId={homeworkId} />
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
          {items?.map((item) => {
            const { id } = item!;

            return (
              <CommentItem
                key={id}
                item={item}
                commentId={id}
                currentUserID={dataUserId?.user?.id}
                homeworkId={homeworkId}
              />
            );
          })}
        </StyledStack>
      </StyledInfiniteScroll>
    </>
  );
};

export default CommentsPagination;
