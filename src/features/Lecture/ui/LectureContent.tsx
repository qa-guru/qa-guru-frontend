import React from "react";
import { Paper, Typography } from "@mui/material";

interface ILectureContent {
  contentLecture: string;
}

const LectureContent: React.FC<ILectureContent> = (props) => {
  const { contentLecture } = props;

  return (
    <>
      <Typography pt="40px" variant="h2">
        Материалы урока
      </Typography>
      <Paper sx={{ padding: "20px" }}>
        <Typography dangerouslySetInnerHTML={{ __html: contentLecture }} />
      </Paper>
    </>
  );
};

export default LectureContent;
