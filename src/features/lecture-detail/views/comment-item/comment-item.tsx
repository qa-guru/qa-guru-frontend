import React from "react";
import { Box, IconButton } from "@mui/material";
import { ICommentItem } from "./comment-item.types";
import { StyledPaper, StyledStack } from "./comment-item.styled";
import UpdateComment from "../../containers/update-comment";
import TextSerialization from "../../../../shared/serializers/text-serialization";
import { ReactComponent as Edit } from "../../../../assets/icons/button-edit.svg";
import { grey, primary } from "../../../../theme/colors";
import UserRow from "../../../../shared/components/user-row";

const CommentItem: React.FC<ICommentItem> = ({
  item,
  editAccess,
  isSelected,
  setSelectedIndex,
  index,
}) => {
  const { creator, content, creationDate, id } = item;

  return (
    <StyledPaper
      key={index}
      style={{
        backgroundColor: editAccess ? primary.secondary : grey.secondary,
      }}
    >
      <StyledStack spacing={1} direction="row">
        <Box width="100%">
          <UserRow user={creator!} date={creationDate} />
          <Box mt="7px">
            {isSelected ? (
              <UpdateComment
                content={content!}
                setSelectedIndex={setSelectedIndex}
                id={id!}
              />
            ) : (
              <TextSerialization text={content!} />
            )}
          </Box>
        </Box>

        {!isSelected && editAccess && (
          <IconButton onClick={() => setSelectedIndex(index)}>
            <Edit />
          </IconButton>
        )}
      </StyledStack>
    </StyledPaper>
  );
};

export default CommentItem;
