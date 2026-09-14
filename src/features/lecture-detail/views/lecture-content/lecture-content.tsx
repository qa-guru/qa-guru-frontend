import { FC } from "react";
import { Divider } from "@mui/material";

import { TextView } from "shared/components/text-editor";

import { ILectureContent } from "./lecture-content.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-content.styled";
import LectureFiles from "../lecture-files";

const LectureContent: FC<ILectureContent> = ({
  content,
  lectureId,
  files,
}) => {
  return (
    <StyledPaper>
      <StyledTypography variant="h5">Материалы урока</StyledTypography>
      <Divider />
      <StyledStack>
        <TextView content={content} />
      </StyledStack>
      <LectureFiles lectureId={lectureId} files={files} title="Файлы" />
    </StyledPaper>
  );
};

export default LectureContent;
