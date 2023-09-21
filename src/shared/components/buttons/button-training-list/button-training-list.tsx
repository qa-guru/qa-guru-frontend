import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledIcon } from "../buttons.styled";

const ButtonTrainingList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledButton variant="outlined" onClick={() => navigate("/")}>
      <StyledIcon />
      <Typography textTransform="none" variant="subtitle1">
        К списку курсов
      </Typography>
    </StyledButton>
  );
};

export default ButtonTrainingList;
