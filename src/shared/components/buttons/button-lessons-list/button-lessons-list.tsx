import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { StyledNavigateButton, StyledIcon } from "../buttons.styled";

const ButtonLessonsList: FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <StyledNavigateButton
      variant="outlined"
      onClick={() => navigate(`/training/${trainingId}`)}
    >
      <StyledIcon />
      <Typography variant="body2">К списку уроков</Typography>
    </StyledNavigateButton>
  );
};

export default ButtonLessonsList;
