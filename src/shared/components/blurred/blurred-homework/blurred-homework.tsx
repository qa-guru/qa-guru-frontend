import { FC } from "react";
import LectureHomework from "shared/components/lecture-homework";
import Homework from "features/lecture-detail/containers/homework";

import BlurredComponent from "../blurred-component/blurred-component";
import {
  StyledButton,
  StyledHomeworkBox,
  StyledWrapper,
} from "../blurred.styled";

const BlurredHomework: FC = () => {
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
