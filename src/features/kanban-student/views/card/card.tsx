import { FC, MouseEvent } from "react";
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
import { getFormattedId } from "../../helpers/get-formatted-id";
import { ROUTES } from "../../../kanban/constants";

const Card: FC<ICard> = ({ card, onCardClick, isActive }) => {
  const { id, mentor, student, lecture, training } = card;

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      window.open(`${ROUTES.KANBAN}/${card.id}`);
    } else if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <>
      <StyledPaper isActive={isActive} onClick={handleCardClick} elevation={4}>
        <StyledCardHeader isActive={isActive}>
          <Typography textTransform="uppercase" variant="subtitle2">
            {getFormattedId(training?.techStack, id)}
          </Typography>
          <Typography variant="body2">
            {card.creationDate &&
              format(parseISO(card.creationDate), "dd.MM.yyyy")}
          </Typography>
        </StyledCardHeader>
        <StyledBox>
          <Typography variant="body2">{lecture?.subject}</Typography>
          <StyledUserRowStack>
            {mentor && (
              <UserRow
                icon={MentorIcon}
                user={mentor}
                width={24}
                height={24}
                variant="body2"
                userId={mentor.id}
                hasLink
              />
            )}
            {student && (
              <UserRow
                icon={StudentIcon}
                user={student}
                width={26}
                height={26}
                variant="body2"
                userId={student.id}
                hasLink
              />
            )}
          </StyledUserRowStack>
        </StyledBox>
      </StyledPaper>
    </>
  );
};

export default Card;
