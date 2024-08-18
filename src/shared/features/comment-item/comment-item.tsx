import { FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useReactiveVar } from "@apollo/client";

import { userIdVar } from "cache";
import UserRow from "shared/components/user-row";
import { TextView } from "shared/components/text-editor";
import { useComment } from "shared/hooks/use-comment";
import { formatDate } from "shared/helpers";
import AnswerComment from "shared/features/answer-comment/container";
import DeleteComment from "shared/features/delete-comment/container";
import UpdateComment from "shared/features/update-comment/container";
import LikeComment from "shared/features/like-comment/container";

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

const CommentItem: FC<ICommentItem> = ({
  item,
  commentId,
  parentID = null,
  homeworkId,
}) => {
  const { creator, content, creationDate, likes, id, children, userLike } =
    item || {};
  const { selectedComment, setSelectedComment } = useComment();

  const [isReplying, setIsReplying] = useState<boolean>(false);

  const [openThreads, setOpenThreads] = useState(false);

  const updateComment = <UpdateComment content={content} commentId={id} />;
  const comment = <TextView content={content} />;

  const handleReplySuccess = () => {
    setIsReplying(false);
    setOpenThreads(true);
  };

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleOpenThreads = () => {
    setOpenThreads(!openThreads);
  };

  const currentUserId = useReactiveVar(userIdVar);
  const editAccess = currentUserId === creator?.id;
  const isSelected = selectedComment === id;

  const renderEditIcon = () =>
    !isSelected &&
    editAccess && (
      <StyledIconButton onClick={() => setSelectedComment(commentId)}>
        <StyledEditIcon />
      </StyledIconButton>
    );

  const renderDeleteComment = () =>
    editAccess && <DeleteComment id={id} homeworkId={homeworkId} />;

  const renderThread = () =>
    openThreads && (
      <StyledThreadStack>
        {children?.map((childComment) => (
          <CommentItem
            homeworkId={homeworkId}
            key={childComment?.id}
            item={childComment}
            commentId={childComment?.id}
            parentID={id}
            editAccess={editAccess}
          />
        ))}
      </StyledThreadStack>
    );

  const renderAnswerComment = () =>
    isReplying && (
      <AnswerComment
        homeworkId={homeworkId}
        commentId={id}
        onReplySuccess={handleReplySuccess}
      />
    );

  const renderThreadToggleButton = () =>
    children &&
    children.length > 0 && (
      <Button onClick={handleOpenThreads}>
        {!openThreads ? (
          <ExpandMore color="primary" fontSize="small" />
        ) : (
          <ExpandLess color="primary" fontSize="small" />
        )}
        Ответы ({children.length})
      </Button>
    );

  return (
    <>
      <StyledPaper key={commentId} editAccess={editAccess}>
        <StyledStack>
          <StyledCommentBox>
            <UserRow user={creator} userId={creator?.id} hasLink />
            <StyledBox>{isSelected ? updateComment : comment}</StyledBox>
          </StyledCommentBox>
        </StyledStack>
        <Stack direction="row" justifyContent="space-between">
          <StyledBottomStack>
            <LikeComment commentId={id} likes={likes} userLike={userLike} />
            <Typography variant="caption" color="textSecondary">
              {formatDate(creationDate, "DD.MM.YYYY | HH:mm")}
            </Typography>
            {renderEditIcon()}
            {renderDeleteComment()}
            <StyledIconButton onClick={handleReplyClick}>
              <StyledReplyIcon color="primary" />
            </StyledIconButton>
          </StyledBottomStack>
          <Stack>{renderThreadToggleButton()}</Stack>
        </Stack>
      </StyledPaper>
      {renderThread()}

      {renderAnswerComment()}
    </>
  );
};

export default CommentItem;
