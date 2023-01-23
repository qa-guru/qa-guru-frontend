import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LectureDetail from "../../features/Lecture/LectureDetail";

const Lecture: React.FC = () => {
  let navigate = useNavigate();
  const { trainingId } = useParams();

  return (
    <>
      <Button
        sx={{ mb: "25px" }}
        onClick={() => navigate(`/training/${trainingId}`)}
      >
        <ArrowBackIcon sx={{ mr: "10px" }} />
        <Typography textTransform="none" variant="h5">
          К списку уроков
        </Typography>
      </Button>
      <LectureDetail />
    </>
  );
};

export default Lecture;
