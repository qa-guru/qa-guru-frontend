import React, { FC } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { IStepperButtons } from "./stepper-buttons.types";
import { StyledBox, StyledButton } from "./stepper-buttons.styled";

const StepperButtons: FC<IStepperButtons> = ({
  dataTrainingLectures,
  trainingId,
}) => {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { trainingLectures } = dataTrainingLectures;

  const lectures = trainingLectures ?? [];

  const activeStep = lectures.findIndex(
    (lecture) => lecture?.lecture?.id === lectureId
  );

  const handleNavigation = (step: number) => {
    const lecture = lectures[step]?.lecture;
    if (lecture) {
      navigate(`/training/${trainingId}/${lecture.id}`);
    }
  };

  const goToPreviousLecture = () => {
    if (activeStep && activeStep > 0) {
      handleNavigation(activeStep - 1);
    }
  };

  const goToNextLecture = () => {
    if (activeStep !== undefined && activeStep < lectures.length - 1) {
      handleNavigation(activeStep + 1);
    }
  };

  const finishCourse = () => {
    navigate("/");
  };

  return (
    <StyledBox>
      <Button
        onClick={goToPreviousLecture}
        disabled={activeStep === 0}
        variant="contained"
        color="secondary"
      >
        К предыдущему уроку
      </Button>
      {activeStep < lectures.length - 1 && (
        <StyledButton onClick={goToNextLecture} variant="contained">
          К следующему уроку
        </StyledButton>
      )}
      {activeStep === lectures.length - 1 && (
        <StyledButton
          onClick={finishCourse}
          variant="contained"
          color="primary"
        >
          Завершить курс
        </StyledButton>
      )}
    </StyledBox>
  );
};

export default StepperButtons;
