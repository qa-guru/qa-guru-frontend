import { FC } from "react";

import { TextView } from "shared/components/text-editor";

import { ILectureHomework } from "./lecture-homework.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-homework.styled";

const LectureHomework: FC<ILectureHomework> = ({
  lectureHomeWork,
  children,
}) => {
  return (
    <StyledPaper>
      <StyledTypography variant="h5">Домашнее задание</StyledTypography>
      <StyledStack>
        <TextView content={lectureHomeWork} />
        {children}
      </StyledStack>
    </StyledPaper>
  );
};

export default LectureHomework;
