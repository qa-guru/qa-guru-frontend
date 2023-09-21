import React from "react";
import { Box } from "@mui/material";
import BlurredComponent from "../blurred-component/blurred-component";
import { StyledButton } from "../blurred.styled";
import LectureHomework from "../../lecture-homework";
import Homework from "../../../../features/lecture-detail/containers/homework";

const BlurredHomework: React.FC = () => {
  return (
    <Box position="relative">
      <BlurredComponent>
        <LectureHomework />
        <Box pt="40px">
          <Homework />
        </Box>
      </BlurredComponent>
      <StyledButton
        disableElevation
        disableTouchRipple
        size="large"
        variant="contained"
      >
        Д/З недоступно
      </StyledButton>
    </Box>
  );
};

export default BlurredHomework;
