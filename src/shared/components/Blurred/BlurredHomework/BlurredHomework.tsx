import React from "react";
import { Box, Button } from "@mui/material";
import BlurredComponent from "../BlurredComponent/BlurredComponent";
import { style } from "../styles";
import LectureHomework from "../../LectureHomework";
import Homework from "../../../../features/LectureDetail/containers/Homework";

const BlurredHomework: React.FC = () => {
  return (
    <Box position="relative">
      <BlurredComponent>
        <LectureHomework />
        <Box pt="40px">
          <Homework />
        </Box>
      </BlurredComponent>
      <Button
        disableElevation
        disableTouchRipple
        size="large"
        sx={style.button}
        variant="contained"
      >
        Д/З недоступно
      </Button>
    </Box>
  );
};

export default BlurredHomework;
