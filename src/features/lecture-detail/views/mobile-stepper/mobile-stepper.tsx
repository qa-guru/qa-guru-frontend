import { FC, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Tooltip,
} from "@mui/material";
import { Reorder } from "@mui/icons-material";

import { IStepper } from "./mobile-stepper.types";
import {
  StyledClearIcon,
  StyledIcon,
  StyledIconBox,
  StyledMobilePaper,
} from "./mobile-stepper.styled";
import {
  useStepEffect,
  useStepNavigation,
} from "../../hooks/use-step-navigation";
import StepperContent from "../stepper-content";

const MobileStepper: FC<IStepper> = ({ dataTrainingLectures }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
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
    <StyledMobilePaper>
      <BottomNavigation onChange={toggleDrawer}>
        <Tooltip title="Программа курса">
          <BottomNavigationAction
            icon={
              <StyledIcon>
                <Reorder fontSize="small" />
              </StyledIcon>
            }
          />
        </Tooltip>
      </BottomNavigation>
      <Drawer
        open={open}
        anchor="bottom"
        onClose={toggleDrawer}
        sx={{ zIndex: 2000 }}
      >
        <StyledIconBox>
          <StyledClearIcon fontSize="small" onClick={toggleDrawer} />
        </StyledIconBox>
        <StepperContent
          lectures={lectures}
          activeStep={activeStep}
          changeStep={changeStep}
        />
      </Drawer>
    </StyledMobilePaper>
  );
};

export default MobileStepper;
