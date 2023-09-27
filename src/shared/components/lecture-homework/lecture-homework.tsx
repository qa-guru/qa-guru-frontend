import React from "react";
import ContentSerialization from "shared/serializers/content-serialization";
import { ILectureHomework } from "./lecture-homework.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-homework.styled";

const LectureHomework: React.FC<ILectureHomework> = ({ lectureHomeWork }) => {
  return (
    <>
      <StyledPaper>
        <StyledTypography variant="h5">Домашнее задание</StyledTypography>
        <StyledStack>
          <ContentSerialization content={lectureHomeWork!} />
        </StyledStack>
      </StyledPaper>
    </>
  );
};

export default LectureHomework;
