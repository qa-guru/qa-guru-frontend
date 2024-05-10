import { FC, useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
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
import useResponsive from "shared/hooks/use-responsive";

import { IStepper } from "./stepper.types";
import {
  StyledBackButton,
  StyledClearIcon,
  StyledIconBox,
  StyledIconButton,
  StyledMobileIcon,
  StyledMobilePaper,
  StyledNextButton,
  StyledStep,
  StyledStepper,
} from "./stepper.styled";
import DesktopStepper from "../desktop-stepper";
import MobileStepper from "../mobile-stepper";

const Stepper: FC<IStepper> = ({ dataTrainingLectures }) => {
  const { lectureId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const { isDesktop } = useResponsive();
  const lectures = dataTrainingLectures?.trainingLectures;

  return isDesktop ? (
    <DesktopStepper dataTrainingLectures={dataTrainingLectures} />
  ) : (
    <MobileStepper dataTrainingLectures={dataTrainingLectures} />
  );
};

export default Stepper;
