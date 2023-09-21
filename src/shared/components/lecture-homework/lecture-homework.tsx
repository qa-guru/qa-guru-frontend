import React from "react";
import { Stack, Typography } from "@mui/material";
import { ILectureHomework } from "./lecture-homework.types";
import { StyledPaper } from "./lecture-homework.styled";
import ContentSerialization from "../../serializers/content-serialization";

const LectureHomework: React.FC<ILectureHomework> = ({ lectureHomeWork }) => {
  return (
    <>
      <StyledPaper>
        <Typography mb={2} variant="h5">
          Домашнее задание
        </Typography>
        <Stack spacing={0.5}>
          <ContentSerialization content={lectureHomeWork!} />
        </Stack>
      </StyledPaper>
    </>
  );
};

export default LectureHomework;
