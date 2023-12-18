import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { ROUTES } from "../../constants";
import { StyledNavigateButton, StyledIcon } from "./button-lessons-list.styled";

const ButtonLessonsList: FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <StyledNavigateButton
      variant="outlined"
      onClick={() => navigate(`${ROUTES.TRAINING}/${trainingId}`)}
    >
      <StyledIcon />
      <Typography variant="body2">К списку уроков</Typography>
    </StyledNavigateButton>
  );
};

export default ButtonLessonsList;
