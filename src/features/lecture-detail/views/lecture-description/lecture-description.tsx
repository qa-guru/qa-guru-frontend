import { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { ILectureDescription } from "./lecture-description.types";
import {
  StyledCircle,
  StyledPaper,
  StyledStack,
  StyledTypography,
} from "./lecture-description.styled";
import { INDEX_OFFSET } from "../../constants";

const LectureDescription: FC<ILectureDescription> = (props) => {
  const { description } = props;

  return (
    <StyledPaper>
      <StyledTypography variant="h5">Содержание урока</StyledTypography>
      <Divider />
      <Stack>
        {description?.map((value, index) => {
          return (
            <StyledStack key={value}>
              <StyledCircle variant="subtitle2">
                {index + INDEX_OFFSET}
              </StyledCircle>
              <Typography variant="body1">{value}</Typography>
            </StyledStack>
          );
        })}
      </Stack>
    </StyledPaper>
  );
};

export default LectureDescription;
