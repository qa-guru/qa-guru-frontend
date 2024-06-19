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

  const handleBack = () => changeStep(-1);
  const handleNext = () => changeStep(1);
  const handleFinish = () => navigate("/");

  const renderStepButtons = (index: number, isLastStep: boolean) => (
    <StyledButtonBox>
      <StyledBackButton
        variant="contained"
        color="secondary"
        size="small"
        disabled={index === 0}
        onClick={handleBack}
      >
        Назад
      </StyledBackButton>
      {!isLastStep ? (
        <StyledNextButton variant="contained" size="small" onClick={handleNext}>
          Далее
        </StyledNextButton>
      ) : (
        <StyledNextButton variant="contained" onClick={handleFinish}>
          Завершить курс
        </StyledNextButton>
      )}
    </StyledButtonBox>
  );

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
                {renderStepButtons(index, isLastStep)}
              </StepContent>
            )}
          </StyledStep>
        );
      })}
    </StyledStepper>
  );
};

export default StepperContent;
