import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrainingItemTitle from "../../features/Training/TrainingItemTitle";
import TrainingLectures from "../../features/Lecture/TrainingLectures";

const LecturesByTraining: React.FC = () => {
  let navigate = useNavigate();

  return (
    <>
      <Button sx={{ mb: "25px" }} onClick={() => navigate("/")}>
        <ArrowBackIcon sx={{ mr: "10px" }} />
        <Typography textTransform="none" variant="h5">
          К списку курсов
        </Typography>
      </Button>
      <TrainingItemTitle />
      <TrainingLectures />
    </>
  );
};

export default LecturesByTraining;
