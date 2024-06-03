import { FC, MouseEvent, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Step } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { STATES } from "shared/constants";

import { IMobileBoard } from "./mobile-board.types";
import {
  StyledBox,
  StyledMobileWrapper,
  StyledStepLabel,
  StyledStepper,
  StyledStepperButton,
} from "../board/board.styled";
import Column from "../column";
import { ROUTES } from "../../constants";

const MobileBoard: FC<IMobileBoard> = ({ columns, fetchMoreFunctions }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleCardClick = (
    card: StudentHomeWorkDto,
    event: MouseEvent<HTMLDivElement>
  ) => {
    const isModifierKey = event.metaKey || event.ctrlKey || event.shiftKey;
    if (!isModifierKey) navigate(`${ROUTES.KANBAN}/${card?.id}`);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleChangeStep = (direction: number) => {
    setActiveStep((prevActiveStep) => prevActiveStep + direction);
  };

  useEffect(() => {
    const stepElement = document.getElementById(`step-${activeStep}`);
    stepElement?.scrollIntoView({ behavior: "smooth" });
  }, [activeStep]);

  return (
    <StyledMobileWrapper>
      <StyledBox>
        <StyledStepperButton
          size="small"
          onClick={() => handleChangeStep(-1)}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
        </StyledStepperButton>
        <StyledStepper activeStep={activeStep}>
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
          disabled={activeStep === STATES.length - 1}
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
              onCardClick={handleCardClick}
            />
          ))}
        </SwipeableViews>
      </Box>
    </StyledMobileWrapper>
  );
};

export default MobileBoard;
