import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import useResponsive from "shared/hooks/use-responsive";

import { IStepper } from "./stepper.types";
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
