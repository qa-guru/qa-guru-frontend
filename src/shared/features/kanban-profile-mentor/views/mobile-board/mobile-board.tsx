import { FC, useEffect, useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Step } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

import { STATES } from "shared/constants";

import { IMobileBoard } from "./mobile-board.types";
import {
  StyledBox,
  StyledStepLabel,
  StyledStepper,
  StyledStepperButton,
} from "../board/board.styled";
import Column from "../column";

const MobileBoard: FC<IMobileBoard> = ({ columns, fetchMoreFunctions }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepperRef = useRef<HTMLDivElement>(null);

  const disabledBackButton = activeStep === 0;
  const disabledNextButton = activeStep === STATES.length - 1;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleChangeStep = (direction: number) => {
    setActiveStep((prevActiveStep) => prevActiveStep + direction);
  };

  useEffect(() => {
    const stepper = stepperRef.current;
    if (stepper && stepper.scrollWidth > stepper.clientWidth) {
      const stepElement = document.getElementById(`step-${activeStep}`);
      if (stepElement) {
        const stepLeft = stepElement.offsetLeft + stepElement.clientWidth / 2;
        const stepperCenter = stepper.clientWidth / 2;
        const scrollPosition = stepLeft - stepperCenter;

        stepper.scrollLeft = scrollPosition;
      }
    }
  }, [activeStep]);

  return (
    <Box>
      <StyledBox>
        <StyledStepperButton
          size="small"
          onClick={() => handleChangeStep(-1)}
          disabled={disabledBackButton}
        >
          <KeyboardArrowLeft />
        </StyledStepperButton>
        <StyledStepper activeStep={activeStep} ref={stepperRef}>
          {STATES.map((state, index) => {
            return (
              <Step key={state.text} id={`step-${index}`}>
                <StyledStepLabel onClick={() => handleStepChange(index)}>
                  {`${state.text} (${columns[index]?.totalElements || 0})`}
                </StyledStepLabel>
              </Step>
            );
          })}
        </StyledStepper>
        <StyledStepperButton
          size="small"
          onClick={() => handleChangeStep(1)}
          disabled={disabledNextButton}
        >
          <KeyboardArrowRight />
        </StyledStepperButton>
      </StyledBox>
      <Box>
        <SwipeableViews
          key={activeStep}
          index={activeStep}
          onChangeIndex={handleStepChange}
          slideStyle={{
            scrollBehavior: "smooth",
          }}
        >
          {columns.map((column, index) => (
            <Column
              key={`${column.id}-${index}`}
              column={column}
              fetchMore={fetchMoreFunctions[index]}
            />
          ))}
        </SwipeableViews>
      </Box>
    </Box>
  );
};

export default MobileBoard;
