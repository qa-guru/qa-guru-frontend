import React from "react";
import { Typography } from "@mui/material";
import { ILectureTitle } from "./LectureTitle.types";

const LectureTitle: React.FC<ILectureTitle> = (props) => {
  const { title } = props;

  return (
    <Typography mb={3} variant="h4">
      {title}
    </Typography>
  );
};

export default LectureTitle;
