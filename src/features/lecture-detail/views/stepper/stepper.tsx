import { FC } from "react";
import useResponsive from "shared/hooks/use-responsive";

import { IStepper } from "./stepper.types";
import DesktopStepper from "../desktop-stepper";
import MobileStepper from "../mobile-stepper";

const Stepper: FC<IStepper> = ({ dataTrainingLectures }) => {
  const { isDesktop } = useResponsive();

  return isDesktop ? (
    <DesktopStepper dataTrainingLectures={dataTrainingLectures} />
  ) : (
    <MobileStepper dataTrainingLectures={dataTrainingLectures} />
  );
};

export default Stepper;
