import React, { useState } from "react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ICommentLimited } from "./ICommentLimited.types";
import SendComment from "../Comment/SendComment";
import UpdateComment from "../Comment/UpdateComment";
import TextSerialization from "../../../shared/Serializers/TextSerialization";
import { ReactComponent as Edit } from "../../../assets/icons/button-edit.svg";
import { grey } from "../../../theme/colors";
import Profile from "../Profile/Profile";

const style = {
  avatar: {
    width: 40,
    height: 40,
  },
  container: {
    backgroundColor: grey.secondary,
    borderRadius: "12px",
    padding: { xs: "10px", md: "15px" },
  },
};

const CommentLimited: React.FC<ICommentLimited> = (props) => {
  const { dataCommentsHomeWorkByHomeWork, dataUserId, id } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { totalElements, items } =
    dataCommentsHomeWorkByHomeWork?.commentsHomeWorkByHomeWork! || {};

  return (
    <>
      <SendComment id={id!} />
      <Stack spacing={1} direction="row">
        <Typography variant="h5">Комментарии</Typography>
        <Typography variant="h5">({totalElements})</Typography>
      </Stack>

      <Stack mt="5px" spacing={2}>
        {items?.slice(0, 3).map((item, index) => {
          const isSelected = index === selectedIndex;
          const { creator, content, creationDate, id } = item!;
          const editAccess = dataUserId?.user?.id === creator?.id;

          return (
            <Paper key={index} sx={style.container}>
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
        })}
      </Stack>
    </>
  );
};

export default CommentLimited;
