import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { ILectureDescription } from "./lecture-description.types";
import {
  StyledCircle,
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-description.styled";
import { INDEX_OFFSET } from "../../constants/constants";

const LectureDescription: React.FC<ILectureDescription> = (props) => {
  const { description } = props;

  return (
    <StyledPaper>
      <StyledTypography variant="h5">Содержание урока</StyledTypography>
      <Divider />
      <Stack>
        {description?.map((value, index) => {
          return (
            <StyledStack key={index}>
              <StyledCircle variant="subtitle2">
                {index + INDEX_OFFSET}
              </StyledCircle>
              <Typography variant="subtitle1">{value}</Typography>
            </StyledStack>
          );
        })}
      </Stack>
    </StyledPaper>
  );
};

export default LectureDescription;
