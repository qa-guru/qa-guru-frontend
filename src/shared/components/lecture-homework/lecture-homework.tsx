import React from "react";
import { ILectureHomework } from "./lecture-homework.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-homework.styled";
import ContentSerialization from "../../serializers/content-serialization";

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
