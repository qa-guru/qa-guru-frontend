import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LectureDetail from "../../features/Lecture/LectureDetail";

const style = {
  button: { mb: "25px" },
  icon: { mr: "10px" },
};

const Lecture: React.FC = () => {
  let navigate = useNavigate();
  const { trainingId } = useParams();

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
      <LectureDetail />
    </>
  );
};

export default Lecture;
