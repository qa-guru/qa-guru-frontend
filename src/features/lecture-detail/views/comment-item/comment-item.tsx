import { FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import UserRow from "shared/components/user-row";
import { TextView } from "shared/components/text-editor";
import { useComment } from "shared/context/comment-context";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { formatDate } from "shared/helpers";

import { ICommentItem } from "./comment-item.types";
import {
  StyledBottomStack,
  StyledBox,
  StyledCommentBox,
  StyledEditIcon,
  StyledIconButton,
  StyledPaper,
  StyledReplyIcon,
  StyledStack,
  StyledThreadStack,
} from "./comment-item.styled";
import {
  AnswerComment,
  DeleteComment,
  UpdateComment,
  LikeComment,
} from "../../containers";

const CommentItem: FC<ICommentItem> = ({
  item,
  commentId,
  currentUserID,
  parentID = null,
  homeworkId,
}) => {
  const { creator, content, creationDate, likes, id, children, userLike } =
    item || {};
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
            <UserRow user={creator} userId={creator?.id} hasLink />
            <StyledBox>
              {isSelected ? (
                <UpdateComment content={content} commentId={id} />
              ) : (
                <TextView content={content} />
              )}
            </StyledBox>
          </StyledCommentBox>
        </StyledStack>
        <Stack direction="row" justifyContent="space-between">
          <StyledBottomStack>
            <LikeComment commentId={id} likes={likes} userLike={userLike} />
            <Typography variant="caption" color="textSecondary">
              {formatDate(creationDate, "DD.MM.YYYY | HH:mm")}
            </Typography>
            {!isSelected && editAccess && (
              <StyledIconButton onClick={() => setSelectedComment(commentId)}>
                <StyledEditIcon />
              </StyledIconButton>
            )}
            {editAccess && <DeleteComment id={id} homeworkId={homeworkId} />}
            <StyledIconButton onClick={handleReplyClick}>
              <StyledReplyIcon color="primary" />
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
        <StyledThreadStack>
          {children?.map((childComment) => (
            <CommentItem
              {...{ homeworkId, editAccess, currentUserID }}
              key={childComment?.id}
              item={childComment}
              commentId={childComment?.id}
              parentID={id}
            />
          ))}
        </StyledThreadStack>
      )}

      {isReplying && (
        <AnswerComment
          homeworkId={homeworkId}
          commentId={id}
          onReplySuccess={handleReplySuccess}
        />
      )}
    </>
  );
};

export default CommentItem;
