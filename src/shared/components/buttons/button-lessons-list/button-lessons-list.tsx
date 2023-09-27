import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledButton, StyledIcon, StyledTypography } from "../buttons.styled";

const ButtonLessonsList: React.FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <StyledButton
      variant="outlined"
      onClick={() => navigate(`/training/${trainingId}`)}
    >
      <StyledIcon />
      <StyledTypography variant="subtitle1">К списку уроков</StyledTypography>
    </StyledButton>
  );
};

export default ButtonLessonsList;
