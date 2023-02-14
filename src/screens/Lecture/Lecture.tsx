import React, { useState } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LectureHomework from "../../features/Homework/LectureHomework";
import LectureDetail from "../../features/Lecture/LectureDetail";
import HomeworkAnswer from "../../features/Homework/HomeworkAnswer/HomeworkAnswerContainer";
import SendHomeWorkToCheck from "../../features/Homework/SendHomeWork/SendHomeWorkContainer";
import useHomeworkAnswerStatus from "../../hooks/useHomeworkAnswerStatus";
import UpdateHomework from "../../features/Homework/UpdateHomework";

const style = {
  button: { mb: "25px" },
  icon: { mr: "10px" },
  paper: { padding: "20px", mt: "40px" },
  buttonUpdate: { textTransform: "none", minWidth: "151px" },
};

const Lecture: React.FC = () => {
  const { trainingId } = useParams();
  let navigate = useNavigate();
  const [homeworkStatus] = useHomeworkAnswerStatus();
  const [updateHomeworkAnswer, setUpdateHomeworkAnswer] =
    useState<Boolean>(false);

  let homework;

  if (homeworkStatus && !updateHomeworkAnswer) {
    homework = <HomeworkAnswer />;
  } else if (homeworkStatus && updateHomeworkAnswer) {
    homework = (
      <UpdateHomework setUpdateHomeworkAnswer={setUpdateHomeworkAnswer} />
    );
  } else if (!homeworkStatus && !updateHomeworkAnswer) {
    homework = <SendHomeWorkToCheck />;
  }

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
        <Paper sx={style.paper}>
          {homework}
          <br />
          {!updateHomeworkAnswer && homeworkStatus && (
            <Button
              onClick={() => setUpdateHomeworkAnswer(true)}
              sx={style.buttonUpdate}
              variant="contained"
            >
              Редактировать
            </Button>
          )}
        </Paper>
      </Stack>
    </>
  );
};

export default Lecture;
