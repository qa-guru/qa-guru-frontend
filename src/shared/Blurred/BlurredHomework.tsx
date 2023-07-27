import React from "react";
import { Box, Button } from "@mui/material";
import BlurredComponent from "./BlurredComponent";
import { style } from "./styles";
import LectureHomework from "../../features/LectureDetail/views/LectureHomework";
import Homework from "../../features/LectureDetail/containers/Homework";
import { lectureHomework } from "../mocks/lectureHomework.mock";

const BlurredHomework: React.FC = () => {
  return (
    <Box position="relative">
      <BlurredComponent>
        <LectureHomework dataLectureHomework={lectureHomework} />
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
