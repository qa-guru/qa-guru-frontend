import React from "react";
import { Box, Button } from "@mui/material";
import BlurredComponent from "./BlurredComponent";
import LectureHomework from "../../features/LectureDetail/views/LectureHomework";
import Homework from "../../features/LectureDetail/containers/Homework";
import { primary } from "../../theme/colors";
import { lectureHomework } from "../mocks/lectureHomework.mock";

const style = {
  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "default",
    borderRadius: "7px",
    "&:hover": { backgroundColor: primary.main },
  },
};

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
