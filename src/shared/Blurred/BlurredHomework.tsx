import React from "react";
import { Box, Button } from "@mui/material";
import BlurredComponent from "./BlurredComponent";
import LectureHomework from "../../features/LectureDetail/LectureHomework";
import Homework from "../../features/LectureDetail/Homework";
import { primary } from "../../theme/colors";
import { mockDataLectureHomework } from "../mocks/dataLectureHomework.mock";

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
        <LectureHomework dataLectureHomework={mockDataLectureHomework} />
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
