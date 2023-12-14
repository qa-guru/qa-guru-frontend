import { FC } from "react";

import { ILectureHomework } from "./lecture-homework.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-homework.styled";
import { TextView } from "../text-editor";

const LectureHomework: FC<ILectureHomework> = ({ lectureHomeWork }) => {
  return (
    <StyledPaper>
      <StyledTypography variant="h5">Домашнее задание</StyledTypography>
      <StyledStack>
        {lectureHomeWork?.map((item, index) => {
          return <TextView key={index} content={item?.value} />;
        })}
      </StyledStack>
    </StyledPaper>
  );
};

export default LectureHomework;
