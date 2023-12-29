import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Maybe } from "api/graphql/generated/graphql";

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

const CommentsPagination: FC<ICommentsPagination> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, fetchMore, id } = props;
  const [selectedComment, setSelectedComment] =
    useState<Maybe<string | undefined>>(null);
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
          {items?.map((item) => {
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
      </StyledInfiniteScroll>
    </>
  );
};

export default CommentsPagination;
