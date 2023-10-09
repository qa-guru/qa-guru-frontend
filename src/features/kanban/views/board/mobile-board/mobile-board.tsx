import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Box } from "@mui/material";
import { IMobileBoard } from "./mobile-board.types";
import {
  StyledBox,
  StyledMobileWrapper,
  StyledPagination,
} from "../board.styled";
import Column from "../../column";

const step = 1;

const MobileBoard: React.FC<IMobileBoard> = ({
  columns,
  activeStep,
  handleStepChange,
  draggingState,
  setDraggingState,
  moveCard,
  fetchMoreFunctions,
}) => {
  return (
    <StyledMobileWrapper>
      <StyledBox>
        <StyledPagination
          count={columns.length}
          page={activeStep + step}
          onChange={(event, steps) => handleStepChange(steps - step)}
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
            />
          ))}
        </SwipeableViews>
      </Box>
    </StyledMobileWrapper>
  );
};

export default MobileBoard;
