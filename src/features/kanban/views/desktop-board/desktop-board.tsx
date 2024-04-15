import { FC, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Maybe, StudentHomeWorkDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";

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
  const { isLargeDesktop } = useResponsive();

  const navigate = useNavigate();

  const handleCardClick = (card: StudentHomeWorkDto) => {
    if (isLargeDesktop) {
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
        isUpLg={isLargeDesktop}
      >
        <StyledStack>
          {columns?.map((column, index) => (
            <Column
              {...{ draggingState, setDraggingState, column, activeCardId }}
              key={`${column.id}-${index}`}
              onCardDrop={moveCard}
              fetchMore={fetchMoreFunctions[index]}
              onCardClick={handleCardClick}
            />
          ))}
        </StyledStack>
      </StyledColumnBox>
      {isLargeDesktop && selectedCard && (
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
