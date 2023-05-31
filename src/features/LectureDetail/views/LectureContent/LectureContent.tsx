import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ILectureContent } from "./LectureContent.types";
import { style } from "./styles";
import ContentSerialization from "../../../../shared/Serializers/ContentSerialization";

const LectureContent: React.FC<ILectureContent> = ({ content }) => {
  return (
    <>
      <Typography mb="15px" pt="30px" variant="h4">
        Материалы урока
      </Typography>
      <Paper sx={style.paper}>
        <Stack spacing={0.5}>
          <ContentSerialization content={content} />
        </Stack>
      </Paper>
    </>
  );
};

export default LectureContent;
