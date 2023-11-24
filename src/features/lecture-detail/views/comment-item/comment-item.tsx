import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import TextSerialization from "shared/serializers/text-serialization";
import { ReactComponent as Edit } from "assets/icons/button-edit.svg";
import UserRow from "shared/components/user-row";
import { ICommentItem } from "./comment-item.types";
import {
  StyledBox,
  StyledCommentBox,
  StyledCommentStack,
  StyledPaper,
  StyledReplyIcon,
  StyledStack,
} from "./comment-item.styled";
import UpdateComment from "../../containers/update-comment";
import SendComment from "../../containers/send-comment";

const CommentItem: FC<ICommentItem> = ({
  item,
  editAccess,
  isSelected,
  setSelectedIndex,
  index,
}) => {
  const { creator, content, creationDate, id } = item || {};
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  return (
    <>
      <StyledPaper key={index} editAccess={editAccess}>
        <StyledStack>
          <StyledCommentBox>
            <UserRow user={creator} date={creationDate} />
            <StyledBox>
              {isSelected ? (
                <UpdateComment
                  content={content}
                  setSelectedIndex={setSelectedIndex}
                  id={id}
                />
              ) : (
                <TextSerialization text={content} />
              )}
            </StyledBox>
          </StyledCommentBox>

          {!isSelected && editAccess && (
            <IconButton onClick={() => setSelectedIndex(index)}>
              <Edit />
            </IconButton>
          )}
        </StyledStack>
        <IconButton onClick={handleReplyClick}>
          <StyledReplyIcon fontSize="small" />
        </IconButton>
      </StyledPaper>
      {isReplying && (
        <StyledCommentStack>
          <UserRow hideFullName />
          <StyledCommentBox>
            <SendComment hideTitile />
          </StyledCommentBox>
        </StyledCommentStack>
      )}
    </>
  );
};

export default CommentItem;
