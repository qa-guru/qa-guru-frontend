import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ILectureHomework } from "./lecture-homework.types";
import { style } from "./styles";
import ContentSerialization from "../../serializers/content-serialization";

const LectureHomework: React.FC<ILectureHomework> = ({ lectureHomeWork }) => {
  return (
    <>
      <Paper sx={style.paper}>
        <Typography mb={2} variant="h5">
          Домашнее задание
        </Typography>
        <Stack spacing={0.5}>
          <ContentSerialization content={lectureHomeWork!} />
        </Stack>
      </Paper>
    </>
  );
};

export default LectureHomework;
