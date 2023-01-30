import React from "react";
import { Paper, Typography } from "@mui/material";

interface ILectureHomework {
  contentLectureHomeWork: string;
}

const LectureHomework: React.FC<ILectureHomework> = (props) => {
  const { contentLectureHomeWork } = props;

  return (
    <>
      <Typography pt="40px" variant="h2">
        Домашнее задание
      </Typography>
      <Paper sx={{ padding: "20px 30px" }}>
        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: contentLectureHomeWork }}
        />
      </Paper>
    </>
  );
};

export default LectureHomework;
