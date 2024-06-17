import { FC, MouseEvent, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Maybe, StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { useResponsive } from "shared/hooks";

import { IDesktopBoard } from "./desktop-board.types";
import HomeworkDetails from "../homework-details";
import {
  StyledColumnBox,
  StyledStack,
  StyledWrapper,
} from "../board/board.styled";
import Column from "../column";
import { ROUTES } from "../../constants";

const DesktopBoard: FC<IDesktopBoard> = ({ columns, fetchMoreFunctions }) => {
  const [showHomeworkDetails, setShowHomeworkDetails] = useState(false);
  const [activeCardId, setActiveCardId] = useState<Maybe<string>>(null);
  const [selectedCard, setSelectedCard] =
    useState<Maybe<StudentHomeWorkDto>>(null);
  const { isLargeDesktop } = useResponsive();

  const navigate = useNavigate();

  const handleCardClick = (
    card: StudentHomeWorkDto,
    event: MouseEvent<HTMLDivElement>
  ) => {
    const isModifierKey = event.metaKey || event.ctrlKey || event.shiftKey;

    if (isLargeDesktop && !isModifierKey) {
      const isSameCard = card.id === activeCardId;
      setSelectedCard(isSameCard ? null : card);
      setActiveCardId(isSameCard ? null : card.id!);
      setShowHomeworkDetails(!isSameCard);
    } else if (!isModifierKey) {
      navigate(`${ROUTES.KANBAN}/${card.id}`);
    }
  };

  const handleHomeworkDetailsClose = () => {
    setSelectedCard(null);
    setShowHomeworkDetails(false);
    setActiveCardId(null);
  };

  const homeworkDetails = isLargeDesktop && selectedCard && (
    <Box>
      <HomeworkDetails
        card={selectedCard}
        onClose={handleHomeworkDetailsClose}
      />
    </Box>
  );

  return (
    <StyledWrapper>
      <StyledColumnBox
        showHomeworkDetails={showHomeworkDetails}
        isUpLg={isLargeDesktop}
      >
        <StyledStack>
          {columns?.map((column, index) => (
            <Column
              key={`${column.id}-${index}`}
              column={column}
              fetchMore={fetchMoreFunctions[index]}
              onCardClick={handleCardClick}
              activeCardId={activeCardId}
            />
          ))}
        </StyledStack>
      </StyledColumnBox>
      {homeworkDetails}
    </StyledWrapper>
  );
};

export default DesktopBoard;
