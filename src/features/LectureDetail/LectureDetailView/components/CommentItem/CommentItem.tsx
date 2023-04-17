import React from "react";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import { ICommentItem } from "./CommentItem.types";
import UpdateComment from "../../../LectureDetailContainer/UpdateComment";
import TextSerialization from "../../../../../shared/Serializers/TextSerialization";
import { ReactComponent as Edit } from "../../../../../assets/icons/button-edit.svg";
import { grey, primary } from "../../../../../theme/colors";
import Profile from "../Profile";

const style = {
  container: {
    borderRadius: "12px",
    padding: { xs: "10px", md: "15px" },
  },
};

const CommentItem: React.FC<ICommentItem> = ({
  item,
  editAccess,
  isSelected,
  setSelectedIndex,
  index,
}) => {
  const { creator, content, creationDate, id } = item;

  return (
    <Paper
      key={index}
      sx={style.container}
      style={{
        backgroundColor: editAccess ? primary.secondary : grey.secondary,
      }}
    >
      <Stack
        alignItems={{ xs: "flex-start", md: "center" }}
        direction="row"
        justifyContent="space-between"
        spacing={1}
      >
        <Box width="100%">
          <Profile
            firstName={creator?.firstName!}
            lastName={creator?.lastName!}
            date={creationDate!}
          />

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
      </Stack>
    </Paper>
  );
};

export default CommentItem;
