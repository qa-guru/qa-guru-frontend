import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LectureHomework from "../../features/Homework/LectureHomework";
import LectureDetail from "../../features/Lecture/LectureDetail";
import HomeworkAnswer from "../../features/Homework/HomeworkAnswer/HomeworkAnswerContainer";
import SendHomeWorkToCheck from "../../features/Homework/SendHomeWork/SendHomeWorkContainer";
import useHomeworkCheckStatus from "../../hooks/useHomeworkCheckStatus";

const style = {
  button: { mb: "25px" },
  icon: { mr: "10px" },
};

const Lecture: React.FC = () => {
  const { trainingId } = useParams();
  let navigate = useNavigate();
  const [homeworkStatus] = useHomeworkCheckStatus();

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
        {homeworkStatus ? <HomeworkAnswer /> : <SendHomeWorkToCheck />}
      </Stack>
    </>
  );
};

export default Lecture;
