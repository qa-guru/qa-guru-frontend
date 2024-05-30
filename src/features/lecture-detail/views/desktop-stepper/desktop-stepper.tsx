import { FC, MouseEvent, useEffect, useState } from "react";
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
import CustomLink from "shared/components/custom-link";

import { IStepper } from "./desktop-stepper.types";
import {
  StyledBackButton,
  StyledClearIcon,
  StyledIconBox,
  StyledIconButton,
  StyledNextButton,
  StyledStep,
  StyledStepper,
} from "./desktop-stepper.styled";

const DesktopStepper: FC<IStepper> = ({ dataTrainingLectures }) => {
  const { trainingId, lectureId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(() => {
    const isDrawerOpen = localStorage.getItem("drawerOpen");
    return isDrawerOpen === "true";
  });
  const navigate = useNavigate();
  const lectures = dataTrainingLectures?.trainingLectures;

  const handleNavigation = (step: number, id?: Maybe<string>) => {
    if (id) {
      navigate(`/training/${trainingId}/${id}`);
      setActiveStep(step);
    }
  };

  const handleLabelClick = (
    event: MouseEvent<HTMLElement>,
    step: number,
    id?: Maybe<string>
  ) => {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      return;
    }
    handleNavigation(step, id);
  };

  const changeStep = (direction: number) => {
    const newStep = activeStep + direction;
    const lecture = lectures?.[newStep]?.lecture;
    if (lecture) {
      handleNavigation(newStep, lecture.id);
    }
  };

  const toggleDrawer = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      localStorage.setItem("drawerOpen", newOpen.toString());
      return newOpen;
    });
  };

  useEffect(() => {
    const stepIndex = lectures?.findIndex(
      (lecture) => lecture?.lecture?.id === lectureId
    );
    if (stepIndex !== undefined && stepIndex !== -1) {
      setActiveStep(stepIndex);
    }
  }, [lectureId, lectures]);

  useEffect(() => {
    setTimeout(() => {
      const stepElement = document.getElementById(`step-${activeStep}`);
      stepElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }, [activeStep]);

  return (
    <>
      <Tooltip title="Программа курса">
        <StyledIconButton color="primary" onClick={toggleDrawer}>
          <Reorder fontSize="small" />
        </StyledIconButton>
      </Tooltip>
      <Drawer open={open} onClose={toggleDrawer} sx={{ zIndex: 1500 }}>
        <StyledIconBox>
          <StyledClearIcon fontSize="small" onClick={toggleDrawer} />
        </StyledIconBox>
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
                  <StepLabel
                    icon={<SchoolRounded fontSize="small" />}
                    onClick={(event) => handleLabelClick(event, index, id)}
                  >
                    <Typography variant="caption">{subject}</Typography>
                  </StepLabel>
                </CustomLink>
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

export default DesktopStepper;
