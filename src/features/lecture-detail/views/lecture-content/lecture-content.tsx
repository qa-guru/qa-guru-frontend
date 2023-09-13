import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ILectureContent } from "./lecture-content.types";
import { style } from "./styles";
import ContentSerialization from "../../../../shared/serializers/content-serialization";

const LectureContent: React.FC<ILectureContent> = ({ content }) => {
  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb={3} variant="h5">
          Материалы урока
        </Typography>
        <Stack spacing={0.5}>
          <ContentSerialization content={content} />
        </Stack>
      </Paper>
    </>
  );
};

export default LectureContent;
