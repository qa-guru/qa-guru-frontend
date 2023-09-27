import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledIcon, StyledTypography } from "../buttons.styled";

const ButtonTrainingList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledButton variant="outlined" onClick={() => navigate("/")}>
      <StyledIcon />
      <StyledTypography variant="subtitle1">К списку курсов</StyledTypography>
    </StyledButton>
  );
};

export default ButtonTrainingList;
