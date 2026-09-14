import { FC } from "react";
import { StepContent, StepLabel, Typography, Box } from "@mui/material";
import { SchoolRounded, Lock } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import CustomLink from "shared/components/custom-link";
import { isLectureAccessible, lectureListChipLabel } from "shared/helpers";
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

  const lectureAt = (index: number) => lectures?.[index];

  const renderStepButtons = (index: number, isLastStep: boolean) => {
    const canGoBack = index > 0 && isLectureAccessible(lectureAt(index - 1));
    const canGoNext = !isLastStep && isLectureAccessible(lectureAt(index + 1));

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
        const isAccessible = isLectureAccessible(item);

        return (
          <StyledStep key={id} id={`step-${index}`}>
            <CustomLink path={`/training/${trainingId}/${id}`}>
              <StepLabel
                icon={
                  isAccessible ? (
                    <SchoolRounded fontSize="small" />
                  ) : (
                    <Lock fontSize="small" />
                  )
                }
                sx={isAccessible ? undefined : { opacity: 0.6 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography
                    variant="caption"
                    color={isAccessible ? undefined : "text.secondary"}
                  >
                    {subject}
                  </Typography>
                  {!isAccessible && (
                    <Typography variant="caption" color="text.secondary">
                      {lectureListChipLabel(item)}
                    </Typography>
                  )}
                </Box>
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
