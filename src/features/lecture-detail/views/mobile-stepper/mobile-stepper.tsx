import { FC, MouseEvent, useEffect, useState } from "react";
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
import CustomLink from "../../../../shared/components/custom-link";

const MobileStepper: FC<IStepper> = ({ dataTrainingLectures }) => {
  const { trainingId, lectureId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const lectures = dataTrainingLectures?.trainingLectures;

  const handleNavigation = (step: number, id?: Maybe<string>) => {
    if (id) {
      navigate(`/training/${trainingId}/${id}`);
      setActiveStep(step);
      setOpen(false);
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
                <CustomLink path={`/training/${trainingId}/${id}`}>
                  <StepLabel
                    icon={<SchoolRounded fontSize="small" />}
                    onClick={(event) => handleLabelClick(event, index, id)}
                  >
                    <Typography variant="caption">{subject}</Typography>
                  </StepLabel>
                </CustomLink>
              </StyledStep>
            );
          })}
        </StyledStepper>
      </Drawer>
    </StyledMobilePaper>
  );
};

export default MobileStepper;
