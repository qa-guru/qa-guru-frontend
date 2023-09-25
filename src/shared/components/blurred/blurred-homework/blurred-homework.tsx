import React from "react";
import BlurredComponent from "../blurred-component/blurred-component";
import {
  StyledButton,
  StyledHomeworkBox,
  StyledWrapper,
} from "../blurred.styled";
import LectureHomework from "../../lecture-homework";
import Homework from "../../../../features/lecture-detail/containers/homework";

const BlurredHomework: React.FC = () => {
  return (
    <StyledWrapper>
      <BlurredComponent>
        <LectureHomework />
        <StyledHomeworkBox>
          <Homework />
        </StyledHomeworkBox>
      </BlurredComponent>
      <StyledButton
        disableElevation
        disableTouchRipple
        size="large"
        variant="contained"
      >
        Д/З недоступно
      </StyledButton>
    </StyledWrapper>
  );
};

export default BlurredHomework;
