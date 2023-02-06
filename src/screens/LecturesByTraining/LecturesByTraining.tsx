import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrainingItemTitle from "../../features/Training/TrainingItemTitle";
import TrainingLectures from "../../features/Lecture/TrainingLectures";

const style = {
  button: {
    mb: "25px",
  },
  icon: { mr: "10px" },
};

const LecturesByTraining: React.FC = () => {
  let navigate = useNavigate();

  return (
    <>
      <Button sx={style.button} onClick={() => navigate("/")}>
        <ArrowBackIcon sx={style.icon} />
        <Typography textTransform="none" variant="subtitle1">
          К списку курсов
        </Typography>
      </Button>
      <TrainingItemTitle />
      <TrainingLectures />
    </>
  );
};

export default LecturesByTraining;
