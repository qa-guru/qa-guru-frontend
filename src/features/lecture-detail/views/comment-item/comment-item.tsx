import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { ReactComponent as Edit } from "assets/icons/button-edit.svg";
import UserRow from "shared/components/user-row";
import { TextView } from "shared/components/text-editor";

import { ICommentItem } from "./comment-item.types";
import {
  StyledBox,
  StyledCommentBox,
  StyledIconBox,
  StyledPaper,
  StyledReplyIcon,
  StyledStack,
} from "./comment-item.styled";
import { UpdateComment, AnswerComment } from "../../containers";

const CommentItem: FC<ICommentItem> = ({
  item,
  editAccess,
  isSelected,
  setSelectedComment,
  commentId,
}) => {
  const { creator, content, creationDate, id } = item || {};
  const [isReplying, setIsReplying] = useState<boolean>(false);

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
                <UpdateComment
                  content={content}
                  setSelectedComment={setSelectedComment}
                  id={id}
                />
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
      {isReplying && <AnswerComment id={id} />}
    </>
  );
};

export default CommentItem;
