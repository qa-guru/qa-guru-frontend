import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ILectureHomework } from "./LectureHomework.types";
import { style } from "./styles";
import ContentSerialization from "../Serializers/ContentSerialization";

const LectureHomework: React.FC<ILectureHomework> = ({
  dataLectureHomework,
}) => {
  const { lectureHomeWork } = dataLectureHomework!;

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
