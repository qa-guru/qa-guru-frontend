import { FC, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import UserRow from "shared/components/user-row";
import { TextView } from "shared/components/text-editor";
import { useComment } from "shared/context/comment-context";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { formatDate } from "shared/helpers";

import { ICommentItem } from "./comment-item.types";
import {
  StyledBox,
  StyledCommentBox,
  StyledPaper,
  StyledStack,
  StyledReplyIcon,
  StyledEditIcon,
  StyledBottomStack,
  StyledIconButton,
} from "./comment-item.styled";
import { UpdateComment, AnswerComment, DeleteComment } from "../../containers";

const CommentItem: FC<ICommentItem> = ({
  item,
  commentId,
  currentUserID,
  parentID = null,
}) => {
  const { creator, content, creationDate, id, children } = item || {};
  const { selectedComment, setSelectedComment } = useComment();

  const [isReplying, setIsReplying] = useState<boolean>(false);

  const [openThreads, setOpenThreads] = useState(false);
  const handleReplySuccess = () => {
    setIsReplying(false);
    setOpenThreads(true);
  };

  const editAccess = currentUserID === creator?.id;
  const isSelected = selectedComment === id;

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleOpenThreads = () => {
    setOpenThreads(!openThreads);
  };

  return (
    <>
      <StyledPaper key={commentId} editAccess={editAccess}>
        <StyledStack>
          <StyledCommentBox>
            <UserRow user={creator} />
            <StyledBox>
              {isSelected ? (
                <UpdateComment content={content} id={id} />
              ) : (
                <TextView content={content} />
              )}
            </StyledBox>
          </StyledCommentBox>
        </StyledStack>
        <Stack direction="row" justifyContent="space-between">
          <StyledBottomStack>
            <Typography variant="caption" color="textSecondary">
              {formatDate(creationDate, "DD.MM.YYYY | HH:mm")}
            </Typography>
            {!isSelected && editAccess && (
              <StyledIconButton onClick={() => setSelectedComment(commentId)}>
                <StyledEditIcon />
              </StyledIconButton>
            )}
            {editAccess && <DeleteComment id={id} />}
            <StyledIconButton onClick={handleReplyClick}>
              <StyledReplyIcon fontSize="small" />
            </StyledIconButton>
          </StyledBottomStack>
          <Stack>
            {children && children.length > 0 && (
              <Button onClick={handleOpenThreads}>
                {!openThreads ? (
                  <ExpandMore color="primary" fontSize="small" />
                ) : (
                  <ExpandLess color="primary" fontSize="small" />
                )}
                Ответы ({children.length})
              </Button>
            )}
          </Stack>
        </Stack>
      </StyledPaper>
      {openThreads && (
        <Box paddingLeft="15px">
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
      )}

      {isReplying && (
        <AnswerComment id={id} onReplySuccess={handleReplySuccess} />
      )}
    </>
  );
};

export default CommentItem;
