import React from "react";
import { Paper, Typography } from "@mui/material";

interface ILectureContent {
  contentLecture: string;
}

const style = {
  paper: { padding: "20px" },
};

const LectureContent: React.FC<ILectureContent> = (props) => {
  const { contentLecture } = props;

  return (
    <>
      <Typography mb="15px" pt="40px" variant="h4">
        Материалы урока
      </Typography>
      <Paper sx={style.paper}>
        <Typography dangerouslySetInnerHTML={{ __html: contentLecture }} />
      </Paper>
    </>
  );
};

export default LectureContent;
