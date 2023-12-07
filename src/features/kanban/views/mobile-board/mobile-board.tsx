import { FC, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IMobileBoard } from "./mobile-board.types";
import {
  StyledBox,
  StyledMobileWrapper,
  StyledPagination,
} from "../board/board.styled";
import Column from "../column";
import { STEP } from "../../constants";
import { StudentHomeWorkDto } from "../../../../api/graphql/generated/graphql";

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
    navigate(`/kanban/${card?.id}`);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <StyledMobileWrapper>
      <StyledBox>
        <StyledPagination
          count={columns.length}
          page={activeStep + STEP}
          onChange={(event, steps) => handleStepChange(steps - STEP)}
          size="small"
          hidePrevButton
          hideNextButton
        />
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
