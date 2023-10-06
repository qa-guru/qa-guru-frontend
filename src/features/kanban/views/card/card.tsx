import React, { useCallback, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useSnackbar } from "notistack";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import {
  StyledBox,
  StyledCardHeader,
  StyledPaper,
  StyledUserRowStack,
} from "./card.styled";
import { ICard } from "./card.types";
import { getUpdatedAllowedColumns } from "../../helpers/get-updated-allowed-columns";
import { useUserContext } from "../../context/user-context";
import { getFormattedId } from "../../helpers/get-formatted-id";

const Card: React.FC<ICard> = ({
  card,
  sourceColumnId,
  setDraggingState,
  isCardsHidden,
  onCardClick,
  isActive,
}) => {
  const { userId, userRoles } = useUserContext();
  const hasManagerRole = userRoles?.some((role) => role === "MANAGER");
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: {
      id: card.id,
      sourceColumnId,
      allowedColumns: getUpdatedAllowedColumns(
        sourceColumnId,
        userId!,
        card.mentor?.id!,
        userRoles
      ),
    },
    end: () => {
      setDraggingState({
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleDragEffect = useCallback(() => {
    if (!isDragging) {
      setDraggingState({
        newItem: false,
        fromInReview: false,
        fromNotApproved: false,
      });
      return;
    }

    if (hasManagerRole) {
      enqueueSnackbar("MANAGER не может менять статус домашнего задания");
      return;
    }

    if (sourceColumnId === "1") {
      setDraggingState((prevState) => ({ ...prevState, newItem: true }));
      return;
    }

    if (userId !== card.mentor?.id) {
      enqueueSnackbar("Вы не можете поменять статус данной домашней работы");
      return;
    }

    if (sourceColumnId === "2") {
      setDraggingState((prevState) => ({ ...prevState, fromInReview: true }));
    } else if (sourceColumnId === "4") {
      setDraggingState((prevState) => ({
        ...prevState,
        fromNotApproved: true,
      }));
    }
  }, [
    isDragging,
    sourceColumnId,
    setDraggingState,
    userId,
    card.mentor?.id,
    enqueueSnackbar,
    hasManagerRole,
  ]);

  useEffect(() => {
    handleDragEffect();
  }, [handleDragEffect]);

  const handleCardClick = () => {
    onCardClick!();
  };

  return (
    <StyledPaper
      isDragging={isDragging}
      isCardsHidden={isCardsHidden}
      isActive={isActive}
      ref={dragRef}
      onClick={handleCardClick}
      elevation={4}
    >
      <StyledCardHeader isActive={isActive}>
        <Typography textTransform="uppercase" variant="subtitle2">
          {getFormattedId(card.id!)}
        </Typography>
        <Typography variant="body2">
          {card.creationDate &&
            format(parseISO(card.creationDate), "dd.MM.yyyy")}
        </Typography>
      </StyledCardHeader>
      <StyledBox>
        <Typography variant="body2">{card.lecture?.subject}</Typography>
        <StyledUserRowStack>
          {card.mentor && (
            <UserRow
              icon={MentorIcon}
              user={card.mentor}
              width={26}
              height={26}
              variant="body2"
            />
          )}
          <UserRow
            icon={StudentIcon}
            user={card.student!}
            width={26}
            height={26}
            variant="body2"
          />
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );
};

export default Card;
