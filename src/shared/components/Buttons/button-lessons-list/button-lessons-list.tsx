import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "../styles";

const ButtonLessonsList: React.FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={style.lessonsButton}
      onClick={() => navigate(`/training/${trainingId}`)}
    >
      <ArrowBackIcon sx={style.lessonsIcon} />
      <Typography textTransform="none" variant="subtitle1">
        К списку уроков
      </Typography>
    </Button>
  );
};

export default ButtonLessonsList;
