import React from "react";
import { Divider } from "@mui/material";
import { ILectureContent } from "./lecture-content.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-content.styled";
import ContentSerialization from "../../../../shared/serializers/content-serialization";

const LectureContent: React.FC<ILectureContent> = ({ content }) => {
  return (
    <>
      <StyledPaper>
        <StyledTypography variant="h5">Материалы урока</StyledTypography>
        <Divider />
        <StyledStack>
          <ContentSerialization content={content} />
        </StyledStack>
      </StyledPaper>
    </>
  );
};

export default LectureContent;
