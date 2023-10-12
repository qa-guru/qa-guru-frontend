import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IDesktopBoard } from "./desktop-board.types";
import { StyledStack, StyledWrapper } from "../board.styled";
import Column from "../../column";
import HomeworkDetails from "../../homework-details/homework-details";
import { UI_CONSTANTS } from "../../../constants/constants";

const DesktopBoard: React.FC<IDesktopBoard> = ({
  columns,
  draggingState,
  setDraggingState,
  moveCard,
  fetchMoreFunctions,
  showHomeworkDetails,
  isUpLg,
  selectedCard,
  handleCardClick,
  activeCardId,
  handleHomeworkDetailsClose,
}) => {
  return (
    <StyledWrapper>
      <motion.div
        initial={{
          width:
            showHomeworkDetails && isUpLg
              ? UI_CONSTANTS.MIN_COLUMN_WIDTH
              : UI_CONSTANTS.MAX_COLUMN_WIDTH,
        }}
        animate={{
          width:
            showHomeworkDetails && isUpLg
              ? UI_CONSTANTS.MIN_COLUMN_WIDTH
              : UI_CONSTANTS.MAX_COLUMN_WIDTH,
        }}
        transition={{ duration: UI_CONSTANTS.ANIMATE_DURATION }}
      >
        <StyledStack
          mr={
            showHomeworkDetails && isUpLg
              ? UI_CONSTANTS.ANIMATE_MARGIN
              : undefined
          }
        >
          {columns?.map((column, index) => (
            <Column
              draggingState={draggingState}
              setDraggingState={setDraggingState}
              key={`${column.id}-${index}`}
              column={column}
              onCardDrop={moveCard}
              fetchMore={fetchMoreFunctions[index]}
              onCardClick={handleCardClick}
              activeCardId={activeCardId}
            />
          ))}
        </StyledStack>
      </motion.div>
      <AnimatePresence>
        {isUpLg && selectedCard && (
          <motion.div
            initial={{ width: UI_CONSTANTS.MIN_DETAILS_WITH }}
            animate={{ width: UI_CONSTANTS.MAX_DETAILS_WITH }}
            exit={{ width: UI_CONSTANTS.MIN_DETAILS_WITH }}
            transition={{ duration: UI_CONSTANTS.ANIMATE_DURATION }}
          >
            <HomeworkDetails
              card={selectedCard!}
              onClose={handleHomeworkDetailsClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </StyledWrapper>
  );
};

export default DesktopBoard;
