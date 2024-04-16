import { FC, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Step } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

import { IMobileBoard, states } from "./mobile-board.types";
import {
  StyledBox,
  StyledMobileWrapper,
  StyledStepLabel,
  StyledStepper,
  StyledStepperButton,
} from "../board/board.styled";
import Column from "../column";
import { ROUTES } from "../../constants";

const MobileBoard: FC<IMobileBoard> = ({
  columns,
  draggingState,
  setDraggingState,
  moveCard,
  fetchMoreFunctions,
}) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleCardClick = (card: StudentHomeWorkDto) => {
    navigate(`${ROUTES.KANBAN}/${card?.id}`);
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
          {states.map((state, index) => {
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
          disabled={activeStep === states.length - 1}
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
              draggingState={draggingState}
              setDraggingState={setDraggingState}
              key={`${column.id}-${index}`}
              column={column}
              onCardDrop={moveCard}
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
