import { FC, useState } from "react";
import { Drawer, Tooltip } from "@mui/material";
import { Reorder } from "@mui/icons-material";

import { IStepper } from "./desktop-stepper.types";
import {
  StyledClearIcon,
  StyledIconBox,
  StyledIconButton,
} from "./desktop-stepper.styled";
import {
  useStepEffect,
  useStepNavigation,
} from "../../hooks/use-step-navigation";
import StepperContent from "../stepper-content";

const DesktopStepper: FC<IStepper> = ({ dataTrainingLectures }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(
    () => localStorage.getItem("drawerOpen") === "true"
  );
  const { handleNavigation } = useStepNavigation(setActiveStep, setOpen);

  const lectures = dataTrainingLectures?.trainingLectures!;

  const toggleDrawer = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      localStorage.setItem("drawerOpen", newOpen.toString());
      return newOpen;
    });
  };

  useStepEffect(lectures, setActiveStep);

  const changeStep = (direction: number) => {
    const newStep = activeStep + direction;
    const lecture = lectures?.[newStep]?.lecture;
    if (lecture) {
      handleNavigation(newStep, lecture.id);
    }
  };

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
        <StepperContent
          lectures={lectures}
          activeStep={activeStep}
          changeStep={changeStep}
        />
      </Drawer>
    </>
  );
};

export default DesktopStepper;
