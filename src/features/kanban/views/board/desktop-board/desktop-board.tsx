import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IDesktopBoard } from "./desktop-board.types";
import { StyledStack, StyledWrapper } from "../board.styled";
import Column from "../../column";
import HomeworkDetails from "../../homework-details/homework-details";

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
  const MinColumnWidth = "65%";
  const MaxColumnWidth = "100%";
  const MinDetailsWidth = "0";
  const MaxDetailsWidth = "34%";
  const AnimateDuration = 0.4;

  return (
    <StyledWrapper>
      <motion.div
        initial={{
          width:
            showHomeworkDetails && isUpLg ? MinColumnWidth : MaxColumnWidth,
        }}
        animate={{
          width:
            showHomeworkDetails && isUpLg ? MinColumnWidth : MaxColumnWidth,
        }}
        transition={{ duration: AnimateDuration }}
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
            initial={{ width: MinDetailsWidth }}
            animate={{ width: MaxDetailsWidth }}
            exit={{ width: MinDetailsWidth }}
            transition={{ duration: AnimateDuration }}
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
