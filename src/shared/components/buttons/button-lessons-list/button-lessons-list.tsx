import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StyledNavigateButton,
  StyledIcon,
  StyledTypography,
} from "../buttons.styled";

const ButtonLessonsList: FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <StyledNavigateButton
      variant="outlined"
      onClick={() => navigate(`/training/${trainingId}`)}
    >
      <StyledIcon />
      <StyledTypography variant="body2">К списку уроков</StyledTypography>
    </StyledNavigateButton>
  );
};

export default ButtonLessonsList;
