import { FC, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  StepContent,
  StepLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Maybe } from "api/graphql/generated/graphql";
import { Reorder, SchoolRounded } from "@mui/icons-material";

import { IStepper } from "./stepper.types";
import {
  StyledBackButton,
  StyledIconButton,
  StyledNextButton,
  StyledStep,
  StyledStepper,
} from "./stepper.styled";

const Stepper: FC<IStepper> = ({ dataTrainingLectures, trainingId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { trainingLectures } = dataTrainingLectures;

  useEffect(() => {
    const stepIndex = trainingLectures?.findIndex(
      (lecture) => lecture?.lecture?.id === lectureId
    );
    if (stepIndex !== undefined && stepIndex !== -1) {
      setActiveStep(stepIndex);
    }
  }, [lectureId, trainingLectures]);

  const handleNavigation = (step: number, id?: Maybe<string>) => {
    if (id) {
      navigate(`/training/${trainingId}/${id}`);
      setActiveStep(step);
    }
  };

  const changeStep = (direction: number) => {
    const newStep = activeStep + direction;
    const lecture = trainingLectures?.[newStep]?.lecture;
    if (lecture) {
      handleNavigation(newStep, lecture.id);
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <>
      <Tooltip title="Программа курса">
        <StyledIconButton color="primary" onClick={toggleDrawer(true)}>
          <Reorder fontSize="small" />
        </StyledIconButton>
      </Tooltip>
      <Drawer open={open} onClose={toggleDrawer(false)} sx={{ zIndex: 1500 }}>
        <StyledStepper
          activeStep={activeStep}
          orientation="vertical"
          connector={null}
        >
          {trainingLectures?.map((item, index) => {
            const { id, subject, description } = item?.lecture || {};
            const isLastStep = index === trainingLectures.length - 1;

            return (
              <StyledStep key={id}>
                <StepLabel
                  icon={<SchoolRounded fontSize="small" />}
                  onClick={() => handleNavigation(index, id)}
                >
                  <Typography variant="caption">{subject}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="caption">{description}</Typography>
                  <Box sx={{ mb: 2 }}>
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
                  </Box>
                </StepContent>
              </StyledStep>
            );
          })}
        </StyledStepper>
      </Drawer>
    </>
  );
};

export default Stepper;
