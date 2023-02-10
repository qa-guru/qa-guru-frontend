import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LectureHomework from "../../features/Homework/LectureHomework";
import LectureDetail from "../../features/Lecture/LectureDetail";
import HomeworkCheckStatus from "../../features/Homework/HomeworkCheckStatus";
import AllHomeworkAnswers from "../../features/Homework/AllHomeworkAnswers";

const style = {
  button: { mb: "25px" },
  icon: { mr: "10px" },
};

const Lecture: React.FC = () => {
  const { trainingId } = useParams();
  let navigate = useNavigate();

  return (
    <>
      <Button
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
        <HomeworkCheckStatus />
      </Stack>
    </>
  );
};

export default Lecture;
