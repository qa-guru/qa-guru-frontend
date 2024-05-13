import { FC, useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  StepLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Maybe } from "api/graphql/generated/graphql";
import { Reorder, SchoolRounded } from "@mui/icons-material";

import { IStepper } from "./mobile-stepper.types";
import {
  StyledClearIcon,
  StyledIcon,
  StyledIconBox,
  StyledMobilePaper,
  StyledStep,
  StyledStepper,
} from "./mobile-stepper.styled";

const MobileStepper: FC<IStepper> = ({ dataTrainingLectures }) => {
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
      setOpen(false);
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
        sx={{ zIndex: 1500 }}
      >
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

            return (
              <StyledStep key={id} id={`step-${index}`}>
                <StepLabel
                  icon={<SchoolRounded fontSize="small" />}
                  onClick={() => handleNavigation(index, id)}
                >
                  <Typography variant="caption">{subject}</Typography>
                </StepLabel>
              </StyledStep>
            );
          })}
        </StyledStepper>
      </Drawer>
    </StyledMobilePaper>
  );
};

export default MobileStepper;
