import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import UserRow from "shared/components/user-row";
import CustomLink from "shared/components/custom-link";
import useResponsive from "shared/hooks/use-responsive";

import {
  StyledBox,
  StyledCardHeader,
  StyledPaper,
  StyledUserRowStack,
} from "./card.styled";
import { ICard } from "./card.types";
import { getFormattedId } from "../../helpers/get-formatted-id";
import { ROUTES } from "../../constants";

const Card: FC<ICard> = ({ card, onCardClick, isActive }) => {
  const { id, mentor, student, lecture, training } = card;
  const { isLargeDesktop } = useResponsive();

  const headerContent = (
    <Typography variant="subtitle2">
      {getFormattedId(training?.techStack, id)}
    </Typography>
  );

  const cardContent = (
    <StyledPaper isActive={isActive} onClick={onCardClick} elevation={4}>
      <StyledCardHeader isActive={isActive}>
        {isLargeDesktop ? (
          <CustomLink
            textDecorationHover="underline"
            path={`${ROUTES.KANBAN}/${card.id}`}
            color="black"
          >
            {headerContent}
          </CustomLink>
        ) : (
          headerContent
        )}
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
              hasLink={isLargeDesktop}
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
              hasLink={isLargeDesktop}
            />
          )}
        </StyledUserRowStack>
      </StyledBox>
    </StyledPaper>
  );

  return !isLargeDesktop ? (
    <CustomLink path={`${ROUTES.KANBAN}/${card.id}`}>{cardContent}</CustomLink>
  ) : (
    cardContent
  );
};

export default Card;
