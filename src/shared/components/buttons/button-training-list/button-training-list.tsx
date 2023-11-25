import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { StyledNavigateButton, StyledIcon } from "../buttons.styled";

const ButtonTrainingList: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledNavigateButton variant="outlined" onClick={() => navigate("/")}>
      <StyledIcon />
      <Typography variant="body2">К списку курсов</Typography>
    </StyledNavigateButton>
  );
};

export default ButtonTrainingList;
