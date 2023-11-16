import { FC } from "react";
import { ILectureTitle } from "./lecture-title.types";
import { StyledTypography } from "./lecture-title.styled";

const LectureTitle: FC<ILectureTitle> = (props) => {
  const { title } = props;

  return <StyledTypography variant="h2">{title}</StyledTypography>;
};

export default LectureTitle;
