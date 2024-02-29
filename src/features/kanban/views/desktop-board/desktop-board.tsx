import { FC, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Maybe, StudentHomeWorkDto } from "api/graphql/generated/graphql";

import { IDesktopBoard } from "./desktop-board.types";
import HomeworkDetails from "../homework-details";
import {
  StyledColumnBox,
  StyledStack,
  StyledWrapper,
} from "../board/board.styled";
import Column from "../column";
import { ROUTES } from "../../constants";

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
  const isUpLg = useMediaQuery(theme.breakpoints.up(1475));
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
    setActiveCardId(null);
  };

  return (
    <StyledWrapper>
      <StyledColumnBox
        showHomeworkDetails={showHomeworkDetails}
        isUpLg={isUpLg}
      >
        <StyledStack>
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
      </StyledColumnBox>
      {isUpLg && selectedCard && (
        <Box>
          <HomeworkDetails
            card={selectedCard}
            onClose={handleHomeworkDetailsClose}
          />
        </Box>
      )}
    </StyledWrapper>
  );
};

export default DesktopBoard;
