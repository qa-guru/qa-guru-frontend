import React from "react";
import { Paper, Typography } from "@mui/material";

interface ILectureHomework {
  contentLectureHomeWork: string;
}

const style = {
  paper: { padding: "20px 30px" },
};

const LectureHomework: React.FC<ILectureHomework> = (props) => {
  const { contentLectureHomeWork } = props;

  return (
    <>
      <Typography pt="40px" variant="h4" mb="15px">
        Домашнее задание
      </Typography>
      <Paper sx={style.paper}>
        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: contentLectureHomeWork }}
        />
      </Paper>
    </>
  );
};

export default LectureHomework;
