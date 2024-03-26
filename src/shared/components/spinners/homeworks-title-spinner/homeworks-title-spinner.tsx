import { FC } from "react";

import {
  StyledHomeworksBox,
  StyledSpinner,
  StyledTitle,
} from "../spinners.styled";

const HomeworksTitleSpinner: FC = () => {
  return (
    <StyledHomeworksBox>
      <StyledTitle variant="h3">Домашние работы других студентов</StyledTitle>
      <StyledSpinner color="primary" size={20} />
    </StyledHomeworksBox>
  );
};

export default HomeworksTitleSpinner;
