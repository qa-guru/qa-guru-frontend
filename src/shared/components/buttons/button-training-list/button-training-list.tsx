import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledNavigateButton,
  StyledIcon,
  StyledTypography,
} from "../buttons.styled";

const ButtonTrainingList: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledNavigateButton variant="outlined" onClick={() => navigate("/")}>
      <StyledIcon />
      <StyledTypography variant="subtitle1">К списку курсов</StyledTypography>
    </StyledNavigateButton>
  );
};

export default ButtonTrainingList;
