import { FC, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ReactComponent as Edit } from "assets/icons/button-edit.svg";
import UserRow from "shared/components/user-row";
import { TextView } from "shared/components/text-editor";
import { useComment } from "shared/context/comment-context";

import { ICommentItem } from "./comment-item.types";
import {
  StyledBox,
  StyledCommentBox,
  StyledIconBox,
  StyledPaper,
  StyledStack,
  StyledReplyIcon,
} from "./comment-item.styled";
import { UpdateComment, AnswerComment } from "../../containers";

const CommentItem: FC<ICommentItem> = ({
  item,
  commentId,
  currentUserID,
  parentID = null,
}) => {
  const { creator, content, creationDate, id, children } = item || {};
  const { selectedComment, setSelectedComment } = useComment();

  const [isReplying, setIsReplying] = useState<boolean>(false);

  const editAccess = currentUserID === creator?.id;
  const isSelected = selectedComment === id;

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  return (
    <>
      <StyledPaper key={commentId} editAccess={editAccess}>
        <StyledStack>
          <StyledCommentBox>
            <UserRow user={creator} date={creationDate} />
            <StyledBox>
              {isSelected ? (
                <UpdateComment content={content} id={id} />
              ) : (
                <TextView content={content} />
              )}
            </StyledBox>
          </StyledCommentBox>

          <StyledIconBox>
            {!isSelected && editAccess && (
              <IconButton onClick={() => setSelectedComment(commentId)}>
                <Edit />
              </IconButton>
            )}
          </StyledIconBox>
        </StyledStack>
        <IconButton onClick={handleReplyClick}>
          <StyledReplyIcon fontSize="small" />
        </IconButton>
      </StyledPaper>

      <Box padding="0 15px">
        {children?.map((childComment) => (
          <CommentItem
            key={childComment?.id}
            item={childComment}
            commentId={childComment?.id}
            parentID={id}
            editAccess={editAccess}
            currentUserID={currentUserID}
          />
        ))}
      </Box>

      {isReplying && <AnswerComment id={id} />}
    </>
  );
};

export default CommentItem;
