import React from "react";
import { ILectureTitle } from "./lecture-title.types";
import { StyledTypography } from "./lecture-title.styled";

const LectureTitle: React.FC<ILectureTitle> = (props) => {
  const { title } = props;

  return <StyledTypography variant="h4">{title}</StyledTypography>;
};

export default LectureTitle;
