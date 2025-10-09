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

  const isAtLastLecture = activeStep === lectures.length - 1;

  const isLectureAccessible = (index: number) => {
    const lecture = lectures[index];
    return lecture && !lecture.locking && lecture.isAvailable;
  };

  const findNextAccessibleLecture = () => {
    for (let i = activeStep + 1; i < lectures.length; i++) {
      if (isLectureAccessible(i)) {
        return i;
      }
    }
    return -1;
  };

  const findPreviousAccessibleLecture = () => {
    for (let i = activeStep - 1; i >= 0; i--) {
      if (isLectureAccessible(i)) {
        return i;
      }
    }
    return -1;
  };

  const nextAccessibleIndex = findNextAccessibleLecture();
  const previousAccessibleIndex = findPreviousAccessibleLecture();

  const canGoToNextLecture = nextAccessibleIndex !== -1;
  const canGoToPreviousLecture = previousAccessibleIndex !== -1;

  const handleNavigation = (step: number) => {
    const lecture = lectures[step]?.lecture;
    if (lecture) {
      navigate(`/training/${trainingId}/${lecture.id}`);
    }
  };

  const goToPreviousLecture = () => {
    if (previousAccessibleIndex !== -1) {
      handleNavigation(previousAccessibleIndex);
    }
  };

  const goToNextLecture = () => {
    if (nextAccessibleIndex !== -1) {
      handleNavigation(nextAccessibleIndex);
    }
  };

  const finishCourse = () => {
    navigate("/");
  };

  return (
    <StyledBox>
      <Button
        onClick={goToPreviousLecture}
        disabled={!canGoToPreviousLecture}
        variant="contained"
        color="secondary"
      >
        К предыдущему уроку
      </Button>
      {canGoToNextLecture && (
        <StyledButton onClick={goToNextLecture} variant="contained">
          К следующему уроку
        </StyledButton>
      )}
      {isAtLastLecture && (
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
