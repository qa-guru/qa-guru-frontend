import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { StyledNavigateButton, StyledIcon } from "../buttons.styled";
import { ROUTES } from "../../../constants/constants";

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
