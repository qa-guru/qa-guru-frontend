import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LectureHomework from "../features/Homework/LectureHomework";
import LectureDetail from "../features/Lecture/LectureDetail";
import HomeworkWrapper from "../features/Homework/HomeworkWrapper";
import { primary } from "../theme/colors";

const style = {
  button: { mb: "25px", color: primary.main },
  icon: { mr: "10px" },
};

const Lecture: React.FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outlined"
        sx={style.button}
        onClick={() => navigate(`/training/${trainingId}`)}
      >
        <ArrowBackIcon sx={style.icon} />
        <Typography textTransform="none" variant="subtitle1">
          К списку уроков
        </Typography>
      </Button>
      <Stack>
        <LectureDetail />
        <LectureHomework />
        <HomeworkWrapper />
      </Stack>
    </>
  );
};

export default Lecture;
