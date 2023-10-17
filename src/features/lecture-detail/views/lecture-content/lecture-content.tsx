import { FC } from "react";
import { Divider } from "@mui/material";
import ContentSerialization from "shared/serializers/content-serialization";
import { ILectureContent } from "./lecture-content.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-content.styled";

const LectureContent: FC<ILectureContent> = ({ content }) => {
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
