import { FC } from "react";
import { StepContent, StepLabel, Typography, Box } from "@mui/material";
import { SchoolRounded, Lock } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import CustomLink from "shared/components/custom-link";
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

  const isLectureAccessible = (index: number) => {
    const lecture = lectures?.[index];
    return lecture && !lecture.locking && lecture.isAvailable;
  };

  const renderStepButtons = (index: number, isLastStep: boolean) => {
    const canGoBack = index > 0 && isLectureAccessible(index - 1);
    const canGoNext = !isLastStep && isLectureAccessible(index + 1);

    return (
      <StyledButtonBox>
        <StyledBackButton
          variant="contained"
          color="secondary"
          size="small"
          disabled={!canGoBack}
          onClick={handleBack}
        >
          Назад
        </StyledBackButton>
        {!isLastStep ? (
          <StyledNextButton
            variant="contained"
            size="small"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            Далее
          </StyledNextButton>
        ) : (
          <StyledNextButton variant="contained" onClick={handleFinish}>
            Завершить курс
          </StyledNextButton>
        )}
      </StyledButtonBox>
    );
  };

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
        const isAccessible = isLectureAccessible(index);

        return (
          <StyledStep key={id} id={`step-${index}`}>
            {isAccessible ? (
              <CustomLink path={`/training/${trainingId}/${id}`}>
                <StepLabel icon={<SchoolRounded fontSize="small" />}>
                  <Typography variant="caption">{subject}</Typography>
                </StepLabel>
              </CustomLink>
            ) : (
              <StepLabel
                icon={<Lock fontSize="small" />}
                sx={{ opacity: 0.6, cursor: "not-allowed" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {subject}
                  </Typography>
                </Box>
              </StepLabel>
            )}
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
