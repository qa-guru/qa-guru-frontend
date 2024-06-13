import { FC } from "react";
import { StepContent, StepLabel, Typography } from "@mui/material";
import { SchoolRounded } from "@mui/icons-material";
import CustomLink from "shared/components/custom-link";
import { useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "shared/hooks";

import {
  StyledBackButton,
  StyledButtonBox,
  StyledNextButton,
  StyledStep,
  StyledStepper,
} from "./stepper-content.styled";
import { IStepperContent } from "./stepper-content.types";

const StepperContent: FC<IStepperContent> = ({
  lectures,
  activeStep,
  changeStep,
}) => {
  const navigate = useNavigate();
  const { trainingId } = useParams();
  const { isDesktop } = useResponsive();

  return (
    <StyledStepper
      key={activeStep}
      activeStep={activeStep}
      orientation="vertical"
      connector={null}
    >
      {lectures?.map((item, index) => {
        const { id, subject, description } = item?.lecture || {};
        const isLastStep = index === lectures.length - 1;

        return (
          <StyledStep key={id} id={`step-${index}`}>
            <CustomLink path={`/training/${trainingId}/${id}`}>
              <StepLabel icon={<SchoolRounded fontSize="small" />}>
                <Typography variant="caption">{subject}</Typography>
              </StepLabel>
            </CustomLink>
            {isDesktop && (
              <StepContent>
                <Typography variant="caption">{description}</Typography>
                <StyledButtonBox>
                  <StyledBackButton
                    variant="contained"
                    color="secondary"
                    size="small"
                    disabled={index === 0}
                    onClick={() => changeStep(-1)}
                  >
                    Назад
                  </StyledBackButton>
                  {!isLastStep && (
                    <StyledNextButton
                      variant="contained"
                      size="small"
                      onClick={() => changeStep(1)}
                    >
                      Далее
                    </StyledNextButton>
                  )}
                  {isLastStep && (
                    <StyledNextButton
                      variant="contained"
                      onClick={() => navigate("/")}
                    >
                      Завершить курс
                    </StyledNextButton>
                  )}
                </StyledButtonBox>
              </StepContent>
            )}
          </StyledStep>
        );
      })}
    </StyledStepper>
  );
};

export default StepperContent;
