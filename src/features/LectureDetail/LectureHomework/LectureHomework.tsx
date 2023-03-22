import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ILectureHomework } from "./LectureHomework.types";
import Content from "../../../shared/Content";

const style = {
  paper: { padding: { xs: "15px", md: "20px" } },
};

const LectureHomework: React.FC<ILectureHomework> = ({
  dataLectureHomework,
}) => {
  const { lectureHomeWork } = dataLectureHomework!;

  return (
    <>
      <Typography pt="30px" variant="h4" mb="15px">
        Домашнее задание
      </Typography>
      <Paper sx={style.paper}>
        <Stack spacing={0.5}>
          <Content content={lectureHomeWork!} />
        </Stack>
      </Paper>
    </>
  );
};

export default LectureHomework;
