import React from "react";
import { useDrag } from "react-dnd";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
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
import { getFormattedId } from "../../helpers/get-formatted-id";
import DragEffectByRole from "../../roles/drag-effect-by-role/drag-effect-by-role";
import { useUserContext } from "../../context/user-context";

const Card: React.FC<ICard> = ({
  card,
  sourceColumnId,
  setDraggingState,
  isCardsHidden,
  onCardClick,
  isActive,
}) => {
  const { userId, userRoles } = useUserContext();
  const { id, mentor, student, lecture, creationDate } = card;

  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: {
      id,
      sourceColumnId,
      allowedColumns: getUpdatedAllowedColumns(
        sourceColumnId,
        userId!,
        mentor?.id!,
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

  const formattedCreationDate = creationDate
    ? format(parseISO(creationDate), "dd.MM.yyyy")
    : null;

  return (
    <>
      <StyledPaper
        isDragging={isDragging}
        isCardsHidden={isCardsHidden}
        isActive={isActive}
        ref={dragRef}
        onClick={onCardClick}
        elevation={4}
      >
        <DragEffectByRole
          card={card}
          sourceColumnId={sourceColumnId}
          setDraggingState={setDraggingState}
          isDragging={isDragging}
          userId={userId}
          userRoles={userRoles}
        />
        <StyledCardHeader isActive={isActive}>
          <Typography textTransform="uppercase" variant="subtitle2">
            {getFormattedId(id!)}
          </Typography>
          {formattedCreationDate && (
            <Typography variant="body2">{formattedCreationDate}</Typography>
          )}
        </StyledCardHeader>
        <StyledBox>
          <Typography variant="body2">{lecture?.subject}</Typography>
          <StyledUserRowStack>
            {mentor && (
              <UserRow
                icon={MentorIcon}
                user={mentor}
                width={26}
                height={26}
                variant="body2"
              />
            )}
            {student && (
              <UserRow
                icon={StudentIcon}
                user={student}
                width={26}
                height={26}
                variant="body2"
              />
            )}
          </StyledUserRowStack>
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default Card;
