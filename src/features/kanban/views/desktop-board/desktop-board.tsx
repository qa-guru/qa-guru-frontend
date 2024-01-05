import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { StudentHomeWorkDto, Maybe } from "api/graphql/generated/graphql";

import { IDesktopBoard } from "./desktop-board.types";
import HomeworkDetails from "../homework-details";
import { StyledStack, StyledWrapper } from "../board/board.styled";
import Column from "../column";
import { ROUTES, UI_CONSTANTS } from "../../constants";

const DesktopBoard: FC<IDesktopBoard> = ({
  columns,
  draggingState,
  setDraggingState,
  moveCard,
  fetchMoreFunctions,
}) => {
  const [showHomeworkDetails, setShowHomeworkDetails] = useState(false);
  const [activeCardId, setActiveCardId] = useState<Maybe<string>>(null);
  const [selectedCard, setSelectedCard] =
    useState<Maybe<StudentHomeWorkDto>>(null);
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const handleCardClick = (card: StudentHomeWorkDto) => {
    if (isUpLg) {
      const isSameCard = card.id === activeCardId;
      setSelectedCard(isSameCard ? null : card);
      setActiveCardId(isSameCard ? null : card.id!);
      setShowHomeworkDetails(!isSameCard);
    } else {
      navigate(`${ROUTES.KANBAN}/${card.id}`);
    }
  };

  const handleHomeworkDetailsClose = () => {
    setSelectedCard(null);
    setShowHomeworkDetails(false);
  };

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
              card={selectedCard}
              onClose={handleHomeworkDetailsClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </StyledWrapper>
  );
};

export default DesktopBoard;
