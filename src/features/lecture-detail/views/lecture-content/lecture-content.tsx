import { FC } from "react";
import { Divider } from "@mui/material";

import { TextView } from "shared/components/text-editor";

import { ILectureContent } from "./lecture-content.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-content.styled";

const LectureContent: FC<ILectureContent> = ({ content }) => {
  return (
    <StyledPaper>
      <StyledTypography variant="h5">Материалы урока</StyledTypography>
      <Divider />
      <StyledStack>
        <TextView content={content} />;
      </StyledStack>
    </StyledPaper>
  );
};

export default LectureContent;
