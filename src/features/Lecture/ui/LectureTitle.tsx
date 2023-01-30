import React from "react";
import { Typography } from "@mui/material";

interface ILectureTitle {
  title: string;
}

const LectureTitle: React.FC<ILectureTitle> = (props) => {
  const { title } = props;

  return <Typography variant="h2">{title}</Typography>;
};

export default LectureTitle;
