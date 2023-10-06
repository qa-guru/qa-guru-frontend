import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IDesktopBoard } from "./desktop-board.types";
import { StyledStack, StyledWrapper } from "../board.styled";
import Column from "../../column";
import HomeworkDetails from "../../homework-details/homework-details";

const minColumnWidth = "65%";
const maxColumnWidth = "100%";
const minDetailsWidth = "0";
const maxDetailsWidth = "34%";
const animateDuration = 0.4;

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
            showHomeworkDetails && isUpLg ? minColumnWidth : maxColumnWidth,
        }}
        animate={{
          width:
            showHomeworkDetails && isUpLg ? minColumnWidth : maxColumnWidth,
        }}
        transition={{ duration: animateDuration }}
      >
        <StyledStack mr={showHomeworkDetails && isUpLg ? 2 : 0}>
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
            initial={{ width: minDetailsWidth }}
            animate={{ width: maxDetailsWidth }}
            exit={{ width: minDetailsWidth }}
            transition={{ duration: animateDuration }}
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
