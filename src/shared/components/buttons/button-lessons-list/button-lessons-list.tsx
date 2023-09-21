import React from "react";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { StyledButton, StyledIcon } from "../buttons.styled";

const ButtonLessonsList: React.FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <StyledButton
      variant="outlined"
      onClick={() => navigate(`/training/${trainingId}`)}
    >
      <StyledIcon />
      <Typography textTransform="none" variant="subtitle1">
        К списку уроков
      </Typography>
    </StyledButton>
  );
};

export default ButtonLessonsList;
